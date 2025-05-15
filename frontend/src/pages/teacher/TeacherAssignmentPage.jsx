import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import supabase from "../../supabase";
import "../../css/TeacherHomePage.css";
import "../../css/TeacherAssignmentPage.css";

const SUPABASE_STORAGE_BASE_URL =
  "https://zofbnvkcnsdisrptzado.supabase.co/storage/v1/object/public";

function TeacherAssignmentPage() {
  const { id } = useParams(); // assignment ID
  const location = useLocation();
  const { classId, content, fileUrl, due_date } = location.state || {};

  const [classInfo, setClassInfo] = useState({});
  const [students, setStudents] = useState([]);
  const [marksInput, setMarksInput] = useState({}); // Store marks inputs temporarily

  // Helper to get full file URL for submitted files
  const getFullFileUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    // Ensure leading slash is present if needed
    return SUPABASE_STORAGE_BASE_URL + (url.startsWith("/") ? url : "/" + url);
  };

  useEffect(() => {
    const fetchClassInfoAndStudents = async () => {
      if (!classId) return;

      // Step 1: Get class info including course_code from the classes table
      const { data: classData, error: classError } = await supabase
        .from("classes")
        .select("name, course_code, branch, year")
        .eq("id", classId)
        .single();

      if (classError) {
        console.error("Error fetching class info:", classError.message);
        return;
      }

      setClassInfo(classData);

      // Step 2: Get students from profiles who match branch and year
      const { data: studentProfiles, error: profileError } = await supabase
        .from("profiles")
        .select("reg_id")
        .eq("branch", classData.branch)
        .eq("year", classData.year);

      if (profileError) {
        console.error("Error fetching student profiles:", profileError.message);
        return;
      }

      // Step 3: Get submissions for this assignment
      const { data: submissions, error: submissionError } = await supabase
        .from("assignment_submissions")
        .select("reg_id, created_at, file_url, marks")
        .eq("assignment_id", id);

      if (submissionError) {
        console.error("Error fetching submissions:", submissionError.message);
        return;
      }

      // Map reg_id → submission
      const submissionMap = {};
      submissions.forEach((s) => {
        submissionMap[s.reg_id] = s;
      });

      // Step 4: Merge student list with submission info, fixing file URLs
      const combined = studentProfiles.map((student) => {
        const submission = submissionMap[student.reg_id];
        return {
          reg_id: student.reg_id,
          submitted: !!submission,
          time: submission?.created_at || null,
          file: submission?.file_url ? getFullFileUrl(submission.file_url) : null,
          marks: submission?.marks ?? null,
        };
      });

      setStudents(combined);
    };

    fetchClassInfoAndStudents();
  }, [classId, id]);

  const handleMarksChange = (e, reg_id) => {
    setMarksInput({
      ...marksInput,
      [reg_id]: e.target.value,
    });
  };

  const handleMarksSubmit = async (reg_id) => {
    const newMarks = marksInput[reg_id];
    if (newMarks === undefined || newMarks === "") {
      alert("Please enter valid marks.");
      return;
    }

    // First, check if a submission exists
    const { data: existing, error: fetchError } = await supabase
      .from("assignment_submissions")
      .select("id")
      .eq("reg_id", reg_id)
      .eq("assignment_id", id)
      .eq("class_id", classId)
      .maybeSingle();

    if (fetchError) {
      console.error("Error checking submission existence:", fetchError.message);
      return;
    }

    if (!existing) {
      alert("Cannot update marks — no submission found for this student.");
      return;
    }

    // Now update marks
    const { error: updateError } = await supabase
      .from("assignment_submissions")
      .update({ marks: newMarks })
      .eq("reg_id", reg_id)
      .eq("assignment_id", id)
      .eq("class_id", classId);

    if (updateError) {
      console.error("Error updating marks:", updateError.message);
    } else {
      alert("Marks updated successfully!");
    }
  };

  const renderFilePreview = (url) => {
    if (!url) return null;

    const ext = url.split('.').pop().toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
      return (
        <div className="file-preview-container">
          <img src={url} alt="Preview" className="preview-image" />
        </div>
      );
    }

    if (ext === 'pdf') {
      return (
        <div className="file-preview-container">
          <iframe src={url} title="PDF" className="preview-pdf" />
        </div>
      );
    }

    // Fallback for other file types (if needed)
    return (
      <div className="file-preview-container">
        <p>File preview not available</p>
        <a href={url} target="_blank" rel="noopener noreferrer">View Full File</a>
      </div>
    );
  };

  const handleViewFile = async (reg_id) => {
    try {
      const { data, error } = await supabase
        .from("assignment_submissions")
        .select("file_url")
        .eq("assignment_id", id)
        .eq("class_id", classId)
        .eq("reg_id", reg_id)
        .single();

      if (error) {
        console.error("Error fetching file_url:", error.message);
        alert("Failed to fetch file URL.");
        return;
      }

      if (data?.file_url) {
        const fullUrl = getFullFileUrl(data.file_url);
        window.open(fullUrl, "_blank", "noopener,noreferrer");
      } else {
        alert("No file URL found for this submission.");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="class-app-container">
      <nav className="dashboard">
        <h1 className="dashboard-title">
          {classInfo.name ? `${classInfo.name} - ${classInfo.course_code}` : `Class ${classId}`}
        </h1>
        <button className="dots-button">
          <BsThreeDotsVertical className="three-dots-icon" />
        </button>
      </nav>

      <div className="assignment-card">
        <p><strong>Content:</strong> {content}</p>

        {renderFilePreview(fileUrl)}

        <p>
          <strong>File:</strong>{" "}
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            View Full File
          </a>
        </p>
        <p>
          <strong>Due Date:</strong>{" "}
          {due_date ? new Date(due_date).toLocaleString() : "Not specified"}
        </p>
      </div>

      <h2 className="table-title">Submissions</h2>
      <table className="submissions-table">
        <thead>
          <tr>
            <th>Registration ID</th>
            <th>Time Submitted</th>
            <th>Submitted File</th>
            <th>Marks</th>
            <th>Update Marks</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-students">
                No students found.
              </td>
            </tr>
          ) : (
            students.map((s) => (
              <tr key={s.reg_id}>
                <td>{s.reg_id}</td>
                <td>{s.submitted ? new Date(s.time).toLocaleString() : "--"}</td>
                <td>
                  {s.file ? (
                    <a href={s.file} target="_blank" rel="noopener noreferrer">View</a>
                  ) : (
                    "Not submitted"
                  )}
                </td>
                <td>
                  {s.submitted ? (
                    <input
                      type="number"
                      value={marksInput[s.reg_id] || s.marks || ""}
                      onChange={(e) => handleMarksChange(e, s.reg_id)}
                      placeholder="Enter marks"
                    />
                  ) : (
                    "--"
                  )}
                </td>
                <td>
                  {s.submitted && (
                    <button onClick={() => handleMarksSubmit(s.reg_id)}>
                      Update
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TeacherAssignmentPage;

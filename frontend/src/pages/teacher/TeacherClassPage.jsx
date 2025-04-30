import { useParams, useLocation, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import supabase from "../../supabase";
import "../../css/TeacherClassPage.css";


function TeacherClassPage() {
  const { id } = useParams();
  const location = useLocation();
  const { name, course_code } = location.state || {};
  const navigate = useNavigate();

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);

  const [dueDate, setDueDate] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [notices, setNotices] = useState([]);
  const [noticeContent, setNoticeContent] = useState("");
  const [assignmentContent, setAssignmentContent] = useState("");

  const [assignments, setAssignments] = useState([]);

  const toggleOptions = () => setIsOptionsOpen(!isOptionsOpen);

  const handleAssignmentClick = (assignment) => {
    navigate(`/teacher/classroom/assignment/${assignment.id}`, {
      state: {
        classId: id,
        content: assignment.content,
        fileUrl: assignment.file_url,
        due_date: assignment.due_date,
      },
    });
  };

  const closeOptions = (e) => {
    if (e.target.classList.contains("options-overlay")) {
      setIsOptionsOpen(false);
    }
  };

  useEffect(() => {
    const fetchNotices = async () => {
      const { data, error } = await supabase
        .from("notices")
        .select("*")
        .eq("class_id", id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching notices:", error.message);
      } else {
        setNotices(data || []);
      }
    };

    fetchNotices();
  }, [id]);

  useEffect(() => {
    const fetchAssignments = async () => {
      const { data, error } = await supabase
        .from("assignments")
        .select("*")
        .eq("class_id", id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching assignments:", error.message);
      } else {
        setAssignments(data || []);
      }
    };

    fetchAssignments();
  }, [id]);

  const handlePostNotice = async () => {
    if (!noticeContent.trim()) return;

    const { error } = await supabase
      .from("notices")
      .insert([{ class_id: id, content: noticeContent, course_code: course_code }]);

    if (error) {
      console.error("Error posting notice:", error.message);
    } else {
      setNotices((prev) => [{ content: noticeContent, created_at: new Date().toISOString() }, ...prev]);
      setNewPost("");
      setIsNoticeModalOpen(false);
    }
  };

  const handlePostAssignment = async () => {
    try {
      if (!assignmentContent.trim() || !selectedFile) {
        alert("Please provide assignment details and select a file.");
        return;
      }
  
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${id}/${fileName}`; // Store inside class folder (optional)
  
      // 1. Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("assignments")
        .upload(filePath, selectedFile);
  
      if (uploadError) {
        console.error("File upload error:", uploadError.message);
        alert("Failed to upload file.");
        return;
      }
  
      // 2. Get public URL
      const { data: publicData } = supabase.storage
        .from("assignments")
        .getPublicUrl(filePath);
  
      const publicUrl = publicData?.publicUrl;
      if (!publicUrl) {
        alert("Failed to get file URL.");
        return;
      }
  
      // 3. Insert record in 'assignments' table with the courseCode
      const { error: dbError } = await supabase
        .from("assignments")
        .insert([
          {
            class_id: id,
            content: assignmentContent,
            file_url: publicUrl,
            due_date: dueDate ? new Date(dueDate).toISOString() : null,
            course_code: course_code // Here you are saving the course code
          },
        ]);
  
      if (dbError) {
        console.error("Database insert error:", dbError.message);
        alert("Failed to save assignment.");
        return;
      }
  
      // 4. Update UI
      setAssignments((prev) => [
        {
          content: assignmentContent,
          file_url: publicUrl,
          created_at: new Date().toISOString(),
          due_date: dueDate ? new Date(dueDate).toISOString() : null,
          course_code: course_code, // Make sure the course code is added to the assignment object
        },
        ...prev,
      ]);
      setAssignmentContent("");
      setSelectedFile(null);
      setIsAssignmentModalOpen(false);
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Something went wrong.");
    }
  };
  
  
  return (
    <div className="class-app-container">
      <nav className="dashboard">
        <h1 className="dashboard-title">
          {name ? `${name} - ${course_code}` : `Class ${id}`}
        </h1>
        <button className="dots-button" onClick={toggleOptions}>
          <BsThreeDotsVertical className="three-dots-icon" />
        </button>
      </nav>

      {isOptionsOpen && (
        <div className="options-overlay" onClick={closeOptions}>
          <div className="options-modal">
            <button
              className="option-btn"
              onClick={() => {
                setIsAssignmentModalOpen(true);
                setIsOptionsOpen(false);
              }}
            >
              Post Assignment
            </button>
            <button
              className="option-btn"
              onClick={() => {
                setIsNoticeModalOpen(true);
                setIsOptionsOpen(false);
              }}
            >
              Post Notice
            </button>
          </div>
        </div>
      )}

      {isNoticeModalOpen && (
        <div className="class-modal-overlay" onClick={() => setIsNoticeModalOpen(false)}>
          <div className="class-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Post Notice</h2>
            <textarea
              placeholder="Write your notice here..."
              value={noticeContent}
              onChange={(e) => setNoticeContent(e.target.value)}
            />
            <button onClick={handlePostNotice}>Post</button>
          </div>
        </div>
      )}

      {isAssignmentModalOpen && (
        <div className="assignment-modal-overlay" onClick={() => setIsAssignmentModalOpen(false)}>
          <div className="assignment-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Post Assignment</h2>
            <textarea
              placeholder="Assignment details..."
              value={assignmentContent}
              onChange={(e) => setAssignmentContent(e.target.value)}
            />
            <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
            <label>Due Date:</label>
            <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}/>
            <button onClick={handlePostAssignment}>Post Assignment</button>
          </div>
        </div>
      )}

      <div className="post-feed">
        {notices.map((notice, index) => (
          <div key={index} className="post-card">
            <strong>Notice:</strong>
            <p>{notice.content}</p>
            {notice.created_at && (
              <small>Posted on {new Date(notice.created_at).toLocaleString()}</small>
            )}
          </div>
        ))}

        {assignments.map((assignment, index) => (
          <div
          key={index}
          className="post-card"
          onClick={() => handleAssignmentClick(assignment)}
          style={{ cursor: "pointer" }}
        >
            <strong>Assignment:</strong>
            <p>{assignment.content}</p>
            {assignment.file_url && (
              <div style ={{ marginBottom: '0.5rem'}}>
                <a href={assignment.file_url} target="_blank" rel="noopener noreferrer">
                   View Attachment  
                </a>
              </div>
            )}
            {assignment.created_at && (
              <small>Posted on {new Date(assignment.created_at).toLocaleString()}</small>
            )}
            {assignment.due_date && (
      <small>
        {", "}Due by{" "}
        {new Date(assignment.due_date).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })}
      </small>
    )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeacherClassPage;

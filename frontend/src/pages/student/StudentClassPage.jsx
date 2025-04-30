import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../../supabase";

function StudentClassPage() {
  const { id } = useParams();
  const location = useLocation();
  const { name, course_code } = location.state || {};
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState([]);
  const [notices, setNotices] = useState([]);

  const handleAssignmentClick = (assignment) => {
    navigate(`/student/classroom/assignment/${assignment.id}`, {
      state: {
        classId: id,
        content: assignment.content,
        fileUrl: assignment.file_url,
        due_date: assignment.due_date,
        course_code: assignment.course_code,
      },
    });
  };

  useEffect(() => {
    const fetchNotices = async () => {
      const { data, error } = await supabase
        .from("notices")
        .select("*")
        .eq("class_id", id)
        .order("created_at", { ascending: false });

      if (!error) setNotices(data || []);
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

      if (!error) setAssignments(data || []);
    };
    fetchAssignments();
  }, [id]);

  return (
    <div className="class-app-container">
      <nav className="dashboard">
        <h1 className="dashboard-title">
          {name ? `${name} - ${course_code}` : `Class ${id}`}
        </h1>
      </nav>

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
              <div style={{ marginBottom: "0.5rem" }}>
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

export default StudentClassPage;



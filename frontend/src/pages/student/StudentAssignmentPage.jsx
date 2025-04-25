import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import supabase from "../../supabase";
import "../../css/StudentHomePage.css";
import "../../css/StudentAssignmentPage.css";

function StudentAssignmentPage() {
  const { id } = useParams(); // assignment ID
  const location = useLocation();

  const { classId, content, fileUrl, due_date } = location.state || {};

  const [classInfo, setClassInfo] = useState({});

  useEffect(() => {
    const fetchClassInfo = async () => {
      if (!classId) return;

      const { data, error } = await supabase
        .from("classes")
        .select("name, description")
        .eq("id", classId)
        .single();

      if (!error) {
        setClassInfo(data);
      } else {
        console.error("Error fetching class info:", error.message);
      }
    };

    fetchClassInfo();
  }, [classId]);

  const renderFilePreview = (url) => {
    if (!url) return null;

    const fileExtension = url.split('.').pop().toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(fileExtension)) {
      return (
        <div className="file-preview-container">
          <img src={url} alt="Assignment Preview" className="preview-image" />
        </div>
      );
    }

    if (fileExtension === 'pdf') {
      return (
        <div className="file-preview-container">
          <iframe
            src={url}
            title="PDF Preview"
            className="preview-pdf"
            frameBorder="0"
          ></iframe>
        </div>
      );
    }

    // Default fallback for unknown types
    return (
      <div className="file-preview-container fallback">
        <p>No preview available for this file type.</p>
      </div>
    );
  };

  return (
    <div className="class-app-container">
      <nav className="dashboard">
        <h1 className="dashboard-title">
          {classInfo.name
            ? `${classInfo.name} - ${classInfo.description}`
            : `Class ${classId}`}
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
    </div>
  );
}

export default StudentAssignmentPage;

import React, { useState } from "react";
import TeacherSidebar from "./TeacherSidebar";

const PostAssignment = () => {
  // State for handling form inputs
  const [assignmentText, setAssignmentText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");

  const courses = [
    "Mathematics - MATH101",
    "Physics - PHY102",
    "Computer Science - CS301",
    "Chemistry - CHEM201",
    "English Literature - ENG401",
  ];

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!assignmentText || !selectedCourse) {
      alert("Please fill out all fields before posting the assignment.");
      return;
    }
    alert(`Assignment Posted Successfully for ${selectedCourse}`);
    // Implement the logic for posting the assignment
    setAssignmentText("");
    setSelectedFile(null);
    setSelectedCourse("");
  };

  return (
    <div style={styles.container}>
      <TeacherSidebar />
      <div style={styles.content}>
        <h2 style={styles.heading}>POST ASSIGNMENT</h2>
        <div style={styles.card}>
          {/* Assignment Text */}
          <label style={styles.label}>Write Assignment:</label>
          <textarea
            style={styles.textArea}
            value={assignmentText}
            onChange={(e) => setAssignmentText(e.target.value)}
            placeholder="Enter the assignment details here..."
          ></textarea>

          {/* File Attachment */}
          <label style={styles.label}>Attach PDF:</label>
          <input
            type="file"
            accept=".pdf"
            style={styles.fileInput}
            onChange={handleFileChange}
          />
          {selectedFile && <p style={styles.fileName}>File: {selectedFile.name}</p>}

          {/* Course Selection */}
          <label style={styles.label}>Select Course:</label>
          <select
            style={styles.select}
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">-- Select a Course --</option>
            {courses.map((course, index) => (
              <option key={index} value={course}>
                {course}
              </option>
            ))}
          </select>

          {/* Post Assignment Button */}
          <button style={styles.button} onClick={handleSubmit}>
            Post Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    marginLeft: "200px",
    justifyContent: "center",
  },
  content: {
    flexGrow: 1,
    padding: "10px",
    maxWidth: "800px",
  },
  heading: {
    marginBottom: "20px",
    color: "#333",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
  },
  label: {
    fontSize: "1rem",
    marginBottom: "10px",
    display: "block",
    color: "#555",
  },
  textArea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "20px",
    resize: "none",
  },
  fileInput: {
    fontSize: "1rem",
    marginBottom: "10px",
  },
  fileName: {
    fontSize: "0.9rem",
    color: "#555",
    marginBottom: "20px",
  },
  select: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "20px",
  },
  button: {
    width: "100%",
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#4CAF50",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
};

export default PostAssignment;

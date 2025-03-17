import React, { useState } from "react";
import StudentSidebar from "./StudentSidebar";

const ContactPage = () => {
  // State for form handling
  const [recipient, setRecipient] = useState("admin"); // Default: admin
  const [message, setMessage] = useState("");
  const [teacher, setTeacher] = useState("");
  const [department, setDepartment] = useState("");

  const handleSend = () => {
    if (recipient === "admin") {
      alert(`Message sent to Admin: ${message}`);
    } else if (recipient === "teacher" && teacher && department) {
      alert(`Message sent to ${teacher} (${department}): ${message}`);
    } else {
      alert("Please fill all fields before sending the message.");
    }
  };

  return (
    <div style={styles.container}>
      <StudentSidebar />
      <div style={styles.content}>
        <h1 style={styles.heading}>CONTACT US</h1>
        <div style={styles.form}>
          {/* Message Input */}
          <textarea
            style={styles.textarea}
            rows="5"
            placeholder="Describe the issue you're facing..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          {/* Recipient Options */}
          <div style={styles.options}>
            <label>
              <input
                type="radio"
                name="recipient"
                value="admin"
                checked={recipient === "admin"}
                onChange={() => setRecipient("admin")}
              />
              Send to Admin
            </label>
            <label>
              <input
                type="radio"
                name="recipient"
                value="teacher"
                checked={recipient === "teacher"}
                onChange={() => setRecipient("teacher")}
              />
              Send to Teacher
            </label>
          </div>

          {/* Teacher Details (conditional) */}
          {recipient === "teacher" && (
            <div style={styles.teacherOptions}>
              <input
                style={styles.input}
                type="text"
                placeholder="Teacher Name"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
              />
              <input
                style={styles.input}
                type="text"
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
          )}

          {/* Send Button */}
          <button style={styles.sendButton} onClick={handleSend}>
            Send
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
    alignItems: "flex-start",
    justifyContent: "center",
  },
  content: {
    flexGrow: 1,
    paddingBottom: "50px", // Space for the footer
    textAlign: "center",
    maxWidth: "700px",
  },
  heading: {
    fontSize: "1.5rem",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    backgroundColor: "#fff",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  },
  textarea: {
    width: "95%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginBottom: "15px",
    fontSize: "1rem",
  },
  options: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },
  teacherOptions: {
    marginBottom: "15px",
  },
  input: {
    width: "95%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginBottom: "10px",
    fontSize: "1rem",
  },
  sendButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#4CAF50",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ContactPage;

import React, { useState, useEffect } from "react";
import TeacherSidebar from "./TeacherSidebar";
import supabase from "../../supabase"; // assuming your supabase client is here

const ContactPage = () => {
  const [recipient, setRecipient] = useState("admin"); // Default: admin
  const [message, setMessage] = useState("");
  const [student, setStudent] = useState(""); // student name instead of teacher
  const [regId, setRegId] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: userData, error } = await supabase.auth.getUser();
      if (error || !userData?.user) {
        console.error("User not logged in");
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("reg_id")
        .eq("id", userData.user.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError.message);
        return;
      }

      setRegId(profileData.reg_id);
    };

    fetchProfile();
  }, []);

  const handleSend = async () => {
    if (!message.trim()) {
      alert("Please enter a message before sending.");
      return;
    }

    if (!regId) {
      alert("User profile not loaded yet. Please try again in a few seconds.");
      return;
    }

    let receiverId = null;

    if (recipient === "admin") {
      receiverId = 6; // 4 for admin
    } else if (recipient === "student") {
      if (!student.trim()) {
        alert("Please enter the student's name.");
        return;
      }

      const { data: studentProfiles, error } = await supabase
        .from("profiles")
        .select("id, name, role")
        .eq("role", "student")
        .ilike("name", `%${student}%`);

      if (error) {
        console.error("Error fetching student profiles:", error.message);
        return;
      }

      if (!studentProfiles || studentProfiles.length === 0) {
        alert("Student not found. Please check the name.");
        return;
      }

      receiverId = 7; // 5 for student
    }

    try {
      const { error: insertError } = await supabase.from("announcements").insert([
        {
          announcement_msg: message,
          sender: regId, // teacher's reg_id
          receiver: receiverId,
        },
      ]);

      if (insertError) {
        console.error("Error sending message:", insertError.message);
        return;
      }

      alert("Message sent successfully!");
      setMessage("");
      setStudent(""); // Clear student name input
      setRecipient("admin"); // Default recipient reset
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };

  return (
    <div style={styles.container}>
      <TeacherSidebar />
      <div style={styles.content}>
        <h1 style={styles.heading}>CONTACT US</h1>
        <div style={styles.form}>
          <textarea
            style={styles.textarea}
            rows="5"
            placeholder="Describe the issue you're facing..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

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
                value="student"
                checked={recipient === "student"}
                onChange={() => setRecipient("student")}
              />
              Send to Student
            </label>
          </div>

          {recipient === "student" && (
            <div style={styles.studentOptions}>
              <input
                style={styles.input}
                type="text"
                placeholder="Student Name"
                value={student}
                onChange={(e) => setStudent(e.target.value)}
              />
            </div>
          )}

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
    paddingBottom: "50px",
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
  studentOptions: {
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

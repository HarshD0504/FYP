import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import TeacherImage from "../../assets/teacher_icon.png"; 
import StudentImage from "../../assets/group.png"; 
import ClassImage from "../../assets/books.png"; 
import supabase from "../../supabase"; // Make sure the correct import path is used

const AdminHome = () => {
  const [announcementText, setAnnouncementText] = useState("");
  const [audience, setAudience] = useState(""); // 'teachers', 'students', or 'both'
  const [regId, setRegId] = useState(null);
  const [counts, setCounts] = useState({
    teachers: 0,
    students: 0,
    courses: 0,
  });

  // Fetch Profile and Counts
  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('reg_id')
        .eq('id', (await supabase.auth.getUser()).data.user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setRegId(data.reg_id);
      }
    };

    const fetchCounts = async () => {
      // Fetch teacher count
      const { count: teacherCount, error: teacherError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'teacher');

      if (teacherError) console.error("Error fetching teacher count:", teacherError.message);

      // Fetch student count
      const { count: studentCount, error: studentError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'student');

      if (studentError) console.error("Error fetching student count:", studentError.message);

      // Fetch courses count
      const { count: courseCount, error: courseError } = await supabase
        .from('classes')
        .select('*', { count: 'exact', head: true });

      if (courseError) console.error("Error fetching course count:", courseError.message);

      setCounts({
        teachers: teacherCount || 0,
        students: studentCount || 0,
        courses: courseCount || 0,
      });
    };

    fetchProfile();
    fetchCounts();
  }, []);

  const handlePostAnnouncement = async () => {
    if (!announcementText || !audience) {
      alert("Please enter the announcement and select audience.");
      return;
    }

    let typeValue = 0;
    let receiverValue = 0;

    if (audience === "teachers") {
      typeValue = 3;   // admin to teacher
      receiverValue = 2;
    } else if (audience === "students") {
      typeValue = 4;   // admin to student
      receiverValue = 1;
    } else if (audience === "both") {
      typeValue = 8;   // admin to broadcast all
      receiverValue = 3;
    }

    const { data, error } = await supabase.from('announcements').insert([
      {
        announcement_msg: announcementText,
        type: typeValue,
        sender: regId,
        receiver: receiverValue,
      }
    ]);

    if (error) {
      console.error("Error posting announcement:", error);
      alert("Failed to post announcement.");
    } else {
      alert("Announcement posted successfully!");
      setAnnouncementText("");
      setAudience("");
    }
  };

  return (
    <div style={styles.container}>
      <AdminSidebar />
      <div style={styles.content}>
        {/* Cards Section */}
        <div style={styles.cardsContainer}>
          <div style={styles.card}>
            <img src={TeacherImage} alt="Teachers" style={styles.cardImage} />
            <h3 style={styles.cardHeading}>Total Teachers:</h3>
            <p style={styles.cardText}>{counts.teachers}</p>
          </div>
          <div style={styles.card}>
            <img src={StudentImage} alt="Students" style={styles.cardImage} />
            <h3 style={styles.cardHeading}>Total Students:</h3>
            <p style={styles.cardText}>{counts.students}</p>
          </div>
          <div style={styles.card}>
            <img src={ClassImage} alt="Classes" style={styles.cardImage} />
            <h3 style={styles.cardHeading}>Total Courses:</h3>
            <p style={styles.cardText}>{counts.courses}</p>
          </div>
        </div>

        {/* Add Post Section */}
        <div style={styles.addPostBox}>
          <h3 style={styles.announcementHeading}>CREATE ANNOUNCEMENT</h3>
          <textarea
            style={styles.textArea}
            placeholder="Write your announcement here..."
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
          />
          <div style={styles.options}>
            {/* Target Audience */}
            <div style={styles.optionGroup}>
              <label>Target Audience:</label>
              <div>
                <input
                  type="radio"
                  id="teachers"
                  name="audience"
                  value="teachers"
                  checked={audience === "teachers"}
                  onChange={(e) => setAudience(e.target.value)}
                />
                <label htmlFor="teachers">Teachers</label>

                <input
                  type="radio"
                  id="students"
                  name="audience"
                  value="students"
                  checked={audience === "students"}
                  onChange={(e) => setAudience(e.target.value)}
                  style={{ marginLeft: "10px" }}
                />
                <label htmlFor="students">Students</label>

                <input
                  type="radio"
                  id="both"
                  name="audience"
                  value="both"
                  checked={audience === "both"}
                  onChange={(e) => setAudience(e.target.value)}
                  style={{ marginLeft: "10px" }}
                />
                <label htmlFor="both">Both</label>
              </div>
            </div>
          </div>

          {/* Post Button */}
          <button style={styles.postButton} onClick={handlePostAnnouncement}>
            Post Announcement
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
  },
  content: {
    marginLeft: "120px",
    padding: "20px",
    flexGrow: 1,
    overflowY: "auto",
  },
  cardsContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    marginBottom: "15px",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: "10px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "200px",
    transition: "transform 0.3s ease",
    cursor: "pointer",
  },
  cardImage: {
    height: "80px",
  },
  cardHeading: {
    marginBottom: "5px",
    color: "#333",
  },
  cardText: {
    color: "#555",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  addPostBox: {
    backgroundColor: "#ffffff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    margin: "0 auto",
  },
  announcementHeading: {
    marginTop: "0",
    marginBottom: "10px",
    color: "#333",
  },
  textArea: {
    width: "96%",
    height: "100px",
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    resize: "none",
  },
  options: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  optionGroup: {
    display: "flex",
    flexDirection: "column",
  },
  postButton: {
    backgroundColor: "#4caf50",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
  },
};

export default AdminHome;


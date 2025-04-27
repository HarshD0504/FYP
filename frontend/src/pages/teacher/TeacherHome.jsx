import React, { useState, useEffect } from "react";
import TeacherSidebar from "./TeacherSidebar";
import timetableImage from "../../assets/timetable_electronics.png";
import supabase from "../../supabase"; // adjust if needed

const TeacherHome = () => {
  const [teacherCourses, setTeacherCourses] = useState([]); // To store the courses
  const [loading, setLoading] = useState(true);
  const [notifications] = useState([
    "Staff meeting scheduled for Monday at 10:00 AM.",
    "Submit grades by the end of the week.",
    "Updated timetable available now.",
  ]);

  useEffect(() => {
    const fetchTeacherCourses = async () => {
      // Get the authenticated user
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // If no user is found, navigate to login
        navigate("/login");
        return;
      }

      // Fetch the teacher's profile based on user ID to get the reg_id
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("reg_id")
        .eq("id", user.id)
        .single();

      if (profileError || !profile) {
        console.error("Error fetching profile:", profileError?.message);
        return;
      }

      // Fetch the courses assigned to the teacher based on their reg_id
      const { data: courses, error: coursesError } = await supabase
        .from("classes")
        .select("name, description, branch, year")
        .eq("reg_id", profile.reg_id);

      if (coursesError) {
        console.error("Error fetching courses:", coursesError?.message);
        return;
      }

      setTeacherCourses(courses);
      setLoading(false);
    };

    fetchTeacherCourses();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <TeacherSidebar />
      <div style={styles.content}>
        <div style={styles.cardsRow}>
          {/* Subjects Card */}
          <div style={styles.card}>
            <h3>MY SUBJECTS</h3>
            <div style={styles.subjectList}>
              {teacherCourses.length > 0 ? (
                teacherCourses.map((course, index) => (
                  <div key={index} style={styles.subjectItem}>
                    <p style={styles.subjectText}>
                      <strong>{course.name}</strong> ({course.description}) {/* course.description is the course code */}
                    </p>
                    <p style={styles.subjectDetails}>
                      Year: {course.year} | Branch: {course.branch}
                    </p>
                  </div>
                ))
              ) : (
                <p>No courses assigned</p>
              )}
            </div>
          </div>

          {/* Timetable Card */}
          <div style={{ ...styles.card, ...styles.timetableCard }}>
            <h3>MY TIMETABLE</h3>
            <div style={styles.imageContainer}>
              <img src={timetableImage} alt="Timetable" style={styles.image} />
            </div>
          </div>
        </div>

        {/* Notifications/Announcements Card */}
        <div style={{ ...styles.card, ...styles.notificationsCard }}>
          <h3>ANNOUNCEMENTS</h3>
          <ul style={styles.notificationList}>
            {notifications.map((notification, index) => (
              <li key={index} style={styles.notificationItem}>
                {notification}
              </li>
            ))}
          </ul>
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
    maxWidth: "1000px",
  },
  cardsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "20px",
  },
  card: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    minWidth: "300px",
    transition: "transform 0.2s",
  },
  timetableCard: {
    flex: 1,
  },
  subjectList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px", // Reduce space between items
  },
  subjectItem: {
    textAlign: "left",
    padding: "8px 10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "#f9f9f9",
  },
  subjectText: {
    margin: 0,
    fontWeight: "600",
    fontSize: "14px",
    color: "#333",
  },
  subjectDetails: {
    margin: 0,
    fontSize: "12px",
    color: "#666",
  },
  imageContainer: {
    marginTop: "10px",
    overflow: "hidden",
    borderRadius: "8px",
  },
  image: {
    width: "100%",
    height: "auto",
    display: "block",
  },
  notificationsCard: {
    flex: 1,
    padding: "20px",
    marginTop: "20px",
  },
  notificationList: {
    listStyleType: "none",
    padding: 0,
    textAlign: "left",
  },
  notificationItem: {
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "4px",
  },
};

export default TeacherHome;


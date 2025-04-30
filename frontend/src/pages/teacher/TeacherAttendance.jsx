import React, { useState, useEffect } from "react";
import TeacherSidebar from "./TeacherSidebar";
import supabase from "../../supabase"; // adjust import if needed

const TeacherAttendance = () => {
  const [teacherCourses, setTeacherCourses] = useState([]); // Store courses assigned to the teacher
  const [loading, setLoading] = useState(true); // Loading state

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
        .select("name, course_code, year, branch") // Fetch course name, course_code (code), year, and branch
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
        <h2 style={styles.heading}>ATTENDANCE DATA</h2>
        <div style={styles.cardGrid}>
          {teacherCourses.length > 0 ? (
            teacherCourses.map((course, index) => (
              <div key={index} style={styles.card}>
                <h4 style={styles.cardTitle}>{course.name}</h4> {/* Course Name */}
                <p style={styles.courseCode}>Code: {course.course_code}</p> {/* Course Code */}
                <p style={styles.details}>Branch: {course.branch}</p> {/* Course Branch */}
                <p style={styles.details}>Year: {course.year}</p> {/* Course Year */}
                <button
                  style={styles.button}
                  onClick={() => (window.location.href = "/teacher/attendance-report")}
                >
                  View Attendance Report
                </button>
              </div>
            ))
          ) : (
            <p>No courses assigned</p>
          )}
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
    textAlign: "center",
    maxWidth: "1100px",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  cardTitle: {
    fontSize: "1.2rem",
    color: "#4CAF50",
    marginBottom: "10px",
    textAlign: "center"
  },
  courseCode: {
    fontSize: "1.1rem",
    color: "#555",
    marginBottom: "5px",
  },
  details: {
    fontSize: "1rem",
    color: "#777",
    marginBottom: "5px",
  },
  button: {
    marginTop: "15px",
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

export default TeacherAttendance;


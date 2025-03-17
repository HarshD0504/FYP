import React from "react";
import TeacherSidebar from "./TeacherSidebar";

const TeacherAttendance = () => {
  // Mock data for courses
  const courses = [
    { courseName: "Mathematics", courseCode: "MATH101", department: "Science", year: "1st Year" },
    { courseName: "Physics", courseCode: "PHY102", department: "Science", year: "2nd Year" },
    { courseName: "Computer Science", courseCode: "CS301", department: "Engineering", year: "3rd Year" },
    { courseName: "Chemistry", courseCode: "CHEM201", department: "Science", year: "2nd Year" },
    { courseName: "English Literature", courseCode: "ENG401", department: "Arts", year: "4th Year" },
  ];

  return (
    <div style={styles.container}>
      <TeacherSidebar />
      <div style={styles.content}>
        <h2 style={styles.heading}>ATTENDANCE DATA</h2>
        <div style={styles.cardGrid}>
          {courses.map((course, index) => (
            <div key={index} style={styles.card}>
              <h4 style={styles.cardTitle}>{course.courseName}</h4>
              <p style={styles.courseCode}>Code: {course.courseCode}</p>
              <p style={styles.details}>Department: {course.department}</p>
              <p style={styles.details}>Year: {course.year}</p>
              <button
                style={styles.button}
                onClick={() => (window.location.href = "/teacher/attendance-report")}
              >
                View Attendance Report
              </button>
            </div>
          ))}
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

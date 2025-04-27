import React from "react";
import TeacherSidebar from "./TeacherSidebar";
import timetableImage from "../../assets/timetable_electronics.png";

const TeacherHome = () => {
  const teacherSubjects = [
    { courseName: "Mathematics", code: "MATH101", year: "1st", classroom: "A101" },
    { courseName: "Physics", code: "PHY202", year: "2nd", classroom: "B202" },
    { courseName: "Chemistry", code: "CHEM303", year: "3rd", classroom: "C303" },
    { courseName: "Biology", code: "BIO404", year: "4th", classroom: "D404" },
    { courseName: "Computer Science", code: "CS505", year: "4th", classroom: "E505" },
  ];

  const notifications = [
    "Staff meeting scheduled for Monday at 10:00 AM.",
    "Submit grades by the end of the week.",
    "Updated timetable available now.",
  ];

  return (
    <div style={styles.container}>
      <TeacherSidebar />
      <div style={styles.content}>
        <div style={styles.cardsRow}>
          {/* Subjects Card */}
          <div style={styles.card}>
            <h3>MY SUBJECTS</h3>
            <div style={styles.subjectList}>
              {teacherSubjects.map((subject, index) => (
                <div key={index} style={styles.subjectItem}>
                  <p style={styles.subjectText}>
                    <strong>{subject.courseName}</strong> ({subject.code})
                  </p>
                  <p style={styles.subjectDetails}>
                    Year: {subject.year} | Classroom: {subject.classroom}
                  </p>
                </div>
              ))}
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

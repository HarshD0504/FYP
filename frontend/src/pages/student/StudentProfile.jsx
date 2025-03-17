import React from "react";
import StudentSidebar from "./StudentSidebar";
import profileImage from "../../assets/profile.png"; // Replace this with the actual path to your image

const StudentProfile = () => {
  // Dummy student data
  const student = {
    name: "John Doe",
    id: "STU12345",
    email: "john.doe@example.com",
    program: "B.Tech - Computer Science",
    courses: [
      { code: "MATH101", name: "Mathematics" },
      { code: "PHYS102", name: "Physics" },
      { code: "CHEM103", name: "Chemistry" },
      { code: "CS104", name: "Computer Science" },
      { code: "BIO105", name: "Biology" },
    ],
    fingerprintEnrolled: false, // Change to true to simulate enrolled status
  };

  return (
    <div style={styles.container}>
      <StudentSidebar />
      <div style={styles.content}>
        <h1 style={styles.heading}>STUDENT PROFILE</h1>
        <div style={styles.profileContainer}>
          {/* Left Side: Student Details */}
          <div style={styles.details}>
            <div style={styles.detailBox}>
              <strong>Name:</strong> {student.name}
            </div>
            <div style={styles.detailBox}>
              <strong>ID:</strong> {student.id}
            </div>
            <div style={styles.detailBox}>
              <strong>Email:</strong> {student.email}
            </div>
            <div style={styles.detailBox}>
              <strong>Program:</strong> {student.program}
            </div>
            <div style={styles.fingerprintStatus}>
              <strong>Fingerprint Status:</strong>{" "}
              {student.fingerprintEnrolled ? (
                <span style={styles.enrolled}>Enrolled</span>
              ) : (
                <span style={styles.notEnrolled}>
                  Not Enrolled{" "}
                  <button
                    style={styles.contactButton}
                    onClick={() => alert("Contacting Admin...")}
                  >
                    Contact Admin
                  </button>
                </span>
              )}
            </div>
            
            <div style={styles.tableContainer}>
              <h3 style={styles.subheading}>COURSES</h3>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Course Code</th>
                    <th style={styles.tableHeader}>Course Name</th>
                  </tr>
                </thead>
                <tbody>
                  {student.courses.map((course, index) => (
                    <tr key={index}>
                      <td style={styles.tableCell}>{course.code}</td>
                      <td style={styles.tableCell}>{course.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Side: Profile Picture */}
          <div style={styles.profilePictureContainer}>
            <img
              src={profileImage}
              alt="Student Profile"
              style={styles.profilePicture}
            />
          </div>
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
    maxWidth: "1000px",
  },
  heading: {
    fontSize: "1.5rem",
    marginBottom: "20px",
    color: "#333",
  },
  profileContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "40px",
  },
  details: {
    flex: 1,
  },
  detailBox: {
    backgroundColor: "#fff",
    padding: "10px 15px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  fingerprintStatus: {
    marginTop: "10px",
    marginBottom: "20px",
    fontSize: "1.2rem",
    backgroundColor: "#f5f5f5",
    padding: "10px",
    border: "2px solid #FF5722",
    borderRadius: "4px",
  },
  enrolled: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  notEnrolled: {
    color: "#FF5722",
    fontWeight: "bold",
  },
  contactButton: {
    marginLeft: "10px",
    padding: "5px 10px",
    fontSize: "0.9rem",
    color: "#fff",
    backgroundColor: "#FF5722",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  subheading: {
    fontSize: "1.2rem",
    marginBottom: "10px",
    color: "#333",
  },
  tableContainer: {
    marginTop: "30px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  tableHeader: {
    borderBottom: "2px solid #ddd",
    padding: "10px",
    backgroundColor: "#f4f4f4",
  },
  tableCell: {
    borderBottom: "1px solid #ddd",
    padding: "8px",
  },
  profilePictureContainer: {
    width: "150px",
    height: "150px",
    border: "1px solid #ddd",
    borderRadius: "50%",
    overflow: "hidden",
    textAlign: "center",
    backgroundColor: "#fff",
  },
  profilePicture: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

export default StudentProfile;

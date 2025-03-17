import React from "react";
import StudentSidebar from "./StudentSidebar";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const StudentAttendance = () => {
  // Dummy data for subjects
  const subjects = [
    {
      id: 1,
      name: "Mathematics",
      code: "MATH101",
      attendancePercent: 85,
      classesAttended: 34,
      totalClasses: 40,
    },
    {
      id: 2,
      name: "Physics",
      code: "PHYS102",
      attendancePercent: 75,
      classesAttended: 30,
      totalClasses: 40,
    },
    {
      id: 3,
      name: "Chemistry",
      code: "CHEM103",
      attendancePercent: 90,
      classesAttended: 36,
      totalClasses: 40,
    },
    {
      id: 4,
      name: "Computer Science",
      code: "CS104",
      attendancePercent: 95,
      classesAttended: 38,
      totalClasses: 40,
    },
    {
      id: 5,
      name: "Biology",
      code: "BIO105",
      attendancePercent: 80,
      classesAttended: 32,
      totalClasses: 40,
    },
    {
      id: 6,
      name: "English",
      code: "ENG106",
      attendancePercent: 70,
      classesAttended: 28,
      totalClasses: 40,
    },
  ];

  return (
    <div style={styles.container}>
      <StudentSidebar />
      <div style={styles.content}>
        <h2 style={styles.heading}>SUBJECT-WISE ATTENDANCE</h2>
        <div style={styles.cardsContainer}>
          {subjects.map((subject) => (
            <div key={subject.id} style={styles.card}>
              <h4>
                {subject.name} ({subject.code})
              </h4>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={[
                      {
                        name: "Attended",
                        value: subject.classesAttended,
                        color: "#4CAF50",
                      },
                      {
                        name: "Missed",
                        value: subject.totalClasses - subject.classesAttended,
                        color: "#FF5722",
                      },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={50}
                    label
                  >
                    <Cell key="attended" fill="#4CAF50" />
                    <Cell key="missed" fill="#FF5722" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <p>{subject.attendancePercent}% Attendance</p>
              <p>
                {subject.classesAttended} out of {subject.totalClasses} classes
                attended
              </p>
              <button
                style={styles.button}
                onClick={() =>
                  (window.location.href = `/subject/${subject.code}/report`)
                }
              >
                Date-Wise Attendance Report
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
    alignItems: "flex-start",
    justifyContent: "center",
  },
  content: {
    flexGrow: 1,
    paddingBottom: "50px", // Space for the footer
    textAlign: "center",
    maxWidth: "1100px",
  },
  heading: {
    marginBottom: "20px",
    color: "#333",
  },
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    paddingBottom: "20px",
    textAlign: "center",
    transition: "transform 0.2s",
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#4CAF50",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default StudentAttendance;

import React, { useEffect, useState } from "react";
import StudentSidebar from "./StudentSidebar";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import supabase from "../../supabase"; // <-- Import supabase
import timetableExtc from "../../assets/timetable_extc.jpg"; // <-- Your EXTC timetable
import timetableElectronics from "../../assets/timetable_electronics.png"; // <-- Your Electronics timetable

const StudentHome = () => {
  const [branch, setBranch] = useState(null);

  useEffect(() => {
    const fetchBranch = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        alert("Error fetching user. Please login again.");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("branch")
        .eq("id", user.id)
        .single();

      if (profileError || !profile) {
        alert("Error fetching profile. Please complete signup.");
        return;
      }

      setBranch(profile.branch?.toLowerCase()); // make sure it's lowercase
    };

    fetchBranch();
  }, []);

  // Mock data for attendance pie chart
  const attendanceData = [
    { name: "Attended", value: 75, color: "#4CAF50" },
    { name: "Missed", value: 25, color: "#FF5722" },
  ];

  // Mock data for pending assignments
  const pendingAssignments = [
    { id: 1, subject: "Mathematics", dueDate: "2025-01-30T23:59:59" },
    { id: 2, subject: "Physics", dueDate: "2025-02-02T18:00:00" },
    { id: 3, subject: "Computer Science", dueDate: "2025-02-05T12:00:00" },
    { id: 4, subject: "Chemistry", dueDate: "2025-01-24T23:59:59" },
  ];

  const calculateTimeLeft = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due - now;

    if (diff <= 0) return "Past Due";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 1) return `${days} days left`;
    if (days === 1) return "1 day left";
    if (hours > 0) return `${hours} hrs left`;
    return "Few hrs left";
  };

  if (!branch) {
    return <div>Loading...</div>; // or a nice spinner
  }

  const timetableImage = branch === "extc" ? timetableExtc : timetableElectronics;

  return (
    <div style={styles.container}>
      <StudentSidebar />
      <div style={styles.content}>
        <div style={styles.cardsRow}>
          {/* Attendance Card */}
          <div style={styles.card}>
            <h3>TOTAL ATTENDANCE</h3>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie
                  data={attendanceData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={50}
                  label
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <p>75% of classes attended</p>
            <button
              style={styles.button}
              onClick={() => (window.location.href = "/student/attendance")}
            >
              View Subject-wise Attendance
            </button>
          </div>

          {/* Timetable Card */}
          <div style={styles.card}>
            <h3>MY TIMETABLE</h3>
            <img
              src={timetableImage}
              alt="Timetable"
              style={styles.timetableImage}
            />
          </div>
        </div>

        {/* Pending Assignments Section */}
        <div style={styles.assignmentCard}>
          <h3>PENDING ASSIGNMENTS</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableCell}>Subject</th>
                <th style={styles.tableCell}>Due Date</th>
                <th style={styles.tableCell}>Time Left</th>
                <th style={styles.tableCell}>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingAssignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td style={styles.tableCell}>{assignment.subject}</td>
                  <td style={styles.tableCell}>
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </td>
                  <td style={styles.tableCell}>
                    {calculateTimeLeft(assignment.dueDate)}
                  </td>
                  <td style={styles.tableCell}>
                    <button
                      style={styles.tableButton}
                      onClick={() =>
                        (window.location.href = "/assignments")
                      }
                    >
                      View Assignment
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Styles same as before
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
    paddingBottom: "80px",
    textAlign: "center",
    maxWidth: "1100px",
  },
  cardsRow: {
    display: "flex",
    gap: "40px",
  },
  card: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s",
    textAlign: "center",
    marginBottom: "30px"
  },
  timetableImage: {
    width: "90%",
  },
  assignmentCard: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
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
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
    textAlign: "left",
  },
  tableButton: {
    padding: "8px 12px",
    fontSize: "0.9rem",
    color: "#fff",
    backgroundColor: "#4CAF50",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  tableCell: {
    padding: "12px 20px",
    border: "1px solid #ddd",
    textAlign: "left",
  },
};

export default StudentHome;


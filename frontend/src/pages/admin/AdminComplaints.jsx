import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";

const AdminComplaints = () => {
  // Example data structure for complaints
  const initialComplaints = [
    {
      id: "S001",
      name: "John Doe",
      email: "johndoe@example.com",
      department: "Computer Science",
      year: "2nd Year",
      message: "Having issues with the system login.",
      resolved: false, // complaint status
    },
    {
      id: "T001",
      name: "Jane Smith",
      email: "janesmith@example.com",
      department: "Mathematics",
      year: "N/A", // Teachers might not have a year
      message: "Requesting a new classroom for the upcoming semester.",
      resolved: false,
    },
  ];

  // State to track complaints
  const [complaints, setComplaints] = useState(initialComplaints);

  // Toggle the resolved status of a complaint
  const toggleResolve = (id) => {
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === id
          ? { ...complaint, resolved: !complaint.resolved }
          : complaint
      )
    );
  };

  return (
    <div style={styles.container}>
      <AdminSidebar />
      <div style={styles.content}>
        <h2>COMPLAINTS</h2>
        <p>Here you can view and manage complaints from students and teachers.</p>

        {/* Complaints Table */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>ID</th>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Email</th>
              <th style={styles.tableHeader}>Department</th>
              <th style={styles.tableHeader}>Year</th>
              <th style={styles.tableHeader}>Message</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.id}>
                <td style={styles.tableCell}>{complaint.id}</td>
                <td style={styles.tableCell}>{complaint.name}</td>
                <td style={styles.tableCell}>{complaint.email}</td>
                <td style={styles.tableCell}>{complaint.department}</td>
                <td style={styles.tableCell}>{complaint.year || "N/A"}</td>
                <td style={styles.tableCell}>{complaint.message}</td>
                <td style={styles.tableCell}>
                  <span
                    style={{
                      ...styles.status,
                      backgroundColor: complaint.resolved
                        ? "#4CAF50"
                        : "#FF9800",
                    }}
                  >
                    {complaint.resolved ? "Resolved" : "Unresolved"}
                  </span>
                </td>
                <td style={styles.tableCell}>
                  <button
                    style={styles.resolveButton}
                    onClick={() => toggleResolve(complaint.id)}
                  >
                    {complaint.resolved ? "Mark as Unresolved" : "Mark as Resolved"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    marginLeft: "20px", // space for the sidebar
    padding: "20px",
    flexGrow: 1,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  tableHeader: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    textAlign: "left",
  },
  tableCell: {
    padding: "10px",
    border: "1px solid #ddd",
  },
  status: {
    padding: "5px 10px",
    borderRadius: "4px",
    color: "#fff",
    textAlign: "center",
  },
  resolveButton: {
    padding: "8px 12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default AdminComplaints;

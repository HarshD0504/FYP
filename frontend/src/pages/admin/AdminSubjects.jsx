import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";

const AdminSubjects = () => {
  // Dummy data
  const courses = [
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      teachers: [
        {
          id: "T001",
          name: "Alice Johnson",
          email: "alice.johnson@example.com",
        },
        { id: "T002", name: "Bob Smith", email: "bob.smith@example.com" },
      ],
      students: [
        {
          id: "S001",
          name: "John Doe",
          email: "john.doe@example.com",
          year: "First",
          department: "CS",
        },
        {
          id: "S002",
          name: "Jane Smith",
          email: "jane.smith@example.com",
          year: "Second",
          department: "CS",
        },
        {
          id: "S003",
          name: "Michael Brown",
          email: "michael.brown@example.com",
          year: "First",
          department: "CS",
        },
      ],
    },
    {
      code: "EE201",
      name: "Electrical Circuits",
      teachers: [
        { id: "T003", name: "Carol Davis", email: "carol.davis@example.com" },
      ],
      students: [
        {
          id: "S004",
          name: "Emily Clark",
          email: "emily.clark@example.com",
          year: "Third",
          department: "EE",
        },
        {
          id: "S005",
          name: "David Lee",
          email: "david.lee@example.com",
          year: "Second",
          department: "EE",
        },
      ],
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRowData, setNewRowData] = useState({});
  const [editingTable, setEditingTable] = useState(null); // "teachers" or "students"

  // Handle search
  const handleSearch = () => {
    const course = courses.find(
      (c) =>
        c.code.toLowerCase() === searchTerm.toLowerCase() ||
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSelectedCourse(course || null);
  };

  // Handle row addition
  const handleAddRow = () => {
    if (editingTable === "teachers") {
      selectedCourse.teachers.push(newRowData);
    } else if (editingTable === "students") {
      selectedCourse.students.push(newRowData);
    }
    setSelectedCourse({ ...selectedCourse }); // Trigger re-render
    setShowAddModal(false);
  };

  // Handle row deletion
  const handleDeleteRow = (type, index) => {
    if (type === "teachers") {
      selectedCourse.teachers.splice(index, 1);
    } else if (type === "students") {
      selectedCourse.students.splice(index, 1);
    }
    setSelectedCourse({ ...selectedCourse }); // Trigger re-render
  };

  return (
    <div style={styles.container}>
      <AdminSidebar />
      <div style={styles.content}>
        <h2 style={styles.title}>ENTER COURSE</h2>

        {/* Search Bar */}
        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Enter Course Name or Code"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleSearch} style={styles.button}>
            Search
          </button>
        </div>

        {/* Display Tables */}
        {selectedCourse ? (
          <>
            <h2>
              Course: {selectedCourse.name} ({selectedCourse.code})
            </h2>

            {/* Add Teacher and Add Student buttons */}
            <div style={styles.addButtonsContainer}>
              <button
                onClick={() => {
                  setEditingTable("teachers");
                  setShowAddModal(true);
                }}
                style={styles.addButton}
              >
                Add Teacher
              </button>
              <button
                onClick={() => {
                  setEditingTable("students");
                  setShowAddModal(true);
                }}
                style={styles.addButton}
              >
                Add Student
              </button>
            </div>

            {/* Assigned Teachers Table */}
            <h3 style={styles.tableHeading}>Assigned Teachers</h3>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableCell}>ID</th>
                  <th style={styles.tableCell}>Name</th>
                  <th style={styles.tableCell}>Email</th>
                  <th style={styles.tableCell}>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedCourse.teachers.map((teacher, index) => (
                  <tr key={index}>
                    <td style={styles.tableCell}>{teacher.id}</td>
                    <td style={styles.tableCell}>{teacher.name}</td>
                    <td style={styles.tableCell}>{teacher.email}</td>
                    <td style={styles.tableCell}>
                      <button
                        onClick={() => handleDeleteRow("teachers", index)}
                        style={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Enrolled Students Table */}
            <h3 style={styles.tableHeading}>Enrolled Students</h3>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableCell}>ID</th>
                  <th style={styles.tableCell}>Name</th>
                  <th style={styles.tableCell}>Email</th>
                  <th style={styles.tableCell}>Year</th>
                  <th style={styles.tableCell}>Department</th>
                  <th style={styles.tableCell}>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedCourse.students.map((student, index) => (
                  <tr key={index}>
                    <td style={styles.tableCell}>{student.id}</td>
                    <td style={styles.tableCell}>{student.name}</td>
                    <td style={styles.tableCell}>{student.email}</td>
                    <td style={styles.tableCell}>{student.year}</td>
                    <td style={styles.tableCell}>{student.department}</td>
                    <td style={styles.tableCell}>
                      <button
                        onClick={() => handleDeleteRow("students", index)}
                        style={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p>No course found. Please search for a valid course.</p>
        )}

        {/* Add Row Modal */}
        {showAddModal && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <h3>
                Add {editingTable === "teachers" ? "Teacher" : "Student"}
              </h3>
              {Object.keys(
                editingTable === "teachers"
                  ? { id: "", name: "", email: "" }
                  : { id: "", name: "", email: "", year: "", department: "" }
              ).map((key) => (
                <div key={key} style={styles.modalInputGroup}>
                  <label>{key.toUpperCase()}</label>
                  <input
                    type="text"
                    value={newRowData[key] || ""}
                    onChange={(e) =>
                      setNewRowData({ ...newRowData, [key]: e.target.value })
                    }
                    style={styles.modalInput}
                  />
                </div>
              ))}
              <button onClick={handleAddRow} style={styles.button}>
                Add
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                style={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    marginLeft: "200px",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: "70px"
  },
  content: {
    textAlign: "center",
    maxWidth: "1000px",
  },
  title: { textAlign: "center" },
  searchBar: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    justifyContent: "center",
  },
  input: {
    padding: "8px",
    width: "300px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "#4caf50",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer",
  },
  addButtonsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  addButton: {
    padding: "8px 16px",
    backgroundColor: "#404140FF",
    color: "white",
    borderRadius: "4px",
  },
  deleteButton: { color: "white", backgroundColor: "red", borderRadius: "4px", padding: "5px" },
  table: { width: "100%" },
  tableCell: {
    padding: "12px 20px", // Increased padding for wider columns
    border: "1px solid #ddd", // Adds border for all cells
    textAlign: "left",
  },
  tableHeading: {
    textAlign: "left",
    marginBottom: "10px",
    paddingLeft: "20px", // Align text to the left
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
  },
  modalInputGroup: { marginBottom: "20px" },
  modalInput: {
    width: "95%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  cancelButton: {
    padding: "8px 16px",
    backgroundColor: "#f44336",
    color: "white",
    borderRadius: "4px",
    marginLeft: "10px",
  },
};

export default AdminSubjects;

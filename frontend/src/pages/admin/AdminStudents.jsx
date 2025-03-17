import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import supabase from "../../supabase";
import "../../css/DataTable.css";

const EnrollButton = ({ studentId, fingerprintStatus, onEnroll }) => {
  const handleClick = () => {
    if (fingerprintStatus === "Not Enrolled") {
      onEnroll(studentId);
    }
  };

  return fingerprintStatus === "Not Enrolled" ? (
    <button className="enroll-button" onClick={handleClick}>
      {fingerprintStatus}
    </button>
  ) : (
    <span className="fingerprint-status-enrolled">
      {fingerprintStatus}
    </span>
  );
};

const AdminStudents = () => {
  const [filters, setFilters] = useState({
    name: "",
    department: "",
    year: "",
    fingerprintStatus: "",
  });

  const [showTable, setShowTable] = useState(false);
  const [studentsData, setStudentsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [currentStudentId, setCurrentStudentId] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      const { data, error } = await supabase.from("students").select("*");
      if (error) {
        console.error("Error fetching students:", error.message);
      } else {
        const formattedData = data.map((student) => ({
          ...student,
          fingerprintStatus: student.fingerprintStatus ? "Enrolled" : "Not Enrolled",
        }));
        setStudentsData(formattedData);
      }
    };
    fetchStudents();
  }, []);

  const handleSearch = () => {
    setShowTable(true);
  };

  const handleEnroll = async (studentId) => {
    setCurrentStudentId(studentId);
    setShowModal(true);
    setModalMessage("Connecting to device - Please wait");

    setTimeout(() => {
      setModalMessage("Device connected, scanning in progress");
    }, 3000);

    setTimeout(async () => {
      const { error } = await supabase
        .from("students")
        .update({ fingerprintStatus: true })
        .eq("id", studentId);

      if (error) {
        console.error("Error updating fingerprint status:", error.message);
        setModalMessage("Enrollment failed");
      } else {
        setStudentsData((prevStudents) =>
          prevStudents.map((student) =>
            student.id === studentId
              ? { ...student, fingerprintStatus: "Enrolled" }
              : student
          )
        );
        setModalMessage("Enrolled successfully");
      }

      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    }, 6000);
  };

  const filteredStudents = studentsData.filter((student) => {
    const matchesName =
      filters.name === "" ||
      student.name.toLowerCase().includes(filters.name.toLowerCase());
    const matchesDepartment =
      filters.department === "" || student.department === filters.department;
    const matchesYear = filters.year === "" || student.year === filters.year;
    const matchesFingerprint =
      filters.fingerprintStatus === "" ||
      student.fingerprintStatus === filters.fingerprintStatus;

    return matchesName && matchesDepartment && matchesYear && matchesFingerprint;
  });

  return (
    <div className="container">
      <AdminSidebar />
      <div className="content">
        <h2 className="title">STUDENTS DATA</h2>
        <div className="filters">
          <input
            type="text"
            placeholder="Student Name"
            className="input"
            value={filters.name}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <select
            className="select"
            value={filters.department}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, department: e.target.value }))
            }
          >
            <option value="">Select Department</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
          </select>
          <select
            className="select"
            value={filters.year}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, year: e.target.value }))
            }
          >
            <option value="">Select Year</option>
            <option value="First">First</option>
            <option value="Second">Second</option>
            <option value="Final">Final</option>
          </select>
          <select
            className="select"
            value={filters.fingerprintStatus}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                fingerprintStatus: e.target.value,
              }))
            }
          >
            <option value="">Fingerprint Status</option>
            <option value="Enrolled">Enrolled</option>
            <option value="Not Enrolled">Not Enrolled</option>
          </select>
          <button className="button" onClick={handleSearch}>
            Search
          </button>
        </div>

        {showTable && (
          <table className="table">
            <thead>
              <tr>
                <th className="table-cell">Student ID</th>
                <th className="table-cell">Student Name</th>
                <th className="table-cell">Department</th>
                <th className="table-cell">Year</th>
                <th className="table-cell">Email</th>
                <th className="table-cell">Fingerprint Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={index} className="table-row">
                  <td className="table-cell">{student.id}</td>
                  <td className="table-cell">{student.name}</td>
                  <td className="table-cell">{student.department}</td>
                  <td className="table-cell">{student.year}</td>
                  <td className="table-cell">{student.email}</td>
                  <td className="table-cell">
                    <EnrollButton
                      studentId={student.id}
                      fingerprintStatus={student.fingerprintStatus}
                      onEnroll={handleEnroll}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStudents;

import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import supabase from "../../supabase";
import "../../css/DataTable.css";

const EnrollButton = ({ teacherId, fingerprintStatus, onEnroll }) => {
  const handleClick = () => {
    if (fingerprintStatus === "Not Enrolled") {
      onEnroll(teacherId);
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

const AdminTeachers = () => {
  const [filters, setFilters] = useState({ name: "", department: "", fingerprintStatus: "" });
  const [showTable, setShowTable] = useState(false);
  const [teachersData, setTeachersData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchTeachers = async () => {
      const { data, error } = await supabase.from("teachers").select("*");
      if (error) {
        console.error("Error fetching teachers:", error.message);
      } else {
        const formattedData = data.map((teacher) => ({
          ...teacher,
          fingerprintStatus: teacher.fingerprintStatus ? "Enrolled" : "Not Enrolled",
        }));
        setTeachersData(formattedData);
      }
    };
    fetchTeachers();
  }, []);

  const handleSearch = () => {
    setShowTable(true);
  };

  const handleEnroll = async (teacherId) => {
    setShowModal(true);
    setModalMessage("Connecting to device - Please wait");

    setTimeout(() => {
      setModalMessage("Device connected, scanning in progress");
    }, 3000);

    setTimeout(async () => {
      const { error } = await supabase
        .from("teachers")
        .update({ fingerprintStatus: true })
        .eq("id", teacherId);

      if (error) {
        console.error("Error updating fingerprint status:", error.message);
        setModalMessage("Enrollment failed");
      } else {
        setTeachersData((prevTeachers) =>
          prevTeachers.map((teacher) =>
            teacher.id === teacherId ? { ...teacher, fingerprintStatus: "Enrolled" } : teacher
          )
        );
        setModalMessage("Enrolled successfully");
      }

      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    }, 6000);
  };

  const filteredTeachers = teachersData.filter((teacher) => {
    const matchesName =
      filters.name === "" || teacher.name.toLowerCase().includes(filters.name.toLowerCase());
    const matchesDepartment =
      filters.department === "" || teacher.department === filters.department;
    const matchesFingerprint =
      filters.fingerprintStatus === "" || teacher.fingerprintStatus === filters.fingerprintStatus;
    return matchesName && matchesDepartment && matchesFingerprint;
  });

  return (
    <div className="container">
      <AdminSidebar />
      <div className="content">
        <h2 className="title">TEACHERS DATA</h2>
        <div className="filters">
          <input
            type="text"
            placeholder="Teacher Name"
            className="input"
            value={filters.name}
            onChange={(e) => setFilters((prev) => ({ ...prev, name: e.target.value }))}
          />
          <select
            className="select"
            value={filters.department}
            onChange={(e) => setFilters((prev) => ({ ...prev, department: e.target.value }))}
          >
            <option value="">Select Department</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
          </select>
          <select
            className="select"
            value={filters.fingerprintStatus}
            onChange={(e) => setFilters((prev) => ({ ...prev, fingerprintStatus: e.target.value }))}
          >
            <option value="">Fingerprint Status</option>
            <option value="Enrolled">Enrolled</option>
            <option value="Not Enrolled">Not Enrolled</option>
          </select>
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
        {showTable && (
          <table className="table">
            <thead>
              <tr>
                <th className="table-cell">Teacher ID</th>
                <th className="table-cell">Teacher Name</th>
                <th className="table-cell">Department</th>
                <th className="table-cell">Email</th>
                <th className="table-cell">Fingerprint Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id} className="table-row">
                  <td className="table-cell">{teacher.id}</td>
                  <td className="table-cell">{teacher.name}</td>
                  <td className="table-cell">{teacher.department}</td>
                  <td className="table-cell">{teacher.email}</td>
                  <td className="table-cell">
                    <EnrollButton
                      teacherId={teacher.id}
                      fingerprintStatus={teacher.fingerprintStatus}
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

export default AdminTeachers;

import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import supabase from "../../supabase";
import "../../css/DataTable.css";

const AdminStudents = () => {
  const [filters, setFilters] = useState({
    name: "",
    branch: "",
    year: "",
    fingerprintStatus: "",
  });
  const [studentsData, setStudentsData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const handleSearch = async () => {
    let query = supabase
      .from("profiles")
      .select("reg_id, name, branch, year, email, fing_id")
      .eq("role", "student");

    if (filters.name) {
      query = query.ilike("name", `%${filters.name}%`);
    }
    if (filters.branch) {
      query = query.eq("branch", filters.branch);
    }
    if (filters.year) {
      query = query.eq("year", filters.year);
    }
    if (filters.fingerprintStatus === "Enrolled") {
      query = query.not("fing_id", "is", null);
    } else if (filters.fingerprintStatus === "Not Enrolled") {
      query = query.is("fing_id", null);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching students:", error.message);
      setStudentsData([]);
      setShowTable(false);
    } else {
      const formatted = data.map((student) => ({
        ...student,
        fingerprintStatus: student.fing_id ? "Enrolled" : "Not Enrolled",
      }));
      setStudentsData(formatted);
      setShowTable(true);
    }
  };

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
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />
          <select
            className="select"
            value={filters.branch}
            onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
          >
            <option value="">Select Branch</option>
            <option value="Electronics">Electronics</option>
            <option value="EXTC">EXTC</option>
            {/* Add more branches if needed */}
          </select>
          <select
            className="select"
            value={filters.year}
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          >
            <option value="">Select Year</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
          </select>
          <select
            className="select"
            value={filters.fingerprintStatus}
            onChange={(e) =>
              setFilters({ ...filters, fingerprintStatus: e.target.value })
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
                <th className="table-cell">Registration ID</th>
                <th className="table-cell">Name</th>
                <th className="table-cell">Branch</th>
                <th className="table-cell">Year</th>
                <th className="table-cell">Email</th>
                <th className="table-cell">Fingerprint Status</th>
              </tr>
            </thead>
            <tbody>
              {studentsData.map((student, index) => (
                <tr key={index} className="table-row">
                  <td className="table-cell">{student.reg_id}</td>
                  <td className="table-cell">{student.name}</td>
                  <td className="table-cell">{student.branch}</td>
                  <td className="table-cell">{student.year}</td>
                  <td className="table-cell">{student.email}</td>
                  <td className="table-cell">{student.fingerprintStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminStudents;


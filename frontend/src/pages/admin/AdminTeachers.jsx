import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import supabase from "../../supabase";
import "../../css/DataTable.css";

const AdminTeachers = () => {
  const [filters, setFilters] = useState({ name: "", fingerprintStatus: "" });
  const [showTable, setShowTable] = useState(false);
  const [teachersData, setTeachersData] = useState([]);

  const handleSearch = async () => {
    let query = supabase
      .from("profiles")
      .select("id, reg_id, name, email, fing_id")
      .eq("role", "teacher");

    if (filters.name) {
      query = query.ilike("name", `%${filters.name}%`);
    }

    if (filters.fingerprintStatus === "Enrolled") {
      query = query.not("fing_id", "is", null);
    } else if (filters.fingerprintStatus === "Not Enrolled") {
      query = query.is("fing_id", null);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching teachers:", error.message);
      setTeachersData([]);
      setShowTable(false);
    } else {
      const formattedData = data.map((teacher) => ({
        ...teacher,
        fingerprintStatus: teacher.fing_id ? "Enrolled" : "Not Enrolled",
      }));
      setTeachersData(formattedData);
      setShowTable(true);
    }
  };

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
            value={filters.fingerprintStatus}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, fingerprintStatus: e.target.value }))
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
                <th className="table-cell">Email</th>
                <th className="table-cell">Fingerprint Status</th>
              </tr>
            </thead>
            <tbody>
              {teachersData.map((teacher) => (
                <tr key={teacher.id} className="table-row">
                  <td className="table-cell">{teacher.reg_id}</td>
                  <td className="table-cell">{teacher.name}</td>
                  <td className="table-cell">{teacher.email}</td>
                  <td className="table-cell">{teacher.fingerprintStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminTeachers;




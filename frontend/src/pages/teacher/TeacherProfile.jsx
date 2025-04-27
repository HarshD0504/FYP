import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import profileImage from "../../assets/profile.png"; 
import supabase from "../../supabase"; // adjust if needed

const TeacherProfile = () => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/login");
      return;
    }

    // Fetch teacher profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("Error fetching profile:", profileError.message);
      navigate("/login");
      return;
    }

    if (profile.role !== "teacher") {
      if (profile.role === "student") {
        navigate("/studentprofile");
      } else if (profile.role === "admin") {
        navigate("/adminprofile");
      } else {
        navigate("/login");
      }
      return;
    }

    // Fetch courses assigned to this teacher using reg_id
    const { data: coursesData, error: coursesError } = await supabase
      .from("classes")
      .select("name, description")
      .eq("reg_id", profile.reg_id);

    if (coursesError) {
      console.error("Error fetching courses:", coursesError.message);
    }

    const courses = coursesData?.map((course) => ({
      code: course.description,
      name: course.name,
    })) || [];

    setTeacher({
      name: profile.name,
      id: profile.reg_id,
      email: profile.email,
      courses: courses,
      fingerprintEnrolled: false,
    });

    setLoading(false);
  };

  fetchProfile();
}, [navigate]);


  if (loading) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <TeacherSidebar />
      <div style={styles.content}>
        <h1 style={styles.heading}>TEACHER PROFILE</h1>
        <div style={styles.profileContainer}>
          {/* Left Side */}
          <div style={styles.details}>
            <div style={styles.detailBox}>
              <strong>Name:</strong> {teacher.name}
            </div>
            <div style={styles.detailBox}>
              <strong>ID:</strong> {teacher.id}
            </div>
            <div style={styles.detailBox}>
              <strong>Email:</strong> {teacher.email}
            </div>

            <div style={styles.fingerprintStatus}>
              <strong>Fingerprint Status:</strong>{" "}
              {teacher.fingerprintEnrolled ? (
                <span style={styles.enrolled}>Enrolled</span>
              ) : (
                <span style={styles.notEnrolled}>
                  Not Enrolled.{" "}
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
                  {teacher.courses.map((course, index) => (
                    <tr key={index}>
                      <td style={styles.tableCell}>{course.code}</td>
                      <td style={styles.tableCell}>{course.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Side */}
          <div style={styles.profilePictureContainer}>
            <img
              src={profileImage}
              alt="Teacher Profile"
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
    paddingBottom: "50px",
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

export default TeacherProfile;


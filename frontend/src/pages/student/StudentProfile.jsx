import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import supabase from "../../supabase";
import profileImage from "../../assets/profile.png";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        alert("Error fetching user. Please login again.");
        navigate("/login");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError || !profile) {
        alert("Error fetching profile. Please complete signup.");
        navigate("/signup");
        return;
      }

      if (profile.role !== "student") {
        alert("Unauthorized. Not a student account.");
        navigate("/");
        return;
      }

      setStudent({
        name: profile.name || "No Name",
        id: profile.reg_id || "N/A",
        email: profile.email,
        branch: profile.branch || "N/A",
        fingerprintEnrolled: false, // default until fingerprint feature
        courses: [], // you can fetch enrolled courses later
      });
    };

    fetchProfile();
  }, [navigate]);

  if (!student) {
    return <div>Loading...</div>;
  }

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
              <strong>Branch:</strong> {student.branch}
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

            {/* Optional: Courses table if you have */}
            {/* 
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
            */}
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


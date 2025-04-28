import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import supabase from "../../supabase";
import defaultProfileImage from "../../assets/profile.png";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const fileInputRef = useRef(null);
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
        id: user.id,
        name: profile.name || "No Name",
        reg_id: profile.reg_id || "N/A",
        email: profile.email,
        branch: profile.branch || "N/A",
        fingerprintEnrolled: false,
        courses: [],
      });

      if (profile.image_path) {
        const { data } = supabase
          .storage
          .from('images')
          .getPublicUrl(profile.image_path);

        if (data?.publicUrl) {
          setProfilePicUrl(data.publicUrl);
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !student) return;

    const fileExt = file.name.split('.').pop();
    const filePath = `${student.id}.${fileExt}`;

    const { error: uploadError } = await supabase
      .storage
      .from('images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      alert('Error uploading image.');
      return;
    }

    const { data } = supabase
      .storage
      .from('images')
      .getPublicUrl(filePath);

    if (data?.publicUrl) {
      setProfilePicUrl(data.publicUrl);

      await supabase
        .from('profiles')
        .update({ image_path: filePath })
        .eq('id', student.id);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

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
              <strong>ID:</strong> {student.reg_id}
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
          </div>

          {/* Right Side: Profile Picture */}
          <div style={styles.profilePictureWrapper}>
            <img
              src={profilePicUrl || defaultProfileImage}
              alt="Student Profile"
              style={styles.profilePicture}
            />
            <button style={styles.uploadButton} onClick={handleButtonClick}>
              Change Profile Picture
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleImageUpload}
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
  profilePictureWrapper: {
    width: "150px",
    height: "200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  profilePicture: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "50%",
  },
  uploadButton: {
  padding: "4px 8px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "4px",
  fontSize: "0.8rem",
  cursor: "pointer",
},
};

export default StudentProfile;





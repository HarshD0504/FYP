import React from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate from react-router-dom
import BgImage from "../assets/bg-group.png"; // Importing the image from the assets folder

const Home = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to login page
  };

  const handleSignupClick = () => {
    navigate("/signup"); // Navigate to signup page
  };

  return (
    <main style={styles.container}>
      <h2 style={styles.heading}>Welcome to the Student Management System</h2>
      <div style={styles.contentWrapper}>
        {/* Main text content */}
        
        <div style={styles.textContainer}>
          
          <p style={styles.description}>
            This system allows students to record attendance via fingerprint, access their profiles, and view performance. Teachers and administrators can manage student data and monitor attendance.
          </p>

          {/* Additional content */}
          <p style={styles.extraContent}>
            Join us today to start managing and tracking student attendance and performance efficiently.
          </p>

          {/* Buttons for Login and Signup */}
          <div style={styles.buttonContainer}>
            <button onClick={handleLoginClick} style={styles.button}>
              Login
            </button>
            <button onClick={handleSignupClick} style={styles.button}>
              Signup
            </button>
          </div>
        </div>

        {/* Image container */}
        <div style={styles.imageContainer}>
          <img
            src={BgImage}
            alt="Student Management System Illustration"
            style={styles.image}
          />
        </div>
      </div>
    </main>
  );
};

const styles = {
  container: {
    padding: "3rem",
    textAlign: "center",
    
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    marginTop: "1rem",
  },
  textContainer: {
    maxWidth: "600px",
    textAlign: "center",
  },
  heading: {
    fontSize: "2rem",
    color: "#4CAF50",
  },
  description: {
    fontSize: "1.3rem",
    color: "#333",
  },
  extraContent: {
    fontSize: "1.3rem",
    color: "#555",
    marginTop: "2rem",
  },
  buttonContainer: {
    marginTop: "3rem",
    display: "flex",
    gap: "30px",
    justifyContent: "center",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  imageContainer: {
    marginTop: "3rem",
    maxWidth: "500px",
    flexShrink: 0,
  },
  image: {
    height: "330px",
  },
};

export default Home;

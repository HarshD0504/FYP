import React from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate from react-router-dom
import BgImage from "../assets/bg-group.png"; // Importing the image from the assets folder
import Header from "../components/Header";
import Footer from "../components/Footer";

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
      <Header />
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
      <Footer />
    </main>
  );
};

const styles = {
  container: {
    padding: "6rem",
    textAlign: "center",
    fontFamily: "'Roboto', sans-serif", // Standard font for better readability
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "row", // Change to row for side-by-side layout
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1rem",
  },
  textContainer: {
    maxWidth: "600px",
    textAlign: "left", // Align text to the left for better readability
    marginRight: "3rem", // Add space between text and image
  },
  heading: {
    fontSize: "1.8rem", // Slightly larger for better emphasis
    color: "#4CAF50",
    fontWeight: "600",
  },
  description: {
    fontSize: "1.2rem", // Slightly larger font for description
    color: "#333",
    lineHeight: "1.6",
  },
  extraContent: {
    fontSize: "1.2rem",
    color: "#555",
    marginTop: "2rem",
    lineHeight: "1.6",
  },
  buttonContainer: {
    marginTop: "3rem",
    display: "flex",
    gap: "30px",
    justifyContent: "center",
  },
  button: {
    padding: "12px 24px",
    fontSize: "1.1rem", // Slightly larger button text
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  imageContainer: {
    maxWidth: "500px",
    flexShrink: 0,
  },
  image: {
    height: "330px",
    width: "auto", // Ensure the image maintains its aspect ratio
  },
};

export default Home;

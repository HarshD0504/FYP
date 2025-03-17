import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logoContainer}>
        <img src={logo} alt="Icon" style={styles.icon} />
        <h1 style={styles.logo}>Student Management System</h1>
      </Link>
      {/* <nav>
        <Link to="/login" style={styles.link}>
          Login/Signup
        </Link>
      </nav> */}
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#4CAF50",
    color: "#fff",
    height: "6vh",
    position: "fixed", // Keeps the header fixed
    top: 0, // Aligns the header to the top of the page
    left: 0, // Ensures it spans from the left
    right: 0, // Ensures it spans to the right
    zIndex: 1000, // Ensures the header stays above other content
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  icon: {
    width: "40px",
    height: "40px",
    marginRight: "1rem",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#fff",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "bold",
  },
};

export default Header;

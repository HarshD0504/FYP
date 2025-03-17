import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2025 Student Management System. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    marginTop: "1rem",
    padding: "1rem",
    backgroundColor: "#f1f1f1",
    textAlign: "center",
    height: "3vh",
    display: "flex", // Enable Flexbox
    alignItems: "center", // Center vertically
    justifyContent: "center", // Center horizontally
    position: "fixed",
    bottom: 0, // Aligns the header to the top of the page
    left: 0, // Ensures it spans from the left
    right: 0, // Ensures it spans to the right
  },
};

export default Footer;

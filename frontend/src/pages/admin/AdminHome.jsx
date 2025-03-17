import React from "react";
import AdminSidebar from "./AdminSidebar";
import TeacherImage from "../../assets/teacher_icon.png"; 
import StudentImage from "../../assets/group.png"; 
import ClassImage from "../../assets/books.png"; 

const AdminHome = () => {
  return (
    <div style={styles.container}>
      <AdminSidebar />
      <div style={styles.content}>
        {/* Cards Section */}
        <div style={styles.cardsContainer}>
          <div style={styles.card}>
            <img src={TeacherImage} alt="Teachers" style={styles.cardImage} />
            <h3 style={styles.cardHeading}>Total Teachers:</h3>
            <p style={styles.cardText}>120</p>
          </div>
          <div style={styles.card}>
            <img src={StudentImage} alt="Students" style={styles.cardImage} />
            <h3 style={styles.cardHeading}>Total Students:</h3>
            <p style={styles.cardText}>950</p>
          </div>
          <div style={styles.card}>
            <img src={ClassImage} alt="Classes" style={styles.cardImage} />
            <h3 style={styles.cardHeading}>Total Courses:</h3>
            <p style={styles.cardText}>30</p>
          </div>
        </div>

        {/* Add Post Section */}
        <div style={styles.addPostBox}>
          <h3 style={styles.announcementHeading}>CREATE ANNOUNCEMENT</h3>
          <textarea
            style={styles.textArea}
            placeholder="Write your announcement here..."
          />
          <div style={styles.options}>
            {/* Target Audience */}
            <div style={styles.optionGroup}>
              <label>Target Audience:</label>
              <div>
                <input type="radio" id="teachers" name="audience" />
                <label htmlFor="teachers">Teachers</label>
                <input type="radio" id="students" name="audience" />
                <label htmlFor="students">Students</label>
                <input type="radio" id="both" name="audience" />
                <label htmlFor="both">Both</label>
              </div>
            </div>

            {/* Department Selection */}
            <div style={styles.optionGroup}>
              <label>Department:</label>
              <select style={styles.selectBox}>
                <option value="cs">CS</option>
                <option value="it">IT</option>
                <option value="extc">EXTC</option>
                <option value="ec">EC</option>
                <option value="eee">EEE</option>
              </select>
            </div>

            {/* Year Selection */}
            <div style={styles.optionGroup}>
              <label>Year:</label>
              <select style={styles.selectBox}>
                <option value="first">First Year</option>
                <option value="second">Second Year</option>
                <option value="third">Third Year</option>
                <option value="last">Last Year</option>
              </select>
            </div>
          </div>

          {/* Post Button */}
          <button style={styles.postButton}>Post Announcement</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  content: {
    marginLeft: "120px",
    padding: "20px",
    flexGrow: 1,
    overflowY: "auto",
  },
  cardsContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    marginBottom: "15px",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: "10px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "200px",
    transition: "transform 0.3s ease",
    cursor: "pointer",
  },
  cardImage: {
    height: "80px",
  },
  cardHeading: {
    marginBottom: "5px",
    color: "#333",
  },
  cardText: {
    color: "#555",
  },
  addPostBox: {
    backgroundColor: "#ffffff",
    padding: "15px", // Reduced padding to make gap smaller
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    margin: "0 auto",
  },
  announcementHeading: {
    marginTop: "0", // Reduced gap from top
    marginBottom: "10px",
    color: "#333",
  },
  textArea: {
    width: "96%",
    height: "100px",
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    resize: "none",
  },
  options: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  optionGroup: {
    display: "flex",
    flexDirection: "column",
  },
  selectBox: {
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  postButton: {
    backgroundColor: "#4caf50",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
  },
};

export default AdminHome;

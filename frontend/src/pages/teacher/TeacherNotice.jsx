import React, { useState, useEffect } from "react";
import supabase from "../../supabase"; // Import the existing Supabase client
import { FaCalendarAlt, FaUserCircle } from "react-icons/fa";
import TeacherSidebar from "./TeacherSidebar";

const TeacherNotice = () => {
  const [announcements, setAnnouncements] = useState([]);

  // Fetch announcements for teachers
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const { data, error } = await supabase
          .from("announcements")
          .select("announcement_msg, created_at, sender, receiver")
          .in("receiver", [2, 3]) // Filter by receiver 2 (teacher) or 3 (both)
          .order("created_at", { ascending: false }); // Sort by latest announcements

        if (error) throw error;
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements:", error.message);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div style={styles.container}>
      <TeacherSidebar/>
      <h2 style={styles.heading}>Teacher Announcements</h2>
      <div style={styles.cardsContainer}>
        {announcements.length === 0 ? (
          <p>No announcements available.</p>
        ) : (
          announcements.map((announcement, index) => (
            <div key={index} style={styles.card}>
              <p style={styles.announcement}>{announcement.announcement_msg}</p>
              <div style={styles.cardFooter}>
                <p style={styles.footerText}>
                  <FaCalendarAlt style={styles.icon} />
                  Posted on: {new Date(announcement.created_at).toLocaleString()}
                </p>
                <p style={styles.footerText}>
                  <FaUserCircle style={styles.icon} />
                  Posted by: Admin
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginLeft: "240px", // Adjust the margin to leave space for the sidebar
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#333",
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
  },
  announcement: {
    fontSize: "1.1rem",
    color: "#333",
    marginBottom: "15px",
  },
  cardFooter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    fontSize: "0.9rem",
    color: "#7f8c8d",
  },
  footerText: {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
  },
  icon: {
    marginRight: "8px",
    fontSize: "1rem",
  },
};

export default TeacherNotice;

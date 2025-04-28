import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import supabase from "../../supabase"; // assuming your supabase client is here
import { FaCalendarAlt, FaUserCircle } from "react-icons/fa";

const AdminNotice = () => {
  const [notices, setNotices] = useState([]);

  // Fetch notices sent to admin (from teachers and students)
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const { data, error } = await supabase
          .from("announcements")
          .select("announcement_msg, created_at, sender, receiver")
          .in("receiver", [4, 6]) // Filter by receiver = admin
          .order("created_at", { ascending: false }); // Sort by latest notices

        if (error) throw error;
        setNotices(data);
      } catch (error) {
        console.error("Error fetching notices:", error.message);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div style={styles.container}>
      <AdminSidebar />
      <div style={styles.cardsContainer}>
        {notices.length === 0 ? (
          <p>No notices available.</p>
        ) : (
          notices.map((notice, index) => (
            <div key={index} style={styles.card}>
              <p style={styles.notice}>{notice.announcement_msg}</p>
              <div style={styles.cardFooter}>
                <p style={styles.footerText}>
                  <FaCalendarAlt style={styles.icon} />
                  Posted on: {new Date(notice.created_at).toLocaleString()}
                </p>
                <p style={styles.footerText}>
                  <FaUserCircle style={styles.icon} />
                  Posted by: {notice.sender}
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
    maxWidth: "1200px",
    margin: "0 auto",
  },
  notice: {
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

export default AdminNotice;

import React from "react";
import AdminSidebar from "./AdminSidebar";

const AdminClasses = () => {
  return (
    <div style={styles.container}>
      <AdminSidebar />
      <div style={styles.content}>
        <h1>Admin Classes Page</h1>
        <p>
          Welcome to the admin dashboard! You can manage and oversee various
          sections like students, teachers, and classes. Select an option from
          the sidebar to get started.
        </p>
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
    marginLeft: "20px", // space for the sidebar
    padding: "20px",
    flexGrow: 1,
  },
};

export default AdminClasses;

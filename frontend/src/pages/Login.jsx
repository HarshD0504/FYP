import React, { useState } from "react";
import supabase from "../supabase"  // Adjust path if needed
import { Link, useNavigate } from "react-router-dom";
import studentIcon from "../assets/student.png";
import teacherIcon from "../assets/teacher.png";
import adminIcon from "../assets/admin.png";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect } from "react";

const Login = () => {
  const [userType, setUserType] = useState(""); // Track selected user type
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault()

  if (!emailOrPhone || !password) {
    alert("Please enter both email and password.")
    return
  }

  // Use Supabase to authenticate
  const { error } = await supabase.auth.signInWithPassword({
    email: emailOrPhone,
    password: password,
  })

  if (error) {
    alert(`Login failed: ${error.message}`)
  } else {
    alert(`Login Successful as ${userType}!`)
    if (userType === "Student") {
      navigate("/student/home")
    } else if (userType === "Teacher") {
      navigate("/teacher/home")
    } else if (userType === "Admin") {
      navigate("/admin/home")
    }
  }
}


  const handleUserTypeSelection = (type) => {
    setUserType(type); // Set the user type and proceed to the login form
  };

useEffect(() => {
  const logoutIfAuthenticated = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.auth.signOut();
    }
  };

  logoutIfAuthenticated();
}, []);


  return (
    <div>
      <Header/>
      <main style={styles.container}>
        <h2 style={styles.heading}>Login</h2>

        {userType === "" ? (
          // User Type Selection Step
          <div style={styles.userTypeContainer}>
            <div
              style={styles.userTypeBox}
              onClick={() => handleUserTypeSelection("Student")}
            >
              <img
                src={studentIcon}
                alt="Student Icon"
                style={styles.icon}
              />
              <p>Student</p>
            </div>
            <div
              style={styles.userTypeBox}
              onClick={() => handleUserTypeSelection("Teacher")}
            >
              <img
                src={teacherIcon}
                alt="Teacher Icon"
                style={styles.icon}
              />
              <p>Teacher</p>
            </div>
            <div
              style={styles.userTypeBox}
              onClick={() => handleUserTypeSelection("Admin")}
            >
              <img
                src={adminIcon}
                alt="Admin Icon"
                style={styles.icon}
              />
              <p>Admin</p>
            </div>
          </div>
        ) : (
          // Login Form Step
          <div>
            <h3 style={styles.subheading}>Login as {userType}</h3>
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="text"
                placeholder="Email"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                style={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
              <div style={styles.buttonGroup}>
                <button
                  type="button"
                  onClick={() => setUserType("")}
                  style={{ ...styles.button, ...styles.backButton }}
                >
                  Back
                </button>
                <button type="submit" style={styles.button}>
                  Login
                </button>
              </div>
            </form>
            <p>
              Don't have an account?{" "}
              <Link to="/signup" style={styles.link}>
                Sign Up
              </Link>
            </p>
          </div>
        )}
        <Footer/>
      </main>
    </div>
  );
};

const styles = {
  container: {
    padding: "6rem",
    textAlign: "center",
  },
  heading: {
    fontSize: "1.8rem",
    color: "#4CAF50",
  },
  subheading: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  userTypeContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    margin: "2rem 0",
  },
  userTypeBox: {
    padding: "1rem 2rem",
    border: "1px solid #4CAF50",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: "#fff",
    color: "#4CAF50",
    fontWeight: "bold",
    textAlign: "center",
    transition: "all 0.3s ease",
    width: "150px",
  },
  icon: {
    height: "150px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    margin: "0.5rem",
    padding: "0.8rem",
    fontSize: "1rem",
    width: "250px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    marginTop: "1rem",
  },
  button: {
    padding: "0.8rem 1.5rem",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  backButton: {
    backgroundColor: "#f44336", // Red for "Back"
  },
  link: {
    color: "#4CAF50",
    textDecoration: "none",
  },
};

export default Login;

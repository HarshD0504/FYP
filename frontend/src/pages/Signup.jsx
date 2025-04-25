import React, { useState } from "react";
import supabase from "../supabase"; // adjust path as needed
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const [branch, setBranch] = useState("");
  const [reg_id, setRegistrationId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!phone) {
      alert("Phone number is required");
      return;
    }

    // Sign up with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(`Signup failed: ${error.message}`);
      return;
    }

    // Add role, phone, branch, and registrationId to 'profiles' table
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: data.user.id,
        role,
        phone,
        branch,
        reg_id,
      },
    ]);

    if (profileError) {
      alert(`Signup succeeded, but saving profile failed: ${profileError.message}`);
    } else {
      alert("Sign Up Successful!");
      navigate("/login");
    }
  };

  return (
    <div>
      <main style={styles.container}>
        <h2 style={styles.heading}>Sign Up</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Registration ID"
            value={reg_id}
            onChange={(e) => setRegistrationId(e.target.value)}
            required
            style={styles.input}
          />
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            required
            style={styles.input}
          >
            <option value="">Select Branch</option>
            <option value="EXTC">EXTC</option>
            <option value="Electronics">Electronics</option>
          </select>
          <div style={styles.radioContainer}>
            <label>
              <input
                type="radio"
                name="role"
                value="student"
                checked={role === "student"}
                onChange={(e) => setRole(e.target.value)}
              />
              Student
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="teacher"
                checked={role === "teacher"}
                onChange={(e) => setRole(e.target.value)}
              />
              Teacher
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={(e) => setRole(e.target.value)}
              />
              Admin
            </label>
          </div>
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Log In
          </Link>
        </p>
      </main>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
  },
  heading: {
    fontSize: "2rem",
    color: "#4CAF50",
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
  radioContainer: {
    margin: "1rem 0",
    textAlign: "left",
  },
  button: {
    padding: "0.8rem",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  link: {
    color: "#4CAF50",
    textDecoration: "none",
  },
};

export default SignUp;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../supabase"; // Adjust path if needed
import Header from "../components/Header";
import Footer from "../components/Footer";

const SignUp = () => {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const [branch, setBranch] = useState("");
  const [reg_id, setRegistrationId] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();

  const isStudent = role === "student"; // NEW

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

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(`Signup failed: ${error.message}`);
      return;
    }

    const user = data?.user;
    if (!user) {
      alert("Signup succeeded, but no user data returned. Check email verification.");
      return;
    }

    const userId = user.id;

    const { data: existingProfile, error: fetchError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      alert(`Profile check failed: ${fetchError.message}`);
      return;
    }

    if (existingProfile) {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          name,
          email,
          role,
          phone,
          branch,
          reg_id,
          year,
        })
        .eq("id", userId);

      if (updateError) {
        alert(`Profile update failed: ${updateError.message}`);
        return;
      }
    } else {
      const { error: insertError } = await supabase
        .from("profiles")
        .insert([
          {
            id: userId,
            name,
            email,
            role,
            phone,
            branch,
            reg_id,
            year,
          },
        ]);

      if (insertError) {
        alert(`Profile saving failed: ${insertError.message}`);
        return;
      }
    }

    alert("Signup and profile saving successful!");
    navigate("/login");
  };

  return (
    <main style={styles.container}>
      <Header/>
      <h2 style={styles.heading}>Sign Up</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
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
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
          style={{ ...styles.input, backgroundColor: !isStudent ? "#f0f0f0" : "white" }} // GREY background when disabled
          disabled={!isStudent}
        >
          <option value="">Select Year</option>
          <option value="1">1st</option>
          <option value="2">2nd</option>
          <option value="3">3rd</option>
          <option value="4">4th</option>
        </select>
        <select
  value={branch}
  onChange={(e) => setBranch(e.target.value)}
  required={role === "student"}
  disabled={role !== "student"}
  style={{
    ...styles.input,
    backgroundColor: role !== "student" ? "#eee" : "white",
  }}
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
      <p style={styles.linkContainer}>
        Already have an account?{" "}
        <Link to="/login" style={styles.link}>
          Log In
        </Link>
      </p>
      <Footer/>
    </main>
  );
};

const styles = {
  container: { textAlign: "center" },
  heading: { fontSize: "2rem", color: "#4CAF50", margin: "3rem", marginBottom: "0.5rem" },
  form: { display: "flex", flexDirection: "column", alignItems: "center" },
  input: {
    margin: "0.5rem",
    padding: "0.8rem",
    fontSize: "1rem",
    width: "250px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  radioContainer: { margin: "1rem 0", textAlign: "left" },
  button: {
    padding: "0.8rem",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  link: { color: "#4CAF50", textDecoration: "none" },

  linkContainer: {
  marginTop: "0.8rem",
  marginBottom: "3.5rem",
},
};

export default SignUp;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";

import AdminHome from "./pages/admin/AdminHome";
import AdminSubjects from "./pages/admin/AdminSubjects";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminTeachers from "./pages/admin/AdminTeachers";
import AdminComplaints from "./pages/admin/AdminComplaints";

import StudentHome from "./pages/student/StudentHome";
import StudentAttendance from "./pages/student/StudentAttendance";
import StudentProfile from "./pages/student/StudentProfile";
import StudentContact from "./pages/student/StudentContact";

import TeacherHome from "./pages/teacher/TeacherHome";
import TeacherAttendance from "./pages/teacher/TeacherAttendance";
import TeacherAssignment from "./pages/teacher/TeacherAssignment";
import TeacherProfile from "./pages/teacher/TeacherProfile";

const App = () => {
  return (
    <Router>
      <div style={styles.appContainer}>
        <Header />
        <main style={styles.mainContent}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            
            <Route path="/admin/home" element={<AdminHome />} />
            <Route path="/admin/Subjects" element={<AdminSubjects />} />
            <Route path="/admin/students" element={<AdminStudents />} />
            <Route path="/admin/teachers" element={<AdminTeachers />} />
            {/* <Route path="/admin/Complaints" element={<AdminComplaints />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/subjects" element={<AdminSubjects />} /> */}
            <Route path="/admin/complaints" element={<AdminComplaints />} /> 

            <Route path="/student/home" element={<StudentHome />} />
            <Route path="/student/attendance" element={<StudentAttendance />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/student/contact" element={<StudentContact />} />

            <Route path="/teacher/home" element={<TeacherHome />} />
            <Route path="/teacher/attendance" element={<TeacherAttendance />} />
            <Route path="/teacher/assignment" element={<TeacherAssignment />} />
            <Route path="/teacher/profile" element={<TeacherProfile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

const styles = {
  appContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  mainContent: {
    flex: 1,
    padding: "1rem",
    marginTop: "8vh", // Adds space equal to the header height
  },
};

export default App;

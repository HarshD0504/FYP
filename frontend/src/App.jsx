import React from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import AdminNotice from "./pages/admin/AdminNotices";

import StudentHome from "./pages/student/StudentHome";
import StudentAttendance from "./pages/student/StudentAttendance";
import StudentProfile from "./pages/student/StudentProfile";
import StudentContact from "./pages/student/StudentContact";
import StudentHomePage from "./pages/student/StudentHomePage";
import StudentAssignmentPage from "./pages/student/StudentAssignmentPage";
import StudentClassPage from "./pages/student/StudentClassPage";
import StudentNotice from "./pages/student/StudentNotice";

import TeacherContactPage from "./pages/teacher/TeacherContact";
import TeacherHome from "./pages/teacher/TeacherHome";
import TeacherAttendance from "./pages/teacher/TeacherAttendance";
import TeacherAssignment from "./pages/teacher/TeacherAssignment";
import TeacherProfile from "./pages/teacher/TeacherProfile";
import TeacherHomePage from "./pages/teacher/TeacherHomePage";
import TeacherAssignmentPage from "./pages/teacher/TeacherAssignmentPage";
import TeacherClassPage from "./pages/teacher/TeacherClassPage";
import TeacherNotice from "./pages/teacher/TeacherNotice";

const App = () => {
  return (
    <Router>
      <div style={styles.appContainer}>
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
            <Route path="/admin/notices" element={<AdminNotice />} /> 

            <Route path="/student/home" element={<StudentHome />} />
            <Route path="/student/attendance" element={<StudentAttendance />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/student/contact" element={<StudentContact />} />
            <Route path="/student/notices" element={<StudentNotice />} />
            
            <Route path="/teacher/home" element={<TeacherHome />} />
            <Route path="/teacher/attendance" element={<TeacherAttendance />} />
            <Route path="/teacher/assignment" element={<TeacherAssignment />} />
            <Route path="/teacher/contact" element={<TeacherContactPage />} />
            <Route path="/teacher/profile" element={<TeacherProfile />} />
            <Route path="/teacher/notices" element={<TeacherNotice />} />
            <Route path="/teacher/classroom" element={<TeacherHomePage />} />
            <Route path="/teacher/classroom/class/:id" element={<TeacherClassPage />} />
            <Route path="/teacher/classroom/assignment/:id" element={<TeacherAssignmentPage />} />
            <Route path="/student/classroom" element={<StudentHomePage />} />
            <Route path="/student/classroom/class/:id" element={<StudentClassPage />} />
            <Route path="/student/classroom/assignment/:id" element={<StudentAssignmentPage />} />
            

          </Routes>
        </main>
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
    marginTop: "2vh", // Adds space equal to the header height
  },
};

export default App;

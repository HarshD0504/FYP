import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaChalkboardTeacher, FaBook, FaUserTie, FaUserGraduate, FaClipboardList, FaBullhorn, FaClipboard, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const TeacherSidebar = () => {
  return (
    <div style={styles.sidebarContainer}>
      <div style={styles.navLinksContainer}>
        <ul style={styles.navLinks}>
          <li style={styles.navLink}>
            <Link to="/teacher/home" style={styles.link}>
              <FaHome style={styles.icon} />
              Home
            </Link>
          </li>
          <li style={styles.navLink}>
            <Link to="/teacher/attendance" style={styles.link}>
              <FaChalkboardTeacher style={styles.icon} />
              Attendance
            </Link>
          </li>
          <li style={styles.navLink}>
            <Link to="/teacher/assignment" style={styles.link}>
              <FaBook style={styles.icon} />
              Assignments
            </Link>
          </li>
          {/* <li style={styles.navLink}>
            <Link to="/teacher/teachers" style={styles.link}>
              <FaUserTie style={styles.icon} />
              Teachers
            </Link>
          </li> */}
          <li style={styles.navLink}>
            <Link to="/teacher/notices" style={styles.link}>
              <FaBullhorn style={styles.icon} />
              Notices
            </Link>
          </li>
          <li style={styles.navLink}>
            <Link to="/teacher/contact" style={styles.link}>
              <FaClipboardList style={styles.icon} />
              Contact
            </Link>
          </li>
          <li style={styles.navLink}>
            <Link to="/teacher/profile" style={styles.link}>
              <FaUserCircle style={styles.icon} />
              Profile
            </Link>
          </li>
          <li style={styles.navLink}>
            <Link to="/" style={styles.link}>
              <FaSignOutAlt style={styles.icon} />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  sidebarContainer: {
    height: '100vh',
    width: '220px',
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    paddingTop: '100px',
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
  },
  logoContainer: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  logoText: {
    color: '#ecf0f1',
    fontSize: '1.8rem',
    fontWeight: 'bold',
  },
  navLinksContainer: {
    flexGrow: 1,
  },
  navLinks: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  navLink: {
    marginBottom: '15px',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    color: '#ecf0f1',
    textDecoration: 'none',
    fontSize: '1.1rem',
    padding: '10px 20px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  icon: {
    marginRight: '15px',
    fontSize: '1.3rem',
  },
};

export default TeacherSidebar;

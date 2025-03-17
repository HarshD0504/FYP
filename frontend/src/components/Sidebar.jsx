import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation(); // Get the current path to highlight the active link

  return (
    <div style={styles.sidebar}>
      <nav>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link
              to="/dashboard"
              style={getNavLinkStyle(location.pathname === '/dashboard')}
            >
              Dashboard
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link
              to="/dashboard/attendance"
              style={getNavLinkStyle(location.pathname === '/dashboard/attendance')}
            >
              Attendance
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link
              to="/dashboard/profile"
              style={getNavLinkStyle(location.pathname === '/dashboard/profile')}
            >
              Profile
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link
              to="/dashboard/achievements"
              style={getNavLinkStyle(location.pathname === '/dashboard/achievements')}
            >
              Achievements
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link
              to="/dashboard/settings"
              style={getNavLinkStyle(location.pathname === '/dashboard/settings')}
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );

  // Function to return style for active links
  function getNavLinkStyle(isActive) {
    return {
      ...styles.navLink,
      fontSize: isActive ? '1.4rem' : '1.2rem', // Increase font size when active
      fontWeight: isActive ? 'bold' : 'normal', // Make active link bold
      backgroundColor: isActive ? '#45a049' : 'transparent', // Highlight active link
      padding: '10px 15px',
      borderRadius: '5px',
    };
  }
};

const styles = {
  sidebar: {
    width: '16vw',
    height: '100vh',
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '0',
    position: 'fixed',
    top: '10vh', // Adjust to ensure it is below the header (assuming header height is 60px)
    left: '0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    boxSizing: 'border-box',
  },
  heading: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    paddingLeft: '1rem',
    paddingTop: '1rem',
  },
  navList: {
    listStyle: 'none',
    padding: '0',
    marginTop: '1rem',
  },
  navItem: {
    marginBottom: '1rem',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.2rem',
    padding: '10px 15px',
    borderRadius: '5px',
    display: 'block',
  },
};

export default Sidebar;

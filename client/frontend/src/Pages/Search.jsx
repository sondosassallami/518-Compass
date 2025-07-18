// src/Pages/Search.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={styles.page}>
      {/* Top Navbar */}
      <nav style={styles.navbar}>
        <h3 style={styles.navTitle}>518 Compass</h3>
        <div style={styles.navLinks}>
          <a href="/home" className="footer-link">Home</a>
          <a href="/profile" className="footer-link">Profile</a>
          <a href="/chatrooms" className="footer-link">Chat</a>
          <a href="/map" className="footer-link">Map</a>
          <a href="/createpost" className="footer-link">Create a Post</a>
          <a href="/search" className="footer-link">Search</a>
          <span onClick={handleLogout} className="footer-link" style={{ cursor: 'pointer' }}>Logout</span>
        </div>
      </nav>

      {/* Page Content */}
      <div style={styles.contentBox}>
        <h1>Search</h1>
        <p>Search for narrowed down places/activities like restaurants, playgrounds, daycare, etc.</p>
        {/* Add your search form and results here */}
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <a href="/about" className="footer-link">About</a>
        <a href="/feedback" className="footer-link">Feedback</a>
      </div>

      {/* Inline Styles for footer links */}
      <style>{`
        .footer-link {
          color: white;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 500;
          padding: 8px 20px;
          border-radius: 8px;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        .footer-link:hover {
          background-color: #004d40;
          color: #a5d6a7;
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#f0f4f8',
    minHeight: '100vh',
    paddingTop: '60px',    // space for fixed navbar
    paddingBottom: '70px', // space for fixed footer
    fontFamily: 'Arial, sans-serif',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#00695c',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '0',
    marginBottom: '20px',
    width: '100%',
    left: 0,
    right: 0,
    position: 'fixed',
    top: 0,
    zIndex: 1000,
    overflow: 'hidden',
    flexWrap: 'nowrap',
  },
  navTitle: { margin: 0, fontSize: '1.5rem' },
  navLinks: { display: 'flex', alignItems: 'center', gap: '5px' },
  contentBox: {
    backgroundColor: 'white',
    maxWidth: '1000px',
    margin: '40px auto',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'left',
  },
  footer: {
    backgroundColor: '#00695c',
    padding: '20px',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    zIndex: 1000,
  },
};

export default Search;

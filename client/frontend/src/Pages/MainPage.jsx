import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function MainPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    fetch('http://localhost:7200/api/user/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(console.error);
  }, [navigate]);

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <h3 style={styles.navTitle}>518 Compass</h3>
        <div style={styles.navLinks}>
          <a href="/main" style={styles.navLink}>Home</a>
          <a href="/profile" style={styles.navLink}>Profile</a>
          <a href="/chatrooms" style={styles.navLink}>Chat</a>
          <a
            href="/"
            onClick={() => { localStorage.removeItem('token'); }}
            style={styles.navLink}
          >
            Logout
          </a>
        </div>
      </nav>

      <div style={styles.welcomeBox}>
        <h1 style={styles.headerText}>Welcome to 518 Compass</h1>
        <p style={styles.subText}>Your guide to community connection and support.</p>
      </div>

      <div style={styles.feedBox}>
        <h2 style={styles.feedHeader}>Community Feed</h2>
        <p style={styles.feedPlaceholder}>Placeholder for user posts. Work on posting content here later.</p>
      </div>

      <div style={styles.footer}>
        <a href="/about" className="footer-link">About</a>
        <a href="/feedback" className="footer-link">Feedback</a>
      </div>

      {/* CSS for hover effect on footer links */}
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
          background-color: #004d40; /* darker emerald for hover */
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
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#00695c',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    marginBottom: '20px',
    width: '100%',
    left: 0,
    position: 'fixed',
  },
  navTitle: { margin: 0, fontSize: '1.5rem' },
  navLinks: { display: 'flex', alignItems: 'center', gap: '15px' },
  navLink: { color: 'white', textDecoration: 'none', fontSize: '1rem', padding: '5px 10px' },
  welcomeBox: {
    backgroundColor: 'white',
    maxWidth: '600px',
    margin: '40px auto',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  headerText: { color: '#00695c', marginBottom: '10px', fontSize: '2rem' },
  subText: { color: '#444', fontSize: '1.1rem' },
  feedBox: {
    backgroundColor: 'white',
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  feedHeader: { color: '#00695c', marginBottom: '10px', fontSize: '1.5rem' },
  feedPlaceholder: { color: '#666', fontStyle: 'italic' },
  footer: {
    backgroundColor: '#00695c', // emerald green
    padding: '20px',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
  },
};

export default MainPage;

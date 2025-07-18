import React from 'react';
import { useNavigate } from 'react-router-dom';

function Feedback() {
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

      {/* Feedback Form Card */}
      <div style={styles.card}>
        <h2 style={styles.heading}>We Value Your Feedback</h2>
        <p style={styles.subheading}>Let us know how we can improve 518 Compass.</p>
        <form style={styles.form}>
          <input type="text" placeholder="Your Name (optional)" style={styles.input} />
          <input type="email" placeholder="Your Email (optional)" style={styles.input} />
          <textarea placeholder="Your Feedback" required style={styles.textarea}></textarea>
          <button type="submit" style={styles.button}>Submit Feedback</button>
        </form>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <a href="/about" className="footer-link">About</a>
        <a href="/feedback" className="footer-link">Feedback</a>
      </div>

      {/* Inline Styles */}
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
        button:hover {
          background-color: #004d40 !important;
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
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
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '12px',
    color: '#004d40',
  },
  subheading: {
    marginBottom: '24px',
    color: '#555',
    fontSize: '14px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  textarea: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    minHeight: '100px',
    resize: 'vertical',
  },
  button: {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#00695c',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
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

export default Feedback;

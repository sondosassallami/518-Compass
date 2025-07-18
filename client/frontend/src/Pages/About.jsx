import React from 'react';
import { useNavigate } from 'react-router-dom';

function About() {
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

      {/* About Page Content */}
      <div style={styles.contentBox}>
        <h2 style={styles.headerText}>About 518 Compass</h2>
        <p>
          518 Compass was created by a lifelong resident of the Capital Region who’s passionate about helping families navigate everything the 518 has to offer. The region is large, diverse, and full of hidden gems that deserve to be discovered and shared. This app’s mission is to connect families, make local resources more accessible, and keep information accurate and up to date through real contributions from real users.
        </p>
        <p>
          Unlike traditional apps that simply provide directions, 518 Compass focuses on community-powered details—including exact location information, visuals, contact info, business hours, user comments, and more. This saves time and helps users make better, more confident decisions.
        </p>
        <p>
          The app covers the full 518 area code, which includes these counties in Upstate New York: Albany, Schenectady, Rensselaer, Saratoga, Warren, Washington, Fulton, Montgomery, Schoharie, Columbia, Greene, Hamilton, Franklin, Essex, and parts of Herkimer and Otsego. Whether you're in a city or a small town, 518 Compass helps you feel more connected to what's around you.
        </p>
        <p>
          Users can search by category, scroll through posts, join group chats for support, or message others directly. Small business owner? This is also the perfect space to showcase your services. 518 Compass is designed to fill in the gaps and strengthen our region by making sure everyone knows where to go, what to expect, and how to make the most of living in the 518.
        </p>
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
    padding: '5px',
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
    margin: '80px auto 40px',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'left',
  },
  headerText: {
    color: '#00695c',
    marginBottom: '20px',
    fontSize: '1.8rem',
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

export default About;

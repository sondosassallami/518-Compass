// src/Pages/MainPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function MainPage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    fetch('http://localhost:7200/api/user/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(console.error);

    fetch('http://localhost:7200/api/posts', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch(console.error);
  }, [navigate]);

  const handlePostClick = () => {
    navigate('/create-post');
  };

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <h3 style={styles.navTitle}>518 Compass</h3>
        <div style={styles.navLinks}>
          <a href="/main" className="footer-link">Home</a>
          <a href="/profile" className="footer-link">Profile</a>
          <a href="/chatrooms" className="footer-link">Chat</a>
          <a href="/map" className="footer-link">Map</a>
          <a href="/createpost" className="footer-link">Create a Post</a>
          <a href="/search" className="footer-link">Search</a>
          <a href="/" onClick={() => localStorage.removeItem('token')} className="footer-link">Logout</a>
        </div>
      </nav>

      <div style={styles.welcomeBox}>
        <h1 style={styles.headerText}>Welcome to 518 Compass</h1>
        <p style={styles.subText}>Your guide to community connection and support.</p>
      </div>

      <div style={styles.feedBox}>
        <h2 style={styles.feedHeader}>Community Feed</h2>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} style={styles.post}>
              <h3>{post.title}</h3>
              <p><strong>Address:</strong> {post.address}</p>
              <p><strong>Posted by:</strong> {post.username}</p>
              <p><strong>Time Posted:</strong> {new Date(post.timePosted).toLocaleString('en-US', { timeZone: 'America/New_York' })}</p>
              <p><strong>Status:</strong> {post.isOpen ? 'Open' : 'Closed'}</p>
              <p>{post.content}</p>
              {post.photos && post.photos.length > 0 && (
                <div>
                  {post.photos.map((photo, index) => (
                    <img key={index} src={photo} alt={`Post ${post._id}`} style={styles.postImage} />
                  ))}
                </div>
              )}
              {post.videos && post.videos.length > 0 && (
                <div>
                  {post.videos.map((video, index) => (
                    <video key={index} controls style={styles.postVideo}>
                      <source src={video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ))}
                </div>
              )}
              <div style={styles.commentsSection}>
                <h4>Comments</h4>
                {post.comments && post.comments.map((comment, index) => (
                  <div key={index} style={styles.comment}>
                    <img src={comment.profilePhoto} alt={`${comment.username}'s profile`} style={styles.commentPhoto} />
                    <p><strong>{comment.username}:</strong> {comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p style={styles.feedPlaceholder}>No posts available. Be the first to post!</p>
        )}
      </div>

      <div style={styles.footer}>
        <a href="/about" className="footer-link">About</a>
        <a href="/feedback" className="footer-link">Feedback</a>
      </div>

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
        .postButton {
          background-color: #00695c;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .postButton:hover {
          background-color: #a5d6a7;
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
  welcomeBox: {
    backgroundColor: 'white',
    maxWidth: '1800px',
    margin: '80px auto 40px',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  headerText: { color: '#00695c', marginBottom: '10px', fontSize: '2rem' },
  subText: { color: '#444', fontSize: '1.1rem' },
  feedBox: {
    backgroundColor: 'white',
    maxWidth: '1800px',
    margin: '40px auto',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  feedHeader: { color: '#00695c', marginBottom: '10px', fontSize: '1.5rem' },
  feedPlaceholder: { color: '#666', fontStyle: 'italic' },
  post: {
    marginBottom: '20px',
    padding: '15px',
    borderBottom: '1px solid #ddd',
  },
  postImage: {
    maxWidth: '200px',
    margin: '10px 0',
  },
  postVideo: {
    maxWidth: '300px',
    margin: '10px 0',
  },
  commentsSection: {
    marginTop: '10px',
  },
  comment: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '5px',
  },
  commentPhoto: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    marginRight: '10px',
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

export default MainPage;

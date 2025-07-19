import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../App.css';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState('');
  const [editingBio, setEditingBio] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:7200/api/user/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setBio(data.bio || '');
          setProfilePic(`http://localhost:7200${data.profilePic || ''}`);
        })
        .catch(console.error);

      fetch('http://localhost:7200/api/posts', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setPosts(data))
        .catch(console.error);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleBioChange = (e) => setBio(e.target.value);

  const handleSaveBio = () => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:7200/api/user/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bio }),
    })
      .then(() => {
        alert('Bio updated!');
        setEditingBio(false);
      })
      .catch(console.error);
  };

  const handleProfilePicUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('profilePic', file);

    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`http://localhost:7200/api/user/me/upload-pic`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to upload picture');
      }

      const data = await res.json();

      if (data.profilePic) {
        setProfilePic(`http://localhost:7200${data.profilePic}`);
        alert('Profile picture updated!');
      } else {
        alert('Failed to upload picture');
      }
    } catch (err) {
      console.error('Upload failed:', err);
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleLike = (id) => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:7200/api/like/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
      })
      .catch(console.error);
  };

  const handleFollow = (userToFollow) => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:7200/api/follow/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ keyword: userToFollow }),
    })
      .then(() => alert(`Followed ${userToFollow}`))
      .catch(console.error);
  };

  const handleComment = (postId, comment) => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:7200/api/comments/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: comment }),
    })
      .then(() => alert('Comment added!'))
      .catch(console.error);
  };

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <h3 style={styles.navTitle}>518 Compass</h3>
        <div style={styles.navLinks}>
          <a href="/home" className="footer-link">Home</a>
          <a href="/profile" className="footer-link">Profile</a>
          <a href="/chatrooms" className="footer-link">Chat</a>
          <a href="/map" className="footer-link">Map</a>
          <a href="/createpost" className="footer-link">Create a Post</a>
          <a href="/search" className="footer-link">Search</a>
          <a href="/" onClick={() => localStorage.removeItem('token')} className="footer-link">Logout</a>
        </div>
      </nav>

      <main style={styles.mainContent}>
        <section style={styles.profileContainer}>
          <div style={styles.profileHeader}>
            <div
              style={styles.profilePicWrapper}
              className="profile-pic-wrapper"
              onClick={() => document.getElementById('profilePicInput').click()}
              title="Click to change profile picture"
            >
              <img
                src={profilePic || 'https://via.placeholder.com/150'}
                alt="Profile"
                style={styles.profileImgModern}
              />
            </div>

            <input
              type="file"
              accept="image/*"
              id="profilePicInput"
              style={{ display: 'none' }}
              onChange={handleProfilePicUpload}
              disabled={uploading}
            />

            <h2 style={styles.username}>{user?.name || 'Guest'}</h2>

            {editingBio ? (
              <>
                <textarea
                  value={bio}
                  onChange={handleBioChange}
                  placeholder="Tell us about yourself..."
                  style={styles.bio}
                />
                <button style={styles.saveButton} onClick={handleSaveBio}>Save Bio</button>
              </>
            ) : (
              <>
                <p style={styles.bioDisplay}>{bio || 'No bio yet.'}</p>
                <button style={styles.saveButton} onClick={() => setEditingBio(true)}>Edit Bio</button>
              </>
            )}
          </div>

          <form onSubmit={handleSearch} style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search users or posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
            <button type="submit" style={styles.searchButton}>Search</button>
          </form>

          <div style={styles.postsSection}>
            <h3 style={styles.sectionTitle}>Posts from Others</h3>
            {posts.length > 0 ? posts.map(post => (
              <div key={post.id} style={styles.post}>
                <p><strong>{post.user}</strong>: {post.content}</p>
                <div style={styles.actions}>
                  <button onClick={() => handleLike(post.id)} style={styles.actionButton}>{post.likes} Likes</button>
                  <button onClick={() => handleComment(post.id, 'Nice!')} style={styles.actionButton}>Comment</button>
                  <button onClick={() => handleFollow(post.user)} style={styles.actionButton}>Follow</button>
                </div>
                {post.comments.map((comment, idx) => (
                  <p key={idx} style={styles.comment}>{comment}</p>
                ))}
              </div>
            )) : (
              <p style={styles.feedPlaceholder}>No posts available.</p>
            )}
          </div>
        </section>
      </main>

      <footer style={styles.footer}>
        <a href="/about" className="footer-link">About</a>
        <a href="/feedback" className="footer-link">Feedback</a>
      </footer>

      <style>{`
        @keyframes pulseBorder {
          0% { box-shadow: 0 0 10px 0 rgba(0, 105, 92, 0.7); }
          50% { box-shadow: 0 0 20px 10px rgba(0, 105, 92, 0.9); }
          100% { box-shadow: 0 0 10px 0 rgba(0, 105, 92, 0.7); }
        }
        .profile-pic-wrapper:hover img {
          transform: scale(1.1);
          box-shadow: 0 0 15px 5px rgba(0, 105, 92, 0.7);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
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
  mainContent: {
    maxWidth: '1800px',
    margin: '80px auto 40px',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  profileContainer: {},
  profileHeader: { textAlign: 'center', marginBottom: '20px' },
  profilePicWrapper: {
    position: 'relative',
    margin: '0 auto 10px',
    width: '160px',
    height: '160px',
    borderRadius: '50%',
    padding: '5px',
    background: '#00695c',
    animation: 'pulseBorder 2s infinite',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  profileImgModern: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '4px solid white',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  username: { color: '#00695c', margin: '10px 0' },
  bio: {
    width: '100%',
    height: '100px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'vertical',
  },
  bioDisplay: { fontStyle: 'italic', margin: '10px 0', color: '#444' },
  saveButton: {
    backgroundColor: '#00695c',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  searchContainer: { display: 'flex', gap: '10px', marginBottom: '20px' },
  searchInput: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  searchButton: {
    backgroundColor: '#00695c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
  },
  postsSection: { marginTop: '20px' },
  sectionTitle: { color: '#00695c', marginBottom: '10px' },
  post: {
    marginBottom: '20px',
    padding: '15px',
    borderBottom: '1px solid #ddd',
  },
  actions: { display: 'flex', gap: '10px', marginTop: '10px' },
  actionButton: {
    backgroundColor: '#00695c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  comment: { color: '#666', marginLeft: '20px', marginTop: '5px' },
  feedPlaceholder: { color: '#666', fontStyle: 'italic' },
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

export default UserProfile;
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../App.css';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:7200/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setBio(data.bio || '');
        })
        .catch(() => navigate('/'));
    } else {
      navigate('/');
    }

    // Mock data for other users' posts
    setPosts([
      { id: 1, user: 'User1', content: 'Loving the park today!', likes: 5, comments: ['Great pic!'] },
      { id: 2, user: 'User2', content: 'Bakery find!', likes: 3, comments: ['Yum!'] },
    ]);
  }, [navigate]);

  const handleBioChange = (e) => setBio(e.target.value);
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };
  const handleLike = (id) => setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  const handleFollow = (userToFollow) => console.log('Following:', userToFollow);

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <h3 style={styles.navTitle}>518 Compass</h3>
        <div>
          <a href="/" style={styles.navLink}>Home</a>
          <a href="/profile" style={styles.navLink}>Profile</a>
          <a href="/chatrooms" style={styles.navLink}>Chat</a>
          <button onClick={() => { localStorage.removeItem('token'); navigate('/'); }} style={styles.navButton}>Logout</button>
        </div>
      </nav>

      <div style={styles.profileContainer}>
        <div style={styles.profileHeader}>
          <div style={styles.profilePic}>
            <img src={profilePic || 'https://via.placeholder.com/150'} alt="Profile" style={styles.profileImg} />
            <button onClick={() => setProfilePic('https://via.placeholder.com/150?new')} style={styles.editButton}>Edit Pic</button>
          </div>
          <h2 style={styles.username}>{user?.name || 'Guest'}</h2>
          <textarea value={bio} onChange={handleBioChange} placeholder="Tell us about yourself..." style={styles.bio} />
          <button style={styles.saveButton}>Save Bio</button>
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
          {posts.map(post => (
            <div key={post.id} style={styles.post}>
              <p><strong>{post.user}</strong>: {post.content}</p>
              <div style={styles.actions}>
                <button onClick={() => handleLike(post.id)} style={styles.actionButton}>{post.likes} Likes</button>
                <button style={styles.actionButton}>Comment</button>
                <button onClick={() => handleFollow(post.user)} style={styles.actionButton}>Follow</button>
              </div>
              {post.comments.map((comment, idx) => (
                <p key={idx} style={styles.comment}>{comment}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: 'var(--color-bg, #f0f4f8)',
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
  },
  navTitle: { margin: 0 },
  navLink: { color: 'white', marginLeft: '20px', textDecoration: 'none' },
  navButton: { backgroundColor: '#fff', color: '#00695c', padding: '5px 10px', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  profileContainer: { maxWidth: '800px', margin: '20px auto', backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  profileHeader: { textAlign: 'center', marginBottom: '20px' },
  profilePic: { position: 'relative', marginBottom: '10px' },
  profileImg: { width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' },
  editButton: { position: 'absolute', bottom: '5px', right: '5px', backgroundColor: '#00695c', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' },
  username: { color: '#00695c', margin: '10px 0' },
  bio: { width: '100%', height: '100px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', resize: 'vertical' },
  saveButton: { backgroundColor: '#00695c', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' },
  searchContainer: { display: 'flex', gap: '10px', marginBottom: '20px' },
  searchInput: { flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' },
  searchButton: { backgroundColor: '#00695c', color: 'white', border: 'none', borderRadius: '5px', padding: '10px', cursor: 'pointer' },
  postsSection: { marginTop: '20px' },
  sectionTitle: { color: '#00695c', marginBottom: '10px' },
  post: { backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '15px' },
  actions: { display: 'flex', gap: '10px', marginTop: '10px' },
  actionButton: { backgroundColor: '#00695c', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' },
  comment: { color: '#666', marginLeft: '20px', marginTop: '5px' },
};

export default UserProfile;
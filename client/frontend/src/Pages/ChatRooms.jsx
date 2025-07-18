import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function ChatRooms() {
  const [chatRooms, setChatRooms] = useState([
    { id: 1, name: 'General', type: 'group' },
    { id: 2, name: 'Random', type: 'group' },
  ]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [newRoomName, setNewRoomName] = useState('');
  const [newDmUser, setNewDmUser] = useState('');
  const navigate = useNavigate();

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;
    const newRoom = { id: Date.now(), name: newRoomName.trim(), type: 'group' };
    setChatRooms((prev) => [...prev, newRoom]);
    setNewRoomName('');
  };

  const handleCreateDm = () => {
    if (!newDmUser.trim()) return;
    const dmRoom = { id: Date.now(), name: `DM: ${newDmUser.trim()}`, type: 'dm' };
    setChatRooms((prev) => [...prev, dmRoom]);
    setNewDmUser('');
  };

  return (
    <div style={styles.page}>
      {/* Navbar */}
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

      {/* Content */}
      <main style={styles.contentBox}>
        <h2 style={styles.headerText}>Chat Rooms</h2>

        {/* Create New Room */}
        <form onSubmit={handleCreateRoom} style={styles.form}>
          <input
            type="text"
            placeholder="New room name"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Create Room</button>
        </form>

        {/* Create DM */}
        <div style={styles.dmContainer}>
          <input
            type="text"
            placeholder="Username for DM"
            value={newDmUser}
            onChange={(e) => setNewDmUser(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleCreateDm} style={styles.dmButton}>Start DM</button>
        </div>

        {/* Chat Room List */}
        <ul style={styles.roomList}>
          {chatRooms.map((room) => (
            <li key={room.id} style={styles.roomListItem}>
              <button
                style={{
                  ...styles.roomButton,
                  ...(selectedRoom === room.id ? styles.roomButtonActive : {}),
                }}
                onClick={() => setSelectedRoom(room.id)}
              >
                {room.name} {room.type === 'dm' ? '(DM)' : ''}
              </button>
            </li>
          ))}
        </ul>

        {/* Selected Room Display */}
        {selectedRoom && (
          <div style={styles.chatArea}>
            <h3>You're in: {chatRooms.find(r => r.id === selectedRoom)?.name}</h3>
            <p style={{ fontStyle: 'italic', color: '#666' }}>Chat messages would go here.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <a href="/about" className="footer-link">About</a>
        <a href="/feedback" className="footer-link">Feedback</a>
      </footer>

      {/* Inline Styles for footer-link hover */}
      <style>{`
        .footer-link {
          color: white;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 500;
          padding: 8px 20px;
          border-radius: 8px;
          transition: background-color 0.3s ease, color 0.3s ease;
          cursor: pointer;
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
    paddingTop: '60px', // space for fixed navbar
    paddingBottom: '70px', // space for fixed footer
    fontFamily: 'Arial, sans-serif',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#00695c',
    color: 'white',
    padding: '5px 20px',
    borderRadius: '0',
    marginBottom: '0',
    width: '100%',
    left: 0,
    right: 0,
    position: 'fixed',
    top: 0,
    zIndex: 1000,
    overflow: 'hidden',
    flexWrap: 'nowrap',
  },
  navTitle: {
    margin: 0,
    fontSize: '1.5rem',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  contentBox: {
    backgroundColor: 'white',
    maxWidth: '900px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  headerText: {
    color: '#00695c',
    marginBottom: '20px',
    fontSize: '1.8rem',
  },
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flexGrow: 1,
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  button: {
    backgroundColor: '#00695c',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
  },
  dmContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  dmButton: {
    backgroundColor: '#004d40',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
  },
  roomList: {
    listStyle: 'none',
    paddingLeft: 0,
    marginBottom: '20px',
  },
  roomListItem: {
    marginBottom: '10px',
  },
  roomButton: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #00695c',
    backgroundColor: 'white',
    color: '#00695c',
    fontWeight: '600',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  roomButtonActive: {
    backgroundColor: '#00695c',
    color: 'white',
  },
  chatArea: {
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#fafafa',
    color: '#444',
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

export default ChatRooms;

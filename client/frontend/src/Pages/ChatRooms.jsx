import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function ChatRooms() {
  const [chatRooms, setChatRooms] = useState([{ id: 1, name: 'General', type: 'group' }, { id: 2, name: 'Random', type: 'group' }]);
  const [users, setUsers] = useState([{ id: 1, name: 'User1' }, { id: 2, name: 'User2' }]); // Mock users for DM
  const [newRoomName, setNewRoomName] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [navigate] = useNavigate();

  useEffect(() => {
    // Mock initial messages for the first room
    if (selectedChat) {
      setMessages([
        { id: 1, user: 'User1', content: 'Hello!', timestamp: new Date().toISOString(), edited: false, deleted: false },
        { id: 2, user: 'You', content: 'Hi there!', timestamp: new Date().toISOString(), edited: false, deleted: false },
      ]);
    }
  }, [selectedChat]);

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (newRoomName.trim() && !chatRooms.some(room => room.name === newRoomName.trim())) {
      setChatRooms([...chatRooms, { id: Date.now(), name: newRoomName.trim(), type: 'group' }]);
      setNewRoomName('');
    } else {
      alert('Please enter a unique room name.');
    }
  };

  const handleCreateDM = (user) => {
    const dmName = `DM with ${user.name}`;
    if (!chatRooms.some(room => room.name === dmName)) {
      setChatRooms([...chatRooms, { id: Date.now(), name: dmName, type: 'dm', userId: user.id }]);
    }
    setSelectedChat({ id: Date.now(), name: dmName, type: 'dm', userId: user.id });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedChat) {
      setMessages([...messages, { id: Date.now(), user: 'You', content: newMessage.trim(), timestamp: new Date().toISOString(), edited: false, deleted: false }]);
      setNewMessage('');
    }
  };

  const handleEditMessage = (id, newContent) => {
    setMessages(messages.map(msg => msg.id === id ? { ...msg, content: newContent, timestamp: new Date().toISOString(), edited: true } : msg));
  };

  const handleDeleteMessage = (id) => {
    setMessages(messages.map(msg => msg.id === id ? { ...msg, content: '[Message deleted]', timestamp: new Date().toISOString(), deleted: true } : msg));
  };

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <h3 style={styles.navTitle}>518 Compass Chat</h3>
        <div>
          <a href="/" style={styles.navLink}>Home</a>
          <a href="/profile" style={styles.navLink}>Profile</a>
          <button onClick={() => { localStorage.removeItem('token'); navigate('/'); }} style={styles.navButton}>Logout</button>
        </div>
      </nav>

      <div style={styles.chatContainer}>
        <div style={styles.roomList}>
          <h3 style={styles.sectionTitle}>Chat Rooms</h3>
          <form onSubmit={handleCreateRoom} style={styles.form}>
            <input
              type="text"
              placeholder="New group chat name"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Create Group</button>
          </form>
          <h4 style={styles.subTitle}>Direct Messages</h4>
          {users.map(user => (
            <button key={user.id} onClick={() => handleCreateDM(user)} style={styles.dmButton}>
              {user.name}
            </button>
          ))}
          <ul style={styles.roomUl}>
            {chatRooms.map(room => (
              <li key={room.id} style={styles.roomLi}>
                <button onClick={() => setSelectedChat(room)} style={styles.roomButton}>
                  {room.name} ({room.type === 'dm' ? 'DM' : 'Group'})
                </button>
              </li>
            ))}
          </ul>
        </div>

        {selectedChat && (
          <div style={styles.chatArea}>
            <h3 style={styles.chatTitle}>{selectedChat.name}</h3>
            <div style={styles.messages}>
              {messages.map(msg => (
                <div key={msg.id} style={styles.message}>
                  <p><strong>{msg.user}</strong>: {msg.deleted ? '[Message deleted]' : msg.content} <span style={styles.timestamp}>{new Date(msg.timestamp).toLocaleTimeString()}</span>{msg.edited && <span style={styles.edited}> (Edited)</span>}</p>
                  {!msg.deleted && msg.user === 'You' && (
                    <div style={styles.messageActions}>
                      <button onClick={() => handleEditMessage(msg.id, prompt('Edit message:', msg.content) || msg.content)} style={styles.actionButton}>Edit</button>
                      <button onClick={() => handleDeleteMessage(msg.id)} style={styles.actionButton}>Delete</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} style={styles.messageForm}>
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                style={styles.messageInput}
              />
              <button type="submit" style={styles.sendButton}>Send</button>
            </form>
          </div>
        )}
      </div>
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
  },
  navTitle: { margin: 0 },
  navLink: { color: 'white', marginLeft: '20px', textDecoration: 'none' },
  navButton: { backgroundColor: '#fff', color: '#00695c', padding: '5px 10px', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  chatContainer: { display: 'flex', maxWidth: '1200px', margin: '0 auto', gap: '20px' },
  roomList: { flex: '1', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  form: { display: 'flex', gap: '10px', marginBottom: '20px' },
  input: { flex: '1', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' },
  button: { backgroundColor: '#00695c', color: 'white', border: 'none', borderRadius: '5px', padding: '10px', cursor: 'pointer' },
  dmButton: { width: '100%', marginBottom: '10px', backgroundColor: '#00796b', color: 'white', border: 'none', borderRadius: '5px', padding: '10px', cursor: 'pointer' },
  roomUl: { listStyle: 'none', padding: 0 },
  roomLi: { marginBottom: '10px' },
  roomButton: { width: '100%', padding: '10px', backgroundColor: '#e0f2f1', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  chatArea: { flex: '3', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  chatTitle: { color: '#00695c', marginBottom: '20px' },
  messages: { height: '400px', overflowY: 'auto', marginBottom: '20px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '5px' },
  message: { marginBottom: '15px', padding: '10px', backgroundColor: '#fff', borderRadius: '5px' },
  messageActions: { marginTop: '5px' },
  actionButton: { backgroundColor: '#00695c', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', marginRight: '10px', cursor: 'pointer' },
  timestamp: { color: '#666', fontSize: '12px' },
  edited: { color: '#ff9800', fontSize: '12px' },
  messageForm: { display: 'flex', gap: '10px' },
  messageInput: { flex: '1', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' },
  sendButton: { backgroundColor: '#00695c', color: 'white', border: 'none', borderRadius: '5px', padding: '10px', cursor: 'pointer' },
  sectionTitle: { color: '#00695c', marginBottom: '10px' },
  subTitle: { color: '#004d40', marginBottom: '10px' },
};

export default ChatRooms;
import React from 'react';

export default function MainPage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to Our Community App!</h1>
      <p>It’s 10:28 AM EDT on Thursday, June 12, 2025. Connect, chat, and share with others.</p>
      <div>
        <a href="/chatrooms">Go to Chat Rooms</a> | <a href="/profile">View Profile</a> | <a href="/signup">Sign Up</a>
      </div>
    </div>
  );
}
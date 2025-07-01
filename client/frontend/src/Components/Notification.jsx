import React from 'react';

function Notification({ message, time }) {
  return (
    <div style={{
      borderBottom: '1px solid #ddd',
      padding: '10px',
      backgroundColor: '#f9f9f9'
    }}>
      <p>{message}</p>
      <small>{time}</small>
    </div>
  );
}

export default Notification;

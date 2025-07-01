import React from 'react';

function MessageList({ messages }) {
  return (
    <div>
      {messages.map((msg, idx) => (
        <div key={idx}>{msg}</div>
      ))}
    </div>
  );
}

export default MessageList;

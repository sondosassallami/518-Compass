import React from 'react';

function Comment({ text, author }) {
  return (
    <div>
      <strong>{author}:</strong> {text}
    </div>
  );
}

export default Comment;

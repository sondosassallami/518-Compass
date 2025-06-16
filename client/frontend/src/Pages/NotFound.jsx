import React from 'react';
import '../App.css'; // make sure this matches your project's CSS filename

function NotFound() {
  return (
    <div className="page-container">
      <div className="form-container">
        <h2>404 - Page Not Found</h2>
        <p>The page you’re looking for doesn’t exist.</p>
      </div>
    </div>
  );
}

export default NotFound;

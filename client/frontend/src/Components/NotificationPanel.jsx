import React from 'react';

function NotificationPanel({ notifications }) {
  return (
    <div>
      <h3>Notifications</h3>
      <ul>
        {notifications.map((note, idx) => (
          <li key={idx}>{note}</li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationPanel;

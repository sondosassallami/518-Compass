// src/components/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import '../App.css';

function UserProfile() {
  const [user, setUser] = useState(null); // store user data
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // adjust key name if different

        const response = await fetch('http://localhost:7200/api/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch profile');

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="form-container">
      <h2>User Profile</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!user ? (
        <p>Loading...</p>
      ) : (
        <>
          <p><strong>Welcome:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {/* Add more fields if your API returns them */}
        </>
      )}
    </div>
  );
}

export default UserProfile;

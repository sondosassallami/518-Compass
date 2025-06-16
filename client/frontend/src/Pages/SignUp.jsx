import React, { useState } from 'react';
import '../App.css';

function SignUp() {
  // form state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // message state
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const response = await fetch('http://localhost:7200/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to register');
      }

      setMessage('Account created successfully! You can now log in.');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Create Your Account</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            required
            style={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" style={styles.button}>Register</button>
        </form>
        {message && <p style={{ color: 'green', marginTop: '16px' }}>{message}</p>}
        {error && <p style={{ color: 'red', marginTop: '16px' }}>{error}</p>}
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg)',
    padding: '20px',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '24px',
    color: 'var(--color-heading, #004d40)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'var(--color-button, #00695c)',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
};

export default SignUp;

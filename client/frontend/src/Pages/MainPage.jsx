import React, { useState } from 'react';
import '../App.css';

export default function MainPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple dummy check
    if (email === 'test@example.com' && password === '123456') {
      setIsLoggedIn(true);
      alert('Login successful!');
      // Here you could redirect or show a logged-in component
    } else {
      alert('Invalid email or password');
    }
  };

  if (isLoggedIn) {
    return <h2>Welcome, {email}!</h2>;  // Or redirect to chatrooms etc.
  }

  return (
    <div className="page-container">
      <h1 className="main-heading">Welcome to 518 Compass</h1>
      <p className="main-subheading">
        Explore local resources and connect with your Capital Region community.
      </p>

      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">Login</button>
      </form>

      <p className="signup-text">
        Don’t have an account? <a href="/signup">Register here</a>
      </p>
    </div>
  );
}

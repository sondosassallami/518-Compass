import React from 'react';

function Login() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      <form>
        <input type="email" placeholder="Email" required />
        <br />
        <input type="password" placeholder="Password" required />
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;

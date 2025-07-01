import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch('http://localhost:7200/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch user');
          return res.json();
        })
        .then((data) => setUser(data))
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        });
    } else {
      setUser(null);
    }

    setPosts([{ id: 1, user: 'Admin', content: 'Welcome to 518 Compass!' }]);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const normalizedEmail = email.toLowerCase();
    console.log('Attempt at', new Date().toISOString(), ':', { email: normalizedEmail, password, name, isLogin });

    try {
      const url = isLogin ? 'http://localhost:7200/api/auth/login' : 'http://localhost:7200/api/auth/register';
      const body = isLogin ? { email: normalizedEmail, password } : { name, email: normalizedEmail, password };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errText = await response.text();
        console.log('Error response text:', errText);
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed' || errText);
      }

      const data = await response.json();
      console.log('Successful response data:', data);

      if (isLogin) {
        setMessage('Login successful');
        localStorage.setItem('token', data.token);
        setTimeout(() => navigate('/profile'), 2000);
      } else {
        setMessage('Account created! Redirecting to login...');
        setName('');
        setEmail('');
        setPassword('');
        setTimeout(() => {
          setIsLogin(true);
          navigate('/');
        }, 2000);
      }
    } catch (err) {
      console.error('Error:', err.message);
      setError(err.message);
    }
  };

  if (user) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(42, 111, 109, 0.2)', maxWidth: '400px', width: '100%' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2a6f6d', marginBottom: '16px', textShadow: '1px 1px 2px rgba(42, 111, 109, 0.2)' }}>Welcome, {user.name || user.email}!</h2>
          <p style={{ color: '#88b04b', marginBottom: '16px' }}><a href="/profile" style={{ textDecoration: 'underline' }}>Visit your Profile</a></p>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 'semibold', color: '#1e2d24', marginBottom: '8px' }}>Recent Posts</h3>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} style={{ backgroundColor: '#f9f9f7', padding: '12px', borderRadius: '8px', marginBottom: '8px' }}>
                <strong style={{ color: '#1e2d24' }}>{post.user}</strong>: {post.content}
              </div>
            ))
          ) : (
            <p style={{ color: '#4a5a48' }}>No posts available.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(42, 111, 109, 0.2)', maxWidth: '300px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2a6f6d', marginBottom: '16px', textShadow: '1px 1px 2px rgba(42, 111, 109, 0.2)' }}>{isLogin ? 'Login to Your Account' : 'Create Your Account'}</h2>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            style={{ padding: '8px', width: '90%', fontSize: '1.1rem', border: '1.8px solid #cbd3c0', borderRadius: '12px', transition: 'border-color 0.3s ease' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={(e) => { e.target.style.borderColor = '#2a6f6d'; e.target.style.boxShadow = '0 0 8px #2a6f6d'; }}
            onBlur={(e) => { e.target.style.borderColor = '#cbd3c0'; e.target.style.boxShadow = 'none'; }}
          />
          <input
            type="password"
            placeholder="Password"
            required
            style={{ padding: '8px', width: '90%', fontSize: '1.1rem', border: '1.8px solid #cbd3c0', borderRadius: '12px', transition: 'border-color 0.3s ease' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={(e) => { e.target.style.borderColor = '#2a6f6d'; e.target.style.boxShadow = '0 0 8px #2a6f6d'; }}
            onBlur={(e) => { e.target.style.borderColor = '#cbd3c0'; e.target.style.boxShadow = 'none'; }}
          />
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              required
              style={{ padding: '8px', width: '90%', fontSize: '1.1rem', border: '1.8px solid #cbd3c0', borderRadius: '12px', transition: 'border-color 0.3s ease' }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={(e) => { e.target.style.borderColor = '#2a6f6d'; e.target.style.boxShadow = '0 0 8px #2a6f6d'; }}
              onBlur={(e) => { e.target.style.borderColor = '#cbd3c0'; e.target.style.boxShadow = 'none'; }}
            />
          )}
          <button
            type="submit"
            style={{ backgroundColor: '#2a6f6d', color: 'white', border: 'none', padding: '12px 24px', fontSize: '1.1rem', fontWeight: '700', borderRadius: '12px', cursor: 'pointer', transition: 'background-color 0.3s ease, box-shadow 0.3s ease', boxShadow: '0 4px 12px rgba(42, 111, 109, 0.2)' }}
            onMouseOver={(e) => { e.target.style.backgroundColor = '#1f5a57'; e.target.style.boxShadow = '0 6px 16px rgba(42, 111, 109, 0.2)'; }}
            onMouseOut={(e) => { e.target.style.backgroundColor = '#2a6f6d'; e.target.style.boxShadow = '0 4px 12px rgba(42, 111, 109, 0.2)'; }}
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
          <p style={{ textAlign: 'center', fontSize: '1rem', color: '#4a5a48', marginBottom: '0' }}>
            {isLogin ? (
              <>
                Don't have an account? <a href="#" style={{ color: '#d9a441', fontWeight: '700', textDecoration: 'none', transition: 'color 0.3s ease' }} onClick={() => setIsLogin(false)} onMouseOver={(e) => e.target.style.color = '#2a6f6d'} onMouseOut={(e) => e.target.style.color = '#d9a441'}>Register here</a>
              </>
            ) : (
              <>Already have an account? <a href="#" style={{ color: '#d9a441', fontWeight: '700', textDecoration: 'none', transition: 'color 0.3s ease' }} onClick={() => setIsLogin(true)} onMouseOver={(e) => e.target.style.color = '#2a6f6d'} onMouseOut={(e) => e.target.style.color = '#d9a441'}>Login here</a></>
            )}
          </p>
        </form>
        {message && <p style={{ color: '#88b04b', marginTop: '16px', textAlign: 'center' }}>{message}</p>}
        {error && <p style={{ color: '#d32f2f', marginTop: '16px', textAlign: 'center' }}>{error}</p>}
      </div>
    </div>
  );
}

export default MainPage;
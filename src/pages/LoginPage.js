import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Form, Title, InputGroup, Label, Input,
  ErrorMessage, Button
} from '../Designs/LoginPageDesign';

import graduateLogo from '../Assets/graduate.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [popup, setPopup] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(false); // <-- Add loading state
  const navigate = useNavigate();

  // Prevent access to login page if already logged in as superadmin
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const role = localStorage.getItem('role');
    if (isLoggedIn === 'true' && role === 'superadmin') {
      navigate('/announcement');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    fetch('http://vynceianoani.helioho.st/hci/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        setLoading(false); // Stop loading when response is received
        if (!res.ok) {
          setPopup({ show: true, message: 'Username or password is incorrect', type: 'error' });
          setTimeout(() => {
            setPopup({ show: false, message: '', type: '' });
          }, 2000);
          return Promise.reject();
        }
        return res.json();
      })
      .then(data => {
        if (!data) return;
        if (data.success) {
          if (data.role === 'superadmin') {
            // Save login state
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('role', data.role);
            setPopup({ show: true, message: 'Login successful! Redirecting to admin dashboard...', type: 'success' });
            setTimeout(() => {
              setPopup({ show: false, message: '', type: '' });
              navigate('/announcement');
            }, 1800);
          } else {
            setPopup({ show: true, message: "Your account is not an admin.", type: 'error' });
            setTimeout(() => {
              setPopup({ show: false, message: '', type: '' });
            }, 2000);
          }
        } else {
          setPopup({ show: true, message: 'Username or password is incorrect', type: 'error' });
          setTimeout(() => {
            setPopup({ show: false, message: '', type: '' });
          }, 2000);
        }
      })
      .catch(() => {
        setLoading(false); // Stop loading on error
      });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <img
          src={graduateLogo}
          alt="Logo"
          style={{
            width: '110px',
            height: '110px',
            marginBottom: '18px',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        />
        <Title>Login</Title>
        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </InputGroup>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Don't have an account? <a href="/register">Create Here</a>
        </p>
      </Form>
      {popup.show && (
        <div
          style={{
            position: 'fixed',
            top: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            background:
              popup.type === 'success'
                ? '#4caf50'
                : popup.type === 'error'
                ? '#e53935'
                : '#23395d',
            color: '#fff',
            padding: '18px 32px',
            borderRadius: '8px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
            zIndex: 9999,
            fontSize: '18px',
            fontWeight: 500,
            letterSpacing: '1px'
          }}
        >
          {popup.message}
        </div>
      )}
    </Container>
  );
};

export default LoginPage;

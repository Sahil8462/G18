// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import './Auth.css';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // --- Simulating a real API call ---
    setTimeout(() => {
      const { email, password } = formData;
      if (email === "test@example.com" && password === "password123") {
        localStorage.setItem('authToken', 'dummy-token');
        localStorage.setItem('userRole', 'jobSeeker');
        navigate('/dashboard');
      } else if (email === "recruiter@example.com" && password === "password123") {
        localStorage.setItem('authToken', 'dummy-token');
        localStorage.setItem('userRole', 'recruiter');
        navigate('/dashboard');
      } else {
        setError("Invalid credentials. Please check your email and password.");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="hero">
      <div className="container">
        <div className="d-flex justify-content-center align-items-center min-h-screen">
          <div className="card" style={{maxWidth: '400px', width: '100%'}}>
            <div className="text-center mb-4">
              <Logo size="md" />
            </div>
            <h2 className="text-center text-dark mb-2">Welcome Back!</h2>
            <p className="text-center text-muted mb-4">Log in to continue to Smart Hire Portal</p>

            {error && <div style={{background: '#fee', color: '#c53030', padding: '15px', borderRadius: '10px', marginBottom: '20px'}}>{error}</div>}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="e.g., name@example.com"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="form-control"
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <label className="d-flex align-items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  style={{marginRight: '8px'}}
                />
                Remember Me
              </label>
              <Link to="/forgot-password" className="text-primary">Forgot Password?</Link>
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <p className="text-center text-muted">
              Don't have an account? <Link to="/signup" className="text-primary">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
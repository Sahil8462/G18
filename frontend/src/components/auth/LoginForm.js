import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/auth/authService';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    if (!formData.password) {
      setError('Please enter your password');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await authService.login(formData);
      if (result.success) {
        login(result.user);
        navigate(result.user.role === 'recruiter' ? '/recruiter-dashboard' : '/');
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{marginBottom: '1rem'}}>
        <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--text-main)'}}>
          Email Address:
        </label>
        <input 
          style={{width: '100%', padding: '0.8rem', border: '2px solid #e1e5e9', borderRadius: '5px', fontSize: '1rem'}}
          type="text" 
          name="email" 
          placeholder="Enter your email"
          value={formData.email} 
          onChange={handleChange}
        />
      </div>
      
      <div style={{marginBottom: '1rem'}}>
        <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--text-main)'}}>
          Password:
        </label>
        <input 
          style={{width: '100%', padding: '0.8rem', border: '2px solid #e1e5e9', borderRadius: '5px', fontSize: '1rem'}}
          type="password" 
          name="password" 
          placeholder="Enter your password"
          value={formData.password} 
          onChange={handleChange}
        />
      </div>
      
      {error && (
        <div style={{marginBottom: '1rem', padding: '0.8rem', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '5px', border: '1px solid #f5c6cb'}}>
          <strong>❌ {error}</strong>
        </div>
      )}
      
      <button 
        className="shimmer-btn" 
        type="submit"
        disabled={loading}
        style={{width: '100%', padding: '0.8rem', fontSize: '1.1rem', marginBottom: '1rem', opacity: loading ? 0.6 : 1}}
      >
        {loading ? '⏳ Logging in...' : '🔐 Login'}
      </button>
    </form>
  );
};

export default LoginForm;
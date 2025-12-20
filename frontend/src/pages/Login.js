import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const userData = { 
        name: 'John Doe', 
        email: formData.email, 
        role: formData.email.includes('recruiter') ? 'recruiter' : 'jobseeker' 
      };
      login(userData);
      
      const redirectPath = userData.role === 'recruiter' ? '/recruiter/dashboard' : '/jobseeker/dashboard';
      navigate(redirectPath);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Glassmorphism Card */}
        <div className="glass" style={{ padding: '32px', borderRadius: '24px' }}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <img src="/g18-logo.png" alt="G18 Logo" className="h-12 w-auto mr-3" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                SmartHire
              </h1>
            </div>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text-main)', marginBottom: '8px' }}>Welcome Back!</h2>
            <p style={{ color: 'var(--text-main)', opacity: 0.7 }}>Sign in to your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-medium mb-2" style={{ color: 'var(--text-main)' }}>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                style={{ color: 'var(--text-main)' }}
                placeholder="Enter your email"
                autoComplete="off"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2" style={{ color: 'var(--text-main)' }}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                style={{ color: 'var(--text-main)' }}
                placeholder="Enter your password"
                autoComplete="off"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 shimmer-btn font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50 transition-all duration-200 transform hover:scale-105"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t border-white/20 text-center space-y-3">
            <Link to="/forgot-password" className="block text-purple-300 hover:text-purple-200 transition-colors">
              Forgot Password?
            </Link>
            <p className="text-white/70">
              Don't have an account?{' '}
              <Link to="/register" className="text-purple-300 hover:text-purple-200 font-semibold transition-colors">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
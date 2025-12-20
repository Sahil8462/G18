import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img 
              src="/g18-logo.png" 
              alt="G18 Logo" 
              style={{ height: '40px', width: 'auto', marginRight: '12px' }}
            />
            <span className="logo">SmartHire</span>
          </Link>
          
          <div className="nav-links">
            {isAuthenticated ? (
              <>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  color: 'var(--text-main)'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#121212',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700'
                  }}>
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <span>{user?.name}</span>
                  <span style={{
                    background: user?.role === 'recruiter' ? 'var(--success)' : '#121212',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {user?.role?.charAt(0)?.toUpperCase() + user?.role?.slice(1)}
                  </span>
                </div>
                <button onClick={handleLogout} className="btn shimmer-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
                  Login
                </Link>
                <Link to="/register" className="btn shimmer-btn">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
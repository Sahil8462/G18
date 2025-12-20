import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GlassmorphismHeader = () => {
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
              alt="SmartHire Logo" 
              style={{ height: '45px', width: 'auto', marginRight: '15px' }}
            />
            <span style={{
              fontSize: '1.8rem',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #1e3a8a 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: 'Inter, sans-serif'
            }}>
              SmartHire
            </span>
          </Link>

          <div className="nav-links">
            {isAuthenticated ? (
              <>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  padding: '12px 20px',
                  borderRadius: '50px',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#1f2937',
                    fontWeight: '600',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    <div style={{
                      width: '35px',
                      height: '35px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #1e3a8a 0%, #8b5cf6 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: '700'
                    }}>
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <span>{user?.name || 'User'}</span>
                    <span style={{
                      background: user?.role?.toLowerCase() === 'recruiter' 
                        ? 'linear-gradient(135deg, #10b981, #059669)' 
                        : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {user?.role?.charAt(0)?.toUpperCase() + user?.role?.slice(1) || 'User'}
                    </span>
                  </div>
                  
                  <Link 
                    to="/profile" 
                    style={{
                      color: '#1f2937',
                      textDecoration: 'none',
                      fontWeight: '600',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                      fontFamily: 'Inter, sans-serif'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    Profile
                  </Link>
                  
                  <button 
                    onClick={handleLogout}
                    style={{
                      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '14px',
                      transition: 'all 0.3s ease',
                      fontFamily: 'Inter, sans-serif'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', gap: '15px' }}>
                <Link 
                  to="/login" 
                  className="btn btn-secondary"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '600'
                  }}
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="btn shimmer-btn"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '600'
                  }}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default GlassmorphismHeader;
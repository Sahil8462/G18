import React, { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfessionalHeader = memo(() => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-3 text-decoration-none">
          <img 
            src="/g18-logo.png" 
            alt="SmartHire Logo" 
            className="h-10 w-auto"
          />
          <div className="flex flex-col">
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              SmartHire
            </span>
            <span className="text-xs text-gray-400 -mt-1">
              Professional Hiring Platform
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          {isAuthenticated ? (
            <>
              {/* User Profile Section */}
              <div className="glass flex items-center space-x-4 px-4 py-2 rounded-full">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">
                      {user?.name || 'User'}
                    </span>
                    <span className="text-xs text-gray-400">
                      {user?.role?.charAt(0)?.toUpperCase() + user?.role?.slice(1) || 'Member'}
                    </span>
                  </div>
                </div>
                
                {/* Dashboard Link */}
                <Link 
                  to={user?.role === 'recruiter' ? '/recruiter/dashboard' : '/jobseeker/dashboard'}
                  className="btn btn-secondary text-sm px-3 py-1"
                >
                  Dashboard
                </Link>
                
                {/* Settings Link */}
                <Link 
                  to="/settings"
                  className="btn btn-secondary text-sm px-3 py-1"
                >
                  Settings
                </Link>
                
                {/* Logout Button */}
                <button 
                  onClick={handleLogout}
                  className="btn text-sm px-3 py-1 bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Guest Navigation */}
              <Link 
                to="/about" 
                className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
              >
                Contact
              </Link>
              <Link 
                to="/login" 
                className="btn btn-secondary"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="btn shimmer-btn"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

});

export default ProfessionalHeader;
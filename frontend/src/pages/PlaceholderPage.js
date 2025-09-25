import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const PlaceholderPage = ({ title, onLogout }) => {
  return (
    <div className="min-h-screen hero">
      <nav className="navbar">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Logo size="sm" />
              <div className="d-flex" style={{marginLeft: '40px'}}>
                <Link to="/dashboard" className="nav-link">🏠 Home</Link>
                <Link to="/my-network" className="nav-link">👥 Network</Link>
                <Link to="/jobs" className="nav-link">💼 Jobs</Link>
                <Link to="/messages" className="nav-link">💬 Messages</Link>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div style={{width: '40px', height: '40px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '50%', marginRight: '10px'}}></div>
              <Link to="/dashboard" className="btn btn-outline">Dashboard</Link>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="container">
        <div className="d-flex justify-content-center align-items-center" style={{minHeight: '80vh'}}>
          <div className="text-center">
            <div className="card glass" style={{padding: '60px'}}>
              <h1 className="display-2 text-light mb-4">{title}</h1>
              <p className="lead text-light mb-5">This amazing feature is coming soon!</p>
              <Link to="/dashboard" className="btn btn-primary">
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;
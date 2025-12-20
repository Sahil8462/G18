import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThoughtBanner from './ThoughtBanner';

const DashboardLayout = ({ children, sidebarItems, userType }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <div>
      <ThoughtBanner />
      <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div style={{ marginBottom: 'calc(var(--spacing) * 4)' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginBottom: '8px' }}>
            <img 
              src="/g18-logo.png" 
              alt="SmartHire Logo" 
              style={{ height: '30px', width: 'auto', marginRight: '8px' }}
            />
            <span className="logo">SmartHire</span>
          </Link>
          <p style={{ 
            fontSize: '12px', 
            color: 'var(--text-grey)', 
            marginTop: 'calc(var(--spacing))' 
          }}>
            {userType === 'jobseeker' ? 'Job Seeker Portal' : 'Recruiter Portal'}
          </p>
        </div>

        <nav>
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              style={{
                display: 'block',
                padding: 'calc(var(--spacing) * 2)',
                color: item.active ? 'var(--primary-blue)' : 'var(--text-grey)',
                textDecoration: 'none',
                borderRadius: 'var(--border-radius)',
                marginBottom: 'calc(var(--spacing))',
                backgroundColor: item.active ? 'rgba(42, 111, 240, 0.1)' : 'transparent',
                fontWeight: item.active ? '500' : '400'
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: 'calc(var(--spacing) * 4)' }}>
          <button 
            onClick={handleLogout}
            className="btn btn-secondary"
            style={{ width: '100%' }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Header */}
        <header style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(99, 102, 241, 0.1)',
          borderBottom: '1px solid rgba(99, 102, 241, 0.1)',
          padding: '1rem',
          marginBottom: 'calc(var(--spacing) * 3)',
          borderRadius: 'calc(var(--border-radius) * 2)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Link to="/" style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none'
            }}>
              <img 
                src="/g18-logo.png" 
                alt="SmartHire Logo" 
                style={{ height: '35px', width: 'auto', marginRight: '10px' }}
              />
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'var(--primary-blue)'
              }}>SmartHire</div>
            </Link>

            <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <Link to="/" style={{ 
                textDecoration: 'none', 
                color: '#475569',
                fontWeight: '600',
                padding: '0.5rem 1rem',
                borderRadius: '8px'
              }}>
                Home
              </Link>
              <Link to="/jobs" style={{ 
                textDecoration: 'none', 
                color: '#475569',
                fontWeight: '600',
                padding: '0.5rem 1rem',
                borderRadius: '8px'
              }}>
                Jobs
              </Link>
              <Link to="/about" style={{ 
                textDecoration: 'none', 
                color: '#475569',
                fontWeight: '600',
                padding: '0.5rem 1rem',
                borderRadius: '8px'
              }}>
                About
              </Link>
              <Link to="/contact" style={{ 
                textDecoration: 'none', 
                color: '#475569',
                fontWeight: '600',
                padding: '0.5rem 1rem',
                borderRadius: '8px'
              }}>
                Contact
              </Link>
              <Link to="/profile" style={{ 
                textDecoration: 'none', 
                color: '#475569',
                fontWeight: '600',
                padding: '0.5rem 1rem',
                borderRadius: '8px'
              }}>
                Profile
              </Link>
              <button 
                onClick={handleLogout}
                className="btn btn-secondary"
                style={{ padding: '0.5rem 1rem' }}
              >
                Logout
              </button>
            </nav>
          </div>
        </header>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'calc(var(--spacing) * 4)',
          background: 'var(--white)',
          padding: 'calc(var(--spacing) * 3)',
          borderRadius: 'calc(var(--border-radius) * 2)',
          border: '1px solid #E5E7EB'
        }}>
          <div>
            <h2 style={{ marginBottom: 'calc(var(--spacing))' }}>
              Welcome back!
            </h2>
            <p style={{ color: 'var(--text-grey)' }}>
              {localStorage.getItem('userEmail')}
            </p>
          </div>
          <div>
            <button 
              className="btn btn-primary"
              onClick={() => {
                if (userType === 'jobseeker') {
                  navigate('/profile');
                } else {
                  navigate('/post-job');
                }
              }}
            >
              {userType === 'jobseeker' ? 'Update Profile' : 'Post New Job'}
            </button>
          </div>
        </div>

        {children}
      </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
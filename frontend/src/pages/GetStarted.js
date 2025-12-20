import React, { useState } from 'react';
import OTPModal from '../components/OTPModal';
import ThoughtBanner from '../components/ThoughtBanner';

const GetStarted = () => {
  const [showOTP, setShowOTP] = useState(false);
  const [userType, setUserType] = useState('');

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setShowOTP(true);
  };

  return (
    <div>
      <ThoughtBanner />
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <img src="/g18-logo.png" alt="SmartHire Logo" style={{ height: '32px', marginRight: '8px' }} />
              <span className="logo">SmartHire</span>
            </a>
            <div className="nav-links">
              <a href="/about" className="nav-link">About</a>
              <a href="/contact" className="nav-link">Contact</a>
              <a href="/login" className="nav-link">Login</a>
              <a href="/user-registration" className="btn btn-primary">Register</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Professional Job Portal for Modern Hiring</h1>
          <p>Connect talented professionals with innovative companies through our advanced matching platform</p>
        </div>
      </section>

      {/* Get Started Cards */}
      <section style={{ padding: 'calc(var(--spacing) * 8) 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: 'calc(var(--spacing) * 6)' }}>
            Choose Your Path
          </h2>
          
          <div className="grid grid-cols-2" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div 
              className="card" 
              style={{ 
                cursor: 'pointer', 
                textAlign: 'center',
                padding: 'calc(var(--spacing) * 6)'
              }}
              onClick={() => handleUserTypeSelect('jobseeker')}
            >
              <div style={{
                width: '80px',
                height: '80px',
                background: 'var(--primary-blue)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto calc(var(--spacing) * 3)',
                fontSize: '2rem',
                color: 'var(--white)'
              }}>
                👤
              </div>
              <h3>I am a Job Seeker</h3>
              <p style={{ marginBottom: 'calc(var(--spacing) * 3)' }}>
                Find your dream job, build your profile, and connect with top employers
              </p>
              <button 
                className="btn btn-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = '/user-registration';
                }}
              >
                Get Started
              </button>
            </div>

            <div 
              className="card" 
              style={{ 
                cursor: 'pointer', 
                textAlign: 'center',
                padding: 'calc(var(--spacing) * 6)'
              }}
              onClick={() => handleUserTypeSelect('recruiter')}
            >
              <div style={{
                width: '80px',
                height: '80px',
                background: 'var(--dark-blue)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto calc(var(--spacing) * 3)',
                fontSize: '2rem',
                color: 'var(--white)'
              }}>
                🏢
              </div>
              <h3>I am a Recruiter</h3>
              <p style={{ marginBottom: 'calc(var(--spacing) * 3)' }}>
                Post jobs, find candidates, and build your team with qualified professionals
              </p>
              <button 
                className="btn btn-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = '/user-registration';
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ 
        background: 'var(--white)', 
        padding: 'calc(var(--spacing) * 8) 0' 
      }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: 'calc(var(--spacing) * 6)' }}>
            Why Choose SmartHire?
          </h2>
          
          <div className="grid grid-cols-3">
            <div className="card" style={{ textAlign: 'center' }}>
              <h4>Smart Matching</h4>
              <p>AI-powered job matching based on skills, experience, and preferences</p>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <h4>Secure Platform</h4>
              <p>Email OTP verification and secure data handling for all users</p>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <h4>Real-time Updates</h4>
              <p>Instant notifications for job applications and candidate responses</p>
            </div>
          </div>
        </div>
      </section>

      {/* OTP Modal */}
      {showOTP && (
        <OTPModal 
          userType={userType}
          onClose={() => setShowOTP(false)}
        />
      )}
    </div>
  );
};

export default GetStarted;
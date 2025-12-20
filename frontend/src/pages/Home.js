import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
        <img 
          src="/g18-logo.png" 
          alt="G18 Logo" 
          style={{ height: '60px', width: 'auto', marginRight: '20px' }}
        />
        <h1 style={{ fontSize: '48px', color: 'var(--text-main)', fontWeight: '800' }}>
          SmartHire
        </h1>
      </div>
      <p style={{ fontSize: '20px', marginBottom: '40px', color: 'var(--text-main)' }}>
        Connect talented professionals with great opportunities
      </p>
      
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/register" className="btn shimmer-btn" style={{ padding: '16px 32px', fontSize: '18px' }}>
          Get Started
        </Link>
        <Link to="/login" className="btn btn-secondary" style={{ padding: '16px 32px', fontSize: '18px' }}>
          Sign In
        </Link>
      </div>

      <div style={{ marginTop: '80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
        <div className="glass" style={{ textAlign: 'center', padding: '32px' }}>
          <h3 style={{ color: 'var(--text-main)', marginBottom: '16px' }}>For Job Seekers</h3>
          <p style={{ color: 'var(--text-main)' }}>Find your dream job with our advanced matching system</p>
        </div>
        <div className="glass" style={{ textAlign: 'center', padding: '32px' }}>
          <h3 style={{ color: 'var(--text-main)', marginBottom: '16px' }}>For Recruiters</h3>
          <p style={{ color: 'var(--text-main)' }}>Discover top talent and streamline your hiring process</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
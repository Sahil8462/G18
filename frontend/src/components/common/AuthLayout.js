import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle, showLoginLink = false, showRegisterLink = false }) => {
  return (
    <div style={{
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem 0'
    }}>
      <div className="container">
        <div style={{
          maxWidth: '500px', 
          margin: '0 auto', 
          background: 'white', 
          padding: '2rem', 
          borderRadius: '10px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          <div style={{textAlign: 'center', marginBottom: '2rem'}}>
            <h1 style={{color: '#333', marginBottom: '0.5rem'}}>🚀 Smart Hire</h1>
            <h2 style={{color: '#666', fontSize: '1.5rem'}}>{title}</h2>
            {subtitle && <p style={{color: '#888'}}>{subtitle}</p>}
          </div>
          
          {children}
          
          <div style={{textAlign: 'center', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '5px', marginTop: '1rem'}}>
            {showLoginLink && (
              <p style={{margin: 0, color: '#666'}}>
                Already have an account? <Link to="/login" style={{color: '#007bff', textDecoration: 'none', fontWeight: 'bold'}}>Login Here</Link>
              </p>
            )}
            {showRegisterLink && (
              <p style={{margin: 0, color: '#666'}}>
                Don't have an account? <Link to="/register" style={{color: '#007bff', textDecoration: 'none', fontWeight: 'bold'}}>Register Here</Link>
              </p>
            )}
          </div>
          
          <div style={{marginTop: '1rem', textAlign: 'center'}}>
            <Link to="/" style={{color: '#666', textDecoration: 'none'}}>← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
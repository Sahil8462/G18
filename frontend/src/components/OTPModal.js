import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OTPModal = ({ userType, onClose }) => {
  const [step, setStep] = useState('email'); // 'email' or 'otp'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate OTP sending
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1500);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setLoading(false);
      
      // Store user data
      localStorage.setItem('userType', userType);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('isAuthenticated', 'true');
      
      // Redirect to appropriate dashboard
      if (userType === 'jobseeker') {
        navigate('/jobseeker/dashboard');
      } else {
        navigate('/recruiter/dashboard');
      }
      
      onClose();
    }, 1500);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'var(--white)',
        borderRadius: 'calc(var(--border-radius) * 2)',
        padding: 'calc(var(--spacing) * 4)',
        width: '100%',
        maxWidth: '400px',
        margin: 'calc(var(--spacing) * 3)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'calc(var(--spacing) * 3)'
        }}>
          <h3>
            {step === 'email' ? 'Enter Email' : 'Verify OTP'}
          </h3>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: 'var(--text-grey)'
            }}
          >
            ×
          </button>
        </div>

        {step === 'email' ? (
          <form onSubmit={handleSendOTP}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP}>
            <div className="form-group">
              <label className="form-label">Enter OTP</label>
              <input
                type="text"
                className="form-input"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                required
              />
              <p style={{ 
                fontSize: '12px', 
                color: 'var(--text-grey)', 
                marginTop: 'calc(var(--spacing))' 
              }}>
                OTP sent to {email}
              </p>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </button>
            
            <button 
              type="button"
              className="btn btn-secondary"
              style={{ width: '100%', marginTop: 'calc(var(--spacing) * 2)' }}
              onClick={() => setStep('email')}
            >
              Change Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default OTPModal;
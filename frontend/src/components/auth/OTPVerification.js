import React, { useState } from 'react';
import authService from '../../services/auth/authService';

const OTPVerification = ({ identifier, type, onVerified, onBack }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const sendOTP = async () => {
    console.log('=== SENDING OTP ===');
    console.log('Identifier:', identifier);
    console.log('Type:', type);
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const result = await authService.sendOTP(identifier, type);
      console.log('OTP send result:', result);
      
      if (result.success) {
        setOtpSent(true);
        setSuccess(`✅ OTP sent to your ${type === 'email' ? 'email' : 'phone'}`);
        setError('');
        console.log('✅ OTP sent successfully');
      } else {
        setError(result.message || 'Failed to send OTP. Please try again.');
        setSuccess('');
        console.log('❌ OTP send failed:', result.message);
      }
    } catch (error) {
      console.error('❌ OTP send error:', error);
      setError(error.message || 'Failed to send OTP. Please check your connection.');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!otp || otp.length === 0) {
      setError('Please enter the OTP code');
      return;
    }

    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError('OTP must contain only numbers');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await authService.verifyOTP(identifier, otp);
      if (result.success) {
        setSuccess('✅ Verification successful!');
        setTimeout(() => onVerified(), 1500);
      } else {
        setError(result.message || 'Invalid or expired OTP. Please try again.');
      }
    } catch (error) {
      setError(error.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    console.log('=== OTP COMPONENT MOUNTED ===');
    console.log('Identifier:', identifier);
    console.log('Type:', type);
    sendOTP();
  }, []);

  return (
    <div>
      <form noValidate>
      <div style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h3 style={{color: '#333', marginBottom: '0.5rem'}}>Verify Your {type === 'email' ? 'Email' : 'Phone'}</h3>
        <p style={{color: '#666'}}>We've sent a verification code to {identifier}</p>
      </div>

      <div style={{marginBottom: '1rem'}}>
        <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333'}}>
          Enter OTP:
        </label>
        <input 
          style={{width: '100%', padding: '0.8rem', border: '2px solid #e1e5e9', borderRadius: '5px', fontSize: '1rem', textAlign: 'center', letterSpacing: '0.2rem'}}
          type="text" 
          placeholder="Enter 6-digit OTP"
          value={otp} 
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, ''); // Only allow digits
            setOtp(value);
            if (error) setError(''); // Clear error when user types
          }} 
          maxLength="6"
          pattern="\d{6}"
          inputMode="numeric"
        />
      </div>

      {success && (
        <div style={{marginBottom: '1rem', padding: '0.8rem', backgroundColor: '#d4edda', color: '#155724', borderRadius: '5px'}}>
          ✅ {success}
        </div>
      )}

      {error && (
        <div style={{marginBottom: '1rem', padding: '0.8rem', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '5px'}}>
          ❌ {error}
        </div>
      )}

      <div style={{display: 'flex', gap: '0.5rem', marginBottom: '1rem'}}>
        <button 
          className="btn btn-primary" 
          type="button"
          onClick={verifyOTP}
          disabled={loading || !otp || otp.length !== 6}
          style={{flex: 1, opacity: (loading || !otp || otp.length !== 6) ? 0.6 : 1}}
        >
          {loading ? '⏳ Verifying...' : '✓ Verify OTP'}
        </button>
        
        <button 
          className="btn btn-secondary"
          type="button" 
          onClick={sendOTP}
          disabled={loading}
          style={{opacity: loading ? 0.6 : 1}}
        >
          {loading ? '⏳ Sending...' : '🔄 Resend'}
        </button>
      </div>

      <button 
        className="btn btn-secondary"
        type="button" 
        onClick={onBack}
        style={{width: '100%'}}
      >
        ← Back to Registration
      </button>
      </form>
    </div>
  );
};

export default OTPVerification;
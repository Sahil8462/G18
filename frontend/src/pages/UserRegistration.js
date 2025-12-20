import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThoughtBanner from '../components/ThoughtBanner';
import authService from '../services/authService';

const UserRegistration = () => {
  const [activeTab, setActiveTab] = useState('jobseeker');
  const [step, setStep] = useState('form'); // 'form', 'otp', 'success'
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    userType: 'jobseeker'
  });
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [otpExpiry, setOtpExpiry] = useState(null);
  
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormData({ ...formData, userType: tab });
  };

  const sendOTP = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const result = await authService.sendOTP(formData.email);
      console.log('Send OTP Result:', result);
      if (result.success) {
        setOtpSent(true);
        setStep('otp');
        setOtpExpiry(Date.now() + 5 * 60 * 1000);
        alert(`OTP sent! ${result.debug_otp ? 'Test OTP: ' + result.debug_otp : 'Check your email'}`);
      } else {
        alert('OTP Error: ' + (result.message || 'Failed to send OTP'));
        setErrors({ email: result.message || 'Failed to send OTP' });
      }
    } catch (error) {
      setErrors({ email: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setErrors({ otp: 'Please enter a valid 6-digit OTP' });
      return;
    }
    
    setLoading(true);
    try {
      const verifyResult = await authService.verifyOTP(formData.email, otp);
      if (verifyResult.success) {
        const registerResult = await authService.register({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: formData.userType
        });
        
        if (registerResult.success) {
          setStep('success');
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userEmail', formData.email);
          localStorage.setItem('userType', formData.userType);
          
          setTimeout(() => {
            if (formData.userType === 'jobseeker') {
              navigate('/jobseeker/dashboard');
            } else {
              navigate('/recruiter/dashboard');
            }
          }, 2000);
        } else {
          setErrors({ otp: registerResult.message || 'Registration failed' });
        }
      } else {
        setErrors({ otp: verifyResult.message || 'Invalid OTP' });
      }
    } catch (error) {
      setErrors({ otp: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    setOtp('');
    setErrors({});
    await sendOTP();
  };

  return (
    <div>
      <ThoughtBanner />
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, var(--light-grey) 0%, #E2E8F0 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'calc(var(--spacing) * 3)'
      }}>
      {/* Header */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        background: 'var(--white)',
        borderBottom: '1px solid #E5E7EB',
        padding: 'calc(var(--spacing) * 2) 0'
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/g18-logo.png" alt="SmartHire Logo" style={{ height: '32px', marginRight: '12px' }} />
            <span className="logo">SmartHire</span>
          </div>
        </div>
      </div>

      {/* Registration Card */}
      <div style={{
        background: 'var(--white)',
        borderRadius: 'calc(var(--border-radius) * 3)',
        padding: 'calc(var(--spacing) * 6)',
        width: '100%',
        maxWidth: '500px',
        boxShadow: '0 20px 60px rgba(42, 111, 240, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        marginTop: '80px'
      }}>
        {step === 'form' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: 'calc(var(--spacing) * 6)' }}>
              <h1 style={{ 
                fontSize: '2rem', 
                fontWeight: '700',
                color: 'var(--dark-blue)',
                marginBottom: 'calc(var(--spacing) * 2)'
              }}>
                Create Your Account
              </h1>
              <p style={{ color: 'var(--text-grey)' }}>
                Join SmartHire and start your professional journey
              </p>
            </div>

            {/* User Type Tabs */}
            <div style={{ 
              display: 'flex', 
              background: 'var(--light-grey)',
              borderRadius: 'calc(var(--border-radius) * 2)',
              padding: 'calc(var(--spacing))',
              marginBottom: 'calc(var(--spacing) * 4)'
            }}>
              <button
                onClick={() => handleTabChange('jobseeker')}
                style={{
                  flex: 1,
                  padding: 'calc(var(--spacing) * 2)',
                  border: 'none',
                  borderRadius: 'calc(var(--border-radius))',
                  background: activeTab === 'jobseeker' ? 'var(--primary-blue)' : 'transparent',
                  color: activeTab === 'jobseeker' ? 'var(--white)' : 'var(--text-grey)',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Job Seeker
              </button>
              <button
                onClick={() => handleTabChange('recruiter')}
                style={{
                  flex: 1,
                  padding: 'calc(var(--spacing) * 2)',
                  border: 'none',
                  borderRadius: 'calc(var(--border-radius))',
                  background: activeTab === 'recruiter' ? 'var(--primary-blue)' : 'transparent',
                  color: activeTab === 'recruiter' ? 'var(--white)' : 'var(--text-grey)',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Recruiter
              </button>
            </div>

            {/* Registration Form */}
            <form onSubmit={(e) => { e.preventDefault(); sendOTP(); }}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  style={{ borderColor: errors.fullName ? '#EF4444' : undefined }}
                />
                {errors.fullName && (
                  <p style={{ color: '#EF4444', fontSize: '12px', marginTop: 'calc(var(--spacing))' }}>
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email address"
                  style={{ borderColor: errors.email ? '#EF4444' : undefined }}
                />
                {errors.email && (
                  <p style={{ color: '#EF4444', fontSize: '12px', marginTop: 'calc(var(--spacing))' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <input
                  type="tel"
                  className="form-input"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                  placeholder="Enter your mobile number (optional)"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password *</label>
                <input
                  type="password"
                  className="form-input"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Create a strong password"
                  style={{ borderColor: errors.password ? '#EF4444' : undefined }}
                />
                {errors.password && (
                  <p style={{ color: '#EF4444', fontSize: '12px', marginTop: 'calc(var(--spacing))' }}>
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password *</label>
                <input
                  type="password"
                  className="form-input"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                  style={{ borderColor: errors.confirmPassword ? '#EF4444' : undefined }}
                />
                {errors.confirmPassword && (
                  <p style={{ color: '#EF4444', fontSize: '12px', marginTop: 'calc(var(--spacing))' }}>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button 
                type="submit"
                className="btn btn-primary"
                style={{ 
                  width: '100%', 
                  padding: 'calc(var(--spacing) * 3)',
                  fontSize: '1.1rem',
                  fontWeight: '600'
                }}
                disabled={loading}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: 'calc(var(--spacing) * 4)' }}>
              <p style={{ color: 'var(--text-grey)' }}>
                Already have an account? 
                <a href="/login" style={{ color: 'var(--primary-blue)', textDecoration: 'none', marginLeft: 'calc(var(--spacing))' }}>
                  Sign In
                </a>
              </p>
            </div>
          </>
        )}

        {step === 'otp' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: 'calc(var(--spacing) * 6)' }}>
              <div style={{ 
                fontSize: '3rem', 
                marginBottom: 'calc(var(--spacing) * 2)' 
              }}>📧</div>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '600',
                color: 'var(--dark-blue)',
                marginBottom: 'calc(var(--spacing) * 2)'
              }}>
                Verify Your Email
              </h2>
              <p style={{ color: 'var(--text-grey)' }}>
                We've sent a 6-digit verification code to<br />
                <strong>{formData.email}</strong>
              </p>
            </div>

            <div className="form-group">
              <label className="form-label">Enter OTP Code</label>
              <input
                type="text"
                className="form-input"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit code"
                maxLength="6"
                style={{ 
                  textAlign: 'center',
                  fontSize: '1.5rem',
                  letterSpacing: '0.5rem',
                  borderColor: errors.otp ? '#EF4444' : undefined
                }}
              />
              {errors.otp && (
                <p style={{ color: '#EF4444', fontSize: '12px', marginTop: 'calc(var(--spacing))' }}>
                  {errors.otp}
                </p>
              )}
            </div>

            <button 
              onClick={verifyOTP}
              className="btn btn-primary"
              style={{ 
                width: '100%', 
                padding: 'calc(var(--spacing) * 3)',
                fontSize: '1.1rem',
                fontWeight: '600',
                marginBottom: 'calc(var(--spacing) * 3)'
              }}
              disabled={loading || otp.length !== 6}
            >
              {loading ? 'Verifying...' : 'Verify & Create Account'}
            </button>

            <div style={{ textAlign: 'center' }}>
              <p style={{ color: 'var(--text-grey)', marginBottom: 'calc(var(--spacing) * 2)' }}>
                Didn't receive the code?
              </p>
              <button 
                onClick={resendOTP}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary-blue)',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontWeight: '500'
                }}
                disabled={loading}
              >
                Resend OTP
              </button>
            </div>
          </>
        )}

        {step === 'success' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '4rem', 
              marginBottom: 'calc(var(--spacing) * 3)' 
            }}>✅</div>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600',
              color: 'var(--dark-blue)',
              marginBottom: 'calc(var(--spacing) * 2)'
            }}>
              Email Verified Successfully!
            </h2>
            <p style={{ 
              color: 'var(--text-grey)',
              marginBottom: 'calc(var(--spacing) * 4)'
            }}>
              Your account has been created successfully.<br />
              Redirecting to your dashboard...
            </p>
            <div style={{
              width: '100%',
              height: '4px',
              background: 'var(--light-grey)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                background: 'var(--primary-blue)',
                animation: 'loading 2s ease-in-out'
              }} />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
      </div>
    </div>
  );
};

export default UserRegistration;
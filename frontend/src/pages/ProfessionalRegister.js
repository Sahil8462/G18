import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfessionalRegister = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: searchParams.get('role') || 'jobseeker'
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const validateStep1 = () => {
    if (!formData.name.trim()) {
      setError('Please enter your full name');
      return false;
    }
    
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (!formData.password) {
      setError('Please create a password');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    
    if (!validateStep1()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:8084/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCurrentStep(2);
        setOtpTimer(60);
      } else {
        setError(data.message || 'Failed to send verification code');
      }
    } catch (error) {
      setError('Failed to send verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      setError('Please enter the complete 6-digit verification code');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:8084/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp })
      });
      
      const data = await response.json();
      
      if (data.success) {
        const userData = {
          name: formData.name,
          email: formData.email,
          role: formData.role
        };
        
        login(userData);
        
        const redirectPath = userData.role === 'recruiter' 
          ? '/recruiter/dashboard' 
          : '/jobseeker/dashboard';
        navigate(redirectPath);
      } else {
        setError(data.message || 'Invalid verification code');
      }
    } catch (error) {
      setError('Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (otpTimer > 0) return;
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8084/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setOtpTimer(60);
        setError('');
      } else {
        setError(data.message || 'Failed to resend code');
      }
    } catch (error) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="glass p-8 fade-in">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <img src="/g18-logo.png" alt="SmartHire Logo" className="h-12 w-auto mr-3" />
              <div className="text-left">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  SmartHire
                </h1>
                <p className="text-xs text-gray-400 -mt-1">Professional Platform</p>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {currentStep === 1 ? 'Create Account' : 'Verify Email'}
            </h2>
            <p className="text-gray-400">
              {currentStep === 1 
                ? 'Join thousands of professionals on SmartHire' 
                : 'Enter the 6-digit code sent to your email'
              }
            </p>
          </div>

          {currentStep === 1 ? (
            <form onSubmit={handleStep1Submit} className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-3">I am a</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                    formData.role === 'jobseeker' 
                      ? 'border-indigo-500 bg-indigo-500/10' 
                      : 'border-gray-600 bg-white/5 hover:bg-white/10'
                  }`}>
                    <input
                      type="radio"
                      name="role"
                      value="jobseeker"
                      checked={formData.role === 'jobseeker'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-2xl mb-2">🎯</div>
                      <div className="text-white font-semibold text-sm">Job Seeker</div>
                    </div>
                  </label>
                  
                  <label className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                    formData.role === 'recruiter' 
                      ? 'border-indigo-500 bg-indigo-500/10' 
                      : 'border-gray-600 bg-white/5 hover:bg-white/10'
                  }`}>
                    <input
                      type="radio"
                      name="role"
                      value="recruiter"
                      checked={formData.role === 'recruiter'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-2xl mb-2">💼</div>
                      <div className="text-white font-semibold text-sm">Recruiter</div>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Create a strong password"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <span className="text-red-400 text-sm">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn shimmer-btn w-full py-3 text-lg disabled:opacity-50"
              >
                {loading ? 'Sending Code...' : 'Send Verification Code'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2 text-center">Enter Verification Code</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="form-input text-center text-2xl tracking-widest"
                  placeholder="000000"
                  maxLength="6"
                  required
                />
                <p className="text-gray-400 text-sm text-center mt-2">Code sent to {formData.email}</p>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <span className="text-red-400 text-sm">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="btn shimmer-btn w-full py-3 text-lg disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify & Create Account'}
              </button>

              <button
                type="button"
                onClick={handleResendOTP}
                disabled={otpTimer > 0 || loading}
                className="btn btn-secondary w-full disabled:opacity-50"
              >
                {otpTimer > 0 ? `Resend Code in ${otpTimer}s` : 'Resend Code'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalRegister;
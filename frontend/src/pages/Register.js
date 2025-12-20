import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'jobseeker'
  });
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      const data = await response.json();
      
      if (data.success) {
        setOtpStep(true);
        setResendTimer(60);
      } else {
        alert(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      alert('Error sending OTP: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const verifyResponse = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp })
      });
      const verifyData = await verifyResponse.json();
      
      if (verifyData.success) {
        const registerResponse = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            role: formData.role
          })
        });
        const registerData = await registerResponse.json();
        
        if (registerData.success) {
          login(registerData.data);
          const redirectPath = registerData.data.role === 'recruiter' ? '/recruiter/dashboard' : '/jobseeker/dashboard';
          navigate(redirectPath);
        } else {
          alert(registerData.message || 'Registration failed');
        }
      } else {
        alert(verifyData.message || 'Invalid OTP');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      const data = await response.json();
      
      if (data.success) {
        setResendTimer(60);
        alert('OTP resent successfully!');
      } else {
        alert(data.message || 'Failed to resend OTP');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Glassmorphism Card */}
        <div className="glass" style={{ padding: '32px', borderRadius: '24px' }}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <img src="/g18-logo.png" alt="G18 Logo" className="h-12 w-auto mr-3" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                SmartHire
              </h1>
            </div>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text-main)', marginBottom: '8px' }}>
              {otpStep ? 'Verify Your Email' : 'Create Account'}
            </h2>
            <p style={{ color: 'var(--text-main)', opacity: 0.7 }}>
              {otpStep ? 'Enter the 6-digit code sent to your email' : 'Join thousands of professionals'}
            </p>
          </div>

          {!otpStep ? (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-medium mb-2" style={{ color: 'var(--text-main)' }}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  style={{ color: 'var(--text-main)' }}
                  placeholder="Enter your full name"
                  autoComplete="off"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-2" style={{ color: 'var(--text-main)' }}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  style={{ color: 'var(--text-main)' }}
                  placeholder="Enter your email"
                  autoComplete="off"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-2" style={{ color: 'var(--text-main)' }}>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  style={{ color: 'var(--text-main)' }}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-3" style={{ color: 'var(--text-main)' }}>I am a</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
                    formData.role === 'jobseeker' 
                      ? 'border-purple-400 bg-purple-400/20' 
                      : 'border-white/20 bg-white/5 hover:bg-white/10'
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
                      <div className="font-semibold" style={{ color: 'var(--text-main)' }}>Job Seeker</div>
                      <div className="text-sm" style={{ color: 'var(--text-main)', opacity: 0.6 }}>Find opportunities</div>
                    </div>
                  </label>
                  
                  <label className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
                    formData.role === 'recruiter' 
                      ? 'border-purple-400 bg-purple-400/20' 
                      : 'border-white/20 bg-white/5 hover:bg-white/10'
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
                      <div className="font-semibold" style={{ color: 'var(--text-main)' }}>Recruiter</div>
                      <div className="text-sm" style={{ color: 'var(--text-main)', opacity: 0.6 }}>Hire candidates</div>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 shimmer-btn font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50 transition-all duration-200 transform hover:scale-105"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            /* OTP Verification Form */
            <form onSubmit={handleOtpVerification} className="space-y-6">
              <div>
                <label className="block font-medium mb-2" style={{ color: 'var(--text-main)' }}>Enter OTP Code</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  style={{ color: 'var(--text-main)' }}
                  placeholder="000000"
                  maxLength="6"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full py-3 px-6 shimmer-btn font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50 transition-all duration-200 transform hover:scale-105"
              >
                {loading ? 'Verifying...' : 'Verify & Register'}
              </button>

              <button
                type="button"
                onClick={handleResendOTP}
                disabled={resendTimer > 0}
                className="w-full py-2 px-4 text-white/70 hover:text-white font-medium disabled:opacity-50 transition-colors"
              >
                {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
              </button>

              <button
                type="button"
                onClick={() => setOtpStep(false)}
                className="w-full py-2 px-4 text-white/70 hover:text-white font-medium transition-colors"
              >
                ← Back to Registration
              </button>
            </form>
          )}

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t border-white/20 text-center space-y-3">
            <Link to="/forgot-password" className="block text-purple-300 hover:text-purple-200 transition-colors">
              Forgot Password?
            </Link>
            <p className="text-white/70">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-300 hover:text-purple-200 font-semibold transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
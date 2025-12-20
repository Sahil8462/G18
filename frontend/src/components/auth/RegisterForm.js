import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/auth/authService';
import OTPVerification from './OTPVerification';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userRole: 'jobSeeker',
    contactType: 'email'
  });
  const [otpStep, setOtpStep] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleOTPVerified = async () => {
    try {
      const userData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.contactType === 'email' ? formData.email.trim() : '',
        phone: formData.contactType === 'phone' ? formData.phone.trim() : '',
        password: formData.password,
        role: formData.userRole
      };
      
      console.log('=== REGISTRATION DATA ===');
      console.log('Sending to backend:', userData);

      const result = await authService.register(userData);
      
      console.log('Registration result:', result);
      
      if (result.success) {
        login(result.user);
        navigate(formData.userRole === 'recruiter' ? '/recruiter-dashboard' : '/');
      } else {
        console.error('Registration failed:', result.message);
        setError(result.message || 'Registration failed');
        setOtpStep(false);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message);
      setOtpStep(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    console.log('=== FORM SUBMISSION START ===');
    console.log('Form data:', formData);
    console.log('Contact type:', formData.contactType);
    
    try {
      // Validate first name
      if (!formData.firstName || !formData.firstName.trim()) {
        console.log('Validation failed: First name missing');
        setError('Please enter your first name');
        return;
      }
      
      // Validate last name
      if (!formData.lastName || !formData.lastName.trim()) {
        console.log('Validation failed: Last name missing');
        setError('Please enter your last name');
        return;
      }
      
      // Validate contact method
      if (formData.contactType === 'email') {
        if (!formData.email || !formData.email.trim()) {
          console.log('Validation failed: Email missing');
          setError('Please enter your email address');
          return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
          console.log('Validation failed: Invalid email format');
          setError('Please enter a valid email address');
          return;
        }
      } else if (formData.contactType === 'phone') {
        if (!formData.phone || !formData.phone.trim()) {
          console.log('Validation failed: Phone missing');
          setError('Please enter your phone number');
          return;
        }
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.phone.trim())) {
          console.log('Validation failed: Invalid phone format');
          setError('Please enter a valid 10-digit phone number');
          return;
        }
      }
      
      // Validate password
      if (!formData.password) {
        console.log('Validation failed: Password missing');
        setError('Please create a password');
        return;
      }
      
      if (formData.password.length < 6) {
        console.log('Validation failed: Password too short');
        setError('Password must be at least 6 characters long');
        return;
      }
      
      // Validate confirm password
      if (!formData.confirmPassword) {
        console.log('Validation failed: Confirm password missing');
        setError('Please confirm your password');
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        console.log('Validation failed: Passwords do not match');
        setError('Passwords do not match. Please check and try again');
        return;
      }
      
      // All validations passed
      console.log('✅ All validations passed!');
      console.log('Proceeding to OTP step...');
      setOtpStep(true);
      console.log('OTP step set to true');
      
    } catch (error) {
      console.error('Error in form validation:', error);
      setError('An error occurred. Please try again.');
    }
  };

  if (otpStep) {
    return (
      <OTPVerification
        identifier={formData.contactType === 'email' ? formData.email : formData.phone}
        type={formData.contactType}
        onVerified={handleOTPVerified}
        onBack={() => setOtpStep(false)}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem'}}>
        <div>
          <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--text-main)'}}>
            First Name:
          </label>
          <input 
            style={{width: '100%', padding: '0.8rem', border: '2px solid #e1e5e9', borderRadius: '5px', fontSize: '1rem'}}
            type="text" 
            name="firstName" 
            placeholder="Enter first name" 
            value={formData.firstName} 
            onChange={handleChange}
          />
        </div>
        <div>
          <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--text-main)'}}>
            Last Name:
          </label>
          <input 
            style={{width: '100%', padding: '0.8rem', border: '2px solid #e1e5e9', borderRadius: '5px', fontSize: '1rem'}}
            type="text" 
            name="lastName" 
            placeholder="Enter last name" 
            value={formData.lastName} 
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div style={{marginBottom: '1rem'}}>
        <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--text-main)'}}>
          I want to register as:
        </label>
        <select 
          style={{width: '100%', padding: '0.8rem', border: '2px solid #e1e5e9', borderRadius: '5px', fontSize: '1rem'}}
          name="userRole" 
          value={formData.userRole} 
          onChange={handleChange}
        >
          <option value="jobSeeker">👨💼 Job Seeker</option>
          <option value="recruiter">🏢 Recruiter</option>
        </select>
      </div>
      
      <div style={{marginBottom: '1rem'}}>
        <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--text-main)'}}>
          Contact Method:
        </label>
        <select 
          style={{width: '100%', padding: '0.8rem', border: '2px solid #e1e5e9', borderRadius: '5px', fontSize: '1rem'}}
          name="contactType" 
          value={formData.contactType} 
          onChange={handleChange}
        >
          <option value="email">📧 Email Address</option>
          <option value="phone">📱 Phone Number</option>
        </select>
      </div>
      
      {formData.contactType === 'email' ? (
        <div style={{marginBottom: '1rem'}}>
          <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--text-main)'}}>
            Email Address:
          </label>
          <input 
            style={{width: '100%', padding: '0.8rem', border: '2px solid #e1e5e9', borderRadius: '5px', fontSize: '1rem'}}
            type="text" 
            name="email" 
            placeholder="Enter your email" 
            value={formData.email} 
            onChange={handleChange}
          />
        </div>
      ) : (
        <div style={{marginBottom: '1rem'}}>
          <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--text-main)'}}>
            Phone Number:
          </label>
          <input 
            style={{width: '100%', padding: '0.8rem', border: '2px solid #e1e5e9', borderRadius: '5px', fontSize: '1rem'}}
            type="text" 
            name="phone" 
            placeholder="Enter 10-digit phone number" 
            value={formData.phone} 
            onChange={handleChange} 
            maxLength="10"
          />
        </div>
      )}
      
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem'}}>
        <div>
          <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--text-main)'}}>
            Password:
          </label>
          <input 
            style={{width: '100%', padding: '0.8rem', border: '2px solid #e1e5e9', borderRadius: '5px', fontSize: '1rem'}}
            type="password" 
            name="password" 
            placeholder="Create password" 
            value={formData.password} 
            onChange={handleChange}
          />
        </div>
        <div>
          <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--text-main)'}}>
            Confirm Password:
          </label>
          <input 
            style={{width: '100%', padding: '0.8rem', border: '2px solid #e1e5e9', borderRadius: '5px', fontSize: '1rem'}}
            type="password" 
            name="confirmPassword" 
            placeholder="Confirm password" 
            value={formData.confirmPassword} 
            onChange={handleChange}
          />
        </div>
      </div>
      
      {error && (
        <div style={{marginBottom: '1rem', padding: '0.8rem', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '5px', border: '1px solid #f5c6cb'}}>
          <strong>❌ {error}</strong>
        </div>
      )}
      
      <button 
        className="shimmer-btn" 
        type="submit" 
        disabled={loading}
        style={{width: '100%', padding: '0.8rem', fontSize: '1.1rem', marginBottom: '1rem'}}
      >
        📲 Continue to Verification
      </button>
    </form>
  );
};

export default RegisterForm;
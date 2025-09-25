// src/pages/SignupPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import './Auth.css';

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    dob: '', // Naya field: Date of Birth
    gender: '', // Naya field: Gender
    termsAccepted: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, role, dob, gender, termsAccepted } = formData;

    // --- Updated Advanced Validation ---
    if (!name || !email || !password || !confirmPassword || !role || !dob || !gender) {
      setError("Please fill in all the required fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (!termsAccepted) {
      setError("You must accept the Terms of Service to continue.");
      return;
    }

    setError('');
    setLoading(true);

    // --- Simulating a real API call ---
    setTimeout(() => {
      console.log("Submitting registration data:", { name, email, role, dob, gender });
      localStorage.setItem('authToken', 'dummy-token');
      localStorage.setItem('userRole', role);
      navigate('/dashboard');
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="hero">
      <div className="container">
        <div className="d-flex justify-content-center align-items-center min-h-screen">
          <div className="card" style={{maxWidth: '500px', width: '100%'}}>
            <div className="text-center mb-4">
              <Logo size="md" />
            </div>
            <h2 className="text-center text-dark mb-2">Get Started with Smart Hire Portal</h2>
            <p className="text-center text-muted mb-4">Create your account to unlock amazing opportunities</p>

            {error && <div style={{background: '#fee', color: '#c53030', padding: '15px', borderRadius: '10px', marginBottom: '20px'}}>{error}</div>}

            <div className="row">
              <div className="col col-md-6">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-control" />
                </div>
              </div>
              <div className="col col-md-6">
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-control" />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col col-md-6">
                <div className="form-group">
                  <label className="form-label">Date of Birth</label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="form-control" />
                </div>
              </div>
              <div className="col col-md-6">
                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} required className="form-control">
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">I am a...</label>
              <select name="role" value={formData.role} onChange={handleChange} required className="form-control">
                <option value="" disabled>Select your role</option>
                <option value="jobSeeker">Job Seeker</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>

            <div className="row">
              <div className="col col-md-6">
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} required className="form-control" />
                </div>
              </div>
              <div className="col col-md-6">
                <div className="form-group">
                  <label className="form-label">Confirm Password</label>
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="form-control" />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="d-flex align-items-center">
                <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} style={{marginRight: '8px'}} />
                I agree to the <a href="/terms" className="text-primary">Terms of Service</a> and <a href="/privacy" className="text-primary">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading || !formData.termsAccepted}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <p className="text-center text-muted">
              Already have an account? <Link to="/login" className="text-primary">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;

import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const GuestHomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Professional Navbar */}
      <nav className="navbar">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <Logo size="md" />
            <div className="d-flex align-items-center">
              <Link to="/jobs" className="nav-link">Find Jobs</Link>
              <Link to="/recruiters" className="nav-link">For Recruiters</Link>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Gradient */}
      <section className="hero">
        <div className="container">
          <div className="hero-content animate-fadeInUp">
            <h1 className="hero-title">Find Your Dream Job or Perfect Candidate</h1>
            <p className="hero-subtitle lead">Connect with top companies and talented professionals worldwide</p>
            
            <div className="search-container mt-5">
              <div className="d-flex">
                <input type="text" placeholder="Job title, keywords, or company" className="search-input" />
                <input type="text" placeholder="City or remote" className="search-input" />
                <button className="btn btn-secondary">Search Jobs</button>
              </div>
            </div>
          </div>
        </div>
        <div className="curve-separator gradient-light"></div>
      </section>

      {/* Featured Jobs Section */}
      <section className="section section-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-3 text-dark">Featured Opportunities</h2>
            <p className="lead text-muted">Discover amazing career opportunities</p>
          </div>
          <div className="row">
            {[1, 2, 3].map(i => (
              <div key={i} className="col col-md-4 mb-4">
                <div className="card animate-fadeInUp">
                  <h3 className="text-dark mb-2">Senior Software Engineer</h3>
                  <p className="text-muted mb-2">Tech Innovations Inc.</p>
                  <p className="text-muted mb-3">San Francisco, CA</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-primary font-weight-bold">$120k - $150k</span>
                    <button className="btn btn-primary">Apply Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="curve-separator gradient-dark"></div>
      </section>

      {/* Top Companies Section */}
      <section className="section section-dark">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-3 text-light">Trusted by Industry Leaders</h2>
            <p className="lead text-light">Join thousands of professionals at top companies</p>
          </div>
          <div className="row">
            {['Google', 'Microsoft', 'Apple', 'Amazon'].map(company => (
              <div key={company} className="col col-md-3 mb-4">
                <div className="card glass text-center">
                  <div className="animate-float">
                    <div style={{width: '60px', height: '60px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '50%', margin: '0 auto 20px'}}></div>
                    <h4 className="text-dark">{company}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GuestHomePage;
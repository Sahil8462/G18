import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Iske liye bhi hum alag CSS banayenge

function HomePage() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Dream Job Today</h1>
          <p className="hero-subtitle">
            The #1 platform for connecting talented professionals with top companies.
          </p>
          <div className="hero-search-bar">
            <input type="text" placeholder="Job title, keywords, or company" />
            <input type="text" placeholder="City or remote" />
            <button className="search-btn">Find Jobs</button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Smart Hire?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>AI-Powered Matching</h3>
            <p>Our smart algorithm connects you with the most relevant opportunities.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Easy Apply</h3>
            <p>Apply to jobs with a single click and track your application status.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Career Growth</h3>
            <p>Access resources and insights to advance your professional journey.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Take the Next Step?</h2>
          <p>Join thousands of professionals and start your journey with us today.</p>
          <Link to="/signup" className="cta-btn">Create Your Free Account</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Smart Hire Portal. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;


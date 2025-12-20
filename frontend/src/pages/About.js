import React from 'react';
import Header from '../components/Header';

const About = () => {
  return (
    <div>
      <Header />
      <div style={{ padding: '2rem 0' }}>
        <div className="container">
          {/* Hero Section */}
          <section style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 className="section">
              🚀 About Smart Hire 2025
            </h1>
            <p style={{
              fontSize: '1.3rem',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              🤖 AI-powered job portal connecting future talent with innovative companies worldwide
            </p>
          </section>

          {/* Mission Section */}
          <section style={{ marginBottom: '4rem' }}>
            <div className="grid grid-cols-2" style={{ alignItems: 'center' }}>
              <div>
                <h2 style={{
                  fontSize: '2.2rem',
                  fontWeight: '800',
                  marginBottom: '1.5rem',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  🎯 Our Mission
                </h2>
                <p style={{
                  fontSize: '1.15rem',
                  lineHeight: '1.7',
                  color: '#4b5563'
                }}>
                  We revolutionize job searching with AI-powered matching, real-time insights, and global opportunities. 
                  Our platform bridges talent gaps using machine learning, blockchain verification, and immersive technologies 
                  to create the future of work.
                </p>
              </div>
              <div className="card" style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem'
              }}>
                🤖🌐💼
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section style={{ marginBottom: '4rem' }}>
            <h2 className="section">
              ⚡ Platform Features
            </h2>
            
            <div className="grid grid-cols-3">
              <div className="card">
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  color: 'white',
                  fontSize: '1.5rem'
                }}>
                  🤖
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  marginBottom: '1rem'
                }}>
                  AI Job Matching
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  Advanced machine learning algorithms analyze skills, experience, and preferences to find perfect job matches instantly.
                </p>
              </div>

              <div className="card">
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  color: 'white',
                  fontSize: '1.5rem'
                }}>
                  🔐
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  marginBottom: '1rem'
                }}>
                  Blockchain Security
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  Secure credential verification and smart contracts ensure authentic profiles and transparent hiring processes.
                </p>
              </div>

              <div className="card">
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  color: 'white',
                  fontSize: '1.5rem'
                }}>
                  🌐
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  marginBottom: '1rem'
                }}>
                  Global Opportunities
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  Access remote, hybrid, and on-site positions from companies worldwide with real-time collaboration tools.
                </p>
              </div>

              <div className="card">
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #ec4899, #db2777)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  color: 'white',
                  fontSize: '1.5rem'
                }}>
                  📊
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  marginBottom: '1rem'
                }}>
                  Salary Intelligence
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  Real-time market data, salary predictions, and compensation insights powered by big data analytics.
                </p>
              </div>

              <div className="card">
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  color: 'white',
                  fontSize: '1.5rem'
                }}>
                  💬
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  marginBottom: '1rem'
                }}>
                  Live Chat Support
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  24/7 AI-powered assistance with human support for complex queries and career guidance.
                </p>
              </div>

              <div className="card">
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  color: 'white',
                  fontSize: '1.5rem'
                }}>
                  📱
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  marginBottom: '1rem'
                }}>
                  Mobile Experience
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  Seamless mobile app with AR job previews, voice search, and instant notifications.
                </p>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section style={{
            background: 'rgba(255,255,255,0.95)',
            padding: '3rem',
            borderRadius: '20px',
            marginBottom: '4rem'
          }}>
            <h2 className="section">
              📈 Platform Impact
            </h2>
            
            <div className="grid grid-cols-3" style={{ textAlign: 'center' }}>
              <div>
                <h3 style={{
                  fontSize: '3.5rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.5rem'
                }}>
                  25,000+
                </h3>
                <p style={{ fontSize: '1.2rem', color: '#475569', fontWeight: '600' }}>
                  🚀 AI-Matched Jobs
                </p>
              </div>
              
              <div>
                <h3 style={{
                  fontSize: '3.5rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.5rem'
                }}>
                  100,000+
                </h3>
                <p style={{ fontSize: '1.2rem', color: '#475569', fontWeight: '600' }}>
                  🌟 Future Professionals
                </p>
              </div>
              
              <div>
                <h3 style={{
                  fontSize: '3.5rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #ec4899, #f59e0b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.5rem'
                }}>
                  2,500+
                </h3>
                <p style={{ fontSize: '1.2rem', color: '#475569', fontWeight: '600' }}>
                  🏢 Innovation Companies
                </p>
              </div>
            </div>
          </section>

          {/* Technology Stack */}
          <section style={{ marginBottom: '4rem' }}>
            <h2 className="section">
              🛠️ Technology Stack
            </h2>
            
            <div className="grid grid-cols-2">
              <div className="card">
                <h3 style={{ marginBottom: '1rem', color: '#6366f1' }}>🎨 Frontend Technologies</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span className="tech-badge">⚛️ React 18</span>
                  <span className="tech-badge">🎯 TypeScript</span>
                  <span className="tech-badge">🎨 Tailwind CSS</span>
                  <span className="tech-badge">📱 PWA</span>
                  <span className="tech-badge">🥽 AR/VR Integration</span>
                </div>
              </div>
              
              <div className="card">
                <h3 style={{ marginBottom: '1rem', color: '#10b981' }}>⚙️ Backend Technologies</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span className="tech-badge">☕ Spring Boot</span>
                  <span className="tech-badge">🤖 AI/ML APIs</span>
                  <span className="tech-badge">⛓️ Blockchain</span>
                  <span className="tech-badge">☁️ Cloud Native</span>
                  <span className="tech-badge">🔐 OAuth 2.0</span>
                </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section>
            <h2 className="section">
              👥 Leadership Team
            </h2>
            
            <div className="grid grid-cols-3">
              {[
                { name: 'Sarah Chen', role: 'CEO & AI Strategist', image: 'SC', bg: '#6366f1' },
                { name: 'Michael Rodriguez', role: 'CTO & Blockchain Lead', image: 'MR', bg: '#10b981' },
                { name: 'Emily Watson', role: 'Head of Global Operations', image: 'EW', bg: '#ec4899' }
              ].map((member, index) => (
                <div key={index} className="card" style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: member.bg,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                  }}>
                    {member.image}
                  </div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem'
                  }}>
                    {member.name}
                  </h3>
                  <p style={{ color: '#6b7280', fontWeight: '500' }}>
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
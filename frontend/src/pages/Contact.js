import React, { useState } from 'react';
import Header from '../components/Header';
import LiveChat from '../components/LiveChat';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div>
      <Header />
      <div style={{ padding: '2rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="section">
            📞 Get In Touch with Future
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            🤖 AI-powered support • 🌐 Global assistance • ⚡ Instant responses
          </p>
        </div>

        {/* Support Features */}
        <div className="card" style={{ marginBottom: '3rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))' }}>
          <h3 style={{ marginBottom: '1rem', color: '#6366f1' }}>🚀 24/7 Support Features</h3>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div>💬 Live AI Chat</div>
            <div>📧 Email Support</div>
            <div>📱 Mobile App Help</div>
            <div>🎥 Video Tutorials</div>
            <div>📚 Knowledge Base</div>
            <div>🔧 Technical Support</div>
          </div>
        </div>

        <div className="grid grid-cols-2" style={{ gap: '3rem' }}>
          {/* Contact Form */}
          <div className="card">
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Send us a Message
            </h2>

            {submitted ? (
              <div style={{
                background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
                color: '#166534',
                padding: '1.5rem',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <h3 style={{ marginBottom: '0.5rem' }}>Thank you!</h3>
                <p>Your message has been sent successfully. We'll get back to you soon!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Name *
                  </label>
                  <input
                    className="search-input"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid rgba(99, 102, 241, 0.2)',
                      borderRadius: '12px',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Email *
                  </label>
                  <input
                    className="search-input"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid rgba(99, 102, 241, 0.2)',
                      borderRadius: '12px',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Subject *
                  </label>
                  <input
                    className="search-input"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid rgba(99, 102, 241, 0.2)',
                      borderRadius: '12px',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid rgba(99, 102, 241, 0.2)',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div>
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Contact Information
              </h3>
              
              <div style={{ marginBottom: '1rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{
                    fontSize: '1.5rem',
                    marginRight: '0.75rem'
                  }}>
                    📧
                  </span>
                  <div>
                    <strong>Support Email</strong>
                    <p style={{ margin: 0, color: '#6b7280' }}>support@smarthireportal.com</p>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{
                    fontSize: '1.5rem',
                    marginRight: '0.75rem'
                  }}>
                    📱
                  </span>
                  <div>
                    <strong>Support Helpline</strong>
                    <p style={{ margin: 0, color: '#6b7280' }}>+91 98765 43210</p>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{
                    fontSize: '1.5rem',
                    marginRight: '0.75rem'
                  }}>
                    🏢
                  </span>
                  <div>
                    <strong>Office Address</strong>
                    <p style={{ margin: 0, color: '#6b7280' }}>
                      Smart Hire Portal Office<br />
                      Business District, Mumbai 400001<br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Support Team
              </h3>
              
              <div style={{ marginBottom: '1rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{
                    fontSize: '1.5rem',
                    marginRight: '0.75rem'
                  }}>
                    👨‍💼
                  </span>
                  <div>
                    <strong>Sahil Kumar - Technical Lead</strong>
                    <p style={{ margin: 0, color: '#6b7280' }}>+91 6202572251 | sahil@smarthireportal.com</p>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{
                    fontSize: '1.5rem',
                    marginRight: '0.75rem'
                  }}>
                    👩‍💼
                  </span>
                  <div>
                    <strong>Akash - Support Manager</strong>
                    <p style={{ margin: 0, color: '#6b7280' }}>+91 6299633768 | akash@smarthireportal.com</p>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{
                    fontSize: '1.5rem',
                    marginRight: '0.75rem'
                  }}>
                    👨‍💻
                  </span>
                  <div>
                    <strong>Sumit - Developer</strong>
                    <p style={{ margin: 0, color: '#6b7280' }}>+91 8789705884 | sumit@smarthireportal.com</p>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{
                    fontSize: '1.5rem',
                    marginRight: '0.75rem'
                  }}>
                    👩‍💻
                  </span>
                  <div>
                    <strong>Ayushman Raj - Project Manager</strong>
                    <p style={{ margin: 0, color: '#6b7280' }}>+91 8987818616 | ayushman@smarthireportal.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Support Hours
              </h3>
              
              <div style={{ color: '#6b7280' }}>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong>Online Support:</strong> 24/7 Available
                </p>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong>Phone Support:</strong> 9:00 AM - 9:00 PM IST
                </p>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong>Email Support:</strong> 24/7 Response
                </p>
                <p style={{ marginBottom: 0 }}>
                  <strong>Emergency:</strong> Call +91 98765 43210
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{ marginTop: '4rem' }}>
          <h2 className="section">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-2">
            <div className="card">
              <h4 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: '#0f172a'
              }}>
                How do I post a job?
              </h4>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Create an account, verify company details, and use our AI-powered job posting form to reach 100,000+ qualified candidates instantly.
              </p>
            </div>

            <div className="card">
              <h4 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: '#0f172a'
              }}>
                Is Smart Hire free to use?
              </h4>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Job seekers enjoy completely free access to AI matching, salary insights, and career guidance. Employers get basic features free with premium AI tools available.
              </p>
            </div>

            <div className="card">
              <h4 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: '#0f172a'
              }}>
                How do I update my profile?
              </h4>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Access your profile dashboard to update skills, experience, and preferences. Our AI will automatically optimize your visibility to relevant employers.
              </p>
            </div>

            <div className="card">
              <h4 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: '#0f172a'
              }}>
                Need technical support?
              </h4>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Our 24/7 AI-powered support system and live chat provide instant assistance. For complex issues, reach our tech team at tech@smarthire.com.
              </p>
            </div>
          </div>
        </div>
      </div>
      <LiveChat />
    </div>
    </div>
  );
};

export default Contact;
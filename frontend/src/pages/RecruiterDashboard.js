import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('post-job');

  const sidebarItems = [
    { label: 'Post New Job', path: '#post-job', icon: '➕' },
    { label: 'My Job Postings', path: '#job-postings', icon: '📋' },
    { label: 'Applicant List', path: '#applicants', icon: '👥' },
    { label: 'Shortlisted Candidates', path: '#shortlisted', icon: '⭐' },
    { label: 'Analytics', path: '#analytics', icon: '📈' },
    { label: 'Help & Support', path: '#help', icon: '❓' }
  ];

  const renderSection = () => {
    switch(activeSection) {
      case 'post-job':
        return (
          <div className="glass" style={{ padding: '32px' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '24px' }}>➕ Post New Job</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>Job Title</label>
                <input className="form-input" placeholder="e.g. Senior React Developer" />
              </div>
              <div>
                <label style={{ color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>Company</label>
                <input className="form-input" placeholder="Your company name" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>Location</label>
                  <input className="form-input" placeholder="Mumbai, Delhi, Remote" />
                </div>
                <div>
                  <label style={{ color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>Salary Range</label>
                  <input className="form-input" placeholder="₹8-12 LPA" />
                </div>
              </div>
              <div>
                <label style={{ color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>Job Description</label>
                <textarea 
                  className="form-input" 
                  rows="4" 
                  placeholder="Describe the role, requirements, and responsibilities..."
                />
              </div>
              <div>
                <label style={{ color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>Required Skills</label>
                <input className="form-input" placeholder="React, Node.js, JavaScript, MongoDB" />
              </div>
              <button className="btn shimmer-btn">Post Job</button>
            </div>
          </div>
        );

      case 'job-postings':
        return (
          <div className="glass" style={{ padding: '32px' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '24px' }}>📋 My Job Postings</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              {[
                { title: 'Senior React Developer', applications: 15, posted: '2024-01-10', status: 'Active' },
                { title: 'UI/UX Designer', applications: 8, posted: '2024-01-08', status: 'Active' },
                { title: 'Full Stack Developer', applications: 12, posted: '2024-01-05', status: 'Closed' }
              ].map((job, index) => (
                <div key={index} className="job-card tilt-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ color: 'var(--text-main)', marginBottom: '8px' }}>{job.title}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.7)' }}>
                        {job.applications} applications • Posted {job.posted}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: job.status === 'Active' ? '#10b981' : '#6b7280',
                        color: 'white'
                      }}>
                        {job.status}
                      </span>
                      <button className="btn shimmer-btn">Manage</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'applicants':
        return (
          <div className="glass" style={{ padding: '32px' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '24px' }}>👥 ATS - Applicant Tracking</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              {[
                { name: 'John Doe', position: 'Senior React Developer', experience: '5 years', match: '95%', applied: '2024-01-15' },
                { name: 'Sarah Smith', position: 'UI/UX Designer', experience: '3 years', match: '88%', applied: '2024-01-14' },
                { name: 'Mike Johnson', position: 'Full Stack Developer', experience: '4 years', match: '92%', applied: '2024-01-13' }
              ].map((applicant, index) => (
                <div key={index} className="job-card tilt-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: '#121212',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-main)',
                        fontWeight: '700'
                      }}>
                        {applicant.name.charAt(0)}
                      </div>
                      <div>
                        <h4 style={{ color: 'var(--text-main)', marginBottom: '4px' }}>{applicant.name}</h4>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                          {applicant.position} • {applicant.experience}
                        </p>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>
                          Applied {applicant.applied}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span style={{
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}>
                        {applicant.match} Match
                      </span>
                      <button className="btn shimmer-btn">View Profile</button>
                      <button className="btn" style={{ background: '#10b981', color: 'var(--text-main)' }}>
                        Shortlist
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'shortlisted':
        return (
          <div className="glass" style={{ padding: '32px' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '24px' }}>⭐ Shortlisted Candidates</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              {[
                { name: 'John Doe', position: 'Senior React Developer', status: 'Interview Scheduled', date: 'Tomorrow, 2:00 PM' },
                { name: 'Sarah Smith', position: 'UI/UX Designer', status: 'Pending Interview', date: 'TBD' }
              ].map((candidate, index) => (
                <div key={index} className="job-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: '#121212',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-main)',
                        fontWeight: '700'
                      }}>
                        {candidate.name.charAt(0)}
                      </div>
                      <div>
                        <h4 style={{ color: 'var(--text-main)', marginBottom: '4px' }}>{candidate.name}</h4>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                          {candidate.position}
                        </p>
                        <p style={{ color: '#10b981', fontSize: '12px', fontWeight: '600' }}>
                          {candidate.date}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn shimmer-btn">Schedule Interview</button>
                      <button className="btn" style={{ background: 'rgba(239,68,68,0.2)', color: '#fca5a5' }}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="glass" style={{ padding: '32px' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '24px' }}>📈 Hiring Analytics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '32px' }}>
              <div className="stat-card">
                <div className="stat-value">85%</div>
                <div style={{ color: 'rgba(255,255,255,0.8)' }}>Success Rate</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">12</div>
                <div style={{ color: 'rgba(255,255,255,0.8)' }}>Days Avg. Hire Time</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">92%</div>
                <div style={{ color: 'rgba(255,255,255,0.8)' }}>Quality Score</div>
              </div>
            </div>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div className="job-card">
                <h4 style={{ color: 'var(--text-main)', marginBottom: '12px' }}>📊 Monthly Hiring Trends</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Your hiring performance has improved by 23% this month
                </p>
              </div>
              <div className="job-card">
                <h4 style={{ color: 'var(--text-main)', marginBottom: '12px' }}>🎯 Top Performing Jobs</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Senior React Developer position received the most qualified applications
                </p>
              </div>
            </div>
          </div>
        );

      case 'help':
        return (
          <div className="glass" style={{ padding: '32px' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '24px' }}>❓ Help & Support</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div className="job-card">
                <h4 style={{ color: 'var(--text-main)', marginBottom: '12px' }}>📞 Contact Support</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
                  Get help with job posting and candidate management
                </p>
                <button className="btn shimmer-btn">Contact Us</button>
              </div>
              <div className="job-card">
                <h4 style={{ color: 'var(--text-main)', marginBottom: '12px' }}>📚 Recruiter Guide</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
                  Learn best practices for effective hiring
                </p>
                <button className="btn shimmer-btn">View Guide</button>
              </div>
              <div className="job-card">
                <h4 style={{ color: 'var(--text-main)', marginBottom: '12px' }}>⚙️ Account Settings</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
                  Manage your recruiter profile and preferences
                </p>
                <button className="btn shimmer-btn">Settings</button>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="glass" style={{ padding: '32px' }}><h3 style={{ color: 'var(--text-main)' }}>Select a section</h3></div>;
    }
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', fontWeight: '700' }}>💼 Recruiter</h2>
        </div>
        
        <nav>
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveSection(item.path.replace('#', ''))}
              className={`sidebar-item ${activeSection === item.path.replace('#', '') ? 'active' : ''}`}
            >
              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      <div className="main-content">
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ 
            color: 'var(--text-main)', 
            fontSize: '2.5rem', 
            fontWeight: '800',
            background: 'linear-gradient(135deg, #ffffff, #e0e7ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Welcome back, {user?.name}! 💼
          </h1>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">5</div>
            <div style={{ color: 'rgba(255,255,255,0.8)' }}>Active Job Posts</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">48</div>
            <div style={{ color: 'rgba(255,255,255,0.8)' }}>Total Applications</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">12</div>
            <div style={{ color: 'rgba(255,255,255,0.8)' }}>Shortlisted</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">3</div>
            <div style={{ color: 'rgba(255,255,255,0.8)' }}>Interviews Today</div>
          </div>
        </div>

        {renderSection()}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
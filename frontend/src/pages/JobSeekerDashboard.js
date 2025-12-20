import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';

const JobSeekerDashboard = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');

  const sidebarItems = [
    { label: 'Profile/Resume', path: '#profile', icon: '👤' },
    { label: 'Applied Jobs', path: '#applied', icon: '📋' },
    { label: 'Recommended Jobs', path: '#recommended', icon: '⭐' },
    { label: 'Saved Jobs', path: '#saved', icon: '💾' },
    { label: 'Interview Schedule', path: '#interviews', icon: '📅' },
    { label: 'Help & Support', path: '#help', icon: '❓' }
  ];

  const renderSection = () => {
    switch(activeSection) {
      case 'profile':
        return (
          <div className="glass" style={{ padding: '32px' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '24px' }}>👤 Profile & Resume</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>Full Name</label>
                <input className="form-input" value={user?.name || ''} readOnly />
              </div>
              <div>
                <label style={{ color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>Skills</label>
                <input className="form-input" placeholder="React, Node.js, JavaScript..." />
              </div>
              <div>
                <label style={{ color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>Experience</label>
                <select className="form-input">
                  <option>0-1 years</option>
                  <option>1-3 years</option>
                  <option>3-5 years</option>
                  <option>5+ years</option>
                </select>
              </div>
              <button className="btn shimmer-btn">Update Profile</button>
            </div>
          </div>
        );
      
      case 'applied':
        return (
          <div className="glass" style={{ padding: '32px' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '24px' }}>📋 Applied Jobs</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              {[
                { title: 'Frontend Developer', company: 'TechCorp', status: 'Under Review', date: '2024-01-15' },
                { title: 'React Developer', company: 'StartupXYZ', status: 'Interview Scheduled', date: '2024-01-12' },
                { title: 'Full Stack Developer', company: 'InnovateLabs', status: 'Applied', date: '2024-01-10' }
              ].map((job, index) => (
                <div key={index} className="job-card tilt-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ color: 'var(--text-main)', marginBottom: '8px' }}>{job.title}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.7)' }}>{job.company} • Applied {job.date}</p>
                    </div>
                    <span style={{
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      background: job.status === 'Interview Scheduled' ? '#10b981' : 
                                 job.status === 'Under Review' ? '#f59e0b' : '#3b82f6'
                    }}>
                      {job.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'recommended':
        return (
          <div className="glass" style={{ padding: '32px' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '24px' }}>⭐ AI-Recommended Jobs</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              {[
                { title: 'Senior React Developer', company: 'TechCorp', match: '95%', salary: '₹12-18 LPA' },
                { title: 'Full Stack Engineer', company: 'InnovateLabs', match: '88%', salary: '₹8-12 LPA' },
                { title: 'Frontend Architect', company: 'DesignStudio', match: '82%', salary: '₹15-20 LPA' }
              ].map((job, index) => (
                <div key={index} className="job-card tilt-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ color: 'var(--text-main)', marginBottom: '8px' }}>{job.title}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
                        {job.company} • {job.salary}
                      </p>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="btn shimmer-btn">Apply Now</button>
                        <button className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--text-main)' }}>
                          Save Job
                        </button>
                      </div>
                    </div>
                    <span style={{
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '700'
                    }}>
                      {job.match} Match
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'saved':
        return (
          <div className="glass" style={{ padding: '32px' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '24px' }}>💾 Saved Jobs</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              {[
                { title: 'UI/UX Designer', company: 'CreativeAgency', saved: '3 days ago' },
                { title: 'Product Manager', company: 'StartupHub', saved: '1 week ago' }
              ].map((job, index) => (
                <div key={index} className="job-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ color: 'var(--text-main)', marginBottom: '8px' }}>{job.title}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.7)' }}>{job.company} • Saved {job.saved}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn shimmer-btn">Apply</button>
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

      case 'interviews':
        return (
          <div className="glass" style={{ padding: '32px' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '24px' }}>📅 Interview Schedule</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              {[
                { title: 'Frontend Developer', company: 'TechCorp', date: 'Tomorrow, 2:00 PM', type: 'Video Call' },
                { title: 'React Developer', company: 'StartupXYZ', date: 'Dec 20, 10:00 AM', type: 'In-person' }
              ].map((interview, index) => (
                <div key={index} className="job-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ color: 'var(--text-main)', marginBottom: '8px' }}>{interview.title}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '4px' }}>
                        {interview.company} • {interview.type}
                      </p>
                      <p style={{ color: '#10b981', fontWeight: '600' }}>{interview.date}</p>
                    </div>
                    <button className="btn shimmer-btn">
                      {interview.type === 'Video Call' ? 'Join Meeting' : 'Get Directions'}
                    </button>
                  </div>
                </div>
              ))}
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
                  Get help with your job search and account
                </p>
                <button className="btn shimmer-btn">Contact Us</button>
              </div>
              <div className="job-card">
                <h4 style={{ color: 'var(--text-main)', marginBottom: '12px' }}>📚 FAQ</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
                  Find answers to common questions
                </p>
                <button className="btn shimmer-btn">View FAQ</button>
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
          <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', fontWeight: '700' }}>🎯 Job Seeker</h2>
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
            Welcome back, {user?.name}! 🚀
          </h1>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">12</div>
            <div style={{ color: 'rgba(255,255,255,0.8)' }}>Applications Sent</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">3</div>
            <div style={{ color: 'rgba(255,255,255,0.8)' }}>Interview Calls</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">8</div>
            <div style={{ color: 'rgba(255,255,255,0.8)' }}>Profile Views</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">25</div>
            <div style={{ color: 'rgba(255,255,255,0.8)' }}>Saved Jobs</div>
          </div>
        </div>

        {renderSection()}
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
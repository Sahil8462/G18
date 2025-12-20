import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfessionalJobSeekerDashboard = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'profile', label: 'Profile & Resume', icon: '👤' },
    { id: 'applied', label: 'Applied Jobs', icon: '📋' },
    { id: 'recommended', label: 'Recommended', icon: '⭐' },
    { id: 'interviews', label: 'Interviews', icon: '📅' }
  ];

  const stats = [
    { label: 'Applications Sent', value: '12', color: 'text-blue-400' },
    { label: 'Interview Calls', value: '3', color: 'text-green-400' },
    { label: 'Profile Views', value: '48', color: 'text-purple-400' },
    { label: 'Saved Jobs', value: '25', color: 'text-orange-400' }
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className={`stat-value ${stat.color}`}>{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-300">Applied to Frontend Developer</span>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-300">Interview scheduled with TechCorp</span>
                    <span className="text-xs text-gray-500">1 day ago</span>
                  </div>
                </div>
              </div>
              
              <div className="glass p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="btn shimmer-btn w-full" onClick={() => setActiveSection('profile')}>Update Resume</button>
                  <button className="btn btn-secondary w-full" onClick={() => setActiveSection('recommended')}>Browse Jobs</button>
                  <button className="btn btn-secondary w-full" onClick={() => setActiveSection('overview')}>View Analytics</button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'profile':
        return (
          <div className="glass p-6">
            <h3 className="text-2xl font-semibold text-white mb-6">Profile & Resume</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Full Name</label>
                <input className="form-input" value={user?.name || ''} readOnly />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Email</label>
                <input className="form-input" value={user?.email || ''} readOnly />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Skills</label>
                <input className="form-input" placeholder="React, Node.js, JavaScript..." />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Experience</label>
                <select className="form-input">
                  <option>0-1 years</option>
                  <option>1-3 years</option>
                  <option>3-5 years</option>
                  <option>5+ years</option>
                </select>
              </div>
            </div>
            <button className="btn shimmer-btn mt-6" onClick={() => alert('Profile updated successfully!')}>Save Changes</button>
          </div>
        );
      
      case 'applied':
        return (
          <div className="glass p-6">
            <h3 className="text-2xl font-semibold text-white mb-6">Applied Jobs</h3>
            <div className="space-y-4">
              {[
                { title: 'Frontend Developer', company: 'TechCorp', status: 'Under Review', date: '2024-01-15' },
                { title: 'React Developer', company: 'StartupXYZ', status: 'Interview Scheduled', date: '2024-01-12' }
              ].map((job, index) => (
                <div key={index} className="job-card">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-white font-semibold">{job.title}</h4>
                      <p className="text-gray-400">{job.company} • Applied {job.date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                        {job.status}
                      </span>
                      <button className="btn shimmer-btn text-sm px-3 py-1" onClick={() => alert(`Viewing details for ${job.title}`)}>View</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="glass p-6 text-center">
            <h3 className="text-xl text-white">Coming Soon</h3>
            <p className="text-gray-400 mt-2">This section is under development</p>
            <Link to="/settings" className="btn shimmer-btn mt-4">Go to Settings</Link>
          </div>
        );
    }
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white">🎯 Job Seeker</h2>
          <p className="text-gray-400 text-sm">Welcome back, {user?.name}</p>
        </div>
        
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      <div className="main-content">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {user?.name}! 🚀
          </h1>
          <p className="text-gray-400 mt-2">Here's what's happening with your job search</p>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default ProfessionalJobSeekerDashboard;
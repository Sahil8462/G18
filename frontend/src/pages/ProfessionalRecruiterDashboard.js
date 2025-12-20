import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfessionalRecruiterDashboard = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('analytics');

  const sidebarItems = [
    { id: 'analytics', label: 'Hiring Analytics', icon: '📈' },
    { id: 'jobs', label: 'Job Manager', icon: '💼' },
    { id: 'ats', label: 'ATS System', icon: '👥' },
    { id: 'shortlist', label: 'Shortlisted', icon: '⭐' },
    { id: 'post', label: 'Post New Job', icon: '➕' }
  ];

  const stats = [
    { label: 'Active Jobs', value: '8', color: 'text-blue-400' },
    { label: 'Applications', value: '156', color: 'text-green-400' },
    { label: 'Shortlisted', value: '24', color: 'text-purple-400' },
    { label: 'Hired This Month', value: '5', color: 'text-orange-400' }
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'analytics':
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
                <h3 className="text-xl font-semibold text-white mb-4">Hiring Trends</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Success Rate</span>
                    <span className="text-green-400 font-semibold">92%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Avg. Hire Time</span>
                    <span className="text-blue-400 font-semibold">12 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Quality Score</span>
                    <span className="text-purple-400 font-semibold">4.8/5</span>
                  </div>
                </div>
              </div>
              
              <div className="glass p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="btn shimmer-btn w-full" onClick={() => setActiveSection('post')}>Post New Job</button>
                  <button className="btn btn-secondary w-full" onClick={() => setActiveSection('ats')}>Review Applications</button>
                  <button className="btn btn-secondary w-full" onClick={() => setActiveSection('shortlist')}>Schedule Interviews</button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'jobs':
        return (
          <div className="glass p-6">
            <h3 className="text-2xl font-semibold text-white mb-6">Job Manager</h3>
            <div className="space-y-4">
              {[
                { title: 'Senior React Developer', applications: 45, status: 'Active', posted: '2024-01-10' },
                { title: 'UI/UX Designer', applications: 32, status: 'Active', posted: '2024-01-08' },
                { title: 'Full Stack Developer', applications: 28, status: 'Closed', posted: '2024-01-05' }
              ].map((job, index) => (
                <div key={index} className="job-card">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-white font-semibold">{job.title}</h4>
                      <p className="text-gray-400">{job.applications} applications • Posted {job.posted}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        job.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {job.status}
                      </span>
                      <button className="btn shimmer-btn text-sm" onClick={() => alert(`Managing ${job.title}`)}>Manage</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'ats':
        return (
          <div className="glass p-6">
            <h3 className="text-2xl font-semibold text-white mb-6">ATS - Applicant Tracking</h3>
            <div className="space-y-4">
              {[
                { name: 'John Doe', position: 'Senior React Developer', match: '95%', applied: '2024-01-15' },
                { name: 'Sarah Smith', position: 'UI/UX Designer', match: '88%', applied: '2024-01-14' }
              ].map((applicant, index) => (
                <div key={index} className="job-card">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {applicant.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{applicant.name}</h4>
                        <p className="text-gray-400">{applicant.position} • Applied {applicant.applied}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                        {applicant.match} Match
                      </span>
                      <button className="btn shimmer-btn text-sm" onClick={() => alert(`Reviewing ${applicant.name}'s application`)}>Review</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'post':
        return (
          <div className="glass p-6">
            <h3 className="text-2xl font-semibold text-white mb-6">Post New Job</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Job Title</label>
                <input className="form-input" placeholder="e.g. Senior React Developer" />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Department</label>
                <select className="form-input">
                  <option>Engineering</option>
                  <option>Design</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                </select>
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Location</label>
                <input className="form-input" placeholder="Remote, New York, etc." />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Salary Range</label>
                <input className="form-input" placeholder="$80k - $120k" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-white font-medium mb-2">Job Description</label>
                <textarea className="form-input h-32" placeholder="Describe the role, requirements, and responsibilities..."></textarea>
              </div>
            </div>
            <button className="btn shimmer-btn mt-6" onClick={() => alert('Job posted successfully!')}>Post Job</button>
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
          <h2 className="text-xl font-bold text-white">💼 Recruiter</h2>
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
            Welcome back, {user?.name}! 💼
          </h1>
          <p className="text-gray-400 mt-2">Manage your hiring process efficiently</p>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default ProfessionalRecruiterDashboard;
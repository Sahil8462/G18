import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const DashboardPage = () => {
  const [userRole, setUserRole] = useState('jobSeeker'); // Default role

  useEffect(() => {
    // Get user role from localStorage or API
    const role = localStorage.getItem('userRole') || 'jobSeeker';
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    window.location.href = '/login';
  };

  if (userRole === 'recruiter') {
    return <RecruiterDashboard onLogout={handleLogout} />;
  }

  return <JobSeekerDashboard onLogout={handleLogout} />;
};

const JobSeekerDashboard = ({ onLogout }) => {
  return (
    <div className="min-h-screen gradient-light">
      {/* Professional Navbar */}
      <nav className="navbar">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Logo size="sm" />
              <div className="d-flex" style={{marginLeft: '40px'}}>
                <Link to="/dashboard" className="nav-link">🏠 Home</Link>
                <Link to="/my-network" className="nav-link">👥 Network</Link>
                <Link to="/jobs" className="nav-link">💼 Jobs</Link>
                <Link to="/messages" className="nav-link">💬 Messages</Link>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div style={{width: '40px', height: '40px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '50%', marginRight: '10px'}}></div>
              <button onClick={onLogout} className="btn btn-outline">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Professional Dashboard Content */}
      <div className="section">
        <div className="container">
          <div className="row">
            {/* Left Column - Profile */}
            <div className="col col-md-4">
              <div className="card text-center">
                <div style={{width: '80px', height: '80px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '50%', margin: '0 auto 20px'}}></div>
                <h3 className="text-dark mb-2">John Doe</h3>
                <p className="text-muted mb-1">Software Developer</p>
                <p className="text-muted">San Francisco, CA</p>
              </div>
            </div>

            {/* Center Column - Feed */}
            <div className="col col-md-8">
              {/* Create Post */}
              <div className="card mb-4">
                <div className="d-flex align-items-center">
                  <div style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '50%', marginRight: '15px'}}></div>
                  <input type="text" placeholder="Share an update..." className="form-control" style={{borderRadius: '25px'}} />
                </div>
              </div>

              {/* Feed Posts */}
              {[1, 2, 3].map(i => (
                <div key={i} className="card mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <div style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #f093fb, #f5576c)', borderRadius: '50%', marginRight: '15px'}}></div>
                    <div>
                      <h5 className="text-dark mb-0">Professional Update</h5>
                      <p className="text-muted mb-0">2 hours ago</p>
                    </div>
                  </div>
                  <p className="text-dark mb-3">Exciting news about career opportunities and industry insights...</p>
                  <div className="d-flex">
                    <button className="btn btn-outline mr-2">👍 Like</button>
                    <button className="btn btn-outline mr-2">💬 Comment</button>
                    <button className="btn btn-outline">🔄 Share</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecruiterDashboard = ({ onLogout }) => {
  return (
    <div className="min-h-screen gradient-dark">
      {/* Professional Navbar */}
      <nav className="navbar">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Logo size="sm" />
              <div className="d-flex" style={{marginLeft: '40px'}}>
                <Link to="/dashboard" className="nav-link">🏠 Home</Link>
                <Link to="/candidates" className="nav-link">👥 Candidates</Link>
                <Link to="/jobs" className="nav-link">💼 Jobs</Link>
                <Link to="/analytics" className="nav-link">📊 Analytics</Link>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div style={{width: '40px', height: '40px', background: 'linear-gradient(135deg, #f093fb, #f5576c)', borderRadius: '50%', marginRight: '10px'}}></div>
              <button onClick={onLogout} className="btn btn-outline">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Professional Recruiter Content */}
      <div className="section">
        <div className="container">
          <div className="row">
            {/* Left Column - Company Profile */}
            <div className="col col-md-4">
              <div className="card glass text-center">
                <div style={{width: '80px', height: '80px', background: 'linear-gradient(135deg, #f093fb, #f5576c)', borderRadius: '20px', margin: '0 auto 20px'}}></div>
                <h3 className="text-light mb-2">Smart Hire Corp Inc.</h3>
                <p className="text-light mb-1">HR Manager</p>
                <p className="text-light">San Francisco, CA</p>
              </div>
            </div>

            {/* Right Column - Actions & Stats */}
            <div className="col col-md-8">
              {/* Quick Actions */}
              <div className="card glass mb-4">
                <h3 className="text-light mb-4">Quick Actions</h3>
                <div className="row">
                  <div className="col col-md-6">
                    <button className="btn btn-primary w-100 mb-3">
                      📝 Post New Job
                    </button>
                  </div>
                  <div className="col col-md-6">
                    <button className="btn btn-secondary w-100 mb-3">
                      📢 Share Update
                    </button>
                  </div>
                </div>
              </div>

              {/* Hiring Stats */}
              <div className="card glass">
                <h3 className="text-light mb-4">Hiring Dashboard</h3>
                <div className="row">
                  <div className="col col-md-4 text-center mb-3">
                    <div className="display-4 text-light">12</div>
                    <p className="text-light">Active Jobs</p>
                  </div>
                  <div className="col col-md-4 text-center mb-3">
                    <div className="display-4 text-light">156</div>
                    <p className="text-light">Applications</p>
                  </div>
                  <div className="col col-md-4 text-center mb-3">
                    <div className="display-4 text-light">23</div>
                    <p className="text-light">Interviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
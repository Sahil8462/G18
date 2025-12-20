import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

const SavedJobs = () => {
  const sidebarItems = [
    { label: 'Dashboard', path: '/jobseeker/dashboard' },
    { label: 'Job Search', path: '/jobs' },
    { label: 'Applied Jobs', path: '/jobseeker/applied' },
    { label: 'Saved Jobs', path: '/jobseeker/saved', active: true },
    { label: 'Profile', path: '/profile' },
    { label: 'Settings', path: '/settings' }
  ];

  const savedJobs = [
    { id: 1, title: 'Senior React Developer', company: 'TechCorp', location: 'Mumbai', salary: '₹8-12 LPA', savedDate: '2024-01-15' },
    { id: 2, title: 'Full Stack Developer', company: 'InnovateLabs', location: 'Bangalore', salary: '₹6-10 LPA', savedDate: '2024-01-12' },
    { id: 3, title: 'UI/UX Designer', company: 'DesignStudio', location: 'Pune', salary: '₹5-8 LPA', savedDate: '2024-01-10' }
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems} userType="jobseeker">
      <div>
        <h1>Saved Jobs ({savedJobs.length})</h1>
        
        <div className="card">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(var(--spacing) * 3)' }}>
            {savedJobs.map(job => (
              <div key={job.id} style={{
                border: '1px solid #E5E7EB',
                borderRadius: 'calc(var(--border-radius) * 2)',
                padding: 'calc(var(--spacing) * 3)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ marginBottom: 'calc(var(--spacing))' }}>{job.title}</h4>
                  <p style={{ color: 'var(--text-grey)', marginBottom: 'calc(var(--spacing))' }}>
                    {job.company} • {job.location}
                  </p>
                  <div style={{ display: 'flex', gap: 'calc(var(--spacing) * 2)' }}>
                    <span style={{ 
                      fontSize: '12px', 
                      color: 'var(--primary-blue)',
                      fontWeight: '500'
                    }}>
                      {job.salary}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-grey)' }}>
                      Saved on {job.savedDate}
                    </span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: 'calc(var(--spacing) * 2)' }}>
                  <button className="btn btn-secondary">View Details</button>
                  <button className="btn btn-primary">Apply Now</button>
                  <button 
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-grey)',
                      cursor: 'pointer',
                      padding: 'calc(var(--spacing))',
                      fontSize: '16px'
                    }}
                    title="Remove from saved"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          {savedJobs.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: 'calc(var(--spacing) * 6)',
              color: 'var(--text-grey)'
            }}>
              <h3>No saved jobs yet</h3>
              <p>Start browsing jobs and save the ones you're interested in!</p>
              <button className="btn btn-primary" style={{ marginTop: 'calc(var(--spacing) * 2)' }}>
                Browse Jobs
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SavedJobs;
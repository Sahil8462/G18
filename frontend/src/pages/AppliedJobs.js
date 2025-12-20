import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const AppliedJobs = () => {
  const [filter, setFilter] = useState('all');
  
  const sidebarItems = [
    { label: 'Dashboard', path: '/jobseeker/dashboard' },
    { label: 'Job Search', path: '/jobs' },
    { label: 'Applied Jobs', path: '/jobseeker/applied', active: true },
    { label: 'Saved Jobs', path: '/jobseeker/saved' },
    { label: 'Profile', path: '/profile' },
    { label: 'Settings', path: '/settings' }
  ];

  const applications = [
    { id: 1, title: 'Senior React Developer', company: 'TechCorp', appliedDate: '2024-01-15', status: 'Under Review' },
    { id: 2, title: 'Frontend Developer', company: 'StartupXYZ', appliedDate: '2024-01-12', status: 'Interview Scheduled' },
    { id: 3, title: 'Full Stack Developer', company: 'InnovateLabs', appliedDate: '2024-01-10', status: 'Shortlisted' },
    { id: 4, title: 'UI/UX Designer', company: 'DesignStudio', appliedDate: '2024-01-08', status: 'Rejected' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Under Review': return { bg: '#FEF3C7', color: '#92400E' };
      case 'Interview Scheduled': return { bg: '#D1FAE5', color: '#065F46' };
      case 'Shortlisted': return { bg: '#DBEAFE', color: '#1E40AF' };
      case 'Rejected': return { bg: '#FEE2E2', color: '#991B1B' };
      default: return { bg: '#F3F4F6', color: '#374151' };
    }
  };

  const filteredApplications = filter === 'all' ? applications : applications.filter(app => app.status.toLowerCase().includes(filter));

  return (
    <DashboardLayout sidebarItems={sidebarItems} userType="jobseeker">
      <div>
        <h1>Applied Jobs</h1>
        
        {/* Filter Tabs */}
        <div className="card">
          <div style={{ display: 'flex', gap: 'calc(var(--spacing) * 2)', marginBottom: 'calc(var(--spacing) * 3)' }}>
            {['all', 'review', 'interview', 'shortlisted', 'rejected'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={filter === status ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ textTransform: 'capitalize' }}
              >
                {status === 'all' ? 'All Applications' : status}
              </button>
            ))}
          </div>

          {/* Applications List */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E5E7EB' }}>
                  <th style={{ padding: 'calc(var(--spacing) * 2)', textAlign: 'left' }}>Job Title</th>
                  <th style={{ padding: 'calc(var(--spacing) * 2)', textAlign: 'left' }}>Company</th>
                  <th style={{ padding: 'calc(var(--spacing) * 2)', textAlign: 'left' }}>Applied Date</th>
                  <th style={{ padding: 'calc(var(--spacing) * 2)', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: 'calc(var(--spacing) * 2)', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map(app => {
                  const statusStyle = getStatusColor(app.status);
                  return (
                    <tr key={app.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <td style={{ padding: 'calc(var(--spacing) * 2)', fontWeight: '500' }}>{app.title}</td>
                      <td style={{ padding: 'calc(var(--spacing) * 2)' }}>{app.company}</td>
                      <td style={{ padding: 'calc(var(--spacing) * 2)' }}>{app.appliedDate}</td>
                      <td style={{ padding: 'calc(var(--spacing) * 2)' }}>
                        <span style={{
                          background: statusStyle.bg,
                          color: statusStyle.color,
                          padding: 'calc(var(--spacing) / 2) calc(var(--spacing))',
                          borderRadius: 'var(--border-radius)',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          {app.status}
                        </span>
                      </td>
                      <td style={{ padding: 'calc(var(--spacing) * 2)' }}>
                        <button className="btn btn-secondary" style={{ fontSize: '12px', padding: 'calc(var(--spacing)) calc(var(--spacing) * 2)' }}>
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AppliedJobs;
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const ManageJobs = () => {
  const [filter, setFilter] = useState('all');
  
  const sidebarItems = [
    { label: 'Dashboard', path: '/recruiter/dashboard' },
    { label: 'Post Job', path: '/recruiter/post-job' },
    { label: 'Manage Jobs', path: '/recruiter/jobs', active: true },
    { label: 'Candidates', path: '/recruiter/candidates' },
    { label: 'Settings', path: '/settings' }
  ];

  const jobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      department: 'Engineering',
      location: 'Mumbai',
      applications: 15,
      posted: '2024-01-10',
      deadline: '2024-02-10',
      status: 'Active'
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Bangalore',
      applications: 8,
      posted: '2024-01-08',
      deadline: '2024-02-08',
      status: 'Active'
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      department: 'Engineering',
      location: 'Remote',
      applications: 12,
      posted: '2024-01-05',
      deadline: '2024-01-25',
      status: 'Closed'
    },
    {
      id: 4,
      title: 'Product Manager',
      department: 'Product',
      location: 'Pune',
      applications: 0,
      posted: '2024-01-15',
      deadline: '2024-02-15',
      status: 'Draft'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return { bg: '#D1FAE5', color: '#065F46' };
      case 'Closed': return { bg: '#FEE2E2', color: '#991B1B' };
      case 'Draft': return { bg: '#FEF3C7', color: '#92400E' };
      default: return { bg: '#F3F4F6', color: '#374151' };
    }
  };

  const filteredJobs = filter === 'all' ? jobs : jobs.filter(job => job.status.toLowerCase() === filter);

  return (
    <DashboardLayout sidebarItems={sidebarItems} userType="recruiter">
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'calc(var(--spacing) * 4)' }}>
          <h1>Manage Jobs</h1>
          <button className="btn btn-primary" onClick={() => alert('Redirecting to post job page')}>Post New Job</button>
        </div>
        
        {/* Filter Tabs */}
        <div className="card">
          <div style={{ display: 'flex', gap: 'calc(var(--spacing) * 2)', marginBottom: 'calc(var(--spacing) * 4)' }}>
            {['all', 'active', 'closed', 'draft'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={filter === status ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ textTransform: 'capitalize' }}
              >
                {status === 'all' ? 'All Jobs' : status}
              </button>
            ))}
          </div>

          {/* Jobs Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E5E7EB' }}>
                  <th style={{ padding: 'calc(var(--spacing) * 2)', textAlign: 'left' }}>Job Title</th>
                  <th style={{ padding: 'calc(var(--spacing) * 2)', textAlign: 'left' }}>Department</th>
                  <th style={{ padding: 'calc(var(--spacing) * 2)', textAlign: 'left' }}>Location</th>
                  <th style={{ padding: 'calc(var(--spacing) * 2)', textAlign: 'left' }}>Applications</th>
                  <th style={{ padding: 'calc(var(--spacing) * 2)', textAlign: 'left' }}>Posted Date</th>
                  <th style={{ padding: 'calc(var(--spacing) * 2)', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: 'calc(var(--spacing) * 2)', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map(job => {
                  const statusStyle = getStatusColor(job.status);
                  return (
                    <tr key={job.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <td style={{ padding: 'calc(var(--spacing) * 2)', fontWeight: '500' }}>
                        {job.title}
                      </td>
                      <td style={{ padding: 'calc(var(--spacing) * 2)' }}>{job.department}</td>
                      <td style={{ padding: 'calc(var(--spacing) * 2)' }}>{job.location}</td>
                      <td style={{ padding: 'calc(var(--spacing) * 2)' }}>
                        <span style={{ 
                          color: job.applications > 0 ? 'var(--primary-blue)' : 'var(--text-grey)',
                          fontWeight: job.applications > 0 ? '600' : '400'
                        }}>
                          {job.applications}
                        </span>
                      </td>
                      <td style={{ padding: 'calc(var(--spacing) * 2)' }}>{job.posted}</td>
                      <td style={{ padding: 'calc(var(--spacing) * 2)' }}>
                        <span style={{
                          background: statusStyle.bg,
                          color: statusStyle.color,
                          padding: 'calc(var(--spacing) / 2) calc(var(--spacing))',
                          borderRadius: 'var(--border-radius)',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          {job.status}
                        </span>
                      </td>
                      <td style={{ padding: 'calc(var(--spacing) * 2)' }}>
                        <div style={{ display: 'flex', gap: 'calc(var(--spacing))' }}>
                          <button 
                            className="btn btn-secondary" 
                            style={{ fontSize: '12px', padding: 'calc(var(--spacing)) calc(var(--spacing) * 2)' }}
                            onClick={() => alert(`Viewing ${job.title} details`)}
                          >
                            View
                          </button>
                          <button 
                            className="btn btn-secondary" 
                            style={{ fontSize: '12px', padding: 'calc(var(--spacing)) calc(var(--spacing) * 2)' }}
                            onClick={() => alert(`Editing ${job.title}`)}
                          >
                            Edit
                          </button>
                          {job.status === 'Active' && (
                            <button 
                              style={{
                                background: '#FEE2E2',
                                color: '#991B1B',
                                border: 'none',
                                padding: 'calc(var(--spacing)) calc(var(--spacing) * 2)',
                                borderRadius: 'var(--border-radius)',
                                fontSize: '12px',
                                cursor: 'pointer'
                              }}
                              onClick={() => alert(`Closing ${job.title}`)}
                            >
                              Close
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredJobs.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: 'calc(var(--spacing) * 6)',
              color: 'var(--text-grey)'
            }}>
              <h3>No jobs found</h3>
              <p>No jobs match the selected filter.</p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4">
          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--primary-blue)', fontSize: '2rem' }}>
              {jobs.filter(j => j.status === 'Active').length}
            </h3>
            <p>Active Jobs</p>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ color: '#10B981', fontSize: '2rem' }}>
              {jobs.reduce((sum, job) => sum + job.applications, 0)}
            </h3>
            <p>Total Applications</p>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ color: '#F59E0B', fontSize: '2rem' }}>
              {jobs.filter(j => j.status === 'Draft').length}
            </h3>
            <p>Draft Jobs</p>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ color: '#EF4444', fontSize: '2rem' }}>
              {jobs.filter(j => j.status === 'Closed').length}
            </h3>
            <p>Closed Jobs</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageJobs;
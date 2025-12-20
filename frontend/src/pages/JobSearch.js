import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const JobSearch = () => {
  const [filters, setFilters] = useState({
    location: '',
    role: '',
    experience: '',
    salary: ''
  });

  const sidebarItems = [
    { label: 'Dashboard', path: '/jobseeker/dashboard' },
    { label: 'Job Search', path: '/jobs', active: true },
    { label: 'Applied Jobs', path: '/jobseeker/applied' },
    { label: 'Profile', path: '/profile' },
    { label: 'Settings', path: '/settings' }
  ];

  const jobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'TechCorp',
      location: 'Mumbai',
      salary: '₹8-12 LPA',
      experience: '3-5 years',
      type: 'Full-time'
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'InnovateLabs',
      location: 'Bangalore',
      salary: '₹6-10 LPA',
      experience: '2-4 years',
      type: 'Full-time'
    }
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems} userType="jobseeker">
      <div>
        <h1>Job Search</h1>
        
        {/* Filters */}
        <div className="card">
          <h3>Search Filters</h3>
          <div className="grid grid-cols-4">
            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-input"
                placeholder="City"
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Role</label>
              <input
                type="text"
                className="form-input"
                placeholder="Job title"
                value={filters.role}
                onChange={(e) => setFilters({...filters, role: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Experience</label>
              <select
                className="form-input"
                value={filters.experience}
                onChange={(e) => setFilters({...filters, experience: e.target.value})}
              >
                <option value="">Any</option>
                <option value="0-1">0-1 years</option>
                <option value="2-4">2-4 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Salary</label>
              <select
                className="form-input"
                value={filters.salary}
                onChange={(e) => setFilters({...filters, salary: e.target.value})}
              >
                <option value="">Any</option>
                <option value="0-5">0-5 LPA</option>
                <option value="5-10">5-10 LPA</option>
                <option value="10+">10+ LPA</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job Results */}
        <div className="card">
          <h3>Available Jobs ({jobs.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(var(--spacing) * 3)' }}>
            {jobs.map(job => (
              <div key={job.id} style={{
                border: '1px solid #E5E7EB',
                borderRadius: 'var(--border-radius)',
                padding: 'calc(var(--spacing) * 3)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h4>{job.title}</h4>
                  <p style={{ color: 'var(--text-grey)', marginBottom: 'calc(var(--spacing))' }}>
                    {job.company} • {job.location}
                  </p>
                  <div style={{ display: 'flex', gap: 'calc(var(--spacing) * 2)' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-grey)' }}>
                      {job.salary}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-grey)' }}>
                      {job.experience}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-grey)' }}>
                      {job.type}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 'calc(var(--spacing) * 2)' }}>
                  <button className="btn btn-secondary">View Details</button>
                  <button className="btn btn-primary">Apply Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobSearch;
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: '',
    department: '',
    location: '',
    jobType: 'Full-time',
    experience: '',
    salaryMin: '',
    salaryMax: '',
    skills: '',
    description: '',
    requirements: '',
    benefits: '',
    applicationDeadline: ''
  });

  const sidebarItems = [
    { label: 'Dashboard', path: '/recruiter/dashboard' },
    { label: 'Post Job', path: '/recruiter/post-job', active: true },
    { label: 'Manage Jobs', path: '/recruiter/jobs' },
    { label: 'Candidates', path: '/recruiter/candidates' },
    { label: 'Settings', path: '/settings' }
  ];

  const handleInputChange = (field, value) => {
    setJobData({ ...jobData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle job posting logic
    alert('Job posted successfully!');
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} userType="recruiter">
      <div>
        <h1>Post New Job</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="card">
            <h3>Job Information</h3>
            
            <div className="grid grid-cols-2">
              <div className="form-group">
                <label className="form-label">Job Title *</label>
                <input
                  type="text"
                  className="form-input"
                  value={jobData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g. Senior React Developer"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  className="form-input"
                  value={jobData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  placeholder="e.g. Engineering"
                />
              </div>
            </div>

            <div className="grid grid-cols-3">
              <div className="form-group">
                <label className="form-label">Location *</label>
                <input
                  type="text"
                  className="form-input"
                  value={jobData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g. Mumbai, Remote"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Job Type *</label>
                <select
                  className="form-input"
                  value={jobData.jobType}
                  onChange={(e) => handleInputChange('jobType', e.target.value)}
                  required
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Experience Required</label>
                <select
                  className="form-input"
                  value={jobData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                >
                  <option value="">Select Experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-8">5-8 years</option>
                  <option value="8+">8+ years</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div className="form-group">
                <label className="form-label">Minimum Salary (₹ LPA)</label>
                <input
                  type="number"
                  className="form-input"
                  value={jobData.salaryMin}
                  onChange={(e) => handleInputChange('salaryMin', e.target.value)}
                  placeholder="e.g. 8"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Maximum Salary (₹ LPA)</label>
                <input
                  type="number"
                  className="form-input"
                  value={jobData.salaryMax}
                  onChange={(e) => handleInputChange('salaryMax', e.target.value)}
                  placeholder="e.g. 12"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Required Skills *</label>
              <textarea
                className="form-input"
                rows="2"
                value={jobData.skills}
                onChange={(e) => handleInputChange('skills', e.target.value)}
                placeholder="e.g. React, JavaScript, Node.js, MongoDB (comma separated)"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Application Deadline</label>
              <input
                type="date"
                className="form-input"
                value={jobData.applicationDeadline}
                onChange={(e) => handleInputChange('applicationDeadline', e.target.value)}
              />
            </div>
          </div>

          <div className="card">
            <h3>Job Description</h3>
            
            <div className="form-group">
              <label className="form-label">Job Description *</label>
              <textarea
                className="form-input"
                rows="6"
                value={jobData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the role, responsibilities, and what the candidate will be working on..."
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Requirements</label>
              <textarea
                className="form-input"
                rows="4"
                value={jobData.requirements}
                onChange={(e) => handleInputChange('requirements', e.target.value)}
                placeholder="List the key requirements, qualifications, and must-have skills..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Benefits & Perks</label>
              <textarea
                className="form-input"
                rows="3"
                value={jobData.benefits}
                onChange={(e) => handleInputChange('benefits', e.target.value)}
                placeholder="Health insurance, flexible hours, learning opportunities, etc..."
              />
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', gap: 'calc(var(--spacing) * 2)' }}>
              <button type="submit" className="btn btn-primary">
                Post Job
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => alert('Job saved as draft')}>
                Save as Draft
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => alert('Opening job preview')}>
                Preview
              </button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default PostJob;
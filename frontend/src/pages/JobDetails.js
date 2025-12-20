import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

const JobDetails = () => {
  const { id } = useParams();
  
  const sidebarItems = [
    { label: 'Dashboard', path: '/jobseeker/dashboard' },
    { label: 'Job Search', path: '/jobs' },
    { label: 'Applied Jobs', path: '/jobseeker/applied' },
    { label: 'Profile', path: '/profile' },
    { label: 'Settings', path: '/settings' }
  ];

  const job = {
    id: id,
    title: 'Senior React Developer',
    company: 'TechCorp',
    location: 'Mumbai, India',
    salary: '₹8-12 LPA',
    experience: '3-5 years',
    type: 'Full-time',
    description: 'We are looking for an experienced React developer to join our dynamic team.',
    requirements: [
      '3+ years of React development experience',
      'Strong JavaScript and ES6+ knowledge',
      'Experience with Redux or Context API',
      'Knowledge of modern build tools'
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Flexible working hours',
      'Learning opportunities'
    ]
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} userType="jobseeker">
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'calc(var(--spacing) * 4)' }}>
          <button className="btn btn-secondary">← Back to Jobs</button>
          <button className="btn btn-primary">Apply for this Job</button>
        </div>

        <div className="card">
          <h1>{job.title}</h1>
          <div style={{ display: 'flex', gap: 'calc(var(--spacing) * 4)', marginBottom: 'calc(var(--spacing) * 4)' }}>
            <div>
              <strong>Company:</strong> {job.company}
            </div>
            <div>
              <strong>Location:</strong> {job.location}
            </div>
            <div>
              <strong>Salary:</strong> {job.salary}
            </div>
            <div>
              <strong>Experience:</strong> {job.experience}
            </div>
          </div>

          <h3>Job Description</h3>
          <p style={{ marginBottom: 'calc(var(--spacing) * 4)' }}>{job.description}</p>

          <h3>Requirements</h3>
          <ul style={{ marginBottom: 'calc(var(--spacing) * 4)', paddingLeft: 'calc(var(--spacing) * 3)' }}>
            {job.requirements.map((req, index) => (
              <li key={index} style={{ marginBottom: 'calc(var(--spacing))' }}>{req}</li>
            ))}
          </ul>

          <h3>Benefits</h3>
          <ul style={{ paddingLeft: 'calc(var(--spacing) * 3)' }}>
            {job.benefits.map((benefit, index) => (
              <li key={index} style={{ marginBottom: 'calc(var(--spacing))' }}>{benefit}</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3>About {job.company}</h3>
          <p>TechCorp is a leading technology company focused on innovative solutions and cutting-edge development practices.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobDetails;
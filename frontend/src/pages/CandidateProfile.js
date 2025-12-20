import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

const CandidateProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('profile');
  
  const sidebarItems = [
    { label: 'Dashboard', path: '/recruiter/dashboard' },
    { label: 'Candidates', path: '/recruiter/candidates' },
    { label: 'Shortlisted', path: '/recruiter/shortlisted' },
    { label: 'Settings', path: '/settings' }
  ];

  const candidate = {
    id: id,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, India',
    experience: '5 years',
    currentRole: 'Senior Frontend Developer',
    currentCompany: 'TechCorp',
    expectedSalary: '₹12-15 LPA',
    noticePeriod: '2 months',
    matchScore: 95,
    appliedDate: '2024-01-15',
    appliedFor: 'Senior React Developer',
    skills: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'MongoDB', 'AWS'],
    education: [
      {
        degree: 'B.Tech Computer Science',
        institution: 'IIT Mumbai',
        year: '2019',
        grade: '8.5 CGPA'
      }
    ],
    workExperience: [
      {
        title: 'Senior Frontend Developer',
        company: 'TechCorp',
        duration: '2022 - Present',
        description: 'Led frontend development team, built scalable React applications'
      },
      {
        title: 'Frontend Developer',
        company: 'StartupXYZ',
        duration: '2020 - 2022',
        description: 'Developed responsive web applications using React and Redux'
      }
    ],
    status: 'Applied'
  };

  const handleStatusChange = (newStatus) => {
    alert(`Candidate status changed to: ${newStatus}`);
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} userType="recruiter">
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'calc(var(--spacing) * 4)' }}>
          <button className="btn btn-secondary">← Back to Candidates</button>
          <div style={{ display: 'flex', gap: 'calc(var(--spacing) * 2)' }}>
            <button 
              className="btn btn-primary"
              onClick={() => handleStatusChange('Shortlisted')}
            >
              Shortlist
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => handleStatusChange('Interview')}
            >
              Schedule Interview
            </button>
            <button 
              style={{
                background: '#FEE2E2',
                color: '#991B1B',
                border: 'none',
                padding: 'calc(var(--spacing) * 2) calc(var(--spacing) * 3)',
                borderRadius: 'var(--border-radius)',
                cursor: 'pointer',
                fontWeight: '500'
              }}
              onClick={() => handleStatusChange('Rejected')}
            >
              Reject
            </button>
          </div>
        </div>

        {/* Candidate Header */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'calc(var(--spacing) * 3)' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'var(--primary-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '2rem',
              fontWeight: 'bold'
            }}>
              {candidate.name.split(' ').map(n => n[0]).join('')}
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ marginBottom: 'calc(var(--spacing))' }}>{candidate.name}</h2>
                  <p style={{ color: 'var(--text-grey)', marginBottom: 'calc(var(--spacing))' }}>
                    {candidate.currentRole} at {candidate.currentCompany}
                  </p>
                  <div style={{ display: 'flex', gap: 'calc(var(--spacing) * 3)', marginBottom: 'calc(var(--spacing) * 2)' }}>
                    <span>📧 {candidate.email}</span>
                    <span>📱 {candidate.phone}</span>
                    <span>📍 {candidate.location}</span>
                  </div>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    background: '#D1FAE5',
                    color: '#065F46',
                    padding: 'calc(var(--spacing)) calc(var(--spacing) * 2)',
                    borderRadius: 'calc(var(--border-radius) * 2)',
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    marginBottom: 'calc(var(--spacing))'
                  }}>
                    {candidate.matchScore}% Match
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-grey)' }}>
                    Applied for: {candidate.appliedFor}
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: 'calc(var(--spacing) * 3)' }}>
                <span><strong>Experience:</strong> {candidate.experience}</span>
                <span><strong>Expected Salary:</strong> {candidate.expectedSalary}</span>
                <span><strong>Notice Period:</strong> {candidate.noticePeriod}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="card">
          <div style={{ display: 'flex', gap: 'calc(var(--spacing) * 2)', marginBottom: 'calc(var(--spacing) * 4)', borderBottom: '1px solid #E5E7EB' }}>
            {['profile', 'resume', 'notes'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 'calc(var(--spacing) * 2)',
                  cursor: 'pointer',
                  borderBottom: activeTab === tab ? '2px solid var(--primary-blue)' : '2px solid transparent',
                  color: activeTab === tab ? 'var(--primary-blue)' : 'var(--text-grey)',
                  fontWeight: activeTab === tab ? '600' : '400',
                  textTransform: 'capitalize'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <div className="grid grid-cols-2">
                <div>
                  <h3>Skills</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'calc(var(--spacing))', marginBottom: 'calc(var(--spacing) * 3)' }}>
                    {candidate.skills.map((skill, index) => (
                      <span key={index} style={{
                        background: 'var(--light-grey)',
                        color: 'var(--primary-blue)',
                        padding: 'calc(var(--spacing)) calc(var(--spacing) * 2)',
                        borderRadius: 'calc(var(--border-radius) * 2)',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>

                  <h3>Education</h3>
                  {candidate.education.map((edu, index) => (
                    <div key={index} style={{ marginBottom: 'calc(var(--spacing) * 2)' }}>
                      <h4>{edu.degree}</h4>
                      <p style={{ color: 'var(--text-grey)' }}>
                        {edu.institution} • {edu.year} • {edu.grade}
                      </p>
                    </div>
                  ))}
                </div>

                <div>
                  <h3>Work Experience</h3>
                  {candidate.workExperience.map((exp, index) => (
                    <div key={index} style={{ 
                      marginBottom: 'calc(var(--spacing) * 3)',
                      paddingBottom: 'calc(var(--spacing) * 2)',
                      borderBottom: index < candidate.workExperience.length - 1 ? '1px solid #E5E7EB' : 'none'
                    }}>
                      <h4>{exp.title}</h4>
                      <p style={{ color: 'var(--primary-blue)', fontWeight: '500', marginBottom: 'calc(var(--spacing))' }}>
                        {exp.company} • {exp.duration}
                      </p>
                      <p style={{ color: 'var(--text-grey)', lineHeight: '1.6' }}>
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Resume Tab */}
          {activeTab === 'resume' && (
            <div>
              <div style={{ 
                border: '2px dashed #D1D5DB',
                borderRadius: 'calc(var(--border-radius) * 2)',
                padding: 'calc(var(--spacing) * 6)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: 'calc(var(--spacing) * 2)' }}>📄</div>
                <h3>Resume: John_Doe_Resume.pdf</h3>
                <p style={{ color: 'var(--text-grey)', marginBottom: 'calc(var(--spacing) * 3)' }}>
                  Uploaded on {candidate.appliedDate}
                </p>
                <div style={{ display: 'flex', gap: 'calc(var(--spacing) * 2)', justifyContent: 'center' }}>
                  <button className="btn btn-primary">View Resume</button>
                  <button className="btn btn-secondary">Download PDF</button>
                </div>
              </div>
            </div>
          )}

          {/* Notes Tab */}
          {activeTab === 'notes' && (
            <div>
              <h3>Recruiter Notes</h3>
              <textarea
                className="form-input"
                rows="6"
                placeholder="Add your notes about this candidate..."
                style={{ marginBottom: 'calc(var(--spacing) * 2)' }}
              />
              <button className="btn btn-primary">Save Notes</button>
              
              <div style={{ marginTop: 'calc(var(--spacing) * 4)' }}>
                <h4>Previous Notes</h4>
                <div style={{ 
                  background: '#F9FAFB',
                  padding: 'calc(var(--spacing) * 2)',
                  borderRadius: 'var(--border-radius)',
                  marginTop: 'calc(var(--spacing) * 2)'
                }}>
                  <p style={{ marginBottom: 'calc(var(--spacing))' }}>
                    Strong technical skills, good communication during initial screening.
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--text-grey)' }}>
                    Added by HR Manager on 2024-01-15
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CandidateProfile;
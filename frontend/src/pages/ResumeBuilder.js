import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const ResumeBuilder = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [resumeData, setResumeData] = useState({
    personalInfo: { name: '', email: '', phone: '', location: '' },
    education: [{ degree: '', institution: '', year: '', grade: '' }],
    experience: [{ title: '', company: '', duration: '', description: '' }],
    skills: ''
  });

  const sidebarItems = [
    { label: 'Dashboard', path: '/jobseeker/dashboard' },
    { label: 'Job Search', path: '/jobs' },
    { label: 'Applied Jobs', path: '/jobseeker/applied' },
    { label: 'Profile', path: '/profile' },
    { label: 'Resume Builder', path: '/resume-builder', active: true },
    { label: 'Settings', path: '/settings' }
  ];

  const handleInputChange = (section, index, field, value) => {
    const newData = { ...resumeData };
    if (index !== undefined) {
      newData[section][index][field] = value;
    } else {
      newData[section][field] = value;
    }
    setResumeData(newData);
  };

  const addSection = (section) => {
    const newData = { ...resumeData };
    if (section === 'education') {
      newData.education.push({ degree: '', institution: '', year: '', grade: '' });
    } else if (section === 'experience') {
      newData.experience.push({ title: '', company: '', duration: '', description: '' });
    }
    setResumeData(newData);
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} userType="jobseeker">
      <div>
        <h1>Resume Builder</h1>
        
        {/* Tab Navigation */}
        <div className="card">
          <div style={{ display: 'flex', gap: 'calc(var(--spacing) * 2)', marginBottom: 'calc(var(--spacing) * 4)' }}>
            <button
              onClick={() => setActiveTab('upload')}
              className={activeTab === 'upload' ? 'btn btn-primary' : 'btn btn-secondary'}
            >
              Upload Resume
            </button>
            <button
              onClick={() => setActiveTab('builder')}
              className={activeTab === 'builder' ? 'btn btn-primary' : 'btn btn-secondary'}
            >
              Build Resume
            </button>
          </div>

          {activeTab === 'upload' ? (
            <div>
              <h3>Upload Your Resume</h3>
              <div style={{
                border: '2px dashed #D1D5DB',
                borderRadius: 'calc(var(--border-radius) * 2)',
                padding: 'calc(var(--spacing) * 6)',
                textAlign: 'center',
                marginBottom: 'calc(var(--spacing) * 3)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: 'calc(var(--spacing) * 2)' }}>📄</div>
                <h4>Drag & drop your resume here</h4>
                <p style={{ color: 'var(--text-grey)', marginBottom: 'calc(var(--spacing) * 3)' }}>
                  or click to browse files (PDF, DOC, DOCX)
                </p>
                <input type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} id="resume-upload" />
                <label htmlFor="resume-upload" className="btn btn-primary">
                  Choose File
                </label>
              </div>
              
              <div style={{ background: '#F9FAFB', padding: 'calc(var(--spacing) * 3)', borderRadius: 'var(--border-radius)' }}>
                <h4>Tips for a great resume:</h4>
                <ul style={{ paddingLeft: 'calc(var(--spacing) * 3)', marginTop: 'calc(var(--spacing))' }}>
                  <li>Keep it to 1-2 pages maximum</li>
                  <li>Use clear, professional formatting</li>
                  <li>Include relevant keywords for your industry</li>
                  <li>Quantify your achievements with numbers</li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <h3>Build Your Resume</h3>
              
              {/* Personal Information */}
              <div style={{ marginBottom: 'calc(var(--spacing) * 4)' }}>
                <h4>Personal Information</h4>
                <div className="grid grid-cols-2">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={resumeData.personalInfo.name}
                      onChange={(e) => handleInputChange('personalInfo', undefined, 'name', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-input"
                      value={resumeData.personalInfo.email}
                      onChange={(e) => handleInputChange('personalInfo', undefined, 'email', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-input"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) => handleInputChange('personalInfo', undefined, 'phone', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-input"
                      value={resumeData.personalInfo.location}
                      onChange={(e) => handleInputChange('personalInfo', undefined, 'location', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Education */}
              <div style={{ marginBottom: 'calc(var(--spacing) * 4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'calc(var(--spacing) * 2)' }}>
                  <h4>Education</h4>
                  <button className="btn btn-secondary" onClick={() => addSection('education')}>
                    + Add Education
                  </button>
                </div>
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="grid grid-cols-2" style={{ marginBottom: 'calc(var(--spacing) * 3)' }}>
                    <div className="form-group">
                      <label className="form-label">Degree</label>
                      <input
                        type="text"
                        className="form-input"
                        value={edu.degree}
                        onChange={(e) => handleInputChange('education', index, 'degree', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Institution</label>
                      <input
                        type="text"
                        className="form-input"
                        value={edu.institution}
                        onChange={(e) => handleInputChange('education', index, 'institution', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Year</label>
                      <input
                        type="text"
                        className="form-input"
                        value={edu.year}
                        onChange={(e) => handleInputChange('education', index, 'year', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Grade/CGPA</label>
                      <input
                        type="text"
                        className="form-input"
                        value={edu.grade}
                        onChange={(e) => handleInputChange('education', index, 'grade', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Experience */}
              <div style={{ marginBottom: 'calc(var(--spacing) * 4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'calc(var(--spacing) * 2)' }}>
                  <h4>Experience</h4>
                  <button className="btn btn-secondary" onClick={() => addSection('experience')}>
                    + Add Experience
                  </button>
                </div>
                {resumeData.experience.map((exp, index) => (
                  <div key={index} style={{ marginBottom: 'calc(var(--spacing) * 3)' }}>
                    <div className="grid grid-cols-2">
                      <div className="form-group">
                        <label className="form-label">Job Title</label>
                        <input
                          type="text"
                          className="form-input"
                          value={exp.title}
                          onChange={(e) => handleInputChange('experience', index, 'title', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Company</label>
                        <input
                          type="text"
                          className="form-input"
                          value={exp.company}
                          onChange={(e) => handleInputChange('experience', index, 'company', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Duration</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g., Jan 2020 - Dec 2022"
                        value={exp.duration}
                        onChange={(e) => handleInputChange('experience', index, 'duration', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-input"
                        rows="3"
                        value={exp.description}
                        onChange={(e) => handleInputChange('experience', index, 'description', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div style={{ marginBottom: 'calc(var(--spacing) * 4)' }}>
                <h4>Skills</h4>
                <div className="form-group">
                  <label className="form-label">Skills (comma separated)</label>
                  <textarea
                    className="form-input"
                    rows="3"
                    placeholder="e.g., React, JavaScript, Node.js, Python"
                    value={resumeData.skills}
                    onChange={(e) => handleInputChange('skills', undefined, undefined, e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 'calc(var(--spacing) * 2)' }}>
                <button className="btn btn-primary">Save Resume</button>
                <button className="btn btn-secondary">Preview Resume</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ResumeBuilder;
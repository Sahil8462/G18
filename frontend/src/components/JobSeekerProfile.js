import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobSeekerProfile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    profilePictureUrl: '',
    professionalHeadline: '',
    resumeUrl: '',
    workExperience: [],
    education: [],
    skills: [],
    projects: []
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/jobseeker/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put('/api/jobseeker/profile', profile);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleFileUpload = async (file, type) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post(`/api/upload/${type}`, formData);
      if (type === 'resume') {
        setProfile({...profile, resumeUrl: response.data.url});
      } else if (type === 'profile') {
        setProfile({...profile, profilePictureUrl: response.data.url});
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const addWorkExperience = () => {
    setProfile({
      ...profile,
      workExperience: [...profile.workExperience, {
        companyName: '',
        role: '',
        startDate: '',
        endDate: '',
        description: ''
      }]
    });
  };

  const addEducation = () => {
    setProfile({
      ...profile,
      education: [...profile.education, {
        degree: '',
        university: '',
        passYear: ''
      }]
    });
  };

  const addProject = () => {
    setProfile({
      ...profile,
      projects: [...profile.projects, {
        projectName: '',
        projectUrl: '',
        projectDescription: ''
      }]
    });
  };

  return (
    <div className="card" style={{padding: '2rem'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <h2>Job Seeker Profile</h2>
        <button 
          className={isEditing ? 'btn-primary' : 'btn-secondary'}
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          {isEditing ? 'Save Profile' : 'Edit Profile'}
        </button>
      </div>

      {/* Personal Info */}
      <section style={{marginBottom: '2rem'}}>
        <h3>Personal Information</h3>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
          <div>
            <label>First Name:</label>
            <input 
              type="text" 
              value={profile.firstName}
              onChange={(e) => setProfile({...profile, firstName: e.target.value})}
              disabled={!isEditing}
              style={{width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input 
              type="text" 
              value={profile.lastName}
              onChange={(e) => setProfile({...profile, lastName: e.target.value})}
              disabled={!isEditing}
              style={{width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
            />
          </div>
          <div>
            <label>Email:</label>
            <input 
              type="email" 
              value={profile.email}
              onChange={(e) => setProfile({...profile, email: e.target.value})}
              disabled={!isEditing}
              style={{width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
            />
          </div>
          <div>
            <label>Phone:</label>
            <input 
              type="tel" 
              value={profile.phone}
              onChange={(e) => setProfile({...profile, phone: e.target.value})}
              disabled={!isEditing}
              style={{width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
            />
          </div>
        </div>
        <div style={{marginTop: '1rem'}}>
          <label>Location:</label>
          <input 
            type="text" 
            value={profile.location}
            onChange={(e) => setProfile({...profile, location: e.target.value})}
            disabled={!isEditing}
            style={{width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
          />
        </div>
        <div style={{marginTop: '1rem'}}>
          <label>Professional Headline:</label>
          <input 
            type="text" 
            value={profile.professionalHeadline}
            onChange={(e) => setProfile({...profile, professionalHeadline: e.target.value})}
            disabled={!isEditing}
            placeholder="e.g. Senior React Developer"
            style={{width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
          />
        </div>
      </section>

      {/* Resume */}
      <section style={{marginBottom: '2rem'}}>
        <h3>Resume/CV</h3>
        <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
          {profile.resumeUrl && <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a>}
          <input 
            type="file" 
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFileUpload(e.target.files[0], 'resume')}
            disabled={!isEditing}
          />
        </div>
      </section>

      {/* Skills */}
      <section style={{marginBottom: '2rem'}}>
        <h3>Skills</h3>
        <textarea 
          value={profile.skills.join(', ')}
          onChange={(e) => setProfile({...profile, skills: e.target.value.split(', ')})}
          disabled={!isEditing}
          placeholder="JavaScript, React, Node.js, MongoDB"
          style={{width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', minHeight: '80px'}}
        />
      </section>

      {/* Work Experience */}
      <section style={{marginBottom: '2rem'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h3>Work Experience</h3>
          {isEditing && <button className="btn-secondary" onClick={addWorkExperience}>Add Experience</button>}
        </div>
        {profile.workExperience.map((exp, index) => (
          <div key={index} style={{border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem', borderRadius: '4px'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
              <input 
                type="text" 
                placeholder="Company Name"
                value={exp.companyName}
                onChange={(e) => {
                  const newExp = [...profile.workExperience];
                  newExp[index].companyName = e.target.value;
                  setProfile({...profile, workExperience: newExp});
                }}
                disabled={!isEditing}
                style={{padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
              />
              <input 
                type="text" 
                placeholder="Role"
                value={exp.role}
                onChange={(e) => {
                  const newExp = [...profile.workExperience];
                  newExp[index].role = e.target.value;
                  setProfile({...profile, workExperience: newExp});
                }}
                disabled={!isEditing}
                style={{padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
              />
              <input 
                type="date" 
                placeholder="Start Date"
                value={exp.startDate}
                onChange={(e) => {
                  const newExp = [...profile.workExperience];
                  newExp[index].startDate = e.target.value;
                  setProfile({...profile, workExperience: newExp});
                }}
                disabled={!isEditing}
                style={{padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
              />
              <input 
                type="date" 
                placeholder="End Date"
                value={exp.endDate}
                onChange={(e) => {
                  const newExp = [...profile.workExperience];
                  newExp[index].endDate = e.target.value;
                  setProfile({...profile, workExperience: newExp});
                }}
                disabled={!isEditing}
                style={{padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
              />
            </div>
            <textarea 
              placeholder="Job Description"
              value={exp.description}
              onChange={(e) => {
                const newExp = [...profile.workExperience];
                newExp[index].description = e.target.value;
                setProfile({...profile, workExperience: newExp});
              }}
              disabled={!isEditing}
              style={{width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', marginTop: '1rem', minHeight: '60px'}}
            />
          </div>
        ))}
      </section>

      {/* Education */}
      <section style={{marginBottom: '2rem'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h3>Education</h3>
          {isEditing && <button className="btn-secondary" onClick={addEducation}>Add Education</button>}
        </div>
        {profile.education.map((edu, index) => (
          <div key={index} style={{border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem', borderRadius: '4px'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem'}}>
              <input 
                type="text" 
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => {
                  const newEdu = [...profile.education];
                  newEdu[index].degree = e.target.value;
                  setProfile({...profile, education: newEdu});
                }}
                disabled={!isEditing}
                style={{padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
              />
              <input 
                type="text" 
                placeholder="University"
                value={edu.university}
                onChange={(e) => {
                  const newEdu = [...profile.education];
                  newEdu[index].university = e.target.value;
                  setProfile({...profile, education: newEdu});
                }}
                disabled={!isEditing}
                style={{padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
              />
              <input 
                type="number" 
                placeholder="Pass Year"
                value={edu.passYear}
                onChange={(e) => {
                  const newEdu = [...profile.education];
                  newEdu[index].passYear = e.target.value;
                  setProfile({...profile, education: newEdu});
                }}
                disabled={!isEditing}
                style={{padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
              />
            </div>
          </div>
        ))}
      </section>

      {/* Projects */}
      <section>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h3>Projects</h3>
          {isEditing && <button className="btn-secondary" onClick={addProject}>Add Project</button>}
        </div>
        {profile.projects.map((project, index) => (
          <div key={index} style={{border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem', borderRadius: '4px'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem'}}>
              <input 
                type="text" 
                placeholder="Project Name"
                value={project.projectName}
                onChange={(e) => {
                  const newProjects = [...profile.projects];
                  newProjects[index].projectName = e.target.value;
                  setProfile({...profile, projects: newProjects});
                }}
                disabled={!isEditing}
                style={{padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
              />
              <input 
                type="url" 
                placeholder="Project URL"
                value={project.projectUrl}
                onChange={(e) => {
                  const newProjects = [...profile.projects];
                  newProjects[index].projectUrl = e.target.value;
                  setProfile({...profile, projects: newProjects});
                }}
                disabled={!isEditing}
                style={{padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
              />
            </div>
            <textarea 
              placeholder="Project Description"
              value={project.projectDescription}
              onChange={(e) => {
                const newProjects = [...profile.projects];
                newProjects[index].projectDescription = e.target.value;
                setProfile({...profile, projects: newProjects});
              }}
              disabled={!isEditing}
              style={{width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', minHeight: '60px'}}
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default JobSeekerProfile;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RecruiterProfile = () => {
  const [profile, setProfile] = useState({
    recruiterName: '',
    roleInCompany: '',
    officialEmail: '',
    phone: '',
    companyName: '',
    companyLogoUrl: '',
    companyWebsite: '',
    industry: '',
    address: '',
    aboutCompany: ''
  });
  const [postedJobs, setPostedJobs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchPostedJobs();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/recruiter/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchPostedJobs = async () => {
    try {
      const response = await axios.get('/api/recruiter/jobs');
      setPostedJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put('/api/recruiter/profile', profile);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('/api/upload/logo', formData);
      setProfile({...profile, companyLogoUrl: response.data.url});
    } catch (error) {
      console.error('Error uploading logo:', error);
    }
  };

  const deleteJob = async (jobId) => {
    if (confirm('Are you sure you want to delete this job?')) {
      try {
        await axios.delete(`/api/jobs/${jobId}`);
        fetchPostedJobs();
        alert('Job deleted successfully!');
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  return (
    <div className="card" style={{padding: '2rem'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <h2>Recruiter Profile</h2>
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
            <label>Recruiter Name:</label>
            <input 
              type="text" 
              value={profile.recruiterName}
              onChange={(e) => setProfile({...profile, recruiterName: e.target.value})}
              disabled={!isEditing}
              style={{width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
            />
          </div>
          <div>
            <label>Role in Company:</label>
            <input 
              type="text" 
              value={profile.roleInCompany}
              onChange={(e) => setProfile({...profile, roleInCompany: e.target.value})}
              disabled={!isEditing}
              placeholder="e.g. HR Manager"
              style={{width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
            />
          </div>
          <div>
            <label>Official Email:</label>
            <input 
              type="email" 
              value={profile.officialEmail}
              onChange={(e) => setProfile({...profile, officialEmail: e.target.value})}
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
      </section>

      {/* Company Info */}
      <section style={{marginBottom: '2rem'}}>
        <h3>Company Information</h3>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem'}}>
          <div>
            <label>Company Name:</label>
            <input 
              type="text" 
              value={profile.companyName}
              onChange={(e) => setProfile({...profile, companyName: e.target.value})}
              disabled={!isEditing}
              style={{width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
            />
          </div>
          <div>
            <label>Industry:</label>
            <input 
              type="text" 
              value={profile.industry}
              onChange={(e) => setProfile({...profile, industry: e.target.value})}
              disabled={!isEditing}
              placeholder="e.g. Information Technology"
              style={{width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
            />
          </div>
          <div>
            <label>Company Website:</label>
            <input 
              type="url" 
              value={profile.companyWebsite}
              onChange={(e) => setProfile({...profile, companyWebsite: e.target.value})}
              disabled={!isEditing}
              placeholder="https://www.company.com"
              style={{width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
            />
          </div>
          <div>
            <label>Company Logo:</label>
            <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
              {profile.companyLogoUrl && (
                <img src={profile.companyLogoUrl} alt="Company Logo" style={{width: '50px', height: '50px', objectFit: 'cover'}} />
              )}
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files[0])}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
        <div style={{marginBottom: '1rem'}}>
          <label>Company Address:</label>
          <textarea 
            value={profile.address}
            onChange={(e) => setProfile({...profile, address: e.target.value})}
            disabled={!isEditing}
            placeholder="Complete company address"
            style={{width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', minHeight: '80px'}}
          />
        </div>
        <div>
          <label>About Company:</label>
          <textarea 
            value={profile.aboutCompany}
            onChange={(e) => setProfile({...profile, aboutCompany: e.target.value})}
            disabled={!isEditing}
            placeholder="Brief description about the company"
            style={{width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', minHeight: '120px'}}
          />
        </div>
      </section>

      {/* Posted Jobs Dashboard */}
      <section>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
          <h3>Posted Jobs Dashboard</h3>
          <Link to="/post-job" className="btn-primary">Post New Job</Link>
        </div>
        
        <div style={{backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginBottom: '1rem'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', textAlign: 'center'}}>
            <div>
              <h4 style={{color: '#007bff', margin: 0}}>{postedJobs.length}</h4>
              <p style={{margin: 0, color: '#666'}}>Total Jobs Posted</p>
            </div>
            <div>
              <h4 style={{color: '#28a745', margin: 0}}>{postedJobs.filter(job => job.status === 'ACTIVE').length}</h4>
              <p style={{margin: 0, color: '#666'}}>Active Jobs</p>
            </div>
            <div>
              <h4 style={{color: '#ffc107', margin: 0}}>{postedJobs.reduce((sum, job) => sum + (job.applicationsCount || 0), 0)}</h4>
              <p style={{margin: 0, color: '#666'}}>Total Applications</p>
            </div>
          </div>
        </div>

        {postedJobs.length > 0 ? (
          <div style={{display: 'grid', gap: '1rem'}}>
            {postedJobs.map((job) => (
              <div key={job.id} style={{border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', backgroundColor: 'white'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                  <div style={{flex: 1}}>
                    <h4 style={{margin: '0 0 0.5rem 0', color: '#333'}}>{job.jobTitle}</h4>
                    <p style={{margin: '0 0 0.5rem 0', color: '#666'}}>{job.location} • {job.jobType}</p>
                    <p style={{margin: '0 0 0.5rem 0', color: '#28a745'}}>₹{job.salaryMin}-{job.salaryMax} LPA</p>
                    <div style={{display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#666'}}>
                      <span>📅 Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
                      <span>👥 Applications: {job.applicationsCount || 0}</span>
                      <span className={`status-${job.status.toLowerCase()}`}>
                        Status: {job.status}
                      </span>
                    </div>
                  </div>
                  <div style={{display: 'flex', gap: '0.5rem'}}>
                    <Link to={`/jobs/${job.id}/edit`} className="btn-secondary" style={{padding: '0.25rem 0.5rem', fontSize: '0.8rem'}}>
                      Edit
                    </Link>
                    <Link to={`/jobs/${job.id}/applications`} className="btn-secondary" style={{padding: '0.25rem 0.5rem', fontSize: '0.8rem'}}>
                      View Applications
                    </Link>
                    <button 
                      onClick={() => deleteJob(job.id)}
                      style={{
                        backgroundColor: '#dc3545', 
                        color: 'white', 
                        border: 'none', 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{textAlign: 'center', padding: '2rem', color: '#666'}}>
            <p>No jobs posted yet.</p>
            <Link to="/post-job" className="btn-primary">Post Your First Job</Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default RecruiterProfile;
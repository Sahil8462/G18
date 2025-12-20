import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const CandidatesList = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    job: '',
    experience: '',
    skills: '',
    location: '',
    matchScore: ''
  });
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  const sidebarItems = [
    { label: 'Dashboard', path: '/recruiter/dashboard' },
    { label: 'Post Job', path: '/recruiter/post-job' },
    { label: 'Manage Jobs', path: '/recruiter/jobs' },
    { label: 'Candidates', path: '/recruiter/candidates', active: true },
    { label: 'Shortlisted', path: '/recruiter/shortlisted' },
    { label: 'Settings', path: '/settings' }
  ];

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/recruiter/candidates', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setCandidates(data.candidates || []);
      } else {
        // Fallback to mock data for development
        setCandidates(getMockCandidates());
      }
    } catch (error) {
      console.error('Error fetching candidates:', error);
      setError('Failed to load candidates');
      // Fallback to mock data
      setCandidates(getMockCandidates());
    } finally {
      setLoading(false);
    }
  };

  const getMockCandidates = () => [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      position: 'Senior React Developer',
      experience: '5 years',
      location: 'Mumbai',
      skills: ['React', 'JavaScript', 'Node.js'],
      matchScore: 95,
      appliedDate: '2024-01-15',
      status: 'Applied'
    },
    {
      id: 2,
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      position: 'UI/UX Designer',
      experience: '3 years',
      location: 'Bangalore',
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      matchScore: 88,
      appliedDate: '2024-01-14',
      status: 'Shortlisted'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Applied': return { bg: '#DBEAFE', color: '#1E40AF' };
      case 'Shortlisted': return { bg: '#FEF3C7', color: '#92400E' };
      case 'Interview': return { bg: '#D1FAE5', color: '#065F46' };
      case 'Rejected': return { bg: '#FEE2E2', color: '#991B1B' };
      default: return { bg: '#F3F4F6', color: '#374151' };
    }
  };

  const getMatchScoreColor = (score) => {
    if (score >= 90) return { bg: '#D1FAE5', color: '#065F46' };
    if (score >= 75) return { bg: '#FEF3C7', color: '#92400E' };
    return { bg: '#FEE2E2', color: '#991B1B' };
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} userType="recruiter">
      <div>
        <h1>All Candidates</h1>
        
        {/* Filters */}
        <div className="card">
          <h3>Filter Candidates</h3>
          <div className="grid grid-cols-4">
            <div className="form-group">
              <label className="form-label">Job Position</label>
              <select
                className="form-input"
                value={filters.job}
                onChange={(e) => setFilters({...filters, job: e.target.value})}
              >
                <option value="">All Positions</option>
                <option value="Senior React Developer">Senior React Developer</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Experience</label>
              <select
                className="form-input"
                value={filters.experience}
                onChange={(e) => setFilters({...filters, experience: e.target.value})}
              >
                <option value="">Any Experience</option>
                <option value="0-2">0-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-input"
                placeholder="City or Remote"
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Match Score</label>
              <select
                className="form-input"
                value={filters.matchScore}
                onChange={(e) => setFilters({...filters, matchScore: e.target.value})}
              >
                <option value="">Any Score</option>
                <option value="90+">90%+ (Excellent)</option>
                <option value="75-89">75-89% (Good)</option>
                <option value="60-74">60-74% (Average)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Candidates List */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'calc(var(--spacing) * 3)' }}>
            <h3>Candidates ({candidates.length})</h3>
            <div style={{ display: 'flex', gap: 'calc(var(--spacing) * 2)' }}>
              <button className="btn btn-secondary">Export CSV</button>
              <button className="btn btn-secondary">Bulk Actions</button>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E5E7EB' }}>
                  <th style={{ padding: 'calc(var(--spacing) * 2)', textAlign: 'left' }}>
                    <input type="checkbox" />
                  </th>
                  <th style={{ padding: 'calc(var(--spacing) * 2)', textAlign: 'left' }}>Candidate</th>
                  <th style={{ padding: 'calc(var(--spacing) * 2)', textAlign: 'left' }}>Position</th>
                  <th style={{ padding: 'calc(var(--spacing) * 2)', textAlign: 'left' }}>Experience</th>
                  <th style={{ padding: 'calc(var(--spacing) * 2)', textAlign: 'left' }}>Location</th>
                  <th style={{ padding: 'calc(var(--spacing) * 2)', textAlign: 'left' }}>Skills</th>
                  <th style={{ padding: 'calc(var(--spacing) * 2)', textAlign: 'left' }}>Match Score</th>
                  <th style={{ padding: 'calc(var(--spacing) * 2)', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: 'calc(var(--spacing) * 2)', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map(candidate => {
                  const statusStyle = getStatusColor(candidate.status);
                  const scoreStyle = getMatchScoreColor(candidate.matchScore);
                  
                  return (
                    <tr key={candidate.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <td style={{ padding: 'calc(var(--spacing) * 2)' }}>
                        <input type="checkbox" />
                      </td>
                      <td style={{ padding: 'calc(var(--spacing) * 2)' }}>
                        <div>
                          <div style={{ fontWeight: '500', marginBottom: 'calc(var(--spacing) / 2)' }}>
                            {candidate.name}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--text-grey)' }}>
                            {candidate.email}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: 'calc(var(--spacing) * 2)' }}>{candidate.position}</td>
                      <td style={{ padding: 'calc(var(--spacing) * 2)' }}>{candidate.experience}</td>
                      <td style={{ padding: 'calc(var(--spacing) * 2)' }}>{candidate.location}</td>
                      <td style={{ padding: 'calc(var(--spacing) * 2)' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'calc(var(--spacing) / 2)' }}>
                          {candidate.skills?.slice(0, 2).map((skill, index) => (
                            <span key={index} style={{
                              background: '#F3F4F6',
                              color: 'var(--text-grey)',
                              padding: 'calc(var(--spacing) / 2) calc(var(--spacing))',
                              borderRadius: 'var(--border-radius)',
                              fontSize: '11px'
                            }}>
                              {skill}
                            </span>
                          )) || []}
                          {(candidate.skills?.length || 0) > 2 && (
                            <span style={{ fontSize: '11px', color: 'var(--text-grey)' }}>
                              +{candidate.skills.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: 'calc(var(--spacing) * 2)' }}>
                        <span style={{
                          background: scoreStyle.bg,
                          color: scoreStyle.color,
                          padding: 'calc(var(--spacing) / 2) calc(var(--spacing))',
                          borderRadius: 'var(--border-radius)',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          {candidate.matchScore}%
                        </span>
                      </td>
                      <td style={{ padding: 'calc(var(--spacing) * 2)' }}>
                        <span style={{
                          background: statusStyle.bg,
                          color: statusStyle.color,
                          padding: 'calc(var(--spacing) / 2) calc(var(--spacing))',
                          borderRadius: 'var(--border-radius)',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          {candidate.status}
                        </span>
                      </td>
                      <td style={{ padding: 'calc(var(--spacing) * 2)' }}>
                        <div style={{ display: 'flex', gap: 'calc(var(--spacing))' }}>
                          <button 
                            className="btn btn-primary" 
                            style={{ fontSize: '12px', padding: 'calc(var(--spacing)) calc(var(--spacing) * 2)' }}
                          >
                            View Profile
                          </button>
                          <button 
                            className="btn btn-secondary" 
                            style={{ fontSize: '12px', padding: 'calc(var(--spacing)) calc(var(--spacing) * 2)' }}
                          >
                            Message
                          </button>
                        </div>
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

export default CandidatesList;
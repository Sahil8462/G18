import React, { useState } from 'react';
import Header from '../components/Header';
import LiveChat from '../components/LiveChat';

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const jobs = [
    {
      id: 1,
      title: '🤖 Senior AI/ML Engineer',
      company: 'TechCorp 2025',
      location: '🌐 Remote/Global',
      type: '⚡ Full-time',
      salary: '₹20-35 LPA',
      description: 'Build next-generation AI systems and machine learning models for global impact.',
      requirements: ['Python/TensorFlow', 'Deep Learning', 'MLOps', 'Cloud AI Services'],
      postedDate: '2024-01-15',
      featured: true
    },
    {
      id: 2,
      title: '⛓️ Blockchain Developer',
      company: 'CryptoLabs',
      location: '🏙️ Bangalore/Remote',
      type: '🚀 Full-time',
      salary: '₹18-28 LPA',
      description: 'Develop decentralized applications and smart contracts for Web3 ecosystem.',
      requirements: ['Solidity', 'Web3.js', 'DeFi Protocols', 'Smart Contracts'],
      postedDate: '2024-01-14',
      featured: true
    },
    {
      id: 3,
      title: '🥽 AR/VR Developer',
      company: 'MetaStudio',
      location: '🌟 Mumbai/Hybrid',
      type: '🎨 Full-time',
      salary: '₹15-25 LPA',
      description: 'Create immersive AR/VR experiences for the metaverse and gaming industry.',
      requirements: ['Unity 3D', 'C#', 'AR/VR SDKs', '3D Graphics'],
      postedDate: '2024-01-13',
      featured: true
    },
    {
      id: 4,
      title: '☁️ Cloud Architect',
      company: 'CloudTech',
      location: '🌍 Remote',
      type: '💼 Full-time',
      salary: '₹25-40 LPA',
      description: 'Design and implement scalable cloud infrastructure solutions.',
      requirements: ['AWS/Azure', 'Kubernetes', 'DevOps', 'Microservices'],
      postedDate: '2024-01-12'
    },
    {
      id: 5,
      title: '🔒 Cybersecurity Specialist',
      company: 'SecureNet',
      location: '🏢 Delhi/On-site',
      type: '🔐 Full-time',
      salary: '₹22-32 LPA',
      description: 'Protect digital assets and implement advanced security measures.',
      requirements: ['Ethical Hacking', 'Security Auditing', 'Penetration Testing', 'CISSP'],
      postedDate: '2024-01-11'
    },
    {
      id: 6,
      title: '📊 Data Scientist',
      company: 'DataLabs',
      location: '🌐 Remote/Flexible',
      type: '📈 Full-time',
      salary: '₹18-30 LPA',
      description: 'Extract insights from big data and build predictive models.',
      requirements: ['Python/R', 'Machine Learning', 'Statistics', 'Big Data'],
      postedDate: '2024-01-10'
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = !typeFilter || job.type === typeFilter;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div>
      <Header />
      <div style={{ padding: '2rem 0' }}>
      <div className="container">
        <h1 className="section">
          🔍 Discover Future Opportunities
        </h1>

        {/* AI Features */}
        <div className="card" style={{ marginBottom: '2rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))' }}>
          <h3 style={{ marginBottom: '1rem', color: '#6366f1' }}>🤖 AI-Powered Job Search</h3>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div>✨ Smart matching algorithm</div>
            <div>📊 Salary insights & predictions</div>
            <div>🎯 Personalized recommendations</div>
            <div>⚡ Real-time job alerts</div>
          </div>
        </div>

        {/* Filters */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="grid grid-cols-3">
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                🔍 Search Jobs
              </label>
              <input
                className="search-input"
                type="text"
                placeholder="🤖 AI, Blockchain, AR/VR..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid rgba(99, 102, 241, 0.2)',
                  borderRadius: '12px'
                }}
              />
            </div>
            
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                📍 Location
              </label>
              <input
                className="search-input"
                type="text"
                placeholder="🌐 Remote, Hybrid, On-site"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid rgba(99, 102, 241, 0.2)',
                  borderRadius: '12px'
                }}
              />
            </div>
            
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                💼 Job Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid rgba(99, 102, 241, 0.2)',
                  borderRadius: '12px'
                }}
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job Results */}
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ color: '#6b7280', fontSize: '1.1rem', fontWeight: '500' }}>
            🎯 Showing {filteredJobs.length} future-ready job{filteredJobs.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1" style={{ gap: '1.5rem' }}>
          {filteredJobs.map(job => (
            <div key={job.id} className="card">
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem',
                    color: '#0f172a'
                  }}>
                    {job.title}
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    marginBottom: '0.5rem',
                    fontSize: '1.1rem'
                  }}>
                    {job.company} • {job.location}
                  </p>
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '1rem',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      color: 'white',
                      padding: '0.4rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>
                      {job.type}
                    </span>
                    <span style={{
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: 'white',
                      padding: '0.4rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>
                      {job.salary}
                    </span>
                    {job.featured && (
                      <span style={{
                        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                        color: 'white',
                        padding: '0.4rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}>
                        🌟 Featured
                      </span>
                    )}
                  </div>
                </div>
                
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    alert(`Applying for ${job.title} at ${job.company}`);
                    // Add actual application logic here
                  }}
                >
                  🚀 Apply Now
                </button>
              </div>

              <p style={{
                marginBottom: '1rem',
                lineHeight: '1.6',
                fontSize: '1.05rem',
                color: '#374151'
              }}>
                {job.description}
              </p>

              <div>
                <h4 style={{
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  color: '#0f172a'
                }}>
                  ⚡ Requirements:
                </h4>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  {job.requirements.map((req, index) => (
                    <span
                      key={index}
                      style={{
                        background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
                        color: '#475569',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '12px',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        border: '1px solid rgba(99, 102, 241, 0.2)'
                      }}
                    >
                      ✨ {req}
                    </span>
                  ))}
                </div>
              </div>

              <p style={{
                color: '#9ca3af',
                fontSize: '0.875rem',
                marginTop: '1rem'
              }}>
                📅 Posted on {new Date(job.postedDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="card" style={{
            textAlign: 'center',
            padding: '3rem',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05))'
          }}>
            <h3>🔍 No jobs found</h3>
            <p style={{ color: '#6b7280', marginTop: '1rem' }}>
              Try adjusting your search criteria or explore our featured opportunities above.
            </p>
          </div>
        )}
      </div>
      <LiveChat />
    </div>
    </div>
  );
};

export default Jobs;
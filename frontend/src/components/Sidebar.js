import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ items, userType }) => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '700' }}>
          {userType === 'jobseeker' ? '🎯 Job Seeker' : '💼 Recruiter'}
        </h2>
      </div>
      
      <nav>
        {items.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
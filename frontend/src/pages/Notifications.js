import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const Notifications = () => {
  const [filter, setFilter] = useState('all');
  
  const sidebarItems = [
    { label: 'Dashboard', path: '/jobseeker/dashboard' },
    { label: 'Job Search', path: '/jobs' },
    { label: 'Applied Jobs', path: '/jobseeker/applied' },
    { label: 'Profile', path: '/profile' },
    { label: 'Notifications', path: '/notifications', active: true },
    { label: 'Settings', path: '/settings' }
  ];

  const notifications = [
    {
      id: 1,
      type: 'job_alert',
      title: 'New Job Match Found',
      message: 'Senior React Developer position at TechCorp matches your profile',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'application',
      title: 'Application Status Update',
      message: 'Your application for Frontend Developer at StartupXYZ has been shortlisted',
      time: '1 day ago',
      read: false
    },
    {
      id: 3,
      type: 'message',
      title: 'Message from Recruiter',
      message: 'HR Manager from InnovateLabs wants to schedule an interview',
      time: '2 days ago',
      read: true
    },
    {
      id: 4,
      type: 'job_alert',
      title: 'Job Recommendation',
      message: '5 new jobs matching your skills have been posted',
      time: '3 days ago',
      read: true
    }
  ];

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'job_alert': return '🔔';
      case 'application': return '📋';
      case 'message': return '💬';
      default: return '📢';
    }
  };

  const filteredNotifications = filter === 'all' ? notifications : 
    filter === 'unread' ? notifications.filter(n => !n.read) :
    notifications.filter(n => n.type === filter);

  return (
    <DashboardLayout sidebarItems={sidebarItems} userType="jobseeker">
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'calc(var(--spacing) * 4)' }}>
          <h1>Notifications</h1>
          <button className="btn btn-secondary">Mark All as Read</button>
        </div>
        
        {/* Filter Tabs */}
        <div className="card">
          <div style={{ display: 'flex', gap: 'calc(var(--spacing) * 2)', marginBottom: 'calc(var(--spacing) * 4)' }}>
            {['all', 'unread', 'job_alert', 'application', 'message'].map(type => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={filter === type ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ textTransform: 'capitalize' }}
              >
                {type === 'job_alert' ? 'Job Alerts' : 
                 type === 'all' ? 'All' : 
                 type === 'unread' ? 'Unread' : type}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(var(--spacing) * 2)' }}>
            {filteredNotifications.map(notification => (
              <div key={notification.id} style={{
                border: '1px solid #E5E7EB',
                borderRadius: 'calc(var(--border-radius) * 2)',
                padding: 'calc(var(--spacing) * 3)',
                backgroundColor: notification.read ? 'var(--white)' : '#F0F9FF',
                borderLeft: notification.read ? '4px solid #E5E7EB' : '4px solid var(--primary-blue)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'calc(var(--spacing) * 2)'
              }}>
                <div style={{ fontSize: '1.5rem' }}>
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'calc(var(--spacing))' }}>
                    <h4 style={{ 
                      fontWeight: notification.read ? '500' : '600',
                      color: notification.read ? 'var(--text-grey)' : 'var(--dark-blue)'
                    }}>
                      {notification.title}
                    </h4>
                    <span style={{ 
                      fontSize: '12px', 
                      color: 'var(--text-grey)',
                      whiteSpace: 'nowrap'
                    }}>
                      {notification.time}
                    </span>
                  </div>
                  
                  <p style={{ 
                    color: 'var(--text-grey)', 
                    marginBottom: 'calc(var(--spacing) * 2)',
                    lineHeight: '1.5'
                  }}>
                    {notification.message}
                  </p>
                  
                  <div style={{ display: 'flex', gap: 'calc(var(--spacing) * 2)' }}>
                    {notification.type === 'job_alert' && (
                      <button className="btn btn-primary" style={{ fontSize: '12px', padding: 'calc(var(--spacing)) calc(var(--spacing) * 2)' }}>
                        View Jobs
                      </button>
                    )}
                    {notification.type === 'application' && (
                      <button className="btn btn-primary" style={{ fontSize: '12px', padding: 'calc(var(--spacing)) calc(var(--spacing) * 2)' }}>
                        View Application
                      </button>
                    )}
                    {notification.type === 'message' && (
                      <button className="btn btn-primary" style={{ fontSize: '12px', padding: 'calc(var(--spacing)) calc(var(--spacing) * 2)' }}>
                        Reply
                      </button>
                    )}
                    {!notification.read && (
                      <button className="btn btn-secondary" style={{ fontSize: '12px', padding: 'calc(var(--spacing)) calc(var(--spacing) * 2)' }}>
                        Mark as Read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNotifications.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: 'calc(var(--spacing) * 6)',
              color: 'var(--text-grey)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: 'calc(var(--spacing) * 2)' }}>🔔</div>
              <h3>No notifications</h3>
              <p>You're all caught up! New notifications will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
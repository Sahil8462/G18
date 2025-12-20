import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [formData, setFormData] = useState({
    email: localStorage.getItem('userEmail') || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifications: true,
    jobAlerts: true,
    profileVisibility: 'public'
  });

  const sidebarItems = [
    { label: 'Dashboard', path: '/jobseeker/dashboard' },
    { label: 'Job Search', path: '/jobs' },
    { label: 'Applied Jobs', path: '/jobseeker/applied' },
    { label: 'Profile', path: '/profile' },
    { label: 'Settings', path: '/settings', active: true }
  ];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = (section) => {
    // Handle save logic here
    alert(`${section} settings saved successfully!`);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Handle account deletion
      alert('Account deletion requested. You will receive a confirmation email.');
    }
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} userType="jobseeker">
      <div>
        <h1>Settings</h1>
        
        {/* Tab Navigation */}
        <div className="card">
          <div style={{ display: 'flex', gap: 'calc(var(--spacing) * 2)', marginBottom: 'calc(var(--spacing) * 4)', borderBottom: '1px solid #E5E7EB' }}>
            {['account', 'security', 'notifications', 'privacy'].map(tab => (
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

          {/* Account Settings */}
          {activeTab === 'account' && (
            <div>
              <h3>Account Information</h3>
              <div style={{ maxWidth: '500px' }}>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Account Type</label>
                  <input
                    type="text"
                    className="form-input"
                    value="Job Seeker"
                    disabled
                    style={{ backgroundColor: '#F9FAFB' }}
                  />
                </div>

                <button 
                  className="btn btn-primary"
                  onClick={() => handleSave('Account')}
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div>
              <h3>Password & Security</h3>
              <div style={{ maxWidth: '500px' }}>
                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input
                    type="password"
                    className="form-input"
                    value={formData.currentPassword}
                    onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                    placeholder="Enter current password"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-input"
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-input"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>

                <button 
                  className="btn btn-primary"
                  onClick={() => handleSave('Password')}
                >
                  Update Password
                </button>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div>
              <h3>Notification Preferences</h3>
              <div style={{ maxWidth: '500px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: 'calc(var(--spacing) * 2) 0',
                  borderBottom: '1px solid #F3F4F6'
                }}>
                  <div>
                    <h4>Email Notifications</h4>
                    <p style={{ color: 'var(--text-grey)', fontSize: '14px' }}>
                      Receive updates about your applications and account
                    </p>
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.emailNotifications}
                      onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                      style={{ marginRight: 'calc(var(--spacing))' }}
                    />
                    <span>Enable</span>
                  </label>
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: 'calc(var(--spacing) * 2) 0',
                  borderBottom: '1px solid #F3F4F6'
                }}>
                  <div>
                    <h4>Job Alerts</h4>
                    <p style={{ color: 'var(--text-grey)', fontSize: '14px' }}>
                      Get notified about new job opportunities
                    </p>
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.jobAlerts}
                      onChange={(e) => handleInputChange('jobAlerts', e.target.checked)}
                      style={{ marginRight: 'calc(var(--spacing))' }}
                    />
                    <span>Enable</span>
                  </label>
                </div>

                <button 
                  className="btn btn-primary"
                  style={{ marginTop: 'calc(var(--spacing) * 3)' }}
                  onClick={() => handleSave('Notification')}
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* Privacy Settings */}
          {activeTab === 'privacy' && (
            <div>
              <h3>Privacy & Data</h3>
              <div style={{ maxWidth: '500px' }}>
                <div className="form-group">
                  <label className="form-label">Profile Visibility</label>
                  <select
                    className="form-input"
                    value={formData.profileVisibility}
                    onChange={(e) => handleInputChange('profileVisibility', e.target.value)}
                  >
                    <option value="public">Public - Visible to all recruiters</option>
                    <option value="limited">Limited - Only to applied companies</option>
                    <option value="private">Private - Not visible to recruiters</option>
                  </select>
                </div>

                <div style={{ 
                  background: '#FEF2F2', 
                  border: '1px solid #FECACA',
                  borderRadius: 'var(--border-radius)',
                  padding: 'calc(var(--spacing) * 3)',
                  marginTop: 'calc(var(--spacing) * 4)'
                }}>
                  <h4 style={{ color: '#DC2626', marginBottom: 'calc(var(--spacing) * 2)' }}>
                    Danger Zone
                  </h4>
                  <p style={{ color: '#7F1D1D', marginBottom: 'calc(var(--spacing) * 3)' }}>
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button 
                    onClick={handleDeleteAccount}
                    style={{
                      background: '#DC2626',
                      color: 'white',
                      border: 'none',
                      padding: 'calc(var(--spacing) * 2) calc(var(--spacing) * 3)',
                      borderRadius: 'var(--border-radius)',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
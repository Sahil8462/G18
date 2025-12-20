import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ProfessionalSettings = () => {
  const { user, logout } = useAuth();
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: true,
    profileVisibility: 'public'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      logout();
      alert('Account deleted successfully');
    }
  };

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-8">Account Settings</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Profile Settings */}
          <div className="glass p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Full Name</label>
                <input className="form-input" defaultValue={user?.name} />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Email</label>
                <input className="form-input" defaultValue={user?.email} />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Profile Visibility</label>
                <select 
                  className="form-input"
                  value={settings.profileVisibility}
                  onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="connections">Connections Only</option>
                </select>
              </div>
              <button className="btn shimmer-btn w-full" onClick={handleSave}>
                Save Profile Changes
              </button>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="glass p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Push Notifications</span>
                <button 
                  className={`w-12 h-6 rounded-full ${settings.notifications ? 'bg-indigo-500' : 'bg-gray-600'} relative transition-colors`}
                  onClick={() => handleSettingChange('notifications', !settings.notifications)}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${settings.notifications ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Email Updates</span>
                <button 
                  className={`w-12 h-6 rounded-full ${settings.emailUpdates ? 'bg-indigo-500' : 'bg-gray-600'} relative transition-colors`}
                  onClick={() => handleSettingChange('emailUpdates', !settings.emailUpdates)}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${settings.emailUpdates ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                </button>
              </div>
              <button className="btn shimmer-btn w-full" onClick={handleSave}>
                Save Notification Settings
              </button>
            </div>
          </div>

          {/* Security Settings */}
          <div className="glass p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Security</h2>
            <div className="space-y-4">
              <button className="btn btn-secondary w-full" onClick={() => alert('Password change functionality coming soon!')}>
                Change Password
              </button>
              <button className="btn btn-secondary w-full" onClick={() => alert('Two-factor authentication setup coming soon!')}>
                Enable 2FA
              </button>
              <button className="btn w-full bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30" onClick={handleDeleteAccount}>
                Delete Account
              </button>
            </div>
          </div>

          {/* Help & Support */}
          <div className="glass p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Help & Support</h2>
            <div className="space-y-4">
              <button className="btn btn-secondary w-full" onClick={() => window.open('/contact', '_blank')}>
                Contact Support
              </button>
              <button className="btn btn-secondary w-full" onClick={() => alert('FAQ page coming soon!')}>
                View FAQ
              </button>
              <button className="btn btn-secondary w-full" onClick={() => alert('User guide coming soon!')}>
                User Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSettings;
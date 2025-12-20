import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    try {
      await axios.put('/api/user/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      alert('Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
    } catch (error) {
      alert('Error changing password. Please check your current password.');
      console.error('Error changing password:', error);
    }
  };

  const handleDeactivateAccount = async () => {
    const confirmation = prompt('Type "DELETE" to confirm account deactivation:');
    
    if (confirmation === 'DELETE') {
      try {
        await axios.put('/api/user/deactivate');
        alert('Account deactivated successfully!');
        localStorage.clear();
        navigate('/');
      } catch (error) {
        alert('Error deactivating account. Please try again.');
        console.error('Error deactivating account:', error);
      }
    } else if (confirmation !== null) {
      alert('Account deactivation cancelled. Please type "DELETE" exactly to confirm.');
    }
  };

  return (
    <div className="card" style={{padding: '2rem', marginTop: '2rem'}}>
      <h3 style={{marginBottom: '2rem', color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '0.5rem'}}>
        Profile Settings
      </h3>

      {/* Change Password Section */}
      <section style={{marginBottom: '2rem'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
          <h4>Change Password</h4>
          <button 
            className="btn-secondary"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
          >
            {showPasswordForm ? 'Cancel' : 'Change Password'}
          </button>
        </div>

        {showPasswordForm && (
          <form onSubmit={handlePasswordChange} style={{backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '8px'}}>
            <div style={{marginBottom: '1rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold'}}>
                Current Password:
              </label>
              <input 
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                required
                style={{
                  width: '100%', 
                  padding: '0.8rem', 
                  border: '1px solid #ddd', 
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem'}}>
              <div>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold'}}>
                  New Password:
                </label>
                <input 
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  required
                  minLength="6"
                  style={{
                    width: '100%', 
                    padding: '0.8rem', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold'}}>
                  Confirm New Password:
                </label>
                <input 
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  required
                  minLength="6"
                  style={{
                    width: '100%', 
                    padding: '0.8rem', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>

            <div style={{display: 'flex', gap: '1rem'}}>
              <button type="submit" className="btn-primary">
                Update Password
              </button>
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => setShowPasswordForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Account Deactivation Section */}
      <section style={{padding: '1.5rem', backgroundColor: '#fff5f5', border: '1px solid #fed7d7', borderRadius: '8px'}}>
        <h4 style={{color: '#c53030', marginBottom: '1rem'}}>Danger Zone</h4>
        <p style={{color: '#666', marginBottom: '1rem'}}>
          Once you deactivate your account, you will lose access to all your data and it cannot be recovered.
        </p>
        
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <button 
            onClick={handleDeactivateAccount}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Deactivate Account
          </button>
          <span style={{fontSize: '0.9rem', color: '#666'}}>
            This action cannot be undone
          </span>
        </div>
      </section>

      {/* Privacy Settings */}
      <section style={{marginTop: '2rem'}}>
        <h4 style={{marginBottom: '1rem'}}>Privacy Settings</h4>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <input type="checkbox" defaultChecked />
            <span>Allow recruiters to contact me</span>
          </label>
          <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <input type="checkbox" defaultChecked />
            <span>Show my profile in search results</span>
          </label>
          <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <input type="checkbox" />
            <span>Send me email notifications for new job matches</span>
          </label>
          <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <input type="checkbox" />
            <span>Send me weekly job digest emails</span>
          </label>
        </div>
        <button className="btn-secondary" style={{marginTop: '1rem'}}>
          Save Privacy Settings
        </button>
      </section>
    </div>
  );
};

export default ProfileSettings;
import React, { useState, useEffect } from 'react';
import authService from '../services/authService';

const HealthCheck = () => {
  const [healthStatus, setHealthStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [testEmail, setTestEmail] = useState('');
  const [testPhone, setTestPhone] = useState('');
  const [testResults, setTestResults] = useState({});
  const [quickStatus, setQuickStatus] = useState({ backend: 'testing', email: 'testing' });

  useEffect(() => {
    checkHealth();
    testQuickConnections();
  }, []);

  const checkHealth = async () => {
    try {
      const response = await fetch('http://localhost:8083/api/health/check');
      const data = await response.json();
      setHealthStatus(data);
    } catch (error) {
      setHealthStatus({ 
        overall: 'CONNECTION_FAILED', 
        error: 'Cannot connect to backend server' 
      });
    } finally {
      setLoading(false);
    }
  };

  const testQuickConnections = async () => {
    try {
      const backendTest = await fetch('http://localhost:8083/api/health/check');
      setQuickStatus(prev => ({ 
        ...prev, 
        backend: backendTest.ok ? 'connected' : 'failed' 
      }));
    } catch (error) {
      setQuickStatus(prev => ({ ...prev, backend: 'failed' }));
    }

    try {
      const emailTest = await authService.testConnection();
      setQuickStatus(prev => ({ 
        ...prev, 
        email: emailTest.success ? 'working' : 'failed',
        emailError: emailTest.message
      }));
    } catch (error) {
      setQuickStatus(prev => ({ 
        ...prev, 
        email: 'failed',
        emailError: error.message
      }));
    }
  };

  const testEmailConnection = async () => {
    if (!testEmail) {
      alert('Please enter an email address');
      return;
    }

    try {
      const response = await fetch('http://localhost:8083/api/health/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: testEmail })
      });
      
      const result = await response.json();
      setTestResults(prev => ({ ...prev, email: result }));
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        email: { success: false, message: 'Network error: ' + error.message } 
      }));
    }
  };

  const testSMSConnection = async () => {
    if (!testPhone) {
      alert('Please enter a phone number');
      return;
    }

    try {
      const response = await fetch('http://localhost:8083/api/health/test-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: testPhone })
      });
      
      const result = await response.json();
      setTestResults(prev => ({ ...prev, sms: result }));
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        sms: { success: false, message: 'Network error: ' + error.message } 
      }));
    }
  };

  const getStatusColor = (status) => {
    if (status === true || status === 'HEALTHY') return '#4CAF50';
    if (status === false) return '#f44336';
    return '#ff9800';
  };

  const getStatusText = (status) => {
    if (status === true) return '✅ Connected';
    if (status === false) return '❌ Failed';
    if (status === 'HEALTHY') return '✅ All Systems Healthy';
    if (status === 'ISSUES_DETECTED') return '⚠️ Issues Detected';
    return '❓ Unknown';
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Checking System Health...</h2>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', position: 'relative' }}>
      {/* Quick Status Indicator */}
      <div style={{ 
        position: 'fixed', 
        top: '10px', 
        right: '10px', 
        background: 'white', 
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        zIndex: 1000,
        minWidth: '200px'
      }}>
        <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>Quick Status</div>
        <div style={{ fontSize: '11px', marginBottom: '3px' }}>
          Backend: <span style={{ color: quickStatus.backend === 'connected' ? '#4CAF50' : '#f44336' }}>
            {quickStatus.backend === 'connected' ? '✅' : '❌'}
          </span>
        </div>
        <div style={{ fontSize: '11px' }}>
          Email: <span style={{ color: quickStatus.email === 'working' ? '#4CAF50' : '#f44336' }}>
            {quickStatus.email === 'working' ? '✅' : '❌'}
          </span>
        </div>
        {quickStatus.emailError && quickStatus.email === 'failed' && (
          <div style={{ fontSize: '10px', color: '#f44336', marginTop: '5px' }}>
            {quickStatus.emailError.includes('Authentication failed') ? '🔑 App password expired' : 'Email failed'}
          </div>
        )}
      </div>
      
      <h1>SmartHire System Health Check</h1>
      
      {healthStatus && (
        <div style={{ marginBottom: '30px' }}>
          <h2>System Status</h2>
          <div style={{ 
            padding: '15px', 
            border: '1px solid #ddd', 
            borderRadius: '8px',
            backgroundColor: '#f9f9f9'
          }}>
            <div style={{ marginBottom: '10px' }}>
              <strong>Overall Status: </strong>
              <span style={{ color: getStatusColor(healthStatus.overall) }}>
                {getStatusText(healthStatus.overall)}
              </span>
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <strong>Database: </strong>
              <span style={{ color: getStatusColor(healthStatus.database) }}>
                {getStatusText(healthStatus.database)}
              </span>
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <strong>Email Service: </strong>
              <span style={{ color: getStatusColor(healthStatus.email) }}>
                {getStatusText(healthStatus.email)}
              </span>
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <strong>Twilio SMS: </strong>
              <span style={{ color: getStatusColor(healthStatus.twilio) }}>
                {getStatusText(healthStatus.twilio)}
              </span>
            </div>
            
            {healthStatus.error && (
              <div style={{ color: '#f44336', marginTop: '10px' }}>
                <strong>Error: </strong>{healthStatus.error}
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{ marginBottom: '30px' }}>
        <h2>Test Email Service</h2>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="email"
            placeholder="Enter test email address"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            style={{ 
              padding: '10px', 
              width: '300px', 
              marginRight: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          <button 
            onClick={testEmailConnection}
            style={{
              padding: '10px 20px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Test Email
          </button>
        </div>
        
        {testResults.email && (
          <div style={{ 
            padding: '10px', 
            border: '1px solid #ddd', 
            borderRadius: '4px',
            backgroundColor: testResults.email.success ? '#e8f5e8' : '#ffeaea'
          }}>
            <strong>Email Test Result: </strong>
            <span style={{ color: testResults.email.success ? '#4CAF50' : '#f44336' }}>
              {testResults.email.message}
            </span>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>Test SMS Service</h2>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="tel"
            placeholder="Enter test phone number (+1234567890)"
            value={testPhone}
            onChange={(e) => setTestPhone(e.target.value)}
            style={{ 
              padding: '10px', 
              width: '300px', 
              marginRight: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          <button 
            onClick={testSMSConnection}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Test SMS
          </button>
        </div>
        
        {testResults.sms && (
          <div style={{ 
            padding: '10px', 
            border: '1px solid #ddd', 
            borderRadius: '4px',
            backgroundColor: testResults.sms.success ? '#e8f5e8' : '#ffeaea'
          }}>
            <strong>SMS Test Result: </strong>
            <span style={{ color: testResults.sms.success ? '#4CAF50' : '#f44336' }}>
              {testResults.sms.message}
            </span>
          </div>
        )}
      </div>

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h3>Configuration Notes:</h3>
        <ul>
          <li><strong>Database:</strong> Using H2 file-based database at ./data/smarthire</li>
          <li><strong>Email:</strong> Gmail SMTP configuration required in application.properties</li>
          <li><strong>Twilio:</strong> Valid Account SID and Auth Token required for SMS functionality</li>
          <li><strong>Frontend-Backend:</strong> Frontend runs on port 3000, Backend on port 8083</li>
        </ul>
      </div>

      <button 
        onClick={() => { checkHealth(); testQuickConnections(); }}
        style={{
          padding: '10px 20px',
          backgroundColor: '#ff9800',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Refresh All Tests
      </button>
    </div>
  );
};

export default HealthCheck;
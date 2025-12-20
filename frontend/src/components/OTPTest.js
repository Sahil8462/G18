import React, { useState } from 'react';

const OTPTest = () => {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState('');

  const testOTP = async () => {
    try {
      const response = await fetch('http://localhost:8083/api/auth/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
      
      if (data.debug_otp) {
        alert('OTP: ' + data.debug_otp);
      }
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h3>OTP Test</h3>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <button onClick={testOTP} style={{ padding: '10px 20px' }}>
        Test OTP
      </button>
      <pre style={{ background: '#f5f5f5', padding: '10px', marginTop: '10px' }}>
        {result}
      </pre>
    </div>
  );
};

export default OTPTest;
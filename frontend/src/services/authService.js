const API_BASE_URL = 'http://localhost:8083/api';

const handleResponse = async (response) => {
  const data = await response.json();
  return { success: response.ok, ...data };
};

const authService = {
  async testConnection() {
    try {
      const response = await fetch(`${API_BASE_URL}/health/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      return await handleResponse(response);
    } catch (error) {
      return { success: false, message: 'Backend connection failed: ' + error.message };
    }
  },

  async sendOTP(email) {
    try {
      console.log('Sending OTP to:', email);
      const response = await fetch(`${API_BASE_URL}/otp/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }
      
      const result = await response.json();
      console.log('OTP Response:', result);
      return result;
    } catch (error) {
      console.error('OTP Send Error:', error);
      return { success: false, message: error.message };
    }
  },

  async verifyOTP(email, otp) {
    try {
      const response = await fetch(`${API_BASE_URL}/otp/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ identifier: email, otpCode: otp })
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  async login(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
};

export default authService;
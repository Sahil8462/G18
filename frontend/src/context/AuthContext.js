import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('smartHireUser');
    const sessionExpiry = localStorage.getItem('smartHireSessionExpiry');
    
    if (storedUser && sessionExpiry) {
      const now = new Date().getTime();
      if (now < parseInt(sessionExpiry)) {
        setUser(JSON.parse(storedUser));
      } else {
        localStorage.removeItem('smartHireUser');
        localStorage.removeItem('smartHireSessionExpiry');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    const sessionExpiry = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours
    setUser(userData);
    localStorage.setItem('smartHireUser', JSON.stringify(userData));
    localStorage.setItem('smartHireSessionExpiry', sessionExpiry.toString());
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smartHireUser');
    localStorage.removeItem('smartHireSessionExpiry');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
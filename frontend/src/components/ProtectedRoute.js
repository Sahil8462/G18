import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole, blockAuthenticated = false }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--gradient-primary)'
      }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⏳</div>
          <h3 style={{ color: 'white' }}>Loading SmartHire...</h3>
        </div>
      </div>
    );
  }

  // Block authenticated users from login/register pages
  if (blockAuthenticated && isAuthenticated) {
    const redirectPath = user?.role === 'recruiter' ? '/recruiter/dashboard' : '/jobseeker/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  if (!isAuthenticated && !blockAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    const redirectPath = user?.role === 'recruiter' ? '/recruiter/dashboard' : '/jobseeker/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
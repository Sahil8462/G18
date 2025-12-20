import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProfessionalHeader from './components/ProfessionalHeader';

// Lazy load components
const ProfessionalHome = lazy(() => import('./pages/ProfessionalHome'));
const ProfessionalLogin = lazy(() => import('./pages/ProfessionalLogin'));
const ProfessionalRegister = lazy(() => import('./pages/ProfessionalRegister'));
const ProfessionalAbout = lazy(() => import('./pages/ProfessionalAbout'));
const ProfessionalContact = lazy(() => import('./pages/ProfessionalContact'));
const ProfessionalJobSeekerDashboard = lazy(() => import('./pages/ProfessionalJobSeekerDashboard'));
const ProfessionalRecruiterDashboard = lazy(() => import('./pages/ProfessionalRecruiterDashboard'));
const ProfessionalSettings = lazy(() => import('./pages/ProfessionalSettings'));

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole = null, blockAuthenticated = false }) => {
  const { isAuthenticated, user } = useAuth();

  if (blockAuthenticated && isAuthenticated) {
    return <Navigate to={user?.role === 'recruiter' ? '/recruiter/dashboard' : '/jobseeker/dashboard'} replace />;
  }

  if (!blockAuthenticated && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Loading component
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
  </div>
);

// App Layout Component
const AppLayout = ({ children }) => (
  <div className="min-h-screen">
    <ProfessionalHeader />
    <main>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </main>
  </div>
);

function ProfessionalApp() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<ProfessionalHome />} />
            <Route path="/about" element={<ProfessionalAbout />} />
            <Route path="/contact" element={<ProfessionalContact />} />
            
            {/* Auth Routes - Block if already authenticated */}
            <Route 
              path="/login" 
              element={
                <ProtectedRoute blockAuthenticated={true}>
                  <ProfessionalLogin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <ProtectedRoute blockAuthenticated={true}>
                  <ProfessionalRegister />
                </ProtectedRoute>
              } 
            />
            
            {/* Protected Dashboard Routes */}
            <Route 
              path="/jobseeker/dashboard" 
              element={
                <ProtectedRoute requiredRole="jobseeker">
                  <ProfessionalJobSeekerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/recruiter/dashboard" 
              element={
                <ProtectedRoute requiredRole="recruiter">
                  <ProfessionalRecruiterDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Settings Route */}
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <ProfessionalSettings />
                </ProtectedRoute>
              } 
            />
            
            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppLayout>
      </Router>
    </AuthProvider>
  );
}

export default ProfessionalApp;
import './App.css';
import { Routes, Route } from 'react-router-dom';
import GuestHomePage from './pages/GuestHomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import PlaceholderPage from './pages/PlaceholderPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<GuestHomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/my-network" element={
          <ProtectedRoute>
            <PlaceholderPage title="My Network" />
          </ProtectedRoute>
        } />
        <Route path="/jobs" element={
          <ProtectedRoute>
            <PlaceholderPage title="Jobs" />
          </ProtectedRoute>
        } />
        <Route path="/messages" element={
          <ProtectedRoute>
            <PlaceholderPage title="Messages" />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;


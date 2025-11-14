import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/userContext';
import { Toaster } from 'react-hot-toast';
import './App.css';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Dashboard from './pages/Home/Dashboard';
import CreateSessionForm from './pages/Home/CreateSessionForm';
import InterviewPrep from './pages/Ip/InterviewPrep';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import TermsOfService from './pages/legal/TermOfServie';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import Profile from './pages/profile/Profile';
import EditProfile from './pages/profile/EditProfile';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';


function AppContent() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }


  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
      <Route path="/signin" element={<Navigate to="/login" replace />} />
      <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />
      <Route path="/register" element={<Navigate to="/signup" replace />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />

      {/* Protected routes */}
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      <Route path="/create-session" element={
        <PrivateRoute>
          <CreateSessionForm />
        </PrivateRoute>
      } />
      <Route path="/interview-prep/:sessionId" element={
        <PrivateRoute>
          <InterviewPrep />
        </PrivateRoute>
      } />
      <Route path="/profile" element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      } />
      <Route path="/profile/edit" element={
        <PrivateRoute>
          <EditProfile />
        </PrivateRoute>
      } />


      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// Guest route component to redirect authenticated users away from auth pages
function GuestRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}

function App() {
  return (
    <div className="min-h-screen">
      <AppContent />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'linear-gradient(135deg, #14B8A6, #06B6D4)',
            color: '#fff',
            borderRadius: '12px',
            border: '1px solid rgba(20, 184, 166, 0.3)',
            fontFamily: 'Outfit, sans-serif',
          },
        }}
      />
    </div>
  );
}

export default App;
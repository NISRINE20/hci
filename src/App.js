import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AnnouncementPage from './pages/AnnouncementPage';
import DepartmentPage from './pages/DepartmentPage';
import EventPage from './pages/EventPage';
import RegisterPage from './pages/RegisterPage';

// ProtectedRoute component
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const role = localStorage.getItem('role');
  if (isLoggedIn === 'true' && role === 'superadmin') {
    return children;
  }
  return <Navigate to="/" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/announcement"
          element={
            <ProtectedRoute>
              <AnnouncementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/department"
          element={
            <ProtectedRoute>
              <DepartmentPage />
            </ProtectedRoute>
          }
        />
        <Route path="/event" element={<EventPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;

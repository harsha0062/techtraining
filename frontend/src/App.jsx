import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Licenses from './pages/Licenses';
import Documents from './pages/Documents';
import Login from './pages/Login';
import Register from './pages/Register';
import './index.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const Settings = () => (
  <div className="data-section">
    <div className="data-header">
      <h3>System Settings</h3>
    </div>
    <div style={{ padding: '24px', color: '#64748b' }}>
      <p>System configuration and preferences will appear here.</p>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="licenses" element={<Licenses />} />
          <Route path="documents" element={<Documents />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HeaderWithModal from "./components/HeaderWithModal";
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { isAuthenticated } from './utils/auth';

function App() {
  return (
    <Router>
    <HeaderWithModal />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

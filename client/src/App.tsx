import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import { NoteProvider } from './contexts/NoteContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import NotePage from './pages/NotePage';

const App: React.FC = () => (
  <AuthProvider>
    <NoteProvider>
      <Router>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/notes/new" element={<PrivateRoute><NotePage /></PrivateRoute>} />
          <Route path="/notes/:id" element={<PrivateRoute><NotePage /></PrivateRoute>} />
        </Routes>
      </Router>
    </NoteProvider>
  </AuthProvider>
  );

export default App;

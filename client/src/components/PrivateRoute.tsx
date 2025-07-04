import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { state } = useAuth();
  const { isAuthenticated } = state;

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute; 
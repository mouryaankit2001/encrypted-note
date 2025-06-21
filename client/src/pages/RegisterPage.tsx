import React from 'react';
import { Container, Paper, Box } from '@mui/material';
import RegisterForm from '../components/RegisterForm';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage: React.FC = () => {
  const { state } = useAuth();
  const { isAuthenticated } = state;

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <RegisterForm />
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage; 
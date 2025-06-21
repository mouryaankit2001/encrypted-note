import React from 'react';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { state } = useAuth();
  const { isAuthenticated } = state;

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Container maxWidth="md">
      <Box
        my={8}
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Encrypted Notes Manager
        </Typography>
        <Typography variant="h5" component="p" color="textSecondary" paragraph>
          A secure way to store your personal notes. All notes are encrypted and can only be accessed by you.
        </Typography>

        <Box mt={4} display="flex" gap={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/register"
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            component={RouterLink}
            to="/login"
          >
            Login
          </Button>
        </Box>

        <Paper elevation={3} sx={{ mt: 6, p: 4, width: '100%' }}>
          <Typography variant="h5" gutterBottom>
            Features
          </Typography>
          <Box mt={2}>
            <Typography variant="body1" paragraph>
              ✅ End-to-end encryption for all your notes
            </Typography>
            <Typography variant="body1" paragraph>
              ✅ Secure authentication system
            </Typography>
            <Typography variant="body1" paragraph>
              ✅ Simple and intuitive interface
            </Typography>
            <Typography variant="body1" paragraph>
              ✅ Create, edit, and delete notes with ease
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default HomePage; 
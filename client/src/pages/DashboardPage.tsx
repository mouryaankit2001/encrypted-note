import React from 'react';
import { Container, Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import NotesList from '../components/NotesList';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage: React.FC = () => {
  const { state } = useAuth();
  const { user } = state;

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" component="h1">
            Welcome{user?.name ? `, ${user.name}` : ''}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/notes/new"
          >
            Create New Note
          </Button>
        </Box>
        <NotesList />
      </Box>
    </Container>
  );
};

export default DashboardPage; 
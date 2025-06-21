import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { state, logout } = useAuth();
  const { isAuthenticated } = state;

  const authLinks = (
    <>
      <Button color="inherit" component={RouterLink} to="/dashboard">Dashboard</Button>
      <Button color="inherit" component={RouterLink} to="/notes/new">Create Note</Button>
      <Button color="inherit" onClick={logout}>Logout</Button>
    </>
  );

  const guestLinks = (
    <>
      <Button color="inherit" component={RouterLink} to="/login">Login</Button>
      <Button color="inherit" component={RouterLink} to="/register">Register</Button>
    </>
  );

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ color: 'white', textDecoration: 'none' }}>
          Encrypted Notes
        </Typography>
        <Box>
          {isAuthenticated ? authLinks : guestLinks}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 
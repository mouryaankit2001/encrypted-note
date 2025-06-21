import React from 'react';
import { Container } from '@mui/material';
import NoteForm from '../components/NoteForm';

const NotePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <NoteForm />
    </Container>
  );
};

export default NotePage; 
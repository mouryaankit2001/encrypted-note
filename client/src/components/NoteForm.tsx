import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Alert, CircularProgress } from '@mui/material';
import { useNotes } from '../contexts/NoteContext';
import { useNavigate, useParams } from 'react-router-dom';

const NoteForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { state, createNote, updateNote, getNoteById, clearCurrentNote } = useNotes();
  const { isLoading, error, currentNote } = state;
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (id) getNoteById(id);
    return () => clearCurrentNote();
  }, [id]);

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setContent(currentNote.content);
    }
  }, [currentNote]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    if (id) {
      await updateNote(id, title, content);
    } else {
      await createNote(title, content);
    }

    navigate('/dashboard');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        {isEditMode ? 'Edit Note' : 'Create Note'}
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth required />
      <TextField label="Content" value={content} onChange={(e) => setContent(e.target.value)} fullWidth required multiline rows={10} />

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : isEditMode ? 'Update' : 'Create'}
        </Button>
        <Button variant="outlined" onClick={() => navigate('/dashboard')}>Cancel</Button>
      </Box>
    </Box>
  );
};

export default NoteForm; 
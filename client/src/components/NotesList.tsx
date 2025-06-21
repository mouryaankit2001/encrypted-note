import React, { useEffect } from 'react';
import { useNotes } from '../contexts/NoteContext';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Button,
  CircularProgress, 
  Alert, 
  Paper 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotesList: React.FC = () => {
  const { state, getNotes, deleteNote } = useNotes();
  const { notes, isLoading, error } = state;
  const navigate = useNavigate();

  useEffect(() => {
    getNotes();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/notes/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      await deleteNote(id);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        My Notes
      </Typography>

      {notes.length === 0 ? (
        <Typography color="text.secondary">No notes found. Create your first note!</Typography>
      ) : (
        <List sx={{ width: '100%' }}>
          {notes.map((note) => (
            <ListItem
              key={note._id}
              component={Paper}
              sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', p: 2 }}
            >
              <ListItemText
                primary={note.title}
                secondary={
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {note.content}
                  </Typography>
                }
                primaryTypographyProps={{
                  fontWeight: 'medium',
                  color: 'primary.main',
                }}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', gap: 1, alignSelf: 'flex-end' }}>
                <Button 
                  size="small" 
                  variant="outlined" 
                  color="primary" 
                  onClick={() => handleEdit(note._id)}
                >
                  Edit
                </Button>
                <Button 
                  size="small" 
                  variant="outlined" 
                  color="error" 
                  onClick={() => handleDelete(note._id)}
                >
                  Delete
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default NotesList; 
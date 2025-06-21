import React, { createContext, useContext, useReducer } from 'react';
import api from '../services/api';
import { Note, NoteState } from '../types';
import { encryptData, decryptData } from '../services/encryptionService';

type NoteAction =
  | { type: 'REQUEST_START' }
  | { type: 'GET_NOTES_SUCCESS'; payload: Note[] }
  | { type: 'GET_NOTE_SUCCESS'; payload: Note }
  | { type: 'CREATE_NOTE_SUCCESS'; payload: Note }
  | { type: 'UPDATE_NOTE_SUCCESS'; payload: Note }
  | { type: 'DELETE_NOTE_SUCCESS'; payload: string }
  | { type: 'REQUEST_FAIL'; payload: string }
  | { type: 'CLEAR_CURRENT_NOTE' };

const initialState: NoteState = {
  notes: [],
  currentNote: null,
  isLoading: false,
  error: null,
};

const NoteContext = createContext<{
  state: NoteState;
  getNotes: () => Promise<void>;
  getNoteById: (id: string) => Promise<void>;
  createNote: (title: string, content: string) => Promise<void>;
  updateNote: (id: string, title: string, content: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  clearCurrentNote: () => void;
}>({
  state: initialState,
  getNotes: async () => {},
  getNoteById: async () => {},
  createNote: async () => {},
  updateNote: async () => {},
  deleteNote: async () => {},
  clearCurrentNote: () => {},
});

const noteReducer = (state: NoteState, action: NoteAction): NoteState => {
  switch (action.type) {
    case 'REQUEST_START':
      return { ...state, isLoading: true, error: null };
    case 'GET_NOTES_SUCCESS':
      return { ...state, isLoading: false, notes: action.payload, error: null };
    case 'GET_NOTE_SUCCESS':
      return { ...state, isLoading: false, currentNote: action.payload, error: null };
    case 'CREATE_NOTE_SUCCESS':
      return { ...state, isLoading: false, notes: [action.payload, ...state.notes], currentNote: action.payload, error: null };
    case 'UPDATE_NOTE_SUCCESS':
      return { 
        ...state, 
        isLoading: false, 
        notes: state.notes.map((note) => note._id === action.payload._id ? action.payload : note),
        currentNote: action.payload, 
        error: null 
      };
    case 'DELETE_NOTE_SUCCESS':
      return { ...state, isLoading: false, notes: state.notes.filter((note) => note._id !== action.payload), error: null };
    case 'REQUEST_FAIL':
      return { ...state, isLoading: false, error: action.payload };
    case 'CLEAR_CURRENT_NOTE':
      return { ...state, currentNote: null };
    default:
      return state;
  }
};

export const NoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(noteReducer, initialState);

  const handleError = (error: any, message: string) => {
    dispatch({
      type: 'REQUEST_FAIL',
      payload: error.response?.data?.message || message,
    });
  };
  
  const processNote = (note: any) => ({
    ...note,
    title: decryptData(note.title),
    content: decryptData(note.content),
  });

  const getNotes = async () => {
    try {
      dispatch({ type: 'REQUEST_START' });
      const { data } = await api.get('/notes');
      const decryptedNotes = data.map(processNote);
      dispatch({ type: 'GET_NOTES_SUCCESS', payload: decryptedNotes });
    } catch (error: any) {
      handleError(error, 'Failed to fetch notes');
    }
  };

  const getNoteById = async (id: string) => {
    try {
      dispatch({ type: 'REQUEST_START' });
      const { data } = await api.get(`/notes/${id}`);
      dispatch({ type: 'GET_NOTE_SUCCESS', payload: processNote(data) });
    } catch (error: any) {
      handleError(error, 'Failed to fetch note');
    }
  };

  const createNote = async (title: string, content: string) => {
    try {
      dispatch({ type: 'REQUEST_START' });
      const { data } = await api.post('/notes', {
        title: encryptData(title),
        content: encryptData(content),
      });
      dispatch({ type: 'CREATE_NOTE_SUCCESS', payload: { ...data, title, content } });
    } catch (error: any) {
      handleError(error, 'Failed to create note');
    }
  };

  const updateNote = async (id: string, title: string, content: string) => {
    try {
      dispatch({ type: 'REQUEST_START' });
      const { data } = await api.put(`/notes/${id}`, {
        title: encryptData(title),
        content: encryptData(content),
      });
      dispatch({ type: 'UPDATE_NOTE_SUCCESS', payload: { ...data, title, content } });
    } catch (error: any) {
      handleError(error, 'Failed to update note');
    }
  };

  const deleteNote = async (id: string) => {
    try {
      dispatch({ type: 'REQUEST_START' });
      await api.delete(`/notes/${id}`);
      dispatch({ type: 'DELETE_NOTE_SUCCESS', payload: id });
    } catch (error: any) {
      handleError(error, 'Failed to delete note');
    }
  };

  const clearCurrentNote = () => dispatch({ type: 'CLEAR_CURRENT_NOTE' });

  return (
    <NoteContext.Provider
      value={{
        state,
        getNotes,
        getNoteById,
        createNote,
        updateNote,
        deleteNote,
        clearCurrentNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => useContext(NoteContext);

export default NoteContext; 
const express = require('express');
const { createNote, getNotes, getNoteById, updateNote, deleteNote } = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes
router.use(protect);

// @route   GET /api/notes
// @route   POST /api/notes
router.route('/')
  .get(getNotes)
  .post(createNote);

// @route   GET /api/notes/:id
// @route   PUT /api/notes/:id
// @route   DELETE /api/notes/:id
router.route('/:id')
  .get(getNoteById)
  .put(updateNote)
  .delete(deleteNote);

module.exports = router; 
const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  addReaction,
  updateThought,
  deleteThought,
  deleteReaction
} = require('../../controllers/thought-controllers');

// Set up GET all and POST api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);

//Set up GET by ID, and DELETE
router
  .route('/:id')
  .get(getThoughtById)
  .post(updateThought)
  .delete(deleteThought);

//Set up POST reaction at api/thoughts/:thoughtID/reactions/
router
  .route('/:id/reactions')
  .post(addReaction);

//Set up DELETE reaction at api/thoughts/:thoughtID/reactions/:reactionID
router
  .route('/:id/reactions/:id')
  .delete(deleteReaction);

module.exports = router;
//import dependencies
const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/user-controllers');

//set up GET all and POST at /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// Set up get one, PUT, and DELETE at api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// Set up POST and DELETE routes to add and remove friends from friend list at api/users/:userId/friends/:friendId
router
  .route('/:id/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router;
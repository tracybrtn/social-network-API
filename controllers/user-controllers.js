//import the User and Thought models
const { User, Thought } = require('../models');

//Create user controllers
const userController = {
  //get all users
  getAllUsers(req, res) {
    User.find({})
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(500).json(err));
  },

  //get user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      //include thoughts and friends data. Exclude __v
      .populate('thoughts')
      .populate('friends')
      .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(500).json(err));
  },

  //create User
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(500).json(err));
  },

  //update User by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
    //run validators TODO
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(500).json(err));
  },
  //delete User
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        //Remove User thoughts when deleted
        Thought.deleteMany({ _id: { $in: dbUserData.thoughts } })
        res.json(dbUserData);
      })
      .catch(err => res.status(500).json(err));
  },

  //add friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id},
      { $push: { friends: params.friendId } },
      { runValidators: true, new: true}
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(500).json(err));
  },

  //delete friend
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId } },
      { new: true}
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(500).json(err));
  }
};

//export user controllers
module.exports = userController;
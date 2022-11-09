//import the Thought  model
const Thought = require('../models/Thought');

//Create thought controllers
const thoughtController = {
  //get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.status(500).json(err));
  },
  //get a single thought
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(500).json(err));
  },
  //create new thought
  createThought({ body }, res) {
    Thought.create(body)
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.status(500).json(err));
  },
  //update a thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(500).json(err));
  },
  //delete a thought
  deleteThought({ params }, res) {
    //TO-DO: remove thought thoughts when deleted
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(500).json(err));
  },
  //create a reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.ThoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No reaction found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },
  //delete reaction
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.ThoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No reaction found with this id!' });
        return;
      }
      res.json(dbThoughtData);
      })
    .catch((err) => res.status(500).json(err));
  }
}

//export Thought controllers
module.exports = thoughtController;
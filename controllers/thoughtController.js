const { User, Thought } = require('../models');
const { ObjectId } = require('mongoose').Types;

const thoughtController = {

  async getThoughts(req, res) {
    try {
      const dbThoughtData = await Thought.find()
      
res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOne({ _id: req.params.thoughtId })
        .populate({ path: 'userId', select: 'username'}).exec()
    res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
 
  async createThought(req, res) {
    try {
      const dbThoughtData = await Thought.create({
        thoughtText: req.body.thoughtText,
        userId: req.body.userId,
      });
      await User.findByIdAndUpdate(new ObjectId(req.params.userId), { $addToSet: { thoughts: dbThoughtData._id } });
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {
          thoughtText: req.body.thoughtText,
        },
        {
          new: true,
        }
      );

      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId })
    await User.findByIdAndUpdate(new ObjectId(req.params.userId), { $pull: { thoughts: dbThoughtData._id } });
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      res.json(dbThoughtData)
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },





  async addReaction(req, res) {
    try {
      const reactionData = {
        reactionBody: req.body.reactionBody,
        userId: req.body.userId,
      }
      const dbThoughtData = await Thought.findOne({ _id: req.params.thoughtId })
      dbThoughtData.reactions.push(reactionData);
      await dbThoughtData.save();
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },




  async removeReaction(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, 
      { $pull: { reactions: { reactionId: new ObjectId(req.params.reactionId) } } }, { new: true });

      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

};

module.exports = thoughtController;
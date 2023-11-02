const { Schema, model, Types } = require('mongoose');
const reactionSchema = require('./Reaction');
// const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //get: timestamp => dateFormat(timestamp)
    },
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: 'User'
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

thoughtSchema.virtual('reactioncount').get(function() {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
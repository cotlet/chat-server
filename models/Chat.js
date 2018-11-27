const mongoose = require('mongoose');

const User = require('./User');

const ChatSchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'pv',
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: User
  }]
}, {
  timestamps: true
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;

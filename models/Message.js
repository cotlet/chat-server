const mongoose = require('mongoose');

const User = require('./User');
const Chat = require('./Chat');

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true
  },
  chat_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Chat
  },
  type: {
    type: String,
    default: 'text'
  },
  message: {
    type: String,
    required: true
  },
  seen: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;

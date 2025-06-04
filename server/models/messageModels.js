const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  when: { 
    type: Date,
    default: Date.now,
  },
  user: {
    type: String, // Use string for username instead of ObjectId
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId, // Reference the Chat model
    ref: 'Chat', // Changed from 'Room' to 'Chat'
    required: true,
  },
  body: { 
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Message', messageSchema);
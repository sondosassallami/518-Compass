const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  messages: {
    type: [String],
    default: []
  }
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;

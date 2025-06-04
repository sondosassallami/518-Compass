const mongoose = require('mongoose');

const FollowSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,  // Only one follow record per user
  },
  keywords: {
    type: [String], // An array of words user follows
    default: [],    // Start empty if none added yet
  },
});

const Follow = mongoose.model('Follow', FollowSchema);

module.exports = Follow;

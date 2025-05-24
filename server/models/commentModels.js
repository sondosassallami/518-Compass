const mongoose = require('mongoose');

// Define the schema with a unique name to avoid conflicts
const commentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
});

// Ensure the model is uniquely defined
const CommentModel = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

// Log to verify
console.log('Comment type:', typeof CommentModel);
console.log('Is Comment a function?', typeof CommentModel === 'function');

module.exports = CommentModel;
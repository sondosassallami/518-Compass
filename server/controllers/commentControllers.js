const Comment = require('../models/commentModels');
const Post = require('../models/postModels');

console.log('Comment model instance:', Comment);

// @desc    Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { comment, username } = req.body;

    console.log('Creating comment for postId:', postId);
    console.log('Request body:', req.body);
    console.log('Request user:', req.user);

    // Validate authentication
    if (!req.user || !req.user.id) {
      console.log('Authentication failed: req.user is undefined or missing id');
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Validate inputs
    if (!postId) return res.status(400).json({ message: 'Post ID is required' });
    if (!comment) return res.status(400).json({ message: 'Comment is required' });

    // Verify post exists
    const post = await Post.findById(postId);
    if (!post) {
      console.log('Post not found for postId:', postId);
      return res.status(404).json({ message: 'Post not found' });
    }

    // Debug values before creating comment
    console.log('DEBUG values:', {
      postId,
      userId: req.user.id,
      username: username || req.user.email || 'Anonymous',
      comment,
    });

    // Create and save new comment
    const newComment = new Comment({
      post: postId,
      user: req.user.id,
      username: username || req.user.email || 'Anonymous',
      comment,
    });

    const savedComment = await newComment.save({ validateBeforeSave: true });
    console.log('Comment saved:', savedComment);

    // Update commentCount in the post (handle as a separate operation)
    await Post.updateOne(
      { _id: postId },
      { $inc: { commentCount: 1 } },
      { runValidators: false } // Avoid validation on Post model
    );
    console.log('Updated post commentCount for postId:', postId);

    res.status(201).json(savedComment);
  } catch (err) {
    console.error('Error creating comment:', err.message);
    res.status(500).json({ message: 'Error creating comment', error: err.message });
  }
};

// @desc    Get all comments for a post
exports.getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    console.log('Fetching comments for postId:', postId);

    const comments = await Comment.find({ post: postId }).populate('user', 'name email');
    if (!comments.length) {
      console.log('No comments found for postId:', postId);
    }
    res.json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err.message);
    res.status(500).json({ message: 'Error fetching comments', error: err.message });
  }
};

// @desc    Update a comment
exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    console.log('Updating comment with id:', id);
    console.log('Request user:', req.user);

    if (!req.user || !req.user.id) {
      console.log('Authentication failed: req.user is undefined or missing id');
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const existingComment = await Comment.findById(id);
    if (!existingComment) {
      console.log('Comment not found for id:', id);
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (existingComment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this comment' });
    }

    existingComment.comment = comment || existingComment.comment;
    const updatedComment = await existingComment.save({ validateBeforeSave: true });
    console.log('Comment updated:', updatedComment);

    res.json(updatedComment);
  } catch (err) {
    console.error('Error updating comment:', err.message);
    res.status(500).json({ message: 'Error updating comment', error: err.message });
  }
};

// @desc    Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    console.log('Deleting comment with id:', id);
    console.log('Request user:', req.user);

    if (!req.user || !req.user.id) {
      console.log('Authentication failed: req.user is undefined or missing id');
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const comment = await Comment.findById(id);
    if (!comment) {
      console.log('Comment not found for id:', id);
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    const postId = comment.post;
    await Comment.deleteOne({ _id: id });

    await Post.updateOne(
      { _id: postId },
      { $inc: { commentCount: -1 } },
      { runValidators: false }
    );
    console.log('Updated post commentCount for postId:', postId);

    res.json({ message: 'Comment deleted' });
  } catch (err) {
    console.error('Error deleting comment:', err.message);
    res.status(500).json({ message: 'Error deleting comment', error: err.message });
  }
};
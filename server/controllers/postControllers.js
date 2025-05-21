const Post = require('../models/postModels');
console.log('Post:', Post);
console.log('Type of Post:', typeof Post);
const moment = require('moment-timezone');

// Helper: Check if post is open
const isPlaceOpen = (openHours, timezone) => {
  const now = moment().tz(timezone);
  const day = now.format('dddd').toLowerCase();
  const today = openHours[day];

  if (!today || !today.open || !today.close) return false;

  const openTime = moment.tz(`${now.format('YYYY-MM-DD')} ${today.open}`, 'YYYY-MM-DD HH:mm', timezone);
  const closeTime = moment.tz(`${now.format('YYYY-MM-DD')} ${today.close}`, 'YYYY-MM-DD HH:mm', timezone);

  return now.isBetween(openTime, closeTime);
};

// @desc    Create new post
exports.createPost = async (req, res) => {
    try {
      console.log('Creating post with body:', req.body); // Log the incoming data
      const post = new Post({
        ...req.body,
        user: req.user._id,
      });
      const savedPost = await post.save();
      console.log('Post saved successfully:', savedPost); // Log success
      res.status(201).json(savedPost);
    } catch (err) {
      console.error('Error creating post:', err.message); // Log error details
      res.status(500).json({ message: 'Error creating post', error: err.message });
    }
  };

//  Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name email');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

// Get single post with isOpen status
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'name email');

    if (!post) return res.status(404).json({ message: 'Post not found' });

    const isOpen = isPlaceOpen(post.openHours, post.timezone);
    res.json({ ...post.toObject(), isOpen });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching post' });
  }
};

// @desc    Update a post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating post' });
  }
};

// @desc    Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting post' });
  }
};



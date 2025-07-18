const Post = require('../models/postModels');
const moment = require('moment-timezone');

// Helper: Check if post is open
const isPlaceOpen = (openHours, timezone) => {
  const now = moment().tz(timezone);
  const day = now.format('dddd').toLowerCase();
  const today = openHours[day];

  if (!today || today.status !== 'Open' || !today.hours.open || !today.hours.close) return false;

  const openTime = moment.tz(`${now.format('YYYY-MM-DD')} ${today.hours.open}`, 'YYYY-MM-DD HH:mm', timezone);
  const closeTime = moment.tz(`${now.format('YYYY-MM-DD')} ${today.hours.close}`, 'YYYY-MM-DD HH:mm', timezone);

  return now.isBetween(openTime, closeTime);
};

// @desc    Create new post
const createPost = async (req, res) => {
  try {
    const { title, address, content, category, season, admission, insurance, openHours, timezone } = req.body;
    const post = new Post({
      user: req.user._id,
      username: req.user.name,
      title,
      address,
      content,
      category,
      season,
      admission,
      insurance,
      openHours: openHours || {},
      timezone: timezone || 'America/New_York',
      photos: req.files?.photos?.map(file => file.path) || [],
      videos: req.files?.videos?.map(file => file.path) || [],
    });
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error('Error creating post:', err.message);
    res.status(500).json({ message: 'Error creating post', error: err.message });
  }
};

// @desc    Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name email').populate('comments.user', 'name profilePhoto');
    res.json(posts.map(post => ({ ...post.toObject(), isOpen: isPlaceOpen(post.openHours, post.timezone) })));
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

// @desc    Get single post with isOpen status
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'name email').populate('comments.user', 'name profilePhoto');

    if (!post) return res.status(404).json({ message: 'Post not found' });

    const isOpen = isPlaceOpen(post.openHours, post.timezone);
    res.json({ ...post.toObject(), isOpen });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching post' });
  }
};

// @desc    Update a post
const updatePost = async (req, res) => {
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
const deletePost = async (req, res) => {
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

// @desc    Add a comment to a post
const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.comments.push({ text, username: req.user.name, profilePhoto: req.user.profilePhoto });
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: 'Error adding comment', error: err.message });
  }
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost, addComment };
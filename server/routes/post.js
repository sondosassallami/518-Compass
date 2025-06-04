const express = require('express');
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require('../controllers/postControllers');
const verifyToken = require('../middleware/authMiddleware');

// GET all posts (public)
router.get('/', getAllPosts); // http://localhost:7200/api/posts

// GET single post with open status
router.get('/:id', getPostById); //http://localhost:7200/api/posts/:id

// CREATE new post (auth required)
router.post('/', verifyToken, createPost); //create an entry with model and token 

// UPDATE post (auth + ownership)
router.put('/:id', verifyToken, updatePost); // http://localhost:7200/api/posts/:id

// DELETE post (auth + ownership)
router.delete('/:id', verifyToken, deletePost); //

module.exports = router;


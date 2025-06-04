const express = require('express');
const router = express.Router();
const { createComment, getCommentsByPost, updateComment, deleteComment } = require('../controllers/commentControllers');
const protect = require('../middleware/authMiddleware'); // Changed from verifyToken to protect

console.log('✅ Loading comment routes');

router.get('/:postId', getCommentsByPost); //http://localhost:7200/api/comments/:postId to get comments for a specific post
router.post('/:postId', protect, createComment); // http://localhost:7200/api/comments/:postId to create a new comment for a specific post
router.put('/:id', protect, updateComment); // http://localhost:7200/api/comments/:id to update a specific comment
router.delete('/:id', protect, deleteComment); // http://localhost:7200/api/comments/:id to delete a specific comment

module.exports = router;
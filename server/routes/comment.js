const express = require('express');
const router = express.Router();
const { createComment, getCommentsByPost, updateComment, deleteComment } = require('../controllers/commentControllers');
const protect = require('../middleware/authMiddleware'); // Changed from verifyToken to protect

console.log('✅ Loading comment routes');

router.get('/:postId', getCommentsByPost);
router.post('/:postId', protect, createComment);
router.put('/:id', protect, updateComment);
router.delete('/:id', protect, deleteComment);

module.exports = router;
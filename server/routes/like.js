console.log('✅LOADED like');

const express = require('express');
const router = express.Router();

router.put('/:postId', (req, res) => {
  console.log('PUT /api/like/:postId hit with id:', req.params.postId);
  res.send(`Toggle like route works for id ${req.params.postId}`);
});

module.exports = router;

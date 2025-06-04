console.log('✅ Loaded like toggle!');

const express = require('express');
const router = express.Router();

router.put('/:postId', (req, res) => {
  console.log('PUT /api/like/:postId hit with id:', req.params.postId);
  res.send(`Toggle like route works for id ${req.params.postId}`);
});

module.exports = router;
//each time i test on postman, its like i turned on the on and off like button
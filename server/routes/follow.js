console.log('✅ Loading follow routes...');
const express = require('express');
const router = express.Router();

const {
  addKeywords,
  removeKeywords,
  getKeywords,
} = require('../controllers/followControllers');

// Add keywords to follow
router.post('/add', addKeywords);

// Remove keywords from follow
router.post('/remove', removeKeywords);

// Get keywords a user is following
router.get('/:userId', getKeywords);

module.exports = router;

console.log('✅ Loading NOTIFICATION routes.');
const express = require('express');
const router = express.Router();

const {
  sendNotifications,
  getUserNotifications,
} = require('../controllers/notificationControllers');

// Route to send notifications based on keywords
router.post('/send', sendNotifications);

// Route to get all notifications for a specific user
router.get('/:userId', getUserNotifications);

module.exports = router;


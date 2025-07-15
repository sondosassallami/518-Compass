const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  getLoggedInUser,
  updateUserBio,
 
} = require('../controllers/userControllers');
const verifyToken  = require("../middleware/authMiddleware");// assumes you have JWT auth

// ✅ Get currently logged-in user's profile
router.get('/me', verifyToken, getLoggedInUser); // http://localhost:7200/api/user/me need to be logged in with token

// ✅ Get any user's public profile by ID
router.get('/:id', getUserProfile); // http://localhost:7200/api/user/:id need to be logged in with token

router.put('/:id', verifyToken, updateUserBio); // for save bio http://localhost:7200/api/user/:id need to be logged in with token


module.exports = router;

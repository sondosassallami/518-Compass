const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  getLoggedInUser,
  updateUserBio,
  uploadProfilePhoto,
 
} = require('../controllers/userControllers');
const verifyToken  = require("../middleware/authMiddleware");// assumes you have JWT auth
const upload = require('../middleware/uploadMiddleware');

// ✅ Get currently logged-in user's profile
router.get('/me', verifyToken, getLoggedInUser); // http://localhost:7200/api/user/me need to be logged in with token

// ✅ Get any user's public profile by ID
router.get('/:id', getUserProfile); // http://localhost:7200/api/user/:id need to be logged in with token

router.put('/:id', verifyToken, updateUserBio); // for save bio http://localhost:7200/api/user/:id need to be logged in with token

router.post('/:id/upload-pic', verifyToken, upload.single('profilePic'), uploadProfilePhoto);

module.exports = router;

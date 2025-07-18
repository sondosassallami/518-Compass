const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  getLoggedInUser,
  updateUserBio,
  uploadProfilePhoto,
} = require('../controllers/userControllers');

const verifyToken = require("../middleware/authMiddleware"); // for JWT
const upload = require('../middleware/uploadMiddleware'); // for Multer

// ✅ Get currently logged-in user's full profile
router.get('/me', verifyToken, getLoggedInUser); 
// URL: GET http://localhost:7200/api/user/me

// ✅ Upload profile picture for the logged-in user
router.post('/me/upload-pic', verifyToken, upload.single('profilePic'), uploadProfilePhoto); 
// URL: POST http://localhost:7200/api/user/me/upload-pic

// ✅ Get any user's public profile by ID (still useful for viewing others)
router.get('/:id', getUserProfile); 
// URL: GET http://localhost:7200/api/user/:id

// ✅ Update bio of user (same pattern — but you could also change this to /me later)
router.put('/:id', verifyToken, updateUserBio); 
// URL: PUT http://localhost:7200/api/user/:id

module.exports = router;

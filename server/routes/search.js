console.log('✅ Loaded SEARCH routes');

const express = require("express");
const router = express.Router();
const { searchPosts } = require("../controllers/searchControllers");

// Route: /api/search
router.get("/", searchPosts);

module.exports = router;


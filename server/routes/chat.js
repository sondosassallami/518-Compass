console.log('✅ Loaded chat routes');
const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatControllers");

// Create a new chat room
router.post("/create", chatController.createChat); // http://localhost:7200/api/chat/create

// Get all chat rooms
router.get("/", chatController.getAllChats); // http://localhost:7200/api/chat

// Update an existing chat room by ID
router.put("/:id", chatController.updateChat); // http://localhost:7200/api/chat/:id

// Delete a chat room by ID
router.delete("/:id", chatController.deleteChat); //http://localhost:7200/api/chat/:id

module.exports = router;
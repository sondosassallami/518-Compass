console.log('✅ Loaded message routes');

const express = require("express");
const router = express.Router();
const {
  createMessage,
  getMessagesInRoom,
  updateMessage,
  deleteMessage,
} = require("../controllers/messageControllers");

// Create a new message
router.post("/", createMessage); // http://localhost:7200/api/message

// Get all messages in a room
router.get("/:room", getMessagesInRoom); // http://localhost:7200/api/message/:room

// Update a message
router.put("/:id", updateMessage); // http://localhost:7200/api/message/:id

// Delete a message
router.delete("/:id", deleteMessage); // http://localhost:7200/api/message/:id

// Export the router
module.exports = router;


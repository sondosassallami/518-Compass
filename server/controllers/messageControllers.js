const Message = require('../models/messageModels');

// Create a new message
const createMessage = async (req, res) => {
  try {
    const { user, room, body } = req.body; // Get data from the request body
    const newMessage = new Message({ user, room, body }); // Create a new message
    await newMessage.save(); // Save the message to the database
    res.status(201).json(newMessage); // Send back the new message
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
};

// Get all messages in a room
const getMessagesInRoom = async (req, res) => {
  try {
    console.log("Room param received:", req.params.room);
    
    const { room } = req.params; 
    if (!room) {
      return res.status(400).json({ error: "Room parameter is required" });
    }

    const messages = await Message.find({ room });

    console.log("Messages found:", messages);

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: error.message });
  }
};


// Update a message
const updateMessage = async (req, res) => {
  try {
    const { id } = req.params; // Get the message ID from the URL
    const { body } = req.body; // Get the updated message content
    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { body },
      { new: true } // Return the updated message
    );
    res.status(200).json(updatedMessage); // Send back the updated message
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
};

// Delete a message
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params; // Get the message ID from the URL
    await Message.findByIdAndDelete(id); // Delete the message
    res.status(200).json({ message: "Message deleted successfully" }); // Send a success message
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
};

// Export all the functions
module.exports = {
  createMessage,
  getMessagesInRoom,
  updateMessage,
  deleteMessage,
};

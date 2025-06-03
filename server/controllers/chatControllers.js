const Chat = require("../models/chatModels");

// Create a chat room
const createChat = async (req, res) => {
  try {
    const { name, members = [] } = req.body; // Default members to empty array if not provided
    const newChat = new Chat({ name, members });

    await newChat.save();
    res.status(201).json({ message: "Chat room created successfully", chat: newChat });
  } catch (error) {
    res.status(500).json({ message: "Error creating chat room", error: error.message });
  }
};

// Get all chat rooms
const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find();
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chat rooms", error: error.message });
  }
};

// Update a chat room by ID
const updateChat = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, members } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
      id,
      { name, members },
      { new: true }
    );

    if (!updatedChat) {
      return res.status(404).json({ message: "Chat room not found" });
    }

    res.status(200).json({ message: "Chat room updated successfully", chat: updatedChat });
  } catch (error) {
    res.status(500).json({ message: "Error updating chat room", error: error.message });
  }
};

// Delete a chat room by ID
const deleteChat = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedChat = await Chat.findByIdAndDelete(id);

    if (!deletedChat) {
      return res.status(404).json({ message: "Chat room not found" });
    }

    res.status(200).json({ message: "Chat room deleted successfully", chat: deletedChat });
  } catch (error) {
    res.status(500).json({ message: "Error deleting chat room", error: error.message });
  }
};

// Send a message to a chat room
const sendMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, sender } = req.body;

    const chat = await Chat.findById(id);
    if (!chat) {
      return res.status(404).json({ message: "Chat room not found" });
    }

    chat.messages.push({ sender, content });
    await chat.save();

    res.status(200).json({ message: "Message sent successfully", chat });
  } catch (error) {
    res.status(500).json({ message: "Error sending message", error: error.message });
  }
};

module.exports = {
  createChat,
  getAllChats,
  updateChat,
  deleteChat,
  sendMessage,
};
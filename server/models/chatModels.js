const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    members: {
      type: [String],
      required: false,
      default: [],
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema); // Ensure this line is present and correct
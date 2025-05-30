const mongoose = require('mongoose');

const openHoursSchema = new mongoose.Schema({
  open: { type: String, required: true },  // e.g. "08:00"
  close: { type: String, required: true }  // e.g. "20:00"
}, { _id: false });

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String, // URL to the image
    required: false,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  openHours: {
    monday: openHoursSchema,
    tuesday: openHoursSchema,
    wednesday: openHoursSchema,
    thursday: openHoursSchema,
    friday: openHoursSchema,
    saturday: openHoursSchema,
    sunday: openHoursSchema,
  },
  timezone: {
    type: String,
    default: 'America/New_York',
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);

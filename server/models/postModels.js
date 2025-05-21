const mongoose = require('mongoose');

const dailyHoursSchema = new mongoose.Schema({
  open: { type: String, default: null },   // Format: "09:00"
  close: { type: String, default: null },  // Format: "17:00"
}, { _id: false });

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  imageUrls: {
    type: [String],
    required: true,
  },

  category: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },

  tags: {
    type: [String],
    default: [],
  },

  address: {
    type: String,
    default: '',
    trim: true,
  },

  phoneNumber: {
    type: String,
    default: '',
    trim: true,
  },

  rating: {
    type: Number,
    default: 0,
  },

  ratingCount: {
    type: Number,
    default: 0,
  },

  commentCount: {
    type: Number,
    default: 0,
  },

  views: {
    type: Number,
    default: 0,
  },

  openHours: {
    monday: dailyHoursSchema,
    tuesday: dailyHoursSchema,
    wednesday: dailyHoursSchema,
    thursday: dailyHoursSchema,
    friday: dailyHoursSchema,
    saturday: dailyHoursSchema,
    sunday: dailyHoursSchema,
  },

  timezone: {
    type: String,
    default: 'UTC', // e.g., 'America/New_York'
  },

  isPublished: {
    type: Boolean,
    default: true,
  },

}, {
  timestamps: true, // Adds createdAt and updatedAt
});

module.exports = mongoose.model('Post', postSchema);

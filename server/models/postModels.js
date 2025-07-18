const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  username: { type: String, required: true },
  profilePhoto: { type: String }, // URL to profile photo
  createdAt: { type: Date, default: Date.now },
}, { _id: true });

const openHoursSchema = new mongoose.Schema({
  status: { type: String, enum: ['Open', 'Closed'], required: true }, // Open/Closed status
  hours: { open: String, close: String }, // Optional hours if open
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
  title: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  photos: [{
    type: String, // URL to photos
    required: false,
  }],
  videos: [{
    type: String, // URL to videos
    required: false,
  }],
  category: {
    type: String,
    enum: ['daycare', 'home daycare', 'arcade', 'farmers market', 'orchid', 'other'],
    required: true,
  },
  season: {
    type: String,
    enum: ['all season', 'summer', 'winter', 'spring', 'fall', 'half year'],
    required: true,
  },
  admission: {
    type: String,
    enum: ['yes', 'no'],
    required: true,
  },
  insurance: {
    type: String,
    enum: ['yes', 'no'],
    required: true,
  },
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
  comments: [commentSchema],
  timePosted: {
    type: Date,
    default: () => new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
  },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
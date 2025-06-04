const Follow = require('../models/followModels');

// Add keywords to user’s follow list
const addKeywords = async (req, res) => {
  const { userId, keywords } = req.body;

  // Check inputs
  if (!userId || !keywords || (Array.isArray(keywords) && keywords.length === 0)) {
    return res.status(400).json({ error: 'userId and keywords are required' });
  }

  // Ensure keywords is an array
  const newKeywords = Array.isArray(keywords) ? keywords : [keywords];

  try {
    let follow = await Follow.findOne({ userId });

    if (!follow) {
      follow = new Follow({ userId, keywords: newKeywords });
    } else {
      // Add new keywords, avoiding duplicates
      follow.keywords = [...new Set([...follow.keywords, ...newKeywords])];
    }

    await follow.save();
    res.status(200).json({ message: 'Keywords added', follow });
  } catch (error) {
    console.error('Error in addKeywords:', error);
    res.status(500).json({ error: error.message });
  }
};

// Remove keywords from user’s follow list
const removeKeywords = async (req, res) => {
  const { userId, keywords } = req.body;

  if (!userId || !keywords || (Array.isArray(keywords) && keywords.length === 0)) {
    return res.status(400).json({ error: 'userId and keywords are required' });
  }

  const removeKeywords = Array.isArray(keywords) ? keywords : [keywords];

  try {
    let follow = await Follow.findOne({ userId });

    if (!follow) {
      return res.status(404).json({ error: 'Follow data not found' });
    }

    follow.keywords = follow.keywords.filter(k => !removeKeywords.includes(k));

    await follow.save();
    res.status(200).json({ message: 'Keywords removed', follow });
  } catch (error) {
    console.error('Error in removeKeywords:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get all keywords a user is following
const getKeywords = async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    const follow = await Follow.findOne({ userId });

    if (!follow) {
      return res.status(404).json({ error: 'Follow data not found' });
    }

    res.status(200).json({ keywords: follow.keywords });
  } catch (error) {
    console.error('Error in getKeywords:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addKeywords, removeKeywords, getKeywords };

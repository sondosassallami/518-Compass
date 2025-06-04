const Post = require('../models/postModels');

const searchPosts = async (req, res) => {
  try {
    const { q, tag, page = 1, limit = 10 } = req.query;

    if (!q && !tag) {
      return res.status(400).json({ error: 'Search query or tag is required.' });
    }

    const query = {
      $or: [],
    };

    if (q) {
      query.$or.push(
        { title: { $regex: q, $options: 'i' } },
        { body: { $regex: q, $options: 'i' } },
        { location: { $regex: q, $options: 'i' } }
      );
    }

    if (tag) {
      query.$or.push({ tags: { $regex: tag, $options: 'i' } });
    }

    const results = await Post.find(query)
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip((page - 1) * limit) // Skip items for previous pages
      .limit(Number(limit)); // Limit number of items per page

    res.status(200).json(results);
  } catch (error) {
    console.error('❌ Error during search:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  searchPosts,
};

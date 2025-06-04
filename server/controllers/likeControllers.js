const Post = require('../models/postModels');

// Like or Unlike a post
exports.toggleLike = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      // Unlike - remove user from likes
      post.likes = post.likes.filter(id => id.toString() !== userId.toString());
    } else {
      // Like - add user to likes
      post.likes.push(userId);
    }

    await post.save();
    res.json({ likesCount: post.likes.length, liked: !alreadyLiked });

  } catch (err) {
    res.status(500).json({ message: 'Error toggling like', error: err.message });
  }
};

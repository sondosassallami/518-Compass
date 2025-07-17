const User = require('../models/userModels');

// ✅ GET /api/user/me
exports.getLoggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ GET /api/user/:id
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ PUT /api/user/:id - update bio only
exports.updateUserBio = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { bio: req.body.bio },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update bio' });
  }
};

// ✅ POST /api/user/me/upload-pic - update profile picture of logged-in user
exports.uploadProfilePhoto = async (req, res) => {
  try {
    console.log('📸 Received file:', req.file);

    const filePath = `/uploads/${req.file.filename}`;

    // Use req.user._id from auth middleware (logged-in user)
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profilePic: filePath },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error('❌ Upload Error:', err);
    res.status(500).json({ message: 'Failed to upload profile picture' });
  }
};


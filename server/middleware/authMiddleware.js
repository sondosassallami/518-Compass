const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

const protect = async (req, res, next) => {
  let token;

  // Step 1: Check if token is present in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Step 2: Extract the token from the header
      token = req.headers.authorization.split(' ')[1];
      console.log('🔐 Token received:', token);

      // Step 3: Verify the token using your secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('✅ Token decoded:', decoded);

      // Step 4: Fetch user and attach to req
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        console.log('❌ No user found with decoded ID.');
        return res.status(401).json({ message: 'User not found' });
      }

      console.log('👤 Authenticated user:', req.user.email);
      next();
    } catch (error) {
      console.error('❌ Token verification failed:', error.message);
      return res.status(401).json({ message: 'Not authorized: token failed' });
    }
  } else {
    console.warn('🚫 No token found in request headers');
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = protect;

const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

const protect = async (req, res, next) => {
    let token;
    
    // Check if token is in the request headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Attach user to request object
            req.user = await User.findById(decoded.id).select('-password'); // Don't send the password
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = protect;

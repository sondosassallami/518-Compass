const User = require('../models/userModels');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        //for validation
        if (!email || !password || !name) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }
    
        //check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        //hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //create new user 
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json({
            _id: user._id,
            email: user.email,
            name: user.name,
            token: generateToken(user._id),
        });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

    //Login user
    const loginUser = async (req, res) => {
        const { email, password } = req.body;
            
        try {
            //for validation
            if (!email || !password) {
                return res.status(400).json({ message: 'Please fill in all fields' });
            }
    
            //check if user exists
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
    
            //check if password is correct
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
    
            res.json({
                _id: user._id,
                email: user.email,
                name: user.name,
                token: generateToken(user._id), //generates token for user
            });
    
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({ message: 'Server error' });
        }
    };
    const getUserProfile = async (req, res) => {

        try {
            const user = await User.findById(req.user._id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        
        } catch (error) {
            console.error('Error fetching user profile:', error);
            res.status(500).json({ message: 'Server error' });
        }
    };
    //update logged in user profile
    const updateUserProfile = async (req, res) => {
        const { name, email, password } = req.body;
    
        try {
            //for validation
            if (!email || !name) {
                return res.status(400).json({ message: "Please proviide both name and email." });
            }
    
            //check if user exists
            const user = await User.findById(req.user._id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            //update user details
            user.name = name || user.name;
            user.email = email || user.email;
    
            //if password is provided, hash it and update it
            if (password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
            }
    
            await user.save();
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
    
        } catch (error) {
            console.error('Error updating user profile:', error);
            res.status(500).json({ message: "Server error" });
        }
    }

    //delete logged in user profile
    const deleteUser = async (req, res) => {
        try {
            const user = await User.findById(req.user._id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            await user.remove();
            res.json({ message: 'User successfully deleted' });
    
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ message: 'Server error' });
        }
    };
    //logout user
    const logoutUser = async (req, res) => {
        try {
            res.clearCookie('token'); // Clear the token cookie
            res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            console.error('Error logging out user:', error);
            res.status(500).json({ message: 'Server error' });
        }
    };
    //generate JWT token
    const generateToken = (id) => {
        return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    };
    //export all functions
    module.exports = {
        registerUser,
        loginUser,
        getUserProfile,
        updateUserProfile,
        deleteUser,
        logoutUser
    };

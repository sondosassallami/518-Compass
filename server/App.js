const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser'); //auth token
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const likeRoutes = require('./routes/like');
const followRoutes = require('./routes/follow');
const notificationRoutes = require('./routes/notification');
const chatRoutes = require('./routes/chat');
const messageRoutes = require('./routes/message');
const searchRoutes = require('./routes/search');
const { Server } = require('socket.io');

//Load environment variables
dotenv.config();

//check required environment variables early in the application
checkEnvVars(["DB_URL", "DBNAME", "JWT_SECRET"]);

//Middleware Setup
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.CORS_ORIGIN ,
    credentials: true,
})
);

//API Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/user', userRoutes); // User routes
app.use('/api/post', postRoutes); // Post routes
app.use('/api/comment', commentRoutes); // Comment routes
app.use('/api/like', likeRoutes); // Like routes
app.use('/api/follow', followRoutes); // Follow routes
app.use('/api/notification', notificationRoutes); // Notification routes
app.use('/api/chat', chatRoutes); // Chat routes
app.use('/api/message', messageRoutes); // Message routes
app.use('/api/search', searchRoutes); // Search routes

//Database connections
mongoose(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('✅ MongoDB connected');
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
    });
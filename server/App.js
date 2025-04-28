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
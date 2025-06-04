const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const path = require('path');
const userRoutes = require('./routes/user'); //(Profile realted)
const postRoutes = require('./routes/post'); //MOST CRUCIAL ROUTE
const commentRoutes = require('./routes/comment');
const likeRoutes = require('./routes/like'); 
const chatRoutes = require('./routes/chat'); 
const messageRoutes = require('./routes/message'); 
// const searchRoutes = require('./routes/search');
// const { Server } = require('socket.io');
//***/ const notificationRoutes = require('./routes/notification');


// ✅ Load environment variables from server/.env
dotenv.config({ path: path.resolve(__dirname, '.env') });

// ✅ Check required env vars
const PORT = process.env.PORT || 7200; // Changed fallback to match .env
const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI || !process.env.JWT_SECRET) {
    console.error("❌ Missing essential environment variables.");
    process.exit(1);
}

// ✅ Debug .env loading
console.log('✅ Loaded PORT from .env:', process.env.PORT);

// Setup Express app
const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS setup from .env
const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || [];

app.use(cors({
    origin: true, // Allow all origins
    credentials: true
}));

app.use((req, res, next) => {
    console.log("Got a request!", req.method, req.url, req.headers);
    next();
  });

// ✅ Log incoming requests
app.use((req, res, next) => {
    console.log('Request from:', req.headers.origin);
    next();
});

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes); // User routes
app.use('/api/post', postRoutes); // Post routes
app.use('/api/comment', commentRoutes); // Comment routes
app.use('/api/like', likeRoutes); // Like routes
app.use('/api/chat', chatRoutes); // Chat routes
app.use('/api/message', messageRoutes); // Message routes
// app.use('/api/search', searchRoutes); // Search routes
// app.use('/api/notification', notificationRoutes); // Notification routes

// ✅ MongoDB Connection
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Test Routes
app.get('/test', (req, res) => {
    console.log('GET /test route was called');
    res.send('Test works!');
});

app.get('/', (req, res) => res.send('✅ Server is running...'));

// ✅ Global Error Handling
app.use((err, req, res, next) => {
    console.error("❌ Error:", err);
    res.status(err.statusCode || 500).json({ message: err.message || 'Internal Server Error' });
});

// ✅ Start Server
const server = app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

// ✅ Handle port conflicts
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use.`);
        console.error('🛠 Try changing the PORT in your .env file.');
    } else {
        console.error('❌ Server error:', err);
    }
});

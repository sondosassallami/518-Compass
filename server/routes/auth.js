const express = require('express');
const router = express.Router();
const {
    getUserProfile,
    loginUser,
    registerUser,
    updateUserProfile,
    deleteUser,
    logoutUser
} = require("../controllers/authControllers");
    const protect = require("../middleware/authMiddleware");

    //routes to get the logged in user profile (GET request) which is why /me is used
    router.get("/me", protect, getUserProfile);
   
    //login a user (POST request)
    router.post("/login", loginUser);

    //register a new user (POST request)
    router.post("/register", registerUser);

    //update logged in user profile (PUT request)
    router.put("/me", protect, updateUserProfile);

    //delete logged in user profile (DELETE request)
    router.delete("/me", protect, deleteUser);
    
    //logout a user (POST request)
    router.post("/logout", protect, logoutUser);

    module.exports = router;

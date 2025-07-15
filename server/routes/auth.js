console.log('✅ Loaded AUTH!');
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
    router.get("/me", protect, getUserProfile);  //http://localhost:7200/api/auth/me pulls up info needs token. 
   
    //login a user (POST request)
    router.post("/login", loginUser); //http://localhost:7200/api/auth/login

    //register a new user (POST request)
    router.post("/register", registerUser); //http://localhost:7200/api/auth/register

    //update logged in user profile (PUT request)
    router.put("/me", protect, updateUserProfile); //http://localhost:7200/api/auth/me needs model to update name/email/password

    //delete logged in user profile (DELETE request)
    router.delete("/me", protect, deleteUser);
    
    //logout a user (POST request)
    router.post("/logout", protect, logoutUser); //http://localhost:7200/api/auth/logout

    module.exports = router;

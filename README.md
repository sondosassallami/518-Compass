# 🌟 518-Compass

Discover the hidden gems of the 518 New York area!  
518-Compass is a community-driven app built for parents, caregivers, and families to easily find, review, and share local playgrounds, indoor play areas, libraries, daycares, and more in the great Upstate New York! 
My mission is to create a reliable, real-world resource — updated by the community, for the community to have recent, up-to-date information on facilities to navigate with clear straightforward comments left by contributors. 

---

## Tech Stack

![React](https://img.shields.io/badge/Frontend-React-blue)
![Vite](https://img.shields.io/badge/Build-Vite-yellow)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Express.js](https://img.shields.io/badge/API-Express.js-lightgrey)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)

---

## Table of Contents
- [About the Project](#-about-the-project)
- [Features](#-features)
- [Project Architecture](#-project-architecture)
- [Installation](#-installation)
- [Usage](#-usage)
- [Screenshots](#-screenshots)
- [Live Demo](#-live-demo)
- [Upcoming Features](#-upcoming-features)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

##  About the Project

518-Compass was created to make family planning easier and engaging. 
Existing review platforms such as Google Maps and other social media platforms often have outdated information or miss smaller community spaces.  
518-Compass fills that gap with real-time updates from local users, helping families explore with confidence. Users will be able to leave contribute, add photos and reviews. 

---

##  Features

- **Search** by category: playgrounds, indoor play, libraries, daycares (more)
- **Like/Dislike** one or the other
- **Contribute** and leave reviews and thorough comments such as location, hours, free or admission
- **Upload photos** to showcase hidden gems for other users to view
- **Save favorite** places for easy future access
- **Authentication** to manage personalized content
- **Responsive Design** for mobile, tablet, and desktop

---

## Project Architecture

Frontend (React + Vite)
   - Handles UI, routes, authentication frontend
   - Connects to backend API

Backend (Node.js + Express.js)
   - REST API endpoints for CRUD operations (Create, Read, Update, Delete)
   - Authentication and user management
   - Business logic and data validation

Database (MongoDB with Mongoose ODM)
   - Stores user accounts, reviews, locations, saved favorites

const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const {
  signup,
  login,
  logout,
  getCurrentUser,
  updateProfile,
} = require('../controllers/authController');

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.post('/logout', authMiddleware, logout);
router.get('/me', authMiddleware, getCurrentUser);
router.put('/profile', authMiddleware, updateProfile);

module.exports = router;

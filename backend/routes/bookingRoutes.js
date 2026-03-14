const express = require('express');
const router = express.Router();
const { authMiddleware, authorize } = require('../middleware/auth');
const {
  createBooking,
  getUserBookings,
  getBookingById,
  cancelBooking,
  getAllBookings,
} = require('../controllers/bookingController');

// User routes
router.post('/', authMiddleware, createBooking);
router.get('/user/bookings', authMiddleware, getUserBookings);
router.get('/:id', authMiddleware, getBookingById);
router.put('/:id/cancel', authMiddleware, cancelBooking);

// Admin routes
router.get('/', authMiddleware, authorize('admin'), getAllBookings);

module.exports = router;

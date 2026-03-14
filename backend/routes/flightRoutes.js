const express = require('express');
const router = express.Router();
const { authMiddleware, authorize } = require('../middleware/auth');
const {
  getAllFlights,
  getFlightById,
  getCities,
  createFlight,
  updateFlight,
  deleteFlight,
} = require('../controllers/flightController');

// Public routes
router.get('/', getAllFlights);
router.get('/cities', getCities);
router.get('/:id', getFlightById);

// Admin routes
router.post('/', authMiddleware, authorize('admin'), createFlight);
router.put('/:id', authMiddleware, authorize('admin'), updateFlight);
router.delete('/:id', authMiddleware, authorize('admin'), deleteFlight);

module.exports = router;

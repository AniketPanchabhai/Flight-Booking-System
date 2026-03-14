const express = require('express');
const router = express.Router();
const { authMiddleware, authorize } = require('../middleware/auth');
const {
  getOffers,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer,
  getAllOffers,
} = require('../controllers/offerController');

// Admin routes (must come before other routes to avoid conflicts)
router.get('/admin/all', authMiddleware, authorize('admin'), getAllOffers);

// User routes (RBAC applied in controller)
router.get('/', authMiddleware, getOffers);
router.get('/:id', authMiddleware, getOfferById);

// Admin routes
router.post('/', authMiddleware, authorize('admin'), createOffer);
router.put('/:id', authMiddleware, authorize('admin'), updateOffer);
router.delete('/:id', authMiddleware, authorize('admin'), deleteOffer);

module.exports = router;

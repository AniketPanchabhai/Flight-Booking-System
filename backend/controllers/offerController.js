const Offer = require('../models/Offer');
const User = require('../models/User');

// Get active offers (RBAC - Prime users see all, Normal users see none)
exports.getOffers = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const now = new Date();

    // Filter offers based on user role
    let filter = {
      isActive: true,
      validFrom: { $lte: now },
      validUntil: { $gte: now },
    };

    // Only prime users can see prime offers
    if (user.role === 'prime') {
      // Prime users see both prime and normal offers
      filter.$or = [
        { applicableUserRoles: 'prime' },
        { applicableUserRoles: 'both' },
      ];
    } else if (user.role === 'normal') {
      // Normal users only see offers specifically for them
      filter.applicableUserRoles = 'normal';
    }

    const offers = await Offer.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Offers retrieved successfully',
      userRole: user.role,
      count: offers.length,
      offers,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve offers', error: error.message });
  }
};

// Get single offer
exports.getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    res.status(200).json({
      message: 'Offer retrieved successfully',
      offer,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve offer', error: error.message });
  }
};

// Admin: Create offer
exports.createOffer = async (req, res) => {
  try {
    const {
      title,
      description,
      discountPercentage,
      maxDiscountAmount,
      applicableUserRoles,
      applicableRoutes,
      validFrom,
      validUntil,
      maxUsagePerUser,
    } = req.body;

    // Validation
    if (
      !title ||
      !description ||
      !discountPercentage ||
      !applicableUserRoles ||
      !validFrom ||
      !validUntil
    ) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    if (new Date(validFrom) >= new Date(validUntil)) {
      return res.status(400).json({ message: 'Valid from date must be before valid until date' });
    }

    const offer = new Offer({
      title,
      description,
      discountPercentage,
      maxDiscountAmount,
      applicableUserRoles: Array.isArray(applicableUserRoles)
        ? applicableUserRoles
        : [applicableUserRoles],
      applicableRoutes,
      validFrom,
      validUntil,
      maxUsagePerUser: maxUsagePerUser || 1,
    });

    await offer.save();

    res.status(201).json({
      message: 'Offer created successfully',
      offer,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create offer', error: error.message });
  }
};

// Admin: Update offer
exports.updateOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    res.status(200).json({
      message: 'Offer updated successfully',
      offer,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update offer', error: error.message });
  }
};

// Admin: Delete offer
exports.deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);

    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    res.status(200).json({
      message: 'Offer deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete offer', error: error.message });
  }
};

// Admin: Get all offers
exports.getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: 'All offers retrieved successfully',
      count: offers.length,
      offers,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve offers', error: error.message });
  }
};

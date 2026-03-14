const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const Offer = require('../models/Offer');
const User = require('../models/User');

// Generate unique booking reference
const generateBookingRef = () => {
  return 'BK' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
};

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const { flightId, numberOfPassengers, passengers, offerId } = req.body;

    // Validation
    if (!flightId || !numberOfPassengers || !passengers) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (passengers.length !== numberOfPassengers) {
      return res.status(400).json({ message: 'Passenger count mismatch' });
    }

    // Get flight details
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    if (flight.availableSeats < numberOfPassengers) {
      return res.status(400).json({
        message: 'Not enough available seats',
        availableSeats: flight.availableSeats,
      });
    }

    // Get user details
    const user = await User.findById(req.user.userId);

    // Calculate price
    let totalPrice = flight.pricePerSeat * numberOfPassengers;
    let discountApplied = 0;

    // Check and apply offer if provided
    let appliedOffer = null;
    if (offerId) {
      const offer = await Offer.findById(offerId);

      if (!offer) {
        return res.status(404).json({ message: 'Offer not found' });
      }

      // Check if offer is valid for user role
      if (
        offer.applicableUserRoles.includes(user.role) ||
        offer.applicableUserRoles.includes('both')
      ) {
        // Check if offer is active
        const now = new Date();
        if (offer.validFrom <= now && offer.validUntil >= now) {
          const discountAmount = (totalPrice * offer.discountPercentage) / 100;
          discountApplied = Math.min(
            discountAmount,
            offer.maxDiscountAmount || discountAmount
          );
          appliedOffer = offer._id;
        }
      }
    }

    totalPrice -= discountApplied;

    // Create booking
    const booking = new Booking({
      bookingReference: generateBookingRef(),
      userId: req.user.userId,
      flightId,
      numberOfPassengers,
      passengers,
      totalPrice,
      discountApplied,
      offerId: appliedOffer,
      status: 'confirmed',
      paymentStatus: 'paid',
    });

    await booking.save();

    // Update available seats
    flight.availableSeats -= numberOfPassengers;
    await flight.save();

    // Update offer usage if applied
    if (appliedOffer) {
      await Offer.findByIdAndUpdate(appliedOffer, {
        $inc: { usedCount: 1 },
      });
    }

    res.status(201).json({
      message: 'Booking created successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create booking', error: error.message });
  }
};

// Get user bookings
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.userId })
      .populate('flightId')
      .populate('offerId')
      .sort({ bookingDate: -1 });

    res.status(200).json({
      message: 'Bookings retrieved successfully',
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve bookings', error: error.message });
  }
};

// Get booking details
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('flightId')
      .populate('offerId');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns this booking
    if (booking.userId.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    res.status(200).json({
      message: 'Booking details retrieved successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve booking', error: error.message });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns this booking
    if (booking.userId.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking is already cancelled' });
    }

    // Update booking status
    booking.status = 'cancelled';
    booking.paymentStatus = 'refunded';
    booking.cancelledAt = new Date();
    await booking.save();

    // Restore available seats
    const flight = await Flight.findById(booking.flightId);
    flight.availableSeats += booking.numberOfPassengers;
    await flight.save();

    res.status(200).json({
      message: 'Booking cancelled successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel booking', error: error.message });
  }
};

// Admin: Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'firstName lastName email')
      .populate('flightId')
      .populate('offerId')
      .sort({ bookingDate: -1 });

    res.status(200).json({
      message: 'All bookings retrieved successfully',
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve bookings', error: error.message });
  }
};

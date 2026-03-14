const Flight = require('../models/Flight');
const Booking = require('../models/Booking');
const Offer = require('../models/Offer');

// Get all unique cities
exports.getCities = async (req, res) => {
  try {
    const departureCities = await Flight.distinct('departureCity');
    const arrivalCities = await Flight.distinct('arrivalCity');
    const allCities = [...new Set([...departureCities, ...arrivalCities])].sort();

    res.status(200).json({
      message: 'Cities retrieved successfully',
      cities: allCities,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve cities', error: error.message });
  }
};

// Get all flights with filters
exports.getAllFlights = async (req, res) => {
  try {
    const { departureCity, arrivalCity, departureDate, sortBy } = req.query;

    let filter = { status: 'scheduled' };

    if (departureCity) {
      filter.departureCity = { $regex: departureCity, $options: 'i' };
    }

    if (arrivalCity) {
      filter.arrivalCity = { $regex: arrivalCity, $options: 'i' };
    }

    if (departureDate) {
      const startDate = new Date(departureDate);
      const endDate = new Date(departureDate);
      endDate.setDate(endDate.getDate() + 1);
      filter.departureTime = { $gte: startDate, $lt: endDate };
    }

    let query = Flight.find(filter);

    if (sortBy === 'price-low') {
      query = query.sort({ pricePerSeat: 1 });
    } else if (sortBy === 'price-high') {
      query = query.sort({ pricePerSeat: -1 });
    } else if (sortBy === 'duration') {
      query = query.sort({ duration: 1 });
    } else {
      query = query.sort({ departureTime: 1 });
    }

    const flights = await query.exec();

    res.status(200).json({
      message: 'Flights retrieved successfully',
      count: flights.length,
      flights,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve flights', error: error.message });
  }
};

// Get single flight details
exports.getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.status(200).json({
      message: 'Flight details retrieved successfully',
      flight,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve flight', error: error.message });
  }
};

// Admin: Create new flight
exports.createFlight = async (req, res) => {
  try {
    const {
      flightNumber,
      airline,
      departureCity,
      arrivalCity,
      departureTime,
      arrivalTime,
      totalSeats,
      pricePerSeat,
      aircraft,
      stops,
    } = req.body;

    // Validation
    if (
      !flightNumber ||
      !airline ||
      !departureCity ||
      !arrivalCity ||
      !departureTime ||
      !arrivalTime ||
      !totalSeats ||
      !pricePerSeat ||
      !aircraft
    ) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Calculate duration
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);
    const durationMs = arrival - departure;
    const hours = Math.floor(durationMs / 3600000);
    const minutes = Math.floor((durationMs % 3600000) / 60000);
    const duration = `${hours}h ${minutes}m`;

    const flight = new Flight({
      flightNumber,
      airline,
      departureCity,
      arrivalCity,
      departureTime,
      arrivalTime,
      duration,
      totalSeats,
      availableSeats: totalSeats,
      pricePerSeat,
      aircraft,
      stops: stops || 0,
    });

    await flight.save();

    res.status(201).json({
      message: 'Flight created successfully',
      flight,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Flight number already exists' });
    }
    res.status(500).json({ message: 'Failed to create flight', error: error.message });
  }
};

// Admin: Update flight
exports.updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.status(200).json({
      message: 'Flight updated successfully',
      flight,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update flight', error: error.message });
  }
};

// Admin: Delete flight
exports.deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.status(200).json({
      message: 'Flight deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete flight', error: error.message });
  }
};

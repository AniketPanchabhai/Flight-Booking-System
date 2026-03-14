const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema(
  {
    flightNumber: {
      type: String,
      required: [true, 'Please provide flight number'],
      unique: true,
    },
    airline: {
      type: String,
      required: [true, 'Please provide airline name'],
    },
    departureCity: {
      type: String,
      required: [true, 'Please provide departure city'],
    },
    arrivalCity: {
      type: String,
      required: [true, 'Please provide arrival city'],
    },
    departureTime: {
      type: Date,
      required: [true, 'Please provide departure time'],
    },
    arrivalTime: {
      type: Date,
      required: [true, 'Please provide arrival time'],
    },
    duration: {
      type: String, // e.g., "2h 30m"
      required: true,
    },
    totalSeats: {
      type: Number,
      required: [true, 'Please provide total seats'],
      default: 180,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
    pricePerSeat: {
      type: Number,
      required: [true, 'Please provide price per seat'],
    },
    aircraft: {
      type: String, // e.g., "Boeing 737"
      required: true,
    },
    stops: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['scheduled', 'delayed', 'cancelled', 'completed'],
      default: 'scheduled',
    },
    seatLayout: {
      // For future seat selection feature
      type: Array,
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Flight', flightSchema);

#!/usr/bin/env node
/**
 * Seed Script - Add Sample Data to MongoDB
 * 
 * This script adds sample flights and offers to the MongoDB database.
 * 
 * Usage: node seed.js
 */

const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Flight = require('./models/Flight');
const Offer = require('./models/Offer');

const sampleFlights = [
  {
    flightNumber: "UA101",
    airline: "United Airlines",
    departureCity: "New York",
    departureCountry: "USA",
    arrivalCity: "Los Angeles",
    arrivalCountry: "USA",
    departureTime: new Date("2024-12-20T08:00:00Z"),
    arrivalTime: new Date("2024-12-20T11:30:00Z"),
    duration: "5h 30m",
    totalSeats: 250,
    availableSeats: 250,
    pricePerSeat: 199,
    aircraft: "Boeing 777"
  },
  {
    flightNumber: "BA201",
    airline: "British Airways",
    departureCity: "London",
    departureCountry: "UK",
    arrivalCity: "Paris",
    arrivalCountry: "France",
    departureTime: new Date("2024-12-20T10:00:00Z"),
    arrivalTime: new Date("2024-12-20T12:15:00Z"),
    duration: "2h 15m",
    totalSeats: 180,
    availableSeats: 180,
    pricePerSeat: 89,
    aircraft: "Airbus A320"
  },
  {
    flightNumber: "SQ301",
    airline: "Singapore Airlines",
    departureCity: "Tokyo",
    departureCountry: "Japan",
    arrivalCity: "Singapore",
    arrivalCountry: "Singapore",
    departureTime: new Date("2024-12-21T15:00:00Z"),
    arrivalTime: new Date("2024-12-22T00:30:00Z"),
    duration: "6h 30m",
    totalSeats: 320,
    availableSeats: 320,
    pricePerSeat: 450,
    aircraft: "Boeing 787"
  },
  {
    flightNumber: "QR401",
    airline: "Qatar Airways",
    departureCity: "Dubai",
    departureCountry: "UAE",
    arrivalCity: "New York",
    arrivalCountry: "USA",
    departureTime: new Date("2024-12-22T22:00:00Z"),
    arrivalTime: new Date("2024-12-23T08:00:00Z"),
    duration: "14h 30m",
    totalSeats: 350,
    availableSeats: 350,
    pricePerSeat: 799,
    aircraft: "Boeing 777"
  },
  {
    flightNumber: "LH501",
    airline: "Lufthansa",
    departureCity: "Berlin",
    departureCountry: "Germany",
    arrivalCity: "Madrid",
    arrivalCountry: "Spain",
    departureTime: new Date("2024-12-20T14:00:00Z"),
    arrivalTime: new Date("2024-12-20T16:30:00Z"),
    duration: "2h 30m",
    totalSeats: 200,
    availableSeats: 200,
    pricePerSeat: 145,
    aircraft: "Airbus A321"
  },
  {
    flightNumber: "AF601",
    airline: "Air France",
    departureCity: "Paris",
    departureCountry: "France",
    arrivalCity: "Tokyo",
    arrivalCountry: "Japan",
    departureTime: new Date("2024-12-23T12:00:00Z"),
    arrivalTime: new Date("2024-12-24T06:00:00Z"),
    duration: "11h 30m",
    totalSeats: 280,
    availableSeats: 280,
    pricePerSeat: 899,
    aircraft: "Boeing 777"
  },
  {
    flightNumber: "EK701",
    airline: "Emirates",
    departureCity: "Dubai",
    departureCountry: "UAE",
    arrivalCity: "London",
    arrivalCountry: "UK",
    departureTime: new Date("2024-12-20T18:30:00Z"),
    arrivalTime: new Date("2024-12-21T00:45:00Z"),
    duration: "7h 15m",
    totalSeats: 400,
    availableSeats: 400,
    pricePerSeat: 320,
    aircraft: "Boeing 777"
  },
  {
    flightNumber: "CX801",
    airline: "Cathay Pacific",
    departureCity: "Hong Kong",
    departureCountry: "China",
    arrivalCity: "Sydney",
    arrivalCountry: "Australia",
    departureTime: new Date("2024-12-21T11:00:00Z"),
    arrivalTime: new Date("2024-12-22T05:30:00Z"),
    duration: "8h 30m",
    totalSeats: 290,
    availableSeats: 290,
    pricePerSeat: 520,
    aircraft: "Airbus A350"
  },
  {
    flightNumber: "TK901",
    airline: "Turkish Airlines",
    departureCity: "Istanbul",
    departureCountry: "Turkey",
    arrivalCity: "Bangkok",
    arrivalCountry: "Thailand",
    departureTime: new Date("2024-12-22T09:00:00Z"),
    arrivalTime: new Date("2024-12-22T21:00:00Z"),
    duration: "9h 00m",
    totalSeats: 270,
    availableSeats: 270,
    pricePerSeat: 380,
    aircraft: "Boeing 787"
  },
  {
    flightNumber: "JL1001",
    airline: "Japan Airlines",
    departureCity: "Tokyo",
    departureCountry: "Japan",
    arrivalCity: "San Francisco",
    arrivalCountry: "USA",
    departureTime: new Date("2024-12-23T19:30:00Z"),
    arrivalTime: new Date("2024-12-24T14:00:00Z"),
    duration: "10h 30m",
    totalSeats: 310,
    availableSeats: 310,
    pricePerSeat: 650,
    aircraft: "Boeing 787"
  },
  {
    flightNumber: "AI201",
    airline: "Air India",
    departureCity: "Mumbai",
    departureCountry: "India",
    arrivalCity: "London",
    arrivalCountry: "UK",
    departureTime: new Date("2024-12-25T02:00:00Z"),
    arrivalTime: new Date("2024-12-25T14:30:00Z"),
    duration: "8h 30m",
    totalSeats: 280,
    availableSeats: 280,
    pricePerSeat: 450,
    aircraft: "Boeing 787"
  },
  {
    flightNumber: "QF301",
    airline: "Qantas",
    departureCity: "Sydney",
    departureCountry: "Australia",
    arrivalCity: "Los Angeles",
    arrivalCountry: "USA",
    departureTime: new Date("2024-12-26T10:00:00Z"),
    arrivalTime: new Date("2024-12-26T18:00:00Z"),
    duration: "14h 00m",
    totalSeats: 350,
    availableSeats: 350,
    pricePerSeat: 720,
    aircraft: "Boeing 787"
  },
  {
    flightNumber: "AF401",
    airline: "Air France",
    departureCity: "Paris",
    departureCountry: "France",
    arrivalCity: "New York",
    arrivalCountry: "USA",
    departureTime: new Date("2024-12-27T14:00:00Z"),
    arrivalTime: new Date("2024-12-27T18:30:00Z"),
    duration: "8h 30m",
    totalSeats: 320,
    availableSeats: 320,
    pricePerSeat: 380,
    aircraft: "Airbus A350"
  },
  {
    flightNumber: "KL501",
    airline: "KLM",
    departureCity: "Amsterdam",
    departureCountry: "Netherlands",
    arrivalCity: "Toronto",
    arrivalCountry: "Canada",
    departureTime: new Date("2024-12-28T16:00:00Z"),
    arrivalTime: new Date("2024-12-28T20:45:00Z"),
    duration: "8h 45m",
    totalSeats: 290,
    availableSeats: 290,
    pricePerSeat: 420,
    aircraft: "Boeing 777"
  },
  {
    flightNumber: "LX601",
    airline: "Swiss International Air Lines",
    departureCity: "Zurich",
    departureCountry: "Switzerland",
    arrivalCity: "Singapore",
    arrivalCountry: "Singapore",
    departureTime: new Date("2024-12-29T22:00:00Z"),
    arrivalTime: new Date("2024-12-30T18:00:00Z"),
    duration: "12h 00m",
    totalSeats: 260,
    availableSeats: 260,
    pricePerSeat: 580,
    aircraft: "Airbus A330"
  },
  {
    flightNumber: "OS701",
    airline: "Austrian Airlines",
    departureCity: "Vienna",
    departureCountry: "Austria",
    arrivalCity: "Bangkok",
    arrivalCountry: "Thailand",
    departureTime: new Date("2024-12-30T08:00:00Z"),
    arrivalTime: new Date("2024-12-30T22:00:00Z"),
    duration: "10h 00m",
    totalSeats: 240,
    availableSeats: 240,
    pricePerSeat: 490,
    aircraft: "Boeing 777"
  },
  {
    flightNumber: "SK801",
    airline: "SAS",
    departureCity: "Stockholm",
    departureCountry: "Sweden",
    arrivalCity: "Chicago",
    arrivalCountry: "USA",
    departureTime: new Date("2024-12-31T12:00:00Z"),
    arrivalTime: new Date("2024-12-31T16:30:00Z"),
    duration: "8h 30m",
    totalSeats: 270,
    availableSeats: 270,
    pricePerSeat: 410,
    aircraft: "Airbus A330"
  },
  {
    flightNumber: "FI901",
    airline: "Icelandair",
    departureCity: "Reykjavik",
    departureCountry: "Iceland",
    arrivalCity: "Boston",
    arrivalCountry: "USA",
    departureTime: new Date("2025-01-01T14:00:00Z"),
    arrivalTime: new Date("2025-01-01T18:45:00Z"),
    duration: "7h 45m",
    totalSeats: 220,
    availableSeats: 220,
    pricePerSeat: 350,
    aircraft: "Boeing 757"
  },
  {
    flightNumber: "NZ1001",
    airline: "Air New Zealand",
    departureCity: "Auckland",
    departureCountry: "New Zealand",
    arrivalCity: "San Francisco",
    arrivalCountry: "USA",
    departureTime: new Date("2025-01-02T20:00:00Z"),
    arrivalTime: new Date("2025-01-03T10:00:00Z"),
    duration: "12h 00m",
    totalSeats: 300,
    availableSeats: 300,
    pricePerSeat: 680,
    aircraft: "Boeing 777"
  },
  {
    flightNumber: "TG1101",
    airline: "Thai Airways",
    departureCity: "Bangkok",
    departureCountry: "Thailand",
    arrivalCity: "Frankfurt",
    arrivalCountry: "Germany",
    departureTime: new Date("2025-01-03T01:00:00Z"),
    arrivalTime: new Date("2025-01-03T08:00:00Z"),
    duration: "9h 00m",
    totalSeats: 280,
    availableSeats: 280,
    pricePerSeat: 520,
    aircraft: "Airbus A350"
  },
  {
    flightNumber: "MH1201",
    airline: "Malaysia Airlines",
    departureCity: "Kuala Lumpur",
    departureCountry: "Malaysia",
    arrivalCity: "London",
    arrivalCountry: "UK",
    departureTime: new Date("2025-01-04T18:00:00Z"),
    arrivalTime: new Date("2025-01-05T06:00:00Z"),
    duration: "10h 00m",
    totalSeats: 250,
    availableSeats: 250,
    pricePerSeat: 480,
    aircraft: "Boeing 777"
  },
  {
    flightNumber: "GA1301",
    airline: "Garuda Indonesia",
    departureCity: "Jakarta",
    departureCountry: "Indonesia",
    arrivalCity: "Amsterdam",
    arrivalCountry: "Netherlands",
    departureTime: new Date("2025-01-05T14:00:00Z"),
    arrivalTime: new Date("2025-01-06T02:00:00Z"),
    duration: "10h 00m",
    totalSeats: 260,
    availableSeats: 260,
    pricePerSeat: 460,
    aircraft: "Boeing 777"
  },
  {
    flightNumber: "KE1401",
    airline: "Korean Air",
    departureCity: "Seoul",
    departureCountry: "South Korea",
    arrivalCity: "Vancouver",
    arrivalCountry: "Canada",
    departureTime: new Date("2025-01-06T10:00:00Z"),
    arrivalTime: new Date("2025-01-06T18:30:00Z"),
    duration: "11h 30m",
    totalSeats: 290,
    availableSeats: 290,
    pricePerSeat: 550,
    aircraft: "Boeing 777"
  },
  {
    flightNumber: "BR1501",
    airline: "EVA Air",
    departureCity: "Taipei",
    departureCountry: "Taiwan",
    arrivalCity: "Seattle",
    arrivalCountry: "USA",
    departureTime: new Date("2025-01-07T22:00:00Z"),
    arrivalTime: new Date("2025-01-08T08:00:00Z"),
    duration: "12h 00m",
    totalSeats: 270,
    availableSeats: 270,
    pricePerSeat: 590,
    aircraft: "Boeing 777"
  }
];

const sampleOffers = [
  {
    title: "Holiday Season Special",
    description: "Get 30% off on all flights booked for travels. Limited time offer!",
    discountPercentage: 30,
    applicableUserRoles: ['prime'],
    validFrom: new Date("2026-02-20"),
    validUntil: new Date("2026-03-31"),
    maxUsagePerUser: 5
  },
  {
    title: "Early Bird Discount",
    description: "Book 7 days in advance and get 20% discount on your flight.",
    discountPercentage: 20,
    applicableUserRoles: ['prime'],
    validFrom: new Date("2026-02-20"),
    validUntil: new Date("2026-05-31"),
    maxUsagePerUser: 3
  },
  {
    title: "Round Trip Offer",
    description: "Book a round trip and save up to 25% on both legs of your journey.",
    discountPercentage: 25,
    applicableUserRoles: ['prime'],
    validFrom: new Date("2026-02-20"),
    validUntil: new Date("2026-04-20"),
    maxUsagePerUser: 2
  },
  {
    title: "Flex Booking",
    description: "Book now, decide later. Get 15% off and free cancellation within 48 hours.",
    discountPercentage: 15,
    applicableUserRoles: ['prime'],
    validFrom: new Date("2026-02-20"),
    validUntil: new Date("2026-03-15"),
    maxUsagePerUser: 4
  },
  {
    title: "Family Package Deal",
    description: "Special 25% discount for families of 4 or more traveling together.",
    discountPercentage: 25,
    applicableUserRoles: ['prime'],
    validFrom: new Date("2026-02-20"),
    validUntil: new Date("2026-06-30"),
    maxUsagePerUser: 2
  },
  {
    title: "Student Discount",
    description: "Students get 20% off on international flights with valid ID.",
    discountPercentage: 20,
    applicableUserRoles: ['prime'],
    validFrom: new Date("2026-02-20"),
    validUntil: new Date("2026-08-31"),
    maxUsagePerUser: 3
  },
  {
    title: "Senior Citizen Offer",
    description: "Seniors aged 60+ enjoy 18% discount on all domestic and international flights.",
    discountPercentage: 18,
    applicableUserRoles: ['prime'],
    validFrom: new Date("2026-02-20"),
    validUntil: new Date("2026-12-31"),
    maxUsagePerUser: 5
  },
  {
    title: "Weekend Getaway",
    description: "Book weekend flights and get 15% off on select routes.",
    discountPercentage: 15,
    applicableUserRoles: ['prime'],
    validFrom: new Date("2026-02-20"),
    validUntil: new Date("2026-05-31"),
    maxUsagePerUser: 4
  },
  {
    title: "Business Class Upgrade",
    description: "Upgrade to business class for just 30% extra on selected flights.",
    discountPercentage: 30,
    applicableUserRoles: ['prime'],
    validFrom: new Date("2026-02-20"),
    validUntil: new Date("2026-04-30"),
    maxUsagePerUser: 2
  },
  {
    title: "Last Minute Deal",
    description: "Book within 24 hours of departure and save up to 40% on unsold seats.",
    discountPercentage: 40,
    applicableUserRoles: ['prime'],
    validFrom: new Date("2026-02-20"),
    validUntil: new Date("2026-12-31"),
    maxUsagePerUser: 1
  }
];

async function seed() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://your-user:your-password@your-cluster.mongodb.net/flights-booking', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing flights and offers...');
    await Flight.deleteMany({});
    await Offer.deleteMany({});
    console.log('✅ Cleared existing data');

    // Insert sample flights
    console.log('Inserting sample flights...');
    const flights = await Flight.insertMany(sampleFlights);
    console.log(`✅ Added ${flights.length} flights`);

    // Insert sample offers
    console.log('Inserting sample offers...');
    const offers = await Offer.insertMany(sampleOffers);
    console.log(`✅ Added ${offers.length} offers`);

    console.log('\n📊 Summary:');
    console.log(`   - Flights: ${flights.length}`);
    console.log(`   - Offers: ${offers.length}`);
    console.log('\n✨ Database seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

seed();

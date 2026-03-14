const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide offer title'],
    },
    description: {
      type: String,
      required: [true, 'Please provide offer description'],
    },
    discountPercentage: {
      type: Number,
      required: [true, 'Please provide discount percentage'],
      min: 0,
      max: 100,
    },
    maxDiscountAmount: {
      type: Number,
      default: null,
    },
    applicableUserRoles: {
      type: [String],
      enum: ['prime', 'normal', 'both'],
      default: ['prime'], // By default only for prime users
    },
    applicableRoutes: [
      {
        departureCity: String,
        arrivalCity: String,
      },
    ],
    validFrom: {
      type: Date,
      required: true,
    },
    validUntil: {
      type: Date,
      required: true,
    },
    maxUsagePerUser: {
      type: Number,
      default: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    usedCount: {
      type: Number,
      default: 0,
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

module.exports = mongoose.model('Offer', offerSchema);

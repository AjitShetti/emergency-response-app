// backend/src/models/Emergency.js
const mongoose = require('mongoose');

const emergencySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['Ambulance', 'Police', 'Fire']
  },
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['Pending', 'En Route', 'Arrived', 'Cancelled', 'Completed'],
    default: 'Pending'
  },
  user: {
    // In a real app, you would have user authentication
    // and this would be a reference to the user model
    deviceId: String,
    name: String
  },
  responderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Responder',
    default: null
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  estimatedArrivalTime: {
    type: Date,
    default: null
  },
  completedAt: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model('Emergency', emergencySchema);
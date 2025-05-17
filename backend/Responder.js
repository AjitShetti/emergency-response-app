// backend/src/models/Responder.js
const mongoose = require('mongoose');

const responderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Ambulance', 'Police', 'Fire']
  },
  vehicle: {
    type: String,
    required: true
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
    enum: ['Available', 'Assigned', 'Unavailable'],
    default: 'Available'
  },
  currentEmergencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Emergency',
    default: null
  }
});

module.exports = mongoose.model('Responder', responderSchema);
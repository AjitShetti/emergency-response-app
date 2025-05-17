// backend/src/services/mockAI.js
/**
 * Mock AI service for assigning responders to emergencies
 * In a real application, this would be a more sophisticated algorithm
 * that considers factors like distance, traffic, responder workload, etc.
 */

const Responder = require('../models/Responder');

// Mock responder database for development
const mockResponders = [
  {
    name: 'Ambulance Team A',
    type: 'Ambulance',
    vehicle: 'Ambulance A-101',
    location: { latitude: 37.7749, longitude: -122.4194 }, // San Francisco
    status: 'Available'
  },
  {
    name: 'Police Unit B',
    type: 'Police',
    vehicle: 'Police Car B-202',
    location: { latitude: 37.7833, longitude: -122.4167 }, // San Francisco
    status: 'Available'
  },
  {
    name: 'Fire Truck C',
    type: 'Fire',
    vehicle: 'Fire Engine C-303',
    location: { latitude: 37.7694, longitude: -122.4862 }, // San Francisco
    status: 'Available'
  },
  {
    name: 'Ambulance Team D',
    type: 'Ambulance',
    vehicle: 'Ambulance D-404',
    location: { latitude: 37.7575, longitude: -122.4376 }, // San Francisco
    status: 'Available'
  },
  {
    name: 'Police Unit E',
    type: 'Police',
    vehicle: 'Police SUV E-505',
    location: { latitude: 37.8044, longitude: -122.4484 }, // San Francisco
    status: 'Available'
  }
];

// Initialize mock responders in the database
const initializeMockResponders = async () => {
  try {
    // Check if responders already exist
    const count = await Responder.countDocuments();
    if (count === 0) {
      // Insert mock responders if none exist
      await Responder.insertMany(mockResponders);
      console.log('Mock responders initialized');
    }
  } catch (error) {
    console.error('Error initializing mock responders:', error);
  }
};

// Find the best responder for an emergency
const findBestResponder = async (emergencyType, location) => {
  try {
    // Find available responders of the requested type
    const availableResponders = await Responder.find({
      type: emergencyType,
      status: 'Available'
    });
    
    if (availableResponders.length === 0) {
      // If no responders of the requested type are available,
      // find any available responder
      const anyResponder = await Responder.findOne({ status: 'Available' });
      
      if (!anyResponder) {
        return null; // No responders available
      }
      
      return anyResponder;
    }
    
    // For MVP, just pick the first available responder
    // In a real application, you would calculate distance, consider traffic, etc.
    return availableResponders[0];
  } catch (error) {
    console.error('Error finding responder:', error);
    return null;
  }
};

// Calculate estimated arrival time (mock implementation)
const calculateEstimatedArrivalTime = (responderLocation, emergencyLocation) => {
  // For MVP, just add a random time between 5-15 minutes
  const arrivalMinutes = Math.floor(Math.random() * 10) + 5;
  const arrivalTime = new Date();
  arrivalTime.setMinutes(arrivalTime.getMinutes() + arrivalMinutes);
  return arrivalTime;
};

module.exports = {
  initializeMockResponders,
  findBestResponder,
  calculateEstimatedArrivalTime
};
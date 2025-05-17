// backend/src/controllers/emergencyController.js
const Emergency = require('../models/Emergency');
const Responder = require('../models/Responder');
const mockAI = require('../services/mockAI');
const notificationService = require('../services/notificationService');

// Create a new emergency (SOS request)
exports.createEmergency = async (req, res) => {
  try {
    const { type, location, timestamp } = req.body;
    
    // Validate request
    if (!type || !location || !location.latitude || !location.longitude) {
      return res.status(400).json({ 
        error: 'Missing required fields: type, location (latitude, longitude)' 
      });
    }
    
    // Create new emergency
    const emergency = new Emergency({
      type,
      location,
      timestamp: timestamp || new Date(),
      status: 'Pending'
    });
    
    // Save emergency to database
    await emergency.save();
    
    // Find best responder using mock AI
    const responder = await mockAI.findBestResponder(type, location);
    
    if (!responder) {
      return res.status(200).json({
        emergencyId: emergency._id,
        message: 'Emergency created, but no responders available at the moment',
        status: 'Pending'
      });
    }
    
    // Calculate estimated arrival time
    const estimatedArrivalTime = mockAI.calculateEstimatedArrivalTime(
      responder.location,
      emergency.location
    );
    
    // Update emergency with responder info
    emergency.responderId = responder._id;
    emergency.estimatedArrivalTime = estimatedArrivalTime;
    await emergency.save();
    
    // Update responder status
    responder.status = 'Assigned';
    responder.currentEmergencyId = emergency._id;
    await responder.save();
    
    // Send notification to responder (mock)
    notificationService.notifyResponder(responder._id, emergency._id);
    
    // Return response with responder info
    res.status(201).json({
      emergencyId: emergency._id,
      status: emergency.status,
      responder: {
        id: responder._id,
        name: responder.name,
        vehicle: responder.vehicle,
      },
      estimatedArrivalTime
    });
  } catch (error) {
    console.error('Error creating emergency:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get emergency status
exports.getEmergencyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    
    const emergency = await Emergency.findById(id);
    
    if (!emergency) {
      return res.status(404).json({ error: 'Emergency not found' });
    }
    
    // For MVP, randomly update status to simulate progression
    // In a real app, this would be updated by the responder
    if (emergency.status === 'Pending') {
      if (Math.random() > 0.7) {
        emergency.status = 'En Route';
        await emergency.save();
      }
    } else if (emergency.status === 'En Route') {
      if (Math.random() > 0.8) {
        emergency.status = 'Arrived';
        await emergency.save();
      }
    }
    
    res.status(200).json({
      status: emergency.status,
      estimatedArrivalTime: emergency.estimatedArrivalTime
    });
  } catch (error) {
    console.error('Error getting emergency status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Cancel emergency
exports.cancelEmergency = async (req, res) => {
  try {
    const { id } = req.params;
    
    const emergency = await Emergency.findById(id);
    
    if (!emergency) {
      return res.status(404).json({ error: 'Emergency not found' });
    }
    
    // Update emergency status
    emergency.status = 'Cancelled';
    await emergency.save();
    
    // If a responder was assigned, update their status
    if (emergency.responderId) {
      const responder = await Responder.findById(emergency.responderId);
      if (responder) {
        responder.status = 'Available';
        responder.currentEmergencyId = null;
        await responder.save();
      }
    }
    
    res.status(200).json({ success: true, message: 'Emergency cancelled' });
  } catch (error) {
    console.error('Error cancelling emergency:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
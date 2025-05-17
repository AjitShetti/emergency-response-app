// backend/src/services/notificationService.js
/**
 * Mock notification service
 * In a real application, this would send actual notifications
 * through services like Twilio, Firebase Cloud Messaging, etc.
 */

// Mock function to notify a responder about a new emergency
const notifyResponder = (responderId, emergencyId) => {
  console.log(`[NOTIFICATION SERVICE] Notifying responder ${responderId} about emergency ${emergencyId}`);
  
  // For development purposes, log the notification
  console.log({
    type: 'NEW_EMERGENCY_ASSIGNMENT',
    timestamp: new Date(),
    responderId,
    emergencyId,
    message: 'You have been assigned to a new emergency. Please respond immediately.'
  });
  
  // In a real app, you would send an SMS or push notification here
  // Example with Twilio (commented out as it's not implemented):
  /*
  const twilioClient = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  twilioClient.messages.create({
    body: `You have been assigned to emergency #${emergencyId}. Please respond immediately.`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: responderPhoneNumber  // You would get this from the responder's profile
  });
  */
  
  return true; // Return success
};

// Mock function to update user about responder status
const notifyUser = (userId, emergencyId, status) => {
  console.log(`[NOTIFICATION SERVICE] Notifying user ${userId} about emergency ${emergencyId} status update: ${status}`);
  
  // For development purposes, log the notification
  console.log({
    type: 'EMERGENCY_STATUS_UPDATE',
    timestamp: new Date(),
    userId,
    emergencyId,
    status,
    message: `Your emergency request status has been updated to: ${status}`
  });
  
  return true; // Return success
};

module.exports = {
  notifyResponder,
  notifyUser
};
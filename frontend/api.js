// src/services/api.js
import { API_BASE_URL } from '../utils/constants';

// Function to send emergency request to the backend
export const sendEmergencyRequest = async (emergencyData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emergencyData),
    });
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Function to get the status of an emergency
export const getEmergencyStatus = async (emergencyId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/emergency/${emergencyId}/status`);
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Function to cancel an emergency
export const cancelEmergency = async (emergencyId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/emergency/${emergencyId}/cancel`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Mock implementation for development
// When the real API is not available, we can use these mock functions

export const mockSendEmergencyRequest = (emergencyData) => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Mock response data
      const response = {
        emergencyId: 'mock-' + Date.now(),
        status: 'Pending',
        responder: {
          id: 'resp-' + Math.floor(Math.random() * 1000),
          name: 'Responder ' + Math.floor(Math.random() * 10),
          vehicle: `Vehicle ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${Math.floor(Math.random() * 100)}`,
        }
      };
      
      resolve(response);
    }, 1500);
  });
};

export const mockGetEmergencyStatus = (emergencyId) => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Randomly change status to simulate progression
      const random = Math.random();
      let status = 'Pending';
      
      if (random < 0.3) {
        status = 'Pending';
      } else if (random < 0.7) {
        status = 'En Route';
      } else {
        status = 'Arrived';
      }
      
      resolve({ status });
    }, 500);
  });
};

export const mockCancelEmergency = (emergencyId) => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};
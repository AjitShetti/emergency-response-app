// backend/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Load environment variables
dotenv.config();

// Import routes
const emergencyRoutes = require('./src/routes/emergencyRoutes');
const responderRoutes = require('./src/routes/responderRoutes');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/emergency-response', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Log HTTP requests

// Routes
app.use('/sos', emergencyRoutes);
app.use('/responder', responderRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Emergency Response API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // For testing
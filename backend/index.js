const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
const allowedOrigins = [
  'https://wellness-rag-micro-app.vercel.app',
  'https://wellness-rag-micro-app.vercel.app/',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin); // Log for debugging
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Force preflight to always return 200 with headers to satisfy strict browsers
app.options('*', cors());

app.use(express.json());

// MongoDB Connection - with better error handling for serverless
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => {
      console.error('MongoDB connection error:', err.message);
      // Don't crash the app if MongoDB fails - logging is optional
    });
} else {
  console.warn('MONGODB_URI not set - logging will be disabled');
}

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Wellness App API is running');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// RAG Routes - wrap in try-catch to prevent crashes
try {
  const askRoutes = require('./routes/ask.routes');
  const feedbackRoutes = require('./routes/feedback.routes');
  app.use('/ask', askRoutes);
  app.use('/feedback', feedbackRoutes);
} catch (error) {
  console.error('Error loading routes:', error.message);
  // Add fallback route to show error
  app.use('/ask', (req, res) => {
    res.status(500).json({ error: 'Routes failed to load. Check server logs.' });
  });
  app.use('/feedback', (req, res) => {
    res.status(500).json({ error: 'Routes failed to load. Check server logs.' });
  });
}

// Only start server if not in Vercel (serverless) environment
if (process.env.VERCEL !== '1' && !process.env.VERCEL_ENV) {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}

module.exports = app;

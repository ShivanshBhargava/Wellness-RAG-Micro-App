const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS Configuration
const allowedOrigins = [
  'https://wellness-rag-micro-app.vercel.app',
  'https://wellness-rag-micro-app.vercel.app/',
  'http://localhost:5173',
  'http://localhost:3000'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list or is a vercel.app subdomain
    if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all for now, can restrict later
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Type'],
  maxAge: 86400 // 24 hours
};

// CORS middleware - must be before other middleware
app.use(cors(corsOptions));

// Additional CORS headers middleware for Vercel - must handle OPTIONS explicitly
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Set CORS headers for all responses
  if (origin && (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app'))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (origin) {
    // Allow any vercel.app origin
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Max-Age', '86400');
  
  // Handle preflight requests - return 200 with headers
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }
  next();
});

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Wellness App API is running');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// RAG Routes
const askRoutes = require('./routes/ask.routes');
const feedbackRoutes = require('./routes/feedback.routes');
app.use('/ask', askRoutes);
app.use('/feedback', feedbackRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

module.exports = app;

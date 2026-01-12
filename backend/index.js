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

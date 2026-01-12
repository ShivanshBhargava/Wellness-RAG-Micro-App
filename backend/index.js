const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS Configuration
const corsOptions = {
  origin: [
    'https://wellness-rag-micro-app.vercel.app',
    'https://wellness-rag-micro-app.vercel.app/',
    'http://localhost:5173',
    'http://localhost:3000',
    /\.vercel\.app$/
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Handle preflight requests
app.options('*', cors(corsOptions));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Wellness App API is running');
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

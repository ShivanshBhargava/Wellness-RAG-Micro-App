const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

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
app.use('/ask', askRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

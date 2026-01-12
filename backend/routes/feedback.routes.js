const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback.controller');

/**
 * POST /feedback
 * Endpoint to submit feedback for a specific RAG interaction.
 */
router.post('/', feedbackController.handleFeedback);

module.exports = router;

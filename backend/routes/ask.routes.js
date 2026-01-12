const express = require('express');
const router = express.Router();
const askController = require('../controllers/ask.controller');

/**
 * POST /ask
 * The main endpoint for asking wellness questions.
 */
router.post('/', askController.handleAsk);

module.exports = router;

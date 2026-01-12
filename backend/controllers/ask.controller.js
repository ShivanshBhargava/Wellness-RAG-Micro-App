const mongoose = require('mongoose');
const safetyService = require('../services/safety.service');
const retrievalService = require('../services/retrieval.service');
const chatService = require('../services/chat.service');
const loggingService = require('../services/logging.service');

// ... (rest of imports)

exports.handleAsk = async (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    // Generate a valid MongoDB ID upfront so we can return it immediately
    // independent of the background logging process
    const queryId = new mongoose.Types.ObjectId();

    try {
        console.log(`\n--- Incoming Question: "${query}" ---`);

        // 1. SAFETY DETECTION
        const safetyResult = safetyService.detectSafetyRisk(query);

        if (safetyResult.isUnsafe) {
            console.log('[SAFETY] Risk detected, returning safety-first response.');
            const safetyFirstAnswer = safetyService.generateSafetyResponse(safetyResult.reason);

            // Log the interaction even if it's unsafe
            loggingService.logInteraction({
                userQueryId: queryId,
                userQuery: query,
                retrievedChunks: [],
                aiResponse: safetyFirstAnswer,
                safety: safetyResult
            }).catch(err => console.error('Background logging failed:', err.message));

            return res.status(200).json({
                answer: safetyFirstAnswer,
                sources: [],
                isUnsafe: true,
                queryId: queryId
            });
        }

        // 2. RETRIEVAL
        const contextChunks = await retrievalService.getRelevantContext(query, 3);
        const sources = contextChunks.map(chunk => ({
            title: chunk.title,
            link: chunk.source_link,
            articleId: chunk.article_id
        }));

        // 3. ANSWER GENERATION
        const aiAnswer = await chatService.generateGroundedResponse(query, contextChunks);

        // 4. RESPONSE (Send as soon as generation is done)
        res.status(200).json({
            answer: aiAnswer,
            sources: sources,
            isUnsafe: false,
            queryId: queryId
        });

        // 5. BACKGROUND MONGODB LOGGING
        // We do NOT await this to ensure the user gets their answer immediately
        loggingService.logInteraction({
            userQueryId: queryId,
            userQuery: query,
            retrievedChunks: contextChunks,
            aiResponse: aiAnswer,
            safety: safetyResult
        }).catch(err => console.error('Background logging failed:', err.message));


    } catch (error) {
        console.error('Ask Controller Error:', error.message);
        res.status(500).json({
            error: 'An internal error occurred while processing your request.',
            message: error.message
        });
    }
};

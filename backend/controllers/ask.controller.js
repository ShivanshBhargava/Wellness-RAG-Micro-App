const safetyService = require('../services/safety.service');
const retrievalService = require('../services/retrieval.service');
const chatService = require('../services/chat.service');
const loggingService = require('../services/logging.service');

/**
 * ASK CONTROLLER
 * Handles the logic for the /ask endpoint, orchestrating safety, retrieval, 
 * generation, and logging.
 */
exports.handleAsk = async (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    try {
        console.log(`\n--- Incoming Question: "${query}" ---`);

        // 1. SAFETY DETECTION
        const safetyResult = safetyService.detectSafetyRisk(query);

        if (safetyResult.isUnsafe) {
            console.log('[SAFETY] Risk detected, returning safety-first response.');
            const safetyFirstAnswer = safetyService.generateSafetyResponse(safetyResult.reason);

            // Log the interaction even if it's unsafe
            await loggingService.logInteraction({
                userQuery: query,
                retrievedChunks: [],
                aiResponse: safetyFirstAnswer,
                safety: safetyResult
            });

            return res.status(200).json({
                answer: safetyFirstAnswer,
                sources: [],
                isUnsafe: true
            });
        }

        // 2. RETRIEVAL
        const contextChunks = await retrievalService.getRelevantContext(query, 3);
        const sources = contextChunks.map(chunk => ({
            title: chunk.title,
            link: chunk.source_link
        }));

        // 3. ANSWER GENERATION
        const aiAnswer = await chatService.generateGroundedResponse(query, contextChunks);

        // 4. MONGODB LOGGING
        // We don't await this to avoid delaying the response to the user,
        // unless you want strict consistency. Here we do to ensure atomic writes as requested.
        await loggingService.logInteraction({
            userQuery: query,
            retrievedChunks: contextChunks,
            aiResponse: aiAnswer,
            safety: safetyResult
        });

        // 5. RESPONSE
        res.status(200).json({
            answer: aiAnswer,
            sources: sources,
            isUnsafe: false
        });

    } catch (error) {
        console.error('Ask Controller Error:', error.message);
        res.status(500).json({
            error: 'An internal error occurred while processing your request.',
            message: error.message
        });
    }
};

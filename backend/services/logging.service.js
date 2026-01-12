const Query = require('../models/Query');

/**
 * LOGGING SERVICE:
 * Responsible for persisting RAG interactions to MongoDB.
 * 
 * DESIGN DECISIONS:
 * 1. Atomic Writes: Uses Mongoose .create() to ensure the entire interaction 
 *    record is committed in a single operation.
 * 2. Traceability: Maps the retrieved chunks to their IDs for auditing.
 * 3. Asynchrony: Designed to be awaited to ensure data integrity before 
 *    completing the API request.
 */

class LoggingService {
    /**
     * Logs a RAG interaction to the database.
     * @param {Object} data - The interaction data.
     * @param {string} data.userQuery - The raw user input.
     * @param {Array} data.retrievedChunks - Array of chunk objects with IDs and content.
     * @param {string} data.aiResponse - The generated or safety-first answer.
     * @param {Object} data.safety - The safety detection result { isUnsafe, reason }.
     * @returns {Promise<Object>} The saved database document.
     */
    async logInteraction({ userQuery, retrievedChunks = [], aiResponse, safety }) {
        try {
            // Map chunks to the schema format
            const formattedChunks = retrievedChunks.map(chunk => ({
                chunkId: chunk.chunk_id || chunk.id,
                title: chunk.title,
                score: chunk.score,
                content: chunk.content
            }));

            // Atomic creation of the log entry
            const logEntry = await Query.create({
                userQuery,
                safetyFlag: {
                    isUnsafe: safety.isUnsafe,
                    reason: safety.reason
                },
                retrievedChunks: formattedChunks,
                aiResponse,
                modelUsed: 'gemini-flash-latest'
            });

            console.log(`[LOGGED] Interaction saved: ${logEntry._id}`);
            return logEntry;
        } catch (error) {
            // We log the error but don't throw it to avoid crashing the user's response
            // unless critical data persistence is required for the specific business logic.
            console.error('Logging Service Error:', error.message);
            return null;
        }
    }
}

module.exports = new LoggingService();

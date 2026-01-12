const embeddingService = require('./embedding.service');
const vectorStore = require('./vectorStore.service');

/**
 * RETRIEVAL SERVICE:
 * Responsible for finding the most semantically relevant knowledge chunks 
 * for a given user query.
 * 
 * WORKFLOW:
 * 1. Embed Query: Convert user string into a vector using Gemini.
 * 2. Search Index: Compare query vector against the local vector store (cosine similarity).
 * 3. Rank & Filter: Return the top-K most relevant chunks with full metadata.
 */

class RetrievalService {
    /**
     * Retrieves relevant context chunks for a query.
     * @param {string} query - The user's natural language question.
     * @param {number} topK - Number of chunks to retrieve (default: 3).
     * @returns {Promise<Array>} List of relevant chunks with scores and metadata.
     */
    async getRelevantContext(query, topK = 3) {
        try {
            console.log(`--- Retrieval Started for: "${query}" ---`);

            // 1. Generate embedding for the query
            const queryEmbedding = await embeddingService.generateEmbedding(query);

            // 2. Perform similarity search in our local vector store
            // Note: We use our custom JSON-backed store which replaces FAISS for stability.
            const results = await vectorStore.search(queryEmbedding, topK);

            console.log(`--- Retrieval Complete: Found ${results.length} relevant chunks ---`);
            return results;

        } catch (error) {
            console.error('Retrieval Service Error:', error.message);
            throw new Error('Failed to retrieve relevant knowledge for your query.');
        }
    }
}

module.exports = new RetrievalService();

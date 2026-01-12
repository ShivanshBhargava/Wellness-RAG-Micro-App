const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

/**
 * EMBEDDING SERVICE:
 * Responsible for converting text chunks into high-dimensional vector representations.
 * We use Google's 'text-embedding-004' model for consistency with the Gemini pipeline.
 */

class EmbeddingService {
    constructor() {
        if (!process.env.GEMINI_API_KEY) {
            console.warn('GEMINI_API_KEY is missing. Embedding service will fail until configured.');
        }
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'PLACEHOLDER');
    }

    async generateEmbedding(text) {
        try {
            const model = this.genAI.getGenerativeModel({ model: 'text-embedding-004' });
            const result = await model.embedContent(text);
            return result.embedding.values;
        } catch (error) {
            console.error('Error generating embedding:', error.message);
            throw error;
        }
    }

    async generateEmbeddingsBatch(texts) {
        // Simple sequential implementation for clarity and rate-limit respect
        const embeddings = [];
        for (const text of texts) {
            const emb = await this.generateEmbedding(text);
            embeddings.push(emb);
        }
        return embeddings;
    }
}

module.exports = new EmbeddingService();

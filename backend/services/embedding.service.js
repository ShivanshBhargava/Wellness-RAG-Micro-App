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

    // Helper for controlled delays
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async generateEmbedding(text, retryCount = 0) {
        try {
            const model = this.genAI.getGenerativeModel({ model: 'text-embedding-004' });
            const result = await model.embedContent(text);
            return result.embedding.values;
        } catch (error) {
            // Basic exponential backoff for rate limits (429 errors)
            if (error.message.includes('429') && retryCount < 3) {
                console.warn(`Rate limit hit, retrying in ${Math.pow(2, retryCount)}s...`);
                await this.delay(Math.pow(2, retryCount) * 1000);
                return this.generateEmbedding(text, retryCount + 1);
            }
            console.error('Embedding error:', error.message);
            throw error;
        }
    }

    async generateEmbeddingsBatch(texts) {
        const embeddings = [];
        for (const text of texts) {
            const emb = await this.generateEmbedding(text);
            embeddings.push(emb);
            // Small pause between requests for rate-limit safety
            await this.delay(200);
        }
        return embeddings;
    }
}

module.exports = new EmbeddingService();

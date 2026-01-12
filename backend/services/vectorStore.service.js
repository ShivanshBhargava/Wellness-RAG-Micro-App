const fs = require('fs');
const path = require('path');
const cosineSimilarity = require('compute-cosine-similarity');

/**
 * VECTOR STORAGE SERVICE:
 * Optimized for small-to-medium datasets (tens to hundreds of articles).
 */

const INDEX_FILE = path.join(__dirname, '../rag/vector_index.json');

class VectorStoreService {
    constructor() {
        this.items = [];
        this.loadIndex();
    }

    loadIndex() {
        try {
            // Using require() ensures Vercel's bundler includes the file in the deployment automatically
            // This is crucial for Serverless Function bundling
            this.items = require('../rag/vector_index.json');
            console.log(`Loaded ${this.items.length} items from local vector store.`);
        } catch (err) {
            console.warn('Vector store not found or empty. Please run ingestion if running locally.');
            this.items = [];
        }
    }

    async initialize() {
        // Ensure the directory exists
        const dir = path.dirname(INDEX_FILE);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        console.log('Local Vector Store initialized at:', INDEX_FILE);
    }

    async addItem(embedding, metadata) {
        this.items.push({
            vector: embedding,
            metadata: metadata
        });
        this.saveIndex();
    }

    saveIndex() {
        try {
            fs.writeFileSync(INDEX_FILE, JSON.stringify(this.items, null, 2));
        } catch (err) {
            console.error('Failed to save vector index:', err.message);
        }
    }

    async search(queryEmbedding, topK = 3) {
        if (!this.items.length) {
            console.warn('Vector store is empty. Please run ingestion first.');
            return [];
        }

        // Calculate similarities for all items
        const results = this.items.map(item => {
            const similarity = cosineSimilarity(queryEmbedding, item.vector);
            return {
                score: similarity || 0,
                ...item.metadata
            };
        });

        // Sort by score descending and take topK
        return results
            .sort((a, b) => b.score - a.score)
            .slice(0, topK);
    }
}

module.exports = new VectorStoreService();

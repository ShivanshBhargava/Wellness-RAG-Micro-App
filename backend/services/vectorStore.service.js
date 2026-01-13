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
        this._loaded = false;
    }

    loadIndex() {
        if (this._loaded) {
            return;
        }
        
        try {
            // Using require() ensures Vercel's bundler includes the file in the deployment automatically
            // This is crucial for Serverless Function bundling
            const indexPath = path.join(__dirname, '../rag/vector_index.json');
            
            // Try require first (for bundled files in Vercel)
            try {
                this.items = require('../rag/vector_index.json');
                console.log(`Loaded ${this.items.length} items from vector store (via require).`);
            } catch (requireErr) {
                // Fallback to fs.readFileSync for local development
                if (fs.existsSync(indexPath)) {
                    const data = fs.readFileSync(indexPath, 'utf8');
                    this.items = JSON.parse(data);
                    console.log(`Loaded ${this.items.length} items from vector store (via fs).`);
                } else {
                    throw new Error('Vector index file not found');
                }
            }
            this._loaded = true;
        } catch (err) {
            console.warn('Vector store not found or empty:', err.message);
            console.warn('Please ensure vector_index.json exists in rag/ directory.');
            this.items = [];
            this._loaded = true; // Mark as loaded to prevent retry loops
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
        // Lazy load the index if not already loaded
        if (!this._loaded) {
            this.loadIndex();
        }
        
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

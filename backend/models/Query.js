const mongoose = require('mongoose');

/**
 * QUERY INTERACTION SCHEMA:
 * This model encapsulates the entire lifecycle of a RAG interaction.
 * We store the query, the safety result, the context used, and the final answer 
 * in a single document to ensure full auditability and training data potential.
 */

const QuerySchema = new mongoose.Schema({
    // 1. THE USER QUERY
    // Why: To track what users are asking and identify knowledge gaps.
    userQuery: {
        type: String,
        required: true,
        trim: true
    },

    // 2. SAFETY FLAGS
    // Why: To monitor how often the safety guardrails are triggered and 
    // audit the system's compliance with safety standards.
    safetyFlag: {
        isUnsafe: { type: Boolean, default: false },
        reason: { type: String, default: null }
    },

    // 3. RETRIEVED CHUNKS (CONTEXT)
    // Why: Essential for debugging. This tells us exactly what the AI was "looking at"
    // when it produced its answer, helping us improve the vector search.
    retrievedChunks: [{
        chunkId: { type: String },
        title: { type: String },
        score: { type: Number },
        content: { type: String }
    }],

    // 4. AI ANSWER
    // Why: To log the final output presented to the user.
    aiResponse: {
        type: String,
        default: null
    },

    // 5. USER FEEDBACK
    // Why: This is the "Closed Loop" for RAG. It allows us to perform
    // RLHF (Reinforcement Learning from Human Feedback) or basic quality analytics.
    feedback: {
        isHelpful: { type: Boolean },
        rating: { type: Number, min: 1, max: 5 }, // 1-5 star rating
        comment: { type: String, trim: true },
        receivedAt: { type: Date }
    },

    // METADATA
    // Why: For performance monitoring across different model versions.
    modelUsed: {
        type: String,
        default: 'gemini-flash-latest'
    }

}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Query', QuerySchema);

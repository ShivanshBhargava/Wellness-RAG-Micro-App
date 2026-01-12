require('dotenv').config();
const mongoose = require('mongoose');
const askController = require('./controllers/ask.controller');
const feedbackController = require('./controllers/feedback.controller');

async function verifyFeedbackAPI() {
    console.log('Connecting to MongoDB...');
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected.');

        // 1. First, create a query to get a real ID
        console.log('\n--- Step 1: Create a Query ---');
        const askReq = { body: { query: "Tell me about Sun Salutation." } };
        let queryId;

        const askRes = {
            status: (code) => ({ json: (data) => { queryId = data.queryId; } })
        };
        await askController.handleAsk(askReq, askRes);

        if (!queryId) {
            throw new Error("Failed to get queryId from /ask");
        }
        console.log('Created Query ID:', queryId);

        // 2. Submit Feedback for that ID
        console.log('\n--- Step 2: Submit Feedback ---');
        const feedbackReq = {
            body: {
                queryId: queryId,
                helpful: true,
                comment: "Very accurate information!"
            }
        };

        const feedbackRes = {
            status: function (code) {
                this.statusCode = code;
                return this;
            },
            json: function (data) {
                console.log('Status Code:', this.statusCode);
                console.log('Response:', data.message);
            }
        };

        await feedbackController.handleFeedback(feedbackReq, feedbackRes);

    } catch (err) {
        console.error('Feedback verification failed:', err.message);
    } finally {
        await mongoose.connection.close();
        console.log('\nMongoDB connection closed.');
    }
}

verifyFeedbackAPI();

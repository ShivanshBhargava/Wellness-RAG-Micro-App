require('dotenv').config();
const mongoose = require('mongoose');
const askController = require('./controllers/ask.controller');

async function verifyAskAPI() {
    console.log('Connecting to MongoDB...');
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected.');

        // Mock Express Request and Response
        const req = {
            body: { query: "How do I do Tadasana safely?" }
        };

        const res = {
            status: function (code) {
                this.statusCode = code;
                return this;
            },
            json: function (data) {
                this.data = data;
                console.log('\n--- API RESPONSE ---');
                console.log('Status Code:', this.statusCode);
                console.log('Is Unsafe:', data.isUnsafe);
                console.log('Answer Snippet:', data.answer.substring(0, 100) + '...');
                console.log('Sources:', data.sources.map(s => s.title));
            }
        };

        await askController.handleAsk(req, res);

    } catch (err) {
        console.error('API Verification Failed:', err.message);
    } finally {
        await mongoose.connection.close();
        console.log('\nMongoDB connection closed.');
    }
}

verifyAskAPI();

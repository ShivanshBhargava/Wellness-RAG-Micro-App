require('dotenv').config();
const retrievalService = require('./services/retrieval.service');

async function testRetrieval() {
    const query = "What are the benefits of Tadasana for posture?";
    console.log(`Testing Retrieval for query: "${query}"`);

    try {
        const results = await retrievalService.getRelevantContext(query, 3);

        console.log("\n--- Top Retrieved Chunks ---");
        results.forEach((match, i) => {
            console.log(`\nMatch #${i + 1} (Score: ${match.score.toFixed(4)})`);
            console.log(`Title: ${match.title}`);
            console.log(`Content Snippet: ${match.content.substring(0, 150)}...`);
            console.log(`Source: ${match.source_link}`);
        });
    } catch (err) {
        console.error("Test failed:", err.message);
    }
}

testRetrieval();

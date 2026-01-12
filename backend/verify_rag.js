require('dotenv').config();
const safetyService = require('./services/safety.service');
const retrievalService = require('./services/retrieval.service');
const chatService = require('./services/chat.service');

async function testRAGFlow(query) {
    console.log(`\n=========================================`);
    console.log(`USER QUERY: "${query}"`);
    console.log(`=========================================`);

    // 1. Safety Check
    const safety = safetyService.detectSafetyRisk(query);
    if (safety.isUnsafe) {
        console.log(`\n[TRIPPED] Safety Guardrail...`);
        console.log(safetyService.generateSafetyResponse(safety.reason));
        return;
    }

    // 2. Retrieval
    try {
        const context = await retrievalService.getRelevantContext(query, 3);
        console.log(`\n[RETRIEVED] ${context.length} knowledge chunks.`);

        // 3. Generation
        console.log(`\n[GENERATING] Grounded response...`);
        const response = await chatService.generateGroundedResponse(query, context);

        console.log(`\n--- FINAL RESPONSE ---`);
        console.log(response);

    } catch (err) {
        console.error(`\n[ERROR] RAG Flow failed:`, err.message);
    }
}

async function runTests() {
    // Test 1: Grounded knowledge
    await testRAGFlow("How do I stay balanced in Tree Pose?");

    // Test 2: Out of context (Hallucination check)
    await testRAGFlow("What is the recipe for a protein shake?");

    // Test 3: Safety check
    await testRAGFlow("Can I do yoga if I just had spinal surgery?");
}

runTests();

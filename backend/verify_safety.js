const safetyService = require('./services/safety.service');

const testQueries = [
    "I'm 6 months pregnant, can I do yoga?",
    "Is it safe to practice after a heart condition?",
    "I just had surgery last week.",
    "Show me some easy yoga for beginners."
];

testQueries.forEach(query => {
    console.log(`\nQuery: "${query}"`);
    const risk = safetyService.detectSafetyRisk(query);
    if (risk.isUnsafe) {
        console.log("Status: [UNSAFE]");
        console.log("Reason:", risk.reason);
        console.log("Response:", safetyService.generateSafetyResponse(risk.reason));
    } else {
        console.log("Status: [SAFE]");
    }
});

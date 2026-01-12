const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

/**
 * CHAT SERVICE:
 * Responsible for synthesizing the final response using retrieved context 
 * and the Large Language Model (Gemini).
 * 
 * DESIGN DECISIONS:
 * 1. Prompt Engineering: Uses a highly structured "System Prompt" to enforce 
 *    grounding and prevent hallucinations.
 * 2. Context Injection: Directly injects the most relevant knowledge chunks 
 *    into the instruction set.
 * 3. Graceful Failure: Instructs the model to admit when information is missing, 
 *    avoiding confident but false answers ("LLM Hallucinations").
 */

class ChatService {
    constructor() {
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'PLACEHOLDER');
    }

    /**
     * Generates a grounded RAG response.
     * @param {string} query - The user's question.
     * @param {Array} contextChunks - The retrieved knowledge snippets.
     * @returns {Promise<string>} The generative response.
     */
    async generateGroundedResponse(query, contextChunks) {
        try {
            const model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

            // Format context into a readable block for the LLM
            const formattedContext = contextChunks.map((chunk, i) => (
                `[Chunk ${i + 1}] (Source: ${chunk.title})\nContent: ${chunk.content}`
            )).join('\n\n');

            // --- THE FINAL LLM PROMPT DESIGN ---
            const prompt = `
YOU ARE A PROFESSIONAL YOGA & WELLNESS ASSISTANT.

GOAL: Provide accurate, encouraging, and safe yoga guidance based ONLY on the provided KNOWLEDGE CHUNKS.

---
KNOWLEDGE CHUNKS:
${formattedContext}
---

CONSTRAINTS:
1. GROUNDED ANSWERS: Use ONLY the provided chunks above to answer. Do not use external knowledge or invent facts.
2. NO HALLUCINATIONS: If the answer is NOT in the chunks, say: "I apologize, but I don't have enough verified information on that specific topic to provide a safe answer. Please consult a certified yoga professional."
3. CITATIONS: When using information, mention which article or pose it comes from (e.g., "According to [Source Title]...").
4. TONE: Gentle, professional, and clear.
5. SAFETY: If the user describes a physical pain, remind them to stop and listen to their body.
6. FORMATTING: Use clean Markdown. Use **bold** for pose names or key benefits. Use *italics* for emphasis. Use bullet points for steps or benefits. Avoid excessive symbols or decorative characters.

USER QUERY: ${query}

RESPONSE:
            `.trim();

            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();

        } catch (error) {
            console.error('Chat Service Error:', error.message);
            throw new Error('I encountered an error while generating your wellness guidance.');
        }
    }
}

module.exports = new ChatService();

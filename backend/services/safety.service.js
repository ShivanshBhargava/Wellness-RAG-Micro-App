/**
 * SAFETY DETECTION SERVICE:
 * Responsible for identifying high-risk user queries that require medical supervision
 * rather than automated yoga guidance.
 * 
 * DESIGN DECISIONS:
 * 1. Keyword-Based Heuristics: Fast, deterministic, and doesn't require an LLM call, 
 *    making it a cost-effective and low-latency first line of defense.
 * 2. Category-Specific Flags: Allows for tailored safety warnings based on the specific 
 *    condition mentioned (e.g., pregnancy vs. surgery).
 * 3. Proactive Disclaimer: In a wellness RAG app, it's safer to over-flag (false positive) 
 *    than to under-flag, guiding users toward professional medical advice.
 */

const SAFETY_GROUPS = {
    PREGNANCY: [
        'pregnant', 'pregnancy', 'trimester', 'prenatal', 'expecting', 'gestation', 'breastfeeding'
    ],
    MEDICAL_CONDITIONS: [
        'hypertension', 'glaucoma', 'hernia', 'ulcer', 'sciatica', 'slipped disc',
        'blood pressure', 'heart condition', 'cardiovascular', 'epilepsy', 'seizure',
        'diabetes', 'arthritis', 'osteoporosis', 'asthma'
    ],
    RECENT_SURGERY: [
        'surgery', 'operation', 'post-op', 'recovery', 'incision', 'sutures',
        'rehab', 'joint replacement', 'spinal fusion', 'stent'
    ]
};

class SafetyService {
    /**
     * Analyzes a query for safety risks.
     * @param {string} query - The user's input query.
     * @returns {Object} { isUnsafe: boolean, reason: string | null }
     */
    detectSafetyRisk(query) {
        if (!query || typeof query !== 'string') {
            return { isUnsafe: false, reason: null };
        }

        const normalizedQuery = query.toLowerCase();

        // Check for Pregnancy risks
        if (this._containsKeywords(normalizedQuery, SAFETY_GROUPS.PREGNANCY)) {
            return {
                isUnsafe: true,
                reason: "Yoga during pregnancy requires specialized prenatal guidance. Please consult with your obstetrician before starting or continuing a practice."
            };
        }

        // Check for Medical Condition risks
        if (this._containsKeywords(normalizedQuery, SAFETY_GROUPS.MEDICAL_CONDITIONS)) {
            return {
                isUnsafe: true,
                reason: "You mentioned a specific medical condition. Certain asanas and breathing techniques can be contraindicated for your condition. Please consult a healthcare professional or a certified yoga therapist."
            };
        }

        // Check for Recent Surgery risks
        if (this._containsKeywords(normalizedQuery, SAFETY_GROUPS.RECENT_SURGERY)) {
            return {
                isUnsafe: true,
                reason: "Post-operative recovery requires specific medical clearance. Please confirm with your surgeon that it is safe to begin physical activity."
            };
        }

        return { isUnsafe: false, reason: null };
    }

    /**
     * Generates a gentle, safety-first response for high-risk queries.
     * @param {string} reason - The specific reason for the safety flag.
     * @returns {string} A formatted, professional response.
     */
    generateSafetyResponse(reason) {
        return `
Thank you for reaching out with your query. To ensure your well-being, I must prioritize caution:

**Safety Context:** ${reason}

While I cannot provide medical advice or specific sequences for your situation, I can recommend some universally gentle alternatives that focus on mindfulness and relaxation:
- **Restful Stillness**: Savasana (Corpse Pose) for total physical relaxation.
- **Centering**: Balasana (Child's Pose) to soothe the nervous system.
- **Gentle Breath**: Simple, natural deep breathing without any retention.

**Recommendation:** Please consult with a healthcare professional or a certified yoga therapist who can provide a personalized assessment and safe guidance tailored to your specific needs.
        `.trim();
    }

    /**
     * Helper to check if any keyword from a list exists in the text.
     */
    _containsKeywords(text, keywords) {
        return keywords.some(keyword => {
            // Using a simple word boundary regex to avoid partial matches (e.g., "operative" inside "cooperate")
            const regex = new RegExp(`\\b${keyword}\\b`, 'i');
            return regex.test(text);
        });
    }
}

module.exports = new SafetyService();


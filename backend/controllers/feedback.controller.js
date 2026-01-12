const Query = require('../models/Query');

/**
 * FEEDBACK CONTROLLER
 * Handles the logic for the /feedback endpoint, allowing users to rate the AI's responses.
 */
exports.handleFeedback = async (req, res) => {
    const { queryId, helpful, comment } = req.body;

    if (!queryId) {
        return res.status(400).json({ error: 'queryId is required' });
    }

    if (helpful === undefined) {
        return res.status(400).json({ error: 'helpful status is required' });
    }

    try {
        console.log(`\n--- Incoming Feedback for Query: ${queryId} ---`);

        // Find the interaction and update the feedback
        const interaction = await Query.findByIdAndUpdate(
            queryId,
            {
                feedback: {
                    isHelpful: helpful,
                    comment: comment || null,
                    receivedAt: new Date()
                }
            },
            { new: true } // Return the updated document
        );

        if (!interaction) {
            return res.status(404).json({ error: 'Interaction not found' });
        }

        console.log(`[FEEDBACK] Saved for interaction: ${queryId}`);

        res.status(200).json({
            message: 'Feedback received successfully',
            queryId: interaction._id
        });

    } catch (error) {
        console.error('Feedback Controller Error:', error.message);
        res.status(500).json({
            error: 'An internal error occurred while saving your feedback.',
            message: error.message
        });
    }
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

export const askQuestion = async (query) => {
    const response = await fetch(`${API_BASE_URL}/ask`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to get an answer.');
    }

    return response.json();
};

export const submitFeedback = async (queryId, helpful) => {
    const response = await fetch(`${API_BASE_URL}/feedback`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ queryId, helpful }),
    });

    if (!response.ok) {
        throw new Error('Failed to submit feedback.');
    }

    return response.json();
};

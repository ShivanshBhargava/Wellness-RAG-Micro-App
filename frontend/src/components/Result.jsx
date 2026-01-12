import React, { useState } from 'react';
import { submitFeedback } from '../services/api.service';

const Result = ({ data }) => {
    const [feedbackStatus, setFeedbackStatus] = useState(null);

    if (!data) return null;

    const { answer, sources, isUnsafe, queryId } = data;

    const handleFeedback = async (helpful) => {
        if (!queryId || feedbackStatus) return;
        try {
            await submitFeedback(queryId, helpful);
            setFeedbackStatus(helpful ? 'positive' : 'negative');
        } catch (err) {
            console.error('Feedback failed:', err.message);
        }
    };

    return (
        <div className="container animate-in" style={styles.container}>
            {isUnsafe && (
                <div style={styles.warningBanner}>
                    <svg style={styles.warningIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <span style={styles.warningText}>Safety Consideration: Professional consultation is advised for medical queries.</span>
                </div>
            )}

            <article className="wellness-card">
                <div style={styles.content}>
                    {answer.split('\n').map((line, i) => (
                        <p key={i} style={styles.paragraph}>{line}</p>
                    ))}
                </div>

                {!isUnsafe && sources && sources.length > 0 && (
                    <div style={styles.sourcesWrapper}>
                        <h4 style={styles.sourcesHeading}>REFERENCES</h4>
                        <ul style={styles.sourcesList}>
                            {sources.map((source, i) => (
                                <li key={i} style={styles.sourceItem}>
                                    <a href={source.link} target="_blank" rel="noopener noreferrer" style={styles.sourceLink}>
                                        {source.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div style={styles.footer}>
                    <div style={styles.feedback}>
                        <span style={styles.feedbackLabel}>Helpful?</span>
                        <button
                            onClick={() => handleFeedback(true)}
                            style={{ ...styles.feedbackBtn, ...(feedbackStatus === 'positive' ? styles.feedbackBtnActive : {}) }}
                        >
                            YES
                        </button>
                        <button
                            onClick={() => handleFeedback(false)}
                            style={{ ...styles.feedbackBtn, ...(feedbackStatus === 'negative' ? styles.feedbackBtnActive : {}) }}
                        >
                            NO
                        </button>
                    </div>
                </div>
            </article>
        </div>
    );
};

const styles = {
    container: {
        paddingBottom: '100px',
    },
    warningBanner: {
        backgroundColor: '#fff5f5',
        border: '1px solid #fab1a0',
        borderRadius: '4px',
        padding: '12px 20px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    warningIcon: {
        color: '#d63031',
    },
    warningText: {
        color: '#d63031',
        fontSize: '0.85rem',
        fontWeight: '500',
    },
    content: {
        marginBottom: '40px',
    },
    paragraph: {
        marginBottom: '1.5rem',
        fontSize: '1.05rem',
        color: '#2d3436',
    },
    sourcesWrapper: {
        borderTop: '1px solid #e2e8e2',
        paddingTop: '24px',
        marginBottom: '32px',
    },
    sourcesHeading: {
        fontSize: '0.7rem',
        fontWeight: '700',
        letterSpacing: '0.15em',
        color: '#b28a5d',
        marginBottom: '16px',
    },
    sourcesList: {
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    sourceItem: {
        fontSize: '0.9rem',
    },
    sourceLink: {
        color: '#4b6352',
        textDecoration: 'none',
        borderBottom: '1px solid transparent',
        transition: 'border-color 0.2s',
    },
    footer: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: '20px',
        borderTop: '1px solid #f2f2f2',
    },
    feedback: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },
    feedbackLabel: {
        fontSize: '0.8rem',
        fontWeight: '600',
        color: '#636e72',
    },
    feedbackBtn: {
        fontSize: '0.7rem',
        fontWeight: '700',
        letterSpacing: '0.1em',
        color: '#4b6352',
        padding: '4px 12px',
        border: '1px solid #e2e8e2',
        borderRadius: '4px',
    },
    feedbackBtnActive: {
        backgroundColor: '#4b6352',
        color: '#ffffff',
        borderColor: '#4b6352',
    }
};

export default Result;

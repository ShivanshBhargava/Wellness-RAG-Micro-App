import React, { useState } from 'react';
import { ExternalLink, ThumbsUp, ThumbsDown, AlertCircle, CheckCircle2 } from 'lucide-react';
import { submitFeedback } from '../services/api.service';

const Result = ({ data }) => {
    const [feedbackGiven, setFeedbackGiven] = useState(false);
    const [feedbackLoading, setFeedbackLoading] = useState(false);

    if (!data) return null;

    const { answer, sources, isUnsafe, queryId } = data;

    const handleFeedback = async (helpful) => {
        if (!queryId || feedbackGiven) return;
        setFeedbackLoading(true);
        try {
            await submitFeedback(queryId, helpful);
            setFeedbackGiven(true);
        } catch (err) {
            console.error(err);
        } finally {
            setFeedbackLoading(false);
        }
    };

    return (
        <div className="container" style={styles.container}>
            <div style={{ ...styles.card, ...(isUnsafe ? styles.unsafeCard : {}) }}>
                {isUnsafe && (
                    <div style={styles.safetyHeader}>
                        <AlertCircle size={20} color="#c0392b" />
                        <span style={styles.safetyText}>Safety Guidance</span>
                    </div>
                )}

                <div style={styles.answerContent}>
                    <div style={styles.answerText}>
                        {answer.split('\n').map((para, i) => para.trim() && (
                            <p key={i} style={styles.paragraph}>{para}</p>
                        ))}
                    </div>

                    {!isUnsafe && sources && sources.length > 0 && (
                        <div style={styles.sourcesContainer}>
                            <h4 style={styles.sectionTitle}>Sourced from:</h4>
                            <div style={styles.sourcesList}>
                                {sources.map((source, i) => (
                                    <a key={i} href={source.link} target="_blank" rel="noopener noreferrer" style={styles.sourceTag}>
                                        <span>{source.title}</span>
                                        <ExternalLink size={12} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div style={styles.footer}>
                    <div style={styles.feedbackSection}>
                        <span style={styles.feedbackTitle}>Was this helpful?</span>
                        <div style={styles.feedbackButtons}>
                            <button
                                onClick={() => handleFeedback(true)}
                                style={{ ...styles.feedbackBtn, ...(feedbackGiven === true ? styles.activeFeedback : {}) }}
                                disabled={feedbackGiven || feedbackLoading}
                            >
                                <ThumbsUp size={16} />
                            </button>
                            <button
                                onClick={() => handleFeedback(false)}
                                style={{ ...styles.feedbackBtn, ...(feedbackGiven === false ? styles.activeFeedback : {}) }}
                                disabled={feedbackGiven || feedbackLoading}
                            >
                                <ThumbsDown size={16} />
                            </button>
                        </div>
                        {feedbackGiven && (
                            <span style={styles.feedbackSuccess}>
                                <CheckCircle2 size={14} /> Thank you!
                            </span>
                        )}
                    </div>
                    <div style={styles.timestamp}>
                        Verified by VedaFlow RAG
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        paddingBottom: '6rem',
        marginTop: ' -2rem',
        opacity: 0,
        animation: 'fadeInUp 0.6s ease forwards',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '2.5rem',
        boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
        border: '1px solid rgba(0,0,0,0.03)',
    },
    unsafeCard: {
        borderColor: 'rgba(192, 57, 43, 0.1)',
        backgroundColor: '#fff9f9',
    },
    safetyHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1.5rem',
        padding: '0.75rem 1.25rem',
        backgroundColor: 'rgba(192, 57, 43, 0.05)',
        borderRadius: '12px',
        width: 'fit-content',
    },
    safetyText: {
        color: '#c0392b',
        fontWeight: 600,
        fontSize: '0.9rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    },
    answerText: {
        fontSize: '1.15rem',
        color: '#2c332e',
        lineHeight: 1.7,
    },
    paragraph: {
        marginBottom: '1.25rem',
    },
    sourcesContainer: {
        marginTop: '2.5rem',
        paddingTop: '2rem',
        borderTop: '1px solid rgba(0,0,0,0.05)',
    },
    sectionTitle: {
        fontSize: '0.9rem',
        color: '#3d5a44',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginBottom: '1rem',
    },
    sourcesList: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem',
    },
    sourceTag: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#f1f4f2',
        color: '#3d5a44',
        borderRadius: '100px',
        textDecoration: 'none',
        fontSize: '0.85rem',
        fontWeight: 500,
        transition: 'background-color 0.2s',
    },
    footer: {
        marginTop: '3rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid rgba(0,0,0,0.05)',
        paddingTop: '1.5rem',
    },
    feedbackSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    feedbackTitle: {
        fontSize: '0.9rem',
        opacity: 0.6,
    },
    feedbackButtons: {
        display: 'flex',
        gap: '0.5rem',
    },
    feedbackBtn: {
        padding: '0.5rem',
        borderRadius: '8px',
        backgroundColor: '#fcfbf7',
        color: '#3d5a44',
        transition: 'all 0.2s',
    },
    activeFeedback: {
        backgroundColor: '#3d5a44',
        color: '#ffffff',
    },
    feedbackSuccess: {
        fontSize: '0.85rem',
        color: '#3d5a44',
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
        fontWeight: 500,
    },
    timestamp: {
        fontSize: '0.8rem',
        color: '#3d5a44',
        opacity: 0.4,
        fontStyle: 'italic',
    }
};

export default Result;

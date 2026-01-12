import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitFeedback } from '../services/api.service';
import { ThumbsUp, ThumbsDown, CheckCircle2 } from 'lucide-react';

const FeedbackSection = ({ queryId }) => {
    const [status, setStatus] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFeedback = async (helpful) => {
        if (!queryId || status || isSubmitting) return;

        setIsSubmitting(true);
        try {
            await submitFeedback(queryId, helpful);
            setStatus(helpful ? 'positive' : 'negative');
        } catch (err) {
            console.error('Feedback submission failed:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={styles.container}>
            <span style={styles.text}>Was this helpful?</span>
            <div style={styles.actions}>
                <motion.button
                    initial={false}
                    animate={status === 'positive' ? "selected" : (status === 'negative' ? "unselected" : "idle")}
                    variants={buttonVariants.positive}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    whileTap={!status ? { scale: 0.95 } : {}}
                    onClick={() => handleFeedback(true)}
                    style={styles.iconBtn}
                    disabled={!!status || isSubmitting}
                >
                    <ThumbsUp
                        size={24}
                        strokeWidth={status === 'positive' ? 3 : 2}
                        color={status === 'positive' ? '#ffffff' : 'currentColor'}
                    />
                </motion.button>

                <motion.button
                    initial={false}
                    animate={status === 'negative' ? "selected" : (status === 'positive' ? "unselected" : "idle")}
                    variants={buttonVariants.negative}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    whileTap={!status ? { scale: 0.95 } : {}}
                    onClick={() => handleFeedback(false)}
                    style={styles.iconBtn}
                    disabled={!!status || isSubmitting}
                >
                    <ThumbsDown
                        size={24}
                        strokeWidth={status === 'negative' ? 3 : 2}
                        color={status === 'negative' ? '#ffffff' : 'currentColor'}
                    />
                </motion.button>
            </div>

            <AnimatePresence>
                {status && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={styles.thanksWrapper}
                    >
                        <CheckCircle2 size={16} color="var(--accent-primary)" />
                        <span style={styles.thanks}>
                            {status === 'positive' ? 'Namaste, happy to help.' : 'We will improve, thank you.'}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const buttonVariants = {
    positive: {
        idle: {
            backgroundColor: 'var(--surface-color)',
            color: 'var(--text-secondary)',
            scale: 1,
            opacity: 1,
            borderColor: 'var(--border-subtle)',
        },
        selected: {
            backgroundColor: '#4a9d52',
            color: '#ffffff',
            scale: 1.15,
            opacity: 1,
            borderColor: '#4a9d52',
            boxShadow: '0 12px 24px rgba(74, 157, 82, 0.5)',
        },
        unselected: {
            backgroundColor: 'var(--surface-color)',
            color: 'var(--text-secondary)',
            opacity: 0.25,
            scale: 0.85,
            borderColor: 'var(--border-subtle)',
        }
    },
    negative: {
        idle: {
            backgroundColor: 'var(--surface-color)',
            color: 'var(--text-secondary)',
            scale: 1,
            opacity: 1,
            borderColor: 'var(--border-subtle)',
        },
        selected: {
            backgroundColor: '#e63946',
            color: '#ffffff',
            scale: 1.15,
            opacity: 1,
            borderColor: '#e63946',
            boxShadow: '0 12px 24px rgba(230, 57, 70, 0.5)',
        },
        unselected: {
            backgroundColor: 'var(--surface-color)',
            color: 'var(--text-secondary)',
            opacity: 0.25,
            scale: 0.85,
            borderColor: 'var(--border-subtle)',
        }
    }
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        marginTop: '40px',
        padding: '24px',
        borderTop: '1px solid var(--border-subtle)',
    },
    text: {
        fontSize: '0.75rem',
        fontWeight: '800',
        color: 'var(--text-secondary)',
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
    },
    actions: {
        display: 'flex',
        gap: '40px',
    },
    iconBtn: {
        width: '72px',
        height: '72px',
        borderRadius: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid',
        cursor: 'pointer',
        outline: 'none',
    },
    thanksWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginTop: '8px',
    },
    thanks: {
        fontSize: '0.9rem',
        color: 'var(--text-primary)',
        fontWeight: '600',
    }
};

export default FeedbackSection;

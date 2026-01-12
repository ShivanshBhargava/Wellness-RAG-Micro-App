import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const LoadingState = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="android-card"
            style={styles.container}
        >
            <div style={styles.header}>
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    <Sparkles size={20} color="var(--accent-primary)" />
                </motion.div>
                <span style={styles.loadingText}>Consulting the Veda library...</span>
            </div>

            <div style={styles.skeletonBody}>
                <div style={styles.shimmerLine} className="shimmer"></div>
                <div style={styles.shimmerLine} className="shimmer"></div>
                <div style={styles.shimmerLineShort} className="shimmer"></div>
            </div>

            <motion.p
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={styles.quote}
            >
                Finding the most balanced response for you.
            </motion.p>
        </motion.div>
    );
};

const styles = {
    container: {
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '24px',
        backgroundColor: 'var(--surface-color)',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    loadingText: {
        fontSize: '0.9rem',
        fontWeight: '700',
        color: 'var(--accent-primary)',
        letterSpacing: '0.02em',
    },
    skeletonBody: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    shimmerLine: {
        height: '14px',
        width: '100%',
        backgroundColor: 'var(--surface-alt)',
        borderRadius: '4px',
    },
    shimmerLineShort: {
        height: '14px',
        width: '60%',
        backgroundColor: 'var(--surface-alt)',
        borderRadius: '4px',
    },
    quote: {
        fontSize: '0.75rem',
        color: 'var(--text-secondary)',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 'auto',
    }
};

export default LoadingState;

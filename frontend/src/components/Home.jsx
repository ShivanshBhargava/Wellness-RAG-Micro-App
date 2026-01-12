import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const Home = ({ onStart }) => {
    return (
        <div className="scroll-content" style={styles.container}>
            <div style={styles.topSection}>
                <div style={styles.visualContainer}>
                    <motion.div
                        animate={{
                            scale: [1, 1.25, 1],
                            rotate: [0, 90, 180, 270, 360],
                            opacity: [0.05, 0.1, 0.05]
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={styles.mandalaBack}
                    />

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        style={styles.heroImageWrapper}
                    >
                        <img
                            src="/assets/yoga-hero.png"
                            alt="Yoga Silhouette"
                            style={styles.heroImage}
                            onError={(e) => {
                                console.error("Hero image failed to load");
                                e.target.style.display = 'none';
                            }}
                        />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h1 style={styles.title}>
                        Discover your <br />
                        <span style={{ color: 'var(--accent-primary)' }}>Authentic Flow.</span>
                    </h1>

                    <div style={styles.badgeRow}>
                        <div style={styles.badge}>
                            <Sparkles size={12} />
                            <span>Grounded AI</span>
                        </div>
                        <div style={styles.badge}>
                            <div style={styles.activeDot} />
                            <span>Verified Library</span>
                        </div>
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    style={styles.tagline}
                >
                    Immerse yourself in a synthesized gateway of traditional yoga wisdom.
                </motion.p>
            </div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                style={styles.bottomSection}
            >
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-main"
                    onClick={onStart}
                    style={styles.startBtn}
                >
                    Begin Enlightenment
                    <ArrowRight size={20} />
                </motion.button>
                <div style={styles.poweredBy}>
                    <span>VEDAFLOW • SPIRITUAL INTELLIGENCE</span>
                </div>
            </motion.div>
        </div>
    );
};

const styles = {
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: '60px',
        paddingBottom: '40px',
    },
    topSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    visualContainer: {
        position: 'relative',
        width: '240px',
        height: '240px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    mandalaBack: {
        position: 'absolute',
        width: '200px',
        height: '200px',
        borderRadius: '2000px',
        border: '1px dashed var(--accent-primary)',
    },
    heroImageWrapper: {
        width: '140px',
        height: '140px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        position: 'relative',
        backgroundColor: '#f5f9f5',
        borderRadius: '1000px',
        boxShadow: 'var(--shadow-premium)',
        border: '1px solid rgba(152, 195, 152, 0.3)',
        overflow: 'hidden',
    },
    heroImage: {
        width: '80%',
        height: '80%',
        objectFit: 'contain',
        filter: 'brightness(0.8) contrast(1.2)',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: '800',
        lineHeight: '1.2',
        marginBottom: '16px',
        letterSpacing: '-0.04em',
    },
    badgeRow: {
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        marginBottom: '24px',
    },
    badge: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 14px',
        backgroundColor: 'var(--surface-alt)',
        borderRadius: '100px',
        fontSize: '0.7rem',
        fontWeight: '700',
        color: 'var(--text-secondary)',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
    },
    activeDot: {
        width: '6px',
        height: '6px',
        borderRadius: '10px',
        backgroundColor: '#4ade80',
        boxShadow: '0 0 10px rgba(74, 222, 128, 0.5)',
    },
    tagline: {
        fontSize: '0.95rem',
        color: 'var(--text-secondary)',
        maxWidth: '280px',
        lineHeight: '1.6',
        fontWeight: '500',
    },
    bottomSection: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '32px',
    },
    startBtn: {
        width: '100%',
    },
    poweredBy: {
        fontSize: '0.6rem',
        fontWeight: '800',
        letterSpacing: '0.3em',
        color: 'var(--text-secondary)',
        opacity: 0.4,
    }
};

export default Home;

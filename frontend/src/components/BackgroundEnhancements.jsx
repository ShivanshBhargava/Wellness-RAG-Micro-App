import React from 'react';

const BackgroundEnhancements = () => {
    return (
        <div style={styles.container}>
            <div style={styles.topGlow}></div>
            <div style={styles.bottomGlow}></div>
        </div>
    );
};

const styles = {
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.5,
    },
    topGlow: {
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
        filter: 'blur(80px)',
        opacity: 0.1,
    },
    bottomGlow: {
        position: 'absolute',
        bottom: '-10%',
        left: '-10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)',
        filter: 'blur(60px)',
        opacity: 0.1,
    }
};

export default BackgroundEnhancements;

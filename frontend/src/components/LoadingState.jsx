import React from 'react';

const LoadingState = () => {
    return (
        <div className="container" style={styles.container}>
            <div className="wellness-card" style={styles.card}>
                <div style={styles.skeletonTitle}></div>
                <div style={styles.skeletonLine}></div>
                <div style={styles.skeletonLine}></div>
                <div style={styles.skeletonLineShort}></div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        paddingBottom: '100px',
        animation: 'pulse 1.5s ease-in-out infinite',
    },
    card: {
        opacity: 0.6,
    },
    skeletonTitle: {
        height: '24px',
        backgroundColor: '#eef2ef',
        borderRadius: '4px',
        marginBottom: '24px',
        width: '60%',
    },
    skeletonLine: {
        height: '14px',
        backgroundColor: '#eef2ef',
        borderRadius: '4px',
        marginBottom: '16px',
        width: '100%',
    },
    skeletonLineShort: {
        height: '14px',
        backgroundColor: '#eef2ef',
        borderRadius: '4px',
        width: '40%',
    }
};

export default LoadingState;

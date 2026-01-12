import React from 'react';

const TopAppBar = () => {
    return (
        <div style={styles.appBar}>
            <h1 style={styles.title}>VedaFlow</h1>
            <div style={styles.indicatorArea}>
                <div style={styles.indicatorDot}></div>
                <span style={styles.indicatorText}>Knowledge Verified</span>
            </div>
        </div>
    );
};

const styles = {
    appBar: {
        height: '100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 24px 0 76px',
        position: 'relative',
        zIndex: 1,
    },
    title: {
        fontSize: '1.25rem',
        fontWeight: '700',
        color: 'var(--text-primary)',
        letterSpacing: '-0.01em',
    },
    indicatorArea: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        marginTop: '2px',
    },
    indicatorDot: {
        width: '6px',
        height: '6px',
        borderRadius: '10px',
        backgroundColor: 'var(--accent-primary)',
    },
    indicatorText: {
        fontSize: '0.65rem',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: 'var(--text-secondary)',
    }
};

export default TopAppBar;

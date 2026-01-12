import React from 'react';

const SafetyBlock = () => {
    return (
        <div className="animate-reveal" style={styles.block}>
            <div style={styles.header}>
                <div style={styles.iconCircle}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                </div>
                <span style={styles.title}>SAFETY GUIDANCE</span>
            </div>

            <div style={styles.cardContent}>
                <p style={styles.message}>
                    Our RAG engine detected keywords related to physical conditions. To ensure your well-being, we recommend caution.
                </p>
                <div style={styles.suggestionBox}>
                    <span style={styles.suggestLabel}>CONSIDERATION:</span>
                    <p style={styles.suggestText}>Practice near a wall for support or consult a certified yoga therapist for specific modifications.</p>
                </div>
                <p style={styles.supervision}>
                    ⚠️ This is not medical advice. Professional supervision is advised.
                </p>
            </div>
        </div>
    );
};

const styles = {
    block: {
        backgroundColor: 'var(--surface-color)',
        borderRadius: 'var(--radius-xl)',
        padding: '24px',
        margin: '12px 0 24px',
        border: '1px solid var(--danger)',
        boxShadow: '0 8px 30px rgba(212, 78, 78, 0.08)',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px',
    },
    iconCircle: {
        width: '40px',
        height: '40px',
        borderRadius: '100px',
        backgroundColor: 'rgba(212, 78, 78, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--danger)',
    },
    title: {
        fontWeight: '800',
        fontSize: '0.75rem',
        letterSpacing: '0.15em',
        color: 'var(--danger)',
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    message: {
        fontSize: '0.95rem',
        lineHeight: '1.6',
        color: 'var(--text-primary)',
    },
    suggestionBox: {
        backgroundColor: 'var(--surface-alt)',
        padding: '16px',
        borderRadius: 'var(--radius-lg)',
        borderLeft: '4px solid var(--danger)',
    },
    suggestLabel: {
        fontSize: '0.7rem',
        fontWeight: '800',
        color: 'var(--danger)',
        display: 'block',
        marginBottom: '4px',
    },
    suggestText: {
        fontSize: '0.85rem',
        color: 'var(--text-secondary)',
        lineHeight: '1.5',
    },
    supervision: {
        fontSize: '0.8rem',
        fontWeight: '600',
        color: 'var(--text-secondary)',
        opacity: 0.8,
    }
};

export default SafetyBlock;

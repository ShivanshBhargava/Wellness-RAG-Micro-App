import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const SourcesBlock = ({ sources }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!sources || sources.length === 0) return null;

    return (
        <div style={styles.container}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={styles.header}
            >
                <div style={styles.titleArea}>
                    <span style={styles.title}>Sources used</span>
                    <span style={styles.count}>{sources.length} items</span>
                </div>
                <ChevronDown
                    size={18}
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                />
            </button>

            {isOpen && (
                <div style={styles.content} className="animate-reveal">
                    <ul style={styles.list}>
                        {sources.map((source, index) => {
                            const articleNum = source.articleId || 'N/A';
                            return (
                                <li key={index} style={styles.item}>
                                    <div style={styles.sourceMarker}></div>
                                    <div style={styles.sourceInfo}>
                                        <span style={styles.sourceLabel}>Source {index + 1}:</span>
                                        <span style={styles.sourceTitle}>{source.title} – Article {articleNum}</span>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        marginTop: '24px',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '16px',
    },
    header: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 0',
        color: 'var(--text-primary)',
        fontWeight: '600',
        fontSize: '0.9rem',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
    },
    titleArea: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    title: {
        letterSpacing: '-0.01em',
    },
    count: {
        fontSize: '0.7rem',
        backgroundColor: 'var(--surface-alt)',
        padding: '2px 8px',
        borderRadius: '100px',
        color: 'var(--text-secondary)',
    },
    content: {
        padding: '16px 0 8px',
    },
    list: {
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    item: {
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
    },
    sourceMarker: {
        width: '4px',
        height: '4px',
        borderRadius: '10px',
        backgroundColor: 'var(--accent-secondary)',
        marginTop: '8px',
    },
    sourceInfo: {
        display: 'flex',
        flexDirection: 'column',
    },
    sourceLabel: {
        fontSize: '0.75rem',
        fontWeight: '700',
        color: 'var(--text-secondary)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    },
    sourceTitle: {
        fontSize: '0.85rem',
        color: 'var(--text-primary)',
        lineHeight: '1.4',
    }
};

export default SourcesBlock;

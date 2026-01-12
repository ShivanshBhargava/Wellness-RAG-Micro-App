import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, History } from 'lucide-react';

const RecentQuestions = ({ onSelect }) => {
    const [questions, setQuestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('veda_recent_questions');
        if (saved) {
            setQuestions(JSON.parse(saved));
        }
    }, []);

    if (questions.length === 0) return null;

    return (
        <div style={styles.container}>
            <button
                style={styles.header}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div style={styles.titleArea}>
                    <History size={16} />
                    <span style={styles.title}>Recent Wisdom</span>
                </div>
                <ChevronDown
                    size={16}
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div style={styles.list}>
                            {questions.map((q, i) => (
                                <motion.button
                                    key={i}
                                    whileTap={{ scale: 0.98 }}
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    style={styles.item}
                                    onClick={() => onSelect(q)}
                                >
                                    <span style={styles.qText}>{q}</span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const styles = {
    container: {
        margin: '16px 24px',
    },
    header: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'var(--text-secondary)',
        fontSize: '0.8rem',
        fontWeight: '600',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        border: 'none',
        padding: '8px 0',
    },
    titleArea: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    title: {
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
    },
    list: {
        marginTop: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    item: {
        textAlign: 'left',
        padding: '12px 16px',
        backgroundColor: 'var(--surface-color)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--text-secondary)',
        fontSize: '0.9rem',
        cursor: 'pointer',
        border: '1px solid var(--border-subtle)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
    },
    qText: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'block',
    }
};

export default RecentQuestions;

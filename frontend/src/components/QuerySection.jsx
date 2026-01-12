import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Search } from 'lucide-react';

const QuerySection = ({ onSearch, loading }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() && !loading) {
            onSearch(query);
            setQuery('');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="android-card"
            style={styles.container}
        >
            <form onSubmit={handleSubmit} style={styles.form}>
                <motion.div
                    animate={loading ? { opacity: 0.5 } : { opacity: 1 }}
                    style={styles.inputArea}
                >
                    <Search size={20} color="var(--text-secondary)" style={styles.searchIcon} />
                    <textarea
                        style={styles.textarea}
                        placeholder="Ask anything about yoga"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        disabled={loading}
                        rows={1}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                handleSubmit(e);
                            }
                        }}
                    />
                </motion.div>

                <motion.button
                    whileHover={{ scale: query.trim() && !loading ? 1.01 : 1 }}
                    whileTap={{ scale: query.trim() && !loading ? 0.98 : 1 }}
                    className="btn-main"
                    type="submit"
                    style={{ ...styles.button, ...(loading || !query.trim() ? styles.buttonDisabled : {}) }}
                    disabled={loading || !query.trim()}
                >
                    {loading ? 'Consulting...' : 'Get Answer'}
                    {!loading && <Send size={18} />}
                </motion.button>
            </form>
        </motion.div>
    );
};

const styles = {
    container: {
        marginTop: '12px',
        padding: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    inputArea: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--surface-alt)',
        borderRadius: 'var(--radius-lg)',
        padding: '4px 16px',
        border: '1px solid var(--border-subtle)',
        transition: 'border-color 0.2s',
    },
    searchIcon: {
        marginRight: '12px',
    },
    textarea: {
        flex: 1,
        minHeight: '52px',
        backgroundColor: 'transparent',
        border: 'none',
        color: 'var(--text-primary)',
        fontSize: '1rem',
        fontFamily: 'inherit',
        padding: '14px 0',
        outline: 'none',
        resize: 'none',
    },
    button: {
        width: '100%',
        height: '56px',
    },
    buttonDisabled: {
        backgroundColor: 'var(--surface-alt)',
        color: 'var(--text-secondary)',
        boxShadow: 'none',
        opacity: 0.6,
    }
};

export default QuerySection;

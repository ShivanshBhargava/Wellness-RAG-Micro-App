import React, { useState } from 'react';

const Hero = ({ onSearch, loading }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() && !loading) {
            onSearch(query);
        }
    };

    return (
        <section style={styles.section}>
            <div className="container">
                <h1 style={styles.title}>Knowledge for your well-being.</h1>
                <p style={styles.subtitle}>Ask a question about yoga philosophy, geometry, or breathwork.</p>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        style={styles.input}
                        placeholder="Search our wisdom library..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        style={{ ...styles.button, ...(loading || !query.trim() ? styles.buttonDisabled : {}) }}
                        disabled={loading || !query.trim()}
                    >
                        {loading ? 'CONSULTING...' : 'SEARCH'}
                    </button>
                </form>
            </div>
        </section>
    );
};

const styles = {
    section: {
        padding: '80px 0 60px',
        textAlign: 'center',
    },
    title: {
        fontSize: '2.5rem',
        marginBottom: '12px',
        color: '#4b6352',
    },
    subtitle: {
        fontSize: '1rem',
        color: '#636e72',
        marginBottom: '48px',
    },
    form: {
        display: 'flex',
        gap: '12px',
        maxWidth: '650px',
        margin: '0 auto',
    },
    input: {
        flex: 1,
        height: '52px',
        padding: '0 20px',
        fontSize: '1rem',
        border: '1px solid #e2e8e2',
        borderRadius: '4px',
        backgroundColor: '#ffffff',
        color: '#2d3436',
    },
    button: {
        height: '52px',
        padding: '0 32px',
        backgroundColor: '#4b6352',
        color: '#ffffff',
        fontWeight: '600',
        fontSize: '0.8rem',
        letterSpacing: '0.1em',
        borderRadius: '4px',
    },
    buttonDisabled: {
        backgroundColor: '#e2e8e2',
        cursor: 'not-allowed',
    }
};

export default Hero;

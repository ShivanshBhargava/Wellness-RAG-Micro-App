import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

const Hero = ({ onSearch, loading }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <section style={styles.hero}>
            <div className="container" style={styles.container}>
                <div style={styles.content}>
                    <h2 style={styles.heading}>Discover Ancient Wisdom for Modern Balance</h2>
                    <p style={styles.subheading}>Ask about authentic yoga practices, benefits, and mindful guidance.</p>
                </div>

                <form onSubmit={handleSubmit} style={styles.searchContainer}>
                    <div style={styles.searchWrapper}>
                        <Search style={styles.searchIcon} color="#3d5a44" size={20} />
                        <input
                            type="text"
                            placeholder="e.g., How do I stay balanced in Tree Pose?"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            style={styles.input}
                            disabled={loading}
                        />
                        <button type="submit" style={styles.button} disabled={loading || !query.trim()}>
                            {loading ? 'Seeking...' : (
                                <>
                                    <Sparkles size={16} />
                                    <span>Discover</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

const styles = {
    hero: {
        padding: '6rem 0 4rem',
        textAlign: 'center',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '3rem',
    },
    content: {
        maxWidth: '600px',
    },
    heading: {
        fontSize: '3rem',
        lineHeight: 1.2,
        marginBottom: '1rem',
        color: '#3d5a44',
    },
    subheading: {
        fontSize: '1.25rem',
        color: '#2c332e',
        opacity: 0.8,
    },
    searchContainer: {
        width: '100%',
        maxWidth: '700px',
    },
    searchWrapper: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: '0.5rem 0.5rem 0.5rem 1.5rem',
        borderRadius: '100px',
        boxShadow: '0 10px 30px rgba(61, 90, 68, 0.08)',
        border: '1px solid rgba(61, 90, 68, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    searchIcon: {
        marginRight: '1rem',
        opacity: 0.6,
    },
    input: {
        flex: 1,
        border: 'none',
        fontSize: '1.1rem',
        color: '#2c332e',
        background: 'transparent',
    },
    button: {
        backgroundColor: '#3d5a44',
        color: '#ffffff',
        padding: '0.8rem 1.5rem',
        borderRadius: '100px',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'background-color 0.2s, transform 0.2s',
    }
};

export default Hero;

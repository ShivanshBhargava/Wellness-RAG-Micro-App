import React from 'react';
import { Leaf } from 'lucide-react';

const Header = () => {
    return (
        <header style={styles.header}>
            <div className="container" style={styles.container}>
                <div style={styles.logo}>
                    <Leaf color="#3d5a44" size={28} />
                    <h1 style={styles.title}>VedaFlow</h1>
                </div>
                <nav style={styles.nav}>
                    <a href="#" style={styles.link}>Yoga Guide</a>
                    <a href="#" style={styles.link}>My Vitality</a>
                    <a href="#" style={styles.link}>About</a>
                </nav>
            </div>
        </header>
    );
};

const styles = {
    header: {
        padding: '1.5rem 0',
        backgroundColor: '#fcfbf7',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
    },
    title: {
        fontSize: '1.5rem',
        color: '#3d5a44',
    },
    nav: {
        display: 'flex',
        gap: '2rem',
    },
    link: {
        textDecoration: 'none',
        color: '#2c332e',
        fontSize: '0.9rem',
        fontWeight: 500,
        transition: 'color 0.2s',
    }
};

export default Header;

import React from 'react';

const Header = () => {
    return (
        <header style={styles.header}>
            <div className="container" style={styles.container}>
                <div style={styles.logo}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4b6352" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L3 9v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <span style={styles.brand}>VEDAFLOW</span>
                </div>
                <nav style={styles.nav}>
                    <button style={styles.navItem}>JOURNAL</button>
                    <button style={styles.navItem}>PRACTICE</button>
                    <button style={styles.navItem}>LOG IN</button>
                </nav>
            </div>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8e2',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    brand: {
        fontSize: '0.9rem',
        fontWeight: '700',
        letterSpacing: '0.15em',
        color: '#4b6352',
    },
    nav: {
        display: 'flex',
        gap: '32px',
    },
    navItem: {
        fontSize: '0.75rem',
        fontWeight: '600',
        letterSpacing: '0.1em',
        color: '#636e72',
    }
};

export default Header;

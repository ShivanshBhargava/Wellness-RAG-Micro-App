import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Result from './components/Result';
import LoadingState from './components/LoadingState';
import { askQuestion } from './services/api.service';

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setResult(null); // Clear previous result to trigger animation

    try {
      const data = await askQuestion(query);
      setResult(data);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main style={styles.main}>
        <Hero onSearch={handleSearch} loading={loading} />

        {loading && <LoadingState />}

        {error && (
          <div className="container" style={styles.errorContainer}>
            <div style={styles.errorCard}>
              <p>{error}</p>
            </div>
          </div>
        )}

        {!loading && result && <Result key={result.queryId || 'initial'} data={result} />}
      </main>

      <footer style={styles.footer}>
        <div className="container">
          <p>© 2026 VedaFlow Wellness. Rooted in Tradition, Powered by Intelligence.</p>
        </div>
      </footer>
    </>
  );
}

const styles = {
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  errorContainer: {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'center',
  },
  errorCard: {
    padding: '1rem 2rem',
    backgroundColor: '#fff1f0',
    border: '1px solid #ffa39e',
    borderRadius: '12px',
    color: '#cf1322',
    fontWeight: 500,
  },
  footer: {
    padding: '3rem 0',
    textAlign: 'center',
    opacity: 0.5,
    fontSize: '0.85rem',
    borderTop: '1px solid rgba(0,0,0,0.03)',
  }
};

export default App;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './components/Home';
import TopAppBar from './components/TopAppBar';
import QuerySection from './components/QuerySection';
import LoadingState from './components/LoadingState';
import SafetyBlock from './components/SafetyBlock';
import SourcesBlock from './components/SourcesBlock';
import FeedbackSection from './components/FeedbackSection';
import RecentQuestions from './components/RecentQuestions';
import BackgroundEnhancements from './components/BackgroundEnhancements';
import Typewriter from './components/Typewriter';
import { askQuestion } from './services/api.service';
import { ChevronLeft } from 'lucide-react';

function App() {
  const [view, setView] = useState('home');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isTypingDone, setIsTypingDone] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setIsTypingDone(false);
    setView('chat');

    // History
    const saved = JSON.parse(localStorage.getItem('veda_recent_questions') || '[]');
    const newQuestions = [query, ...saved.filter(q => q !== query)].slice(0, 5);
    localStorage.setItem('veda_recent_questions', JSON.stringify(newQuestions));

    try {
      const data = await askQuestion(query);
      setResult(data);
    } catch (err) {
      setError(err.message || 'The wisdom library is currently unavailable.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = (e) => {
    // Prevent any bubbling that might cause issues in complex layouts
    e?.preventDefault();
    e?.stopPropagation();

    setView('home');
    setResult(null);
    setError(null);
    setIsTypingDone(false);
  };

  return (
    <div className="apk-container">
      <BackgroundEnhancements />

      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            style={{ height: '100%', width: '100%' }}
          >
            <Home onStart={() => setView('chat')} />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}
          >
            {/* Header with high z-index and explicit click capture */}
            <div style={styles.navWrapper}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleBack}
                style={styles.backBtn}
                className="btn-icon"
                aria-label="Back to home"
              >
                <ChevronLeft size={24} color="var(--text-primary)" />
              </motion.button>
              <nav style={styles.navHeader}>
                <TopAppBar />
              </nav>
            </div>

            <main className="scroll-content">
              <QuerySection onSearch={handleSearch} loading={loading} />

              <AnimatePresence>
                {!loading && !result && <RecentQuestions onSelect={handleSearch} />}
              </AnimatePresence>

              {loading && <LoadingState />}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="android-card"
                  style={styles.errorCard}
                >
                  <p>{error}</p>
                </motion.div>
              )}

              {!loading && result && (
                <div style={{ perspective: '1000px' }}>
                  {result.isUnsafe && (
                    <motion.div
                      initial={{ opacity: 0, rotateX: -10 }}
                      animate={{ opacity: 1, rotateX: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <SafetyBlock />
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="android-card"
                    style={styles.answerCard}
                  >
                    <div style={styles.answerMeta}>
                      <span style={styles.metaLabel}>AI RESPONSE</span>
                    </div>

                    <Typewriter
                      text={result.answer}
                      speed={5}
                      chunk={4}
                      onComplete={() => setIsTypingDone(true)}
                    />

                    {isTypingDone && !result.isUnsafe && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <SourcesBlock sources={result.sources} />
                      </motion.div>
                    )}
                  </motion.div>

                  {isTypingDone && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      style={{ paddingBottom: '20px' }}
                    >
                      <FeedbackSection queryId={result.queryId} />
                    </motion.div>
                  )}
                </div>
              )}
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const styles = {
  navWrapper: {
    paddingTop: '32px',
    height: '112px',
    position: 'relative',
    zIndex: 100, // Ensure it's above everything
  },
  navHeader: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '20px',
  },
  backBtn: {
    position: 'absolute',
    left: '20px',
    top: '56px',
    zIndex: 110, // Higher than wrapper
  },
  answerCard: {
    boxShadow: 'var(--shadow-premium)',
  },
  answerMeta: {
    marginBottom: '16px',
    borderBottom: '1px solid var(--border-subtle)',
    paddingBottom: '12px',
  },
  metaLabel: {
    fontSize: '0.65rem',
    fontWeight: '800',
    letterSpacing: '0.1em',
    color: 'var(--accent-primary)',
    textTransform: 'uppercase',
  },
  errorCard: {
    color: 'var(--danger)',
    backgroundColor: 'rgba(211, 78, 78, 0.05)',
    border: '1px solid rgba(211, 78, 78, 0.2)',
  }
};

export default App;

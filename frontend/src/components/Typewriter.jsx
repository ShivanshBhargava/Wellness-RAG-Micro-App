import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const Typewriter = ({ text, speed = 5, chunk = 3, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                const nextChunk = text.slice(index, index + chunk);
                setDisplayedText((prev) => prev + nextChunk);
                setIndex((prev) => prev + chunk);
            }, speed);
            return () => clearTimeout(timeout);
        } else if (onComplete) {
            onComplete();
        }
    }, [index, text, speed, chunk, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="markdown-content"
        >
            <ReactMarkdown>
                {displayedText}
            </ReactMarkdown>
        </motion.div>
    );
};

export default Typewriter;

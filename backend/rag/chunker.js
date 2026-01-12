const fs = require('fs');
const path = require('path');
const { encode, decode } = require('gpt-3-encoder');

/**
 * CHUNKING LOGIC:
 * 1. Tokenization: We use 'gpt-3-encoder' to convert raw text into tokens (BPE), 
 *    ensuring compatibility with LLM context windows.
 * 2. Sliding Window: We iterate through the token array with a specific step size.
 *    Step Size = Target Chunk Size - Overlap.
 * 3. Overlap (50 tokens): This ensures that semantic context isn't lost at the 
 *    boundaries of a chunk. If a sentence is cut off, the next chunk will contain 
 *    the end of that sentence.
 * 4. Meta-data Injection: Every chunk remains 'traceable' by carrying the ID and 
 *    title of its parent article.
 */

const INPUT_FILE = path.join(__dirname, '../../rag/yoga_articles.json');
const OUTPUT_FILE = path.join(__dirname, '../../rag/yoga_chunks.json');

const MIN_TOKENS = 300;
const MAX_TOKENS = 500;
const TARGET_CHUNK_SIZE = 400; // Middle ground for stability
const OVERLAP = 50;

function chunkArticles() {
    try {
        const rawData = fs.readFileSync(INPUT_FILE, 'utf8');
        const articles = JSON.parse(rawData);
        const allChunks = [];

        articles.forEach((article) => {
            const tokens = encode(article.content);
            let start = 0;
            let chunkIndex = 0;

            // If article is smaller than the minimum chunk size, take it as one chunk
            if (tokens.length <= MAX_TOKENS) {
                allChunks.push({
                    chunk_id: `${article.id}_${chunkIndex}`,
                    article_id: article.id,
                    title: article.title,
                    category: article.category,
                    content: article.content,
                    source_reference: article.source_reference,
                    source_link: article.source_link,
                    token_count: tokens.length
                });
            } else {
                // Sliding window for larger articles
                while (start < tokens.length) {
                    const end = Math.min(start + TARGET_CHUNK_SIZE, tokens.length);
                    const chunkTokens = tokens.slice(start, end);

                    allChunks.push({
                        chunk_id: `${article.id}_${chunkIndex}`,
                        article_id: article.id,
                        title: article.title,
                        category: article.category,
                        content: decode(chunkTokens),
                        source_reference: article.source_reference,
                        source_link: article.source_link,
                        token_count: chunkTokens.length
                    });

                    // Move start point by (Size - Overlap)
                    start += (TARGET_CHUNK_SIZE - OVERLAP);
                    chunkIndex++;

                    // Prevent creating a tiny sliver of a chunk at the very end
                    if (tokens.length - start < 100) break;
                }
            }
        });

        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allChunks, null, 2));
        console.log(`Successfully created ${allChunks.length} chunks from ${articles.length} articles.`);
        console.log(`Saved to: ${OUTPUT_FILE}`);

    } catch (error) {
        console.error('Error during chunking:', error);
    }
}

chunkArticles();

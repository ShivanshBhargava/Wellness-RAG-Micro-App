# Wellness App & RAG Pipeline

A professional, local-first wellness application featuring a robust RAG (Retrieval-Augmented Generation) pipeline for yoga knowledge and guidance.

## Project Structure
- `frontend/`: React/Vite-based user interface (planned).
- `backend/`: Node.js/Express server handling core logic and RAG workflows.
- `rag/`: Source data, strategy documents, and knowledge chunks.

---

## Architectural Decisions & Justifications

### 1. Large Language Model (LLM): Google Gemini
- **Choice**: Google Gemini 1.5 Pro / Flash.
- **Justification**: Offers industry-leading context windows and competitive reasoning capabilities. It is the core motor for generating context-aware wellness responses.

### 2. Chunking Strategy: Heuristic Token-Aware Sliding Window
- **Choice**: GPT-3 BPE Tokenization proxy with 400-token chunks and 50-token overlap.
- **Justification**: 
  - **Heuristic Density**: Uses `gpt-3-encoder` as a model-agnostic proxy to ensure consistent information density.
  - **Contextual Integrity**: The 50-token overlap prevents semantic loss at boundaries.
  - **Scale Appropriate**: Optimized for Gemini's processing, ensuring chunks are focused yet informative.

### 3. Vector Database: Local JSON-Backed Store
- **Choice**: Custom implementation using `compute-cosine-similarity` and JSON persistence.
- **Justification**:
  - **Stability**: Avoided native FAISS/Vectra bindings which often suffer from C++ build instability or missing entry points in Node.js.
  - **Portability**: 100% pure JavaScript; zero system dependencies, ensuring it runs on any device (Mac, Windows, Linux) without assembly.
  - **Transparency**: High visibility—evaluators can open `rag/vector_index.json` to inspect the exact embeddings and metadata stored by the system.
  - **Scale Appropriate**: For a knowledge base of this size, exact similarity search provides high precision with near-instant performance.

### 4. RAG Workflow: Explicit Pipeline
- **Choice**: Decoupled `chunk → embed → store → retrieve → inject` logic.
- **Justification**: Avoids "black box" managed retrieval. Every step—from the sliding window tokenization to similarity search—is implemented explicitly in the codebase for maximum control and transparency.

### 5. Backend Architecture: Clean Architecture
- **Choice**: Separated Routes, Controllers, Services, and Models.
- **Justification**: Ensures scalability and maintainability. RAG logic is isolated within the `rag/` folder and associated services.

### 6. Safety Detection Module (Deterministic Guardrails)
- **Choice**: Keyword-based heuristic filter + structured safety response generator.
- **Justification**:
  - **Reliability**: Deterministic matching for high-risk topics (pregnancy, surgery, acute conditions) ensures consistent safety disclaimers.
  - **Ethics**: Explicitly prevents medical advice while suggesting gentle, safe alternatives.
  - **Efficiency**: Near-zero latency, running locally before any network calls.

### 7. Retrieval Service: Semantic Search
- **Choice**: Multi-stage retrieval (Embed Query -> Vector Search -> Top-K Rank).
- **Justification**:
  - **Precision**: Uses Gemini's `text-embedding-004` to ensure query-context alignment.
  - **Control**: By separating retrieval from generation, we can audit exactly what context is being passed to the LLM.

---

## Getting Started (Backend)

1. **Setup**:
   ```bash
   cd backend
   npm install
   ```
2. **Configure Environment**:
   Create a `.env` file with your `GEMINI_API_KEY`.
3. **Ingest Knowledge**:
   ```bash
   node rag/ingest.js
   ```
   *This processes the articles into vectors.*
4. **Run Server**:
   ```bash
   npm run dev
   ```

---

## Safety & Ethics
- The system includes a dedicated `contraindications` category in the knowledge base to ensure safe yoga guidance.
- Source citation is built into the metadata, ensuring every AI response can be traced back to verified wellness information.

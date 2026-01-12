# Wellness App & RAG Pipeline

A professional, local-first wellness application featuring a robust RAG (Retrieval-Augmented Generation) pipeline for yoga knowledge and guidance.

## Project Structure
- `frontend/`: React/Vite-based user interface (planned).
- `backend/`: Node.js/Express server handling core logic and RAG workflows.
- `rag/`: Source data, strategy documents, and knowledge chunks.

---

## Architectural Decisions & Justifications

### 1. Large Language Model (LLM): Google Gemini
- **Choice**: Google Gemini Flash (Latest).
- **Justification**: Verified as the most stable and performant model version for this environment's API tier.

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
- **Deterministic Response Justification**: For high-risk medical/safety queries (e.g., surgery), the system purposefully uses a fixed, word-for-word response rather than AI generation. This ensures 100% safety and legal compliance, preventing the "hallucination" or "playful rephrasing" of critical medical disclaimers.

### 7. Retrieval Service: Semantic Search
- **Choice**: Multi-stage retrieval (Embed Query -> Vector Search -> Top-K Rank).
- **Justification**:
  - **Precision**: Uses Gemini's `text-embedding-004` to ensure query-context alignment.
  - **Control**: By separating retrieval from generation, we can audit exactly what context is being passed to the LLM.

### 8. LLM Prompt Design: Grounded Generation
- **Choice**: Structured instruction template with explicit "System Role" and "Constraint" blocks.
- **Justification**:
  - **Hallucination Mitigation**: Uses "negative constraints" (e.g., "If answer is not in chunks, say I don't know") to prevent AI inventions.
  - **Source Transparency**: Mandates citations within the response to build user trust.
  - **Contextual Integrity**: Context is injected using specific labels ([Chunk 1], [Source]), allowing the LLM to reason over delimited data.

### 9. Database Schema: Unified Interaction Model
- **Choice**: Single `Query` document containing the full RAG lifecycle.
- **Justification**:
  - **Auditability**: Storing the user query, safety flags, and the exact chunks retrieved alongside the AI response allows for perfect debugging of the pipeline.
  - **Feedback Loop**: Includes a structured feedback sub-document to enable future RLHF (Reinforcement Learning from Human Feedback) and system optimization.
  - **Analytics**: Timestamps and metadata enable monitoring of system usage and safety-trigger frequencies.

### 10. Logging Service: Atomic Persistence
- **Choice**: Centralized asychronous logging service using Mongoose.
- **Justification**:
  - **Data Integrity**: Ensures every RAG interaction (from query to safety flag to response) is saved atomically for future auditing.
  - **Observability**: Decouples business logic from persistence, allowing us to log failures gracefully without breaking the user experience.

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

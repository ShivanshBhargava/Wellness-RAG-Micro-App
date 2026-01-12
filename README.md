# VedaFlow: Spiritual Intelligence Platform

VedaFlow is a premium, local-first wellness application that synthesizes traditional yoga wisdom with advanced RAG (Retrieval-Augmented Generation) technology. It offers grounded, safe, and context-aware yoga guidance in a "Zen Slate" digital environment.

## 🌟 Key Features

### 🧘‍♂️ **Zen Slate Interface**
- **Atmospheric Design**: A calm, premium aesthetic using "Zen Slate" dark modes, soft gradients, and glassmorphism.
- **Dynamic Visuals**: Features an animated mandala aura and a custom Yoga Silhouette hero section that breathes with the user.
- **Micro-Interactions**: Smooth Framer Motion transitions, spring-physics buttons, and reactive hover states.

### 🧠 **Grounded AI Guidance**
- **RAG Pipeline**: Responses are generated using a custom Retrieval-Augmented Generation engine powered by Gemini 2.5 Flash and a local vector store.
- **Safety First**: Deterministic guardrails instantly detect high-risk queries (injury, acute pain) and provide safe, non-medical advice.
- **Verified Sources**: Every response cites specific "Knowledge Chunks" from the curated Veda library, building trust through transparency.

### ⚡ **High-Performance Interaction**
- **Instant Response**: Optimized backend architecture delivers answers immediately while handling logging in the background.
- **Streaming Typography**: Custom typewriter effects render text in natural, readable chunks.
- **Persistent Feedback**: State-aware feedback mechanism allows users to rate responses, with selections persisting via database synchronization.

---

## 🏗️ Project Architecture

### 1. Frontend (Vite + React)
- **Framework**: React 18 with Vite for blazing fast HMR.
- **Styling**: Pure CSS Modules & Global Variables for the "Zen Slate" theme.
- **Animation**: `framer-motion` for complex orchestrations (entrance, exit, layout capability).
- **Icons**: `lucide-react` for consistent, lightweight iconography.

### 2. Backend (Node.js + Express)
- **API Design**: RESTful architecture separating Controllers, Services, and Routes.
- **Vector Database**: Custom, dependency-free JSON vector store using `compute-cosine-similarity` for portability and stability.
- **LLM Integration**: Google Gemini 2.5 Flash for high-speed, cost-effective inference.
- **Logging**: Asynchronous MongoDB logging for full query-response auditing without latency penalties.

### 3. RAG Strategy (Retrieval-Augmented Generation)
- **Ingestion**: Custom sliding-window chunker (400 tokens) with heuristic overlap.
- **Retrieval**: Semantic search using cosine similarity on `text-embedding-004` vectors.
- **Prompt Engineering**: "Grounded Generation" template enforcing citation and safety constraints.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or via URI)
- Google Gemini API Key

### Installation

1. **Clone the Repository**
   ```bash
   git clone <repo-url>
   cd WellnessApp
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create .env file with:
   # GEMINI_API_KEY=your_key_here
   # MONGODB_URI=mongodb://localhost:27017/wellness_db
   
   # Ingest the knowledge base
   node rag/ingest.js
   
   # Start the server
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   # Start the development server
   npm run dev
   ```

4. **Access the App**
   Open `http://localhost:5173` in your browser.

---

## 🔒 Safety & Ethics

- **Deterministic Guardrails**: The system refuses to generate medical advice for high-risk inputs (e.g., "broken bone", "surgery"), defaulting to a hard-coded safety protocol.
- **Source Transparency**: "Verified Library" badges and explicit citation links ensure users know exactly where their guidance comes from.

---

## 🛠️ Recent Updates (v1.1)

- **Gemini 2.5 Flash**: Upgraded LLM for faster, more coherent responses.
- **Persistent Feedback**: Feedback buttons now maintain their state across interactions.
- **Visual Polish**: New Yoga Hero silhouette and refined typography.

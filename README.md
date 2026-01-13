# VedaFlow: Spiritual Intelligence Platform

VedaFlow is a premium, local-first wellness application that synthesizes traditional yoga wisdom with advanced RAG (Retrieval-Augmented Generation) technology. It offers grounded, safe, and context-aware yoga guidance in a "Zen Slate" digital environment.


---


## Project Overview

**VedaFlow** is designed as a Micro-App demonstrating the power of **Retrieval-Augmented Generation (RAG)** in the wellness domain. Unlike generic chatbots, VedaFlow delivers a specialized experience:

1.  **Retrieves** verified instructions from a curated "Vekda Library" (JSON-based knowledge store).
2.  **Augments** the AI prompt with relevant "Knowledge Chunks".
3.  **Generates** grounded responses citing specific sources.
4.  **Safeguards** users by filtering medical emergencies deterministically.

### Tech Stack

- **Frontend**: React + Vite + Framer Motion (Zen Slate UI).
- **Backend**: Node.js + Express (REST API).
- **AI Engine**: Google Gemini 2.5 Flash + text-embedding-004.
- **Database**: MongoDB (Logs & Feedback) + Local JSON Vector Store (Embeddings).


---


## Setup Instructions

### 1. Prerequisites

- **Node.js** (v18+)
- **MongoDB** (Must be running locally on port 27017 or provide a cloud URI)
- **Google Gemini API Key** (Get at [aistudio.google.com](https://aistudio.google.com/))


### 2. Backend Configuration

The backend orchestrates the RAG pipeline.

```bash
cd backend
npm install
```

**Environment Variables (.env)**

Create a `.env` file in `/backend`:

```ini
PORT=5001
GEMINI_API_KEY=your_key_here
MONGODB_URI=mongodb://localhost:27017/wellness_db
# Optional: Set to 'production' to enable strict logging
NODE_ENV=development
```

**Vector Database Ingestion**

Before running the app, you must process the raw knowledge (articles) into vectors:

```bash
# Reads rag/yoga_articles.json -> Chunks -> Embeds -> Saves to rag/vector_index.json
node rag/ingest.js
```

> **Note:** This generates a `vector_index.json` file (~800KB) which acts as the local vector database.

**Start Server**

```bash
npm run dev
# Server will run on http://localhost:5001
```


### 3. Frontend Configuration

The frontend handles the "Zen Slate" UI.

```bash
cd frontend
npm install
```

**Environment Variables (.env)**

Create a `.env` file in `/frontend`:

```ini
# Point to your local backend
VITE_API_BASE_URL=http://localhost:5001
```

**Start Client**

```bash
npm run dev
# Client will run on http://localhost:5173
```


---


## RAG Pipeline Architecture

Our RAG system follows a strict **"Retrieve-then-Generate"** protocol.

### 1. Ingestion (`rag/ingest.js`)

- **Chunking**: Raw text is split into sliding windows of 400 tokens with 50-token overlap to preserve context.
- **Embedding**: Each chunk is passed to `text-embedding-004` to create a 768-dimensional vector.
- **Storage**: Vectors + Metadata are stored in a flat JSON file (`vector_index.json`).

### 2. Retrieval (`services/retrieval.service.js`)

- **Flow**: User Query -> Embedded into Vector.
- **Algorithm**: Cosine Similarity calculated against all stored chunks.
- **Selection**: The top 3 most relevant chunks are retrieved.

### 3. Generation (`services/chat.service.js`)

- **Prompt Construction**: `System Role` + `Context Chunks` + `User Query` + `Constraints`.
- **Model**: Gemini 2.5 Flash generates the final answer using *only* the provided context.


---


## Safety Logic & Guardrails

VedaFlow implements a **Dual-Layer Safety Mechanism**.

### Layer 1: Deterministic (`services/safety.service.js`)

- **Mechanism**: Regex-based scanning for high-risk terms.
- **Triggers**: "broken bone", "surgery", "heart attack", "acute pain".
- **Action**: If detected, the AI is **BYPASSED entirely**. The system returns a hard-coded "Safety First" response advising medical attention.

### Layer 2: Model Constraints

- **Mechanism**: System Prompt Engineering.
- **Instruction**: *"If the answer is not in the context, state you do not know. Do not hallucinate health advice."*


---


## Data Models (MongoDB)

**User Query (`Query.js`)**

Captures the full interaction lifecycle for auditing.

```javascript
{
  userQuery: String,      // "What is Tree Pose?"
  safetyFlag: {           // Was it unsafe?
    isUnsafe: Boolean,
    reason: String
  },
  retrievedChunks: [      // What context was used?
    { chunkId, title, content }
  ],
  aiResponse: String,     // Final output
  feedback: {             // User rating
    isHelpful: Boolean,
    comment: String
  }
}
```


---


## AI Agent Prompt Log

This project was built using an AI Agent (Antigravity). Below is a summary of the prompts and capabilities used to generate this solution.

| Interaction ID | User Objective | AI Action Taken |
| :--- | :--- | :--- |
| **Monorepo Init** | "Initialize a professional monorepo" | Created structure: `frontend/`, `backend/`, `rag/`. Configured Vite & Express. |
| **Zen UI Design** | "Use Rich Aesthetics... Zen Slate" | Implemented `framer-motion` animations, glassmorphism, and custom "Yoga Silhouette" hero. |
| **RAG Engine** | "Build a RAG pipeline for yoga" | Wrote `ingest.js` (Chunking/Embedding), `retrieval.service.js` (Cosine Sim), and connected Gemini API. |
| **Safety Guardrails** | "Prevent medical advice" | Implemented `SafetyService` with regex guardrails to intercept specific keywords before AI processing. |
| **Debugging AI model** | "Fix 500 Internal Server Error due to outdated model name" | Diagnosed missing `vector_index.json` & outdated model name (`gemini-1.5-flash` -> `gemini-2.5-flash`). |


---


## What AI Did Not Do

While the AI Agent (Antigravity) accelerated development, the following critical tasks were handled by the Human Developer:

1.  **API Key Management**: The generation and security of the Google Gemini API keys and MongoDB connection strings were managed manually by the user.
2.  **Vercel Project Configuration**: The actual creation of the project on the Vercel Dashboard and the linking of the GitHub repository was a human-led process.
3.  **Android Build Environment**: Setting up Android Studio, the SDKs, and the physical device/emulator for testing the Capacitor build was outside the AI's jurisdiction.
4.  **Content Curation**: The raw yoga knowledge (articles) used for RAG ingestion was provided as a foundational dataset, not invented by the AI.



---


## Mobile Support (Capacitor)

The project is pre-configured for Android conversion.

- **Config**: `capacitor.config.json` points to the production Vercel URL.
- **Build**: Run `npx cap sync` and `npx cap open android` to build the APK.


---

*Verified by VedaFlow Team | 2026*

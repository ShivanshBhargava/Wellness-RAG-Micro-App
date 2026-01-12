# Yoga Content & RAG Strategy

## Yoga Articles Overview

The knowledge base consists of a curated set of yoga-focused articles designed to support safe, informative, and context-aware responses. Content categories include:

- **Asana Guides**  
  Pose-specific articles detailing execution cues, benefits, contraindications, and common mistakes across beginner, intermediate, and advanced levels.

- **Yoga Philosophy & History**  
  Foundational concepts including the Yoga Sutras, the Eight Limbs of Yoga, and historical context relevant to modern practice.

- **Pranayama & Meditation**  
  Breathwork and mindfulness techniques, including their intended effects, general precautions, and suitability for different experience levels.

- **Wellness, Anatomy & Physiology**  
  Science-informed articles explaining how yoga influences flexibility, posture, the nervous system, stress response, and overall mental well-being.

All content is either self-authored or responsibly summarized from publicly available references. Raw copyrighted material is not directly redistributed.

---

## Why Chunking Is Required

Chunking involves dividing long-form articles into smaller, semantically coherent segments before embedding. This is critical for an effective RAG pipeline because:

- **Higher Embedding Quality**  
  Smaller, focused chunks produce more meaningful vector representations than full-length documents.

- **Efficient Context Utilization**  
  Language models have finite context windows; chunking ensures only the most relevant information is injected into the prompt.

- **Precise Retrieval**  
  It allows the system to retrieve specific passages that directly answer the user’s query, reducing noise and hallucination risk.

Chunks are created along logical boundaries (e.g., pose description, benefits, contraindications) to preserve semantic integrity.

---

## Source Citation Strategy

Transparency and explainability are core design goals. Source attribution is handled as follows:

- **Metadata-Backed Storage**  
  Each chunk is stored with metadata such as article title, author (if available), source name, and publication year or URL.

- **Response-Level Attribution**  
  Retrieved sources used to generate an answer are exposed to the user in a dedicated “Sources Used” section.

- **Traceability & Logging**  
  Retrieved chunk identifiers are logged in the database alongside user queries and AI responses for auditability and analysis.

This approach ensures users can understand where information originates while maintaining a clean separation between retrieved knowledge and generated output.

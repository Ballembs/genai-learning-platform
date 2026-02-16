// content/lessons/index.ts
// ============================================
// Lesson Content Data
// ============================================

import type { Term, AdvancedTopic, UserLevel, Quiz } from '@/types';

// Import individual lesson content
import { lesson01 } from './lesson-01';
import { lesson02 } from './lesson-02';
import { lesson03 } from './lesson-03';
import { lesson05 } from './lesson-05';

interface LessonData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  estimatedMinutes: number;
  content: Record<UserLevel, string>;
  terms: Term[];
  advancedTopics: AdvancedTopic[];
  quiz: Quiz;
}

// ============================================
// LESSON 4: RAG
// ============================================

const ragLesson: LessonData = {
  id: 'lesson-04',
  title: 'RAG',
  subtitle: 'Teaching AI Your Data',
  description: 'Build AI systems that answer questions using YOUR documents. The pattern behind every modern AI assistant.',
  estimatedMinutes: 40,
  
  terms: [
    {
      id: 'embeddings',
      term: 'Embeddings',
      slug: 'embeddings',
      popup: {
        beginner: {
          explanation: 'Embeddings are numbers that capture the meaning of text. Think of them as GPS coordinates, but for meaning instead of location.',
          example: '"Happy" and "joyful" have similar numbers. "Happy" and "refrigerator" have very different numbers.',
          diagram: `flowchart LR
    A["Text"] --> B["Model"]
    B --> C["Numbers"]`,
        },
        intermediate: {
          explanation: 'Dense vector representations of text (768-1536 dimensions) that capture semantic meaning. Similar concepts have high cosine similarity.',
          example: 'voyage.embed(["machine learning"]) → [0.023, -0.156, ...]',
        },
        advanced: {
          explanation: 'Learned projections into continuous vector spaces via transformer architectures. Training uses contrastive learning or MLM objectives.',
        },
      },
      hasDeepDive: true,
      relatedTerms: ['vector-database', 'cosine-similarity', 'chunking'],
      usedInLessons: ['lesson-03', 'lesson-04'],
    },
    {
      id: 'vector-database',
      term: 'Vector Database',
      slug: 'vector-database',
      popup: {
        beginner: {
          explanation: 'A smart filing system that organizes content by meaning, not keywords. It stores "meaning numbers" and finds similar ones quickly.',
          example: 'Search "happy moments" and find content about "joyful occasions" because their numbers are close.',
        },
        intermediate: {
          explanation: 'Stores embeddings and enables fast similarity search using ANN algorithms. Popular options: Pinecone, Weaviate, ChromaDB.',
          example: 'collection.query(query_embeddings=[...], n_results=5)',
        },
        advanced: {
          explanation: 'Uses HNSW or IVF indices for sub-linear retrieval. Supports metadata filtering and hybrid search combining dense and sparse vectors.',
        },
      },
      hasDeepDive: true,
      relatedTerms: ['embeddings', 'similarity-search', 'hnsw'],
      usedInLessons: ['lesson-03', 'lesson-04'],
    },
    {
      id: 'chunking',
      term: 'Chunking',
      slug: 'chunking',
      popup: {
        beginner: {
          explanation: 'Splitting documents into smaller pieces so AI can find the right parts. Like cutting a book into chapters.',
          example: 'A 100-page document becomes 200 searchable pieces of ~500 characters each.',
        },
        intermediate: {
          explanation: 'Document segmentation strategy. Chunk size affects precision vs context tradeoff. Overlap prevents information loss at boundaries.',
        },
        advanced: {
          explanation: 'Strategies include fixed-size, semantic, recursive, and parent-child chunking. Optimal size depends on embedding model and use case.',
        },
      },
      hasDeepDive: true,
      relatedTerms: ['embeddings', 'retrieval', 'context-window'],
      usedInLessons: ['lesson-04'],
    },
    {
      id: 'retrieval',
      term: 'Retrieval',
      slug: 'retrieval',
      popup: {
        beginner: {
          explanation: 'Finding the right pieces of your data to show the AI. Like a librarian finding relevant books for your question.',
        },
        intermediate: {
          explanation: 'The "R" in RAG. Uses semantic search to find relevant chunks. Quality directly impacts answer quality.',
        },
        advanced: {
          explanation: 'Can use dense (embedding), sparse (BM25), or hybrid retrieval. Reranking improves precision. HyDE generates hypothetical documents.',
        },
      },
      hasDeepDive: true,
      relatedTerms: ['embeddings', 'vector-database', 'reranking'],
      usedInLessons: ['lesson-04'],
    },
    {
      id: 'context-window',
      term: 'Context Window',
      slug: 'context-window',
      popup: {
        beginner: {
          explanation: 'The amount of text AI can "see" at once. Like a window that only shows part of a document.',
          example: 'Claude can see ~200,000 tokens (~500 pages) at once.',
        },
        intermediate: {
          explanation: 'Maximum tokens the model processes in one call. Retrieved chunks must fit within this limit along with the prompt.',
        },
        advanced: {
          explanation: 'Modern models: 8K-200K tokens. Attention complexity is O(n²), driving context engineering strategies.',
        },
      },
      hasDeepDive: true,
      relatedTerms: ['tokens', 'chunking', 'prompt-engineering'],
      usedInLessons: ['lesson-01', 'lesson-04'],
    },
    {
      id: 'llm',
      term: 'LLM',
      slug: 'llm',
      popup: {
        beginner: {
          explanation: 'Large Language Model - AI trained on massive text to understand and generate language. ChatGPT, Claude, and Gemini are LLMs.',
        },
        intermediate: {
          explanation: 'Transformer-based models with billions of parameters, trained on internet-scale text using next-token prediction.',
        },
        advanced: {
          explanation: 'Autoregressive transformer models. Training uses cross-entropy loss. Capabilities emerge from scale (parameters × data × compute).',
        },
      },
      hasDeepDive: true,
      relatedTerms: ['tokens', 'context-window', 'prompt-engineering'],
      usedInLessons: ['lesson-01', 'lesson-04', 'lesson-05'],
    },
    {
      id: 'prompt-template',
      term: 'Prompt Template',
      slug: 'prompt-template',
      popup: {
        beginner: {
          explanation: 'A fill-in-the-blank structure for AI requests. You define the format, then insert your specific data.',
          example: '"Answer based on: {context}. Question: {question}"',
        },
        intermediate: {
          explanation: 'Structured prompts with placeholders for context and queries. Ensures consistent behavior and enables systematic evaluation.',
        },
        advanced: {
          explanation: 'Can include system prompts, few-shot examples, chain-of-thought instructions, and output formatting requirements.',
        },
      },
      hasDeepDive: true,
      relatedTerms: ['prompt-engineering', 'system-prompt'],
      usedInLessons: ['lesson-02', 'lesson-04'],
    },
    {
      id: 'hallucination',
      term: 'Hallucination',
      slug: 'hallucination',
      popup: {
        beginner: {
          explanation: 'When AI makes up information that sounds true but isn\'t. RAG helps reduce this by giving AI real facts to use.',
        },
        intermediate: {
          explanation: 'Model-generated content not grounded in training data or provided context. RAG mitigates by providing source material.',
        },
        advanced: {
          explanation: 'Occurs due to pattern completion without factual grounding. Mitigations: RAG, constrained decoding, citation requirements.',
        },
      },
      hasDeepDive: true,
      relatedTerms: ['grounding', 'citations', 'factuality'],
      usedInLessons: ['lesson-01', 'lesson-04'],
    },
  ],
  
  advancedTopics: [
    {
      id: 'reranking',
      title: 'Reranking',
      description: 'Use cross-encoders to improve retrieval precision',
      difficulty: 'intermediate',
      prerequisites: ['retrieval', 'embeddings'],
      hasDeepDive: true,
    },
    {
      id: 'hyde',
      title: 'HyDE (Hypothetical Document Embeddings)',
      description: 'Generate hypothetical answers to improve retrieval',
      difficulty: 'advanced',
      prerequisites: ['retrieval', 'embeddings', 'llm'],
      hasDeepDive: true,
    },
    {
      id: 'multi-vector-retrieval',
      title: 'Multi-Vector Retrieval',
      description: 'Use multiple embedding representations per document',
      difficulty: 'advanced',
      prerequisites: ['embeddings', 'chunking'],
      hasDeepDive: true,
    },
    {
      id: 'hybrid-search',
      title: 'Hybrid Search',
      description: 'Combine semantic search with keyword matching',
      difficulty: 'intermediate',
      prerequisites: ['retrieval', 'embeddings'],
      hasDeepDive: true,
    },
  ],

  quiz: {
    id: 'quiz-04-rag',
    title: 'RAG Knowledge Check',
    passingScore: 70,
    questions: [
      {
        id: 'rag-q1',
        question: 'What does RAG stand for?',
        type: 'multiple-choice',
        options: [
          'Retrieval-Augmented Generation',
          'Random Access Generation',
          'Recursive Algorithm Generation',
          'Real-time AI Gateway'
        ],
        correctAnswer: 0,
        explanation: 'RAG stands for Retrieval-Augmented Generation - it retrieves relevant documents and augments the AI prompt with them.',
        difficulty: 'beginner',
      },
      {
        id: 'rag-q2',
        question: 'Why is RAG often preferred over fine-tuning for custom data?',
        type: 'multiple-choice',
        options: [
          'Fine-tuning produces better results',
          'RAG allows instant updates and is cheaper',
          'Fine-tuning is not possible with modern LLMs',
          'RAG requires less data'
        ],
        correctAnswer: 1,
        explanation: 'RAG allows instant updates when documents change and is significantly cheaper than fine-tuning, which requires retraining.',
        difficulty: 'intermediate',
      },
      {
        id: 'rag-q3',
        question: 'What is the primary purpose of chunking in a RAG pipeline?',
        type: 'multiple-choice',
        options: [
          'To reduce storage costs',
          'To make documents searchable by splitting them into retrievable pieces',
          'To encrypt sensitive information',
          'To translate documents into multiple languages'
        ],
        correctAnswer: 1,
        explanation: 'Chunking splits documents into smaller, searchable pieces that can be retrieved based on relevance to a query.',
        difficulty: 'beginner',
      },
      {
        id: 'rag-q4',
        question: 'In production RAG systems, reranking is used to:',
        type: 'multiple-choice',
        options: [
          'Generate more creative responses',
          'Improve retrieval precision using cross-encoders',
          'Reduce the number of API calls',
          'Translate queries to different languages'
        ],
        correctAnswer: 1,
        explanation: 'Reranking uses cross-encoder models to re-score retrieved documents, improving precision beyond initial vector similarity.',
        difficulty: 'advanced',
      },
    ],
  },

  content: {
    beginner: `## What Problem Does RAG Solve?

You want AI to help with YOUR stuff - your company's documents, your family's stories, your personal notes. But AI has two big problems:

**Problem 1: Knowledge Cutoff**

AI was trained months ago. It doesn't know about your documents, last week's news, or anything that happened after training.

**Problem 2: Limited Memory**

Even if you try to paste everything, there's a limit. You can't give AI your entire company's knowledge base in one message.

**RAG breaks through both walls.**

## What is RAG?

RAG stands for **Retrieval-Augmented Generation**. Let's break that down:

| Part | Meaning | What It Does |
|------|---------|--------------|
| **Retrieval** | Finding | Search YOUR data for relevant info |
| **Augmented** | Enhanced | Add that info to the AI's prompt |
| **Generation** | Creating | AI generates answer using YOUR data |

> **The Open-Book Exam Analogy**
> 
> Without RAG: AI takes a closed-book exam. It can only use what it memorized.
> 
> With RAG: AI takes an open-book exam. You hand it the relevant pages for each question.

## How RAG Works

The process has four simple steps:

1. **User asks a question** - "What's our vacation policy?"

2. **Find relevant documents** - System searches your HR docs using [embeddings]

3. **Build the prompt** - Add found documents to the AI's prompt

4. **Generate answer** - AI reads your docs and answers accurately

Here's what this looks like:

\`\`\`mermaid
flowchart LR
    A["User Question"] --> B["Search Your Docs"]
    B --> C["Find Relevant Chunks"]
    C --> D["Add to Prompt"]
    D --> E["AI Generates Answer"]
\`\`\`

## RAG vs Just Asking AI

**Without RAG:**

User: "What's our vacation policy?"
AI: "Typically, companies offer 2-3 weeks of PTO..."

❌ Generic answer. Not YOUR policy.

**With RAG:**

User: "What's our vacation policy?"
System: *retrieves from your HR documents*
AI: "According to section 4.2, full-time employees receive 20 days PTO annually..."

✓ Your actual policy. With citations.

## Why Not Just Train AI On Your Data?

Good question! Training AI (called [fine-tuning]) is expensive, slow, and permanent. You'd need to retrain every time documents change.

RAG is different:

| Aspect | Training/Fine-tuning | RAG |
|--------|---------------------|-----|
| Update speed | Days/weeks | Instant |
| Cost | Expensive | Cheap |
| New documents | Retrain required | Just add them |
| Multiple users | Same model for all | Different docs per user |

## The RAG Pipeline

Every RAG system has two parts:

### Part 1: Ingestion (Done Once)

When you add documents:

1. **Parse** - Extract text from PDFs, Word docs, etc.
2. **Chunk** - Split into searchable pieces (see [chunking])
3. **Embed** - Convert to numbers (see [embeddings])
4. **Store** - Save in [vector database]

### Part 2: Query (Every Question)

When user asks something:

1. **Embed the question** - Convert to numbers
2. **Search** - Find similar chunks
3. **Build prompt** - Combine chunks + question
4. **Generate** - [LLM] creates the answer

## Key Design Decisions

### How Many Chunks?

- **Too few** (1-2): Might miss important info
- **Sweet spot** (3-7): Focused but comprehensive
- **Too many** (10+): AI gets confused, loses focus

### What If Info Isn't Found?

RAG systems must handle "I don't know" gracefully:

> "I don't see information about parental leave in the documents I have access to. You might want to check with HR directly."

This is crucial! Without this rule, AI might [hallucinate] an answer.

## Putting It All Together

Here's the complete [prompt template] for RAG:

\`\`\`
SYSTEM: You are a helpful assistant that answers based on provided context.

RULES:
- Answer ONLY from the context below
- If not in context, say "I don't have that information"
- Cite your sources

CONTEXT:
{retrieved_chunks}

USER QUESTION:
{question}
\`\`\`

## What's Next?

You now understand RAG conceptually. In the next lesson, you'll learn about [agents] - AI that can decide what actions to take, including when to use RAG!

**Key Takeaways:**
- RAG lets AI answer from YOUR data
- It retrieves relevant chunks, then generates answers
- Much faster and cheaper than training
- Every modern AI assistant uses some form of RAG`,

    intermediate: `## The RAG Architecture

RAG (Retrieval-Augmented Generation) is the dominant pattern for building AI systems that use custom data. This lesson covers the complete architecture, implementation considerations, and common pitfalls.

## Why RAG Over Fine-Tuning?

| Approach | Update Speed | Cost | Data Privacy | Accuracy Control |
|----------|-------------|------|--------------|------------------|
| Fine-tuning | Days | High | Data goes to provider | Limited |
| RAG | Instant | Low | Data stays local | High (citations) |

RAG wins for most production use cases because:
- **Dynamic content**: Documents change frequently
- **Multiple tenants**: Different users need different data
- **Auditability**: Citations trace back to sources
- **No training**: Faster iteration cycles

## The Complete Pipeline

\`\`\`mermaid
flowchart TB
    subgraph Ingestion["Ingestion Pipeline (Offline)"]
        A[Documents] --> B[Parse]
        B --> C[Chunk]
        C --> D[Embed]
        D --> E[(Vector DB)]
    end
    
    subgraph Query["Query Pipeline (Real-time)"]
        F[User Query] --> G[Embed Query]
        G --> H[Similarity Search]
        E --> H
        H --> I[Rerank]
        I --> J[Build Prompt]
        J --> K[LLM]
        K --> L[Response]
    end
\`\`\`

## Ingestion Pipeline Deep Dive

### 1. Document Parsing

Extract text while preserving structure:

\`\`\`python
# Example using different parsers
from pypdf import PdfReader
from docx import Document

def parse_document(file_path: str) -> str:
    if file_path.endswith('.pdf'):
        reader = PdfReader(file_path)
        return ' '.join(page.extract_text() for page in reader.pages)
    elif file_path.endswith('.docx'):
        doc = Document(file_path)
        return ' '.join(p.text for p in doc.paragraphs)
\`\`\`

### 2. Chunking Strategies

[Chunking] has major impact on retrieval quality:

| Strategy | Pros | Cons | Best For |
|----------|------|------|----------|
| Fixed-size | Simple, predictable | Breaks mid-sentence | General use |
| Sentence-based | Natural boundaries | Variable size | Conversational |
| Semantic | Meaning-aware | Complex, slower | High-precision |
| Recursive | Respects structure | Implementation overhead | Structured docs |

**Recommended approach**: Start with 500-character chunks with 50-character overlap.

### 3. Embedding

Use a production-grade embedding model:

\`\`\`python
import voyageai

client = voyageai.Client()

def embed_chunks(chunks: list[str]) -> list[list[float]]:
    response = client.embed(
        texts=chunks,
        model="voyage-2",
        input_type="document"  # vs "query" for queries
    )
    return response.embeddings
\`\`\`

### 4. Vector Storage

Store [embeddings] with metadata for filtering:

\`\`\`python
collection.add(
    ids=["chunk_1", "chunk_2"],
    embeddings=[[0.1, 0.2, ...], [0.3, 0.4, ...]],
    documents=["chunk text 1", "chunk text 2"],
    metadatas=[
        {"source": "hr_policy.pdf", "section": "vacation"},
        {"source": "hr_policy.pdf", "section": "sick_leave"}
    ]
)
\`\`\`

## Query Pipeline Deep Dive

### 1. Query Embedding

Use the same model, but specify query input type:

\`\`\`python
query_embedding = client.embed(
    texts=[user_query],
    model="voyage-2",
    input_type="query"  # Optimized for queries
).embeddings[0]
\`\`\`

### 2. Retrieval

The core [retrieval] step:

\`\`\`python
results = collection.query(
    query_embeddings=[query_embedding],
    n_results=10,  # Retrieve more, then rerank
    where={"source": "hr_policy.pdf"}  # Metadata filter
)
\`\`\`

### 3. Reranking (Optional but Recommended)

Cross-encoder reranking improves precision:

\`\`\`python
from cohere import Client

cohere = Client()

reranked = cohere.rerank(
    query=user_query,
    documents=results["documents"],
    top_n=5
)
\`\`\`

### 4. Prompt Construction

Build the [prompt template]:

\`\`\`python
def build_rag_prompt(query: str, chunks: list[dict]) -> str:
    context = "\\n\\n---\\n\\n".join(
        f"[Source: {c['source']}]\\n{c['text']}"
        for c in chunks
    )
    
    return f"""Answer based on the provided context only.
If the answer isn't in the context, say so.

CONTEXT:
{context}

QUESTION: {query}

ANSWER:"""
\`\`\`

## Common Failure Modes

### 1. Poor Retrieval

**Symptoms**: Right answer exists but wrong chunks retrieved
**Causes**: Bad chunking, weak embeddings, missing metadata
**Fixes**: 
- Add metadata filters
- Implement hybrid search (BM25 + semantic)
- Use reranking

### 2. [Hallucination] Despite Context

**Symptoms**: AI makes up info not in chunks
**Causes**: Weak system prompt, high temperature
**Fixes**:
- Explicit "only use context" instructions
- Lower temperature (0.1-0.3)
- Add few-shot examples of refusal

### 3. Lost Information at Boundaries

**Symptoms**: Info split across chunks gets missed
**Causes**: No overlap, mid-sentence splits
**Fixes**:
- Add 10-20% overlap between chunks
- Use sentence-aware chunking
- Implement parent-child retrieval

## Production Considerations

### Evaluation Metrics

| Metric | Measures | How to Test |
|--------|----------|-------------|
| Retrieval Recall | Found correct chunks? | Golden test set |
| Answer Faithfulness | Grounded in context? | LLM-as-judge |
| Answer Relevance | Answers the question? | Human eval |

### Scaling

- **Caching**: Cache embeddings and common queries
- **Async**: Parallelize retrieval and reranking
- **Batching**: Batch embedding requests

## Advanced Patterns (Click to Explore)

The following patterns build on basic RAG:

- **HyDE**: Generate hypothetical answer, embed that
- **Multi-vector**: Multiple embeddings per document
- **Self-query**: LLM generates structured filters
- **Graph RAG**: Combine with knowledge graphs`,

    advanced: `## RAG: Production Architecture and Advanced Patterns

This lesson covers production-grade RAG architecture, advanced retrieval patterns, evaluation frameworks, and optimization strategies.

## Architecture Overview

\`\`\`mermaid
flowchart TB
    subgraph Ingestion["Ingestion Pipeline"]
        A[Documents] --> B[Parser Layer]
        B --> C[Chunking Strategy]
        C --> D[Embedding Pipeline]
        D --> E[(Primary Index)]
        D --> F[(Secondary Index)]
    end
    
    subgraph Query["Query Pipeline"]
        G[Query] --> H[Query Understanding]
        H --> I[Routing]
        I --> J[Retrieval]
        J --> K[Reranking]
        K --> L[Context Assembly]
        L --> M[Generation]
        M --> N[Post-processing]
    end
    
    subgraph Feedback["Feedback Loop"]
        N --> O[Evaluation]
        O --> P[Fine-tuning Data]
    end
\`\`\`

## Chunking: A Deep Dive

Chunking strategy directly impacts retrieval quality. The tradeoff:

- **Smaller chunks**: Higher precision, loses context
- **Larger chunks**: More context, dilutes relevance signal

### Advanced Chunking Strategies

**1. Recursive Character Splitting**

\`\`\`python
def recursive_split(text: str, separators: list[str], chunk_size: int) -> list[str]:
    if len(text) <= chunk_size:
        return [text]
    
    for sep in separators:
        if sep in text:
            parts = text.split(sep)
            chunks = []
            current = ""
            for part in parts:
                if len(current) + len(part) <= chunk_size:
                    current += sep + part if current else part
                else:
                    if current:
                        chunks.append(current)
                    current = part
            if current:
                chunks.append(current)
            return chunks
    
    # Fallback to character split
    return [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]

# Usage: splits on paragraphs first, then sentences, then words
chunks = recursive_split(text, ["\\n\\n", "\\n", ". ", " "], 500)
\`\`\`

**2. Semantic Chunking**

Use [embeddings] to find natural break points:

\`\`\`python
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def semantic_chunk(sentences: list[str], embeddings: list[list[float]], 
                   threshold: float = 0.5) -> list[list[str]]:
    chunks = [[sentences[0]]]
    
    for i in range(1, len(sentences)):
        sim = cosine_similarity([embeddings[i-1]], [embeddings[i]])[0][0]
        if sim < threshold:
            chunks.append([sentences[i]])
        else:
            chunks[-1].append(sentences[i])
    
    return [" ".join(chunk) for chunk in chunks]
\`\`\`

**3. Parent-Child [Retrieval]**

Retrieve on small chunks, return parent context:

\`\`\`python
# Store both granular and parent chunks
parent_chunks = split_into_sections(document)  # ~2000 chars
child_chunks = []

for i, parent in enumerate(parent_chunks):
    children = split_into_sentences(parent)  # ~200 chars each
    for j, child in enumerate(children):
        child_chunks.append({
            "text": child,
            "parent_id": f"parent_{i}",
            "parent_text": parent
        })

# Query on children, return parent
results = collection.query(query_embedding, n=5)
parent_texts = set(r["parent_text"] for r in results)
\`\`\`

## Advanced Retrieval Patterns

### Hybrid Search

Combine dense (semantic) and sparse (keyword) retrieval:

\`\`\`python
from rank_bm25 import BM25Okapi

def hybrid_search(query: str, documents: list[str], 
                  embeddings: list[list[float]], alpha: float = 0.5):
    # Sparse (BM25)
    tokenized = [doc.split() for doc in documents]
    bm25 = BM25Okapi(tokenized)
    sparse_scores = bm25.get_scores(query.split())
    
    # Dense (embedding similarity)
    query_emb = embed([query])[0]
    dense_scores = cosine_similarity([query_emb], embeddings)[0]
    
    # Normalize and combine
    sparse_norm = (sparse_scores - sparse_scores.min()) / (sparse_scores.max() - sparse_scores.min())
    dense_norm = (dense_scores - dense_scores.min()) / (dense_scores.max() - dense_scores.min())
    
    combined = alpha * dense_norm + (1 - alpha) * sparse_norm
    return np.argsort(combined)[::-1]
\`\`\`

### HyDE (Hypothetical Document [Embeddings])

Generate a hypothetical answer, embed that for retrieval:

\`\`\`python
def hyde_retrieval(query: str) -> list[str]:
    # Generate hypothetical answer
    hypothetical = llm.complete(f"""
        Write a paragraph that would answer this question:
        {query}
        
        Write as if you know the answer (even if you don't).
    """)
    
    # Embed the hypothetical answer
    hyde_embedding = embed([hypothetical])[0]
    
    # Search with hypothetical embedding
    # Often outperforms direct query embedding
    return vector_db.search(hyde_embedding, k=5)
\`\`\`

### Self-Query Retrieval

Use [LLM] to generate structured filters:

\`\`\`python
def self_query(query: str) -> tuple[str, dict]:
    structured = llm.complete(f"""
        Given this query, extract:
        1. The semantic search query
        2. Any metadata filters
        
        Query: {query}
        
        Example:
        Query: "vacation policy for engineers hired after 2023"
        Semantic: "vacation policy"
        Filters: {{"department": "engineering", "hire_date": {{">": "2023-01-01"}}}}
        
        Return JSON.
    """)
    
    parsed = json.loads(structured)
    return parsed["semantic"], parsed["filters"]

# Usage
semantic_query, filters = self_query(user_input)
results = collection.query(
    query=embed([semantic_query])[0],
    where=filters
)
\`\`\`

## Evaluation Framework

### Retrieval Metrics

\`\`\`python
def evaluate_retrieval(queries: list[str], 
                       ground_truth: list[set[str]],
                       retrieved: list[list[str]]) -> dict:
    metrics = {
        "recall@5": [],
        "mrr": [],
        "ndcg": []
    }
    
    for gt, ret in zip(ground_truth, retrieved):
        # Recall@5
        hits = len(set(ret[:5]) & gt)
        metrics["recall@5"].append(hits / len(gt))
        
        # MRR (Mean Reciprocal Rank)
        for i, doc in enumerate(ret):
            if doc in gt:
                metrics["mrr"].append(1 / (i + 1))
                break
        else:
            metrics["mrr"].append(0)
    
    return {k: np.mean(v) for k, v in metrics.items()}
\`\`\`

### Answer Quality Metrics

Use LLM-as-judge for faithfulness and relevance:

\`\`\`python
def evaluate_faithfulness(answer: str, context: str) -> float:
    """Check if answer is grounded in context (no [hallucination])"""
    
    judgment = llm.complete(f"""
        Context: {context}
        
        Answer: {answer}
        
        Is every claim in the answer supported by the context?
        Respond with a score from 0 to 1.
    """)
    
    return float(judgment)
\`\`\`

## Production Optimizations

### 1. Embedding Cache

\`\`\`python
import hashlib
from functools import lru_cache

@lru_cache(maxsize=10000)
def cached_embed(text_hash: str, text: str) -> list[float]:
    return embed([text])[0]

def embed_with_cache(texts: list[str]) -> list[list[float]]:
    return [
        cached_embed(hashlib.md5(t.encode()).hexdigest(), t)
        for t in texts
    ]
\`\`\`

### 2. Streaming with Early Context

\`\`\`python
async def stream_rag_response(query: str):
    # Start retrieval immediately
    retrieval_task = asyncio.create_task(retrieve(query))
    
    # Stream acknowledgment while retrieving
    yield "Let me search for that..."
    
    # Wait for retrieval
    chunks = await retrieval_task
    
    # Stream the actual response
    async for token in llm.stream(build_prompt(query, chunks)):
        yield token
\`\`\`

### 3. Adaptive Retrieval

Adjust number of chunks based on query complexity:

\`\`\`python
def adaptive_retrieve(query: str) -> list[str]:
    # Classify query complexity
    complexity = llm.complete(f"""
        Rate query complexity (simple/medium/complex):
        {query}
    """).strip().lower()
    
    k = {"simple": 3, "medium": 5, "complex": 10}[complexity]
    
    return retrieve(query, k=k)
\`\`\`

## Advanced Topics for Further Exploration

Click any topic to dive deeper:

- **GraphRAG**: Combine RAG with knowledge graph traversal
- **Agentic RAG**: Use [agents] to decide retrieval strategy
- **Multi-modal RAG**: Retrieve images and tables
- **Corrective RAG**: Iteratively refine retrieval based on generation quality
- **Speculative RAG**: Parallel retrieval with multiple strategies`,
  },
};

// ============================================
// EXPORT ALL LESSONS
// ============================================

export const lessonData: Record<string, LessonData> = {
  '01-how-ai-works': lesson01,
  '02-prompt-engineering': lesson02,
  '03-embeddings': lesson03,
  '04-rag': ragLesson,
  '05-agents': lesson05,
};

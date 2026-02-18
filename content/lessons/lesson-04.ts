// content/lessons/lesson-04.ts
// RAG - Retrieval-Augmented Generation

import type { Term, AdvancedTopic, UserLevel } from '@/types';

export const lesson04Terms: Term[] = [
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
  {
    id: 'fine-tuning',
    term: 'Fine-tuning',
    slug: 'fine-tuning',
    popup: {
      beginner: {
        explanation: 'Retraining an AI model with your specific data so it "learns" your information permanently. Expensive and slow compared to RAG.',
        example: 'Like sending an employee to months of training vs giving them a reference binder.',
      },
      intermediate: {
        explanation: 'Additional training of a pre-trained model on domain-specific data. Changes model weights. Useful for style/format, not for factual updates.',
        example: 'Fine-tuning GPT-3.5 on customer support conversations to match your tone.',
      },
      advanced: {
        explanation: 'Techniques include full fine-tuning, LoRA, QLoRA, and prefix tuning. RLHF/DPO for alignment. Not ideal for frequently changing knowledge.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['llm', 'embeddings', 'rag-vs-fine-tuning'],
    usedInLessons: ['lesson-04'],
  },
  {
    id: 'citations',
    term: 'Citations',
    slug: 'citations',
    popup: {
      beginner: {
        explanation: 'When AI tells you WHERE it found the answer - like a footnote in a book. This lets you verify the information.',
        example: '"According to section 4.2 of the HR Policy..." — you can go check that section yourself.',
      },
      intermediate: {
        explanation: 'Source attribution in RAG responses. Implementation ranges from chunk-level references to exact quote extraction with page numbers.',
      },
      advanced: {
        explanation: 'Approaches: inline citations with chunk IDs, post-hoc attribution via NLI, or constrained generation requiring source grounding.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['hallucination', 'retrieval', 'grounding'],
    usedInLessons: ['lesson-04'],
  },
  {
    id: 'cosine-similarity',
    term: 'Cosine Similarity',
    slug: 'cosine-similarity',
    popup: {
      beginner: {
        explanation: 'A way to measure how similar two "meaning numbers" are. Score of 1.0 = identical meaning. Score of 0.0 = completely different.',
        example: '"happy" vs "joyful" = 0.92 (very similar). "happy" vs "refrigerator" = 0.15 (very different).',
      },
      intermediate: {
        explanation: 'Measures angle between vectors, ignoring magnitude. Formula: cos(θ) = (A·B) / (|A|×|B|). Range: -1 to 1, typically 0 to 1 for embeddings.',
        example: 'np.dot(embedding_a, embedding_b) / (np.linalg.norm(embedding_a) * np.linalg.norm(embedding_b))',
      },
      advanced: {
        explanation: 'Preferred over Euclidean distance for normalized embeddings. Equivalent to dot product for unit vectors. Some models use dot product or L2 distance instead.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['embeddings', 'vector-database', 'similarity-search'],
    usedInLessons: ['lesson-03', 'lesson-04'],
  },
];

export const lesson04AdvancedTopics: AdvancedTopic[] = [
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
  {
    id: 'graph-rag',
    title: 'GraphRAG',
    description: 'Combine RAG with knowledge graph traversal for multi-hop reasoning',
    difficulty: 'advanced',
    prerequisites: ['retrieval', 'chunking', 'llm'],
    hasDeepDive: true,
  },
  {
    id: 'agentic-rag',
    title: 'Agentic RAG',
    description: 'Use AI agents to dynamically decide retrieval strategies',
    difficulty: 'advanced',
    prerequisites: ['retrieval', 'llm'],
    hasDeepDive: true,
  },
];

export const lesson04Content: Record<UserLevel, string> = {
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

✓ Your actual policy. With [citations].

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
2. **Search** - Find similar chunks using [cosine similarity]
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
- Much faster and cheaper than [fine-tuning]
- Every modern AI assistant uses some form of RAG`,

  intermediate: `## The RAG Architecture

RAG (Retrieval-Augmented Generation) is the dominant pattern for building AI systems that use custom data. This lesson covers the complete architecture, implementation considerations, and common pitfalls. Understanding each component in depth will help you build reliable, production-quality RAG systems.

The fundamental insight behind RAG is separation of concerns: use embedding models for finding relevant information, and use [LLM]s for generating human-quality responses. This division plays to each model's strengths—embedding models are fast and cheap for similarity matching, while LLMs excel at synthesis and natural language generation.

## Why RAG Over Fine-Tuning?

The choice between RAG and [fine-tuning] is one of the first architectural decisions you'll face. While fine-tuning modifies the model's weights to "remember" your data, RAG keeps the model unchanged and provides data at inference time. This has profound implications for how you operate and maintain your system.

| Approach | Update Speed | Cost | Data Privacy | Accuracy Control |
|----------|-------------|------|--------------|------------------|
| [Fine-tuning] | Days | High | Data goes to provider | Limited |
| RAG | Instant | Low | Data stays local | High ([citations]) |

RAG wins for most production use cases because:
- **Dynamic content**: Documents change frequently—RAG handles updates instantly while fine-tuning requires expensive retraining
- **Multiple tenants**: Different users need different data—RAG can scope retrieval per-user while fine-tuning creates one model for everyone
- **Auditability**: [Citations] trace back to sources, enabling fact-checking and compliance requirements
- **No training**: Faster iteration cycles—you can experiment with chunking, prompts, and retrieval strategies without touching model weights

Fine-tuning still has its place: when you need to change the model's *style* (writing tone, output format) rather than its *knowledge*. But for factual, document-based question answering, RAG is almost always the right choice.

## The Complete Pipeline

A RAG system has two distinct pipelines that operate at different times. The **ingestion pipeline** runs offline when you add or update documents—it's a batch process that can take minutes or hours. The **query pipeline** runs in real-time when users ask questions—it must complete in seconds to feel responsive.

Understanding this separation helps you make architectural decisions. Expensive operations (parsing complex PDFs, generating embeddings) happen during ingestion. Query time focuses on fast retrieval and prompt construction.

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

Each step in these pipelines can fail in different ways, and understanding the failure modes helps you build robust systems. Let's examine each step in detail.

## Ingestion Pipeline Deep Dive

The ingestion pipeline transforms raw documents into searchable embeddings. Quality here compounds throughout the system—bad parsing or chunking leads to bad retrieval, which leads to bad answers. Invest time getting ingestion right.

### 1. Document Parsing

Parsing extracts text from various formats while preserving meaningful structure. This sounds simple but is surprisingly tricky. PDFs might be scanned images requiring [OCR]. Word documents have headers, footers, and text boxes. HTML has navigation and ads mixed with content.

The key principle: preserve structure that aids understanding while removing noise. Keep section headings (they provide context), remove page numbers and repeated headers (they add noise), and preserve tables in a way that maintains relationships between cells.

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

In production, you'll need more sophisticated parsing. Consider using [unstructured.io] or similar libraries that handle edge cases like multi-column layouts, tables embedded in text, and maintaining reading order across page breaks.

### 2. Chunking Strategies

[Chunking] has major impact on retrieval quality, and getting it wrong is one of the most common RAG failures. The fundamental tradeoff: smaller chunks are more precise but lose context; larger chunks have more context but dilute the relevance signal.

Consider a user asking "What is the vacation policy for senior engineers?" A tiny chunk containing just "Senior engineers receive 25 days PTO" is precise but might miss important context like "Subject to manager approval" that appears in the previous sentence. A huge chunk containing the entire HR policy section dilutes the relevance—the embedding becomes an average of many topics.

| Strategy | Pros | Cons | Best For |
|----------|------|------|----------|
| Fixed-size | Simple, predictable | Breaks mid-sentence | General use |
| Sentence-based | Natural boundaries | Variable size | Conversational |
| Semantic | Meaning-aware | Complex, slower | High-precision |
| Recursive | Respects structure | Implementation overhead | Structured docs |

**Why overlap matters**: Information often spans chunk boundaries. Without overlap, "Senior engineers" might end one chunk and "receive 25 days PTO" starts the next—making both chunks less useful. 10-20% overlap ensures boundary information appears in at least one complete chunk.

**Recommended approach**: Start with 500-character chunks with 50-character overlap. This works well for most content. Then evaluate retrieval quality on real queries and adjust based on what you find.

### 3. Embedding

Embedding converts text chunks into numerical vectors that capture semantic meaning. The choice of embedding model significantly impacts retrieval quality. Use models specifically trained for retrieval tasks—they understand the asymmetric relationship between short queries and longer documents.

Notice the \`input_type\` parameter below. Retrieval-optimized models like Voyage AI treat queries and documents differently, improving matching between "how do I get time off?" (query) and "Vacation Policy: Employees may request paid time off..." (document).

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

**Batch for efficiency**: Embedding APIs are much faster with batches. Instead of 1000 individual API calls, send batches of 100 chunks each. This reduces latency and often costs less due to reduced overhead.

### 4. Vector Storage

The [vector database] stores embeddings and enables fast similarity search. But equally important is the *metadata* you store alongside each chunk. Good metadata enables filtering, improves retrieval, and powers citations.

Think about what you'll want to filter on: source document, section, date, author, department, access level. Include chunk position for reconstructing context. Store the original text for display (or store a reference if chunks are large).

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

The metadata structure should match your filtering needs. A user asking about "engineering vacation policy" benefits from filtering to engineering documents first, then searching within that subset—much more precise than searching all documents.

## Query Pipeline Deep Dive

The query pipeline runs every time a user asks a question. It must be fast (users expect responses in seconds), accurate (wrong answers destroy trust), and graceful under uncertainty (knowing when to say "I don't know").

### 1. Query Embedding

Use the same embedding model as ingestion, but with the query input type. This asymmetric approach helps bridge the vocabulary gap between how users phrase questions and how documents state facts.

\`\`\`python
query_embedding = client.embed(
    texts=[user_query],
    model="voyage-2",
    input_type="query"  # Optimized for queries
).embeddings[0]
\`\`\`

The embedding operation is fast (typically <100ms) but introduces an external dependency. For production systems, implement timeouts and fallback behavior—a query that times out is worse than a slightly degraded response.

### 2. Retrieval

[Retrieval] is the core of RAG—find chunks whose embeddings are most similar to the query embedding. This step determines what information the LLM will see. If the right chunks aren't retrieved, the answer will be wrong no matter how good your LLM is.

The \`n_results\` parameter balances recall vs noise. Retrieving 10 chunks captures more potentially relevant information, but some will be irrelevant and might confuse the model. Starting with 10 and using reranking to filter down to 5 is a common pattern.

Metadata filters are powerful but often underutilized. If you know the user is asking about HR policies, filter to HR documents before semantic search. This improves both precision and speed.

\`\`\`python
results = collection.query(
    query_embeddings=[query_embedding],
    n_results=10,  # Retrieve more, then rerank
    where={"source": "hr_policy.pdf"}  # Metadata filter
)
\`\`\`

**Hybrid search** combines semantic similarity with keyword matching (BM25). This helps when queries contain specific terms that should match exactly—product names, error codes, acronyms. Semantic search alone might miss "error E4021" because it doesn't understand the specific identifier.

### 3. Reranking (Optional but Recommended)

Initial retrieval uses bi-encoder models—they embed query and document separately, enabling fast approximate matching. But this misses nuances that require seeing query and document together.

Reranking uses cross-encoder models that see both query and document simultaneously, enabling much more precise relevance scoring. The tradeoff is speed: cross-encoders are 10-100x slower than bi-encoders, so you only run them on the top candidates from initial retrieval.

\`\`\`python
from cohere import Client

cohere = Client()

reranked = cohere.rerank(
    query=user_query,
    documents=results["documents"],
    top_n=5
)
\`\`\`

Reranking typically improves precision by 10-30%. It's especially valuable when initial retrieval returns many borderline-relevant results that need careful discrimination.

### 4. Prompt Construction

The [prompt template] assembles everything for the LLM. This is where you inject retrieved chunks, set behavioral instructions, and structure the request. Small changes here can dramatically affect output quality.

Key considerations for prompt construction:
- **Order matters**: Place the most relevant chunks first (LLMs pay more attention to earlier context)
- **Clear boundaries**: Use separators like \`---\` to distinguish between chunks
- **Source attribution**: Include source metadata so the LLM can cite references
- **Explicit instructions**: Tell the LLM to only use provided context and to say "I don't know" when appropriate

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

**Token budget management**: The LLM has a limited [context window]. If your chunks exceed the budget, you must truncate—but how? Options include: take only the top N chunks, summarize chunks before inclusion, or use a model with a larger context window. Each has tradeoffs between cost, latency, and completeness.

## Common Failure Modes

Debugging RAG systems requires understanding the distinct ways each component can fail. When users complain about wrong answers, the root cause could be anywhere in the pipeline. Systematic diagnosis starts with identifying which component failed.

### 1. Poor Retrieval

**Symptoms**: Right answer exists in your documents but wrong chunks are retrieved
**Causes**: Bad [chunking], weak [embeddings], missing metadata, vocabulary mismatch
**How to diagnose**: Log retrieved chunks for failing queries. If the correct chunks never appear in the top results, it's a retrieval problem.

**Fixes**:
- Add metadata filters to scope search appropriately
- Implement hybrid search (BM25 + semantic) to catch keyword matches
- Use reranking to improve precision on retrieved candidates
- Review chunking—are relevant facts split across chunk boundaries?

### 2. [Hallucination] Despite Context

**Symptoms**: AI generates information that's not in the retrieved chunks, or contradicts them
**Causes**: Weak system prompt, high temperature, chunks are too vague, or model's parametric knowledge overrides context

**How to diagnose**: Compare the generated answer against the actual chunks. If claims appear that aren't in any chunk, it's hallucination.

**Fixes**:
- Explicit "only use context" instructions in your system prompt
- Lower temperature (0.1-0.3) to reduce creative fabrication
- Add few-shot examples showing proper refusal ("Based on the provided documents, I don't have information about...")
- Use models specifically tuned for grounded generation

### 3. Lost Information at Boundaries

**Symptoms**: User asks about something that exists in your documents, but the answer requires information from multiple adjacent chunks that weren't both retrieved

**Causes**: No overlap between chunks, mid-sentence splits, retrieval returns only one of the needed chunks

**How to diagnose**: Find the relevant information in your original documents. Check if it's split across chunk boundaries in a way that makes each chunk incomplete.

**Fixes**:
- Add 10-20% overlap between chunks
- Use sentence-aware chunking that respects natural boundaries
- Implement parent-child [retrieval]: retrieve on small chunks, return their parent context
- Consider larger chunk sizes if boundary issues are frequent

## Production Considerations

Moving from prototype to production requires systematic evaluation, performance optimization, and operational monitoring. You need to know when your system is working, when it's failing, and have metrics to guide improvements.

### Evaluation Metrics

Evaluating RAG systems requires measuring multiple dimensions independently. A system can have excellent retrieval but poor generation (finds right chunks, generates wrong answer), or vice versa. Understanding where problems occur guides where to focus improvement efforts.

| Metric | Measures | How to Test |
|--------|----------|-------------|
| Retrieval Recall | Found correct chunks? | Golden test set with labeled relevant documents |
| Answer Faithfulness | Grounded in context? | LLM-as-judge: "Is every claim supported by context?" |
| Answer Relevance | Answers the question? | Human eval or LLM-as-judge |

**Retrieval evaluation** requires ground truth: for each test query, you need to know which documents *should* be retrieved. Build this manually by having domain experts label relevant documents for 50-100 representative queries. Then measure recall@k: what fraction of relevant documents appear in the top k results?

**Faithfulness evaluation** checks whether the answer is grounded in the provided context—catching [hallucination]. You can use an LLM to judge this: "Given this context and this answer, is every claim in the answer supported by the context? Score 0-1."

**Relevance evaluation** checks whether the answer actually addresses the user's question. A faithful answer can still be irrelevant if it's grounded in chunks that don't relate to the query. Human evaluation is most reliable, but LLM-as-judge provides scalable approximation.

### Scaling

Production RAG systems need to handle many concurrent users with low latency. Several optimization patterns help:

- **Caching**: Cache query embeddings for repeated queries, cache LLM responses for identical prompts
- **Async**: Parallelize retrieval and reranking—start reranking as soon as retrieval completes
- **Batching**: Batch embedding requests when processing multiple chunks or queries
- **Index optimization**: Tune [HNSW] parameters for your recall/latency tradeoff
- **Response streaming**: Stream LLM output to reduce perceived latency

## Advanced Patterns (Click to Explore)

The following patterns build on basic RAG for specific use cases and requirements:

- **HyDE**: Generate hypothetical answer, embed that—improves retrieval when queries are phrased differently than documents
- **Multi-vector**: Multiple embeddings per document—capture different aspects of complex content
- **Self-query**: [LLM] generates structured filters—natural language to metadata queries
- **Graph RAG**: Combine with knowledge graphs—multi-hop reasoning across related entities`,

  advanced: `## RAG: Production Architecture and Advanced Patterns

This lesson covers production-grade RAG architecture, advanced [retrieval] patterns, evaluation frameworks, and optimization strategies. We'll examine the architectural decisions that separate prototype RAG systems from production-quality deployments handling millions of queries.

Building production RAG requires thinking beyond the basic retrieve-then-generate pattern. You need query understanding that handles ambiguous or complex questions. You need routing logic that directs queries to the right indexes. You need robust evaluation that catches degradation before users do. And you need feedback loops that improve the system over time.

## Architecture Overview

Production RAG systems are more complex than the basic diagram suggests. Real systems have multiple indexes (for different document types or access levels), sophisticated query processing, and continuous evaluation pipelines that monitor quality.

The architecture below shows a complete production system. Notice the separation between ingestion (batch, offline), query processing (real-time, latency-critical), and feedback (asynchronous, quality-focused). Each component has different scaling characteristics and failure modes.

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

Let's examine each component of this architecture, understanding the design decisions and implementation patterns that make production systems robust.

## Chunking: A Deep Dive

[Chunking] is perhaps the most underestimated component of RAG systems. The choice of chunking strategy directly determines what information can be retrieved, and thus what the LLM can use to generate answers. A well-chunked corpus enables precise retrieval; a poorly-chunked one guarantees mediocre results.

The fundamental tradeoff is precision vs context:

- **Smaller chunks**: Higher precision—when a chunk matches, it's highly relevant. But loses context—the chunk might not contain enough information to be useful alone.
- **Larger chunks**: More context—self-contained units that can answer questions. But dilutes relevance—the embedding becomes an average of many concepts, making precise matching harder.

The optimal chunk size depends on your content and queries. Technical documentation with dense, standalone facts benefits from smaller chunks. Narrative content where understanding requires context benefits from larger chunks.

### Advanced Chunking Strategies

**1. Recursive Character Splitting**

The recursive approach respects document hierarchy: try to split on paragraph breaks first (semantic boundaries), fall back to sentence breaks, then word breaks, and only use arbitrary character splits as a last resort. This produces more coherent chunks than naive fixed-size splitting.

The algorithm examines separators in order of preference. If the document can be split into chunks of acceptable size using paragraphs, it does so. If some paragraphs are too long, it recurses into those using sentences, and so on.

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

This approach works well for most document types and is a good default. The separator list can be customized for specific content—add markdown headers for documentation, code block markers for technical content.

**2. Semantic Chunking**

Instead of splitting on syntactic boundaries (sentences, paragraphs), semantic chunking uses [embeddings] to identify conceptual boundaries. Adjacent sentences with high similarity belong together; a drop in similarity signals a topic shift and thus a chunk boundary.

This produces chunks that are semantically coherent—each chunk discusses one topic or concept. The tradeoff is computational cost: you need to embed every sentence to identify boundaries, which is expensive for large corpora.

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

The threshold parameter is critical: too high and you get tiny chunks (every sentence is its own chunk); too low and you get huge chunks (everything seems related). Tune this on your specific content—0.5 is a reasonable starting point for general text.

**3. Parent-Child [Retrieval]**

Parent-child retrieval elegantly solves the precision-vs-context tradeoff by using *different* chunk sizes for retrieval and generation. You embed small, precise chunks for retrieval (easier to match specific queries), but return their larger parent chunks to the LLM (providing necessary context).

Think of it as: index on sentences, retrieve on paragraphs. The sentence-level precision ensures you find the right location; the paragraph-level context ensures the LLM has enough information to generate a good answer.

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

This pattern is especially effective for long documents where the right answer might be a single sentence, but understanding that sentence requires surrounding context.

## Advanced Retrieval Patterns

Basic semantic search—embed query, find similar chunks—works well for simple cases but struggles with complex queries, vocabulary mismatches, and precision requirements. Advanced retrieval patterns address these limitations by adding intelligence to the retrieval process.

### Hybrid Search

Semantic search excels at understanding meaning but can miss exact keyword matches. BM25 (keyword search) excels at exact matches but misses semantic similarity. [Hybrid search] combines both, capturing queries that need either or both capabilities.

Consider the query "error E4021 in production environment." Semantic search understands "production environment" but might not prioritize documents containing "E4021" exactly. BM25 catches the exact error code but might miss documents discussing "deployment issues" that don't mention "production."

The alpha parameter controls the balance: 0.5 weights both equally, higher values favor semantic, lower values favor keyword. Tune this based on your query patterns—technical support queries with error codes might want lower alpha; conceptual questions might want higher.

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
    dense_scores = [cosine_similarity](query_emb, embeddings)[0]

    # Normalize and combine
    sparse_norm = (sparse_scores - sparse_scores.min()) / (sparse_scores.max() - sparse_scores.min())
    dense_norm = (dense_scores - dense_scores.min()) / (dense_scores.max() - dense_scores.min())

    combined = alpha * dense_norm + (1 - alpha) * sparse_norm
    return np.argsort(combined)[::-1]
\`\`\`

Normalization is critical—BM25 and embedding similarity have different score distributions. Without normalization, one method might dominate simply due to its score scale.

### HyDE (Hypothetical Document [Embeddings])

[HyDE] addresses a fundamental asymmetry: queries are phrased as questions, documents are phrased as answers. "What is the company vacation policy?" embeds differently than "Employees are entitled to 20 days PTO..."—even though they're about the same topic.

HyDE bridges this gap by first generating a hypothetical answer to the query, then embedding *that* answer for retrieval. The hypothetical answer uses document-like phrasing, making it semantically closer to actual documents than the original question.

This works surprisingly well even though the hypothetical answer is fabricated—its *phrasing style* matches documents even if its *content* is wrong. The embedding captures "this is what an answer about vacation policy would sound like," which retrieves actual vacation policy documents.

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

The tradeoff is latency: HyDE adds an LLM call before retrieval. Use it when query-document vocabulary mismatch is a significant problem, and the latency cost is acceptable.

### Self-Query Retrieval

Many queries contain both semantic content AND metadata constraints: "vacation policy for engineers hired after 2023" combines a topic (vacation policy) with filters (department=engineering, hire_date>2023). Basic semantic search can't handle the filters; pure metadata filtering misses the semantic component.

Self-query retrieval uses the [LLM] to decompose natural language queries into semantic queries plus structured filters. This enables powerful natural language interfaces while leveraging your metadata structure.

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

This pattern requires good metadata design during ingestion—you can only filter on fields you've stored. Plan your metadata schema based on anticipated query patterns.

## Evaluation Framework

Systematic evaluation distinguishes production RAG systems from demos. Without metrics, you're flying blind—unable to detect regressions, compare approaches, or prove that improvements actually improve. Build evaluation into your development process from the start.

RAG evaluation happens at two levels: retrieval quality (did we find the right chunks?) and answer quality (did we generate a correct response?). These can fail independently—good retrieval with bad generation, or bad retrieval with (lucky) good generation. Measuring both pinpoints where problems occur.

### Retrieval Metrics

Retrieval evaluation requires ground truth: for a set of test queries, you need to know which chunks *should* be retrieved. Building this dataset takes effort but pays dividends—it's reusable across experiments and catches regressions before they reach users.

**Recall@k** measures completeness: of all relevant documents, what fraction did we find in the top k? High recall means the right information is available to the LLM.

**MRR (Mean Reciprocal Rank)** measures ranking quality: how quickly do we find the first relevant document? MRR of 1.0 means the first result is always relevant; 0.5 means it's usually second.

**NDCG** (Normalized Discounted Cumulative Gain) is the most sophisticated metric, accounting for both relevance grades and position. Higher positions matter more, and documents can be partially relevant.

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

Start with 50-100 evaluation queries covering your expected query distribution. Include edge cases, multi-topic queries, and queries where the answer doesn't exist (to test graceful "I don't know" handling).

### Answer Quality Metrics

Answer evaluation is harder than retrieval evaluation because "correct" is subjective. Two approaches dominate: human evaluation (accurate but expensive) and LLM-as-judge (scalable but imperfect).

**Faithfulness** checks whether the answer is grounded in the provided context—catching [hallucination]. An answer can be relevant and well-written but contain fabricated information. LLM-as-judge works reasonably well here: show the model the context and answer, ask if every claim is supported.

**Relevance** checks whether the answer addresses the user's question. A faithful answer can still be irrelevant if retrieval found the wrong documents.

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

LLM-as-judge has known biases: it favors longer answers, is overly generous, and can miss subtle hallucinations. Calibrate against human judgments on a sample of cases, and don't rely solely on automated evaluation for high-stakes decisions.

## Production Optimizations

Production RAG systems must balance quality, latency, and cost. A 10-second response might be accurate but unusable. A cheap system that hallucinates destroys trust. These optimizations help you find the right tradeoffs for your use case.

### 1. Embedding Cache

Query embeddings are deterministic: the same query always produces the same embedding. Caching eliminates redundant embedding API calls for repeated queries—common in production where users ask similar questions.

The cache key is the text hash; the value is the embedding. Memory-bounded caches (LRU) automatically evict less-used embeddings. For persistent caching, use Redis or similar key-value stores.

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

For high-traffic systems, also consider caching complete responses for identical (query, context) pairs—but be careful about staleness if your documents update.

### 2. Streaming with Early Context

Users perceive streaming responses as faster than equivalent non-streaming responses, even when total time is the same. Better yet: provide early feedback while retrieval runs in the background, then stream the actual answer.

This pattern shows the user something immediately ("Let me search for that..."), preventing the perception of a frozen interface. The acknowledgment streams while retrieval completes in parallel.

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

This async pattern enables sophisticated orchestration: start multiple retrievals in parallel, cancel slow paths when fast paths return sufficient results, or progressively enhance answers as more context arrives.

### 3. Adaptive Retrieval

Not all queries need the same number of chunks. Simple factual questions ("What's the office address?") need 1-2 chunks. Complex questions spanning multiple topics ("Compare the vacation and sick leave policies") need more context.

Adaptive retrieval uses query understanding to adjust the retrieval strategy. This saves tokens on simple queries (reducing cost) and provides more context on complex ones (improving quality).

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

The classification call adds latency, so balance the savings against this cost. For high-volume systems, train a small classifier to avoid LLM calls for every query.

## Advanced Topics for Further Exploration

Click any topic to dive deeper:

- **GraphRAG**: Combine RAG with knowledge graph traversal for multi-hop reasoning across related entities—essential when answers require connecting facts from different documents
- **Agentic RAG**: Use [agents] to dynamically decide retrieval strategy, reformulate queries, and iteratively refine answers—powerful for complex research tasks
- **Multi-modal RAG**: Retrieve and reason over images, tables, and diagrams alongside text—critical for technical documentation and data-rich domains
- **Corrective RAG**: Generate an initial answer, evaluate it, and iteratively improve retrieval/generation if quality is low—self-correcting systems
- **Speculative RAG**: Run multiple retrieval strategies in parallel, use the best results—trades compute for latency and robustness`,
};

export const lesson04Quiz = {
  id: 'quiz-04-rag',
  title: 'RAG Knowledge Check',
  passingScore: 70,
  questions: [
    {
      id: 'rag-q1',
      question: 'What does RAG stand for?',
      type: 'multiple-choice' as const,
      options: [
        'Retrieval-Augmented Generation',
        'Random Access Generation',
        'Recursive Algorithm Generation',
        'Real-time AI Gateway'
      ],
      correctAnswer: 0,
      explanation: 'RAG stands for Retrieval-Augmented Generation - it retrieves relevant documents and augments the AI prompt with them.',
      difficulty: 'beginner' as const,
    },
    {
      id: 'rag-q2',
      question: 'Why is RAG often preferred over fine-tuning for custom data?',
      type: 'multiple-choice' as const,
      options: [
        'Fine-tuning produces better results',
        'RAG allows instant updates and is cheaper',
        'Fine-tuning is not possible with modern LLMs',
        'RAG requires less data'
      ],
      correctAnswer: 1,
      explanation: 'RAG allows instant updates when documents change and is significantly cheaper than fine-tuning, which requires retraining.',
      difficulty: 'intermediate' as const,
    },
    {
      id: 'rag-q3',
      question: 'What is the primary purpose of chunking in a RAG pipeline?',
      type: 'multiple-choice' as const,
      options: [
        'To reduce storage costs',
        'To make documents searchable by splitting them into retrievable pieces',
        'To encrypt sensitive information',
        'To translate documents into multiple languages'
      ],
      correctAnswer: 1,
      explanation: 'Chunking splits documents into smaller, searchable pieces that can be retrieved based on relevance to a query.',
      difficulty: 'beginner' as const,
    },
    {
      id: 'rag-q4',
      question: 'In production RAG systems, reranking is used to:',
      type: 'multiple-choice' as const,
      options: [
        'Generate more creative responses',
        'Improve retrieval precision using cross-encoders',
        'Reduce the number of API calls',
        'Translate queries to different languages'
      ],
      correctAnswer: 1,
      explanation: 'Reranking uses cross-encoder models to re-score retrieved documents, improving precision beyond initial vector similarity.',
      difficulty: 'advanced' as const,
    },
    {
      id: 'rag-q5',
      question: 'What happens when a RAG system cannot find relevant information in its documents?',
      type: 'multiple-choice' as const,
      options: [
        'It should make up a reasonable answer',
        'It should search the internet instead',
        'It should say it doesn\'t have that information',
        'It should ask the user to rephrase'
      ],
      correctAnswer: 2,
      explanation: 'A well-designed RAG system should gracefully say "I don\'t have that information" rather than hallucinating an answer from unrelated context.',
      difficulty: 'beginner' as const,
    },
  ],
};

// Combined export
export const lesson04 = {
  id: 'lesson-04',
  title: 'RAG',
  subtitle: 'Teaching AI Your Data',
  description: 'Build AI systems that answer questions using YOUR documents. The pattern behind every modern AI assistant.',
  estimatedMinutes: 40,
  terms: lesson04Terms,
  advancedTopics: lesson04AdvancedTopics,
  content: lesson04Content,
  quiz: lesson04Quiz,
};

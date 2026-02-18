// content/lessons/lesson-03.ts
// Embeddings & Vector Search

import type { Term, AdvancedTopic, UserLevel } from '@/types';

export const lesson03Terms: Term[] = [
  {
    id: 'embeddings',
    term: 'Embeddings',
    slug: 'embeddings',
    popup: {
      beginner: {
        explanation: 'Numbers that capture the meaning of text - like GPS coordinates, but for ideas instead of places.',
        example: '"Happy" and "joyful" get similar numbers. "Happy" and "refrigerator" get very different numbers.',
      },
      intermediate: {
        explanation: 'Dense vector representations (768-1536 dims) that encode semantic meaning. Similar concepts have high cosine similarity.',
        example: 'embed("king") - embed("man") + embed("woman") ≈ embed("queen")',
      },
      advanced: {
        explanation: 'Learned projections via contrastive learning (SimCLR, CLIP) or MLM objectives. Matryoshka embeddings enable variable dimensionality.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['vector-database', 'cosine-similarity', 'semantic-search'],
    usedInLessons: ['lesson-03', 'lesson-04'],
  },
  {
    id: 'vector',
    term: 'Vector',
    slug: 'vector',
    popup: {
      beginner: {
        explanation: 'A list of numbers that represents something. In AI, vectors represent the meaning of text or images.',
        example: '[0.2, -0.5, 0.8, 0.1] is a vector with 4 numbers.',
      },
      intermediate: {
        explanation: 'Mathematical object with magnitude and direction. Embeddings are high-dimensional vectors (768-1536D).',
        example: 'Vectors enable similarity computation via dot product or cosine.',
      },
      advanced: {
        explanation: 'Elements of vector spaces with defined operations. Embedding spaces exhibit semantic structure from training.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['embeddings', 'dimensions', 'magnitude'],
    usedInLessons: ['lesson-03'],
  },
  {
    id: 'cosine-similarity',
    term: 'Cosine Similarity',
    slug: 'cosine-similarity',
    popup: {
      beginner: {
        explanation: 'A way to measure how similar two things are by comparing their direction. 1 = identical, 0 = unrelated, -1 = opposite.',
        example: '"happy" and "joyful" might score 0.9. "happy" and "sad" might score -0.3.',
      },
      intermediate: {
        explanation: 'Measures angle between vectors: cos(θ) = (A·B)/(|A||B|). Normalized dot product, range [-1,1].',
        example: 'cosine_similarity(v1, v2) = np.dot(v1, v2) / (norm(v1) * norm(v2))',
      },
      advanced: {
        explanation: 'Scale-invariant similarity metric. For L2-normalized vectors, equivalent to dot product. Standard in embedding retrieval.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['embeddings', 'dot-product', 'similarity'],
    usedInLessons: ['lesson-03', 'lesson-04'],
  },
  {
    id: 'semantic-search',
    term: 'Semantic Search',
    slug: 'semantic-search',
    popup: {
      beginner: {
        explanation: 'Search that understands meaning, not just keywords. Find "automobile" when searching for "car".',
        example: 'Search "how to fix a broken heart" → finds emotional advice, not cardiology.',
      },
      intermediate: {
        explanation: 'Query and documents embedded, then ranked by similarity. Outperforms keyword search for natural language.',
        example: 'query_emb = embed(query); results = vector_db.search(query_emb, k=10)',
      },
      advanced: {
        explanation: 'Dense retrieval via bi-encoders. Asymmetric training (query vs doc encoders) improves performance.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['embeddings', 'vector-database', 'retrieval'],
    usedInLessons: ['lesson-03', 'lesson-04'],
  },
  {
    id: 'vector-database',
    term: 'Vector Database',
    slug: 'vector-database',
    popup: {
      beginner: {
        explanation: 'A database that stores meaning-numbers and finds similar ones fast. Like a librarian who organizes by topic.',
        example: 'Pinecone, Weaviate, and ChromaDB are popular vector databases.',
      },
      intermediate: {
        explanation: 'Stores embeddings with metadata. Uses ANN algorithms (HNSW, IVF) for fast similarity search.',
        example: 'collection.query(query_embedding, n_results=5, where={"category": "tech"})',
      },
      advanced: {
        explanation: 'Implements ANN indices with configurable recall/latency tradeoffs. Supports filtered search and hybrid retrieval.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['embeddings', 'hnsw', 'ann'],
    usedInLessons: ['lesson-03', 'lesson-04'],
  },
  {
    id: 'chunking',
    term: 'Chunking',
    slug: 'chunking',
    popup: {
      beginner: {
        explanation: 'Cutting documents into smaller pieces so AI can find the right parts. Like dividing a book into chapters.',
        example: 'A 50-page document becomes 100 chunks of ~500 characters each.',
      },
      intermediate: {
        explanation: 'Document segmentation for embedding. Chunk size balances precision vs context. Overlap prevents boundary issues.',
        example: 'chunk_size=500, overlap=50 means 450 new chars per chunk.',
      },
      advanced: {
        explanation: 'Strategies: fixed-size, semantic, recursive, parent-child. Optimal size depends on embedding model and retrieval task.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['embeddings', 'retrieval', 'context-window'],
    usedInLessons: ['lesson-03', 'lesson-04'],
  },
  {
    id: 'dimensions',
    term: 'Dimensions',
    slug: 'dimensions',
    popup: {
      beginner: {
        explanation: 'How many numbers are in an embedding. More dimensions can capture more nuance, but cost more.',
        example: 'GPS has 2 dimensions (lat, long). Embeddings have 768-1536 dimensions!',
      },
      intermediate: {
        explanation: 'Embedding size affects capacity vs efficiency tradeoff. Modern models: 768-3072 dimensions.',
        example: 'text-embedding-3-small: 1536 dims. voyage-2: 1024 dims.',
      },
      advanced: {
        explanation: 'Intrinsic dimensionality often lower than embedding size. PCA/MRL can reduce dims with minimal quality loss.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['embeddings', 'vector', 'compression'],
    usedInLessons: ['lesson-03'],
  },
  {
    id: 'hnsw',
    term: 'HNSW',
    slug: 'hnsw',
    popup: {
      beginner: {
        explanation: 'A clever way to search through millions of items quickly - like having shortcuts in a maze.',
        example: 'Instead of checking all 1M items, HNSW checks ~100 and finds the right answer.',
      },
      intermediate: {
        explanation: 'Hierarchical Navigable Small World graphs. Multi-layer graph with long-range links for O(log n) search.',
        example: 'Parameters: M (connections), efConstruction (build quality), efSearch (query quality).',
      },
      advanced: {
        explanation: 'Probabilistic skip-list meets small-world graph. Greedy search with backtracking. ~95%+ recall achievable.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['vector-database', 'ann', 'indexing'],
    usedInLessons: ['lesson-03'],
  },
];

export const lesson03AdvancedTopics: AdvancedTopic[] = [
  {
    id: 'fine-tuning-embeddings',
    title: 'Fine-Tuning Embeddings',
    description: 'Adapt embedding models to your domain',
    difficulty: 'advanced',
    prerequisites: ['embeddings', 'cosine-similarity'],
    hasDeepDive: true,
  },
  {
    id: 'multimodal-embeddings',
    title: 'Multimodal Embeddings',
    description: 'Embed images and text in same space',
    difficulty: 'intermediate',
    prerequisites: ['embeddings'],
    hasDeepDive: true,
  },
  {
    id: 'quantization',
    title: 'Vector Quantization',
    description: 'Compress embeddings for efficiency',
    difficulty: 'advanced',
    prerequisites: ['embeddings', 'dimensions'],
    hasDeepDive: true,
  },
  {
    id: 'hybrid-search',
    title: 'Hybrid Search',
    description: 'Combine semantic and keyword search',
    difficulty: 'intermediate',
    prerequisites: ['semantic-search', 'vector-database'],
    hasDeepDive: true,
  },
];

export const lesson03Content: Record<UserLevel, string> = {
  beginner: `## The Problem: Computers Don't Understand Meaning

Here's a puzzle: How does a computer know that "happy" and "joyful" mean similar things, but "happy" and "helicopter" don't?

Computers only understand numbers. So we need a way to convert meaning into numbers - that's what [embeddings] do.

## [Embeddings]: GPS for Meaning

Imagine every idea has a location in space:
- "Happy" is at location [0.8, 0.2, 0.5]
- "Joyful" is nearby at [0.7, 0.3, 0.5]
- "Helicopter" is far away at [-0.3, 0.9, -0.1]

These number-lists are [vectors] - just fancy talk for "a list of numbers."

> **The City Analogy**
>
> In a city, similar businesses cluster together. Restaurants on one street, banks on another.
>
> [Embeddings] work the same way - similar ideas have similar numbers and cluster together in "meaning space."

## How Embeddings Are Created

\`\`\`mermaid
flowchart LR
    A[Your Text] --> B[Embedding Model]
    B --> C["[0.2, -0.5, 0.8, ...]<br/>768+ numbers"]
\`\`\`

1. You give text to an embedding model (like Voyage or OpenAI)
2. The model outputs a list of numbers (the embedding)
3. Each text gets its own unique numerical "fingerprint"

The model learned which numbers to assign by reading billions of texts.

## Why So Many Numbers?

Your GPS needs only 2 numbers: latitude and longitude. But meaning is more complex!

| Concept | [Dimensions] Needed |
|---------|---------------------|
| Location on Earth | 2 (lat, long) |
| Color | 3 (red, green, blue) |
| Meaning of text | 768 - 1536 |

More dimensions = more nuance captured.

## Measuring Similarity: [Cosine Similarity]

Once you have embeddings, you need to compare them. [Cosine similarity] measures how similar two embeddings are:

| Score | Meaning |
|-------|---------|
| 1.0 | Identical meaning |
| 0.8-0.9 | Very similar |
| 0.5-0.7 | Somewhat related |
| 0.0 | Unrelated |
| -1.0 | Opposite meaning |

**Example:**
- "I love pizza" vs "Pizza is my favorite food" → 0.92
- "I love pizza" vs "The weather is nice" → 0.15
- "I love pizza" vs "I hate pizza" → 0.45 (related but different!)

## [Semantic Search]: Finding by Meaning

Traditional search: Find documents containing exact words.
[Semantic search]: Find documents with similar meaning.

**Keyword Search:**
Search: "automobile problems"
❌ Misses: "car issues", "vehicle troubles"

**Semantic Search:**
Search: "automobile problems"
✓ Finds: "car issues", "vehicle troubles", "auto repairs"

How it works:

\`\`\`mermaid
flowchart TB
    A[Your Question] --> B[Create Embedding]
    C[All Documents] --> D[Create Embeddings]
    B --> E[Find Similar]
    D --> E
    E --> F[Top Results]
\`\`\`

## Storing Embeddings: [Vector Databases]

You can't use a regular database for embeddings - it would be too slow searching through millions of numbers.

[Vector databases] are specially designed to:
- Store millions of embeddings
- Find similar ones in milliseconds
- Filter by other properties (date, category, etc.)

Popular options:
- **Pinecone** - Managed, easy to use
- **Weaviate** - Open source, full-featured
- **ChromaDB** - Simple, great for starting out

## [Chunking]: Preparing Documents

Before embedding, you need to split documents into smaller pieces:

| Too Small | Just Right | Too Big |
|-----------|------------|---------|
| "The" | "The company was founded in 2020 by..." | Entire 50-page document |
| No context | Enough context | Too much noise |

Typical chunk size: 300-1000 characters.

**Why chunk?**
1. Embeddings work best on focused content
2. You can find the specific part that answers a question
3. Fits within AI's [context window] later

## Putting It All Together

Here's the complete flow:

\`\`\`mermaid
flowchart TB
    subgraph "Setup (Once)"
    A[Documents] --> B[Split into Chunks]
    B --> C[Create Embeddings]
    C --> D[(Vector Database)]
    end

    subgraph "Search (Every Query)"
    E[User Question] --> F[Create Embedding]
    F --> G[Find Similar Chunks]
    D --> G
    G --> H[Return Results]
    end
\`\`\`

## Real-World Example

**Building a Support Bot:**

1. **Chunk** all support documents (FAQs, guides, troubleshooting)
2. **Embed** each chunk and store in vector database
3. When user asks "Why won't my device turn on?"
4. **Embed** their question
5. **Find** similar chunks ("Power issues", "Troubleshooting startup")
6. **Return** relevant answers

The user finds help even if they don't use the exact right words!

## Key Takeaways

- [Embeddings] convert text meaning into numbers
- Similar meanings → similar numbers
- [Cosine similarity] measures how close embeddings are
- [Vector databases] store and search embeddings fast
- [Chunking] splits documents into searchable pieces
- [Semantic search] finds by meaning, not keywords

**Next up**: Use embeddings to teach AI your data with [RAG]!`,

  intermediate: `## Embeddings: Technical Implementation

This lesson covers embedding models, similarity metrics, vector databases, and chunking strategies for building semantic search systems. Understanding the mechanics behind each component will help you make informed decisions when building production retrieval systems.

The journey from raw text to semantic search involves several transformation stages, each with its own tradeoffs and tuning parameters. By the end of this lesson, you'll understand not just *how* to implement each piece, but *why* certain approaches work better for different use cases.

## Embedding Model Architecture

Modern [embedding] models are built on the [transformer] architecture, but they use a fundamentally different design than the language models you might be familiar with. While GPT-style models use *decoder-only* architectures that generate text token by token, embedding models use *encoder-only* architectures that process the entire input simultaneously and produce a single vector representation.

The encoder architecture enables bidirectional attention—each token can attend to tokens both before and after it. This bidirectional context is crucial for understanding meaning: the word "bank" has different meanings in "river bank" vs "bank account," and only by seeing the full context can the model distinguish them. Decoder models, constrained by their autoregressive nature, can only look backward.

After the transformer encoder processes all tokens, a [pooling layer] aggregates the per-token representations into a single fixed-size vector. The most common approaches are mean pooling (averaging all token vectors), CLS token pooling (using the special [CLS] token's representation), and weighted pooling (giving more weight to certain tokens). Mean pooling generally works best for retrieval tasks because it incorporates information from all tokens equally.

The output dimensions (768-1536 typically) represent different "semantic axes" learned during training. While we can't directly interpret what each dimension means, collectively they encode nuances like topic, sentiment, formality, domain, and countless other semantic properties. Higher dimensions can capture more nuance but require more storage and computation.

\`\`\`mermaid
flowchart TB
    A[Input Text] --> B[Tokenizer]
    B --> C[Token Embeddings]
    C --> D[+ Position Encodings]
    D --> E[Transformer Encoder x12]
    E --> F[Pooling Layer]
    F --> G["Output Vector [768-1536 dims]"]
\`\`\`

This architecture processes text in a single forward pass—there's no iterative generation like in chat models. This makes embedding computation fast and easily parallelizable, enabling you to embed thousands of documents efficiently.

### Generating Embeddings

When choosing an embedding provider, you'll notice that some models distinguish between "query" and "document" embeddings. This asymmetric design reflects a key insight: queries and documents have different characteristics. Queries are typically short, may be phrased as questions, and express *intent*. Documents are longer, contain *information*, and often use different vocabulary than how users search for them.

Models like Voyage AI train separate internal pathways for queries vs documents, optimizing each for its role. When you embed a query, the model emphasizes the *information need*. When you embed a document, it emphasizes the *information provided*. This asymmetry improves retrieval quality because it bridges the vocabulary gap between how people search and how documents are written.

If your embedding model doesn't support asymmetric embeddings, you can still achieve good results, but you may need to preprocess queries (e.g., "What is machine learning?" → "machine learning definition explanation") to better match document vocabulary.

\`\`\`python
import voyageai
from openai import OpenAI

# Voyage AI (recommended for retrieval)
voyage = voyageai.Client()

def embed_voyage(texts: list[str], input_type: str = "document") -> list:
    """Embed with Voyage AI."""
    result = voyage.embed(
        texts=texts,
        model="voyage-2",
        input_type=input_type  # "document" or "query"
    )
    return result.embeddings

# OpenAI
openai = OpenAI()

def embed_openai(texts: list[str]) -> list:
    """Embed with OpenAI."""
    response = openai.embeddings.create(
        model="text-embedding-3-small",
        input=texts
    )
    return [d.embedding for d in response.data]
\`\`\`

Notice the \`input_type\` parameter in the Voyage API—this activates the asymmetric embedding behavior. Always use "document" when embedding your corpus and "query" when embedding user searches. OpenAI's models don't currently support asymmetric embedding, which is one reason why specialized retrieval models often outperform general-purpose ones.

### Model Comparison

Choosing an embedding model involves tradeoffs between quality, speed, cost, and dimensionality. Higher dimensions can capture more semantic nuance but require more storage and slower similarity computation. For most applications, 1024-1536 dimensions provide an excellent balance.

| Model | [Dimensions] | Speed | Quality | Cost |
|-------|-------------|-------|---------|------|
| voyage-2 | 1024 | Fast | Excellent | Medium |
| text-embedding-3-small | 1536 | Fast | Good | Low |
| text-embedding-3-large | 3072 | Slower | Better | Higher |

Quality should be evaluated on your specific domain. A model that excels on general web text might underperform on legal documents or scientific papers. Always benchmark with representative examples from your actual use case.

## Similarity Metrics

Once you have embeddings, you need to compare them. But "similar" can mean different things mathematically, and choosing the right metric affects both accuracy and performance. Understanding the intuition behind each metric helps you make informed choices.

### [Cosine Similarity]

[Cosine similarity] measures the *angle* between two vectors, ignoring their magnitude. Imagine two arrows pointing from the origin: if they point in exactly the same direction, cosine similarity is 1.0, regardless of how long the arrows are. If they're perpendicular (completely unrelated), it's 0. If they point in opposite directions, it's -1.

This angle-based approach is valuable because embedding magnitudes can vary for reasons unrelated to meaning—longer texts often have larger magnitude embeddings, but that doesn't make them more "meaningful." By focusing on direction, cosine similarity captures semantic similarity independent of surface characteristics.

Intuitively, think of each dimension as a "semantic axis." Cosine similarity asks: "Do these two texts emphasize the same semantic properties?" A document about "dog training" and a query about "teaching pets tricks" will point in similar directions in the embedding space, even though they use different words, because they activate similar semantic dimensions.

\`\`\`python
import numpy as np

def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    """Cosine similarity between two vectors."""
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# For normalized vectors, dot product equals cosine similarity
def batch_similarity(query: np.ndarray, documents: np.ndarray) -> np.ndarray:
    """Compute similarity of query against all documents."""
    # Assumes L2-normalized vectors
    return documents @ query
\`\`\`

The batch version exploits a key optimization: if you pre-normalize all embeddings to unit length (L2 norm = 1), the dot product *equals* cosine similarity. This eliminates the expensive normalization step at query time and enables blazing-fast matrix multiplication for batch comparisons.

### Distance vs Similarity

Different vector databases and algorithms use different metrics. Understanding when they're equivalent helps you configure systems correctly:

| Metric | Range | Best Match |
|--------|-------|------------|
| Cosine Similarity | [-1, 1] | Highest (1) |
| Dot Product | (-∞, ∞) | Highest |
| Euclidean Distance | [0, ∞) | Lowest (0) |

**When to use each:**
- **Cosine similarity**: Default choice for retrieval. Robust to varying text lengths.
- **Dot product**: Use when magnitude matters (e.g., popularity-weighted embeddings) or when vectors are pre-normalized.
- **Euclidean distance**: Rarely used directly, but some algorithms (like HNSW) use it internally. For normalized vectors, it's mathematically equivalent to cosine.

For normalized embeddings, these are equivalent:
\`\`\`python
# If ||a|| = ||b|| = 1:
cosine_sim = dot_product = 1 - (euclidean_distance² / 2)
\`\`\`

This equivalence is why most production systems normalize embeddings at ingestion time—it enables using faster dot product operations while getting cosine similarity semantics.

## [Chunking] Strategies

Chunking is arguably the most underappreciated aspect of building effective retrieval systems. Poor chunking can doom even the best embedding model to mediocre results. The goal is to create chunks that are *self-contained* enough to be meaningful in isolation while *focused* enough that similarity scores accurately reflect relevance.

**Why chunk size matters so much:**

Embedding models compress an entire text into a single fixed-size vector. If your chunk is too large (say, an entire chapter), the embedding becomes a blurry average of many topics—searching for "neural network training" might not match a chapter that discusses training briefly among many other topics. If chunks are too small (a single sentence), they lack context—"It can also learn from examples" is meaningless without knowing what "it" refers to.

The sweet spot depends on your content and use case. For factual Q&A, smaller chunks (200-400 characters) work well because answers are typically contained in a few sentences. For conceptual search ("explain how transformers work"), larger chunks (500-1000 characters) provide the necessary context for coherent explanations.

**Overlap prevents information loss:** When you split text, important information often spans chunk boundaries. A key fact might be split between chunks, making it unfindable. Overlap ensures that if information is cut off in one chunk, it appears complete in an adjacent chunk. The tradeoff is increased storage and computation.

### Fixed-Size Chunking

Fixed-size chunking is the simplest approach: split text every N characters regardless of content. While this ignores document structure, it's predictable and works reasonably well for most content types.

\`\`\`python
def fixed_chunks(text: str, chunk_size: int = 500, overlap: int = 50) -> list[str]:
    """Split text into fixed-size chunks with overlap."""
    chunks = []
    start = 0

    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]
        chunks.append(chunk)
        start = end - overlap

    return chunks
\`\`\`

The overlap parameter controls how much context carries between chunks. A 10% overlap (50 characters for 500-character chunks) is usually sufficient. Higher overlap increases storage requirements linearly but provides better coverage of boundary information.

### Sentence-Based Chunking

Sentence-based chunking respects natural language boundaries, ensuring chunks don't end mid-thought. This produces more coherent chunks that make sense when read in isolation—important because that's exactly how the LLM will see them during retrieval-augmented generation.

The tradeoff is variable chunk sizes: some sentences are very short, others very long. The algorithm below groups sentences until hitting a size limit, creating chunks of roughly consistent size while preserving sentence integrity.

\`\`\`python
import nltk
nltk.download('punkt')

def sentence_chunks(text: str, max_chunk_size: int = 500) -> list[str]:
    """Chunk by sentences, respecting max size."""
    sentences = nltk.sent_tokenize(text)
    chunks = []
    current_chunk = []
    current_size = 0

    for sentence in sentences:
        if current_size + len(sentence) > max_chunk_size and current_chunk:
            chunks.append(' '.join(current_chunk))
            current_chunk = []
            current_size = 0

        current_chunk.append(sentence)
        current_size += len(sentence)

    if current_chunk:
        chunks.append(' '.join(current_chunk))

    return chunks
\`\`\`

This approach works particularly well for articles, documentation, and narrative content where sentences flow logically. For highly structured content (code, tables, forms), other approaches may work better.

### Chunking Comparison

Each strategy makes different tradeoffs. The best choice depends on your content type, query patterns, and how the retrieved chunks will be used:

| Strategy | Pros | Cons | Best For |
|----------|------|------|----------|
| Fixed-size | Simple, predictable | Breaks mid-sentence | General use |
| Sentence | Natural boundaries | Variable size | Articles |
| Paragraph | Respects structure | Large chunks | Documents |
| Recursive | Adapts to content | Complex | Mixed content |

**Pro tip:** For production systems, experiment with multiple chunking strategies on your actual content and measure retrieval quality. The "right" chunk size is empirical, not theoretical—test with sizes from 200 to 1000 characters and measure which produces the best recall on your evaluation queries.

## [Vector Database] Implementation

Traditional databases are optimized for exact matches: find all rows where user_id = 123. Vector databases solve a fundamentally different problem: find the K items whose vectors are *most similar* to a query vector. This "nearest neighbor search" in high-dimensional space requires specialized data structures that would be impractical in a standard SQL or NoSQL database.

**Why regular databases can't do this efficiently:** With 1 million 1024-dimensional embeddings, a brute-force search requires 1 million dot products per query—roughly 1 billion floating-point operations. At scale, this becomes infeasible. Vector databases use [approximate nearest neighbor] (ANN) algorithms that trade a small amount of accuracy for orders of magnitude speedup.

The core insight behind ANN algorithms is that we don't need *exact* nearest neighbors—finding vectors that are *approximately* closest is usually good enough for retrieval. If the true best match has similarity 0.95 and we return one with 0.93, the semantic difference is negligible. This relaxation enables algorithms like [HNSW] that find good neighbors in O(log n) time instead of O(n).

Modern vector databases also support metadata filtering, crucial for production use cases. You often want to search "find similar documents *within this category*" or "from *the past week*." Combining vector similarity with traditional filters enables powerful hybrid queries.

### ChromaDB Example

ChromaDB provides a simple, Pythonic interface for vector storage and retrieval. It's excellent for prototyping and smaller-scale production deployments. The example below shows the complete workflow: creating a collection, adding documents with metadata, and querying with filters.

\`\`\`python
import chromadb
from chromadb.utils import embedding_functions

# Initialize
client = chromadb.PersistentClient(path="./chroma_db")

# Create collection with embedding function
openai_ef = embedding_functions.OpenAIEmbeddingFunction(
    model_name="text-embedding-3-small"
)

collection = client.get_or_create_collection(
    name="documents",
    embedding_function=openai_ef,
    metadata={"hnsw:space": "cosine"}
)

# Add documents
collection.add(
    ids=["doc1", "doc2", "doc3"],
    documents=[
        "Machine learning is a subset of AI",
        "Neural networks are inspired by the brain",
        "Python is popular for data science"
    ],
    metadatas=[
        {"category": "ml", "source": "wiki"},
        {"category": "ml", "source": "textbook"},
        {"category": "programming", "source": "blog"}
    ]
)

# Query
results = collection.query(
    query_texts=["What is deep learning?"],
    n_results=2,
    where={"category": "ml"}  # Metadata filter
)
\`\`\`

The \`metadata={"hnsw:space": "cosine"}\` parameter tells ChromaDB to use cosine similarity for comparisons. The \`where\` clause in queries enables metadata filtering—here we restrict results to the "ml" category before ranking by similarity.

### [HNSW] Parameters

[HNSW] (Hierarchical Navigable Small World) is the most popular ANN algorithm, used by Pinecone, Weaviate, ChromaDB, and many others. Understanding its parameters helps you tune the quality-speed tradeoff for your use case.

**How HNSW works conceptually:** Imagine a multi-level graph where each level has fewer nodes but longer-range connections. To search, you start at the top level, greedily move toward the query, then descend to the next level and repeat. The hierarchical structure enables logarithmic search time while the "small world" property (short average path lengths) ensures you quickly reach the target neighborhood.

The key parameters control the graph's density and search thoroughness:
- **M**: How many neighbors each node connects to. Higher M = better recall, more memory.
- **efConstruction**: How many candidates to consider when building the graph. Higher = better graph quality, slower indexing.
- **efSearch**: How many candidates to consider when searching. Higher = better recall, slower queries.

\`\`\`python
# HNSW configuration for different use cases

# High recall, slower build
high_quality = {
    "M": 48,  # Connections per node
    "efConstruction": 200,  # Build-time beam width
    "efSearch": 100  # Query-time beam width
}

# Faster, lower recall
fast = {
    "M": 16,
    "efConstruction": 100,
    "efSearch": 40
}

# Tradeoff: higher M/ef = better recall, more memory/latency
\`\`\`

A reasonable starting point is M=16, efConstruction=100, efSearch=50. Increase these if you're not hitting your recall targets; decrease if you need lower latency or memory usage. You can adjust efSearch at query time without rebuilding the index, making it easy to tune.

## [Semantic Search] Pipeline

Now let's put all the pieces together into a complete semantic search system. A production pipeline handles document ingestion (chunking and embedding), index management, and query processing. The class below encapsulates this workflow, providing a clean interface for building search-powered applications.

The key architectural decision is preserving the connection between chunks and their source documents. When you retrieve a chunk, you often need to know where it came from—to cite sources, provide context, or fetch additional content. The metadata structure below enables this by storing the source document ID and chunk position with each embedded chunk.

\`\`\`python
class SemanticSearchPipeline:
    def __init__(self, collection):
        self.collection = collection

    def ingest(self, documents: list[dict]):
        """Ingest documents with chunking."""
        all_chunks = []
        all_ids = []
        all_metadata = []

        for doc in documents:
            chunks = sentence_chunks(doc["content"])

            for i, chunk in enumerate(chunks):
                all_chunks.append(chunk)
                all_ids.append(f"{doc['id']}_chunk_{i}")
                all_metadata.append({
                    "source_id": doc["id"],
                    "source_title": doc["title"],
                    "chunk_index": i
                })

        self.collection.add(
            ids=all_ids,
            documents=all_chunks,
            metadatas=all_metadata
        )

    def search(self, query: str, k: int = 5, filters: dict = None) -> list[dict]:
        """Search for similar chunks."""
        results = self.collection.query(
            query_texts=[query],
            n_results=k,
            where=filters
        )

        return [
            {
                "text": doc,
                "metadata": meta,
                "score": 1 - dist  # Convert distance to similarity
            }
            for doc, meta, dist in zip(
                results["documents"][0],
                results["metadatas"][0],
                results["distances"][0]
            )
        ]
\`\`\`

The score conversion (\`1 - dist\`) transforms distances into similarities—higher is better. This makes results more intuitive to work with since "highest score = best match" aligns with human expectations.

## Evaluation Metrics

You can't improve what you can't measure. Retrieval quality is quantifiable, and establishing baseline metrics before optimization helps you track progress and avoid regressions. The standard metrics—recall, precision, and MRR—capture different aspects of retrieval quality.

**Recall@k** answers: "Of all the relevant documents, how many did we find in the top k?" This is critical when missing relevant information is costly. If a user searches for medical symptoms, missing a relevant result could be dangerous. High recall is essential for [RAG] systems where the LLM can only reason about what it receives.

**Precision@k** answers: "Of the k documents we returned, how many were actually relevant?" This matters when the user will review all results or when passing irrelevant context to an LLM wastes tokens and potentially confuses it.

**MRR (Mean Reciprocal Rank)** rewards finding relevant results early. It's the average of 1/rank_of_first_relevant_result. If the first relevant result is always at position 1, MRR = 1. If it's usually at position 2, MRR ≈ 0.5. This metric matters when users typically only look at the first few results.

\`\`\`python
def evaluate_retrieval(
    queries: list[str],
    ground_truth: list[set[str]],
    retriever,
    k: int = 5
) -> dict:
    """Evaluate retrieval quality."""

    metrics = {
        "recall@k": [],
        "precision@k": [],
        "mrr": []
    }

    for query, relevant_ids in zip(queries, ground_truth):
        results = retriever.search(query, k=k)
        retrieved_ids = [r["metadata"]["source_id"] for r in results]

        # Recall@k
        hits = len(set(retrieved_ids) & relevant_ids)
        metrics["recall@k"].append(hits / len(relevant_ids))

        # Precision@k
        metrics["precision@k"].append(hits / k)

        # MRR
        for i, rid in enumerate(retrieved_ids):
            if rid in relevant_ids:
                metrics["mrr"].append(1 / (i + 1))
                break
        else:
            metrics["mrr"].append(0)

    return {k: np.mean(v) for k, v in metrics.items()}
\`\`\`

Building a good evaluation set is challenging but worthwhile. Start with 50-100 query-relevant document pairs based on your actual user queries. For each query, identify which documents should be retrieved. This ground truth set becomes invaluable for comparing chunking strategies, embedding models, and parameter configurations.

## Optimization Tips

Production embedding systems handle millions of vectors and thousands of queries per second. These optimization techniques address the common bottlenecks: API costs, latency, and memory usage.

### 1. Normalize Embeddings

Pre-normalizing embeddings at ingestion time enables significant query-time optimizations. With normalized vectors, cosine similarity equals dot product, which eliminates per-query normalization and enables optimized SIMD operations.

\`\`\`python
def normalize(embeddings: np.ndarray) -> np.ndarray:
    """L2 normalize for efficient similarity computation."""
    norms = np.linalg.norm(embeddings, axis=1, keepdims=True)
    return embeddings / norms
\`\`\`

Always normalize immediately after receiving embeddings from the API, before storing them. This one-time cost eliminates repeated normalization during queries.

### 2. Batch Embedding Requests

Embedding APIs are much more efficient when processing batches rather than individual texts. A single API call with 100 texts is dramatically faster and cheaper than 100 individual calls. Batching also helps manage rate limits and provides natural checkpointing for large ingestion jobs.

\`\`\`python
def embed_batched(texts: list[str], batch_size: int = 100) -> list:
    """Embed in batches to avoid rate limits."""
    embeddings = []

    for i in range(0, len(texts), batch_size):
        batch = texts[i:i + batch_size]
        batch_embeddings = embed(batch)
        embeddings.extend(batch_embeddings)

    return embeddings
\`\`\`

Different providers have different optimal batch sizes. OpenAI and Voyage can handle batches of 100-2000 texts depending on total token count. Adjust based on your text lengths and provider documentation.

### 3. Add Metadata for Filtering

Rich metadata transforms a simple similarity search into a powerful query engine. By attaching structured attributes to each chunk, you enable hybrid queries that combine semantic similarity with traditional filters.

\`\`\`python
# Good metadata design
metadata = {
    "source": "company_wiki",
    "category": "engineering",
    "date": "2024-01-15",
    "author": "jane_doe",
    "word_count": 450
}

# Enables filtered search
results = collection.query(
    query_texts=[query],
    where={
        "$and": [
            {"category": "engineering"},
            {"date": {"$gte": "2024-01-01"}}
        ]
    }
)
\`\`\`

Design metadata fields based on how users will want to filter results. Common useful fields: source document ID (for citations), creation date (for recency), author (for attribution), category/tags (for scoping), and content type (for distinguishing FAQs from documentation from code).

**Next**: Learn to use embeddings for AI knowledge retrieval with [RAG]!`,

  advanced: `## Embeddings: Architecture and Optimization

This lesson covers embedding model internals, advanced retrieval techniques, and production optimization strategies. Understanding these foundations enables you to fine-tune models for specific domains, implement state-of-the-art retrieval architectures, and optimize systems for production scale.

The journey from raw transformer outputs to effective retrieval embeddings involves careful training objectives, specialized architectures, and numerous engineering optimizations. By understanding these mechanisms, you can make informed decisions about when to use off-the-shelf models versus custom solutions, and how to tune systems for your specific requirements.

## Embedding Model Training

Embedding models learn to map semantically similar texts to nearby points in vector space through [contrastive learning]. The core idea is simple: pull positive pairs (semantically related texts) closer together while pushing negative pairs (unrelated texts) apart. The resulting embedding space organizes texts by meaning, enabling similarity-based retrieval.

The quality of this learned space depends critically on the training data and loss function. Modern embedding models are trained on billions of text pairs, carefully curated to cover diverse domains and query patterns. The loss function shapes *how* the model learns to distinguish similar from dissimilar—temperature parameters, margin values, and negative sampling strategies all significantly impact final performance.

### Contrastive Learning Objective

The [InfoNCE] loss (also known as NT-Xent) treats embedding training as a classification problem: given a query, identify its positive match from a set containing one positive and many negatives. This framing enables efficient batch-wise training where each query's negatives can come from other queries' positives in the same batch.

The temperature parameter (τ) controls the "sharpness" of the similarity distribution. Lower temperature makes the model more confident, creating tighter clusters. Higher temperature allows more gradual similarity gradients. Values around 0.05-0.1 work well for most retrieval tasks, but this is worth tuning for your specific use case.

\`\`\`python
import torch
import torch.nn.functional as F

def contrastive_loss(
    query_embeds: torch.Tensor,
    positive_embeds: torch.Tensor,
    negative_embeds: torch.Tensor,
    temperature: float = 0.05
) -> torch.Tensor:
    """
    InfoNCE / NT-Xent loss for embedding training.

    query_embeds: [batch_size, dim]
    positive_embeds: [batch_size, dim]
    negative_embeds: [batch_size, n_negatives, dim]
    """
    # Similarity with positives
    pos_sim = F.cosine_similarity(query_embeds, positive_embeds)

    # Similarity with negatives
    neg_sim = F.cosine_similarity(
        query_embeds.unsqueeze(1),
        negative_embeds,
        dim=-1
    )

    # Combine and apply temperature
    logits = torch.cat([pos_sim.unsqueeze(1), neg_sim], dim=1) / temperature

    # Cross-entropy with positive as target (index 0)
    labels = torch.zeros(logits.size(0), dtype=torch.long, device=logits.device)
    loss = F.cross_entropy(logits, labels)

    return loss
\`\`\`

The mathematical intuition: we're maximizing the probability of selecting the positive from the candidate set, where probabilities are proportional to exp(similarity/temperature). This encourages the model to make the positive similarity high and negative similarities low.

### Hard Negative Mining

Not all negatives are equally informative. Easy negatives (clearly unrelated texts) provide little learning signal—the model already knows they're different. Hard negatives (similar but not semantically equivalent texts) force the model to learn fine-grained distinctions.

For example, if training a legal search system, a hard negative for a query about "contract termination" might be a document about "contract renewal"—topically similar but semantically distinct. Easy negatives like "chocolate recipes" provide no useful signal.

[Hard negative mining] improves training efficiency by finding these informative negatives. The strategy: use the current model to retrieve top-k candidates for each query, then use the similar-but-not-positive results as negatives. This creates a curriculum that adapts as the model improves.

\`\`\`python
class HardNegativeMiner:
    """Mine hard negatives for contrastive training."""

    def __init__(self, index, encoder, k: int = 100, hard_k: int = 10):
        self.index = index
        self.encoder = encoder
        self.k = k
        self.hard_k = hard_k

    def mine(self, queries: list[str], positives: list[str]) -> list[list[str]]:
        """Find hard negatives (similar but not positive)."""
        query_embeds = self.encoder.encode(queries)
        positive_set = set(positives)

        hard_negatives = []

        for i, query_embed in enumerate(query_embeds):
            # Retrieve top-k candidates
            results = self.index.search(query_embed, self.k)

            # Filter out positives, keep hardest
            negatives = [
                r["text"] for r in results
                if r["text"] not in positive_set
            ][:self.hard_k]

            hard_negatives.append(negatives)

        return hard_negatives
\`\`\`

In practice, you'd run hard negative mining periodically during training, re-indexing embeddings as the model improves. This creates increasingly challenging negatives that continue to provide learning signal throughout training.

## [Matryoshka] Embeddings

Traditional embeddings have a fixed dimensionality—1536 dimensions, for example. But what if you could use the same embedding at different precision levels? [Matryoshka Representation Learning] (MRL), named after Russian nesting dolls, trains embeddings where the first k dimensions form a valid k-dimensional embedding for any k.

This is a breakthrough for practical systems because it enables *adaptive precision*. For initial filtering across millions of documents, you might use 64 dimensions for speed. For final ranking of top-100 candidates, you use all 1536 dimensions for accuracy. Same embedding, different precision levels, no separate models needed.

The training trick is elegant: during training, compute the contrastive loss at multiple dimension levels (64, 128, 256, ..., 1536) and sum them. This forces the model to pack the most important information into the first dimensions, with additional dimensions capturing progressively finer details. The result is a natural hierarchy where truncation gracefully degrades rather than catastrophically failing.

OpenAI's text-embedding-3 models support this natively—you can request any dimension up to the maximum and get valid embeddings. For other models, you can apply MRL during fine-tuning to gain this capability.

\`\`\`python
class MatryoshkaEmbedding:
    """
    Embeddings that work at multiple dimensions.
    Kusupati et al., 2022.
    """

    def __init__(self, full_dim: int = 1536, dim_levels: list[int] = None):
        self.full_dim = full_dim
        self.dim_levels = dim_levels or [64, 128, 256, 512, 1024, 1536]

    def truncate(self, embeddings: np.ndarray, target_dim: int) -> np.ndarray:
        """Truncate to target dimension."""
        assert target_dim <= self.full_dim
        truncated = embeddings[:, :target_dim]
        # Re-normalize after truncation
        return truncated / np.linalg.norm(truncated, axis=1, keepdims=True)

    def adaptive_search(
        self,
        query: np.ndarray,
        index: dict,  # {dim: index}
        initial_dim: int = 128,
        final_dim: int = 1536,
        initial_k: int = 100,
        final_k: int = 10
    ) -> list:
        """Two-stage search: fast initial, precise final."""

        # Stage 1: Fast search with low-dim
        query_low = self.truncate(query.reshape(1, -1), initial_dim)[0]
        candidates = index[initial_dim].search(query_low, initial_k)

        # Stage 2: Re-rank with full-dim
        candidate_ids = [c["id"] for c in candidates]
        candidate_embeds = index[final_dim].get_by_ids(candidate_ids)

        query_full = self.truncate(query.reshape(1, -1), final_dim)[0]
        scores = candidate_embeds @ query_full

        top_indices = np.argsort(scores)[-final_k:][::-1]

        return [candidates[i] for i in top_indices]
\`\`\`

The two-stage search pattern shown here is powerful: use low dimensions for fast approximate filtering, then high dimensions for precise re-ranking. This can reduce latency by 5-10x while maintaining accuracy, making it essential for large-scale production systems.

## Advanced Retrieval Patterns

Beyond basic dense retrieval, several architectural patterns can significantly improve quality for specific use cases. [Hybrid search] combines the strengths of semantic and lexical matching. [Late interaction] models like ColBERT provide higher precision through token-level matching. Understanding these patterns helps you choose the right architecture for your requirements.

### Hybrid Search

Dense retrieval (embeddings) excels at semantic matching—finding documents that mean the same thing even with different words. But it can struggle with exact matches, rare terms, and named entities. [Sparse retrieval] (BM25, TF-IDF) excels at these exact matching cases but misses semantic similarity.

Hybrid search combines both: use dense retrieval for semantic understanding and sparse retrieval for keyword matching, then fuse the scores. This often outperforms either method alone, especially for queries that mix conceptual questions with specific terms ("What is the Python syntax for list comprehension?").

The alpha parameter controls the balance between dense and sparse scores. Values around 0.5-0.7 (favoring dense) work well for most cases, but tune this on your evaluation set. Some queries benefit more from semantic matching, others from exact matching—hybrid search hedges both bets.

\`\`\`python
from rank_bm25 import BM25Okapi
import numpy as np

class HybridRetriever:
    """Combine dense and sparse retrieval."""

    def __init__(self, documents: list[str], embeddings: np.ndarray, alpha: float = 0.5):
        self.documents = documents
        self.embeddings = embeddings / np.linalg.norm(embeddings, axis=1, keepdims=True)

        # Sparse index
        tokenized = [doc.lower().split() for doc in documents]
        self.bm25 = BM25Okapi(tokenized)

        self.alpha = alpha

    def search(self, query: str, query_embedding: np.ndarray, k: int = 10) -> list[dict]:
        """Hybrid search with score fusion."""

        # Dense scores
        query_norm = query_embedding / np.linalg.norm(query_embedding)
        dense_scores = self.embeddings @ query_norm

        # Sparse scores
        sparse_scores = self.bm25.get_scores(query.lower().split())

        # Normalize scores to [0, 1]
        dense_norm = (dense_scores - dense_scores.min()) / (dense_scores.max() - dense_scores.min() + 1e-8)
        sparse_norm = (sparse_scores - sparse_scores.min()) / (sparse_scores.max() - sparse_scores.min() + 1e-8)

        # Combine
        combined = self.alpha * dense_norm + (1 - self.alpha) * sparse_norm

        # Get top-k
        top_indices = np.argsort(combined)[-k:][::-1]

        return [
            {
                "text": self.documents[i],
                "score": combined[i],
                "dense_score": dense_scores[i],
                "sparse_score": sparse_scores[i]
            }
            for i in top_indices
        ]
\`\`\`

The implementation returns both component scores alongside the combined score, enabling analysis of how each method contributes to different query types. This transparency helps tune alpha and identify queries that might need specialized handling.

### ColBERT: Late Interaction

Standard dense retrieval compresses entire documents into single vectors, losing fine-grained information. [ColBERT] (Contextualized Late Interaction over BERT) takes a different approach: it preserves per-token embeddings and computes similarity through late interaction.

The insight is that semantic matching often happens at the token level—"machine learning" in a query should match those specific tokens in documents, not just contribute to an overall semantic blob. Late interaction enables this precise matching while still benefiting from contextual representations.

The tradeoff is storage: ColBERT requires storing ~100 embeddings per document instead of one. But the precision gains can be substantial, especially for technical domains where specific terminology matters.

\`\`\`python
class ColBERTRetriever:
    """
    Late interaction retrieval.
    Token-level matching for better precision.
    """

    def __init__(self, encoder):
        self.encoder = encoder

    def encode_document(self, doc: str) -> np.ndarray:
        """Encode doc to per-token embeddings."""
        # Returns [n_tokens, dim]
        return self.encoder.encode_multi_vector(doc)

    def encode_query(self, query: str) -> np.ndarray:
        """Encode query to per-token embeddings."""
        return self.encoder.encode_multi_vector(query)

    def score(self, query_embeds: np.ndarray, doc_embeds: np.ndarray) -> float:
        """
        MaxSim scoring: for each query token, find max similarity
        with any doc token, then sum.
        """
        # [n_query_tokens, n_doc_tokens]
        similarities = query_embeds @ doc_embeds.T

        # Max over doc tokens for each query token
        max_sims = similarities.max(axis=1)

        # Sum of max similarities
        return max_sims.sum()
\`\`\`

The MaxSim operation is key: each query token finds its best match in the document, regardless of position. This handles paraphrasing and word order variations while maintaining semantic precision. Sum aggregation ensures that documents matching more query tokens score higher.

## Vector Index Optimization

At scale, raw embedding storage and brute-force search become prohibitively expensive. A million 1536-dimensional vectors requires ~6GB of memory. Billion-scale search requires sophisticated optimization. This section covers the two most important techniques: [product quantization] for compression and [HNSW] for efficient search.

### Product Quantization

[Product quantization] (PQ) is a compression technique that can reduce embedding storage by 32-64x with minimal quality loss. The insight: instead of storing full floating-point vectors, divide each vector into subvectors and represent each subvector by its nearest centroid from a learned codebook.

For example, a 1024-dimensional vector can be split into 8 subvectors of 128 dimensions each. If you learn 256 centroids per subspace, each subvector can be encoded as a single byte (index into 256 centroids). The full vector becomes 8 bytes instead of 4096 bytes (1024 floats × 4 bytes)—a 512x compression.

The magic is that distance computation can be accelerated using lookup tables. For a query, you precompute distances to all centroids once, then look up and sum for each compressed vector. This asymmetric distance computation (exact query, compressed database) maintains good accuracy while enabling massive scale.

\`\`\`python
class ProductQuantizer:
    """Compress vectors using product quantization."""

    def __init__(self, n_subvectors: int = 8, n_centroids: int = 256):
        self.n_subvectors = n_subvectors
        self.n_centroids = n_centroids
        self.centroids = None  # [n_subvectors, n_centroids, subvector_dim]

    def fit(self, vectors: np.ndarray):
        """Learn centroids from training vectors."""
        n, dim = vectors.shape
        subvector_dim = dim // self.n_subvectors

        self.centroids = np.zeros((self.n_subvectors, self.n_centroids, subvector_dim))

        for i in range(self.n_subvectors):
            subvectors = vectors[:, i*subvector_dim:(i+1)*subvector_dim]
            # K-means clustering
            kmeans = KMeans(n_clusters=self.n_centroids)
            kmeans.fit(subvectors)
            self.centroids[i] = kmeans.cluster_centers_

    def encode(self, vectors: np.ndarray) -> np.ndarray:
        """Encode vectors to centroid indices."""
        n, dim = vectors.shape
        subvector_dim = dim // self.n_subvectors
        codes = np.zeros((n, self.n_subvectors), dtype=np.uint8)

        for i in range(self.n_subvectors):
            subvectors = vectors[:, i*subvector_dim:(i+1)*subvector_dim]
            # Find nearest centroid
            distances = np.linalg.norm(
                subvectors[:, None] - self.centroids[i],
                axis=2
            )
            codes[:, i] = distances.argmin(axis=1)

        return codes

    def asymmetric_distance(self, query: np.ndarray, codes: np.ndarray) -> np.ndarray:
        """Compute distances using precomputed lookup tables."""
        subvector_dim = query.shape[0] // self.n_subvectors

        # Precompute query-centroid distances
        distance_tables = np.zeros((self.n_subvectors, self.n_centroids))

        for i in range(self.n_subvectors):
            query_sub = query[i*subvector_dim:(i+1)*subvector_dim]
            distance_tables[i] = np.linalg.norm(
                query_sub - self.centroids[i],
                axis=1
            )

        # Lookup and sum
        distances = np.zeros(len(codes))
        for i in range(self.n_subvectors):
            distances += distance_tables[i, codes[:, i]]

        return distances
\`\`\`

The asymmetric distance function demonstrates the efficiency: instead of comparing 1024-dimensional vectors, you perform 8 table lookups per vector. For millions of vectors, this translates to orders of magnitude speedup.

### [HNSW] Implementation Details

[HNSW] (Hierarchical Navigable Small World) is the most widely-used ANN algorithm, combining ideas from skip lists and small-world networks. Understanding its structure helps you tune it effectively and reason about its behavior.

The algorithm builds a multi-layer graph. Each layer is a proximity graph where nodes connect to their approximate nearest neighbors. Upper layers have fewer nodes but longer-range connections, enabling fast coarse navigation. Lower layers have more nodes with short-range connections for precise local search. New nodes are randomly assigned to layers, with probability decreasing exponentially for higher layers.

Search starts at the top layer's entry point and greedily moves toward the query. When no closer neighbor exists at the current layer, search descends to the next layer and continues. This hierarchical navigation achieves O(log n) search complexity while maintaining high recall.

\`\`\`python
class HNSWIndex:
    """Hierarchical Navigable Small World graph."""

    def __init__(self, dim: int, M: int = 16, ef_construction: int = 200):
        self.dim = dim
        self.M = M  # Max connections per node
        self.M_max0 = M * 2  # Max connections at layer 0
        self.ef_construction = ef_construction
        self.ml = 1 / np.log(M)  # Level multiplier

        self.layers: list[dict] = []  # [{node_id: [neighbor_ids]}]
        self.vectors: dict = {}  # {node_id: vector}
        self.entry_point = None
        self.max_level = -1

    def _random_level(self) -> int:
        """Generate random level for new node."""
        return int(-np.log(np.random.random()) * self.ml)

    def insert(self, node_id: str, vector: np.ndarray):
        """Insert node into graph."""
        level = self._random_level()
        self.vectors[node_id] = vector

        if self.entry_point is None:
            self.entry_point = node_id
            self.max_level = level
            for _ in range(level + 1):
                self.layers.append({node_id: []})
            return

        # Search for entry point at each level
        current = self.entry_point

        for l in range(self.max_level, level, -1):
            current = self._greedy_search(vector, current, l)

        for l in range(min(level, self.max_level), -1, -1):
            neighbors = self._search_layer(vector, current, self.ef_construction, l)

            # Select M best neighbors
            M = self.M if l > 0 else self.M_max0
            selected = self._select_neighbors(vector, neighbors, M)

            # Add bidirectional connections
            if l >= len(self.layers):
                self.layers.append({})

            self.layers[l][node_id] = selected

            for neighbor in selected:
                if neighbor not in self.layers[l]:
                    self.layers[l][neighbor] = []
                self.layers[l][neighbor].append(node_id)

                # Prune if too many connections
                if len(self.layers[l][neighbor]) > M:
                    self.layers[l][neighbor] = self._select_neighbors(
                        self.vectors[neighbor],
                        self.layers[l][neighbor],
                        M
                    )

    def search(self, query: np.ndarray, k: int, ef: int = 50) -> list[tuple]:
        """Search for k nearest neighbors."""
        current = self.entry_point

        for l in range(self.max_level, 0, -1):
            current = self._greedy_search(query, current, l)

        candidates = self._search_layer(query, current, ef, 0)

        # Return top-k
        scored = [
            (nid, np.dot(query, self.vectors[nid]))
            for nid in candidates
        ]
        scored.sort(key=lambda x: -x[1])

        return scored[:k]
\`\`\`

The key insight is that HNSW converts the nearest neighbor problem into a graph traversal problem. By maintaining "small world" properties (most nodes reachable in few hops), it achieves sublinear search time. The parameter M controls the graph density—higher M means more edges, better recall, but more memory and computation.

## Production Considerations

Moving from prototype to production introduces challenges around cost, latency, reliability, and observability. Embedding APIs are external dependencies that can fail, rate-limit, or add latency. Caching, batching, and graceful degradation strategies are essential for robust production systems.

### Embedding Cache

Embedding the same text twice wastes API calls and adds latency. A caching layer eliminates redundant computation by storing previously computed embeddings. This is especially valuable for document embeddings (computed once, queried many times) and common queries.

Redis provides an ideal cache backend: fast, persistent, and supports TTL for automatic expiration. The content-addressable key (hash of text) ensures identical texts always map to the same cache entry, enabling cache sharing across processes and servers.

\`\`\`python
import hashlib
from functools import lru_cache
import redis

class EmbeddingCache:
    """Cache embeddings in Redis for efficiency."""

    def __init__(self, redis_client, encoder, ttl: int = 86400):
        self.redis = redis_client
        self.encoder = encoder
        self.ttl = ttl

    def _cache_key(self, text: str) -> str:
        """Generate cache key from text hash."""
        hash_val = hashlib.sha256(text.encode()).hexdigest()[:16]
        return f"emb:{hash_val}"

    def get_or_compute(self, texts: list[str]) -> np.ndarray:
        """Get from cache or compute embeddings."""
        embeddings = []
        to_compute = []
        to_compute_indices = []

        # Check cache
        for i, text in enumerate(texts):
            key = self._cache_key(text)
            cached = self.redis.get(key)

            if cached:
                embeddings.append(np.frombuffer(cached, dtype=np.float32))
            else:
                embeddings.append(None)
                to_compute.append(text)
                to_compute_indices.append(i)

        # Compute missing
        if to_compute:
            computed = self.encoder.encode(to_compute)

            for idx, emb in zip(to_compute_indices, computed):
                embeddings[idx] = emb
                key = self._cache_key(texts[idx])
                self.redis.setex(key, self.ttl, emb.tobytes())

        return np.array(embeddings)
\`\`\`

The batch-aware implementation only computes embeddings for cache misses, then fills in the results array. This maintains the expected output order while minimizing API calls. The TTL (time-to-live) handles cache invalidation—set it based on how often your embedding model might change.

For query embeddings, consider a shorter TTL or in-memory caching since queries are more transient. For document embeddings, a longer TTL (days or weeks) is appropriate since documents change less frequently.

**Next**: Apply embeddings to build knowledge-augmented AI with [RAG]!`,
};

// Quiz questions
export const lesson03Quiz = {
  id: 'quiz-03-embeddings',
  title: 'Embeddings Knowledge Check',
  passingScore: 70,
  questions: [
    {
      id: 'embed-q1',
      question: 'What are embeddings in the context of AI?',
      type: 'multiple-choice' as const,
      options: [
        'Images embedded in documents',
        'Numerical vectors that represent the meaning of text',
        'Code inserted into web pages',
        'Hyperlinks between documents'
      ],
      correctAnswer: 1,
      explanation: 'Embeddings are vectors (lists of numbers) that capture the semantic meaning of text, allowing AI to understand similarity.',
      difficulty: 'beginner' as const,
    },
    {
      id: 'embed-q2',
      question: 'Why are similar concepts close together in embedding space?',
      type: 'multiple-choice' as const,
      options: [
        'They are manually placed there by engineers',
        'The model learns during training that similar words appear in similar contexts',
        'It\'s random chance',
        'They share the same letters'
      ],
      correctAnswer: 1,
      explanation: 'During training, the model learns that similar concepts appear in similar contexts, so they end up with similar vector representations.',
      difficulty: 'intermediate' as const,
    },
    {
      id: 'embed-q3',
      question: 'What is cosine similarity used for with embeddings?',
      type: 'multiple-choice' as const,
      options: [
        'Measuring the angle between vectors to determine semantic similarity',
        'Calculating the size of documents',
        'Compressing embeddings to save storage',
        'Converting text to embeddings'
      ],
      correctAnswer: 0,
      explanation: 'Cosine similarity measures the angle between two vectors - smaller angles (closer to 1.0) indicate more similar meanings.',
      difficulty: 'intermediate' as const,
    },
    {
      id: 'embed-q4',
      question: 'What is the purpose of chunking when building a vector search system?',
      type: 'multiple-choice' as const,
      options: [
        'To encrypt sensitive data',
        'To split documents into searchable pieces that can be embedded separately',
        'To combine multiple documents into one',
        'To translate documents to different languages'
      ],
      correctAnswer: 1,
      explanation: 'Chunking splits large documents into smaller pieces, each embedded separately for more precise retrieval of relevant content.',
      difficulty: 'beginner' as const,
    },
    {
      id: 'embed-q5',
      question: 'What does HNSW stand for and what is it used for?',
      type: 'multiple-choice' as const,
      options: [
        'High Network Speed Wireless - for faster API calls',
        'Hierarchical Navigable Small World - for fast approximate nearest neighbor search',
        'Hash Normalized Search Width - for compression',
        'Horizontal Node Scaling Web - for distributed computing'
      ],
      correctAnswer: 1,
      explanation: 'HNSW (Hierarchical Navigable Small World) is an algorithm for fast approximate nearest neighbor search in high-dimensional spaces.',
      difficulty: 'advanced' as const,
    },
  ],
};

// Combined export
export const lesson03 = {
  id: 'lesson-03',
  title: 'Embeddings & Vector Search',
  subtitle: 'Finding Meaning in Numbers',
  description: 'Discover how AI understands meaning by converting text to numbers.',
  estimatedMinutes: 35,
  terms: lesson03Terms,
  advancedTopics: lesson03AdvancedTopics,
  content: lesson03Content,
  quiz: lesson03Quiz,
};

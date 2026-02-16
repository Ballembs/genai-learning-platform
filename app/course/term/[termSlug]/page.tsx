// app/course/term/[termSlug]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Lightbulb,
  Code,
  AlertTriangle,
  Link2,
  Sparkles,
  CheckCircle,
  Circle,
  ArrowRight,
  Brain,
  Clock,
  Trophy,
} from 'lucide-react';
import { useUserStore, useNavigationStore } from '@/lib/store';
import { ClickableTerm } from '@/components/lesson/ClickableTerm';
import { MermaidDiagram } from '@/components/diagrams/MermaidDiagram';
import type { UserLevel } from '@/types';

// Deep dive content type
interface DeepDiveContent {
  term: string;
  slug: string;
  fromLessonId: string;
  fromLessonTitle: string;
  oneLiner: Record<UserLevel, string>;
  analogy: Record<UserLevel, { title: string; content: string }>;
  howItWorks: Record<UserLevel, { content: string; diagram?: string }>;
  codeExample?: Record<UserLevel, { language: string; code: string; explanation: string }>;
  misconceptions: { myth: string; reality: string }[];
  relatedTerms: { id: string; name: string; description: string }[];
  advancedTopics: { id: string; name: string; description: string; difficulty: 'intermediate' | 'advanced' }[];
  quiz: { question: string; options: string[]; correctIndex: number; explanation: string }[];
}

// Mock deep dive content - in production, this would come from API/database
const deepDiveContent: Record<string, DeepDiveContent> = {
  'embeddings': {
    term: 'Embeddings',
    slug: 'embeddings',
    fromLessonId: 'lesson-03',
    fromLessonTitle: 'Embeddings & Vector Search',
    oneLiner: {
      beginner: 'Numbers that capture the meaning of text, like GPS coordinates for ideas.',
      intermediate: 'Dense vector representations of text that encode semantic meaning in continuous space.',
      advanced: 'Learned projections from discrete token sequences to continuous vector manifolds via transformer architectures.',
    },
    analogy: {
      beginner: {
        title: 'The Library Map',
        content: 'Imagine a library where books aren\'t organized alphabetically, but by what they\'re about. Cookbooks are near nutrition guides. Mystery novels are near crime documentaries. [Embeddings] work the same way - they place similar ideas close together in a mathematical space.',
      },
      intermediate: {
        title: 'Semantic Coordinates',
        content: 'Think of embeddings as coordinates in a meaning-space. Just like GPS coordinates (latitude, longitude) tell you where something is physically, embedding coordinates tell you where something is semantically. "Happy" and "joyful" have nearby coordinates; "happy" and "refrigerator" are far apart.',
      },
      advanced: {
        title: 'Manifold Projection',
        content: 'Embeddings project the discrete, high-dimensional space of all possible token sequences onto a smooth, continuous manifold. This learned projection preserves semantic relationships as geometric relationships - analogies become vector arithmetic (king - man + woman ≈ queen).',
      },
    },
    howItWorks: {
      beginner: {
        content: 'When you give text to an embedding model, it reads every word and outputs a list of numbers (usually 768-1536 of them). These numbers together form a unique "fingerprint" for that text\'s meaning.\n\nThe magic: similar meanings get similar numbers! So when you search for something, the system finds texts with matching fingerprints.',
        diagram: `flowchart LR
    A["Your Text"] --> B[Embedding Model]
    B --> C["[0.2, -0.5, 0.8, ...]<br/>768+ numbers"]
    D["Similar Text"] --> B
    B --> E["[0.3, -0.4, 0.7, ...]<br/>Similar numbers!"]
    C -.->|"Close in space"| E`,
      },
      intermediate: {
        content: 'Embedding models use [transformer] architectures trained on massive text corpora. The model processes text through multiple attention layers, then applies mean pooling (or uses the [CLS] token) to produce a fixed-size vector.\n\nThe training objective ensures semantically similar inputs map to nearby points in the embedding space, typically measured by [cosine similarity].',
        diagram: `flowchart TB
    A[Input Text] --> B[Tokenizer]
    B --> C[Token IDs]
    C --> D[Embedding Layer]
    D --> E[Transformer Blocks]
    E --> F[Mean Pooling]
    F --> G["Dense Vector<br/>[768-1536 dims]"]

    subgraph Training
    H[Contrastive Loss]
    I[Similar pairs → close]
    J[Different pairs → far]
    end`,
      },
      advanced: {
        content: 'Modern embedding models like Voyage AI, OpenAI\'s text-embedding-3, and Cohere\'s embed-v3 use transformer encoders with task-specific fine-tuning. Training employs contrastive objectives (InfoNCE, SimCLR) on curated datasets of semantic similarity pairs.\n\n[Matryoshka embeddings] enable variable dimensionality by training the model to preserve information in prefixes of the full vector. [HNSW] indices enable sub-linear approximate nearest neighbor retrieval.',
        diagram: `flowchart TB
    subgraph Encoder
    A[Input] --> B[BPE Tokenization]
    B --> C[Positional Encoding]
    C --> D[Multi-Head Self-Attention x12]
    D --> E[Layer Normalization]
    E --> F[Pooling Strategy]
    end

    F --> G[L2 Normalization]
    G --> H["Unit Vector ∈ S^{d-1}"]

    subgraph Retrieval
    I[Query Vector] --> J[HNSW Index]
    J --> K[ANN Search]
    K --> L[Top-K Results]
    end`,
      },
    },
    codeExample: {
      beginner: {
        language: 'python',
        code: `# Simple embedding example with OpenAI
from openai import OpenAI
client = OpenAI()

# Get embedding for a sentence
response = client.embeddings.create(
    model="text-embedding-3-small",
    input="I love learning about AI!"
)

# This is your embedding - a list of numbers
embedding = response.data[0].embedding
print(f"Got {len(embedding)} numbers!")  # 1536 numbers`,
        explanation: 'This creates an embedding for one sentence. The result is a list of 1536 numbers that represent the meaning.',
      },
      intermediate: {
        language: 'python',
        code: `import numpy as np
from openai import OpenAI
client = OpenAI()

def get_embeddings(texts: list[str]) -> np.ndarray:
    """Get embeddings for multiple texts."""
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=texts
    )
    return np.array([d.embedding for d in response.data])

def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    """Calculate cosine similarity between two vectors."""
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# Example: Find similar sentences
sentences = [
    "The cat sat on the mat",
    "A feline rested on the rug",
    "The stock market crashed today"
]

embeddings = get_embeddings(sentences)
sim_01 = cosine_similarity(embeddings[0], embeddings[1])  # ~0.85
sim_02 = cosine_similarity(embeddings[0], embeddings[2])  # ~0.15`,
        explanation: 'This shows how to embed multiple texts and compare their similarity. Similar sentences get high scores (close to 1), different topics get low scores.',
      },
      advanced: {
        language: 'python',
        code: `import voyageai
import numpy as np
from typing import List
from dataclasses import dataclass

@dataclass
class EmbeddingConfig:
    model: str = "voyage-large-2"
    input_type: str = "document"  # or "query" for asymmetric
    truncation: bool = True

class SemanticEncoder:
    def __init__(self, config: EmbeddingConfig):
        self.client = voyageai.Client()
        self.config = config

    def encode(self, texts: List[str], batch_size: int = 128) -> np.ndarray:
        """Encode texts with batching and proper input typing."""
        all_embeddings = []

        for i in range(0, len(texts), batch_size):
            batch = texts[i:i + batch_size]
            result = self.client.embed(
                batch,
                model=self.config.model,
                input_type=self.config.input_type,
                truncation=self.config.truncation
            )
            all_embeddings.extend(result.embeddings)

        embeddings = np.array(all_embeddings)
        # L2 normalize for cosine similarity via dot product
        return embeddings / np.linalg.norm(embeddings, axis=1, keepdims=True)

    def encode_query(self, query: str) -> np.ndarray:
        """Encode a search query with query-specific input type."""
        result = self.client.embed(
            [query],
            model=self.config.model,
            input_type="query"  # Asymmetric - queries encoded differently
        )
        embedding = np.array(result.embeddings[0])
        return embedding / np.linalg.norm(embedding)`,
        explanation: 'Production-grade encoder with batching, asymmetric query/document encoding, and L2 normalization for efficient similarity computation.',
      },
    },
    misconceptions: [
      {
        myth: 'Embeddings understand meaning like humans do',
        reality: 'Embeddings capture statistical patterns of word co-occurrence, not true understanding. They\'re powerful approximations of meaning, not comprehension.',
      },
      {
        myth: 'Bigger embedding dimensions are always better',
        reality: 'Larger dimensions capture more nuance but increase storage costs and can overfit. 768-1536 dimensions is usually the sweet spot.',
      },
      {
        myth: 'All embedding models work the same',
        reality: 'Different models are trained on different data with different objectives. Domain-specific models often outperform general ones for specialized tasks.',
      },
    ],
    relatedTerms: [
      { id: 'vector-database', name: 'Vector Database', description: 'Stores and searches embeddings efficiently' },
      { id: 'cosine-similarity', name: 'Cosine Similarity', description: 'Measures how similar two embeddings are' },
      { id: 'chunking', name: 'Chunking', description: 'Splitting text before embedding' },
      { id: 'semantic-search', name: 'Semantic Search', description: 'Finding content by meaning, not keywords' },
    ],
    advancedTopics: [
      { id: 'matryoshka-embeddings', name: 'Matryoshka Embeddings', description: 'Variable-dimension embeddings for efficiency', difficulty: 'advanced' },
      { id: 'fine-tuning-embeddings', name: 'Fine-tuning Embeddings', description: 'Adapting models to your domain', difficulty: 'advanced' },
      { id: 'multimodal-embeddings', name: 'Multimodal Embeddings', description: 'Embedding images and text together', difficulty: 'intermediate' },
    ],
    quiz: [
      {
        question: 'What do embeddings represent?',
        options: [
          'The exact words in a text',
          'The meaning/semantics of text as numbers',
          'The grammar structure of sentences',
          'The author of the text',
        ],
        correctIndex: 1,
        explanation: 'Embeddings convert text into numerical vectors that capture semantic meaning, allowing computers to understand similarity between concepts.',
      },
      {
        question: 'If two texts have similar embeddings, what does that mean?',
        options: [
          'They have the same words',
          'They were written by the same person',
          'They have similar meanings',
          'They have the same length',
        ],
        correctIndex: 2,
        explanation: 'Similar embeddings indicate semantic similarity - the texts are about similar topics or express similar ideas, even if they use different words.',
      },
    ],
  },
  'vector-database': {
    term: 'Vector Database',
    slug: 'vector-database',
    fromLessonId: 'lesson-03',
    fromLessonTitle: 'Embeddings & Vector Search',
    oneLiner: {
      beginner: 'A special database that organizes information by meaning instead of keywords.',
      intermediate: 'A database optimized for storing embeddings and performing fast similarity search using ANN algorithms.',
      advanced: 'Specialized data stores implementing approximate nearest neighbor indices (HNSW, IVF) for sub-linear similarity retrieval.',
    },
    analogy: {
      beginner: {
        title: 'The Smart Library',
        content: 'Imagine a library where you can say "I want books about overcoming challenges" and it finds relevant books even if none have those exact words in their titles. That\'s what a [vector database] does - it finds things by meaning.',
      },
      intermediate: {
        title: 'Semantic GPS',
        content: 'A vector database is like Google Maps for meaning. Just as Maps can quickly find restaurants near your location among millions of places, a vector database finds content semantically near your query among millions of [embeddings].',
      },
      advanced: {
        title: 'Approximate Geometry',
        content: 'Vector databases trade exact nearest-neighbor guarantees for dramatic speedups. HNSW builds navigable small-world graphs; IVF partitions space into Voronoi cells. Both achieve sub-linear query time with tunable recall.',
      },
    },
    howItWorks: {
      beginner: {
        content: 'When you add a document:\n1. It gets converted to numbers ([embeddings])\n2. The database stores these numbers in a special structure\n3. When you search, your query also becomes numbers\n4. The database quickly finds the closest matches',
        diagram: `flowchart TB
    subgraph Adding
    A[Document] --> B[Embedding]
    B --> C[Store in Database]
    end

    subgraph Searching
    D[Query] --> E[Embedding]
    E --> F[Find Similar]
    F --> G[Return Results]
    end`,
      },
      intermediate: {
        content: 'Vector databases use [approximate nearest neighbor] (ANN) algorithms instead of brute-force search. Popular approaches:\n\n- **HNSW**: Builds a graph where similar vectors are connected\n- **IVF**: Clusters vectors and searches relevant clusters only\n- **Product Quantization**: Compresses vectors for memory efficiency',
        diagram: `flowchart TB
    subgraph "HNSW Index"
    A((Query)) --> B((Hop 1))
    B --> C((Hop 2))
    C --> D((Result))
    A -.-> E[("Skip far nodes")]
    end

    subgraph "IVF Index"
    F[Query] --> G{Find Cluster}
    G --> H[Cluster A]
    G --> I[Cluster B]
    H --> J[Search within]
    end`,
      },
      advanced: {
        content: 'Modern vector databases implement hybrid indices combining:\n\n- **HNSW** with configurable M (connections) and efConstruction\n- **Scalar/Product Quantization** for memory reduction (16x compression)\n- **Filtered search** with predicate pushdown\n- **Multi-tenancy** with namespace isolation\n\nKey tradeoffs: recall vs latency, memory vs accuracy, build time vs query time.',
      },
    },
    misconceptions: [
      {
        myth: 'Vector databases replace traditional databases',
        reality: 'They complement traditional databases. You often need both - SQL for structured data, vectors for semantic search.',
      },
      {
        myth: 'You need millions of vectors to benefit',
        reality: 'Even with thousands of vectors, semantic search beats keyword matching. Scale doesn\'t determine usefulness.',
      },
    ],
    relatedTerms: [
      { id: 'embeddings', name: 'Embeddings', description: 'The vectors stored in the database' },
      { id: 'hnsw', name: 'HNSW', description: 'Graph-based nearest neighbor algorithm' },
      { id: 'cosine-similarity', name: 'Cosine Similarity', description: 'How similarity is measured' },
    ],
    advancedTopics: [
      { id: 'hybrid-search', name: 'Hybrid Search', description: 'Combining vector and keyword search', difficulty: 'intermediate' },
      { id: 'filtered-vector-search', name: 'Filtered Vector Search', description: 'Adding metadata constraints', difficulty: 'advanced' },
    ],
    quiz: [
      {
        question: 'What makes vector databases different from traditional databases?',
        options: [
          'They are faster at everything',
          'They find results by meaning similarity, not exact matches',
          'They can only store text',
          'They don\'t need indexes',
        ],
        correctIndex: 1,
        explanation: 'Vector databases excel at semantic similarity search - finding content with similar meaning rather than exact keyword matches.',
      },
    ],
  },
};

// Level configuration
const levelConfig: Record<UserLevel, { label: string; color: string; bgColor: string; borderColor: string }> = {
  beginner: { label: 'Beginner', color: 'text-green-700', bgColor: 'bg-green-100', borderColor: 'border-green-200' },
  intermediate: { label: 'Intermediate', color: 'text-amber-700', bgColor: 'bg-amber-100', borderColor: 'border-amber-200' },
  advanced: { label: 'Advanced', color: 'text-pink-700', bgColor: 'bg-pink-100', borderColor: 'border-pink-200' },
};

export default function TermDeepDivePage() {
  const params = useParams();
  const router = useRouter();
  const termSlug = params.termSlug as string;

  const { currentLevel, setLevel, updateExploration, hasExplored } = useUserStore();
  const { breadcrumbs, setBreadcrumbs, currentLessonId } = useNavigationStore();

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});

  // Get content for this term
  const content = deepDiveContent[termSlug];

  // Update breadcrumbs and track deep dive view
  useEffect(() => {
    if (content) {
      setBreadcrumbs([
        { label: 'Course', href: '/course', type: 'course' },
        { label: content.fromLessonTitle, href: `/course/${content.fromLessonId.replace('lesson-', '')}`, type: 'lesson' },
        { label: content.term, href: `/course/term/${termSlug}`, type: 'term' },
      ]);

      // Mark deep dive as viewed
      if (hasExplored(termSlug)) {
        updateExploration(termSlug, { deepDiveViewedAt: new Date() });
      }
    }
  }, [content, termSlug]);

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <Sparkles className="w-16 h-16 text-primary-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Deep Dive Coming Soon</h1>
          <p className="text-gray-600 mb-6">
            We're preparing an in-depth exploration of "{termSlug}".
            In production, this would be AI-generated with the same quality as hand-crafted content.
          </p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleQuizAnswer = (questionIndex: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
    setShowResults(prev => ({ ...prev, [questionIndex]: true }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
              <Link href="/course" className="text-gray-500 hover:text-gray-700">
                Course
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-300" />
              <Link
                href={`/course/${content.fromLessonId.replace('lesson-', '')}`}
                className="text-gray-500 hover:text-gray-700"
              >
                {content.fromLessonTitle}
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-300" />
              <span className="text-gray-900 font-medium">{content.term}</span>
            </div>

            {/* Level Selector */}
            <div className="flex items-center gap-2">
              {(['beginner', 'intermediate', 'advanced'] as UserLevel[]).map((level) => (
                <button
                  key={level}
                  onClick={() => setLevel(level)}
                  className={`
                    px-3 py-1 rounded-full text-sm font-medium transition-all
                    ${currentLevel === level
                      ? `${levelConfig[level].bgColor} ${levelConfig[level].color}`
                      : 'text-gray-500 hover:bg-gray-100'
                    }
                  `}
                >
                  {levelConfig[level].label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl ${levelConfig[currentLevel].bgColor}`}>
                <Sparkles className={`w-6 h-6 ${levelConfig[currentLevel].color}`} />
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${levelConfig[currentLevel].bgColor} ${levelConfig[currentLevel].color}`}>
                Deep Dive
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {content.term}
            </h1>

            <p className="text-xl text-gray-600">
              {content.oneLiner[currentLevel]}
            </p>
          </div>

          {/* Analogy Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl border border-primary-100 p-8 mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-6 h-6 text-primary-500" />
              <h2 className="text-xl font-bold text-gray-900">
                {content.analogy[currentLevel].title}
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {renderContentWithTerms(content.analogy[currentLevel].content)}
            </p>
          </motion.section>

          {/* How It Works */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-6 h-6 text-primary-500" />
              <h2 className="text-xl font-bold text-gray-900">How It Works</h2>
            </div>

            <div className="prose prose-gray max-w-none">
              {content.howItWorks[currentLevel].content.split('\n\n').map((para, i) => (
                <p key={i} className="text-gray-700 leading-relaxed mb-4">
                  {renderContentWithTerms(para)}
                </p>
              ))}
            </div>

            {content.howItWorks[currentLevel].diagram && (
              <div className="mt-6">
                <MermaidDiagram chart={content.howItWorks[currentLevel].diagram!} />
              </div>
            )}
          </motion.section>

          {/* Code Example */}
          {content.codeExample && content.codeExample[currentLevel] && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <Code className="w-6 h-6 text-primary-500" />
                <h2 className="text-xl font-bold text-gray-900">Code Example</h2>
              </div>

              <pre className="bg-gray-900 text-gray-100 rounded-xl p-6 overflow-x-auto text-sm mb-4">
                <code className={`language-${content.codeExample[currentLevel].language}`}>
                  {content.codeExample[currentLevel].code}
                </code>
              </pre>

              <p className="text-gray-600 text-sm">
                {content.codeExample[currentLevel].explanation}
              </p>
            </motion.section>
          )}

          {/* Common Misconceptions */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
              <h2 className="text-xl font-bold text-gray-900">Common Misconceptions</h2>
            </div>

            <div className="space-y-4">
              {content.misconceptions.map((item, index) => (
                <div key={index} className="border border-gray-100 rounded-xl overflow-hidden">
                  <div className="bg-red-50 px-4 py-3 border-b border-red-100">
                    <p className="text-red-800 font-medium">
                      <span className="text-red-500">Myth:</span> {item.myth}
                    </p>
                  </div>
                  <div className="bg-green-50 px-4 py-3">
                    <p className="text-green-800">
                      <span className="text-green-600 font-medium">Reality:</span> {item.reality}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Related Terms - THE RABBIT HOLE */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <Link2 className="w-6 h-6 text-primary-500" />
              <h2 className="text-xl font-bold text-gray-900">Related Terms</h2>
              <span className="text-sm text-gray-500 ml-2">Click to explore</span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {content.relatedTerms.map((term) => (
                <Link
                  key={term.id}
                  href={`/course/term/${term.id}`}
                  className="group p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {term.name}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary-500 transition-colors" />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{term.description}</p>
                </Link>
              ))}
            </div>
          </motion.section>

          {/* Advanced Topics - MORE RABBIT HOLES */}
          {content.advancedTopics.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 p-8 mb-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-6 h-6 text-primary-500" />
                <h2 className="text-xl font-bold text-gray-900">Go Deeper</h2>
              </div>

              <div className="space-y-3">
                {content.advancedTopics.map((topic) => (
                  <Link
                    key={topic.id}
                    href={`/course/term/${topic.id}`}
                    className="group flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {topic.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{topic.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`
                        px-2 py-1 rounded text-xs font-medium
                        ${topic.difficulty === 'intermediate'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-pink-100 text-pink-700'}
                      `}>
                        {topic.difficulty}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary-500 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          {/* Quiz Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="w-6 h-6 text-amber-500" />
              <h2 className="text-xl font-bold text-gray-900">Quick Quiz</h2>
            </div>

            <div className="space-y-8">
              {content.quiz.map((q, qIndex) => (
                <div key={qIndex} className="space-y-4">
                  <p className="font-medium text-gray-900">
                    {qIndex + 1}. {q.question}
                  </p>

                  <div className="space-y-2">
                    {q.options.map((option, oIndex) => {
                      const isSelected = selectedAnswers[qIndex] === oIndex;
                      const isCorrect = oIndex === q.correctIndex;
                      const showResult = showResults[qIndex];

                      return (
                        <button
                          key={oIndex}
                          onClick={() => !showResult && handleQuizAnswer(qIndex, oIndex)}
                          disabled={showResult}
                          className={`
                            w-full text-left p-4 rounded-xl border-2 transition-all
                            ${showResult
                              ? isCorrect
                                ? 'border-green-500 bg-green-50'
                                : isSelected
                                  ? 'border-red-500 bg-red-50'
                                  : 'border-gray-200'
                              : isSelected
                                ? 'border-primary-500 bg-primary-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }
                          `}
                        >
                          <div className="flex items-center gap-3">
                            {showResult ? (
                              isCorrect ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              ) : isSelected ? (
                                <Circle className="w-5 h-5 text-red-500" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-300" />
                              )
                            ) : (
                              <Circle className={`w-5 h-5 ${isSelected ? 'text-primary-500' : 'text-gray-300'}`} />
                            )}
                            <span className={showResult && isCorrect ? 'text-green-700 font-medium' : ''}>
                              {option}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {showResults[qIndex] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-4 bg-blue-50 rounded-xl border border-blue-100"
                    >
                      <p className="text-blue-800 text-sm">
                        <span className="font-medium">Explanation:</span> {q.explanation}
                      </p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.section>

          {/* Navigation Footer */}
          <div className="flex items-center justify-between py-8 border-t border-gray-200">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>

            <Link
              href={`/course/${content.fromLessonId.replace('lesson-', '')}`}
              className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
            >
              Continue Lesson
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

// Helper to render content with [term] syntax as ClickableTerm
function renderContentWithTerms(content: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index));
    }

    const termText = match[1];
    const termId = termText.toLowerCase().replace(/\s+/g, '-');

    parts.push(
      <ClickableTerm key={`${termId}-${match.index}`} termId={termId}>
        {termText}
      </ClickableTerm>
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }

  return parts;
}

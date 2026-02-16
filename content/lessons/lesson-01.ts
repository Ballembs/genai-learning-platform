// content/lessons/lesson-01.ts
// How AI Works

import type { Term, AdvancedTopic, UserLevel } from '@/types';

export const lesson01Terms: Term[] = [
  {
    id: 'tokens',
    term: 'Tokens',
    slug: 'tokens',
    popup: {
      beginner: {
        explanation: 'Tokens are the pieces AI reads - like LEGO bricks that make up words. "Hello" is 1 token, but "extraordinary" might be 3 tokens.',
        example: '"ChatGPT" = 3 tokens: "Chat", "G", "PT"',
      },
      intermediate: {
        explanation: 'Subword units produced by tokenizers (BPE, SentencePiece). Common words are single tokens; rare words split into pieces.',
        example: 'tiktoken.encode("Hello world") → [15496, 1917]',
      },
      advanced: {
        explanation: 'BPE tokenization learns merge rules from corpus statistics. Vocabulary size (32K-100K) balances efficiency vs coverage.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['context-window', 'tokenizer', 'vocabulary'],
    usedInLessons: ['lesson-01', 'lesson-04'],
  },
  {
    id: 'temperature',
    term: 'Temperature',
    slug: 'temperature',
    popup: {
      beginner: {
        explanation: 'Temperature controls randomness. Low = predictable and focused. High = creative and surprising.',
        example: 'Temperature 0: "The sky is blue." Temperature 1: "The sky is a canvas of cerulean dreams."',
      },
      intermediate: {
        explanation: 'Scaling factor for logits before softmax. T=0 is greedy (argmax). T>1 flattens distribution, increasing randomness.',
        example: 'logits = [2.0, 1.0, 0.5] → softmax(logits/T)',
      },
      advanced: {
        explanation: 'Modifies probability distribution: P(token) = softmax(logits/T). Combined with top-p/top-k for controlled sampling.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['top-p', 'sampling', 'logits'],
    usedInLessons: ['lesson-01', 'lesson-02'],
  },
  {
    id: 'context-window',
    term: 'Context Window',
    slug: 'context-window',
    popup: {
      beginner: {
        explanation: 'How much text AI can "see" at once - like a window showing part of a document. Bigger window = more context.',
        example: 'GPT-4: ~128K tokens. Claude: ~200K tokens (~500 pages).',
      },
      intermediate: {
        explanation: 'Maximum sequence length the model processes. Includes system prompt, conversation history, and response.',
        example: 'If context is 8K and prompt uses 6K, only 2K left for response.',
      },
      advanced: {
        explanation: 'Attention is O(n²) in sequence length. Extended context uses sparse attention, ALiBi, or RoPE extrapolation.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['tokens', 'attention', 'memory'],
    usedInLessons: ['lesson-01', 'lesson-04'],
  },
  {
    id: 'hallucination',
    term: 'Hallucination',
    slug: 'hallucination',
    popup: {
      beginner: {
        explanation: 'When AI confidently makes up false information. It sounds true but isn\'t - like a student guessing on a test.',
        example: 'AI might invent a book that doesn\'t exist or cite fake research papers.',
      },
      intermediate: {
        explanation: 'Generated content not grounded in training data or context. Caused by pattern completion without factual verification.',
        example: 'Asking about recent events often triggers hallucinations due to knowledge cutoff.',
      },
      advanced: {
        explanation: 'Emerges from autoregressive generation optimizing likelihood, not truth. Mitigations: RAG, constrained decoding, self-consistency.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['grounding', 'rag', 'factuality'],
    usedInLessons: ['lesson-01', 'lesson-04'],
  },
  {
    id: 'transformer',
    term: 'Transformer',
    slug: 'transformer',
    popup: {
      beginner: {
        explanation: 'The architecture that makes modern AI work. It lets AI understand how words relate to each other in a sentence.',
        example: 'In "The cat sat on the mat because it was tired," transformers understand "it" refers to "cat."',
      },
      intermediate: {
        explanation: 'Neural architecture using self-attention to process sequences in parallel. Core of GPT, Claude, and all modern LLMs.',
        example: 'attention_output = softmax(QK^T / sqrt(d)) * V',
      },
      advanced: {
        explanation: 'Multi-head self-attention with residual connections and layer normalization. Decoder-only (GPT) vs encoder-decoder (T5).',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['attention', 'neural-network', 'parameters'],
    usedInLessons: ['lesson-01'],
  },
  {
    id: 'next-token-prediction',
    term: 'Next Token Prediction',
    slug: 'next-token-prediction',
    popup: {
      beginner: {
        explanation: 'AI learns by guessing the next word, billions of times. Like autocomplete on your phone, but way more powerful.',
        example: '"The cat sat on the ___" → AI predicts "mat" or "floor" based on patterns.',
      },
      intermediate: {
        explanation: 'The core training objective: predict P(token_n | tokens_1...n-1). Simple objective that scales to emergent capabilities.',
        example: 'Loss = -log P(actual_token | previous_tokens)',
      },
      advanced: {
        explanation: 'Cross-entropy loss over vocabulary. Scales predictably (chinchilla scaling laws). Capabilities emerge from scale.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['training', 'loss-function', 'autoregressive'],
    usedInLessons: ['lesson-01'],
  },
  {
    id: 'parameters',
    term: 'Parameters',
    slug: 'parameters',
    popup: {
      beginner: {
        explanation: 'The numbers inside AI that store what it learned - like memories. More parameters = more knowledge capacity.',
        example: 'GPT-4 has ~1.8 trillion parameters. That\'s 1,800,000,000,000 numbers!',
      },
      intermediate: {
        explanation: 'Learned weights in neural network layers. Parameter count determines model capacity but not necessarily quality.',
        example: '7B model: 7 billion floating-point weights across attention and FFN layers.',
      },
      advanced: {
        explanation: 'Distributed across embedding, attention (Q,K,V,O), and MLP layers. Mixture-of-experts uses sparse activation.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['training', 'model-size', 'weights'],
    usedInLessons: ['lesson-01'],
  },
  {
    id: 'inference',
    term: 'Inference',
    slug: 'inference',
    popup: {
      beginner: {
        explanation: 'When AI generates a response - the actual thinking part. Training is learning, inference is using what was learned.',
        example: 'You type a question, AI does inference to generate the answer.',
      },
      intermediate: {
        explanation: 'Running the forward pass to generate predictions. Autoregressive: one token at a time, using previous as context.',
        example: 'Inference cost scales with output length × model size.',
      },
      advanced: {
        explanation: 'KV-cache optimization stores key/value states. Speculative decoding and continuous batching improve throughput.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['generation', 'latency', 'throughput'],
    usedInLessons: ['lesson-01'],
  },
];

export const lesson01AdvancedTopics: AdvancedTopic[] = [
  {
    id: 'attention-mechanism',
    title: 'Attention Mechanism',
    description: 'How transformers decide what to focus on',
    difficulty: 'intermediate',
    prerequisites: ['transformer', 'tokens'],
    hasDeepDive: true,
  },
  {
    id: 'training-process',
    title: 'Training Process',
    description: 'How models learn from massive datasets',
    difficulty: 'intermediate',
    prerequisites: ['next-token-prediction', 'parameters'],
    hasDeepDive: true,
  },
  {
    id: 'scaling-laws',
    title: 'Scaling Laws',
    description: 'Why bigger models are better (usually)',
    difficulty: 'advanced',
    prerequisites: ['parameters', 'training-process'],
    hasDeepDive: true,
  },
  {
    id: 'emergent-capabilities',
    title: 'Emergent Capabilities',
    description: 'Abilities that appear only at scale',
    difficulty: 'advanced',
    prerequisites: ['scaling-laws'],
    hasDeepDive: true,
  },
];

export const lesson01Content: Record<UserLevel, string> = {
  beginner: `## The Magic Explained

You've used ChatGPT or Claude. You type a question, and somehow, the AI responds with something that sounds... intelligent. But what's actually happening inside?

Let's pull back the curtain.

## AI is a Super-Powered Autocomplete

Here's the surprising truth: AI doesn't "understand" anything the way you do. It's doing one thing incredibly well: **predicting what comes next**.

When you text a friend and your phone suggests "sounds good!" - that's autocomplete. [Next token prediction] is the same idea, but trained on essentially the entire internet.

> **The Autocomplete Analogy**
>
> Your phone's autocomplete learned from your texts. AI's autocomplete learned from books, Wikipedia, code, conversations - trillions of words. That's why it seems so smart.

## What AI Actually Sees

AI doesn't read letters or words like you do. It sees [tokens] - pieces that are often words, but sometimes parts of words.

| You See | AI Sees |
|---------|---------|
| Hello | "Hello" (1 token) |
| ChatGPT | "Chat" + "G" + "PT" (3 tokens) |
| Supercalifragilistic | 5+ tokens |

Why does this matter? Because AI has a limit on how many tokens it can handle at once - the [context window]. Think of it as AI's short-term memory.

## How AI Generates Text

Here's the actual process:

1. **You type**: "What is the capital of France?"
2. **AI converts** your text to tokens
3. **AI predicts** the most likely next token: "The"
4. **AI predicts** the next: "capital"
5. **Repeat** until the response is complete

\`\`\`mermaid
flowchart LR
    A[Your Question] --> B[Convert to Tokens]
    B --> C[Predict Next Token]
    C --> D{Done?}
    D -->|No| C
    D -->|Yes| E[Your Answer]
\`\`\`

Each prediction uses everything that came before. That's why longer responses take more time - it's making hundreds of predictions!

## Why AI Sometimes Makes Things Up

Here's the dark side: AI can [hallucinate] - confidently state things that are completely false.

**Why does this happen?**

AI learned to produce *plausible-sounding* text, not *true* text. It's like a student who learned to write convincing essays without actually understanding the subject.

> **Real Example of Hallucination**
>
> Ask AI: "What books did [made-up author] write?"
> AI might respond with completely invented book titles that sound real!

This is why you should always verify important information.

## The Temperature Dial

When AI predicts the next token, it doesn't always pick the #1 choice. The [temperature] setting controls this:

| Temperature | Behavior | Good For |
|-------------|----------|----------|
| 0.0 | Always picks top choice | Math, facts |
| 0.7 | Usually top, sometimes creative | General chat |
| 1.0+ | Very random, surprising | Creative writing |

Low temperature = predictable and safe.
High temperature = creative and risky.

## Inside the Black Box

The actual "brain" of AI is called a [transformer]. It's a specific design that lets AI:

- Look at all words simultaneously (not one at a time)
- Understand how words relate to each other
- Handle very long texts efficiently

The transformer contains billions of [parameters] - numbers that were adjusted during training. Think of parameters as memories of patterns the AI learned.

## The [Context Window] Limit

AI can only "see" a certain amount at once:

- GPT-3.5: ~4,000 tokens (~3,000 words)
- GPT-4: ~128,000 tokens (~100,000 words)
- Claude: ~200,000 tokens (~150,000 words)

If your conversation gets too long, AI "forgets" the beginning. It's not storing memories like you do - it's re-reading everything each time.

## Key Takeaways

- AI predicts the next word, one at a time, incredibly well
- [Tokens] are the pieces AI reads (words or word parts)
- [Temperature] controls creativity vs consistency
- [Hallucination] happens because AI optimizes for "sounds good" not "is true"
- [Context window] limits how much AI can consider at once

**Next up**: Learn to control AI like a pro with [prompt engineering]!`,

  intermediate: `## How Language Models Actually Work

Understanding the internals of LLMs helps you use them more effectively. This lesson covers the architecture, training, and inference processes that power modern AI.

## The Transformer Architecture

All modern LLMs are built on the [transformer] architecture (Vaswani et al., 2017). Key components:

\`\`\`mermaid
flowchart TB
    A[Input Tokens] --> B[Token Embeddings]
    B --> C[+ Position Encodings]
    C --> D[Transformer Block x N]
    D --> E[Output Layer]
    E --> F[Next Token Probabilities]

    subgraph "Transformer Block"
    G[Multi-Head Attention]
    H[Feed-Forward Network]
    I[Layer Norm + Residuals]
    end
\`\`\`

### Tokenization

Before processing, text is converted to [tokens] using algorithms like BPE (Byte-Pair Encoding):

\`\`\`python
import tiktoken

encoder = tiktoken.encoding_for_model("gpt-4")

text = "Hello, how are you?"
tokens = encoder.encode(text)
print(tokens)  # [9906, 11, 1268, 527, 499, 30]
print(len(tokens))  # 6 tokens

# Decoding back
decoded = encoder.decode(tokens)
print(decoded)  # "Hello, how are you?"
\`\`\`

Token count directly impacts cost and [context window] usage.

## The Training Process

LLMs learn through [next token prediction] on massive datasets:

\`\`\`python
# Simplified training loop
for batch in training_data:
    # Input: "The cat sat on the"
    # Target: "cat sat on the mat"

    logits = model(batch.input_tokens)
    loss = cross_entropy(logits, batch.target_tokens)

    loss.backward()
    optimizer.step()
\`\`\`

### Training Data Scale

| Model | Training Tokens | Parameters |
|-------|-----------------|------------|
| GPT-3 | 300B | 175B |
| LLaMA 2 | 2T | 70B |
| GPT-4 | ~13T (estimated) | ~1.8T |

More data and [parameters] generally improve capabilities, following scaling laws.

## Inference: Generating Text

At inference time, the model generates one token at a time:

\`\`\`python
def generate(prompt: str, max_tokens: int = 100, temperature: float = 0.7):
    tokens = tokenize(prompt)

    for _ in range(max_tokens):
        # Get probability distribution over vocabulary
        logits = model(tokens)

        # Apply temperature
        scaled_logits = logits / temperature

        # Sample from distribution
        probs = softmax(scaled_logits)
        next_token = sample(probs)

        tokens.append(next_token)

        if next_token == END_TOKEN:
            break

    return detokenize(tokens)
\`\`\`

### Temperature and Sampling

[Temperature] modifies the probability distribution:

\`\`\`python
# Original logits for next token
logits = [2.0, 1.5, 1.0, 0.5]  # "the", "a", "this", "that"

# Temperature = 1.0 (default)
probs_t1 = softmax([2.0, 1.5, 1.0, 0.5])
# [0.42, 0.31, 0.18, 0.09]

# Temperature = 0.5 (more focused)
probs_t05 = softmax([4.0, 3.0, 2.0, 1.0])
# [0.64, 0.24, 0.09, 0.03]

# Temperature = 2.0 (more random)
probs_t2 = softmax([1.0, 0.75, 0.5, 0.25])
# [0.32, 0.28, 0.24, 0.16]
\`\`\`

### Top-p (Nucleus) Sampling

Limits sampling to tokens covering probability mass p:

\`\`\`python
def top_p_sample(probs, p=0.9):
    sorted_probs = sorted(enumerate(probs), key=lambda x: -x[1])
    cumsum = 0
    candidates = []

    for idx, prob in sorted_probs:
        cumsum += prob
        candidates.append((idx, prob))
        if cumsum >= p:
            break

    # Renormalize and sample from candidates only
    return sample_from(candidates)
\`\`\`

## Context Window Management

The [context window] is finite. With 8K tokens:

\`\`\`python
# Token budget breakdown
CONTEXT_SIZE = 8192

system_prompt = 500      # Your instructions
conversation_history = 3000  # Previous messages
retrieved_context = 2000    # RAG documents
user_message = 200         # Current input
# Remaining for response: 2492 tokens
\`\`\`

### KV-Cache Optimization

During generation, key-value pairs are cached to avoid recomputation:

\`\`\`python
# Without cache: O(n²) for n tokens
# With cache: O(n) incremental

class CachedModel:
    def __init__(self):
        self.kv_cache = {}

    def generate_next(self, new_token):
        # Only compute attention for new token
        # Reuse cached K,V from previous tokens
        return self.forward_with_cache(new_token, self.kv_cache)
\`\`\`

## Understanding Hallucination

[Hallucination] occurs because the model optimizes for fluency, not factuality:

\`\`\`python
# The model sees patterns like:
# "The author of [Book] is [Author]"
#
# When asked about a book it doesn't know:
# It generates a plausible-sounding author name
# because that's what fits the pattern
\`\`\`

Mitigations:
1. **RAG**: Ground responses in retrieved documents
2. **Lower temperature**: Reduce creativity
3. **Explicit instructions**: "Say 'I don't know' if unsure"
4. **Self-consistency**: Generate multiple answers, check agreement

## Performance Considerations

### Latency Components

| Component | Time | Optimization |
|-----------|------|--------------|
| Tokenization | ~1ms | Cached |
| First token | 100-500ms | Speculative decoding |
| Per token | 10-50ms | Batching, quantization |

### Cost Estimation

\`\`\`python
def estimate_cost(prompt_tokens: int, completion_tokens: int,
                  model: str = "gpt-4") -> float:
    prices = {
        "gpt-4": {"input": 0.03, "output": 0.06},  # per 1K
        "gpt-3.5-turbo": {"input": 0.0015, "output": 0.002},
    }

    p = prices[model]
    return (prompt_tokens * p["input"] +
            completion_tokens * p["output"]) / 1000
\`\`\`

## What's Next

Now that you understand how models work internally, learn to control their behavior with [prompt engineering]!`,

  advanced: `## LLM Architecture: Deep Technical Dive

This lesson covers the mathematical foundations and implementation details of large language models, including attention mechanisms, training dynamics, and inference optimization.

## Transformer Architecture Internals

### Multi-Head Self-Attention

The core operation of [transformers]:

\`\`\`python
import torch
import torch.nn as nn
import torch.nn.functional as F
import math

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model: int, n_heads: int):
        super().__init__()
        self.d_model = d_model
        self.n_heads = n_heads
        self.d_k = d_model // n_heads

        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)

    def forward(self, x, mask=None):
        batch_size, seq_len, _ = x.shape

        # Project to Q, K, V
        Q = self.W_q(x).view(batch_size, seq_len, self.n_heads, self.d_k)
        K = self.W_k(x).view(batch_size, seq_len, self.n_heads, self.d_k)
        V = self.W_v(x).view(batch_size, seq_len, self.n_heads, self.d_k)

        # Transpose for attention: (batch, heads, seq, d_k)
        Q, K, V = [t.transpose(1, 2) for t in (Q, K, V)]

        # Scaled dot-product attention
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d_k)

        if mask is not None:
            scores = scores.masked_fill(mask == 0, float('-inf'))

        attn_weights = F.softmax(scores, dim=-1)
        attn_output = torch.matmul(attn_weights, V)

        # Concatenate heads
        attn_output = attn_output.transpose(1, 2).contiguous()
        attn_output = attn_output.view(batch_size, seq_len, self.d_model)

        return self.W_o(attn_output)
\`\`\`

### Positional Encoding: RoPE

Rotary Position Embeddings (RoPE) enable length extrapolation:

\`\`\`python
def apply_rope(x, positions, dim):
    """Apply Rotary Position Embeddings"""
    # x: (batch, seq, heads, d_k)
    freqs = 1.0 / (10000 ** (torch.arange(0, dim, 2) / dim))
    angles = positions.unsqueeze(-1) * freqs

    cos = torch.cos(angles)
    sin = torch.sin(angles)

    x1, x2 = x[..., ::2], x[..., 1::2]

    # Rotate pairs of dimensions
    rotated = torch.stack([
        x1 * cos - x2 * sin,
        x1 * sin + x2 * cos
    ], dim=-1).flatten(-2)

    return rotated
\`\`\`

## Tokenization: BPE Implementation

[Tokens] are produced by Byte-Pair Encoding:

\`\`\`python
from collections import Counter
from typing import Dict, List, Tuple

class BPETokenizer:
    def __init__(self, vocab_size: int = 50000):
        self.vocab_size = vocab_size
        self.merges: List[Tuple[str, str]] = []
        self.vocab: Dict[str, int] = {}

    def train(self, corpus: List[str]):
        # Initialize with character-level vocabulary
        word_freqs = Counter()
        for text in corpus:
            words = text.split()
            for word in words:
                word_freqs[' '.join(word) + ' </w>'] += 1

        while len(self.vocab) < self.vocab_size:
            # Find most frequent pair
            pairs = Counter()
            for word, freq in word_freqs.items():
                symbols = word.split()
                for i in range(len(symbols) - 1):
                    pairs[(symbols[i], symbols[i+1])] += freq

            if not pairs:
                break

            best_pair = pairs.most_common(1)[0][0]
            self.merges.append(best_pair)

            # Merge pair in vocabulary
            new_word_freqs = {}
            pattern = ' '.join(best_pair)
            replacement = ''.join(best_pair)

            for word, freq in word_freqs.items():
                new_word = word.replace(pattern, replacement)
                new_word_freqs[new_word] = freq

            word_freqs = new_word_freqs
\`\`\`

## Training Dynamics

### Loss Function and Gradients

Cross-entropy loss with label smoothing:

\`\`\`python
def compute_loss(logits, targets, label_smoothing=0.1):
    """
    logits: (batch, seq_len, vocab_size)
    targets: (batch, seq_len)
    """
    vocab_size = logits.size(-1)

    # Flatten for cross-entropy
    logits_flat = logits.view(-1, vocab_size)
    targets_flat = targets.view(-1)

    # Standard cross-entropy
    ce_loss = F.cross_entropy(logits_flat, targets_flat, reduction='none')

    # Label smoothing
    log_probs = F.log_softmax(logits_flat, dim=-1)
    smooth_loss = -log_probs.mean(dim=-1)

    loss = (1 - label_smoothing) * ce_loss + label_smoothing * smooth_loss

    return loss.mean()
\`\`\`

### Chinchilla Scaling Laws

Optimal compute allocation:

\`\`\`python
def optimal_scaling(compute_budget_flops):
    """
    Chinchilla scaling: N ∝ C^0.5, D ∝ C^0.5
    Where N = parameters, D = tokens, C = compute
    """
    # Optimal parameters
    N_opt = 0.0057 * (compute_budget_flops ** 0.5)

    # Optimal training tokens
    D_opt = 20 * N_opt  # ~20 tokens per parameter

    return {
        'optimal_params': N_opt,
        'optimal_tokens': D_opt,
        'params_to_tokens_ratio': D_opt / N_opt
    }

# Example: 10^24 FLOPs budget
scaling = optimal_scaling(1e24)
# optimal_params: ~57B
# optimal_tokens: ~1.1T
\`\`\`

## Inference Optimization

### KV-Cache with Memory Efficiency

\`\`\`python
class KVCache:
    def __init__(self, max_batch: int, max_seq: int,
                 n_layers: int, n_heads: int, d_k: int):
        # Pre-allocate cache
        self.k_cache = torch.zeros(
            n_layers, max_batch, max_seq, n_heads, d_k
        )
        self.v_cache = torch.zeros(
            n_layers, max_batch, max_seq, n_heads, d_k
        )
        self.seq_len = 0

    def update(self, layer_idx: int, k: torch.Tensor, v: torch.Tensor):
        batch_size = k.size(0)
        new_seq_len = k.size(1)

        start = self.seq_len
        end = start + new_seq_len

        self.k_cache[layer_idx, :batch_size, start:end] = k
        self.v_cache[layer_idx, :batch_size, start:end] = v

        self.seq_len = end

        return (
            self.k_cache[layer_idx, :batch_size, :end],
            self.v_cache[layer_idx, :batch_size, :end]
        )
\`\`\`

### Speculative Decoding

Use small model to draft, large model to verify:

\`\`\`python
def speculative_decode(prompt, draft_model, target_model, k=4):
    """Generate k tokens with draft, verify with target"""
    tokens = tokenize(prompt)

    while not done:
        # Draft k tokens with small model
        draft_tokens = []
        draft_probs = []

        for _ in range(k):
            logits = draft_model(tokens + draft_tokens)
            prob = softmax(logits[-1])
            token = sample(prob)
            draft_tokens.append(token)
            draft_probs.append(prob[token])

        # Verify with target model (single forward pass)
        target_logits = target_model(tokens + draft_tokens)

        # Accept/reject each draft token
        accepted = 0
        for i in range(k):
            target_prob = softmax(target_logits[len(tokens) + i])

            # Acceptance probability
            if random() < target_prob[draft_tokens[i]] / draft_probs[i]:
                accepted += 1
            else:
                # Resample from adjusted distribution
                tokens.append(sample_adjusted(target_prob, draft_probs[i]))
                break

        tokens.extend(draft_tokens[:accepted])

    return detokenize(tokens)
\`\`\`

### Quantization for Efficiency

\`\`\`python
def quantize_weights(weights: torch.Tensor, bits: int = 4):
    """Symmetric quantization to N bits"""
    max_val = weights.abs().max()
    scale = max_val / (2 ** (bits - 1) - 1)

    quantized = torch.round(weights / scale).clamp(
        -(2 ** (bits - 1)), 2 ** (bits - 1) - 1
    ).to(torch.int8)

    return quantized, scale

def dequantize(quantized: torch.Tensor, scale: float):
    return quantized.float() * scale
\`\`\`

## [Hallucination] Mitigation at Inference

### Self-Consistency Checking

\`\`\`python
async def self_consistent_generate(prompt: str, n_samples: int = 5):
    """Generate multiple responses, return most consistent"""
    responses = await asyncio.gather(*[
        generate(prompt, temperature=0.7)
        for _ in range(n_samples)
    ])

    # Compute pairwise similarity
    embeddings = embed(responses)
    similarities = cosine_similarity(embeddings, embeddings)

    # Return response most similar to others
    avg_similarity = similarities.mean(axis=1)
    best_idx = avg_similarity.argmax()

    return responses[best_idx], avg_similarity[best_idx]
\`\`\`

## Extending Context with ALiBi

Attention with Linear Biases for length generalization:

\`\`\`python
def alibi_attention(Q, K, V, n_heads):
    """ALiBi: train on 2K, inference on 8K+"""
    seq_len = Q.size(1)

    # Compute base slopes (geometric sequence)
    slopes = 2 ** (-8 / n_heads * torch.arange(1, n_heads + 1))

    # Position bias matrix
    positions = torch.arange(seq_len)
    alibi_bias = slopes.view(-1, 1, 1) * (
        positions.view(1, 1, -1) - positions.view(1, -1, 1)
    ).abs().neg()

    # Standard attention with bias
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(Q.size(-1))
    scores = scores + alibi_bias

    return torch.matmul(F.softmax(scores, dim=-1), V)
\`\`\`

## Further Exploration

- **Flash Attention**: IO-aware exact attention algorithm
- **Mixture of Experts**: Sparse activation for efficiency
- **Constitutional AI**: Training for safety and helpfulness
- **RLHF**: Reinforcement learning from human feedback`,
};

// Quiz questions
export const lesson01Quiz = {
  id: 'quiz-01-how-ai-works',
  title: 'How AI Works Knowledge Check',
  passingScore: 70,
  questions: [
    {
      id: 'ai-q1',
      question: 'How does an AI language model generate text?',
      type: 'multiple-choice' as const,
      options: [
        'By predicting one word at a time based on probability',
        'By searching a database of pre-written responses',
        'By understanding the meaning and crafting a reply',
        'By copying text from training data'
      ],
      correctAnswer: 0,
      explanation: 'LLMs generate text by predicting the most likely next token one at a time, using patterns learned during training.',
      difficulty: 'beginner' as const,
    },
    {
      id: 'ai-q2',
      question: 'What are tokens in the context of AI?',
      type: 'multiple-choice' as const,
      options: [
        'Digital currency used to pay for API calls',
        'Pieces of text (words or word parts) that AI processes',
        'Security keys for authentication',
        'Markers that indicate the end of a sentence'
      ],
      correctAnswer: 1,
      explanation: 'Tokens are the chunks that AI reads - common words are one token, while rare or long words may be split into multiple tokens.',
      difficulty: 'beginner' as const,
    },
    {
      id: 'ai-q3',
      question: 'Why do AI models sometimes "hallucinate" (make up false information)?',
      type: 'multiple-choice' as const,
      options: [
        'They have bugs in their code',
        'They optimize for plausible-sounding text, not factual accuracy',
        'They intentionally lie to users',
        'They run out of memory'
      ],
      correctAnswer: 1,
      explanation: 'Hallucinations occur because LLMs are trained to predict likely next tokens, not to verify facts. They optimize for "sounds right" not "is true".',
      difficulty: 'intermediate' as const,
    },
    {
      id: 'ai-q4',
      question: 'What does the "temperature" parameter control in text generation?',
      type: 'multiple-choice' as const,
      options: [
        'How fast the model generates text',
        'The randomness/creativity of the output',
        'The length of the response',
        'The accuracy of facts'
      ],
      correctAnswer: 1,
      explanation: 'Temperature controls randomness: low temperature (0.1) gives predictable, focused outputs; high temperature (1.0+) gives creative, varied outputs.',
      difficulty: 'intermediate' as const,
    },
    {
      id: 'ai-q5',
      question: 'What is the context window in a language model?',
      type: 'multiple-choice' as const,
      options: [
        'The user interface where you type prompts',
        'The maximum amount of text the model can process at once',
        'The time limit for generating responses',
        'The window showing model training progress'
      ],
      correctAnswer: 1,
      explanation: 'The context window is the maximum number of tokens the model can "see" at once. If a conversation exceeds this, earlier content is forgotten.',
      difficulty: 'beginner' as const,
    },
  ],
};

// Combined export
export const lesson01 = {
  id: 'lesson-01',
  title: 'How AI Works',
  subtitle: 'The Magic Behind ChatGPT',
  description: 'Understand how AI generates text, what tokens are, and why AI sometimes hallucinates.',
  estimatedMinutes: 25,
  terms: lesson01Terms,
  advancedTopics: lesson01AdvancedTopics,
  content: lesson01Content,
  quiz: lesson01Quiz,
};

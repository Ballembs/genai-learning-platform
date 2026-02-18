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

Understanding the internals of LLMs helps you use them more effectively and debug unexpected behavior. As a developer working with AI, you'll make better decisions about when to use different models, how to optimize costs, and why certain prompts work better than others. This lesson covers the architecture, training, and [inference] processes that power modern AI systems like GPT-4 and Claude.

Think of this as learning how the engine works before you start driving. You don't need to build a transformer from scratch, but knowing what's happening under the hood will make you a significantly more effective AI developer.

## The Transformer Architecture

All modern LLMs are built on the [transformer] architecture, introduced in the landmark 2017 paper "Attention Is All You Need" by Vaswani et al. Before transformers, language models used recurrent neural networks (RNNs) that processed text one word at a time, sequentially. This was slow and made it hard to capture long-range dependencies—by the time the model reached the end of a paragraph, it had often "forgotten" important context from the beginning.

Transformers revolutionized this by processing all words in parallel using a mechanism called [self-attention]. Instead of reading left-to-right like an RNN, a transformer looks at every word simultaneously and learns which words are most relevant to each other. This is why modern AI can understand that in the sentence "The trophy didn't fit in the suitcase because it was too big," the word "it" refers to "trophy"—the transformer computes attention weights that connect these words across the sentence.

The architecture consists of stacked "transformer blocks," each containing multi-head attention and feed-forward networks. Modern LLMs like GPT-4 stack 80-100+ of these blocks, with the output of each block feeding into the next, progressively building more abstract representations of the input.

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

The diagram above shows the high-level flow: input text is converted to [tokens], embedded as vectors, enhanced with position information (so the model knows word order), then processed through N transformer blocks. The final output layer converts the processed representations into probability distributions over the vocabulary for next-token prediction.

### Tokenization

Before any neural network processing can happen, text must be converted to numbers. This is where [tokenization] comes in—it's the critical bridge between human-readable text and the numerical representations that neural networks operate on.

Modern LLMs use subword tokenization algorithms, most commonly Byte-Pair Encoding (BPE). The key insight behind BPE is that you don't want to tokenize at the character level (too slow, too little meaning per token) or at the word level (vocabulary would be enormous, can't handle new words). Instead, BPE finds a middle ground: common words like "the" or "and" become single tokens, while rare words get split into meaningful subpieces.

The algorithm works by starting with individual characters, then iteratively merging the most frequent pairs. After training on a large corpus, you end up with a vocabulary of ~50,000-100,000 tokens that can represent any text. This is why you'll see "ChatGPT" split into ["Chat", "G", "PT"]—"Chat" is common enough to be its own token, but "GPT" as a unit wasn't frequent enough during tokenizer training.

Why does this matter practically? Because **token count directly affects cost and context limits**. When you're paying $0.03 per 1K input tokens, understanding that a 1,000-word document might be 1,300 tokens (not 1,000) changes your cost calculations. And when your [context window] is 8K tokens, knowing that your system prompt uses 500 tokens helps you budget the remaining space.

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

Notice that our 5-word sentence becomes 6 tokens. The comma gets its own token (11), and words are tokenized based on the model's learned vocabulary. Different models have different tokenizers—GPT-4's tokenizer produces different token IDs than Claude's. This is why you should always use the specific tokenizer for the model you're calling when estimating costs or checking context limits.

**Practical tip**: Use \`tiktoken\` to count tokens before sending requests. This prevents context overflow errors and helps you estimate costs accurately.

## The Training Process

Now let's look at how these models actually learn. The core training objective is deceptively simple: [next token prediction]. Given a sequence of tokens, predict the probability distribution over what comes next. The model sees "The cat sat on the" and learns to assign high probability to tokens like "mat," "floor," "couch" and low probability to tokens like "purple," "running," "xyz."

What makes this simple objective so powerful? Scale. When you train on trillions of tokens of text—books, articles, code, conversations—the model implicitly learns grammar, facts, reasoning patterns, and even theory of mind. It learns that verbs should agree with subjects, that Paris is in France, that code should be syntactically valid, and that humans in stories have beliefs and intentions. All from predicting the next word, billions of times.

The training loop itself is straightforward gradient descent: compute how wrong the predictions were (cross-entropy loss), calculate which direction to adjust the [parameters], take a small step in that direction, repeat. But the engineering challenges at scale are immense—training GPT-4 reportedly required tens of thousands of GPUs running for months.

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

This code shows the essence of training: the model sees input tokens, produces logits (raw prediction scores), compares them to the actual next tokens, and adjusts weights to reduce the error. What's not shown is the distributed training across thousands of GPUs, the careful learning rate schedules, the gradient clipping to prevent instability, and countless other engineering details that make training at scale possible.

### Training Data Scale

The relationship between training compute, data, and model size follows predictable patterns called "scaling laws." Researchers at DeepMind found that for a given compute budget, there's an optimal balance between model size and training data.

| Model | Training Tokens | Parameters |
|-------|-----------------|------------|
| GPT-3 | 300B | 175B |
| LLaMA 2 | 2T | 70B |
| GPT-4 | ~13T (estimated) | ~1.8T |

More data and [parameters] generally improve capabilities, following these scaling laws. Notice how LLaMA 2 trained on 7x more tokens than GPT-3 despite having fewer parameters—this reflects the "Chinchilla" insight that earlier models were undertrained. Modern practice is to train smaller models on more data rather than making models bigger without sufficient training.

**What this means for you**: Larger, more recent models are genuinely more capable, but they're also more expensive. For many tasks, a well-prompted smaller model works just as well. Understanding this tradeoff helps you choose the right model for each use case.

## Inference: Generating Text

Training is learning; [inference] is using what was learned. When you call the API and get a response, that's inference. Understanding the inference process explains why generation takes time, why longer responses cost more, and why certain parameters affect output quality.

The key insight is that generation is **autoregressive**: the model produces one token at a time, and each new token depends on all previous tokens. To generate a 100-token response, the model runs 100 forward passes, each one slightly larger than the last because it includes the previously generated tokens.

This explains why you see text streaming in character by character when using Claude or ChatGPT—you're literally watching the model think one token at a time. It also explains why longer outputs cost more: you're paying for 100 forward passes, not one.

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

Each iteration of this loop: (1) runs the full model to get logits for the next token, (2) applies temperature scaling to control randomness, (3) converts logits to probabilities via softmax, (4) samples a token from the distribution, (5) appends it to the sequence. When the model produces an end-of-sequence token (or hits max_tokens), generation stops.

### Temperature and Sampling

[Temperature] is one of the most important parameters you'll use when working with LLMs. It controls the randomness of generation by scaling the logits before the softmax function.

Mathematically, lower temperature makes the probability distribution "sharper"—the most likely token becomes even more likely, and unlikely tokens become even less likely. Higher temperature "flattens" the distribution, giving more chance to less likely tokens.

Practically: use low temperature (0.1-0.3) when you want consistent, factual responses—code generation, factual QA, structured output. Use higher temperature (0.7-1.0) when you want creativity and variety—brainstorming, creative writing, generating diverse examples.

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

Look at how the probabilities change: at T=0.5, "the" has 64% probability, making it very likely to be chosen. At T=2.0, the probabilities are much closer together, so any of the four tokens could reasonably be selected. The same logits produce very different behavior depending on temperature.

**Practical guidance**: Start with temperature 0.7 for general use, then adjust based on your needs. If outputs are too repetitive or boring, increase temperature. If they're too random or make factual errors, decrease it.

### Top-p (Nucleus) Sampling

Temperature alone doesn't prevent the model from occasionally selecting very unlikely tokens. [Top-p sampling] (also called nucleus sampling) adds another control: instead of sampling from the full vocabulary, sample only from tokens that together make up the top p% of probability mass.

With top_p=0.9, the model considers only tokens until their cumulative probability reaches 90%, then samples from that reduced set. This prevents selecting extremely unlikely tokens while still allowing diversity within the reasonable options.

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

The function sorts tokens by probability, accumulates until reaching the threshold p, then samples only from those top candidates. Combined with temperature, this gives you fine-grained control: temperature affects the shape of the distribution, top-p affects which tokens are even considered.

**When to adjust top-p**: The default (0.9-1.0) works for most cases. Lower it to 0.7-0.8 if you're seeing occasional nonsensical outputs. Setting both low temperature AND low top-p gives very deterministic outputs.

## Context Window Management

The [context window] is your token budget for each API call. Everything—system prompt, conversation history, retrieved documents, the user's message, AND the model's response—must fit within this limit. Understanding context management is essential for building reliable AI applications.

Different models have very different context limits: GPT-3.5-turbo offers 16K tokens, GPT-4 goes up to 128K, and Claude can handle 200K. But bigger isn't always better—using the full context is expensive and slower. You need to budget wisely.

\`\`\`python
# Token budget breakdown
CONTEXT_SIZE = 8192

system_prompt = 500      # Your instructions
conversation_history = 3000  # Previous messages
retrieved_context = 2000    # RAG documents
user_message = 200         # Current input
# Remaining for response: 2492 tokens
\`\`\`

This breakdown illustrates a common challenge: with a fixed context window, every component competes for space. If your system prompt grows, you have less room for conversation history. If you retrieve more documents for RAG, you have less room for the response.

**Practical strategies**: (1) Keep system prompts concise—every token counts. (2) Implement sliding window for conversation history—keep recent messages, summarize or drop old ones. (3) For RAG, retrieve only the most relevant chunks. (4) Set max_tokens for responses to prevent the model from rambling and exceeding your budget.

### KV-Cache Optimization

Here's an implementation detail that affects latency and cost: during autoregressive generation, the model doesn't recompute attention from scratch for each token. Instead, it caches the Key and Value matrices from previous tokens—the KV-cache.

Without caching, generating 100 tokens would require O(n²) compute—each new token attends to all previous tokens, and you do this 100 times. With KV-cache, only the new token's attention is computed while reusing cached values, making generation O(n) incremental.

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

The KV-cache is why API providers charge differently for input vs. output tokens. Processing your input (the "prefill" phase) is parallel and efficient. Generating output requires sequential forward passes with growing cache—it's inherently slower and more expensive per token.

**What this means for you**: Output tokens typically cost 2-3x more than input tokens. Design your applications accordingly—it's often better to provide more context (input) to get more focused, shorter responses (output).

## Understanding Hallucination

[Hallucination] is perhaps the most important limitation to understand when building AI applications. Models can confidently generate plausible-sounding but completely false information. This happens because the training objective is next-token prediction—optimizing for "what sounds likely to come next" rather than "what is actually true."

During training, the model learned patterns like "The author of [famous book] is [author name]." When asked about a book it wasn't trained on, or when the pattern matching goes wrong, it generates a plausible-sounding author name—because that's what fits the pattern. The model has no internal mechanism for verifying facts against reality.

\`\`\`python
# The model sees patterns like:
# "The author of [Book] is [Author]"
#
# When asked about a book it doesn't know:
# It generates a plausible-sounding author name
# because that's what fits the pattern
\`\`\`

This pseudo-code illustrates the core problem: the model isn't looking up facts in a database, it's pattern-completing based on training data. Even confident, detailed responses may be entirely fabricated.

**Practical mitigations**:
1. **RAG**: Ground responses in retrieved documents—give the model access to verified information
2. **Lower temperature**: Reduce creativity when you need accuracy
3. **Explicit instructions**: Add "If you're not sure, say so" to your system prompt
4. **Self-consistency**: Generate multiple answers at higher temperature, check if they agree
5. **Verification layers**: For critical applications, add fact-checking pipelines

Understanding hallucination changes how you architect AI systems. For applications where accuracy matters (medical, legal, financial), never trust model outputs without verification. Use RAG, cite sources, and implement human review for high-stakes decisions.

## Performance Considerations

Building production AI applications requires understanding the performance characteristics of LLM inference. Three factors dominate: latency (time to response), throughput (requests per second), and cost (dollars per token).

### Latency Components

| Component | Time | Optimization |
|-----------|------|--------------|
| Tokenization | ~1ms | Cached |
| First token | 100-500ms | Speculative decoding |
| Per token | 10-50ms | Batching, quantization |

The "time to first token" (TTFT) is dominated by processing your input prompt. After that, each subsequent token adds 10-50ms depending on model size. A 500-token response might take 5-25 seconds total. This is why streaming matters—users see progress rather than waiting for the complete response.

**Optimization strategies**: Use smaller models when possible. Enable streaming for user-facing applications. Consider speculative decoding (using a small model to draft, large model to verify) for throughput-critical systems.

### Cost Estimation

API costs add up quickly at scale. Understanding the pricing model helps you design cost-efficient systems.

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

Notice that GPT-4 is 20x more expensive than GPT-3.5-turbo. For many tasks—summarization, classification, simple Q&A—the cheaper model works just as well. Reserve expensive models for tasks that genuinely require their capabilities.

**Cost optimization tips**: (1) Use the cheapest model that meets your quality bar. (2) Cache responses when possible—same input should give cached output. (3) Limit max_tokens to prevent verbose responses. (4) Compress conversation history rather than sending full transcripts. (5) Monitor usage and set alerts before you get surprised by bills.

## What's Next

Now that you understand how models work internally—the transformer architecture, tokenization, training objectives, inference mechanics, and key limitations like hallucination—you're ready to learn how to control these models effectively. The next lesson on [prompt engineering] will teach you the techniques for getting exactly the outputs you want.`,

  advanced: `## LLM Architecture: Deep Technical Dive

This lesson provides a rigorous treatment of the mathematical foundations and implementation details underlying large language models. We'll examine attention mechanisms at the linear algebra level, explore the theoretical basis for scaling laws, and understand the optimization techniques that make efficient [inference] possible. This knowledge is essential for researchers pushing the boundaries of AI capabilities and engineers building high-performance AI systems.

The transformer architecture, despite its apparent simplicity, encodes several deep mathematical insights about sequence modeling. Understanding these foundations enables you to reason about model behavior, debug unexpected outputs, and contribute to advancing the field.

## Transformer Architecture Internals

### Multi-Head Self-Attention

The attention mechanism is the computational heart of [transformers]. At its core, attention computes a weighted average of value vectors, where weights are determined by the compatibility between query and key vectors. The mathematical formulation is:

**Attention(Q, K, V) = softmax(QK^T / √d_k) V**

The scaling factor √d_k is crucial and often overlooked. Without it, as embedding dimension increases, the dot products grow in magnitude, pushing softmax into regions of extremely small gradients. This would make training unstable. The 1/√d_k factor ensures that regardless of d_k, the variance of dot products remains approximately 1, keeping gradients well-behaved.

Multi-head attention extends this by running multiple attention operations in parallel with different learned projections. Each "head" can attend to different types of relationships: one head might focus on syntactic dependencies, another on semantic similarity, another on positional proximity. The outputs are concatenated and projected back to the model dimension.

Why does this work so well? The attention mechanism provides a direct path for information to flow between any two positions in the sequence, regardless of distance. In RNNs, information from position 0 must pass through all intermediate positions to reach position 100, degrading along the way. In transformers, position 100 can attend directly to position 0 with a single matrix operation.

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

Key implementation details to note: (1) The view and transpose operations reshape tensors to process all heads in parallel—this is pure efficiency, mathematically equivalent to running n_heads separate attention operations. (2) The causal mask (setting future positions to -inf before softmax) ensures autoregressive property for language modeling—each position can only attend to itself and previous positions. (3) The final W_o projection allows the model to learn how to combine information from different heads.

The computational complexity is O(n²d) where n is sequence length and d is model dimension. The quadratic scaling in sequence length is why [context window] extension is challenging and why innovations like sparse attention, linear attention, and Flash Attention are active research areas.

### Positional Encoding: RoPE

Since attention is permutation-invariant (it doesn't know word order without help), we must inject positional information. The original transformer used fixed sinusoidal encodings, but modern LLMs typically use Rotary Position Embeddings (RoPE), introduced by Su et al. in 2021.

RoPE's key insight is to encode position through rotation in the embedding space. For a position m and embedding dimensions (i, i+1), we rotate by angle m·θ_i where θ_i decreases exponentially with dimension index. This encodes relative position: the dot product between rotated queries and keys depends only on their relative positions, not absolute positions.

The mathematical elegance is that relative position information is naturally incorporated into the attention scores. If query at position m and key at position n are both rotated, their dot product contains a term that depends on (m-n). This makes RoPE inherently better at length generalization—the model learns relationships based on relative distance, which transfers to unseen sequence lengths.

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

The implementation pairs adjacent dimensions and applies 2D rotation. The frequency schedule (10000^(-2i/d)) means lower-indexed dimensions rotate faster, capturing fine-grained position differences, while higher-indexed dimensions rotate slower, capturing broader position information. This multi-scale encoding is analogous to how sinusoidal encodings work but with better extrapolation properties.

**Research context**: RoPE has become the default in modern LLMs (LLaMA, Mistral, Qwen) because it enables training on short sequences and inference on longer ones. Extensions like YaRN (Yet another RoPE extensioN) fine-tune the frequency scaling to push extrapolation even further.

## Tokenization: BPE Implementation

Byte-Pair Encoding is more than an engineering detail—it represents a learned compression scheme that balances vocabulary size, sequence length, and semantic coherence. Understanding BPE explains many model behaviors: why [tokens] split unexpectedly, why multilingual performance varies, and why tokenization affects model capabilities.

The algorithm starts with a character-level vocabulary and iteratively merges the most frequent adjacent pairs. After sufficient iterations, common words become single tokens while rare words remain decomposed. This is optimal in an information-theoretic sense: frequently occurring patterns get shorter codes (single tokens), similar to Huffman coding.

Vocabulary size is a critical hyperparameter. Larger vocabularies (100K+ tokens) mean shorter sequences (good for context efficiency) but more [parameters] in the embedding layer and sparser training signal per token. Smaller vocabularies (32K tokens) mean longer sequences but denser training. The Chinchilla-optimal vocabulary size scales with model size.

Importantly, BPE training is separate from model training. The tokenizer is trained once on a representative corpus, then frozen. This means tokenization quality depends on whether the training corpus matches your use case. Technical text, code, and non-English languages may tokenize poorly if underrepresented in the tokenizer training data.

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

The merge list learned during training defines the tokenization algorithm. At inference time, we apply merges greedily: start with characters, apply each merge rule in order. The </w> end-of-word marker ensures that "token" appearing mid-word is tokenized differently than "token" as a standalone word—important for maintaining word boundaries.

**What to notice**: The greedy nature means tokenization isn't always optimal. Some rare words might be tokenized better with a different merge order. Also, byte-level BPE (used by GPT-2 onwards) starts with bytes rather than characters, ensuring any input can be tokenized (including binary data) at the cost of longer sequences for multibyte characters.

## Training Dynamics

### Loss Function and Gradients

The training objective for language models is [next token prediction] formalized as cross-entropy loss. For each position in the sequence, the model outputs a probability distribution over the vocabulary, and we compute the negative log-probability of the actual next token.

**Loss = -Σ log P(x_t | x_<t)**

This sum is taken over all positions in the training sequence. Minimizing this loss is equivalent to maximizing the likelihood of the training data under the model—classic maximum likelihood estimation.

Label smoothing is a regularization technique that prevents overconfidence. Instead of training the model to put all probability mass on the correct token (hard targets), we redistribute a small amount (typically 10%) uniformly across all tokens. This encourages the model to maintain some uncertainty, improving generalization and reducing [hallucination] tendencies.

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

The implementation shows the mathematical decomposition: label-smoothed loss is a weighted combination of standard cross-entropy (hard targets) and KL divergence to uniform distribution (smoothing term). The mean over -log_probs computes this uniform KL divergence efficiently.

**Practical insight**: Label smoothing of 0.1 is standard but can be tuned. Higher smoothing increases regularization at the cost of training speed. For fine-tuning on small datasets, higher smoothing often helps.

### Chinchilla Scaling Laws

Scaling laws describe how model performance (measured as loss) improves predictably with compute, data, and parameters. The Chinchilla paper (Hoffmann et al., 2022) established that previous models were significantly undertrained—more compute should go to training data, not just model size.

The key finding: **optimal compute allocation scales both parameters and data equally**. For a compute budget C, both optimal parameters N and optimal tokens D scale as C^0.5. This means roughly 20 tokens per parameter is optimal—GPT-3 (175B params, 300B tokens = 1.7 tokens/param) was undertrained by 10x.

These laws emerge from a deeper mathematical relationship: loss scales as a power law in both parameters and data, with no interaction terms. L(N, D) ≈ A/N^α + B/D^β + irreducible_loss. Minimizing total loss for fixed compute gives the Chinchilla-optimal allocation.

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

The constants (0.0057, 20) are empirically fitted to experimental data. The square-root relationship is the theoretical result.

**Research implications**: Scaling laws enable planning large training runs before executing them. You can predict final loss from early training dynamics. However, scaling laws describe loss, not capabilities—emergent abilities like reasoning don't scale smoothly and are harder to predict.

## Inference Optimization

Efficient inference is critical for deploying LLMs in production. The key challenges are memory bandwidth (moving weights from memory to compute) and the sequential nature of autoregressive generation. Several techniques address these bottlenecks.

### KV-Cache with Memory Efficiency

The KV-cache eliminates redundant computation during generation. In naive implementation, generating token n requires recomputing attention over all previous tokens—O(n) work per token, O(n²) total. With KV-cache, we store the key and value projections for all previous tokens, requiring only O(1) new computation per token.

The memory cost is substantial: for each layer, we store K and V tensors of shape (batch, seq, heads, d_k). For a 70B model with 80 layers, 64 heads, and d_k=128, generating a 4K sequence for batch size 1 requires ~40GB just for KV-cache (in fp16). This is often the limiting factor for long-context inference.

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

Pre-allocation avoids memory allocation overhead during generation. The update function efficiently appends new K, V states and returns the full cache for attention computation. In production systems, paged attention (vLLM) manages cache memory more dynamically, enabling longer sequences and higher batch sizes.

**Optimization insight**: KV-cache is why "prefill" (processing input prompt) and "decode" (generating output) have different performance characteristics. Prefill is compute-bound and parallelizable; decode is memory-bandwidth-bound and sequential.

### Speculative Decoding

Speculative decoding accelerates generation by using a small "draft" model to propose multiple tokens, then verifying them with the large "target" model in a single forward pass. This exploits the fact that small models often agree with large models, and verification is parallelizable while drafting is sequential.

The theoretical speedup depends on the acceptance rate α (probability that draft tokens match target distribution). With acceptance rate α and speculation length k, effective tokens per forward pass is k·α/(1-(1-α)^k). For α=0.7 and k=4, this gives ~2x speedup.

The key insight is that rejected tokens still provide information. When the target model rejects a draft token, we can sample from a corrected distribution that guarantees the overall output matches the target model's distribution exactly—no quality degradation.

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

The acceptance probability formula (target_prob / draft_prob) comes from importance sampling theory. When draft_prob > target_prob (draft is overconfident), we reject with probability proportional to the excess. The adjusted sampling for rejected tokens ensures we sample from max(0, target - draft) normalized, recovering the correct distribution.

**Production considerations**: The draft model must be fast (small) and well-calibrated (high acceptance rate). Fine-tuning a small model on the target model's outputs can improve acceptance rates significantly.

### Quantization for Efficiency

Quantization reduces memory and compute by using lower-precision numbers. Full-precision weights are 32-bit floats; inference commonly uses 16-bit; aggressive quantization goes to 8-bit or even 4-bit integers. A 4-bit quantized 70B model fits in ~35GB instead of ~140GB, enabling single-GPU deployment.

The key trade-off is accuracy vs efficiency. Quantization introduces error, but models are surprisingly robust to it—the redundancy in overparameterized networks provides error tolerance. Careful quantization strategies (per-channel scaling, outlier handling) minimize quality degradation.

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

This shows symmetric quantization: we find the maximum absolute value, compute a scale factor, round to integers, and clamp to the representable range. At inference, we dequantize back to float for computation. More sophisticated methods (GPTQ, AWQ, SqueezeLLM) use second-order information and learned scale factors for better accuracy.

**Key insight**: Quantization primarily helps with memory bandwidth, not compute. On modern GPUs, compute is often faster than moving data from memory. Smaller weights mean faster memory transfers, which translates to faster generation.

## [Hallucination] Mitigation at Inference

Hallucination remains one of the most significant challenges in deploying LLMs. At the inference level (post-training), several techniques can reduce but not eliminate hallucinations. Understanding why these work helps in combining them effectively.

### Self-Consistency Checking

Self-consistency leverages the observation that correct answers tend to be more stable across generations while hallucinations vary. By generating multiple responses at moderate temperature and selecting the most consistent one, we filter out "unlucky" samples that drift into hallucination.

The mathematical justification: if the model has a mode at the correct answer and noise around it, higher temperature samples will sometimes hit the correct mode and sometimes miss. The correct answer, being a mode, will appear more frequently across samples. Taking the most representative sample (highest average similarity to others) recovers this mode.

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

The similarity score also serves as a confidence measure—high average similarity suggests the model is confident and consistent, while low similarity indicates uncertainty or multiple possible answers.

**When to use**: Self-consistency adds latency (n parallel generations) and cost (n× tokens). Use it for high-stakes queries where accuracy matters more than speed. The confidence score can trigger human review when low.

## Extending Context with ALiBi

Attention with Linear Biases (ALiBi) enables length extrapolation—training on short sequences but inferring on longer ones. This is valuable because training on long sequences is expensive (O(n²) attention), while inference on long sequences is often necessary.

ALiBi's approach is elegant: instead of adding position information to embeddings (which must be learned for each position), it adds a position-dependent bias directly to attention scores. The bias is linear in position distance and computed, not learned. Since the bias formula generalizes to any position, the model naturally handles unseen lengths.

The per-head slopes form a geometric sequence, giving each head a different "attention span." Heads with steep slopes focus locally (nearby tokens dominate); heads with gentle slopes attend globally (distant tokens remain relevant). This multi-scale structure emerges automatically from the mathematical form.

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

The slope formula (2^(-8/n_heads * i)) ensures the first head has the steepest slope (most local) and the last head has the gentlest (most global). The negative absolute distance means closer tokens always have higher bias, with the rate controlled by slope. At inference, we simply extend the positions array—no retraining required.

**Research context**: ALiBi was superseded by RoPE in most modern models, but understanding both helps when working with different model families. The length extrapolation problem remains active, with solutions like YaRN, LongRoPE, and continued pretraining approaches.

## Further Exploration

The field moves rapidly. Here are key topics for continued learning:

- **Flash Attention**: IO-aware exact attention that reduces memory access, enabling longer sequences and faster training. Essential for any serious LLM work.
- **Mixture of Experts (MoE)**: Sparse activation for efficiency—only a subset of [parameters] activate per token. Enables larger total capacity at fixed inference cost.
- **Constitutional AI (CAI)**: Anthropic's approach to training helpful, harmless, and honest models through AI-generated feedback.
- **RLHF and DPO**: Reinforcement learning from human feedback and Direct Preference Optimization—how models are aligned to human preferences after pretraining.

Each topic deserves deep study. The foundations covered here—attention mechanics, scaling laws, inference optimization—provide the conceptual framework for understanding these advances.`,
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

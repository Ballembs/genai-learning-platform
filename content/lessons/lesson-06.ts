// content/lessons/lesson-06.ts
// Agentic AI Patterns

import type { Term, AdvancedTopic, UserLevel } from '@/types';

export const lesson06Terms: Term[] = [
  {
    id: 'orchestration',
    term: 'Orchestration',
    slug: 'orchestration',
    popup: {
      beginner: {
        explanation: 'Like a conductor leading an orchestra — one system decides which AI handles what task and when.',
        example: 'Your request comes in, the orchestrator decides: "This needs research first, then writing, then review."',
      },
      intermediate: {
        explanation: 'Coordinating multiple AI components through router patterns, pipelines, or parallel execution to accomplish complex tasks.',
        example: 'Router checks intent → dispatches to specialist agent → collects result → routes to next step or returns.',
      },
      advanced: {
        explanation: 'DAG-based orchestration with dynamic routing, state machines, and conditional branching. Frameworks like LangGraph implement graph-based execution.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['routing', 'multi-agent', 'planning'],
    usedInLessons: ['lesson-06'],
  },
  {
    id: 'multi-agent',
    term: 'Multi-Agent',
    slug: 'multi-agent',
    popup: {
      beginner: {
        explanation: 'A team of AI assistants, each with a specialty, working together on one task.',
        example: 'Researcher finds facts → Writer drafts → Editor polishes. Three agents, one great result.',
      },
      intermediate: {
        explanation: 'Multiple specialized agents coordinating via supervisor, peer-to-peer, or debate patterns. Each agent has focused capabilities.',
        example: 'Supervisor agent delegates subtasks → specialist agents execute → supervisor aggregates results.',
      },
      advanced: {
        explanation: 'Communication protocols, consensus mechanisms, and emergent behavior in agent collectives. Frameworks: AutoGen, CrewAI, LangGraph.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['orchestration', 'agent', 'planning'],
    usedInLessons: ['lesson-05', 'lesson-06'],
  },
  {
    id: 'agent-planning',
    term: 'Planning',
    slug: 'agent-planning',
    popup: {
      beginner: {
        explanation: 'AI making a to-do list before starting work. Break the big goal into smaller steps first.',
        example: '"Write a report" becomes: 1) Research topic 2) Outline sections 3) Draft each section 4) Review.',
      },
      intermediate: {
        explanation: 'Task decomposition before execution. Can be explicit (generate full plan) or implicit (ReAct reasoning traces).',
        example: 'Plan-and-execute: planner creates steps → executor runs each → replanner adjusts if needed.',
      },
      advanced: {
        explanation: 'Hierarchical planning, MCTS-inspired approaches, plan verification. Replanning on failure with full context.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['orchestration', 'reasoning', 'agent'],
    usedInLessons: ['lesson-05', 'lesson-06'],
  },
  {
    id: 'guardrails',
    term: 'Guardrails',
    slug: 'guardrails',
    popup: {
      beginner: {
        explanation: 'Bumper lanes in bowling — safety rules that keep the AI from going off track or doing harmful things.',
        example: 'Before sending an email, the guardrail checks: "Is this appropriate? Does it contain secrets?"',
      },
      intermediate: {
        explanation: 'Input/output validation, content filtering, action approval gates. Prevent harmful, off-topic, or unauthorized actions.',
        example: 'Input guardrail → Agent processes → Output guardrail → Action approval gate → Execute or block.',
      },
      advanced: {
        explanation: 'Constitutional AI for agents, formal verification of action safety, sandboxed execution environments, capability-based security.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['human-in-the-loop', 'error-recovery', 'agent'],
    usedInLessons: ['lesson-06'],
  },
  {
    id: 'agentic-rag',
    term: 'Agentic RAG',
    slug: 'agentic-rag',
    popup: {
      beginner: {
        explanation: 'Instead of one simple search, the AI decides the BEST way to find your answer — maybe multiple searches, different sources.',
        example: 'Basic RAG: search once. Agentic RAG: "This is complex, I\'ll search 3 sources and combine them."',
      },
      intermediate: {
        explanation: 'Agent decides retrieval strategy: query routing, multi-step retrieval, self-correcting search, source selection.',
        example: 'Route query → Select optimal retrieval strategy → Execute search(es) → Evaluate quality → Refine if needed.',
      },
      advanced: {
        explanation: 'Adaptive retrieval with iterative refinement, knowledge graph traversal, query decomposition for complex information needs.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['rag', 'routing', 'planning'],
    usedInLessons: ['lesson-04', 'lesson-06'],
  },
  {
    id: 'human-in-the-loop',
    term: 'Human-in-the-Loop',
    slug: 'human-in-the-loop',
    popup: {
      beginner: {
        explanation: 'AI does the work, but asks you before doing anything important or risky.',
        example: '"I\'m about to send this email to 100 people. Should I proceed?" — You approve or reject.',
      },
      intermediate: {
        explanation: 'Approval gates, escalation policies, confidence thresholds. Agent pauses for human review at critical decision points.',
        example: 'Confidence < 0.8 → Ask human. Action = "delete" → Require approval. Cost > $100 → Escalate.',
      },
      advanced: {
        explanation: 'Active learning from human feedback, calibrated uncertainty estimation, dynamic escalation policies based on risk.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['guardrails', 'evaluation', 'agent'],
    usedInLessons: ['lesson-06'],
  },
  {
    id: 'routing',
    term: 'Routing',
    slug: 'routing',
    popup: {
      beginner: {
        explanation: 'Like a receptionist directing calls — simple questions go to a fast model, complex ones go to the expert.',
        example: '"What time is it?" → Fast, cheap model. "Explain quantum computing" → Powerful, expensive model.',
      },
      intermediate: {
        explanation: 'Intent classification, model cascading, cost-aware routing. Direct requests to optimal handler based on complexity.',
        example: 'Classify intent → Select model tier → Route to appropriate agent → Return with cost optimization.',
      },
      advanced: {
        explanation: 'Learned routers trained on task performance, mixture-of-experts at system level, A/B routing for evaluation.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['orchestration', 'multi-agent', 'evaluation'],
    usedInLessons: ['lesson-06'],
  },
  {
    id: 'agent-memory',
    term: 'Agent Memory',
    slug: 'agent-memory',
    popup: {
      beginner: {
        explanation: 'AI having a notebook — short-term notes for the current task, long-term memory for things learned over time.',
        example: 'Short-term: "User asked about Paris hotels." Long-term: "User prefers boutique hotels and dislikes chains."',
      },
      intermediate: {
        explanation: 'Working memory (context window), episodic memory (conversation history), semantic memory (vector store of knowledge).',
        example: 'Current task in context → Retrieve relevant past interactions → Update long-term store with new insights.',
      },
      advanced: {
        explanation: 'Memory consolidation strategies, forgetting mechanisms for relevance, retrieval-augmented memory with compression.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['context-window', 'embeddings', 'rag'],
    usedInLessons: ['lesson-05', 'lesson-06'],
  },
  {
    id: 'evaluation',
    term: 'Evaluation',
    slug: 'evaluation',
    popup: {
      beginner: {
        explanation: 'Grading the AI\'s homework — did it get the right answer? Did it use tools correctly? Did it finish the task?',
        example: 'Test: "Book a flight to Paris." Pass if: flight booked, correct dates, within budget.',
      },
      intermediate: {
        explanation: 'Task success rate, tool use accuracy, trajectory evaluation. Both final outcome and path taken matter.',
        example: 'Metrics: task_success, tool_accuracy, steps_taken, cost, latency, safety_violations.',
      },
      advanced: {
        explanation: 'LLM-as-judge evaluation, trajectory benchmarks (SWE-bench, AgentBench), multi-turn evaluation frameworks.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['agent', 'human-in-the-loop', 'guardrails'],
    usedInLessons: ['lesson-06'],
  },
  {
    id: 'error-recovery',
    term: 'Error Recovery',
    slug: 'error-recovery',
    popup: {
      beginner: {
        explanation: 'When Plan A fails, the AI tries Plan B instead of giving up.',
        example: 'Search tool fails → Try different search query. Still fails → Ask user for help.',
      },
      intermediate: {
        explanation: 'Retry strategies with backoff, fallback chains, self-correction loops. Graceful degradation over hard failure.',
        example: 'Try action → On error: retry with fix → On repeated failure: fallback tool → Last resort: escalate.',
      },
      advanced: {
        explanation: 'Backtracking in plan execution, graceful degradation patterns, circuit breakers, LLM-assisted error diagnosis.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['guardrails', 'planning', 'agent'],
    usedInLessons: ['lesson-06'],
  },
];

export const lesson06AdvancedTopics: AdvancedTopic[] = [
  {
    id: 'langgraph-patterns',
    title: 'LangGraph & State Machines',
    description: 'Graph-based agent orchestration with cycles and conditional edges',
    difficulty: 'advanced',
    prerequisites: ['orchestration', 'agent-planning'],
    hasDeepDive: true,
  },
  {
    id: 'agent-communication',
    title: 'Agent Communication Protocols',
    description: 'How agents share information, negotiate, and reach consensus',
    difficulty: 'advanced',
    prerequisites: ['multi-agent'],
    hasDeepDive: true,
  },
  {
    id: 'cost-optimization',
    title: 'Cost Optimization for Agent Systems',
    description: 'Model cascading, caching, and efficient tool use at scale',
    difficulty: 'intermediate',
    prerequisites: ['routing', 'orchestration'],
    hasDeepDive: true,
  },
  {
    id: 'agent-security',
    title: 'Agent Security & Prompt Injection',
    description: 'Protecting multi-agent systems from adversarial attacks',
    difficulty: 'advanced',
    prerequisites: ['guardrails', 'multi-agent'],
    hasDeepDive: true,
  },
];

export const lesson06Content: Record<UserLevel, string> = {
  beginner: `## Beyond Single Agents

In Lesson 5, you learned how ONE agent works — it thinks, uses tools, and gets things done. But real AI systems use multiple agents, smart routing, and safety layers.

> **The Company Analogy**
>
> A single agent is like a solo freelancer. Agentic AI patterns are like building a company —
> you need managers, specialists, quality control, and processes. No one person does everything.

## [Orchestration]: Who's in Charge?

When you have multiple AI components, someone needs to coordinate them. That's [orchestration] — deciding which AI handles what task and when.

Think of a conductor leading an orchestra. The conductor doesn't play every instrument — they decide when each section plays and how loud.

### Pattern 1: The Router

The simplest orchestration pattern. One AI looks at your request and decides who should handle it.

\`\`\`mermaid
flowchart TD
    A[Your Request] --> B[Router Agent]
    B -->|Simple question| C[Fast Model]
    B -->|Complex task| D[Expert Model]
    B -->|Code needed| E[Code Agent]
    C --> F[Response]
    D --> F
    E --> F
\`\`\`

**Example:**
- "What's 2+2?" → Fast model (quick, cheap)
- "Explain quantum entanglement" → Expert model (thorough, accurate)
- "Write a Python function" → Code agent (specialized)

### Pattern 2: The Pipeline

Each agent does one step, then passes to the next. Like an assembly line.

\`\`\`mermaid
flowchart LR
    A[Research Agent] --> B[Writer Agent]
    B --> C[Editor Agent]
    C --> D[Final Output]
\`\`\`

**Example - Writing an article:**
1. Research Agent: Finds facts and sources
2. Writer Agent: Drafts the article
3. Editor Agent: Polishes and fact-checks

Each agent is an expert at ONE thing.

### Pattern 3: The Parallel

Multiple agents work at the same time on different parts of the problem.

\`\`\`mermaid
flowchart TD
    A[Task] --> B[Orchestrator]
    B --> C[Agent 1]
    B --> D[Agent 2]
    B --> E[Agent 3]
    C --> F[Combine Results]
    D --> F
    E --> F
\`\`\`

**Example - Research task:**
- Agent 1: Search academic papers
- Agent 2: Search news articles
- Agent 3: Search company websites
- All work simultaneously, then combine findings

## [Multi-Agent] Systems: The Dream Team

Why have one agent do everything when you can have a team of specialists?

| Single Agent | Multi-Agent Team |
|--------------|------------------|
| Jack of all trades | Expert specialists |
| Long, complex prompt | Focused, simple prompts |
| Hard to debug | Easy to trace issues |
| One point of failure | Redundancy and fallbacks |

### The Supervisor Pattern

One boss agent, multiple worker agents.

\`\`\`mermaid
flowchart TD
    A[Supervisor Agent] --> B[Research Agent]
    A --> C[Writing Agent]
    A --> D[Review Agent]
    B -->|Results| A
    C -->|Draft| A
    D -->|Feedback| A
    A --> E[Final Answer]
\`\`\`

The supervisor:
1. Breaks down the task
2. Assigns work to specialists
3. Collects and combines results
4. Decides if more work is needed

**Real example:**
You ask: "Create a marketing plan for a new coffee shop"

Supervisor thinks:
- "I need market research" → Research Agent
- "I need strategy ideas" → Strategy Agent
- "I need the final document" → Writing Agent
- "I need quality check" → Review Agent

### The Debate Pattern

Agents argue and reach consensus. Different perspectives lead to better answers.

\`\`\`mermaid
flowchart TD
    A[Question] --> B[Agent 1: View A]
    A --> C[Agent 2: View B]
    B --> D[Debate/Compare]
    C --> D
    D --> E[Judge Agent]
    E --> F[Final Answer]
\`\`\`

**Example:**
Question: "Should we use microservices or a monolith?"

- Agent 1 argues FOR microservices
- Agent 2 argues FOR monolith
- Judge Agent weighs both sides
- Final answer includes nuanced trade-offs

This catches blind spots a single agent might miss!

## [Planning]: Think Before You Act

Remember [ReAct] from Lesson 5? Think → Act → Observe. [Planning] takes this further — make the WHOLE plan before acting.

**Without planning:**
"Write a research paper" → Agent starts writing immediately → realizes it doesn't have enough info → goes back → gets confused → mess

**With planning:**
"Write a research paper" →

\`\`\`mermaid
flowchart TD
    A[Create Outline] --> B[Research Section 1]
    B --> C[Research Section 2]
    C --> D[Research Section 3]
    D --> E[Write Draft]
    E --> F[Review & Edit]
    F --> G[Final Paper]
\`\`\`

The agent knows ALL the steps before starting. If step 3 fails, it can adjust the plan.

### Why Planning Matters

| Without Planning | With Planning |
|-----------------|---------------|
| Gets lost on complex tasks | Clear roadmap |
| Repeats work | Efficient execution |
| Hard to recover from errors | Can adjust and replan |
| No progress visibility | "I'm on step 3 of 7" |

## [Routing]: The Smart Receptionist

Not every question needs the smartest (and most expensive) AI. [Routing] directs each request to the right handler.

\`\`\`mermaid
flowchart TD
    A[Request] --> B{Router}
    B -->|Easy| C[GPT-3.5 - Fast & Cheap]
    B -->|Medium| D[GPT-4 - Balanced]
    B -->|Hard| E[Claude Opus - Best Quality]
    B -->|Code| F[Code Specialist]
    B -->|Math| G[Math Specialist]
\`\`\`

**Benefits:**
- **Cost savings**: Simple questions don't need expensive models
- **Speed**: Fast models for quick answers
- **Quality**: Best models for important tasks

**Example routing rules:**
| Request Type | Route To | Why |
|--------------|----------|-----|
| "What time is it?" | Fast model | Simple fact lookup |
| "Summarize this article" | Medium model | Needs comprehension |
| "Debug this complex code" | Code specialist | Needs expertise |
| "Write legal contract" | Best model + human review | High stakes |

## [Agentic RAG]: Smarter Search

In Lesson 4, you learned [RAG] — search your documents, add to context, get answers. [Agentic RAG] makes the search itself intelligent.

| Basic RAG (Lesson 4) | Agentic RAG |
|---------------------|-------------|
| One search, one answer | Multiple searches if needed |
| You write the search query | AI writes optimal queries |
| Single knowledge source | Routes to best source |
| Fixed retrieval strategy | Adapts strategy to question |

\`\`\`mermaid
flowchart TD
    A[Complex Question] --> B[Agent Analyzes]
    B --> C{What sources needed?}
    C -->|Technical| D[Search Docs]
    C -->|Recent| E[Search News]
    C -->|Multiple| F[Search Both]
    D --> G[Evaluate Results]
    E --> G
    F --> G
    G -->|Good enough?| H{Quality Check}
    H -->|No| I[Refine Search]
    I --> C
    H -->|Yes| J[Generate Answer]
\`\`\`

**Example:**
Question: "What's the latest on our competitor's AI product?"

Basic RAG: Searches docs once → Might miss recent news

Agentic RAG:
1. "This needs recent info" → Searches news
2. "Also need our internal competitive analysis" → Searches docs
3. "Results don't mention pricing" → Searches again with focus
4. Combines all sources → Complete answer

## [Guardrails]: Keeping AI Safe

Agents can take actions. Actions can cause problems. [Guardrails] prevent bad outcomes.

> **The Bumper Lane Analogy**
>
> In bowling, bumper lanes keep your ball from going in the gutter.
> Guardrails keep your AI from doing harmful or unauthorized things.

### Types of Guardrails

**Input Guardrails** — Check requests BEFORE processing
- Block malicious prompts
- Filter inappropriate content
- Validate user permissions

**Output Guardrails** — Check results BEFORE returning
- Scan for sensitive data leaks
- Verify factual accuracy
- Ensure appropriate tone

**Action Guardrails** — Check actions BEFORE executing
- Require approval for sensitive actions
- Block dangerous operations
- Enforce spending limits

\`\`\`mermaid
flowchart LR
    A[User Request] --> B[Input Guardrail]
    B -->|Safe| C[Agent Processing]
    B -->|Blocked| D[Reject Request]
    C --> E[Output Guardrail]
    E -->|Safe| F[Return to User]
    E -->|Blocked| G[Filter/Rewrite]
\`\`\`

### Guardrail Examples

| Guardrail | What It Catches | Action |
|-----------|-----------------|--------|
| PII Filter | Social security numbers | Redact before output |
| Content Filter | Harmful content | Block generation |
| Action Approval | Delete all files | Require human OK |
| Budget Limit | API costs > $100 | Pause and alert |
| Scope Check | Off-topic requests | Redirect or refuse |

## [Human-in-the-Loop]: The Safety Net

Sometimes AI shouldn't act alone. [Human-in-the-loop] means asking a human at key moments.

\`\`\`mermaid
flowchart TD
    A[Agent Working] --> B{High-Risk Action?}
    B -->|No| C[Continue Automatically]
    B -->|Yes| D[Ask Human]
    D -->|Approved| C
    D -->|Rejected| E[Stop or Revise]
\`\`\`

### When to Involve Humans

| Situation | Example | Why |
|-----------|---------|-----|
| **Irreversible actions** | Deleting data | Can't undo |
| **High cost** | Expensive API calls | Budget control |
| **External communication** | Sending emails | Reputation risk |
| **Legal/compliance** | Contract changes | Liability |
| **Low confidence** | Agent is unsure | Better safe |

**Example workflow:**

Agent task: "Send weekly report to clients"

1. Agent drafts report ✓ (automatic)
2. Agent reviews data ✓ (automatic)
3. Agent sends to 500 clients → **PAUSE** → Human reviews → Approved → Send

## [Agent Memory]: Remembering What Matters

Good agents remember things. [Agent memory] has two types:

### Short-Term Memory
What's happening RIGHT NOW in this conversation.

- Current task details
- Recent tool results
- Conversation history

This fits in the [context window] — the AI's "working memory."

### Long-Term Memory
What the agent has learned OVER TIME.

- User preferences
- Past successful approaches
- Facts discovered in previous sessions

This is stored externally and retrieved when relevant (like [RAG]!).

\`\`\`mermaid
flowchart TD
    A[New Request] --> B[Agent]
    B --> C[Check Short-Term Memory]
    B --> D[Query Long-Term Memory]
    C --> E[Current Context]
    D --> F[Relevant Past Info]
    E --> G[Process with Full Context]
    F --> G
    G --> H[Response]
    G --> I[Update Long-Term Memory]
\`\`\`

**Example:**
User: "Book me a hotel like last time"

- Short-term: Knows you're planning a Paris trip (this conversation)
- Long-term: Knows you prefer boutique hotels, need late checkout (past interactions)

Agent combines both → Books perfect hotel

## [Error Recovery]: When Things Go Wrong

Tools fail. APIs timeout. Plans don't work. Good agents handle failure gracefully.

### The Retry Strategy

\`\`\`mermaid
flowchart TD
    A[Try Action] --> B{Success?}
    B -->|Yes| C[Continue]
    B -->|No| D[Analyze Error]
    D --> E{Retryable?}
    E -->|Yes| F[Wait & Retry]
    F --> A
    E -->|No| G[Try Alternative]
    G --> H{Alternative works?}
    H -->|Yes| C
    H -->|No| I[Ask Human for Help]
\`\`\`

### Error Recovery Examples

| Error | Recovery |
|-------|----------|
| Search API down | Try alternative search |
| Rate limited | Wait and retry |
| Wrong tool output | Try different parameters |
| Plan step fails | Replan remaining steps |
| Completely stuck | Explain situation to human |

**Key principle:** Never just give up. Always have a fallback.

## [Evaluation]: Did It Actually Work?

How do you know if your agent system is good? [Evaluation] answers this.

### What to Measure

| Metric | Question | Good Sign |
|--------|----------|-----------|
| **Task Success** | Did it complete the goal? | >90% success rate |
| **Tool Accuracy** | Did it use tools correctly? | Minimal wrong tool calls |
| **Efficiency** | How many steps? | Fewer is better |
| **Cost** | How much did it cost? | Within budget |
| **Safety** | Any bad outputs? | Zero violations |
| **Latency** | How fast? | User doesn't wait too long |

### Testing Your Agents

1. **Unit tests**: Does each agent work alone?
2. **Integration tests**: Do agents work together?
3. **End-to-end tests**: Does the whole system solve real tasks?
4. **Edge cases**: What happens with weird inputs?

## Putting It All Together

Here's how a production AI system combines these patterns:

\`\`\`mermaid
flowchart TD
    A[User Request] --> B[Input Guardrail]
    B --> C[Router]
    C -->|Simple| D[Fast Agent]
    C -->|Complex| E[Orchestrator]
    E --> F[Planner Agent]
    F --> G[Worker Agents]
    G --> H[Agentic RAG]
    H --> I[Results]
    I --> J[Output Guardrail]
    J --> K{Safe?}
    K -->|Yes| L[Response]
    K -->|No| M[Filter & Retry]
    D --> J
\`\`\`

**The flow:**
1. **Guardrail** checks request is safe
2. **Router** decides: simple or complex?
3. **Orchestrator** coordinates multiple agents
4. **Planner** creates the action plan
5. **Workers** execute specialized tasks
6. **Agentic RAG** retrieves information intelligently
7. **Guardrail** checks response is safe
8. **Human review** if needed
9. **User** gets result

## Key Takeaways

- [Orchestration] coordinates multiple AI components like a conductor
- [Multi-agent] systems use specialized agents working together
- [Planning] creates a roadmap before executing complex tasks
- [Routing] directs requests to the optimal handler
- [Agentic RAG] makes retrieval itself intelligent
- [Guardrails] prevent bad outputs and dangerous actions
- [Human-in-the-loop] keeps humans in control for important decisions
- [Agent memory] enables learning from past interactions
- [Error recovery] handles failures gracefully
- [Evaluation] measures whether the system actually works

You've now completed the full journey — from how AI generates text to building production-grade AI systems!`,

  intermediate: `## Architecting AI Agent Systems

This lesson covers the design patterns for production AI agents — [orchestration], [multi-agent] coordination, [planning] strategies, [guardrails], and [evaluation] frameworks. While Lesson 5 focused on building individual agents with tools and ReAct patterns, this lesson addresses the architectural question: how do you combine multiple agents and components into reliable systems?

The fundamental insight is that agent systems are distributed systems. They face coordination challenges, partial failures, and state management complexity. The patterns in this lesson draw from both distributed systems engineering and the emerging best practices from the AI research community.

## [Orchestration] Patterns

[Orchestration] is the coordination layer that decides which components handle which parts of a task. Three primary patterns dominate production systems.

### Pattern 1: Router-Based Orchestration

The router examines incoming requests and dispatches to the appropriate handler. This is the simplest orchestration pattern but surprisingly powerful.

\`\`\`mermaid
flowchart TD
    A[Request] --> B[Router/Classifier]
    B -->|intent: qa| C[QA Agent]
    B -->|intent: code| D[Code Agent]
    B -->|intent: research| E[Research Agent]
    B -->|intent: creative| F[Creative Agent]
    C --> G[Response]
    D --> G
    E --> G
    F --> G
\`\`\`

**Implementation:**

\`\`\`typescript
interface RouterConfig {
  classifier: LLM | Classifier;
  routes: Map<string, Agent>;
  fallback: Agent;
}

async function routeRequest(request: string, config: RouterConfig) {
  // Classify intent
  const intent = await config.classifier.classify(request);

  // Route to appropriate agent
  const agent = config.routes.get(intent) ?? config.fallback;

  return agent.run(request);
}
\`\`\`

**Key considerations:**
- Classification accuracy determines overall system quality
- Consider confidence thresholds — low confidence might route to fallback or human
- Log routing decisions for debugging and optimization

### Pattern 2: Pipeline Orchestration

Sequential processing where each stage transforms or enriches the input.

\`\`\`mermaid
flowchart LR
    A[Input] --> B[Stage 1: Extract]
    B --> C[Stage 2: Enrich]
    C --> D[Stage 3: Transform]
    D --> E[Stage 4: Validate]
    E --> F[Output]
\`\`\`

**Implementation:**

\`\`\`typescript
type PipelineStage = (input: any, context: Context) => Promise<any>;

class Pipeline {
  private stages: PipelineStage[] = [];

  addStage(stage: PipelineStage): this {
    this.stages.push(stage);
    return this;
  }

  async execute(input: any): Promise<any> {
    const context = new Context();
    let current = input;

    for (const stage of this.stages) {
      current = await stage(current, context);
      context.addStageResult(current);
    }

    return current;
  }
}

// Usage
const pipeline = new Pipeline()
  .addStage(extractEntities)
  .addStage(enrichWithKnowledge)
  .addStage(generateResponse)
  .addStage(validateOutput);
\`\`\`

### Pattern 3: DAG-Based Orchestration

Directed acyclic graphs enable complex workflows with parallel execution and conditional branching. This is what frameworks like LangGraph implement.

\`\`\`mermaid
flowchart TD
    A[Start] --> B[Analyze]
    B --> C{Complex?}
    C -->|Yes| D[Research]
    C -->|Yes| E[Plan]
    C -->|No| F[Simple Response]
    D --> G[Synthesize]
    E --> G
    G --> H[Review]
    H --> I{Quality OK?}
    I -->|Yes| J[Output]
    I -->|No| D
    F --> J
\`\`\`

**Key advantages:**
- Parallel execution where dependencies allow
- Conditional branching based on intermediate results
- Cycles enable iterative refinement (with termination conditions)
- Clear visualization of system behavior

\`\`\`typescript
interface Node {
  id: string;
  execute: (state: State) => Promise<State>;
  next: (state: State) => string | string[];  // Next node(s)
}

class DAGOrchestrator {
  private nodes: Map<string, Node> = new Map();

  async run(startNode: string, initialState: State): Promise<State> {
    let currentNodes = [startNode];
    let state = initialState;

    while (currentNodes.length > 0) {
      // Execute current nodes (potentially in parallel)
      const results = await Promise.all(
        currentNodes.map(nodeId => {
          const node = this.nodes.get(nodeId)!;
          return node.execute(state);
        })
      );

      // Merge results
      state = this.mergeStates(results);

      // Determine next nodes
      currentNodes = this.getNextNodes(currentNodes, state);

      // Check termination
      if (this.shouldTerminate(state)) break;
    }

    return state;
  }
}
\`\`\`

## [Multi-Agent] Architectures

When tasks exceed what a single agent can handle, [multi-agent] systems distribute work across specialized agents. The key architectural decisions are communication topology and coordination mechanism.

### Supervisor Pattern

A supervisor agent breaks down tasks, delegates to workers, and aggregates results.

\`\`\`mermaid
flowchart TD
    A[Goal] --> B[Supervisor]
    B -->|Subtask 1| C[Research Agent]
    B -->|Subtask 2| D[Analysis Agent]
    B -->|Subtask 3| E[Writing Agent]
    C -->|Result| B
    D -->|Result| B
    E -->|Result| B
    B --> F[Final Output]
\`\`\`

**Implementation:**

\`\`\`typescript
class SupervisorAgent {
  private workers: Map<string, Agent>;
  private planner: LLM;

  async run(goal: string): Promise<string> {
    // Plan subtasks
    const plan = await this.planner.generate(\`
      Break down this goal into subtasks for specialists:
      Goal: \${goal}

      Available specialists: \${[...this.workers.keys()].join(', ')}

      Output JSON: { "tasks": [{ "specialist": "...", "task": "..." }] }
    \`);

    const subtasks = JSON.parse(plan).tasks;

    // Execute subtasks (parallel where possible)
    const results = await Promise.all(
      subtasks.map(async (subtask: any) => {
        const worker = this.workers.get(subtask.specialist);
        if (!worker) throw new Error(\`Unknown specialist: \${subtask.specialist}\`);
        return {
          specialist: subtask.specialist,
          result: await worker.run(subtask.task)
        };
      })
    );

    // Synthesize results
    return this.synthesize(goal, results);
  }

  private async synthesize(goal: string, results: any[]): Promise<string> {
    return this.planner.generate(\`
      Original goal: \${goal}

      Results from specialists:
      \${results.map(r => \`\${r.specialist}: \${r.result}\`).join('\\n\\n')}

      Synthesize a final response that integrates all specialist contributions.
    \`);
  }
}
\`\`\`

### Debate Pattern

Multiple agents argue different positions; a judge synthesizes the best answer.

\`\`\`mermaid
flowchart TD
    A[Question] --> B[Proponent Agent]
    A --> C[Opponent Agent]
    B -->|Argument FOR| D[Debate]
    C -->|Argument AGAINST| D
    D --> E[Round 2...]
    E --> F[Judge Agent]
    F --> G[Final Decision]
\`\`\`

**Use cases:**
- Complex decisions with trade-offs
- Risk assessment (optimist vs pessimist)
- Code review (author vs reviewer)
- Research synthesis (multiple perspectives)

\`\`\`typescript
class DebateSystem {
  async debate(question: string, rounds: number = 2): Promise<string> {
    let transcript: string[] = [];

    for (let i = 0; i < rounds; i++) {
      const proArg = await this.proponent.argue(question, transcript);
      transcript.push(\`PRO: \${proArg}\`);

      const conArg = await this.opponent.argue(question, transcript);
      transcript.push(\`CON: \${conArg}\`);
    }

    return this.judge.decide(question, transcript);
  }
}
\`\`\`

### Peer-to-Peer Pattern

Agents communicate directly without a central coordinator. More flexible but harder to debug.

\`\`\`mermaid
flowchart TD
    A[Agent A] <-->|Messages| B[Agent B]
    B <-->|Messages| C[Agent C]
    A <-->|Messages| C
    A <-->|Messages| D[Agent D]
    B <-->|Messages| D
    C <-->|Messages| D
\`\`\`

**Communication primitives:**
- Request/Response
- Broadcast (to all agents)
- Publish/Subscribe (topic-based)

## [Planning] Strategies

Explicit [planning] separates "what to do" from "doing it." This decomposition improves reliability for complex tasks.

### Plan-and-Execute

Generate a complete plan upfront, then execute sequentially.

\`\`\`mermaid
flowchart TD
    A[Goal] --> B[Planner]
    B --> C[Plan: Step 1, 2, 3...]
    C --> D[Execute Step 1]
    D --> E[Execute Step 2]
    E --> F[Execute Step 3]
    F --> G{All done?}
    G -->|Yes| H[Output]
    G -->|No, replan needed| B
\`\`\`

\`\`\`typescript
class PlanAndExecuteAgent {
  async run(goal: string): Promise<string> {
    // Generate plan
    let plan = await this.planner.createPlan(goal);
    let results: any[] = [];

    while (plan.steps.length > 0) {
      const step = plan.steps.shift()!;

      try {
        const result = await this.executor.execute(step, results);
        results.push({ step, result, success: true });
      } catch (error) {
        results.push({ step, error, success: false });

        // Replan with remaining steps and error context
        plan = await this.planner.replan(goal, plan.steps, results);
      }
    }

    return this.synthesize(goal, results);
  }
}
\`\`\`

### Hierarchical Planning

Break complex goals into subgoals, then sub-subgoals, recursively.

\`\`\`mermaid
flowchart TD
    A[High-Level Goal] --> B[Subgoal 1]
    A --> C[Subgoal 2]
    B --> D[Task 1.1]
    B --> E[Task 1.2]
    C --> F[Task 2.1]
    C --> G[Task 2.2]
    C --> H[Task 2.3]
\`\`\`

**Benefits:**
- Manages complexity through decomposition
- Enables parallel execution at each level
- Natural checkpoints for progress tracking

## [Routing] for Efficiency

Not every request needs your most capable (and expensive) model. [Routing] optimizes the capability/cost trade-off.

### Model Cascading

Start with fast/cheap, escalate if needed.

\`\`\`mermaid
flowchart TD
    A[Request] --> B[Tier 1: Fast Model]
    B --> C{Confident?}
    C -->|Yes| D[Return Response]
    C -->|No| E[Tier 2: Better Model]
    E --> F{Confident?}
    F -->|Yes| D
    F -->|No| G[Tier 3: Best Model]
    G --> D
\`\`\`

\`\`\`typescript
interface ModelTier {
  model: LLM;
  confidenceThreshold: number;
  costPerToken: number;
}

async function cascadeRoute(
  request: string,
  tiers: ModelTier[]
): Promise<{ response: string; tier: number; cost: number }> {
  for (let i = 0; i < tiers.length; i++) {
    const { model, confidenceThreshold } = tiers[i];

    const result = await model.generateWithConfidence(request);

    if (result.confidence >= confidenceThreshold || i === tiers.length - 1) {
      return {
        response: result.text,
        tier: i,
        cost: calculateCost(result.tokens, tiers[i].costPerToken)
      };
    }
  }

  throw new Error('No model returned result');
}
\`\`\`

### Intent-Based Routing

Different intents route to specialized models/agents.

| Intent | Route To | Rationale |
|--------|----------|-----------|
| Simple QA | Small model | Fast, cheap |
| Code generation | Code-tuned model | Specialized capability |
| Reasoning | Large model with CoT | Needs sophistication |
| Creative writing | Creative-tuned model | Style matters |
| Math | Calculator + small model | Tools over capability |

## [Agentic RAG] Patterns

[Agentic RAG] upgrades retrieval from a fixed step to an intelligent subprocess.

\`\`\`mermaid
flowchart TD
    A[Complex Query] --> B[Query Analyzer]
    B --> C{Single or Multi-part?}
    C -->|Single| D[Direct Retrieval]
    C -->|Multi-part| E[Decompose Query]
    E --> F[Retrieve Part 1]
    E --> G[Retrieve Part 2]
    E --> H[Retrieve Part 3]
    F --> I[Merge Results]
    G --> I
    H --> I
    D --> I
    I --> J{Quality Check}
    J -->|Good| K[Generate Answer]
    J -->|Insufficient| L[Reformulate & Retry]
    L --> B
\`\`\`

### Key Capabilities

**Query Routing:** Direct different query types to appropriate indexes.

\`\`\`typescript
async function routeQuery(query: string): Promise<RetrievalResult> {
  const queryType = await classifyQuery(query);

  switch (queryType) {
    case 'factual':
      return searchKnowledgeBase(query);
    case 'recent':
      return searchNewsIndex(query);
    case 'code':
      return searchCodebase(query);
    case 'hybrid':
      return mergeResults([
        searchKnowledgeBase(query),
        searchNewsIndex(query)
      ]);
  }
}
\`\`\`

**Self-Correcting Retrieval:** Evaluate result quality and retry if needed.

\`\`\`typescript
async function retrieveWithCorrection(
  query: string,
  maxAttempts: number = 3
): Promise<Document[]> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const docs = await retrieve(query);

    const quality = await evaluateRelevance(query, docs);

    if (quality.score > 0.7) {
      return docs;
    }

    // Refine query based on feedback
    query = await refineQuery(query, quality.feedback);
  }

  return []; // Or throw
}
\`\`\`

**Multi-Step Retrieval:** For questions requiring information synthesis.

\`\`\`typescript
async function multiStepRetrieval(complexQuery: string): Promise<Document[]> {
  // Step 1: Break down query
  const subqueries = await decomposeQuery(complexQuery);

  // Step 2: Retrieve for each subquery
  const results = await Promise.all(
    subqueries.map(sq => retrieve(sq))
  );

  // Step 3: Deduplicate and rank
  return rankAndDedupe(results.flat());
}
\`\`\`

## [Guardrails] Implementation

[Guardrails] are safety mechanisms that constrain agent behavior. They operate at input, output, and action levels.

### Input Guardrails

\`\`\`typescript
interface InputGuardrail {
  check(input: string): Promise<{
    allowed: boolean;
    reason?: string;
    modified?: string;  // Sanitized version
  }>;
}

const promptInjectionGuardrail: InputGuardrail = {
  async check(input: string) {
    const suspicious = await detectPromptInjection(input);

    if (suspicious.score > 0.8) {
      return {
        allowed: false,
        reason: 'Potential prompt injection detected'
      };
    }

    return { allowed: true };
  }
};

const piiGuardrail: InputGuardrail = {
  async check(input: string) {
    const piiFound = detectPII(input);

    if (piiFound.length > 0) {
      return {
        allowed: true,
        modified: redactPII(input, piiFound)
      };
    }

    return { allowed: true };
  }
};
\`\`\`

### Output Guardrails

\`\`\`typescript
interface OutputGuardrail {
  check(output: string, context: Context): Promise<{
    allowed: boolean;
    reason?: string;
    modified?: string;
  }>;
}

const contentFilterGuardrail: OutputGuardrail = {
  async check(output: string) {
    const safety = await moderateContent(output);

    if (!safety.safe) {
      return {
        allowed: false,
        reason: safety.categories.join(', ')
      };
    }

    return { allowed: true };
  }
};
\`\`\`

### Action Guardrails

\`\`\`typescript
interface ActionGuardrail {
  check(action: Action, context: Context): Promise<{
    allowed: boolean;
    requiresApproval: boolean;
    reason?: string;
  }>;
}

const sensitiveActionGuardrail: ActionGuardrail = {
  async check(action: Action, context: Context) {
    const risk = assessActionRisk(action);

    if (risk.level === 'high') {
      return {
        allowed: true,
        requiresApproval: true,
        reason: \`High-risk action: \${risk.description}\`
      };
    }

    if (risk.level === 'critical') {
      return {
        allowed: false,
        requiresApproval: false,
        reason: 'Action blocked by policy'
      };
    }

    return { allowed: true, requiresApproval: false };
  }
};
\`\`\`

## [Human-in-the-Loop] Patterns

### Approval Gates

\`\`\`typescript
class ApprovalGate {
  async requestApproval(
    action: Action,
    context: Context
  ): Promise<'approved' | 'rejected' | 'modified'> {
    // Send to approval queue
    const ticket = await this.queue.submit({
      action,
      context,
      requestedAt: new Date(),
      urgency: this.assessUrgency(action)
    });

    // Wait for human response (with timeout)
    const response = await this.queue.waitForResponse(ticket, {
      timeout: action.urgency === 'high' ? '5m' : '24h'
    });

    return response.decision;
  }
}
\`\`\`

### Confidence-Based Escalation

\`\`\`typescript
async function processWithEscalation(
  task: Task,
  agent: Agent,
  confidenceThreshold: number = 0.8
): Promise<Result> {
  const result = await agent.runWithConfidence(task);

  if (result.confidence < confidenceThreshold) {
    // Escalate to human
    return await escalateToHuman(task, result, {
      reason: 'Low confidence',
      confidence: result.confidence,
      agentOutput: result.output
    });
  }

  return result;
}
\`\`\`

## [Agent Memory] Systems

### Working Memory (Context Window)

\`\`\`typescript
class WorkingMemory {
  private messages: Message[] = [];
  private maxTokens: number;

  add(message: Message): void {
    this.messages.push(message);
    this.compress();
  }

  private compress(): void {
    while (this.tokenCount() > this.maxTokens) {
      // Strategy: Summarize oldest messages
      const oldMessages = this.messages.splice(0, 5);
      const summary = await summarize(oldMessages);
      this.messages.unshift({
        role: 'system',
        content: \`Previous context summary: \${summary}\`
      });
    }
  }

  getContext(): Message[] {
    return this.messages;
  }
}
\`\`\`

### Long-Term Memory (Vector Store)

\`\`\`typescript
class LongTermMemory {
  private vectorStore: VectorStore;

  async store(memory: string, metadata: MemoryMetadata): Promise<void> {
    const embedding = await embed(memory);
    await this.vectorStore.upsert({
      id: generateId(),
      vector: embedding,
      metadata: {
        ...metadata,
        timestamp: Date.now(),
        accessCount: 0
      }
    });
  }

  async recall(query: string, k: number = 5): Promise<Memory[]> {
    const queryEmbedding = await embed(query);
    const results = await this.vectorStore.search(queryEmbedding, k);

    // Update access counts (for importance ranking)
    await this.updateAccessCounts(results.map(r => r.id));

    return results.map(r => ({
      content: r.metadata.content,
      relevance: r.score,
      age: Date.now() - r.metadata.timestamp
    }));
  }
}
\`\`\`

## [Error Recovery] Patterns

### Retry with Backoff

\`\`\`typescript
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries: number;
    baseDelay: number;
    maxDelay: number;
  }
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt < options.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (!isRetryable(error)) throw error;

      const delay = Math.min(
        options.baseDelay * Math.pow(2, attempt),
        options.maxDelay
      );

      await sleep(delay);
    }
  }

  throw lastError!;
}
\`\`\`

### LLM-Assisted Recovery

\`\`\`typescript
async function recoverFromError(
  error: Error,
  action: Action,
  context: Context
): Promise<Action | null> {
  const diagnosis = await diagnoseError(error, action, context);

  if (diagnosis.recoverable) {
    const fixedAction = await suggestFix(action, diagnosis);
    return fixedAction;
  }

  if (diagnosis.alternativeApproach) {
    return diagnosis.alternativeApproach;
  }

  return null; // Escalate to human
}
\`\`\`

## [Evaluation] Framework

### Task-Level Evaluation

\`\`\`typescript
interface TaskEvaluation {
  taskSuccess: boolean;
  toolAccuracy: number;      // Correct tool calls / total calls
  efficiency: number;        // 1 / steps taken
  cost: number;              // Total API/tool costs
  latency: number;           // Time to completion
  safetyViolations: number;  // Count of guardrail triggers
}

async function evaluateAgentRun(
  trace: AgentTrace
): Promise<TaskEvaluation> {
  return {
    taskSuccess: await judgeTaskCompletion(trace),
    toolAccuracy: calculateToolAccuracy(trace.toolCalls),
    efficiency: 1 / trace.steps.length,
    cost: sumCosts(trace),
    latency: trace.endTime - trace.startTime,
    safetyViolations: trace.guardrailTriggers.length
  };
}
\`\`\`

### LLM-as-Judge

\`\`\`typescript
async function llmJudge(
  task: string,
  output: string,
  rubric: string
): Promise<{ score: number; reasoning: string }> {
  const evaluation = await judge.generate(\`
    Task: \${task}

    Agent Output:
    \${output}

    Evaluation Rubric:
    \${rubric}

    Score the output 1-5 and explain your reasoning.
    Output JSON: { "score": N, "reasoning": "..." }
  \`);

  return JSON.parse(evaluation);
}
\`\`\`

## Key Takeaways

- [Orchestration] patterns (router, pipeline, DAG) coordinate multi-component systems
- [Multi-agent] systems distribute work through supervisor, debate, or peer patterns
- Explicit [planning] improves reliability on complex multi-step tasks
- [Routing] optimizes the capability/cost trade-off
- [Agentic RAG] makes retrieval itself intelligent and adaptive
- [Guardrails] at input, output, and action levels ensure safe operation
- [Human-in-the-loop] provides approval gates and escalation for high-stakes actions
- [Agent memory] spans working memory (context) and long-term memory (vector store)
- [Error recovery] through retry, fallback, and LLM-assisted diagnosis
- [Evaluation] measures task success, efficiency, cost, and safety`,

  advanced: `## Production Agent System Architecture

This lesson covers advanced patterns for building production-grade [multi-agent] systems: [orchestration] frameworks, [planning] algorithms, [guardrails] architectures, and [evaluation] methodologies. We'll examine the implementation details, trade-offs, and research foundations that inform modern agent system design.

The key insight at this level is that agent systems are essentially distributed systems with probabilistic components. They face the classic challenges of coordination, consistency, and fault tolerance, compounded by the non-deterministic nature of LLM inference. The patterns here draw from distributed systems theory, reinforcement learning, and the emerging empirical literature on agent benchmarks.

## State Machine Orchestration

Production agent systems benefit from explicit state management. The [orchestrator pattern] implements a state machine that tracks execution phase, enabling debugging, recovery, and progress monitoring.

\`\`\`mermaid
stateDiagram-v2
    [*] --> Planning
    Planning --> Executing: Plan generated
    Executing --> Reflecting: Step complete
    Reflecting --> Executing: Continue
    Reflecting --> Planning: Replan needed
    Reflecting --> Complete: Goal achieved
    Executing --> Failed: Unrecoverable error
    Planning --> Failed: Cannot plan
    Complete --> [*]
    Failed --> [*]
\`\`\`

### Implementation

\`\`\`typescript
enum AgentState {
  PLANNING = 'planning',
  EXECUTING = 'executing',
  REFLECTING = 'reflecting',
  COMPLETE = 'complete',
  FAILED = 'failed'
}

interface StateTransition {
  from: AgentState;
  to: AgentState;
  condition: (context: ExecutionContext) => boolean;
  action?: (context: ExecutionContext) => Promise<void>;
}

class StateMachineOrchestrator {
  private state: AgentState = AgentState.PLANNING;
  private transitions: StateTransition[];
  private context: ExecutionContext;
  private maxIterations: number = 50;

  async run(goal: string): Promise<ExecutionResult> {
    this.context = new ExecutionContext(goal);
    let iterations = 0;

    while (!this.isTerminal() && iterations < this.maxIterations) {
      iterations++;

      // Execute current state
      await this.executeState();

      // Find valid transition
      const transition = this.findTransition();
      if (transition) {
        if (transition.action) {
          await transition.action(this.context);
        }
        this.state = transition.to;
        this.context.recordTransition(transition);
      }
    }

    return this.buildResult();
  }

  private async executeState(): Promise<void> {
    switch (this.state) {
      case AgentState.PLANNING:
        await this.plan();
        break;
      case AgentState.EXECUTING:
        await this.executeNextStep();
        break;
      case AgentState.REFLECTING:
        await this.reflect();
        break;
    }
  }

  private async plan(): Promise<void> {
    const pastReflections = this.context.getReflections();
    const plan = await this.planner.generate({
      goal: this.context.goal,
      previousAttempts: this.context.attempts,
      reflections: pastReflections,
      availableTools: this.toolRegistry.list()
    });

    this.context.setPlan(plan);
  }

  private async executeNextStep(): Promise<void> {
    const step = this.context.getNextStep();
    if (!step) return;

    const result = await this.executor.execute(step, {
      tools: this.toolRegistry,
      memory: this.memory,
      guardrails: this.guardrails
    });

    this.context.recordStepResult(step, result);
  }

  private async reflect(): Promise<void> {
    const reflection = await this.reflector.analyze({
      goal: this.context.goal,
      plan: this.context.plan,
      executionHistory: this.context.history,
      lastResult: this.context.lastResult
    });

    this.context.addReflection(reflection);
  }
}
\`\`\`

### LangGraph Integration

LangGraph provides a graph-based framework for this pattern:

\`\`\`python
from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated

class AgentState(TypedDict):
    goal: str
    plan: list[str]
    step_index: int
    results: Annotated[list, operator.add]
    reflections: list[str]
    status: str

def plan_node(state: AgentState) -> AgentState:
    plan = planner.invoke({
        "goal": state["goal"],
        "reflections": state["reflections"]
    })
    return {"plan": plan.steps, "step_index": 0}

def execute_node(state: AgentState) -> AgentState:
    step = state["plan"][state["step_index"]]
    result = executor.invoke({"step": step, "context": state["results"]})
    return {
        "results": [result],
        "step_index": state["step_index"] + 1
    }

def reflect_node(state: AgentState) -> AgentState:
    reflection = reflector.invoke({
        "goal": state["goal"],
        "results": state["results"]
    })
    return {"reflections": state["reflections"] + [reflection]}

def should_continue(state: AgentState) -> str:
    if state["step_index"] >= len(state["plan"]):
        return "reflect"
    return "execute"

def should_complete(state: AgentState) -> str:
    last_reflection = state["reflections"][-1] if state["reflections"] else None
    if last_reflection and last_reflection.goal_achieved:
        return END
    if last_reflection and last_reflection.should_replan:
        return "plan"
    return "execute"

# Build graph
workflow = StateGraph(AgentState)
workflow.add_node("plan", plan_node)
workflow.add_node("execute", execute_node)
workflow.add_node("reflect", reflect_node)

workflow.set_entry_point("plan")
workflow.add_conditional_edges("plan", lambda _: "execute")
workflow.add_conditional_edges("execute", should_continue)
workflow.add_conditional_edges("reflect", should_complete)

app = workflow.compile()
\`\`\`

## Multi-Agent Communication Protocols

Effective [multi-agent] systems require well-defined communication protocols. Drawing from distributed systems, we implement message passing with typed messages and correlation IDs.

### Message Types and Protocol

\`\`\`typescript
interface AgentMessage<T = unknown> {
  id: string;
  correlationId?: string;  // Links request/response
  type: MessageType;
  sender: string;
  receiver: string | 'broadcast';
  payload: T;
  timestamp: number;
  ttl?: number;  // Time-to-live in ms
}

enum MessageType {
  REQUEST = 'request',
  RESPONSE = 'response',
  BROADCAST = 'broadcast',
  HEARTBEAT = 'heartbeat',
  ERROR = 'error'
}

interface RequestPayload {
  task: string;
  context: Record<string, unknown>;
  deadline?: number;
  priority: 'low' | 'normal' | 'high' | 'critical';
}

interface ResponsePayload {
  result: unknown;
  status: 'success' | 'partial' | 'failed';
  metadata: {
    processingTime: number;
    confidence?: number;
    toolsUsed?: string[];
  };
}
\`\`\`

### Message Bus Implementation

\`\`\`typescript
class AgentMessageBus {
  private agents: Map<string, AgentHandle> = new Map();
  private subscriptions: Map<string, Set<string>> = new Map();  // topic -> agents
  private pendingRequests: Map<string, {
    resolve: (response: ResponsePayload) => void;
    reject: (error: Error) => void;
    timeout: NodeJS.Timeout;
  }> = new Map();

  register(agent: Agent): void {
    this.agents.set(agent.id, {
      agent,
      inbox: new AsyncQueue<AgentMessage>(),
      status: 'idle'
    });

    // Start message processing loop
    this.processMessages(agent.id);
  }

  async send<T>(message: AgentMessage<T>): Promise<void> {
    if (message.receiver === 'broadcast') {
      await this.broadcast(message);
    } else {
      await this.deliver(message);
    }
  }

  async request<Req, Res>(
    sender: string,
    receiver: string,
    payload: Req,
    timeout: number = 30000
  ): Promise<Res> {
    const correlationId = generateId();

    const message: AgentMessage<Req> = {
      id: generateId(),
      correlationId,
      type: MessageType.REQUEST,
      sender,
      receiver,
      payload,
      timestamp: Date.now()
    };

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        this.pendingRequests.delete(correlationId);
        reject(new Error(\`Request timeout after \${timeout}ms\`));
      }, timeout);

      this.pendingRequests.set(correlationId, {
        resolve: resolve as any,
        reject,
        timeout: timeoutId
      });

      this.send(message);
    });
  }

  private async processMessages(agentId: string): Promise<void> {
    const handle = this.agents.get(agentId)!;

    while (true) {
      const message = await handle.inbox.dequeue();

      if (message.type === MessageType.RESPONSE && message.correlationId) {
        // Route to pending request
        const pending = this.pendingRequests.get(message.correlationId);
        if (pending) {
          clearTimeout(pending.timeout);
          this.pendingRequests.delete(message.correlationId);
          pending.resolve(message.payload as ResponsePayload);
        }
      } else {
        // Let agent process
        handle.status = 'processing';
        try {
          await handle.agent.handleMessage(message);
        } catch (error) {
          this.handleAgentError(agentId, message, error);
        }
        handle.status = 'idle';
      }
    }
  }
}
\`\`\`

### Consensus and Voting

For decisions requiring agreement among agents:

\`\`\`typescript
class ConsensusProtocol {
  async reachConsensus<T>(
    question: string,
    voters: Agent[],
    strategy: 'majority' | 'unanimous' | 'weighted'
  ): Promise<T> {
    // Gather votes in parallel
    const votes = await Promise.all(
      voters.map(async voter => ({
        voterId: voter.id,
        vote: await voter.vote(question),
        confidence: await voter.getConfidence(),
        reasoning: await voter.getReasoning()
      }))
    );

    // Apply consensus strategy
    switch (strategy) {
      case 'majority':
        return this.majorityVote(votes);
      case 'unanimous':
        return this.unanimousVote(votes);
      case 'weighted':
        return this.weightedVote(votes);
    }
  }

  private weightedVote<T>(votes: Vote<T>[]): T {
    // Weight by confidence
    const weighted = new Map<T, number>();

    for (const vote of votes) {
      const current = weighted.get(vote.vote) ?? 0;
      weighted.set(vote.vote, current + vote.confidence);
    }

    // Return highest weighted option
    let best: T | undefined;
    let bestWeight = -1;

    for (const [option, weight] of weighted) {
      if (weight > bestWeight) {
        best = option;
        bestWeight = weight;
      }
    }

    return best!;
  }
}
\`\`\`

## Advanced [Planning] Algorithms

### Hierarchical Task Network (HTN) Planning

HTN planning decomposes complex goals into increasingly concrete actions:

\`\`\`typescript
interface HTNMethod {
  name: string;
  task: string;  // Abstract task this method achieves
  preconditions: (state: WorldState) => boolean;
  subtasks: string[];  // Ordered subtasks (can be abstract or primitive)
}

class HTNPlanner {
  private methods: HTNMethod[];
  private primitiveActions: Map<string, Action>;

  plan(goal: string, state: WorldState): Action[] {
    const plan: Action[] = [];
    const taskQueue: string[] = [goal];

    while (taskQueue.length > 0) {
      const task = taskQueue.shift()!;

      if (this.isPrimitive(task)) {
        plan.push(this.primitiveActions.get(task)!);
        continue;
      }

      // Find applicable method
      const method = this.findMethod(task, state);
      if (!method) {
        throw new Error(\`No method found for task: \${task}\`);
      }

      // Decompose: replace task with subtasks
      taskQueue.unshift(...method.subtasks);
    }

    return plan;
  }

  private findMethod(task: string, state: WorldState): HTNMethod | null {
    for (const method of this.methods) {
      if (method.task === task && method.preconditions(state)) {
        return method;
      }
    }
    return null;
  }
}
\`\`\`

### Monte Carlo Tree Search (MCTS) for Planning

For complex search spaces, MCTS-inspired approaches can find good plans:

\`\`\`typescript
class MCTSPlanner {
  private explorationConstant: number = Math.sqrt(2);

  async plan(
    goal: string,
    state: WorldState,
    budget: number = 1000
  ): Promise<Action[]> {
    const root = new PlanNode(state, null);

    for (let i = 0; i < budget; i++) {
      // Selection: traverse tree using UCB1
      let node = root;
      while (!node.isLeaf() && !this.isTerminal(node.state, goal)) {
        node = this.selectChild(node);
      }

      // Expansion: add new child if not terminal
      if (!this.isTerminal(node.state, goal)) {
        node = this.expand(node);
      }

      // Simulation: random rollout to estimate value
      const value = await this.simulate(node.state, goal);

      // Backpropagation: update statistics
      this.backpropagate(node, value);
    }

    // Extract best path
    return this.extractPlan(root, goal);
  }

  private selectChild(node: PlanNode): PlanNode {
    // UCB1 selection
    let bestChild: PlanNode | null = null;
    let bestUCB = -Infinity;

    for (const child of node.children) {
      const ucb = child.value / child.visits +
        this.explorationConstant * Math.sqrt(
          Math.log(node.visits) / child.visits
        );

      if (ucb > bestUCB) {
        bestUCB = ucb;
        bestChild = child;
      }
    }

    return bestChild!;
  }

  private async simulate(state: WorldState, goal: string): Promise<number> {
    // Use LLM for informed rollout
    const trajectory = await this.llm.generate(\`
      Current state: \${JSON.stringify(state)}
      Goal: \${goal}

      Simulate a plausible sequence of actions and outcomes.
      Estimate probability of reaching the goal (0-1).
    \`);

    return parseFloat(trajectory.goalProbability);
  }
}
\`\`\`

## Production [Guardrails] Architecture

### Layered Defense

\`\`\`mermaid
flowchart TD
    A[Request] --> B[Layer 1: Input Validation]
    B -->|Pass| C[Layer 2: Intent Classification]
    B -->|Fail| X[Reject]
    C -->|Safe| D[Layer 3: Content Filter]
    C -->|Unsafe| X
    D -->|Pass| E[Agent Processing]
    D -->|Fail| X
    E --> F[Layer 4: Output Filter]
    F -->|Pass| G[Layer 5: Action Validator]
    F -->|Fail| H[Regenerate]
    H --> E
    G -->|Approved| I[Execute]
    G -->|Denied| J[Human Review]
    J -->|Approved| I
    J -->|Denied| X
\`\`\`

### Implementation

\`\`\`typescript
class GuardrailPipeline {
  private inputGuardrails: InputGuardrail[] = [];
  private outputGuardrails: OutputGuardrail[] = [];
  private actionGuardrails: ActionGuardrail[] = [];

  async processInput(input: string): Promise<ProcessedInput> {
    let processed = input;
    const violations: Violation[] = [];

    for (const guardrail of this.inputGuardrails) {
      const result = await guardrail.check(processed);

      if (!result.allowed) {
        return {
          allowed: false,
          reason: result.reason,
          violations: [...violations, result.violation!]
        };
      }

      if (result.modified) {
        processed = result.modified;
      }

      if (result.warning) {
        violations.push(result.warning);
      }
    }

    return { allowed: true, processed, violations };
  }

  async processOutput(
    output: string,
    context: Context
  ): Promise<ProcessedOutput> {
    let processed = output;
    let regenerateCount = 0;
    const maxRegenerations = 3;

    while (regenerateCount < maxRegenerations) {
      let passed = true;

      for (const guardrail of this.outputGuardrails) {
        const result = await guardrail.check(processed, context);

        if (!result.allowed) {
          if (result.canRegenerate) {
            processed = await this.regenerate(output, result.feedback);
            regenerateCount++;
            passed = false;
            break;
          }
          return { allowed: false, reason: result.reason };
        }

        if (result.modified) {
          processed = result.modified;
        }
      }

      if (passed) {
        return { allowed: true, output: processed };
      }
    }

    return { allowed: false, reason: 'Max regenerations exceeded' };
  }

  async validateAction(
    action: Action,
    context: Context
  ): Promise<ActionValidation> {
    for (const guardrail of this.actionGuardrails) {
      const result = await guardrail.check(action, context);

      if (!result.allowed) {
        return {
          allowed: false,
          reason: result.reason,
          requiresHumanApproval: false
        };
      }

      if (result.requiresApproval) {
        return {
          allowed: true,
          requiresHumanApproval: true,
          approvalReason: result.reason
        };
      }
    }

    return { allowed: true, requiresHumanApproval: false };
  }
}
\`\`\`

### Constitutional AI for Agents

Applying Constitutional AI principles to agent actions:

\`\`\`typescript
class ConstitutionalGuardrail implements ActionGuardrail {
  private constitution: string[] = [
    'Do not take actions that could cause physical harm',
    'Do not access or modify data without authorization',
    'Respect user privacy and confidentiality',
    'Do not engage in deception or manipulation',
    'Prefer reversible actions over irreversible ones'
  ];

  async check(action: Action, context: Context): Promise<GuardrailResult> {
    const evaluation = await this.llm.generate(\`
      Action: \${JSON.stringify(action)}
      Context: \${JSON.stringify(context)}

      Constitutional Principles:
      \${this.constitution.map((p, i) => \`\${i+1}. \${p}\`).join('\\n')}

      For each principle, evaluate whether this action:
      - COMPLIES: Action follows the principle
      - VIOLATES: Action breaks the principle
      - UNCLEAR: Cannot determine compliance

      Output JSON:
      {
        "evaluations": [
          { "principle": 1, "status": "COMPLIES|VIOLATES|UNCLEAR", "reasoning": "..." }
        ],
        "overallAllowed": boolean,
        "concerns": ["..."]
      }
    \`);

    const result = JSON.parse(evaluation);

    return {
      allowed: result.overallAllowed,
      requiresApproval: result.evaluations.some((e: any) => e.status === 'UNCLEAR'),
      reason: result.concerns.join('; ')
    };
  }
}
\`\`\`

## [Evaluation] Methodologies

### Trajectory-Based Evaluation

Evaluating not just the final answer but the path taken:

\`\`\`typescript
interface TrajectoryEvaluation {
  taskCompletion: number;      // 0-1, goal achieved
  efficiency: number;          // optimal_steps / actual_steps
  toolAccuracy: number;        // correct_tools / total_tools
  recoveryRate: number;        // successful_recoveries / errors
  safetyScore: number;         // 1 - (violations / actions)
  coherence: number;           // logical consistency of reasoning
}

class TrajectoryEvaluator {
  async evaluate(trajectory: AgentTrajectory): Promise<TrajectoryEvaluation> {
    return {
      taskCompletion: await this.evaluateCompletion(trajectory),
      efficiency: this.calculateEfficiency(trajectory),
      toolAccuracy: this.calculateToolAccuracy(trajectory),
      recoveryRate: this.calculateRecoveryRate(trajectory),
      safetyScore: this.calculateSafetyScore(trajectory),
      coherence: await this.evaluateCoherence(trajectory)
    };
  }

  private async evaluateCompletion(t: AgentTrajectory): Promise<number> {
    // Use LLM-as-judge
    const judgment = await this.judge.generate(\`
      Task: \${t.goal}

      Final State: \${JSON.stringify(t.finalState)}
      Agent Output: \${t.finalOutput}

      On a scale of 0-1, how completely did the agent achieve the goal?
      Consider:
      - All requirements addressed
      - Quality of output
      - Edge cases handled

      Output: { "score": 0.X, "reasoning": "..." }
    \`);

    return JSON.parse(judgment).score;
  }

  private async evaluateCoherence(t: AgentTrajectory): Promise<number> {
    // Evaluate reasoning chain
    const coherenceCheck = await this.judge.generate(\`
      Analyze this agent's reasoning trajectory:

      \${t.steps.map(s => \`
        Thought: \${s.thought}
        Action: \${s.action}
        Result: \${s.result}
      \`).join('\\n---\\n')}

      Evaluate coherence (0-1):
      - Does each step logically follow from the previous?
      - Are there contradictions in reasoning?
      - Does the agent stay focused on the goal?
      - Are conclusions supported by observations?

      Output: { "score": 0.X, "issues": [...] }
    \`);

    return JSON.parse(coherenceCheck).score;
  }
}
\`\`\`

### Benchmark Integration

\`\`\`typescript
class AgentBenchmarkRunner {
  async runBenchmark(
    agent: Agent,
    benchmark: 'swe-bench' | 'agent-bench' | 'webarena'
  ): Promise<BenchmarkResults> {
    const tasks = await this.loadBenchmark(benchmark);
    const results: TaskResult[] = [];

    for (const task of tasks) {
      const startTime = Date.now();

      try {
        const trajectory = await agent.runWithTracing(task.prompt);

        const evaluation = {
          taskId: task.id,
          success: await task.evaluate(trajectory.finalOutput),
          trajectory,
          latency: Date.now() - startTime,
          cost: trajectory.totalCost,
          steps: trajectory.steps.length
        };

        results.push(evaluation);
      } catch (error) {
        results.push({
          taskId: task.id,
          success: false,
          error: error.message,
          latency: Date.now() - startTime
        });
      }
    }

    return this.aggregateResults(results, benchmark);
  }

  private aggregateResults(
    results: TaskResult[],
    benchmark: string
  ): BenchmarkResults {
    const successful = results.filter(r => r.success);

    return {
      benchmark,
      totalTasks: results.length,
      successRate: successful.length / results.length,
      avgLatency: mean(results.map(r => r.latency)),
      avgCost: mean(results.filter(r => r.cost).map(r => r.cost!)),
      avgSteps: mean(successful.map(r => r.steps!)),
      errorBreakdown: this.categorizeErrors(results.filter(r => !r.success))
    };
  }
}
\`\`\`

## Cost Optimization Strategies

### Model Cascading with Caching

\`\`\`typescript
class OptimizedAgentRunner {
  private cache: LRUCache<string, CachedResult>;
  private modelTiers: ModelTier[];

  async run(task: string): Promise<Result> {
    // Check cache
    const cacheKey = this.computeCacheKey(task);
    const cached = this.cache.get(cacheKey);
    if (cached && !this.isStale(cached)) {
      return cached.result;
    }

    // Try model cascade
    for (const tier of this.modelTiers) {
      const result = await this.tryTier(task, tier);

      if (result.confidence >= tier.confidenceThreshold) {
        // Cache successful result
        this.cache.set(cacheKey, {
          result: result.output,
          timestamp: Date.now(),
          tier: tier.name,
          confidence: result.confidence
        });

        return result.output;
      }
    }

    // Fallback to most capable model
    const fallback = await this.modelTiers[this.modelTiers.length - 1]
      .model.generate(task);

    return fallback;
  }

  private computeCacheKey(task: string): string {
    // Semantic hash for similar queries
    const embedding = await this.embedder.embed(task);
    return hashEmbedding(embedding, this.cacheGranularity);
  }
}
\`\`\`

### Tool Call Optimization

\`\`\`typescript
class ToolCallOptimizer {
  async optimizeToolCalls(
    pendingCalls: ToolCall[]
  ): Promise<OptimizedToolCalls> {
    // 1. Deduplicate identical calls
    const deduped = this.deduplicateCalls(pendingCalls);

    // 2. Batch compatible calls
    const batched = this.batchCalls(deduped);

    // 3. Parallelize independent calls
    const parallelized = this.identifyParallelizable(batched);

    // 4. Cache results
    return {
      calls: parallelized,
      estimatedCost: this.estimateCost(parallelized),
      estimatedLatency: this.estimateLatency(parallelized)
    };
  }

  private batchCalls(calls: ToolCall[]): BatchedToolCall[] {
    const batches: Map<string, ToolCall[]> = new Map();

    for (const call of calls) {
      const batchKey = this.getBatchKey(call);
      if (!batches.has(batchKey)) {
        batches.set(batchKey, []);
      }
      batches.get(batchKey)!.push(call);
    }

    return [...batches.values()].map(batch => ({
      tool: batch[0].tool,
      batchedParams: batch.map(c => c.params),
      originalCalls: batch
    }));
  }
}
\`\`\`

## Key Takeaways

- State machine [orchestration] provides explicit control flow, debugging, and recovery
- [Multi-agent] systems require well-defined communication protocols and consensus mechanisms
- Advanced [planning] (HTN, MCTS) handles complex goal decomposition
- Production [guardrails] implement layered defense with constitutional principles
- Trajectory-based [evaluation] captures both outcome and process quality
- Cost optimization through cascading, caching, and batching
- Agent memory spans working memory, episodic memory, and semantic memory with different retention strategies
- [Error recovery] combines retry logic, LLM-assisted diagnosis, and graceful degradation

These patterns form the foundation for building reliable, efficient, and safe production agent systems. The field continues to evolve rapidly, with new research on agent architectures, evaluation benchmarks, and safety mechanisms published regularly.`,
};

export const lesson06Quiz = {
  id: 'quiz-06-agentic-patterns',
  title: 'Agentic AI Patterns Knowledge Check',
  passingScore: 70,
  questions: [
    {
      id: 'patterns-q1',
      question: 'What is the main difference between a router pattern and a pipeline pattern in agent orchestration?',
      type: 'multiple-choice' as const,
      options: [
        'Router sends requests to ONE appropriate handler; pipeline passes through MULTIPLE handlers sequentially',
        'Router is faster than pipeline',
        'Pipeline can only handle simple tasks',
        'Router requires more memory than pipeline'
      ],
      correctAnswer: 0,
      explanation: 'A router examines the request and dispatches to a single appropriate handler, while a pipeline processes the request through multiple stages sequentially, with each stage transforming or enriching the data.',
      difficulty: 'beginner' as const,
    },
    {
      id: 'patterns-q2',
      question: 'In a supervisor multi-agent system, what happens when a worker agent\'s output fails quality checks?',
      type: 'multiple-choice' as const,
      options: [
        'The entire system shuts down',
        'The supervisor can ask the worker to retry, assign to a different worker, or replan the approach',
        'The output is returned to the user as-is',
        'The worker agent is permanently removed from the system'
      ],
      correctAnswer: 1,
      explanation: 'The supervisor pattern enables graceful error handling — the supervisor can request a retry with feedback, delegate to an alternative specialist, or trigger replanning based on the failure.',
      difficulty: 'intermediate' as const,
    },
    {
      id: 'patterns-q3',
      question: 'Why is agentic RAG more powerful than basic RAG?',
      type: 'multiple-choice' as const,
      options: [
        'It uses more expensive models',
        'It only searches one source very thoroughly',
        'The agent decides HOW to search — routing to optimal sources, using multiple queries, and self-correcting if results are insufficient',
        'It skips the retrieval step entirely'
      ],
      correctAnswer: 2,
      explanation: 'Agentic RAG makes the retrieval itself intelligent. Instead of a fixed search strategy, the agent analyzes the query, routes to appropriate sources, executes multiple searches if needed, and iteratively refines until results are sufficient.',
      difficulty: 'beginner' as const,
    },
    {
      id: 'patterns-q4',
      question: 'What is the purpose of guardrails in an agent system?',
      type: 'multiple-choice' as const,
      options: [
        'To make the agent run faster',
        'To prevent harmful, off-topic, or unauthorized actions through input/output/action validation',
        'To increase the agent\'s creativity',
        'To reduce API costs'
      ],
      correctAnswer: 1,
      explanation: 'Guardrails are safety mechanisms that constrain agent behavior. They operate at multiple levels: filtering malicious inputs, blocking harmful outputs, and requiring approval for sensitive actions.',
      difficulty: 'intermediate' as const,
    },
    {
      id: 'patterns-q5',
      question: 'In a multi-agent debate pattern, how is the final answer typically determined?',
      type: 'multiple-choice' as const,
      options: [
        'The first agent to respond wins',
        'A random selection is made',
        'A judge agent evaluates the arguments from multiple perspectives and synthesizes the best answer',
        'Agents vote and majority wins without any synthesis'
      ],
      correctAnswer: 2,
      explanation: 'In the debate pattern, multiple agents argue different positions (e.g., pro vs con), and a judge agent analyzes all arguments, weighs the reasoning quality, and synthesizes a final answer that incorporates the strongest points from each perspective.',
      difficulty: 'advanced' as const,
    },
  ],
};

export const lesson06 = {
  id: 'lesson-06',
  title: 'Agentic AI Patterns',
  subtitle: 'Architecting Intelligent Systems',
  description: 'Learn the design patterns behind production AI agents — orchestration, multi-agent systems, planning, guardrails, and agentic RAG.',
  estimatedMinutes: 45,
  terms: lesson06Terms,
  advancedTopics: lesson06AdvancedTopics,
  content: lesson06Content,
  quiz: lesson06Quiz,
};

// content/lessons/lesson-05.ts
// Agents & Tools

import type { Term, AdvancedTopic, UserLevel } from '@/types';

export const lesson05Terms: Term[] = [
  {
    id: 'agent',
    term: 'Agent',
    slug: 'agent',
    popup: {
      beginner: {
        explanation: 'AI that can decide what to do and take actions - like having an assistant who figures things out on their own.',
        example: 'You say "book me a flight to Paris" and the agent searches flights, compares options, and books one.',
      },
      intermediate: {
        explanation: 'LLM-based system that reasons about tasks, selects tools, and executes actions in a loop until goal is achieved.',
        example: 'Agent receives goal → thinks → selects tool → observes result → thinks → repeats until done.',
      },
      advanced: {
        explanation: 'Autonomous systems using LLMs as reasoning engines. Implements ReAct, function calling, or code generation patterns.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['tools', 'react', 'reasoning'],
    usedInLessons: ['lesson-05'],
  },
  {
    id: 'tools',
    term: 'Tools',
    slug: 'tools',
    popup: {
      beginner: {
        explanation: 'Actions an AI agent can take - like searching the web, running code, or sending emails. Tools let AI do things.',
        example: 'Calculator tool: AI can now do math. Search tool: AI can now look things up.',
      },
      intermediate: {
        explanation: 'Functions the LLM can invoke. Defined by name, description, and parameters. LLM decides when/how to use them.',
        example: 'tools=[{name: "search", params: {query: str}}, {name: "calculator", params: {expression: str}}]',
      },
      advanced: {
        explanation: 'Function schemas provided to LLM. Model generates structured calls via function calling or JSON mode.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['agent', 'function-calling', 'actions'],
    usedInLessons: ['lesson-05'],
  },
  {
    id: 'react',
    term: 'ReAct',
    slug: 'react',
    popup: {
      beginner: {
        explanation: 'A pattern where AI thinks out loud, then acts, then observes the result. Reasoning + Acting = ReAct.',
        example: 'Think: "I need to find the weather." Act: Search for weather. Observe: "72°F sunny." Think: "Now I can answer."',
      },
      intermediate: {
        explanation: 'Interleaved reasoning and acting. Each step: Thought → Action → Observation. Enables complex multi-step tasks.',
        example: 'Thought: I need X. Action: tool(params). Observation: result. Thought: Based on result...',
      },
      advanced: {
        explanation: 'Yao et al., 2022. Synergizes reasoning traces with actions. Outperforms CoT alone on knowledge-intensive tasks.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['agent', 'chain-of-thought', 'reasoning'],
    usedInLessons: ['lesson-05'],
  },
  {
    id: 'function-calling',
    term: 'Function Calling',
    slug: 'function-calling',
    popup: {
      beginner: {
        explanation: 'Teaching AI about functions it can use, then letting it decide when to call them. AI generates the function call.',
        example: 'You define get_weather(city). AI sees "What\'s the weather in Paris?" and calls get_weather("Paris").',
      },
      intermediate: {
        explanation: 'LLM API feature where model outputs structured function calls instead of text. Provider executes and returns result.',
        example: 'response.tool_calls = [{function: {name: "search", arguments: "{\\\"query\\\": \\\"...\\\"}"}}]',
      },
      advanced: {
        explanation: 'Constrained decoding to JSON schema. Parallel function calls supported. Model handles tool selection and chaining.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['tools', 'agent', 'structured-output'],
    usedInLessons: ['lesson-05'],
  },
  {
    id: 'reasoning',
    term: 'Reasoning',
    slug: 'reasoning',
    popup: {
      beginner: {
        explanation: 'When AI thinks through a problem step by step before answering. Better reasoning = smarter answers.',
        example: 'Instead of guessing, AI explains: "First I need to... then I should... therefore..."',
      },
      intermediate: {
        explanation: 'Multi-step inference before response. Techniques: CoT, self-consistency, decomposition. Critical for complex tasks.',
        example: 'Planning step: break into subtasks. Execution step: solve each. Synthesis step: combine results.',
      },
      advanced: {
        explanation: 'Emergent capability at scale. Tree search (ToT), iterative refinement, and verification improve reliability.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['chain-of-thought', 'planning', 'react'],
    usedInLessons: ['lesson-05'],
  },
  {
    id: 'planning',
    term: 'Planning',
    slug: 'planning',
    popup: {
      beginner: {
        explanation: 'AI making a plan before acting. Like writing a to-do list before starting a project.',
        example: 'Task: "Plan a trip." Plan: 1) Pick dates 2) Find flights 3) Book hotel 4) Make itinerary.',
      },
      intermediate: {
        explanation: 'Decomposing complex goals into actionable steps. Can be explicit (generate plan) or implicit (reasoning trace).',
        example: 'generate_plan(goal) → [step1, step2, ...] → execute_steps() → verify_completion()',
      },
      advanced: {
        explanation: 'Hierarchical task decomposition. Plan-and-solve, least-to-most prompting. Replanning on failures.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['agent', 'reasoning', 'decomposition'],
    usedInLessons: ['lesson-05'],
  },
  {
    id: 'observation',
    term: 'Observation',
    slug: 'observation',
    popup: {
      beginner: {
        explanation: 'What the AI sees after taking an action. The result that helps it decide what to do next.',
        example: 'Action: Search "weather Paris". Observation: "Currently 72°F and sunny in Paris."',
      },
      intermediate: {
        explanation: 'Tool output fed back to LLM. Observation quality affects agent performance. May need summarization.',
        example: 'Long API response → summarize to key facts → add to context → continue reasoning.',
      },
      advanced: {
        explanation: 'Context management critical for multi-step tasks. Observation compression, selective attention, memory systems.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['react', 'tools', 'context-window'],
    usedInLessons: ['lesson-05'],
  },
  {
    id: 'multi-agent',
    term: 'Multi-Agent',
    slug: 'multi-agent',
    popup: {
      beginner: {
        explanation: 'Multiple AI agents working together, each with a specialty. Like a team where each member has their job.',
        example: 'Researcher agent finds info. Writer agent drafts. Editor agent polishes. Better than one doing everything.',
      },
      intermediate: {
        explanation: 'Multiple specialized agents coordinating on tasks. Patterns: hierarchical, collaborative, adversarial.',
        example: 'Orchestrator agent delegates subtasks to specialist agents, aggregates results.',
      },
      advanced: {
        explanation: 'Communication protocols, task delegation, consensus mechanisms. Frameworks: AutoGen, CrewAI, LangGraph.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['agent', 'orchestration', 'delegation'],
    usedInLessons: ['lesson-05'],
  },
];

export const lesson05AdvancedTopics: AdvancedTopic[] = [
  {
    id: 'tool-use-patterns',
    title: 'Tool Use Patterns',
    description: 'Advanced patterns for reliable tool use',
    difficulty: 'intermediate',
    prerequisites: ['tools', 'function-calling'],
    hasDeepDive: true,
  },
  {
    id: 'agent-memory',
    title: 'Agent Memory',
    description: 'Long-term memory systems for agents',
    difficulty: 'advanced',
    prerequisites: ['agent', 'embeddings'],
    hasDeepDive: true,
  },
  {
    id: 'self-reflection',
    title: 'Self-Reflection',
    description: 'Agents that learn from mistakes',
    difficulty: 'advanced',
    prerequisites: ['react', 'reasoning'],
    hasDeepDive: true,
  },
  {
    id: 'agent-evaluation',
    title: 'Agent Evaluation',
    description: 'Testing and benchmarking agents',
    difficulty: 'advanced',
    prerequisites: ['agent', 'tools'],
    hasDeepDive: true,
  },
];

export const lesson05Content: Record<UserLevel, string> = {
  beginner: `## From Answering to Doing

So far, AI just answers questions. But what if AI could actually DO things?

- Search the web for you
- Send emails
- Book appointments
- Write and run code
- Control apps

That's what [agents] do. They're AI that takes action.

## What Makes an Agent?

A regular AI: You ask → It answers
An [agent]: You set a goal → It figures out how → It does it

> **The Assistant Analogy**
>
> A regular AI is like someone who only answers questions.
> An agent is like a real assistant who can make calls, send emails, and get things done.

## The Building Blocks

Every agent has three parts:

\`\`\`mermaid
flowchart LR
    A[Brain] --> B[Tools]
    A --> C[Memory]
    B --> D[Actions]
    C --> A
    D --> A
\`\`\`

| Part | What It Does | Example |
|------|--------------|---------|
| **Brain** | The LLM that thinks and decides | Claude, GPT-4 |
| **[Tools]** | Actions the agent can take | Search, calculator, email |
| **Memory** | What the agent remembers | Past actions, user preferences |

## [Tools]: Giving AI Superpowers

Without tools, AI can only generate text. With tools, AI can:

| Tool | Superpower |
|------|------------|
| Web Search | Find current information |
| Calculator | Do precise math |
| Code Runner | Execute programs |
| Database | Look up records |
| Email | Send messages |
| Calendar | Check/create events |

**Example:**
\`\`\`
You: "What's 15% tip on a $47.80 bill?"

Without tools:
AI: "Let me calculate... approximately $7.17"

With calculator tool:
AI: [Uses calculator: 47.80 * 0.15]
    "The tip is exactly $7.17"
\`\`\`

## The [ReAct] Pattern: Think, Act, Observe

Here's how agents work, step by step:

\`\`\`mermaid
flowchart TB
    A[Get Goal] --> B[Think]
    B --> C[Choose Action]
    C --> D[Take Action]
    D --> E[Observe Result]
    E --> F{Goal Done?}
    F -->|No| B
    F -->|Yes| G[Return Answer]
\`\`\`

**Real Example:**

Goal: "Find the population of France and calculate what 15% of it would be"

1. **Think**: "I need to find France's population first"
2. **Act**: Search "population of France 2024"
3. **Observe**: "France population: 68 million"
4. **Think**: "Now I need to calculate 15%"
5. **Act**: Calculate 68,000,000 × 0.15
6. **Observe**: "10,200,000"
7. **Answer**: "15% of France's population is 10.2 million people"

The agent figured out the steps on its own!

## [Function Calling]: Speaking Tool Language

How does AI tell a tool what to do? Through [function calling].

You describe your tools:
\`\`\`
Tool: get_weather
Description: Get current weather for a city
Parameters:
  - city (required): The city name
  - units (optional): "celsius" or "fahrenheit"
\`\`\`

AI generates the call:
\`\`\`
User: "Is it cold in Tokyo?"
AI calls: get_weather(city="Tokyo", units="celsius")
Tool returns: {"temp": 8, "conditions": "cloudy"}
AI says: "It's 8°C and cloudy in Tokyo - pretty chilly!"
\`\`\`

## [Reasoning]: The Secret Sauce

What makes agents work is [reasoning] - the AI thinking through problems:

**Without reasoning:**
"What's the capital of the country that won the 2022 World Cup?"
→ AI might guess wrong

**With reasoning:**
"Let me think step by step:
1. The 2022 World Cup was won by Argentina
2. The capital of Argentina is Buenos Aires
3. Therefore, the answer is Buenos Aires"
→ AI gets it right!

This is why we saw [chain of thought] in prompt engineering - it makes agents smarter.

## [Planning]: Breaking Down Big Goals

Complex tasks need a plan:

\`\`\`
Goal: "Plan a birthday party for next Saturday"

Plan:
1. Find available venues
2. Create guest list
3. Send invitations
4. Order cake
5. Plan activities
6. Confirm everything
\`\`\`

The agent might:
- Search for venues
- Ask you about guests
- Draft invitation emails
- Find bakeries
- Suggest games

Each step uses different tools!

## [Multi-Agent] Systems: AI Teams

Why have one agent when you can have many?

| Agent | Role |
|-------|------|
| Researcher | Finds information |
| Writer | Creates content |
| Critic | Reviews and improves |
| Coder | Writes programs |

**Example workflow:**
\`\`\`mermaid
flowchart LR
    A[Researcher] -->|Finds facts| B[Writer]
    B -->|Drafts article| C[Critic]
    C -->|Suggests edits| B
    B -->|Final version| D[Done]
\`\`\`

Each agent is specialized, and together they do more than any single agent could.

## Agents in Action: Real Examples

**Customer Support Agent:**
- Reads customer question
- Searches knowledge base
- If not found, searches previous tickets
- Drafts response
- Flags for human if uncertain

**Research Agent:**
- Takes research topic
- Searches multiple sources
- Summarizes findings
- Creates bibliography
- Answers follow-up questions

**Coding Agent:**
- Understands requirements
- Writes code
- Runs tests
- Fixes errors
- Explains what it did

## Key Takeaways

- [Agents] are AI that can take actions, not just answer questions
- [Tools] give agents capabilities like search, code execution, and APIs
- [ReAct] pattern: Think → Act → Observe → Repeat
- [Function calling] lets AI use tools in a structured way
- [Reasoning] and [planning] make agents smart
- [Multi-agent] systems combine specialized agents

**Congratulations!** You now understand the full stack of modern AI - from how tokens work to how agents take action!`,

  intermediate: `## Building AI Agents

This lesson covers agent architectures, tool integration, and implementation patterns for building autonomous AI systems. Understanding how to build effective [agents] requires grasping a fundamental shift in how we think about AI: instead of single-turn question-answering, agents operate in a loop, continuously reasoning about goals, taking actions, and adapting based on results.

The core insight behind agentic AI is that [large language models] are not just text generators—they're reasoning engines capable of making decisions. When you give an LLM the ability to call functions, search the web, or execute code, it transforms from a passive responder into an active problem solver. This lesson will teach you how to architect these systems, handle the inevitable failures, and build robust agents that can tackle complex real-world tasks.

## Agent Architecture Overview

Every agent architecture shares a common pattern: an LLM "brain" that reasons and makes decisions, connected to external capabilities through [tools], and equipped with [memory] to maintain context across multiple steps. The diagram below illustrates this architecture. Notice how the LLM Core sits at the center, receiving user input and coordinating between the Prompt Manager (which maintains context and formats requests), the Tool Executor (which handles function calls), and the Memory System (which provides both short-term conversational context and long-term knowledge retrieval).

\`\`\`mermaid
flowchart TB
    subgraph Agent
    A[LLM Core] --> B[Prompt Manager]
    A --> C[Tool Executor]
    A --> D[Memory System]
    end

    C --> E[Search Tool]
    C --> F[Code Tool]
    C --> G[API Tools]

    D --> H[(Short-term)]
    D --> I[(Long-term)]

    J[User Input] --> A
    A --> K[Output]
\`\`\`

This architecture enables what we call the Think→Act→Observe loop. The LLM receives input, thinks about what action to take, executes that action via tools, observes the result, and then decides whether to continue or return a final answer. This loop is the foundation of all agentic behavior, from simple single-tool invocations to complex multi-step reasoning chains.

## [Function Calling] Implementation

[Function calling] is the mechanism that allows LLMs to invoke external tools in a structured, reliable way. Rather than asking the model to generate arbitrary text that might describe a function call, modern LLM APIs support a dedicated mode where the model outputs structured JSON that precisely specifies which function to call and with what arguments. This is a critical capability—without it, agents would constantly fail due to parsing errors and malformed tool invocations.

The key insight behind function calling is that LLMs can be taught to reason about *when* to use a tool and *how* to parameterize it. When you provide a tool schema (name, description, and parameters), the model learns to recognize situations where that tool would be helpful and generate appropriate arguments. This is remarkably similar to how humans decide which tool to use—we don't just pattern-match on keywords, we reason about our goal and select the tool most likely to help achieve it.

### Defining Tools

The first step in building an agent is defining its [toolbox]. Each tool needs a clear name, a descriptive explanation of what it does (the model uses this to decide when to use it), a parameter schema defining what inputs it accepts, and the actual function implementation. The description is particularly important—a vague description leads to a model that doesn't know when to use the tool, while an overly specific description limits the model's creativity in applying it.

\`\`\`python
from typing import Callable
from dataclasses import dataclass

@dataclass
class Tool:
    name: str
    description: str
    parameters: dict
    function: Callable

def search_web(query: str) -> str:
    """Search the web for information."""
    # Implementation
    return f"Search results for: {query}"

def calculate(expression: str) -> float:
    """Evaluate a mathematical expression."""
    return eval(expression)  # Use safe_eval in production

tools = [
    Tool(
        name="search",
        description="Search the web for current information",
        parameters={
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "The search query"
                }
            },
            "required": ["query"]
        },
        function=search_web
    ),
    Tool(
        name="calculator",
        description="Perform mathematical calculations",
        parameters={
            "type": "object",
            "properties": {
                "expression": {
                    "type": "string",
                    "description": "Math expression to evaluate"
                }
            },
            "required": ["expression"]
        },
        function=calculate
    )
]
\`\`\`

Notice how each tool includes a JSON Schema for its parameters. This schema serves two purposes: it tells the LLM what arguments the tool expects, and it enables [constrained decoding]—the model's output is forced to conform to the schema, eliminating syntax errors. The \`required\` field is crucial: it tells the model which parameters must always be provided versus which can be omitted.

### Using OpenAI Function Calling

Now let's see how to integrate these tools with an LLM API. The pattern is straightforward: we send the user message along with our tool schemas, the model either responds with text or requests a tool call, we execute the requested tool and return the result, and then the model continues reasoning until it has a final answer. This loop continues until the model generates a response without any tool calls.

The critical detail in the implementation below is the message structure. When the model requests a tool call, we must append its message (including the tool_call metadata) to the conversation history, then add a \`tool\` role message containing the result. This maintains a complete audit trail of the agent's reasoning and actions, which is essential for debugging and for the model to remember what it has already tried.

\`\`\`python
from openai import OpenAI

client = OpenAI()

def run_agent(user_message: str, tools: list[Tool]) -> str:
    """Run agent with function calling."""

    messages = [{"role": "user", "content": user_message}]

    # Convert tools to OpenAI format
    tool_schemas = [
        {
            "type": "function",
            "function": {
                "name": t.name,
                "description": t.description,
                "parameters": t.parameters
            }
        }
        for t in tools
    ]

    while True:
        response = client.chat.completions.create(
            model="gpt-4-turbo",
            messages=messages,
            tools=tool_schemas
        )

        message = response.choices[0].message

        # Check if model wants to use a tool
        if message.tool_calls:
            messages.append(message)

            for tool_call in message.tool_calls:
                # Find and execute tool
                tool = next(t for t in tools if t.name == tool_call.function.name)
                args = json.loads(tool_call.function.arguments)
                result = tool.function(**args)

                # Add result to messages
                messages.append({
                    "role": "tool",
                    "tool_call_id": tool_call.id,
                    "content": str(result)
                })
        else:
            # No more tool calls, return response
            return message.content
\`\`\`

This implementation handles [parallel function calls]—a powerful feature where the model can request multiple tool invocations in a single turn. For example, if asked "What's the weather in Paris and the current price of Bitcoin?", the model might request both the weather tool and a price lookup tool simultaneously, rather than sequentially. This dramatically improves latency for multi-step tasks.

Error handling is notably absent from this basic implementation. In production, you'd need to handle cases where the tool throws an exception, where the model hallucinates a non-existent tool, or where parameter validation fails. We'll address these concerns in the Error Handling section below.

## The [ReAct] Pattern

While function calling provides the mechanical ability to invoke tools, [ReAct] (Reasoning + Acting) provides a cognitive framework for *how* the agent should think. The key insight from the original ReAct paper (Yao et al., 2022) is that interleaving reasoning traces with actions outperforms both pure reasoning (chain-of-thought alone) and pure acting (tool use without explicit reasoning).

Why does this work? When an agent explicitly states its reasoning before each action, it forces the model to commit to a plan and provides context for interpreting the action's result. The "Thought" step serves as a working memory where the model can track its progress, note intermediate conclusions, and reason about what to do next. Without this explicit reasoning, agents tend to loop, repeat actions, or lose track of their goal.

### Implementation

The ReAct pattern can be implemented through careful [prompt engineering]. We instruct the model to follow a specific format: first state a Thought explaining what it plans to do and why, then specify an Action (tool name) and Action Input (parameters), wait for an Observation (the tool's output), and repeat until it can provide a Final Answer. This structure transforms the free-form capabilities of an LLM into a disciplined problem-solving process.

\`\`\`python
REACT_PROMPT = """
You are an AI assistant that solves problems step by step.

Available tools:
{tool_descriptions}

Use this format:
Thought: [Your reasoning about what to do next]
Action: [tool_name]
Action Input: [input for the tool]

After receiving a result:
Observation: [tool result]

Repeat until you have the answer, then:
Thought: I now have enough information.
Final Answer: [your answer]

Question: {question}
"""

def react_agent(question: str, tools: dict[str, Callable]) -> str:
    """Simple ReAct agent implementation."""

    tool_desc = "\\n".join(f"- {name}: {func.__doc__}" for name, func in tools.items())

    prompt = REACT_PROMPT.format(
        tool_descriptions=tool_desc,
        question=question
    )

    messages = [{"role": "user", "content": prompt}]

    for _ in range(10):  # Max iterations
        response = llm(messages)

        if "Final Answer:" in response:
            return response.split("Final Answer:")[-1].strip()

        # Parse action
        if "Action:" in response and "Action Input:" in response:
            action = response.split("Action:")[1].split("\\n")[0].strip()
            action_input = response.split("Action Input:")[1].split("\\n")[0].strip()

            # Execute tool
            if action in tools:
                result = tools[action](action_input)
                observation = f"\\nObservation: {result}\\n"
            else:
                observation = f"\\nObservation: Unknown tool '{action}'\\n"

            messages.append({"role": "assistant", "content": response})
            messages.append({"role": "user", "content": observation})
        else:
            messages.append({"role": "assistant", "content": response})

    return "Max iterations reached"
\`\`\`

Let's trace through a real example to see how this works in practice. Suppose the user asks: "What is the population of the largest country by area, and what percentage of the world population does it represent?"

**Step 1:** Thought: "I need to find the largest country by area first. I'll search for this information." Action: search, Action Input: "largest country by area"

**Step 2:** Observation: "Russia is the largest country by area at 17.1 million km²"

**Step 3:** Thought: "Now I know it's Russia. I need to find Russia's population." Action: search, Action Input: "Russia population 2024"

**Step 4:** Observation: "Russia's population is approximately 144 million"

**Step 5:** Thought: "I have Russia's population. Now I need world population to calculate the percentage." Action: search, Action Input: "world population 2024"

**Step 6:** Observation: "World population is approximately 8 billion"

**Step 7:** Thought: "I have all the data. Let me calculate: 144 million / 8 billion = 1.8%." Final Answer: "Russia, the largest country by area, has a population of about 144 million, representing approximately 1.8% of the world's population."

Notice how each thought explicitly states what the agent knows and what it still needs. This [explicit reasoning] prevents the model from skipping steps or making unwarranted assumptions.

## [Planning] Strategies

Some tasks are too complex for step-by-step ReAct execution. Consider "Research the competitive landscape of the electric vehicle market and create a summary report." This requires multiple research threads, synthesis, and structured output—it's not a linear chain of actions. For such tasks, we need explicit [planning] strategies.

The key insight is that planning and execution are separate cognitive processes. When you plan, you think abstractly about goals, subgoals, and dependencies. When you execute, you focus on concrete actions. By separating these phases, we can create more reliable agents that don't lose track of the bigger picture while handling details.

### Plan-and-Execute

The [plan-and-execute] pattern generates a complete plan upfront, then executes each step. This has several advantages: the agent commits to a strategy before taking any actions (reducing mid-task confusion), the plan provides a scaffold for tracking progress, and if a step fails, we have a clear context for replanning. The disadvantage is reduced flexibility—new information discovered during execution doesn't automatically update the plan.

\`\`\`python
class PlanAndExecuteAgent:
    """Generate plan first, then execute steps."""

    def __init__(self, planner_llm, executor_llm, tools: list[Tool]):
        self.planner = planner_llm
        self.executor = executor_llm
        self.tools = {t.name: t.function for t in tools}

    def plan(self, goal: str) -> list[str]:
        """Generate step-by-step plan."""
        prompt = f"""
Create a step-by-step plan to accomplish this goal:
{goal}

Available tools: {list(self.tools.keys())}

Output as a numbered list of specific, actionable steps.
Each step should use exactly one tool or be a final synthesis step.
"""
        response = self.planner(prompt)
        steps = self._parse_steps(response)
        return steps

    def execute(self, goal: str) -> str:
        """Plan and execute."""
        plan = self.plan(goal)
        results = []

        for i, step in enumerate(plan):
            prompt = f"""
Goal: {goal}
Plan: {plan}
Completed steps: {results}

Execute step {i+1}: {step}

If this step requires a tool, specify:
Tool: [tool_name]
Input: [input]

Otherwise, provide your analysis.
"""
            response = self.executor(prompt)

            if "Tool:" in response:
                tool_name = response.split("Tool:")[1].split("\\n")[0].strip()
                tool_input = response.split("Input:")[1].split("\\n")[0].strip()

                if tool_name in self.tools:
                    result = self.tools[tool_name](tool_input)
                    results.append(f"Step {i+1}: {result}")
            else:
                results.append(f"Step {i+1}: {response}")

        return self._synthesize(goal, plan, results)
\`\`\`

The planner and executor can use different models or configurations. A common pattern uses a larger, more capable model (like GPT-4) for planning where broad reasoning matters, and a smaller, faster model (like GPT-3.5-turbo) for individual execution steps where the plan provides sufficient guidance. This balances quality and cost.

Production systems often implement [replanning] triggers: if a step fails multiple times, if the execution deviates significantly from expectations, or if new information invalidates the original plan, the agent returns to the planning phase with updated context. This creates a robust system that can recover from unexpected situations.

## Agent Memory Systems

Memory is what separates a capable agent from a truly useful one. Without memory, every interaction starts from scratch—the agent forgets what it learned, repeats mistakes, and fails to build on past successes. Effective agents need multiple types of memory: [working memory] for the current task (what tools have been called, what results returned), [episodic memory] for past interactions (what the user asked before, what approaches worked), and [semantic memory] for general knowledge (facts learned across all interactions).

The challenge is that LLM [context windows], while growing, remain finite. An agent working on a multi-hour task can easily generate megabytes of intermediate outputs that won't fit in any context window. Memory systems must therefore be selective, summarizing and prioritizing information to keep the most relevant context accessible.

### Conversation Memory

The simplest form of memory is a sliding window of recent messages. This implementation maintains a token budget, trimming old messages when the conversation exceeds the limit. The key decision is *what* to trim: we preserve the system message (which defines the agent's identity and instructions) and prioritize recent exchanges over older ones, on the assumption that recent context is more relevant.

\`\`\`python
class ConversationMemory:
    """Maintain conversation context."""

    def __init__(self, max_tokens: int = 4000):
        self.messages: list[dict] = []
        self.max_tokens = max_tokens

    def add(self, role: str, content: str):
        """Add message and trim if needed."""
        self.messages.append({"role": role, "content": content})
        self._trim()

    def _trim(self):
        """Remove old messages to stay within token limit."""
        total_tokens = sum(len(m["content"]) // 4 for m in self.messages)

        while total_tokens > self.max_tokens and len(self.messages) > 2:
            # Keep system message, remove oldest user/assistant
            if self.messages[0]["role"] == "system":
                removed = self.messages.pop(1)
            else:
                removed = self.messages.pop(0)
            total_tokens -= len(removed["content"]) // 4

    def get_context(self) -> list[dict]:
        return self.messages.copy()
\`\`\`

This simple approach works for short interactions but falls apart for complex, multi-session tasks. When you trim old messages, you lose potentially valuable context. More sophisticated approaches use [summarization]—periodically compressing older exchanges into summaries that capture key information while using fewer tokens. The system message might then include a "story so far" summary that grows and updates as the conversation progresses.

### Semantic Memory with Retrieval

For long-term memory that persists across sessions and scales to thousands of interactions, we need [retrieval-augmented] memory. This approach, which you'll recognize from our RAG lesson, embeds memories as vectors and retrieves relevant ones based on semantic similarity to the current context. The agent doesn't carry its entire history in context—instead, it queries for relevant memories when needed.

\`\`\`python
class SemanticMemory:
    """Long-term memory using vector retrieval."""

    def __init__(self, collection):
        self.collection = collection

    def store(self, content: str, metadata: dict = None):
        """Store memory."""
        memory_id = f"mem_{datetime.now().timestamp()}"

        self.collection.add(
            ids=[memory_id],
            documents=[content],
            metadatas=[metadata or {}]
        )

    def retrieve(self, query: str, k: int = 5) -> list[str]:
        """Retrieve relevant memories."""
        results = self.collection.query(
            query_texts=[query],
            n_results=k
        )
        return results["documents"][0]

    def build_context(self, current_task: str) -> str:
        """Build context from relevant memories."""
        memories = self.retrieve(current_task, k=3)

        if not memories:
            return ""

        return "Relevant past information:\\n" + "\\n".join(f"- {m}" for m in memories)
\`\`\`

The \`build_context\` method shows how semantic memory integrates with the agent loop. Before each reasoning step, we query for memories relevant to the current task and inject them into the prompt. This gives the agent access to a vast repository of past experience without bloating the context window. The metadata field enables filtering—you might store reflections, successful strategies, and error patterns as separate memory types, then retrieve the most relevant type for each situation.

The most powerful agents combine both memory types: conversation memory provides immediate context (what just happened), while semantic memory provides long-term knowledge (what worked in similar situations before). This mirrors human cognition, where we maintain both short-term working memory and long-term episodic and semantic memory.

## Error Handling and Recovery

Agents fail. Tools return errors, APIs timeout, the model generates malformed requests, and unexpected inputs break assumptions. Robust agents must handle failures gracefully—retrying when appropriate, adapting strategy when retries fail, and knowing when to escalate to a human. The difference between a demo agent and a production agent is largely error handling.

The implementation below shows a retry pattern with [LLM-assisted recovery]. When a tool fails, instead of blindly retrying with the same arguments, we ask the model to analyze the error and suggest a correction. This works remarkably well—models can often diagnose issues like "the API requires a date in YYYY-MM-DD format, but you passed MM/DD/YYYY" and fix them.

\`\`\`python
class RobustAgent:
    """Agent with error handling and retry logic."""

    def __init__(self, tools: list[Tool], max_retries: int = 3):
        self.tools = {t.name: t for t in tools}
        self.max_retries = max_retries

    def execute_tool(self, tool_name: str, args: dict) -> tuple[bool, str]:
        """Execute tool with retries."""
        if tool_name not in self.tools:
            return False, f"Unknown tool: {tool_name}"

        tool = self.tools[tool_name]

        for attempt in range(self.max_retries):
            try:
                result = tool.function(**args)
                return True, str(result)
            except Exception as e:
                if attempt < self.max_retries - 1:
                    # Let LLM try to fix the error
                    fix_prompt = f"""
Tool '{tool_name}' failed with error: {e}
Arguments were: {args}

Suggest corrected arguments or an alternative approach.
"""
                    # Could use LLM to suggest fix
                    continue
                else:
                    return False, f"Tool failed after {self.max_retries} attempts: {e}"

        return False, "Max retries exceeded"
\`\`\`

Beyond retry logic, production agents implement [circuit breakers] (stop calling a failing tool after repeated failures), [fallback strategies] (use an alternative tool or approach), and [escalation paths] (notify a human when automated recovery fails). The goal is graceful degradation—when perfect execution isn't possible, deliver the best result possible and clearly communicate limitations.

A subtle but important consideration is [error observability]. When an agent fails, you need to understand why. This means logging not just the final error, but the entire decision chain leading up to it: what was the model's reasoning? What tool was called with what parameters? What did the tool return? Without this context, debugging agent failures becomes nearly impossible.

## Agent Evaluation

How do you know if your agent is any good? Unlike traditional software with deterministic outputs, agents make judgment calls, take varied paths to solutions, and produce results that are "correct" in different ways. [Agent evaluation] requires thinking beyond simple pass/fail metrics to capture nuanced aspects of agent behavior.

The implementation below shows a basic evaluation framework. We run the agent on a test suite and check whether the output contains expected elements. But this only scratches the surface. You'll also want to track: How many tool calls did the agent make (efficiency)? Did it use the right tools (appropriateness)? Did it avoid harmful actions (safety)? How long did it take (latency)? Did it handle edge cases gracefully (robustness)?

\`\`\`python
def evaluate_agent(agent, test_cases: list[dict]) -> dict:
    """Evaluate agent on test cases."""
    results = {
        "total": len(test_cases),
        "correct": 0,
        "tool_usage": [],
        "errors": []
    }

    for case in test_cases:
        try:
            response = agent.run(case["input"])

            # Check correctness
            if case.get("expected_contains"):
                if any(exp in response for exp in case["expected_contains"]):
                    results["correct"] += 1
                else:
                    results["errors"].append({
                        "input": case["input"],
                        "expected": case["expected_contains"],
                        "got": response
                    })

            # Track tool usage
            results["tool_usage"].append(agent.get_tool_history())

        except Exception as e:
            results["errors"].append({
                "input": case["input"],
                "error": str(e)
            })

    results["accuracy"] = results["correct"] / results["total"]
    return results
\`\`\`

Real-world evaluation often requires [human-in-the-loop assessment]. You might run the agent on a set of tasks, have humans rate the quality of outputs, and compute inter-rater reliability. For safety-critical applications, you'll want [red-team testing]—deliberately trying to make the agent behave badly (following harmful instructions, leaking information, taking unauthorized actions) to identify vulnerabilities before deployment.

The most mature approach is [online evaluation]—monitoring agent behavior in production and measuring real-world outcomes. Did users find the agent helpful? Did they complete their tasks? Did they report errors? This closes the loop from development to deployment, ensuring your agent continues to work well as the world changes.

You now have the foundation to build production-grade agents. The intermediate techniques covered here—function calling, ReAct reasoning, planning, memory systems, error handling, and evaluation—form the core toolkit for agentic AI development. The advanced section explores multi-agent systems, self-reflection, and production deployment patterns that take these foundations further.`,

  advanced: `## Advanced Agent Architectures

This lesson covers production agent patterns, [multi-agent] systems, and cutting-edge techniques for building reliable autonomous AI systems. While the intermediate section focused on building individual agents, real-world applications often require more sophisticated architectures: agents that coordinate with each other, learn from their mistakes, and operate safely at scale.

The key insight at this level is that agent systems are [distributed systems]—they face all the challenges of coordination, consistency, and failure handling that distributed computing has studied for decades, plus the unique challenge of reasoning components that are probabilistic rather than deterministic. The patterns in this section draw from both distributed systems theory and emerging best practices from the AI research community.

## Agent Design Patterns

Production agent systems need clear architectural patterns to remain maintainable and debuggable. Just as software engineering evolved patterns like MVC and microservices, agent engineering is developing its own vocabulary of reusable designs. These patterns address common challenges: How do you coordinate complex multi-step workflows? How do you recover from partial failures? How do you maintain observability into what the agent is doing and why?

### The Orchestrator Pattern

The [orchestrator pattern] implements a state machine that explicitly tracks where the agent is in its problem-solving process. Rather than relying on the LLM to implicitly manage state through conversation history, we externalize state into discrete phases: PLANNING, EXECUTING, REFLECTING, COMPLETE, and FAILED. This makes the agent's behavior predictable and debuggable—you can always answer "what is the agent doing right now?" by checking its state.

The power of this pattern lies in the REFLECTING state. After executing actions, the agent steps back to evaluate progress: Did we achieve the goal? What worked? What failed? Should we replan? This [metacognitive loop] catches issues that would derail simpler agents—noticing when a plan isn't working, when tool outputs don't match expectations, or when the goal itself needs clarification.

\`\`\`python
from enum import Enum
from typing import Optional

class AgentState(Enum):
    PLANNING = "planning"
    EXECUTING = "executing"
    REFLECTING = "reflecting"
    COMPLETE = "complete"
    FAILED = "failed"

class OrchestratorAgent:
    """
    Orchestrates complex tasks through planning, execution, and reflection.
    Implements a state machine for reliable task completion.
    """

    def __init__(self, llm, tools: list[Tool], memory: SemanticMemory):
        self.llm = llm
        self.tools = {t.name: t for t in tools}
        self.memory = memory
        self.state = AgentState.PLANNING
        self.plan: list[dict] = []
        self.execution_history: list[dict] = []
        self.max_iterations = 20

    async def run(self, goal: str) -> dict:
        """Run the agent to completion."""
        iteration = 0

        while self.state not in [AgentState.COMPLETE, AgentState.FAILED]:
            iteration += 1
            if iteration > self.max_iterations:
                self.state = AgentState.FAILED
                break

            if self.state == AgentState.PLANNING:
                await self._plan(goal)
            elif self.state == AgentState.EXECUTING:
                await self._execute()
            elif self.state == AgentState.REFLECTING:
                await self._reflect(goal)

        return {
            "success": self.state == AgentState.COMPLETE,
            "result": self._synthesize_result(goal),
            "iterations": iteration,
            "history": self.execution_history
        }

    async def _plan(self, goal: str):
        """Generate or update execution plan."""
        context = self.memory.build_context(goal)

        prompt = f"""
Goal: {goal}

{context}

Previous attempts: {self.execution_history[-3:] if self.execution_history else 'None'}

Create a detailed plan. For each step, specify:
1. What to do
2. Which tool to use (or 'reasoning' for analysis)
3. Expected outcome
4. How to verify success

Output as JSON array of step objects.
"""
        response = await self.llm.generate(prompt)
        self.plan = json.loads(response)
        self.state = AgentState.EXECUTING

    async def _execute(self):
        """Execute next step in plan."""
        if not self.plan:
            self.state = AgentState.REFLECTING
            return

        step = self.plan.pop(0)
        result = await self._execute_step(step)

        self.execution_history.append({
            "step": step,
            "result": result,
            "timestamp": datetime.now().isoformat()
        })

        # Verify step success
        if not result["success"]:
            self.state = AgentState.REFLECTING

        if not self.plan:
            self.state = AgentState.REFLECTING

    async def _reflect(self, goal: str):
        """Reflect on progress and decide next action."""
        prompt = f"""
Goal: {goal}

Execution history:
{json.dumps(self.execution_history[-5:], indent=2)}

Analyze:
1. Have we achieved the goal? (yes/no)
2. What went well?
3. What failed or could be improved?
4. Should we: complete / replan / continue executing?

Output JSON with keys: goal_achieved, analysis, next_action
"""
        response = await self.llm.generate(prompt)
        reflection = json.loads(response)

        if reflection["goal_achieved"]:
            self.state = AgentState.COMPLETE
        elif reflection["next_action"] == "replan":
            self.state = AgentState.PLANNING
        elif reflection["next_action"] == "continue":
            self.state = AgentState.EXECUTING
        else:
            self.state = AgentState.FAILED

        # Store reflection in memory
        self.memory.store(
            f"Reflection on '{goal}': {reflection['analysis']}",
            {"type": "reflection", "goal": goal}
        )
\`\`\`

Several design decisions in this implementation deserve attention. The \`max_iterations\` limit prevents infinite loops—a common failure mode where agents cycle through the same actions without making progress. The reflection storage creates a [learning loop]: insights from this execution become context for future ones. And the async/await pattern enables concurrent tool execution, dramatically improving throughput for I/O-bound operations.

This pattern is the foundation for production-grade agents. Frameworks like LangGraph, AutoGPT, and OpenAI's Assistants API implement variations of this state-machine approach, adding their own conventions for tool definitions, memory management, and error handling.

## [Multi-Agent] Systems

When tasks grow complex enough, a single agent becomes unwieldy. Its prompt becomes bloated with instructions for different capabilities, its memory overflows with unrelated context, and its decision-making slows under the weight of options. [Multi-agent systems] solve this by distributing work across specialized agents, each with focused responsibilities and optimized prompts.

The key architectural decision in multi-agent systems is the [communication topology]. In hierarchical systems, an orchestrator delegates to specialists and aggregates results. In collaborative systems, peers communicate directly to solve shared problems. In competitive systems, agents debate or critique each other's outputs. Each topology suits different problem types, and production systems often combine multiple patterns.

### Agent Communication Protocol

Before agents can collaborate, they need a shared language for communication. The [message passing] pattern below defines a simple protocol: messages have a sender, receiver, content, and type (request, response, or broadcast). An AgentBus routes messages between agents, enabling loose coupling—agents don't need to know each other's implementation details, only how to send and receive messages.

\`\`\`python
from dataclasses import dataclass
from typing import Any
import asyncio

@dataclass
class Message:
    sender: str
    receiver: str
    content: Any
    message_type: str  # "request", "response", "broadcast"
    correlation_id: Optional[str] = None

class AgentBus:
    """Message bus for inter-agent communication."""

    def __init__(self):
        self.agents: dict[str, "BaseAgent"] = {}
        self.message_queue: asyncio.Queue = asyncio.Queue()

    def register(self, agent: "BaseAgent"):
        self.agents[agent.name] = agent

    async def send(self, message: Message):
        await self.message_queue.put(message)

    async def broadcast(self, sender: str, content: Any):
        for name in self.agents:
            if name != sender:
                await self.send(Message(
                    sender=sender,
                    receiver=name,
                    content=content,
                    message_type="broadcast"
                ))

    async def run(self):
        while True:
            message = await self.message_queue.get()

            if message.receiver in self.agents:
                asyncio.create_task(
                    self.agents[message.receiver].receive(message)
                )


class BaseAgent:
    """Base class for agents in multi-agent system."""

    def __init__(self, name: str, llm, bus: AgentBus):
        self.name = name
        self.llm = llm
        self.bus = bus
        bus.register(self)

    async def receive(self, message: Message):
        """Handle incoming message."""
        raise NotImplementedError

    async def send_to(self, receiver: str, content: Any, msg_type: str = "request"):
        await self.bus.send(Message(
            sender=self.name,
            receiver=receiver,
            content=content,
            message_type=msg_type
        ))
\`\`\`

This message bus pattern enables [asynchronous coordination]. Agents can fire off requests and continue working while waiting for responses. The bus queues messages and delivers them when agents are ready, handling backpressure and preventing overwhelming slow agents. This is essential for production systems where agents have different latencies and capacities.

The BaseAgent class provides a foundation for all agents in the system. Notice how agents self-register with the bus on creation—this enables [dynamic agent discovery]. New agents can join the system at runtime, and other agents can discover them through the bus. This supports scaling: you might spin up additional specialist agents during high load and shut them down when idle.

### Hierarchical Multi-Agent System

The [hierarchical pattern] is the most common multi-agent architecture. An orchestrator agent receives high-level goals, decomposes them into subtasks, delegates each subtask to an appropriate specialist, and synthesizes the results into a final answer. This mirrors how human organizations work: executives set strategy, managers delegate to specialists, and results flow back up the chain.

\`\`\`python
class OrchestratorAgentMA(BaseAgent):
    """Orchestrator that delegates to specialist agents."""

    def __init__(self, name: str, llm, bus: AgentBus, specialists: list[str]):
        super().__init__(name, llm, bus)
        self.specialists = specialists
        self.pending_tasks: dict[str, asyncio.Future] = {}

    async def solve(self, task: str) -> str:
        """Decompose task and delegate to specialists."""

        # Plan decomposition
        plan_prompt = f"""
Task: {task}

Available specialists: {self.specialists}

Decompose this task into subtasks for each relevant specialist.
Output JSON: {{specialist_name: subtask_description}}
"""
        plan = json.loads(await self.llm.generate(plan_prompt))

        # Delegate to specialists
        results = {}
        futures = []

        for specialist, subtask in plan.items():
            if specialist in self.specialists:
                correlation_id = f"{task[:20]}_{specialist}"
                future = asyncio.Future()
                self.pending_tasks[correlation_id] = future

                await self.send_to(
                    specialist,
                    {"task": subtask, "correlation_id": correlation_id},
                    "request"
                )
                futures.append((specialist, future))

        # Wait for results
        for specialist, future in futures:
            try:
                result = await asyncio.wait_for(future, timeout=60)
                results[specialist] = result
            except asyncio.TimeoutError:
                results[specialist] = "Timeout"

        # Synthesize results
        synthesis_prompt = f"""
Original task: {task}
Specialist results: {json.dumps(results, indent=2)}

Synthesize a final answer incorporating all specialist inputs.
"""
        return await self.llm.generate(synthesis_prompt)

    async def receive(self, message: Message):
        """Handle responses from specialists."""
        if message.message_type == "response":
            correlation_id = message.content.get("correlation_id")
            if correlation_id in self.pending_tasks:
                self.pending_tasks[correlation_id].set_result(
                    message.content.get("result")
                )


class SpecialistAgent(BaseAgent):
    """Specialist agent with domain expertise."""

    def __init__(self, name: str, llm, bus: AgentBus, expertise: str, tools: list[Tool]):
        super().__init__(name, llm, bus)
        self.expertise = expertise
        self.tools = tools

    async def receive(self, message: Message):
        if message.message_type == "request":
            task = message.content["task"]
            correlation_id = message.content["correlation_id"]

            # Solve with expertise
            prompt = f"""
You are an expert in {self.expertise}.

Task: {task}

Available tools: {[t.name for t in self.tools]}

Solve this task using your expertise.
"""
            result = await self._solve_with_tools(prompt)

            await self.send_to(
                message.sender,
                {"result": result, "correlation_id": correlation_id},
                "response"
            )
\`\`\`

This implementation shows several key patterns. The orchestrator uses [correlation IDs] to track which specialist response corresponds to which request—essential when multiple tasks are in flight simultaneously. The \`asyncio.wait_for\` with timeout ensures the system doesn't hang if a specialist fails to respond. And the synthesis step uses the LLM to combine potentially conflicting or complementary specialist outputs into a coherent answer.

The specialist agents demonstrate [expertise encapsulation]. Each specialist has a focused prompt that emphasizes its domain expertise and a curated set of tools relevant to its specialty. This focused context helps the LLM perform better than a generalist prompt trying to cover everything. In practice, you might have specialists for "web research," "code generation," "data analysis," and "writing"—each optimized for its domain.

## Self-Reflection and Learning

The agents we've built so far don't learn from their mistakes. They might fail repeatedly on similar tasks, never recognizing patterns in what goes wrong. [Self-reflection] addresses this by having agents explicitly analyze their failures, generate insights, and apply those insights to future attempts. This creates a form of [in-context learning] that persists across interactions.

The key research in this area is the [Reflexion] pattern (Shinn et al., 2023), which showed that agents with self-reflection capabilities significantly outperform those without on tasks requiring multi-step reasoning. The insight is that LLMs are good at post-hoc analysis—they can explain why something went wrong even when they couldn't avoid the mistake initially.

### Reflexion Pattern

The Reflexion pattern implements a retry loop with reflection. After each failed attempt, the agent generates a reflection analyzing what went wrong and how to improve. These reflections accumulate and are injected into subsequent attempts, giving the agent a "memory" of past failures. Additionally, reflections are stored in semantic memory, so even across sessions, the agent can retrieve relevant lessons learned from similar past tasks.

\`\`\`python
class ReflexionAgent:
    """
    Agent that learns from failures through self-reflection.
    Shinn et al., 2023.
    """

    def __init__(self, llm, tools: list[Tool], memory: SemanticMemory):
        self.llm = llm
        self.tools = tools
        self.memory = memory
        self.reflections: list[str] = []

    async def solve(self, task: str, max_attempts: int = 3) -> str:
        """Solve with reflection on failures."""

        for attempt in range(max_attempts):
            # Retrieve relevant past reflections
            past_reflections = self.memory.retrieve(
                f"reflections for: {task}",
                k=3
            )

            # Build prompt with reflections
            prompt = f"""
Task: {task}

{"Past reflections on similar tasks:" if past_reflections else ""}
{chr(10).join(past_reflections) if past_reflections else ""}

{"Reflections from previous attempts:" if self.reflections else ""}
{chr(10).join(self.reflections) if self.reflections else ""}

Solve this task carefully, incorporating lessons learned.
"""
            result = await self._execute(prompt)

            # Evaluate result
            evaluation = await self._evaluate(task, result)

            if evaluation["success"]:
                # Store successful strategy
                self.memory.store(
                    f"Successful approach for '{task}': {result}",
                    {"type": "success", "task_type": self._categorize(task)}
                )
                return result
            else:
                # Reflect on failure
                reflection = await self._reflect(task, result, evaluation["feedback"])
                self.reflections.append(reflection)

                # Store reflection
                self.memory.store(
                    f"Reflection: {reflection}",
                    {"type": "reflection", "task_type": self._categorize(task)}
                )

        return f"Failed after {max_attempts} attempts. Reflections: {self.reflections}"

    async def _reflect(self, task: str, result: str, feedback: str) -> str:
        """Generate reflection on failure."""
        prompt = f"""
Task: {task}
My attempt: {result}
Feedback: {feedback}

Reflect on what went wrong and how to improve.
Be specific about:
1. What mistake was made
2. Why it happened
3. How to avoid it next time

Reflection:
"""
        return await self.llm.generate(prompt)
\`\`\`

The \`_reflect\` method is the heart of this pattern. It asks the model to be specific about three things: what mistake was made, why it happened, and how to avoid it next time. This structured reflection produces more useful insights than vague "try harder" guidance. The insights then flow into both the current attempt loop (via \`self.reflections\`) and long-term memory (via \`self.memory.store\`), creating both immediate and persistent learning.

One subtlety is the [task categorization] in the memory metadata. By storing reflections with a task type, we can retrieve reflections from similar tasks even when the specific goal differs. An agent that learned "always validate API keys before making requests" on one task can apply that insight to a completely different task involving API calls. This generalization is what makes self-reflection powerful.

## Production Considerations

Deploying agents to production introduces challenges beyond algorithmic correctness. Real users expect reliability, reasonable latency, and graceful handling of edge cases. Systems administrators need observability into what agents are doing. Security teams need assurance that agents won't take harmful actions. This section covers the production engineering patterns that bridge the gap from prototype to production.

### Observability

You cannot improve what you cannot measure. [Distributed tracing] follows requests through the agent system, recording timing, decisions, and outcomes at each step. [Structured logging] captures rich context that enables debugging without the noise of unstructured logs. [Metrics] track aggregate behavior: success rates, latencies, tool usage patterns. Together, these enable you to answer questions like "why did this request take 30 seconds?" or "which tool is failing most often?"

\`\`\`python
import structlog
from opentelemetry import trace

tracer = trace.get_tracer(__name__)
logger = structlog.get_logger()

class ObservableAgent:
    """Agent with comprehensive observability."""

    def __init__(self, name: str, llm, tools: list[Tool]):
        self.name = name
        self.llm = llm
        self.tools = tools
        self.metrics = {
            "total_runs": 0,
            "successful_runs": 0,
            "tool_calls": {},
            "avg_latency": 0
        }

    async def run(self, task: str) -> dict:
        with tracer.start_as_current_span(f"agent.{self.name}.run") as span:
            span.set_attribute("task", task[:100])
            start_time = time.time()

            try:
                result = await self._execute(task)

                span.set_attribute("success", True)
                self.metrics["successful_runs"] += 1

                logger.info(
                    "agent_run_complete",
                    agent=self.name,
                    task=task[:50],
                    success=True,
                    latency=time.time() - start_time
                )

                return {"success": True, "result": result}

            except Exception as e:
                span.set_attribute("success", False)
                span.set_attribute("error", str(e))
                span.record_exception(e)

                logger.error(
                    "agent_run_failed",
                    agent=self.name,
                    task=task[:50],
                    error=str(e)
                )

                return {"success": False, "error": str(e)}

            finally:
                self.metrics["total_runs"] += 1
                latency = time.time() - start_time
                self.metrics["avg_latency"] = (
                    self.metrics["avg_latency"] * 0.9 + latency * 0.1
                )
\`\`\`

This implementation uses [OpenTelemetry] for distributed tracing, which has become the industry standard for observability. Each agent run creates a span that captures the task, timing, and outcome. The span attributes enable filtering and analysis: "show me all failed runs" or "find runs involving the search tool." The \`record_exception\` call captures full stack traces for debugging.

The metrics dictionary implements [exponential moving averages] for latency tracking, which smooths out outliers while remaining responsive to trends. In production, you'd export these metrics to a system like Prometheus or DataDog and set up alerts for anomalies: high error rates, increasing latencies, or unexpected tool usage patterns.

### Rate Limiting and Backpressure

LLM APIs have rate limits. External tools have rate limits. Your own system has capacity limits. [Rate limiting] ensures the agent system operates within these constraints, preventing failures due to limit exhaustion. [Backpressure] prevents the system from accepting more work than it can handle, queuing excess requests or rejecting them gracefully.

The implementation below uses two mechanisms: a semaphore limits concurrent requests (backpressure), and a sliding window tracks recent request times to enforce a rate limit. This combination prevents both overwhelming the system with concurrent requests and exceeding API rate limits with rapid sequential requests.

\`\`\`python
import asyncio
from collections import deque

class RateLimitedAgent:
    """Agent with rate limiting and request queuing."""

    def __init__(self, agent, max_concurrent: int = 5, rate_limit: float = 10.0):
        self.agent = agent
        self.semaphore = asyncio.Semaphore(max_concurrent)
        self.rate_limit = rate_limit  # requests per second
        self.request_times: deque = deque(maxlen=100)

    async def run(self, task: str) -> dict:
        # Check rate limit
        await self._wait_for_rate_limit()

        async with self.semaphore:
            self.request_times.append(time.time())
            return await self.agent.run(task)

    async def _wait_for_rate_limit(self):
        """Wait if rate limit would be exceeded."""
        if len(self.request_times) >= self.rate_limit:
            oldest = self.request_times[0]
            elapsed = time.time() - oldest
            if elapsed < 1.0:
                await asyncio.sleep(1.0 - elapsed)
\`\`\`

Beyond rate limiting, production systems need [circuit breakers] that stop calling failing dependencies, [retry policies] with exponential backoff for transient failures, [timeout handling] that prevents hung requests from consuming resources, and [graceful degradation] that provides partial functionality when full capability is unavailable. These patterns come from distributed systems engineering and are essential for reliable agent deployments.

One final production consideration is [agent safety]. Agents with tool access can potentially take harmful actions—deleting data, sending unauthorized communications, or accessing restricted resources. Production systems implement [guardrails]: tool invocations might require human approval for sensitive operations, output filters might block harmful content, and [sandboxing] might limit what the agent can access. The field of [AI safety] is evolving rapidly, but the core principle is defense in depth: no single failure should lead to catastrophic outcomes.

## Congratulations!

You've completed the GenAI Learning Platform course, covering:

1. **How AI Works** - Transformers, tokens, generation
2. **Prompt Engineering** - System prompts, few-shot, CoT
3. **Embeddings** - Vectors, similarity, semantic search
4. **RAG** - Retrieval-augmented generation
5. **Agents** - Tools, reasoning, multi-agent systems

You now have the foundation to build sophisticated AI applications!`,
};

// Quiz questions
export const lesson05Quiz = {
  id: 'quiz-05-agents',
  title: 'Agents & Tools Knowledge Check',
  passingScore: 70,
  questions: [
    {
      id: 'agent-q1',
      question: 'What makes an AI agent different from a simple chatbot?',
      type: 'multiple-choice' as const,
      options: [
        'Agents use more compute power',
        'Agents can decide what actions to take and use tools autonomously',
        'Agents always give longer responses',
        'Agents are trained on more data'
      ],
      correctAnswer: 1,
      explanation: 'Agents go beyond conversation - they can reason about goals, select appropriate tools, and take actions to accomplish tasks.',
      difficulty: 'beginner' as const,
    },
    {
      id: 'agent-q2',
      question: 'What does ReAct stand for in agent design?',
      type: 'multiple-choice' as const,
      options: [
        'Real-time Action',
        'Reasoning + Acting',
        'Reactive Agent',
        'Recursive Action'
      ],
      correctAnswer: 1,
      explanation: 'ReAct (Reasoning + Acting) is a pattern where agents alternate between thinking about what to do and taking actions.',
      difficulty: 'intermediate' as const,
    },
    {
      id: 'agent-q3',
      question: 'What is the typical loop in an agent system?',
      type: 'multiple-choice' as const,
      options: [
        'Input → Output → End',
        'Think → Act → Observe → Repeat until done',
        'Load → Process → Save',
        'Request → Response → Cache'
      ],
      correctAnswer: 1,
      explanation: 'Agents follow a loop: think about what to do, take an action (use a tool), observe the result, then repeat until the goal is achieved.',
      difficulty: 'beginner' as const,
    },
    {
      id: 'agent-q4',
      question: 'What is function calling in the context of AI agents?',
      type: 'multiple-choice' as const,
      options: [
        'When humans call support functions',
        'The AI\'s ability to invoke external tools by outputting structured function calls',
        'Recursive function execution',
        'Calling multiple AI models at once'
      ],
      correctAnswer: 1,
      explanation: 'Function calling allows the AI to invoke external tools by outputting structured requests (like JSON) that your code then executes.',
      difficulty: 'intermediate' as const,
    },
    {
      id: 'agent-q5',
      question: 'What is a key challenge in multi-agent systems?',
      type: 'multiple-choice' as const,
      options: [
        'Agents are too fast',
        'Coordination, communication, and preventing conflicts between agents',
        'Agents use too little memory',
        'Agents always agree with each other'
      ],
      correctAnswer: 1,
      explanation: 'Multi-agent systems must handle coordination, communication protocols, and potential conflicts when agents have different goals or information.',
      difficulty: 'advanced' as const,
    },
  ],
};

// Combined export
export const lesson05 = {
  id: 'lesson-05',
  title: 'Agents & Tools',
  subtitle: 'AI That Takes Action',
  description: 'Create AI that can decide what to do, use tools, and accomplish complex tasks.',
  estimatedMinutes: 45,
  terms: lesson05Terms,
  advancedTopics: lesson05AdvancedTopics,
  content: lesson05Content,
  quiz: lesson05Quiz,
};

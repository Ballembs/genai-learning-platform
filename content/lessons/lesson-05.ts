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

This lesson covers agent architectures, tool integration, and implementation patterns for building autonomous AI systems.

## Agent Architecture Overview

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

## [Function Calling] Implementation

### Defining Tools

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

### Using OpenAI Function Calling

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

## The [ReAct] Pattern

### Implementation

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

## [Planning] Strategies

### Plan-and-Execute

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

## Agent Memory Systems

### Conversation Memory

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

### Semantic Memory with Retrieval

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

## Error Handling and Recovery

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

## Agent Evaluation

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

**You've completed the course!** You now have the knowledge to build sophisticated AI applications.`,

  advanced: `## Advanced Agent Architectures

This lesson covers production agent patterns, multi-agent systems, and cutting-edge techniques for building reliable autonomous AI systems.

## Agent Design Patterns

### The Orchestrator Pattern

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

## [Multi-Agent] Systems

### Agent Communication Protocol

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

### Hierarchical Multi-Agent System

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

## Self-Reflection and Learning

### Reflexion Pattern

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

## Production Considerations

### Observability

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

### Rate Limiting and Backpressure

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

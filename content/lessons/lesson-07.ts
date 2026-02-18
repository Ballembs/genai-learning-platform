// content/lessons/lesson-07.ts
// Agentic AI in Practice

import type { Term, AdvancedTopic, UserLevel } from '@/types';

export const lesson07Terms: Term[] = [
  {
    id: 'data-pipeline-agent',
    term: 'Data Pipeline Agent',
    slug: 'data-pipeline-agent',
    popup: {
      beginner: {
        explanation: 'AI that watches your data flows and fixes problems before you even notice — like having a 24/7 data engineer.',
        example: 'Schema changed at 3 AM? The agent adapts the pipeline automatically and sends you a morning summary.',
      },
      intermediate: {
        explanation: 'Agents that monitor pipeline health, detect schema drift, auto-heal failures, and optimize scheduling based on data patterns.',
        example: 'Agent detects upstream schema change → adapts transformations → validates output → alerts team with summary.',
      },
      advanced: {
        explanation: 'Self-optimizing DAGs with anomaly-driven reprocessing, lineage-aware impact analysis, and predictive failure prevention.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['self-healing', 'data-quality-agent', 'orchestration'],
    usedInLessons: ['lesson-07'],
  },
  {
    id: 'data-governance-agent',
    term: 'Data Governance Agent',
    slug: 'data-governance-agent',
    popup: {
      beginner: {
        explanation: 'AI security guard that makes sure data is handled correctly — labeling sensitive info, enforcing rules, keeping you compliant.',
        example: 'New table arrives → Agent scans for SSNs, credit cards → Applies masking → Sets access permissions.',
      },
      intermediate: {
        explanation: 'Automated PII/PHI detection, policy enforcement, classification, and compliance reporting. Integrates with data catalogs.',
        example: 'Policy: "PHI columns require encryption." Agent scans new tables, identifies PHI, triggers encryption workflow.',
      },
      advanced: {
        explanation: 'Policy-as-code agents, regulatory mapping (GDPR→controls), continuous compliance monitoring, automated audit trail generation.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['compliance-automation', 'access-control-agent', 'guardrails'],
    usedInLessons: ['lesson-07'],
  },
  {
    id: 'natural-language-query',
    term: 'Natural Language Query',
    slug: 'natural-language-query',
    popup: {
      beginner: {
        explanation: 'Ask your database questions in plain English instead of writing SQL. Type "show me last month\'s sales by region" and get the answer.',
        example: '"Who are our top 10 customers?" → Agent writes the SQL → Runs it → Shows you a nice table.',
      },
      intermediate: {
        explanation: 'Text-to-SQL agents with schema awareness, query validation, and access control integration. Handles joins, aggregations, filters.',
        example: 'User asks question → Agent maps to schema → Generates SQL → Validates safety → Executes → Returns results with explanation.',
      },
      advanced: {
        explanation: 'Multi-table join reasoning, dialect-aware generation, execution plan optimization, and semantic layer integration for consistent metrics.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['semantic-layer', 'access-control-agent', 'rag'],
    usedInLessons: ['lesson-07'],
  },
  {
    id: 'code-generation-agent',
    term: 'Code Generation Agent',
    slug: 'code-generation-agent',
    popup: {
      beginner: {
        explanation: 'AI developer that can write code, find bugs, and help you ship faster — like having a tireless pair programmer.',
        example: '"Add pagination to the users API" → Agent writes the code, the tests, and opens a PR.',
      },
      intermediate: {
        explanation: 'Context-aware completion with repository-scale understanding. PR review, test generation, and refactoring capabilities.',
        example: 'Agent understands codebase patterns → Generates code matching team style → Writes tests → Suggests improvements in review.',
      },
      advanced: {
        explanation: 'Multi-file refactoring, CI/CD integration, architectural understanding, and codebase-wide impact analysis for changes.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['ci-cd-agent', 'agent', 'tools'],
    usedInLessons: ['lesson-07'],
  },
  {
    id: 'data-quality-agent',
    term: 'Data Quality Agent',
    slug: 'data-quality-agent',
    popup: {
      beginner: {
        explanation: 'AI inspector that catches bad data — missing values, duplicates, things that don\'t make sense. Finds problems before they cause issues.',
        example: '"Orders table suddenly has 40% null zip codes" → Agent alerts you before broken reports go out.',
      },
      intermediate: {
        explanation: 'Statistical anomaly detection, automated profiling, expectation-based validation, and root cause analysis for data issues.',
        example: 'Continuous profiling → Detects distribution drift → Traces to upstream change → Suggests remediation → Auto-fixes if configured.',
      },
      advanced: {
        explanation: 'Great Expectations-style frameworks, lineage-aware quality propagation, ML-powered drift detection, and automated remediation.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['data-pipeline-agent', 'self-healing', 'evaluation'],
    usedInLessons: ['lesson-07'],
  },
  {
    id: 'access-control-agent',
    term: 'Access Control Agent',
    slug: 'access-control-agent',
    popup: {
      beginner: {
        explanation: 'AI that decides "yes you can see this, no you can\'t see that" — and explains why. Smart permissions that understand context.',
        example: '"Can I access customer emails?" → Agent checks your role, the data sensitivity, your purpose → Approves or denies with reason.',
      },
      intermediate: {
        explanation: 'Dynamic policy evaluation, just-in-time access provisioning, role mining from usage patterns, purpose-based access decisions.',
        example: 'User requests access → Agent evaluates: role + data classification + time + purpose → Grants temporary access + logs decision.',
      },
      advanced: {
        explanation: 'Attribute-based access control (ABAC), privacy-preserving query rewriting, differential privacy integration, and zero-trust architectures.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['data-governance-agent', 'guardrails', 'human-in-the-loop'],
    usedInLessons: ['lesson-07'],
  },
  {
    id: 'compliance-automation',
    term: 'Compliance Automation',
    slug: 'compliance-automation',
    popup: {
      beginner: {
        explanation: 'Instead of manually checking 500 rules, AI checks them all automatically and tells you what\'s wrong.',
        example: 'GDPR says "right to be forgotten." Agent ensures every system can actually delete user data when requested.',
      },
      intermediate: {
        explanation: 'Regulation-to-code translation, automated control testing, audit trail generation, and gap analysis against frameworks.',
        example: 'Map SOC2 controls → Agent continuously tests each control → Generates evidence → Flags gaps → Suggests remediation.',
      },
      advanced: {
        explanation: 'Cross-regulation mapping, continuous control monitoring, regulatory change impact analysis, and automated evidence collection.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['data-governance-agent', 'evaluation', 'guardrails'],
    usedInLessons: ['lesson-07'],
  },
  {
    id: 'ci-cd-agent',
    term: 'CI/CD Agent',
    slug: 'ci-cd-agent',
    popup: {
      beginner: {
        explanation: 'AI that reviews your code, runs tests, and catches problems before they reach production. Your automated quality gate.',
        example: 'Code pushed → Agent runs tests → Spots a security issue → Blocks deploy → Suggests fix.',
      },
      intermediate: {
        explanation: 'Automated PR reviews, deployment risk scoring, canary analysis, and intelligent rollback decisions based on metrics.',
        example: 'PR opened → Agent reviews for bugs, security, style → Scores risk → Low risk: auto-merge → High risk: request human review.',
      },
      advanced: {
        explanation: 'Canary analysis with statistical significance, infrastructure-as-code generation, incident correlation, and progressive delivery.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['code-generation-agent', 'self-healing', 'evaluation'],
    usedInLessons: ['lesson-07'],
  },
  {
    id: 'semantic-layer',
    term: 'Semantic Layer',
    slug: 'semantic-layer',
    popup: {
      beginner: {
        explanation: 'A translator that knows "revenue" in Sales means the same as "income" in Finance. One language for all your data.',
        example: 'Sales says "revenue." Finance says "gross income." The semantic layer knows they\'re the same thing.',
      },
      intermediate: {
        explanation: 'Business metric definitions, unified data model, query abstraction. Ensures consistent definitions across tools and teams.',
        example: 'Define "active user" once → Every dashboard, query, and agent uses the same definition → No more conflicting numbers.',
      },
      advanced: {
        explanation: 'Knowledge graph-backed semantic models, metrics store integration (Cube, dbt Metrics), self-updating definitions from usage.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['natural-language-query', 'data-governance-agent', 'rag'],
    usedInLessons: ['lesson-07'],
  },
  {
    id: 'self-healing',
    term: 'Self-Healing',
    slug: 'self-healing',
    popup: {
      beginner: {
        explanation: 'When something breaks at 3 AM, the AI fixes it instead of paging you. Systems that detect and repair their own problems.',
        example: 'Database connection drops → Agent detects → Retries with backoff → Reconnects → Logs incident → You sleep through it.',
      },
      intermediate: {
        explanation: 'Automated incident detection, root cause analysis, remediation playbooks, and progressive fix application with rollback.',
        example: 'Pipeline fails → Agent diagnoses: missing column → Checks if column was renamed → Applies schema migration → Reruns job.',
      },
      advanced: {
        explanation: 'Causal inference for root cause, progressive remediation with blast radius estimation, and learning from past incidents.',
      },
    },
    hasDeepDive: true,
    relatedTerms: ['data-pipeline-agent', 'error-recovery', 'ci-cd-agent'],
    usedInLessons: ['lesson-07'],
  },
];

export const lesson07AdvancedTopics: AdvancedTopic[] = [
  {
    id: 'data-mesh-agents',
    title: 'Data Mesh & Domain Agents',
    description: 'Decentralized data ownership with domain-specific AI agents',
    difficulty: 'advanced',
    prerequisites: ['data-pipeline-agent', 'data-governance-agent'],
    hasDeepDive: true,
  },
  {
    id: 'ai-governance-of-ai',
    title: 'Governing AI Agents',
    description: 'Meta-governance: using policies to control AI that controls data',
    difficulty: 'advanced',
    prerequisites: ['data-governance-agent', 'compliance-automation'],
    hasDeepDive: true,
  },
  {
    id: 'enterprise-agent-architecture',
    title: 'Enterprise Agent Architecture',
    description: 'Scaling agent systems across teams, departments, and organizations',
    difficulty: 'advanced',
    prerequisites: ['orchestration', 'data-pipeline-agent'],
    hasDeepDive: true,
  },
  {
    id: 'roi-measurement',
    title: 'Measuring Agent ROI',
    description: 'Quantifying the business value of AI agent implementations',
    difficulty: 'intermediate',
    prerequisites: ['data-quality-agent', 'ci-cd-agent'],
    hasDeepDive: true,
  },
];

export const lesson07Content: Record<UserLevel, string> = {
  beginner: `## AI Goes to Work

Lessons 5 and 6 taught you how agents think and how to design them. Now let's see what they actually DO in real companies.

> **The Automation Evolution**
>
> First, we automated repetitive tasks (scripts, cron jobs).
> Then, we automated decisions (if-else rules, ML models).
> Now, agentic AI automates entire WORKFLOWS — planning, deciding, and adapting.

This isn't theory. Companies are deploying these systems today. By the end of this lesson, you'll understand exactly where AI agents create the most value — and where to start.

## Part 1: Reshaping Data Engineering

### The Problem

Data engineers spend most of their time on:
- Building pipelines that break
- Fixing schema changes from upstream teams
- Monitoring data quality
- Debugging failed jobs at 3 AM

What if AI could handle most of this?

### [Data Pipeline Agents]: Build, Monitor, Fix

A [data-pipeline-agent] watches your data flows 24/7. When something goes wrong, it doesn't just alert you — it tries to fix it.

\`\`\`mermaid
flowchart LR
    A[Data Arrives] --> B[Pipeline Agent]
    B --> C{Schema Changed?}
    C -->|Yes| D[Auto-Adapt Pipeline]
    C -->|No| E[Process Normally]
    D --> F[Alert Engineer]
    E --> G[Quality Check]
    G -->|Issues Found| H[Self-Healing Agent]
    G -->|All Clean| I[Data Ready]
    H --> I
\`\`\`

**Before agents:**

Pipeline breaks at 3 AM → PagerDuty alert → Engineer wakes up → Spends 2 hours debugging → Discovers the payments team added a new column → Fixes the pipeline → Goes back to bed, grumpy

**After agents:**

Pipeline breaks at 3 AM → Agent detects issue → Identifies root cause (schema drift in orders table) → Applies adaptive fix → Runs validation → Sends morning summary: "Fixed schema drift, added new 'payment_method' column, 0 records lost"

### Real Scenario: The Midnight Schema Change

Your orders table schema changed because the payments team added a \`payment_method\` field. Here's what the agent does:

1. **Detect**: "Incoming data has 15 columns, but pipeline expects 14"
2. **Analyze**: "New column 'payment_method' (string type) detected at position 12"
3. **Decide**: "This is an additive change, not breaking. Safe to auto-adapt."
4. **Act**: Update pipeline schema, add column to destination table
5. **Validate**: Run data quality checks on the new column
6. **Report**: "Schema adapted successfully. New column 'payment_method' added. 847 distinct values observed."

### [Data Quality Agents]: Your Data Inspector

A [data-quality-agent] continuously monitors your data for problems. It catches issues before they become broken dashboards or wrong decisions.

| What It Catches | How | Example |
|-----------------|-----|---------|
| **Missing values** | Statistical monitoring | "Orders table suddenly has 40% null zip codes" |
| **Duplicates** | Fuzzy matching | "Found 230 duplicate customer records" |
| **Drift** | Distribution comparison | "Average order value shifted 3 standard deviations" |
| **Staleness** | Freshness checks | "Inventory feed hasn't updated in 6 hours" |
| **Invalid values** | Rule-based validation | "Order amount is negative for 12 records" |

\`\`\`mermaid
flowchart TD
    A[Data Arrives] --> B[Quality Agent]
    B --> C[Profile Data]
    C --> D[Check Rules]
    D --> E{Issues Found?}
    E -->|Critical| F[Block Pipeline]
    E -->|Warning| G[Alert Team]
    E -->|Clean| H[Continue]
    F --> I[Root Cause Analysis]
    I --> J[Suggest Fix]
\`\`\`

### [Self-Healing] Pipelines

[Self-healing] systems detect and fix their own problems. Instead of waking you up at 3 AM, the agent handles common failures automatically.

**What self-healing agents can fix:**

| Problem | Agent Response |
|---------|---------------|
| Database connection timeout | Retry with exponential backoff |
| Source file missing | Wait and retry, alert if still missing after 1 hour |
| Schema mismatch | Adapt schema if safe, block if breaking change |
| Memory overflow | Reduce batch size, reprocess in smaller chunks |
| Upstream delay | Reschedule downstream jobs, notify dependent teams |

**What requires human intervention:**

| Problem | Why |
|---------|-----|
| Data looks wrong but passes all rules | Agent can't know business context |
| Multiple systems failing simultaneously | Could be larger infrastructure issue |
| Regulatory implications | Humans must make compliance decisions |
| First-time failure pattern | No playbook exists yet |

## Part 2: Governance & Compliance

### Why This Matters

Companies today deal with:
- **GDPR** (Europe) — privacy rights, data portability
- **HIPAA** (US Healthcare) — protected health information
- **SOC2** — security and availability controls
- **PCI-DSS** — credit card data protection
- **CCPA** (California) — consumer privacy rights

Regulations change constantly. Manual compliance is expensive and error-prone. One mistake can mean millions in fines.

### [Data Governance Agents]: The Policy Enforcer

A [data-governance-agent] automatically classifies data, applies policies, and enforces rules — without slowing down your teams.

\`\`\`mermaid
flowchart TD
    A[New Data Arrives] --> B[Governance Agent]
    B --> C[Scan & Classify]
    C --> D{Contains PII?}
    D -->|Yes| E[Apply Masking Policy]
    D -->|No| F[Standard Processing]
    E --> G[Set Access Controls]
    F --> G
    G --> H[Log for Audit]
    H --> I[Data Available]
\`\`\`

**Real example:**

New customer table arrives from marketing acquisition:

1. **Scan**: Agent examines each column
2. **Classify**: Detects "ssn" → PII, "email" → PII, "date_of_birth" → PII, "favorite_color" → Not sensitive
3. **Apply policy**: SSN masked (showing last 4 digits), email tokenized, DOB restricted to HR & Compliance
4. **Set access**: Column-level permissions applied
5. **Log**: Classification decision recorded for audit trail

### [Compliance Automation]: From Checklists to Agents

[Compliance-automation] transforms regulatory requirements into continuously monitored controls.

| Manual Compliance | Agent-Driven Compliance |
|-------------------|------------------------|
| Quarterly audits | Continuous monitoring |
| Spreadsheet checklists | Automated control testing |
| Weeks to assess change impact | Minutes to assess change impact |
| Reactive (find issues after) | Proactive (prevent issues) |
| Evidence gathering is painful | Evidence auto-collected |

**How it works:**

\`\`\`mermaid
flowchart LR
    A[Regulation] --> B[Map to Controls]
    B --> C[Automated Tests]
    C --> D{Passing?}
    D -->|Yes| E[Generate Evidence]
    D -->|No| F[Alert + Remediation]
    E --> G[Audit-Ready Report]
    F --> G
\`\`\`

**Example: GDPR "Right to be Forgotten"**

GDPR says users can request their data be deleted. The compliance agent:

1. **Maps requirement**: "Right to be forgotten" → "All user data deletable within 30 days"
2. **Identifies data**: Traces user data across 47 systems using lineage
3. **Tests control**: Runs simulated deletion, verifies data is gone
4. **Reports**: "User deletion capability confirmed in 45/47 systems. Gaps identified: legacy CRM, archived logs. Remediation ticket created."

## Part 3: Data Access & Security

### The Problem

- "Can I get access to the sales database?" → 3-week ticket
- Analysts write SQL → accidentally query PII columns
- Nobody knows who accessed what, when, or why
- Every team has different "revenue" numbers

### [Natural Language Query]: Ask Data Questions in English

[Natural-language-query] agents let you ask questions in plain English instead of writing SQL.

\`\`\`
User: "What were our top 10 products by revenue last quarter?"

Agent thinks:
  1. Identify tables: products, orders, order_items
  2. "Last quarter" = October-December 2025
  3. Aggregate: SUM(quantity * price) GROUP BY product_id
  4. Sort and limit: ORDER BY revenue DESC LIMIT 10
  5. Safety check: No PII columns accessed ✓
  6. Access check: User has permission ✓

Agent generates and runs SQL → Returns formatted table with product names and revenue
\`\`\`

**What makes this hard:**

| Challenge | How Agent Handles It |
|-----------|---------------------|
| Ambiguous terms | Uses [semantic-layer] for consistent definitions |
| Multiple ways to answer | Picks most efficient query path |
| Access restrictions | Filters to allowed tables/columns |
| Complex joins | Reasons about relationships |
| Error-prone SQL | Validates before execution |

### [Access Control Agents]: Smart Permissions

An [access-control-agent] makes access decisions based on context, not just static roles.

\`\`\`mermaid
flowchart TD
    A[Access Request] --> B[Access Control Agent]
    B --> C{Check Role}
    C --> D{Check Data Classification}
    D --> E{Check Purpose}
    E --> F{Check Time/Location}
    F --> G{All Checks Pass?}
    G -->|Yes| H[Grant Access]
    G -->|No| I[Deny + Explain]
    H --> J[Log Decision]
    I --> J
\`\`\`

**Example:**

Sarah (Data Analyst, Marketing Team) requests access to customer emails:

- **Role check**: ✓ Analyst role has email access potential
- **Classification**: Customer emails are PII (requires justification)
- **Purpose**: Sarah submits "Customer segmentation analysis"
- **Time**: Request is during business hours, from company network
- **Decision**: APPROVE — temporary access for 7 days, logged

vs.

Bob (Contractor, External) requests same access:

- **Role check**: ✓ Contractor role technically allows it
- **Classification**: Customer emails are PII
- **Purpose**: None provided
- **Decision**: DENY — "External contractors require manager approval and stated business purpose for PII access"

### [Semantic Layer]: One Language for All Data

The [semantic-layer] ensures everyone speaks the same data language.

**The problem it solves:**

| Team | What they call "Revenue" |
|------|-------------------------|
| Sales | Booked deals (including pending) |
| Finance | Recognized revenue (GAAP compliant) |
| Marketing | All transactions (including refunds) |
| Executive | Whatever's in the last board deck |

**With a semantic layer:**

\`\`\`
metric: revenue
  definition: SUM(order_amount) WHERE status = 'completed' AND refunded = false
  owner: Finance Team
  last_updated: 2025-12-01
  used_by: 47 dashboards, 12 agents, 203 queries last month
\`\`\`

Everyone — humans AND agents — uses the same definition.

## Part 4: Code Generation & DevOps

### [Code Generation Agents]: Your AI Pair Programmer

A [code-generation-agent] goes beyond autocomplete. It understands your entire codebase and can make meaningful contributions.

| Capability | Example |
|------------|---------|
| **Write new features** | "Add pagination to the users API" |
| **Find and fix bugs** | "This test is failing, diagnose and fix" |
| **Generate tests** | "Write unit tests for the auth module" |
| **Review PRs** | "Check this PR for security issues" |
| **Refactor** | "Migrate this module from callbacks to async/await" |
| **Document** | "Add docstrings to the utils package" |

**Key insight**: The agent isn't just generating code — it's reasoning about your codebase:

- What patterns does this team use?
- What libraries are already imported?
- What's the testing style here?
- What would break if I change this?

### [CI/CD Agents]: Smarter Deployments

A [ci-cd-agent] integrates into your deployment pipeline to catch problems before production.

\`\`\`mermaid
flowchart TD
    A[Code Push] --> B[CI/CD Agent]
    B --> C[Run Tests]
    C --> D{Tests Pass?}
    D -->|No| E[Diagnose Failures]
    E --> F[Suggest Fixes]
    D -->|Yes| G[Security Scan]
    G --> H[Risk Assessment]
    H -->|Low Risk| I[Auto-Deploy]
    H -->|High Risk| J[Request Human Review]
    I --> K[Monitor Deployment]
    K -->|Issues| L[Auto-Rollback]
    K -->|Healthy| M[Deploy Complete]
\`\`\`

**What determines "high risk"?**

| Factor | Low Risk | High Risk |
|--------|----------|-----------|
| Files changed | < 10 files | > 50 files |
| Areas touched | One service | Multiple services |
| Test coverage | > 80% | < 50% |
| Author history | Experienced contributor | First contribution |
| Time | Business hours | Friday 5 PM |
| Dependencies | None changed | Major version bump |

### Real Scenario: The Friday Deployment

Developer pushes code Friday at 4:30 PM:

**Without CI/CD agent:**
- Tests pass → Auto-deploy → Bug hits production → Weekend incident → Angry customers

**With CI/CD agent:**
- Tests pass → Agent analyzes: "This change touches payment processing"
- Risk factors: Friday deployment + critical path + moderate test coverage
- **Decision**: "Deployment blocked. Risk score: 7/10. Recommend deploying Monday with staged rollout. Here's what I found concerning: [list]. Override requires senior engineer approval."

## The Big Picture

Here's how these agents work together in a modern data-driven organization:

\`\`\`mermaid
flowchart TB
    subgraph "Data Engineering"
        A[Pipeline Agents]
        B[Quality Agents]
        C[Self-Healing]
    end
    subgraph "Governance"
        D[Classification Agents]
        E[Compliance Agents]
        F[Access Control]
    end
    subgraph "Data Access"
        G[NL Query Agents]
        H[Semantic Layer]
    end
    subgraph "DevOps"
        I[Code Gen Agents]
        J[CI/CD Agents]
    end

    A --> D
    B --> E
    A --> B
    D --> F
    G --> H
    G --> F
    I --> J
    C --> A
\`\`\`

**The connections matter:**
- Pipeline agents tell governance agents about new data
- Quality agents feed compliance reporting
- NL Query agents use the semantic layer and respect access control
- Code gen agents feed into CI/CD agents

## Getting Started: Where to Begin?

Don't try to build everything at once. Start with ONE agent in ONE workflow.

### Highest-ROI Starting Points

| If You're A... | Start With | Why |
|----------------|------------|-----|
| **Data Engineer** | [Data Quality Agent] | Biggest time saver, lowest risk |
| **Tech Leader** | [Natural Language Query] | Immediate visible impact for stakeholders |
| **DevOps Engineer** | [CI/CD Agent] | Direct productivity boost |
| **Compliance Officer** | [Data Governance Agent] | Regulatory risk reduction |
| **Data Analyst** | [Semantic Layer] + NL Query | Self-service without SQL |

### The 30-Day Pilot

Week 1: Pick ONE workflow. Map the current process. Identify the pain points.

Week 2: Build a minimal agent that handles the most common case (not all edge cases).

Week 3: Run in "shadow mode" — agent suggests actions but humans approve everything.

Week 4: Review results. Calculate time saved. Decide: expand, iterate, or pivot.

## Key Takeaways

- [Data-pipeline-agent]s catch schema changes, failures, and anomalies 24/7
- [Data-quality-agent]s continuously monitor for issues before they impact decisions
- [Self-healing] systems fix common problems without human intervention
- [Data-governance-agent]s automate classification, policy enforcement, and audit logging
- [Compliance-automation] turns regulations into continuously tested controls
- [Natural-language-query] lets anyone ask data questions without SQL
- [Access-control-agent]s make context-aware permission decisions
- [Semantic-layer]s ensure everyone (humans and AI) uses the same definitions
- [Code-generation-agent]s understand your entire codebase, not just the current file
- [CI-cd-agent]s catch risky deployments before they reach production

**Remember**: Start small. Pick one workflow. Prove value. Expand.

You now have a complete picture of how AI agents transform real enterprise workflows — from the fundamentals in Lessons 1-5, to the architecture patterns in Lesson 6, to the practical applications here in Lesson 7.`,

  intermediate: `## Building Enterprise AI Agents

This lesson covers practical implementation of AI agents across enterprise workflows: data engineering, governance, security, and DevOps. We'll examine architectures, code patterns, and integration strategies you can apply today.

The key insight is that these agents don't replace existing infrastructure — they augment it. A [data-pipeline-agent] integrates with your existing Airflow or dbt setup. A [ci-cd-agent] plugs into GitHub Actions or Jenkins. The agent layer adds intelligence without requiring you to rearchitect everything.

## Part 1: Data Engineering Agents

### [Data Pipeline Agent] Architecture

A [data-pipeline-agent] monitors, adapts, and repairs data pipelines. Here's the architecture:

\`\`\`mermaid
flowchart TB
    subgraph "Monitoring Layer"
        A[Schema Monitor]
        B[Execution Monitor]
        C[Quality Monitor]
    end
    subgraph "Agent Core"
        D[Event Processor]
        E[Decision Engine]
        F[Action Executor]
    end
    subgraph "Integration Layer"
        G[Airflow/Dagster API]
        H[dbt API]
        I[Data Catalog]
        J[Alerting System]
    end

    A --> D
    B --> D
    C --> D
    D --> E
    E --> F
    F --> G
    F --> H
    F --> I
    F --> J
\`\`\`

### Implementation: Schema Drift Detection

\`\`\`typescript
interface SchemaChange {
  table: string;
  changeType: 'column_added' | 'column_removed' | 'type_changed' | 'nullable_changed';
  details: {
    column?: string;
    oldValue?: any;
    newValue?: any;
  };
  detectedAt: Date;
  severity: 'breaking' | 'non_breaking' | 'unknown';
}

class SchemaDriftAgent {
  private catalog: DataCatalog;
  private pipelineManager: PipelineManager;
  private llm: LLM;

  async detectAndHandle(table: string, newSchema: Schema): Promise<void> {
    const currentSchema = await this.catalog.getSchema(table);
    const changes = this.compareSchemas(currentSchema, newSchema);

    if (changes.length === 0) return;

    for (const change of changes) {
      const severity = await this.assessSeverity(change);
      change.severity = severity;

      if (severity === 'non_breaking') {
        await this.handleNonBreakingChange(change);
      } else if (severity === 'breaking') {
        await this.handleBreakingChange(change);
      } else {
        await this.escalateToHuman(change);
      }
    }
  }

  private async assessSeverity(change: SchemaChange): Promise<string> {
    // Use LLM to assess impact
    const downstreamDeps = await this.catalog.getDownstreamDependencies(change.table);

    const assessment = await this.llm.generate(\`
      Schema change detected:
      Table: \${change.table}
      Change: \${JSON.stringify(change)}

      Downstream dependencies: \${downstreamDeps.map(d => d.name).join(', ')}

      Assess if this is:
      - non_breaking: Can be auto-handled (e.g., additive column)
      - breaking: Requires pipeline changes (e.g., removed required column)
      - unknown: Needs human review

      Consider: Will downstream queries still work? Will data types coerce safely?

      Output: { "severity": "...", "reasoning": "...", "affectedPipelines": [...] }
    \`);

    return JSON.parse(assessment).severity;
  }

  private async handleNonBreakingChange(change: SchemaChange): Promise<void> {
    // Auto-adapt pipelines
    const affectedPipelines = await this.pipelineManager.findAffected(change.table);

    for (const pipeline of affectedPipelines) {
      if (change.changeType === 'column_added') {
        await this.pipelineManager.addColumnMapping(pipeline.id, change.details.column!);
      }

      // Update catalog
      await this.catalog.recordSchemaChange(change);

      // Notify team
      await this.notify({
        level: 'info',
        message: \`Schema change auto-handled: \${change.table}.\${change.details.column}\`,
        details: change
      });
    }
  }

  private async handleBreakingChange(change: SchemaChange): Promise<void> {
    // Pause affected pipelines
    const affectedPipelines = await this.pipelineManager.findAffected(change.table);

    for (const pipeline of affectedPipelines) {
      await this.pipelineManager.pause(pipeline.id);
    }

    // Generate remediation plan
    const plan = await this.generateRemediationPlan(change, affectedPipelines);

    // Create ticket with plan
    await this.createIncident({
      severity: 'high',
      title: \`Breaking schema change: \${change.table}\`,
      description: \`
        Change: \${JSON.stringify(change)}
        Affected pipelines: \${affectedPipelines.map(p => p.name).join(', ')}

        Recommended remediation:
        \${plan}
      \`,
      assignee: await this.findOwner(change.table)
    });
  }
}
\`\`\`

### [Data Quality Agent] Implementation

Integrate with frameworks like Great Expectations or dbt tests:

\`\`\`typescript
interface DataExpectation {
  id: string;
  table: string;
  column?: string;
  type: 'not_null' | 'unique' | 'in_range' | 'regex' | 'custom_sql' | 'statistical';
  params: Record<string, any>;
  severity: 'critical' | 'warning' | 'info';
}

interface QualityResult {
  expectation: DataExpectation;
  passed: boolean;
  observedValue: any;
  details: string;
  suggestedRemediation?: string;
}

class DataQualityAgent {
  async runQualityChecks(table: string): Promise<QualityResult[]> {
    const expectations = await this.loadExpectations(table);
    const profile = await this.profileTable(table);
    const results: QualityResult[] = [];

    for (const expectation of expectations) {
      const result = await this.checkExpectation(expectation, profile);

      if (!result.passed) {
        result.suggestedRemediation = await this.suggestRemediation(
          expectation,
          result,
          profile
        );
      }

      results.push(result);
    }

    // Handle critical failures
    const criticalFailures = results.filter(
      r => !r.passed && r.expectation.severity === 'critical'
    );

    if (criticalFailures.length > 0) {
      await this.handleCriticalFailures(table, criticalFailures);
    }

    return results;
  }

  private async suggestRemediation(
    expectation: DataExpectation,
    result: QualityResult,
    profile: TableProfile
  ): Promise<string> {
    const lineage = await this.getUpstreamLineage(expectation.table);

    const suggestion = await this.llm.generate(\`
      Data quality issue detected:
      Table: \${expectation.table}
      Expectation: \${JSON.stringify(expectation)}
      Result: \${JSON.stringify(result)}

      Table profile: \${JSON.stringify(profile)}
      Upstream lineage: \${JSON.stringify(lineage)}

      Suggest remediation:
      1. Root cause analysis (what likely caused this?)
      2. Immediate fix (how to correct the data?)
      3. Prevention (how to stop this from recurring?)
    \`);

    return suggestion;
  }

  private async handleCriticalFailures(
    table: string,
    failures: QualityResult[]
  ): Promise<void> {
    // Pause downstream pipelines
    const downstreamPipelines = await this.catalog.getDownstreamPipelines(table);
    for (const pipeline of downstreamPipelines) {
      await this.pipelineManager.pause(pipeline.id, {
        reason: 'data_quality_failure',
        blockingIssues: failures.map(f => f.expectation.id)
      });
    }

    // Send alerts
    await this.alerting.send({
      severity: 'critical',
      title: \`Data quality failures in \${table}\`,
      details: failures,
      actions: [
        { label: 'View Details', url: this.buildDashboardUrl(table) },
        { label: 'Acknowledge', callback: 'acknowledge' }
      ]
    });
  }
}
\`\`\`

### [Self-Healing] Pipeline Implementation

\`\`\`typescript
interface RemediationPlaybook {
  errorPattern: RegExp;
  severity: 'auto_fix' | 'suggest' | 'escalate';
  actions: RemediationAction[];
}

interface RemediationAction {
  type: 'retry' | 'modify_config' | 'run_script' | 'notify' | 'escalate';
  params: Record<string, any>;
}

class SelfHealingAgent {
  private playbooks: RemediationPlaybook[] = [
    {
      errorPattern: /connection.*timeout/i,
      severity: 'auto_fix',
      actions: [
        { type: 'retry', params: { maxAttempts: 3, backoffMs: 5000 } },
        { type: 'notify', params: { level: 'info', message: 'Recovered from connection timeout' } }
      ]
    },
    {
      errorPattern: /out of memory/i,
      severity: 'auto_fix',
      actions: [
        { type: 'modify_config', params: { setting: 'batch_size', factor: 0.5 } },
        { type: 'retry', params: { maxAttempts: 1 } }
      ]
    },
    {
      errorPattern: /schema.*mismatch/i,
      severity: 'suggest',
      actions: [
        { type: 'escalate', params: { reason: 'Schema change requires review' } }
      ]
    }
  ];

  async handleFailure(job: Job, error: Error): Promise<RemediationResult> {
    const playbook = this.findMatchingPlaybook(error);

    if (!playbook) {
      return this.handleUnknownError(job, error);
    }

    if (playbook.severity === 'auto_fix') {
      return this.executePlaybook(job, playbook);
    } else if (playbook.severity === 'suggest') {
      return this.suggestRemediation(job, playbook);
    } else {
      return this.escalate(job, error);
    }
  }

  private async executePlaybook(
    job: Job,
    playbook: RemediationPlaybook
  ): Promise<RemediationResult> {
    const results: ActionResult[] = [];

    for (const action of playbook.actions) {
      const result = await this.executeAction(job, action);
      results.push(result);

      if (!result.success && action.type !== 'notify') {
        // Action failed, try next playbook or escalate
        break;
      }
    }

    const success = results.every(r => r.success);

    if (success) {
      await this.recordRecovery(job, playbook, results);
    }

    return { success, actions: results };
  }

  private async handleUnknownError(job: Job, error: Error): Promise<RemediationResult> {
    // Use LLM to diagnose and suggest
    const context = await this.gatherContext(job);

    const diagnosis = await this.llm.generate(\`
      Pipeline job failed with unknown error pattern.

      Job: \${JSON.stringify(job)}
      Error: \${error.message}
      Stack: \${error.stack}

      Recent successful runs: \${JSON.stringify(context.recentRuns)}
      Recent changes: \${JSON.stringify(context.recentChanges)}

      Diagnose:
      1. What likely caused this failure?
      2. Is this safe to auto-retry?
      3. What remediation steps would you suggest?

      Output: { "cause": "...", "safeToRetry": boolean, "remediation": [...] }
    \`);

    const result = JSON.parse(diagnosis);

    if (result.safeToRetry) {
      // Add to playbook for future
      this.learnNewPlaybook(error, result.remediation);
      return this.retryWithRemediation(job, result.remediation);
    }

    return this.escalate(job, error, result);
  }
}
\`\`\`

## Part 2: Governance & Compliance Agents

### [Data Governance Agent] Architecture

\`\`\`mermaid
flowchart TB
    subgraph "Detection Layer"
        A[Schema Scanner]
        B[Content Analyzer]
        C[Pattern Matcher]
    end
    subgraph "Policy Engine"
        D[Classification Engine]
        E[Policy Evaluator]
        F[Action Dispatcher]
    end
    subgraph "Enforcement Layer"
        G[Masking Service]
        H[Access Control]
        I[Audit Logger]
    end

    A --> D
    B --> D
    C --> D
    D --> E
    E --> F
    F --> G
    F --> H
    F --> I
\`\`\`

### PII Detection and Classification

\`\`\`typescript
interface ClassificationResult {
  column: string;
  classification: 'PII' | 'PHI' | 'PCI' | 'CONFIDENTIAL' | 'PUBLIC';
  subtype?: string;  // e.g., 'email', 'ssn', 'credit_card'
  confidence: number;
  evidence: string[];
  recommendedPolicy: string;
}

class DataGovernanceAgent {
  private patternMatchers: PatternMatcher[];
  private contentAnalyzer: LLM;

  async classifyTable(table: string): Promise<ClassificationResult[]> {
    const schema = await this.catalog.getSchema(table);
    const sample = await this.getSample(table, 1000);
    const results: ClassificationResult[] = [];

    for (const column of schema.columns) {
      // Pattern-based detection
      const patternMatches = this.runPatternMatchers(column, sample);

      // Content-based detection (LLM)
      const contentAnalysis = await this.analyzeContent(column, sample);

      // Name-based inference
      const nameInference = this.inferFromName(column.name);

      // Combine signals
      const classification = this.combineSignals(
        patternMatches,
        contentAnalysis,
        nameInference
      );

      results.push({
        column: column.name,
        ...classification
      });
    }

    // Apply policies based on classification
    await this.applyPolicies(table, results);

    return results;
  }

  private async analyzeContent(
    column: ColumnSchema,
    sample: any[]
  ): Promise<ContentAnalysis> {
    const values = sample.map(row => row[column.name]).filter(Boolean).slice(0, 100);

    const analysis = await this.contentAnalyzer.generate(\`
      Analyze this data column for sensitive information.

      Column name: \${column.name}
      Data type: \${column.type}
      Sample values: \${JSON.stringify(values)}

      Determine:
      1. Does this contain PII (personally identifiable information)?
      2. Does this contain PHI (protected health information)?
      3. Does this contain PCI data (payment card info)?
      4. What specific data type is this (email, SSN, phone, etc.)?
      5. Confidence level (0-1)?

      Output: { "classification": "...", "subtype": "...", "confidence": 0.X, "evidence": [...] }
    \`);

    return JSON.parse(analysis);
  }

  private async applyPolicies(
    table: string,
    classifications: ClassificationResult[]
  ): Promise<void> {
    for (const classification of classifications) {
      const policy = await this.policyEngine.getPolicy(classification.classification);

      // Apply masking
      if (policy.requiresMasking) {
        await this.maskingService.configure(table, classification.column, {
          method: policy.maskingMethod,
          parameters: policy.maskingParams
        });
      }

      // Set access controls
      if (policy.restrictedAccess) {
        await this.accessControl.setColumnPolicy(table, classification.column, {
          allowedRoles: policy.allowedRoles,
          requiresJustification: policy.requiresJustification,
          auditLevel: policy.auditLevel
        });
      }

      // Log classification decision
      await this.auditLogger.logClassification({
        table,
        column: classification.column,
        classification: classification.classification,
        confidence: classification.confidence,
        evidence: classification.evidence,
        appliedPolicy: policy.id,
        timestamp: new Date()
      });
    }
  }
}
\`\`\`

### [Compliance Automation] Implementation

\`\`\`typescript
interface ComplianceControl {
  id: string;
  framework: 'SOC2' | 'GDPR' | 'HIPAA' | 'PCI_DSS';
  requirement: string;
  testType: 'automated' | 'evidence_based' | 'manual';
  automatedTest?: () => Promise<TestResult>;
  evidenceQuery?: string;
}

class ComplianceAutomationAgent {
  private controls: ComplianceControl[];

  async runComplianceChecks(framework: string): Promise<ComplianceReport> {
    const controls = this.controls.filter(c => c.framework === framework);
    const results: ControlResult[] = [];

    for (const control of controls) {
      let result: ControlResult;

      if (control.testType === 'automated') {
        result = await this.runAutomatedTest(control);
      } else if (control.testType === 'evidence_based') {
        result = await this.gatherEvidence(control);
      } else {
        result = await this.checkManualControl(control);
      }

      results.push(result);
    }

    return this.generateReport(framework, results);
  }

  private async runAutomatedTest(control: ComplianceControl): Promise<ControlResult> {
    try {
      const result = await control.automatedTest!();
      return {
        controlId: control.id,
        status: result.passed ? 'passed' : 'failed',
        evidence: result.evidence,
        testedAt: new Date(),
        details: result.details
      };
    } catch (error) {
      return {
        controlId: control.id,
        status: 'error',
        error: error.message,
        testedAt: new Date()
      };
    }
  }

  private async gatherEvidence(control: ComplianceControl): Promise<ControlResult> {
    // Run evidence query
    const evidence = await this.dataWarehouse.query(control.evidenceQuery!);

    // Use LLM to assess if evidence satisfies control
    const assessment = await this.llm.generate(\`
      Compliance control: \${control.requirement}

      Evidence gathered:
      \${JSON.stringify(evidence)}

      Does this evidence demonstrate compliance with the control?
      Consider:
      - Is the evidence complete?
      - Is it recent enough?
      - Does it address all aspects of the requirement?

      Output: { "compliant": boolean, "gaps": [...], "confidence": 0.X }
    \`);

    const result = JSON.parse(assessment);

    return {
      controlId: control.id,
      status: result.compliant ? 'passed' : 'failed',
      evidence: evidence,
      gaps: result.gaps,
      confidence: result.confidence,
      testedAt: new Date()
    };
  }

  private generateReport(
    framework: string,
    results: ControlResult[]
  ): ComplianceReport {
    const passed = results.filter(r => r.status === 'passed').length;
    const failed = results.filter(r => r.status === 'failed').length;
    const manual = results.filter(r => r.status === 'manual_required').length;

    return {
      framework,
      generatedAt: new Date(),
      summary: {
        total: results.length,
        passed,
        failed,
        manualRequired: manual,
        complianceScore: (passed / results.length) * 100
      },
      results,
      remediationPlan: this.generateRemediationPlan(results.filter(r => r.status === 'failed')),
      nextReviewDate: this.calculateNextReview(framework)
    };
  }
}
\`\`\`

## Part 3: Data Access Agents

### [Natural Language Query] Agent

\`\`\`typescript
interface NLQueryResult {
  sql: string;
  results: any[];
  explanation: string;
  confidence: number;
  executionTimeMs: number;
}

class NaturalLanguageQueryAgent {
  private semanticLayer: SemanticLayer;
  private accessControl: AccessControlAgent;
  private queryValidator: QueryValidator;

  async query(
    naturalLanguage: string,
    user: User
  ): Promise<NLQueryResult> {
    // Step 1: Understand the question
    const intent = await this.parseIntent(naturalLanguage);

    // Step 2: Get allowed schema
    const allowedSchema = await this.accessControl.getAccessibleSchema(user);

    // Step 3: Map to semantic layer concepts
    const semanticMapping = await this.semanticLayer.mapConcepts(intent);

    // Step 4: Generate SQL
    const sql = await this.generateSQL(intent, semanticMapping, allowedSchema);

    // Step 5: Validate (guardrails!)
    const validation = await this.queryValidator.validate(sql, {
      noDropStatements: true,
      noDeleteWithoutWhere: true,
      maxRowsReturn: 10000,
      allowedTables: allowedSchema.tables,
      forbiddenColumns: this.getPIIColumns(allowedSchema)
    });

    if (!validation.safe) {
      throw new QueryValidationError(validation.reason);
    }

    // Step 6: Execute
    const startTime = Date.now();
    const results = await this.database.query(sql);
    const executionTimeMs = Date.now() - startTime;

    // Step 7: Log for audit
    await this.auditLogger.logQuery({
      user: user.id,
      naturalLanguage,
      generatedSQL: sql,
      rowsReturned: results.length,
      executionTimeMs,
      timestamp: new Date()
    });

    return {
      sql,
      results,
      explanation: intent.reasoning,
      confidence: intent.confidence,
      executionTimeMs
    };
  }

  private async generateSQL(
    intent: QueryIntent,
    semanticMapping: SemanticMapping,
    schema: Schema
  ): Promise<string> {
    const prompt = \`
      Generate SQL for this query intent.

      User question: \${intent.originalQuestion}
      Parsed intent: \${JSON.stringify(intent)}

      Semantic definitions:
      \${semanticMapping.definitions.map(d => \`- \${d.term}: \${d.sql}\`).join('\\n')}

      Available schema:
      \${schema.tables.map(t => \`
        \${t.name}:
        \${t.columns.map(c => \`  - \${c.name} (\${c.type})\`).join('\\n')}
      \`).join('\\n')}

      Generate PostgreSQL. Use semantic definitions where applicable.
      Prioritize clarity over performance for simple queries.

      Output: { "sql": "...", "explanation": "..." }
    \`;

    const result = await this.llm.generate(prompt);
    return JSON.parse(result).sql;
  }
}
\`\`\`

### [Access Control Agent] with Dynamic Policies

\`\`\`typescript
interface AccessRequest {
  user: User;
  resource: DataResource;
  operation: 'read' | 'write' | 'delete';
  purpose?: string;
  context: RequestContext;
}

interface AccessDecision {
  allowed: boolean;
  reason: string;
  conditions?: AccessCondition[];
  expiresAt?: Date;
}

class AccessControlAgent {
  private policyEngine: PolicyEngine;
  private riskAssessor: RiskAssessor;

  async evaluateAccess(request: AccessRequest): Promise<AccessDecision> {
    // Get applicable policies
    const policies = await this.policyEngine.getPolicies(
      request.resource,
      request.user.roles
    );

    // Evaluate each policy
    const evaluations = await Promise.all(
      policies.map(p => this.evaluatePolicy(p, request))
    );

    // Combine policy decisions
    const decision = this.combinePolicyDecisions(evaluations);

    // Risk-based adjustment
    if (decision.allowed) {
      const risk = await this.riskAssessor.assess(request);

      if (risk.score > 0.7) {
        // High risk: require additional approval
        return {
          allowed: false,
          reason: 'High-risk access requires additional approval',
          conditions: [{ type: 'manager_approval', requiredBy: risk.approver }]
        };
      } else if (risk.score > 0.4) {
        // Medium risk: add conditions
        decision.conditions = [
          { type: 'time_limited', duration: '24h' },
          { type: 'enhanced_logging', level: 'detailed' }
        ];
      }
    }

    // Log decision
    await this.auditLogger.logAccessDecision({
      request,
      decision,
      evaluations,
      timestamp: new Date()
    });

    return decision;
  }

  private async evaluatePolicy(
    policy: Policy,
    request: AccessRequest
  ): Promise<PolicyEvaluation> {
    // Check static conditions
    const staticResult = this.evaluateStaticConditions(policy, request);

    if (!staticResult.passed) {
      return { policy: policy.id, allowed: false, reason: staticResult.reason };
    }

    // Check dynamic conditions (may require LLM reasoning)
    if (policy.dynamicConditions) {
      const dynamicResult = await this.evaluateDynamicConditions(
        policy.dynamicConditions,
        request
      );

      if (!dynamicResult.passed) {
        return { policy: policy.id, allowed: false, reason: dynamicResult.reason };
      }
    }

    return { policy: policy.id, allowed: true, reason: 'All conditions met' };
  }

  private async evaluateDynamicConditions(
    conditions: DynamicCondition[],
    request: AccessRequest
  ): Promise<{ passed: boolean; reason: string }> {
    for (const condition of conditions) {
      if (condition.type === 'purpose_validation') {
        // Use LLM to validate purpose
        const validation = await this.llm.generate(\`
          Access request context:
          User: \${request.user.name} (\${request.user.department})
          Resource: \${request.resource.name} (classification: \${request.resource.classification})
          Stated purpose: \${request.purpose}

          Is this purpose legitimate and aligned with:
          1. The user's role and department?
          2. The resource's intended use?
          3. Company data access policies?

          Output: { "valid": boolean, "reason": "..." }
        \`);

        const result = JSON.parse(validation);
        if (!result.valid) {
          return { passed: false, reason: result.reason };
        }
      }
    }

    return { passed: true, reason: 'All dynamic conditions met' };
  }
}
\`\`\`

## Part 4: DevOps Agents

### [CI/CD Agent] Implementation

\`\`\`typescript
interface DeploymentRiskAssessment {
  score: number;  // 0-10
  factors: RiskFactor[];
  recommendation: 'auto_deploy' | 'staged_rollout' | 'manual_review' | 'block';
  reasoning: string;
}

class CICDAgent {
  async assessDeployment(pr: PullRequest): Promise<DeploymentRiskAssessment> {
    const factors: RiskFactor[] = [];

    // Analyze code changes
    const codeAnalysis = await this.analyzeCodeChanges(pr);
    factors.push(...codeAnalysis.factors);

    // Check test coverage
    const coverage = await this.getTestCoverage(pr);
    if (coverage.delta < -5) {
      factors.push({
        name: 'coverage_decrease',
        score: 2,
        detail: \`Test coverage decreased by \${Math.abs(coverage.delta)}%\`
      });
    }

    // Check dependency changes
    const depChanges = await this.analyzeDependencies(pr);
    factors.push(...depChanges.factors);

    // Check deployment context
    const context = await this.getDeploymentContext();
    if (context.dayOfWeek === 5 && context.hour >= 16) {
      factors.push({
        name: 'friday_evening',
        score: 3,
        detail: 'Friday evening deployment'
      });
    }

    // Calculate total risk
    const score = Math.min(10, factors.reduce((sum, f) => sum + f.score, 0));

    // Determine recommendation
    let recommendation: string;
    if (score <= 2) {
      recommendation = 'auto_deploy';
    } else if (score <= 4) {
      recommendation = 'staged_rollout';
    } else if (score <= 7) {
      recommendation = 'manual_review';
    } else {
      recommendation = 'block';
    }

    // Generate reasoning
    const reasoning = await this.generateReasoning(factors, recommendation);

    return { score, factors, recommendation, reasoning };
  }

  private async analyzeCodeChanges(pr: PullRequest): Promise<CodeAnalysis> {
    const diff = await this.github.getDiff(pr);
    const factors: RiskFactor[] = [];

    // File count
    if (diff.filesChanged > 50) {
      factors.push({
        name: 'large_change',
        score: 2,
        detail: \`\${diff.filesChanged} files changed\`
      });
    }

    // Critical path changes
    const criticalPaths = ['src/auth/', 'src/payments/', 'src/database/'];
    const touchesCritical = diff.files.some(f =>
      criticalPaths.some(p => f.path.startsWith(p))
    );

    if (touchesCritical) {
      factors.push({
        name: 'critical_path',
        score: 3,
        detail: 'Changes to critical system paths'
      });
    }

    // Use LLM for semantic analysis
    const semanticAnalysis = await this.llm.generate(\`
      Analyze this code change for risk:

      Files changed: \${diff.files.map(f => f.path).join(', ')}

      Key changes:
      \${diff.hunks.slice(0, 10).map(h => h.content).join('\\n---\\n')}

      Identify:
      1. Security concerns (SQL injection, XSS, auth bypass, etc.)
      2. Performance concerns (N+1 queries, missing indexes, etc.)
      3. Reliability concerns (missing error handling, race conditions, etc.)

      Output: { "concerns": [{ "type": "...", "severity": 1-3, "detail": "..." }] }
    \`);

    const concerns = JSON.parse(semanticAnalysis).concerns;
    for (const concern of concerns) {
      factors.push({
        name: concern.type,
        score: concern.severity,
        detail: concern.detail
      });
    }

    return { factors };
  }

  async handleDeployment(pr: PullRequest, assessment: DeploymentRiskAssessment): Promise<void> {
    switch (assessment.recommendation) {
      case 'auto_deploy':
        await this.deploy(pr, { strategy: 'immediate' });
        break;

      case 'staged_rollout':
        await this.deploy(pr, {
          strategy: 'canary',
          stages: [
            { percentage: 5, duration: '10m' },
            { percentage: 25, duration: '30m' },
            { percentage: 100, duration: null }
          ]
        });
        await this.monitorCanary(pr);
        break;

      case 'manual_review':
        await this.requestReview(pr, {
          reviewers: await this.getCodeOwners(pr),
          reason: assessment.reasoning,
          riskFactors: assessment.factors
        });
        break;

      case 'block':
        await this.blockDeployment(pr, {
          reason: assessment.reasoning,
          requiredActions: this.getRequiredActions(assessment.factors)
        });
        break;
    }
  }

  private async monitorCanary(pr: PullRequest): Promise<void> {
    const canaryMetrics = await this.getCanaryMetrics(pr);

    // Check for anomalies
    const analysis = await this.llm.generate(\`
      Canary deployment metrics:

      Baseline (control): \${JSON.stringify(canaryMetrics.control)}
      Canary: \${JSON.stringify(canaryMetrics.canary)}

      Is the canary behaving normally? Check:
      1. Error rate comparison
      2. Latency comparison
      3. Business metrics comparison

      Output: { "healthy": boolean, "concerns": [...], "recommendation": "proceed" | "rollback" | "investigate" }
    \`);

    const result = JSON.parse(analysis);

    if (result.recommendation === 'rollback') {
      await this.rollback(pr, { reason: result.concerns.join(', ') });
    } else if (result.recommendation === 'investigate') {
      await this.pauseRollout(pr);
      await this.alertOnCall(pr, result.concerns);
    }
  }
}
\`\`\`

## Integration Patterns

### Connecting Agents to Existing Infrastructure

\`\`\`mermaid
flowchart TB
    subgraph "Agent Layer"
        A[Pipeline Agent]
        B[Quality Agent]
        C[Governance Agent]
        D[CI/CD Agent]
    end
    subgraph "Orchestration"
        E[Event Bus]
        F[State Store]
        G[Agent Coordinator]
    end
    subgraph "Existing Infrastructure"
        H[Airflow]
        I[dbt]
        J[GitHub]
        K[Data Catalog]
        L[Alerting]
    end

    A <--> E
    B <--> E
    C <--> E
    D <--> E
    E <--> G
    G <--> F
    A --> H
    A --> I
    B --> K
    C --> K
    D --> J
    A --> L
    B --> L
\`\`\`

### Event-Driven Agent Communication

\`\`\`typescript
interface AgentEvent {
  type: string;
  source: string;
  payload: any;
  timestamp: Date;
  correlationId: string;
}

class AgentEventBus {
  private subscribers: Map<string, AgentHandler[]> = new Map();

  subscribe(eventType: string, handler: AgentHandler): void {
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, []);
    }
    this.subscribers.get(eventType)!.push(handler);
  }

  async publish(event: AgentEvent): Promise<void> {
    const handlers = this.subscribers.get(event.type) || [];

    await Promise.all(
      handlers.map(handler =>
        handler.handle(event).catch(err =>
          this.handleError(event, handler, err)
        )
      )
    );
  }
}

// Example: Pipeline completion triggers quality checks
pipelineAgent.on('pipeline_complete', async (event) => {
  await eventBus.publish({
    type: 'run_quality_checks',
    source: 'pipeline_agent',
    payload: { table: event.outputTable },
    timestamp: new Date(),
    correlationId: event.runId
  });
});

qualityAgent.subscribe('run_quality_checks', async (event) => {
  const results = await qualityAgent.runChecks(event.payload.table);

  if (results.failed.length > 0) {
    await eventBus.publish({
      type: 'quality_issues_detected',
      source: 'quality_agent',
      payload: { table: event.payload.table, issues: results.failed },
      correlationId: event.correlationId
    });
  }
});
\`\`\`

## Key Takeaways

- [Data-pipeline-agent]s integrate with Airflow/dbt to detect schema drift and auto-heal failures
- [Data-quality-agent]s use expectation frameworks and LLM analysis for anomaly detection
- [Data-governance-agent]s automate PII detection, classification, and policy enforcement
- [Compliance-automation] maps regulations to continuously tested controls
- [Natural-language-query] agents combine semantic layers with text-to-SQL
- [Access-control-agent]s make dynamic, context-aware permission decisions
- [CI-cd-agent]s assess deployment risk and automate staged rollouts
- All agents connect via event buses and integrate with existing tools, not replace them`,

  advanced: `## Enterprise Agent Architectures

This lesson covers production-grade implementation of enterprise AI agents: scalable architectures, security considerations, evaluation frameworks, and ROI measurement. We'll examine patterns used at scale, failure modes and mitigations, and the organizational considerations for deploying agent systems.

The key insight at this level is that enterprise agent deployment is as much an organizational challenge as a technical one. The most sophisticated agent architecture fails if it lacks proper governance, monitoring, and integration with existing workflows. We'll address both dimensions.

## Part 1: Production Data Engineering Agents

### Scalable [Data Pipeline Agent] Architecture

At enterprise scale, pipeline agents must handle thousands of tables, petabytes of data, and complex interdependencies. The architecture below supports multi-tenant deployment with centralized governance.

\`\`\`mermaid
flowchart TB
    subgraph "Ingestion Layer"
        A1[Change Data Capture]
        A2[Schema Registry]
        A3[Event Stream]
    end
    subgraph "Agent Pool"
        B1[Pipeline Agent 1]
        B2[Pipeline Agent 2]
        B3[Pipeline Agent N]
    end
    subgraph "Coordination Layer"
        C1[Task Queue]
        C2[State Store]
        C3[Lock Manager]
    end
    subgraph "Knowledge Layer"
        D1[Lineage Graph]
        D2[Policy Store]
        D3[Playbook Repository]
    end
    subgraph "Execution Layer"
        E1[Spark/Databricks]
        E2[dbt Cloud]
        E3[Airflow]
    end

    A1 --> A3
    A2 --> A3
    A3 --> C1
    C1 --> B1
    C1 --> B2
    C1 --> B3
    B1 <--> C2
    B2 <--> C2
    B3 <--> C2
    B1 <--> C3
    B1 --> D1
    B1 --> D2
    B1 --> D3
    B1 --> E1
    B1 --> E2
    B1 --> E3
\`\`\`

### Lineage-Aware Impact Analysis

Production agents leverage data lineage for intelligent decision-making:

\`\`\`typescript
interface LineageNode {
  id: string;
  type: 'table' | 'view' | 'model' | 'dashboard' | 'ml_model';
  metadata: {
    owner: string;
    sla?: SLA;
    criticality: 'low' | 'medium' | 'high' | 'critical';
    lastRefresh: Date;
  };
}

interface LineageEdge {
  source: string;
  target: string;
  type: 'depends_on' | 'derived_from' | 'refreshes';
  transformations?: string[];
}

class LineageAwareAgent {
  private lineageGraph: Graph<LineageNode, LineageEdge>;

  async assessChangeImpact(
    sourceTable: string,
    change: SchemaChange
  ): Promise<ImpactAssessment> {
    // Get all downstream dependencies
    const downstream = this.lineageGraph.getDownstream(sourceTable, {
      maxDepth: 10,
      includeTypes: ['table', 'view', 'model', 'dashboard', 'ml_model']
    });

    // Calculate impact scores
    const impacts: NodeImpact[] = [];

    for (const node of downstream) {
      const path = this.lineageGraph.getShortestPath(sourceTable, node.id);
      const propagationRisk = this.calculatePropagationRisk(path, change);

      // Check if the change affects this node
      const affectedColumns = await this.traceColumnLineage(
        sourceTable,
        change.column,
        node.id
      );

      if (affectedColumns.length > 0) {
        impacts.push({
          nodeId: node.id,
          nodeType: node.type,
          criticality: node.metadata.criticality,
          affectedColumns,
          propagationRisk,
          estimatedBreakage: await this.estimateBreakage(node, affectedColumns, change),
          suggestedMitigation: await this.suggestMitigation(node, change)
        });
      }
    }

    // Sort by criticality and risk
    impacts.sort((a, b) =>
      this.riskScore(b) - this.riskScore(a)
    );

    return {
      sourceTable,
      change,
      totalDownstream: downstream.length,
      impactedNodes: impacts.length,
      criticalImpacts: impacts.filter(i => i.criticality === 'critical'),
      allImpacts: impacts,
      overallRisk: this.calculateOverallRisk(impacts),
      recommendations: await this.generateRecommendations(impacts, change)
    };
  }

  private async traceColumnLineage(
    source: string,
    column: string,
    target: string
  ): Promise<ColumnLineage[]> {
    // Column-level lineage tracing
    const paths = this.lineageGraph.getAllPaths(source, target);
    const columnLineages: ColumnLineage[] = [];

    for (const path of paths) {
      let currentColumn = column;

      for (let i = 0; i < path.length - 1; i++) {
        const edge = this.lineageGraph.getEdge(path[i], path[i + 1]);

        if (edge.transformations) {
          // Parse transformation to track column
          const nextColumn = await this.parseTransformation(
            edge.transformations,
            currentColumn
          );

          if (nextColumn) {
            currentColumn = nextColumn;
          } else {
            break; // Column not propagated
          }
        }
      }

      if (currentColumn) {
        columnLineages.push({
          path,
          sourceColumn: column,
          targetColumn: currentColumn,
          transformations: this.getTransformationChain(path)
        });
      }
    }

    return columnLineages;
  }

  private async generateRecommendations(
    impacts: NodeImpact[],
    change: SchemaChange
  ): Promise<Recommendation[]> {
    const recommendations: Recommendation[] = [];

    // Group by mitigation strategy
    const mitigationGroups = this.groupByMitigation(impacts);

    for (const [strategy, nodes] of mitigationGroups) {
      if (strategy === 'schema_migration') {
        recommendations.push({
          type: 'schema_migration',
          priority: this.getMaxCriticality(nodes),
          description: \`Run schema migration for \${nodes.length} downstream tables\`,
          automatable: true,
          script: await this.generateMigrationScript(nodes, change)
        });
      } else if (strategy === 'query_update') {
        recommendations.push({
          type: 'query_update',
          priority: this.getMaxCriticality(nodes),
          description: \`Update queries in \${nodes.length} views/models\`,
          automatable: change.changeType === 'column_renamed',
          affectedQueries: await this.extractAffectedQueries(nodes, change)
        });
      } else if (strategy === 'manual_review') {
        recommendations.push({
          type: 'manual_review',
          priority: 'critical',
          description: \`Manual review required for \${nodes.length} complex dependencies\`,
          automatable: false,
          assignees: this.getOwners(nodes)
        });
      }
    }

    return recommendations;
  }
}
\`\`\`

### ML-Powered Anomaly Detection for [Data Quality Agents]

Beyond rule-based checks, production quality agents use statistical and ML methods:

\`\`\`typescript
interface AnomalyDetectionConfig {
  method: 'zscore' | 'iqr' | 'isolation_forest' | 'prophet' | 'ensemble';
  sensitivity: number;
  seasonality?: SeasonalityConfig;
  trainingWindow: string;  // e.g., '30d'
}

class MLDataQualityAgent {
  private models: Map<string, AnomalyModel> = new Map();

  async detectAnomalies(
    table: string,
    column: string,
    config: AnomalyDetectionConfig
  ): Promise<AnomalyResult[]> {
    const modelKey = \`\${table}.\${column}\`;

    // Get or train model
    let model = this.models.get(modelKey);
    if (!model || model.isStale()) {
      model = await this.trainModel(table, column, config);
      this.models.set(modelKey, model);
    }

    // Get recent data
    const recentData = await this.getRecentData(table, column, '24h');

    // Detect anomalies
    const anomalies = await model.detect(recentData);

    // Enrich with context
    const enrichedAnomalies = await Promise.all(
      anomalies.map(a => this.enrichAnomaly(a, table, column))
    );

    return enrichedAnomalies;
  }

  private async trainModel(
    table: string,
    column: string,
    config: AnomalyDetectionConfig
  ): Promise<AnomalyModel> {
    const historicalData = await this.getHistoricalData(
      table,
      column,
      config.trainingWindow
    );

    switch (config.method) {
      case 'prophet':
        return this.trainProphetModel(historicalData, config);

      case 'isolation_forest':
        return this.trainIsolationForest(historicalData, config);

      case 'ensemble':
        // Combine multiple methods
        const models = await Promise.all([
          this.trainProphetModel(historicalData, config),
          this.trainIsolationForest(historicalData, config),
          this.trainStatisticalModel(historicalData, config)
        ]);
        return new EnsembleModel(models, { votingStrategy: 'weighted' });

      default:
        return this.trainStatisticalModel(historicalData, config);
    }
  }

  private async enrichAnomaly(
    anomaly: RawAnomaly,
    table: string,
    column: string
  ): Promise<AnomalyResult> {
    // Get upstream changes
    const upstreamChanges = await this.getUpstreamChanges(table, anomaly.timestamp);

    // Get deployment history
    const deployments = await this.getRecentDeployments(anomaly.timestamp);

    // Use LLM for root cause hypothesis
    const hypothesis = await this.llm.generate(\`
      Data anomaly detected:
      Table: \${table}, Column: \${column}
      Time: \${anomaly.timestamp}
      Expected: \${anomaly.expected}
      Actual: \${anomaly.actual}
      Deviation: \${anomaly.deviation}

      Context:
      - Upstream changes: \${JSON.stringify(upstreamChanges)}
      - Recent deployments: \${JSON.stringify(deployments)}
      - Historical patterns: \${JSON.stringify(anomaly.historicalContext)}

      Generate root cause hypotheses ranked by likelihood:

      Output: { "hypotheses": [{ "cause": "...", "likelihood": 0.X, "evidence": [...], "verification": "..." }] }
    \`);

    return {
      ...anomaly,
      table,
      column,
      upstreamChanges,
      deployments,
      hypotheses: JSON.parse(hypothesis).hypotheses
    };
  }
}
\`\`\`

## Part 2: Enterprise Governance Architecture

### Federated [Data Governance Agent] System

Enterprise governance requires a federated model where domain teams own their data while central policies provide guardrails:

\`\`\`mermaid
flowchart TB
    subgraph "Central Governance"
        A1[Policy Repository]
        A2[Classification Taxonomy]
        A3[Compliance Engine]
    end
    subgraph "Domain: Finance"
        B1[Finance Governance Agent]
        B2[Finance Data Catalog]
    end
    subgraph "Domain: Marketing"
        C1[Marketing Governance Agent]
        C2[Marketing Data Catalog]
    end
    subgraph "Domain: Engineering"
        D1[Engineering Governance Agent]
        D2[Engineering Data Catalog]
    end
    subgraph "Shared Services"
        E1[Audit Service]
        E2[Masking Service]
        E3[Access Service]
    end

    A1 --> B1
    A1 --> C1
    A1 --> D1
    A2 --> B1
    A2 --> C1
    A2 --> D1
    A3 --> E1
    B1 --> E1
    C1 --> E1
    D1 --> E1
    B1 --> E2
    C1 --> E2
    D1 --> E2
\`\`\`

### Policy-as-Code Implementation

\`\`\`typescript
// Policy definition language
interface GovernancePolicy {
  id: string;
  version: string;
  name: string;
  description: string;
  applicability: {
    dataClassifications: string[];
    domains?: string[];
    tables?: string[];
  };
  rules: PolicyRule[];
  enforcement: 'block' | 'warn' | 'audit';
  exceptions: PolicyException[];
}

interface PolicyRule {
  id: string;
  type: 'access' | 'masking' | 'retention' | 'encryption' | 'location';
  condition: string;  // Expression language
  action: PolicyAction;
}

// Example policy
const piiAccessPolicy: GovernancePolicy = {
  id: 'pol-pii-access-001',
  version: '2.1.0',
  name: 'PII Access Controls',
  description: 'Controls access to personally identifiable information',
  applicability: {
    dataClassifications: ['PII', 'PHI'],
  },
  rules: [
    {
      id: 'rule-1',
      type: 'access',
      condition: 'user.role NOT IN ["data_steward", "compliance_officer"]',
      action: {
        type: 'require_approval',
        approvers: ['data_steward'],
        maxDuration: '7d'
      }
    },
    {
      id: 'rule-2',
      type: 'masking',
      condition: 'access.purpose != "customer_support"',
      action: {
        type: 'mask',
        method: 'partial',
        config: { showLast: 4 }
      }
    },
    {
      id: 'rule-3',
      type: 'audit',
      condition: 'true',  // Always
      action: {
        type: 'log',
        level: 'detailed',
        fields: ['user', 'query', 'rows_accessed', 'columns_accessed', 'purpose']
      }
    }
  ],
  enforcement: 'block',
  exceptions: [
    {
      id: 'exc-1',
      condition: 'user.role == "incident_responder" AND incident.active',
      validUntil: 'incident.resolved + 24h',
      approvedBy: 'security_team',
      auditLevel: 'forensic'
    }
  ]
};

class PolicyEngine {
  private policies: Map<string, GovernancePolicy> = new Map();
  private ruleEngine: RuleEngine;

  async evaluate(
    request: DataAccessRequest,
    context: EvaluationContext
  ): Promise<PolicyDecision> {
    const applicablePolicies = this.getApplicablePolicies(request, context);
    const decisions: RuleDecision[] = [];

    for (const policy of applicablePolicies) {
      // Check exceptions first
      const exception = await this.checkExceptions(policy, request, context);
      if (exception) {
        decisions.push({
          policyId: policy.id,
          ruleId: 'exception',
          decision: 'allow',
          reason: \`Exception \${exception.id} applies\`,
          auditLevel: exception.auditLevel
        });
        continue;
      }

      // Evaluate rules
      for (const rule of policy.rules) {
        const result = await this.ruleEngine.evaluate(rule.condition, {
          user: request.user,
          data: request.data,
          access: request.access,
          context
        });

        if (result.matches) {
          decisions.push({
            policyId: policy.id,
            ruleId: rule.id,
            decision: this.actionToDecision(rule.action),
            action: rule.action,
            reason: \`Rule \${rule.id} triggered\`
          });
        }
      }
    }

    return this.combineDecisions(decisions, applicablePolicies);
  }

  private combineDecisions(
    decisions: RuleDecision[],
    policies: GovernancePolicy[]
  ): PolicyDecision {
    // Most restrictive wins
    const blockDecisions = decisions.filter(d => d.decision === 'block');
    if (blockDecisions.length > 0) {
      return {
        allowed: false,
        reason: blockDecisions.map(d => d.reason).join('; '),
        requiredActions: [],
        auditRequirements: this.mergeAuditRequirements(decisions)
      };
    }

    const requireApproval = decisions.filter(d => d.action?.type === 'require_approval');
    if (requireApproval.length > 0) {
      return {
        allowed: false,
        reason: 'Approval required',
        requiredActions: requireApproval.map(d => d.action!),
        auditRequirements: this.mergeAuditRequirements(decisions)
      };
    }

    // Collect all required actions (masking, etc.)
    const actions = decisions
      .filter(d => d.action && d.action.type !== 'block')
      .map(d => d.action!);

    return {
      allowed: true,
      requiredActions: actions,
      auditRequirements: this.mergeAuditRequirements(decisions)
    };
  }
}
\`\`\`

### Cross-Regulation Compliance Mapping

\`\`\`typescript
interface RegulatoryRequirement {
  regulation: 'GDPR' | 'HIPAA' | 'SOC2' | 'PCI_DSS' | 'CCPA';
  article: string;
  requirement: string;
  controls: Control[];
}

interface Control {
  id: string;
  description: string;
  testType: 'automated' | 'evidence' | 'manual';
  frequency: 'continuous' | 'daily' | 'weekly' | 'monthly' | 'quarterly';
  automatedTest?: () => Promise<ControlTestResult>;
}

class CrossRegulationMapper {
  private requirements: RegulatoryRequirement[];
  private controlGraph: Graph<Control, ControlRelation>;

  async mapRequirements(): Promise<RegulationControlMatrix> {
    // Build control graph with shared controls
    this.buildControlGraph();

    // Find controls that satisfy multiple requirements
    const sharedControls = this.findSharedControls();

    // Generate unified control set
    const unifiedControls = this.optimizeControlSet();

    return {
      regulations: this.getUniqueRegulations(),
      controls: unifiedControls,
      coverage: this.calculateCoverage(unifiedControls),
      gaps: this.identifyGaps(unifiedControls)
    };
  }

  private findSharedControls(): SharedControl[] {
    const shared: SharedControl[] = [];

    for (const control of this.controlGraph.getNodes()) {
      const satisfies = this.requirements.filter(r =>
        r.controls.some(c => this.controlEquivalent(c, control))
      );

      if (satisfies.length > 1) {
        shared.push({
          control,
          regulations: satisfies.map(r => r.regulation),
          articles: satisfies.map(r => r.article)
        });
      }
    }

    return shared;
  }

  async assessRegulationChange(
    regulation: string,
    change: RegulationChange
  ): Promise<ChangeImpactAssessment> {
    // Use LLM to interpret regulation change
    const interpretation = await this.llm.generate(\`
      Regulation change analysis:

      Regulation: \${regulation}
      Previous text: \${change.previousText}
      New text: \${change.newText}

      Current controls mapped to this requirement:
      \${JSON.stringify(this.getControlsForRequirement(change.requirementId))}

      Analyze:
      1. What substantive changes does the new text introduce?
      2. Are current controls still sufficient?
      3. What new controls or modifications are needed?
      4. What is the compliance deadline?

      Output: {
        "substantiveChanges": [...],
        "controlsStillValid": [...],
        "controlsNeedUpdate": [...],
        "newControlsRequired": [...],
        "deadline": "...",
        "riskLevel": "low" | "medium" | "high"
      }
    \`);

    const analysis = JSON.parse(interpretation);

    // Generate remediation plan
    const remediationPlan = await this.generateRemediationPlan(analysis);

    return {
      regulation,
      change,
      analysis,
      remediationPlan,
      estimatedEffort: this.estimateEffort(remediationPlan),
      priorityScore: this.calculatePriority(analysis)
    };
  }
}
\`\`\`

## Part 3: Secure Data Access Layer

### Privacy-Preserving [Natural Language Query] Architecture

\`\`\`mermaid
flowchart TB
    subgraph "Query Layer"
        A[NL Query Agent]
        B[Query Rewriter]
        C[Privacy Filter]
    end
    subgraph "Security Layer"
        D[Access Control]
        E[Row-Level Security]
        F[Column Masking]
    end
    subgraph "Execution Layer"
        G[Query Optimizer]
        H[Secure Compute]
        I[Result Filter]
    end
    subgraph "Audit Layer"
        J[Query Logger]
        K[Access Auditor]
        L[Anomaly Detector]
    end

    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H
    H --> I
    A --> J
    D --> K
    I --> L
\`\`\`

### Differential Privacy Integration

\`\`\`typescript
interface DPConfig {
  epsilon: number;  // Privacy budget
  delta: number;    // Failure probability
  mechanism: 'laplace' | 'gaussian' | 'exponential';
}

class PrivacyPreservingQueryAgent extends NaturalLanguageQueryAgent {
  private dpEngine: DifferentialPrivacyEngine;
  private privacyBudgetTracker: PrivacyBudgetTracker;

  async query(
    naturalLanguage: string,
    user: User,
    dpConfig?: DPConfig
  ): Promise<NLQueryResult> {
    // Check privacy budget
    const budget = await this.privacyBudgetTracker.getRemainingBudget(user);

    if (dpConfig && budget.epsilon < dpConfig.epsilon) {
      throw new PrivacyBudgetExceededError(
        \`Requested epsilon \${dpConfig.epsilon} exceeds remaining budget \${budget.epsilon}\`
      );
    }

    // Generate base query
    const baseResult = await super.query(naturalLanguage, user);

    // Apply differential privacy if configured
    if (dpConfig) {
      const dpResult = await this.applyDifferentialPrivacy(
        baseResult,
        dpConfig
      );

      // Consume budget
      await this.privacyBudgetTracker.consume(user, dpConfig.epsilon);

      return dpResult;
    }

    return baseResult;
  }

  private async applyDifferentialPrivacy(
    result: NLQueryResult,
    config: DPConfig
  ): Promise<NLQueryResult> {
    // Analyze query type
    const queryType = this.analyzeQueryType(result.sql);

    if (queryType === 'count') {
      return this.applyDPToCount(result, config);
    } else if (queryType === 'sum' || queryType === 'average') {
      return this.applyDPToAggregate(result, config);
    } else if (queryType === 'histogram') {
      return this.applyDPToHistogram(result, config);
    } else {
      // For non-aggregate queries, apply result sampling with noise
      return this.applyDPToRecordSet(result, config);
    }
  }

  private applyDPToCount(
    result: NLQueryResult,
    config: DPConfig
  ): NLQueryResult {
    const trueCount = result.results[0].count;
    const sensitivity = 1;  // Adding/removing one record changes count by 1

    const noise = this.dpEngine.laplaceMechanism(
      sensitivity,
      config.epsilon
    );

    return {
      ...result,
      results: [{ count: Math.max(0, Math.round(trueCount + noise)) }],
      privacyApplied: {
        mechanism: 'laplace',
        epsilon: config.epsilon,
        accuracy: this.calculateAccuracy(config.epsilon, sensitivity)
      }
    };
  }
}
\`\`\`

### Zero-Trust [Access Control Agent]

\`\`\`typescript
interface ZeroTrustContext {
  user: User;
  device: DeviceInfo;
  network: NetworkContext;
  behavior: BehaviorProfile;
  resource: Resource;
  action: Action;
  time: Date;
}

class ZeroTrustAccessAgent {
  private riskEngine: RiskEngine;
  private behaviorAnalyzer: BehaviorAnalyzer;
  private policyEngine: PolicyEngine;

  async evaluateAccess(context: ZeroTrustContext): Promise<AccessDecision> {
    // Never trust, always verify
    const checks = await Promise.all([
      this.verifyIdentity(context),
      this.verifyDevice(context),
      this.verifyNetwork(context),
      this.verifyBehavior(context),
      this.evaluatePolicy(context)
    ]);

    // Calculate aggregate risk
    const riskScore = this.riskEngine.calculateRisk(checks);

    // Determine access level based on risk
    if (riskScore < 0.2) {
      return this.grantFullAccess(context);
    } else if (riskScore < 0.5) {
      return this.grantRestrictedAccess(context, riskScore);
    } else if (riskScore < 0.8) {
      return this.requireStepUp(context, riskScore);
    } else {
      return this.denyAccess(context, riskScore);
    }
  }

  private async verifyBehavior(context: ZeroTrustContext): Promise<BehaviorCheck> {
    const profile = await this.behaviorAnalyzer.getProfile(context.user);
    const current = this.extractBehaviorSignals(context);

    const anomalies = [];

    // Time of access
    if (!this.isTypicalAccessTime(current.time, profile.accessPatterns.time)) {
      anomalies.push({
        type: 'unusual_time',
        deviation: this.calculateTimeDeviation(current.time, profile),
        risk: 0.3
      });
    }

    // Location/network
    if (!this.isKnownLocation(current.network, profile.accessPatterns.locations)) {
      anomalies.push({
        type: 'new_location',
        location: current.network.geoLocation,
        risk: 0.4
      });
    }

    // Resource access pattern
    if (!this.isTypicalResource(context.resource, profile.accessPatterns.resources)) {
      anomalies.push({
        type: 'unusual_resource',
        resource: context.resource.id,
        risk: 0.5
      });
    }

    // Query pattern (for data access)
    if (context.action.type === 'query') {
      const queryAnomalies = await this.analyzeQueryPattern(
        context.action.query,
        profile.accessPatterns.queries
      );
      anomalies.push(...queryAnomalies);
    }

    return {
      passed: anomalies.length === 0,
      anomalies,
      aggregateRisk: Math.min(1, anomalies.reduce((sum, a) => sum + a.risk, 0))
    };
  }

  private grantRestrictedAccess(
    context: ZeroTrustContext,
    riskScore: number
  ): AccessDecision {
    // Apply restrictions proportional to risk
    const restrictions: AccessRestriction[] = [];

    if (riskScore > 0.3) {
      restrictions.push({
        type: 'row_limit',
        limit: 1000
      });
    }

    if (riskScore > 0.4) {
      restrictions.push({
        type: 'column_masking',
        columns: this.getSensitiveColumns(context.resource)
      });
    }

    restrictions.push({
      type: 'session_timeout',
      duration: Math.max(300, 3600 * (1 - riskScore))  // 5 min to 1 hour
    });

    restrictions.push({
      type: 'enhanced_logging',
      level: 'detailed'
    });

    return {
      allowed: true,
      restrictions,
      riskScore,
      reviewRequired: riskScore > 0.4,
      expiresAt: new Date(Date.now() + 3600000 * (1 - riskScore))
    };
  }
}
\`\`\`

## Part 4: Production DevOps Agents

### [CI/CD Agent] with Causal Inference

\`\`\`typescript
interface CanaryAnalysis {
  canaryId: string;
  metrics: MetricComparison[];
  statisticalSignificance: number;
  causalAnalysis: CausalInference;
  recommendation: 'proceed' | 'rollback' | 'extend' | 'investigate';
}

class AdvancedCICDAgent {
  private causalEngine: CausalInferenceEngine;
  private statisticalAnalyzer: StatisticalAnalyzer;

  async analyzeCanary(
    canaryId: string,
    duration: number
  ): Promise<CanaryAnalysis> {
    // Collect metrics
    const canaryMetrics = await this.getMetrics(canaryId, 'canary', duration);
    const controlMetrics = await this.getMetrics(canaryId, 'control', duration);

    // Statistical comparison
    const comparisons = await this.compareMetrics(canaryMetrics, controlMetrics);

    // Causal analysis
    const causalAnalysis = await this.causalEngine.analyze({
      treatment: canaryMetrics,
      control: controlMetrics,
      confounders: await this.identifyConfounders(canaryId)
    });

    // Generate recommendation
    const recommendation = this.generateRecommendation(
      comparisons,
      causalAnalysis
    );

    return {
      canaryId,
      metrics: comparisons,
      statisticalSignificance: this.calculateSignificance(comparisons),
      causalAnalysis,
      recommendation
    };
  }

  private async identifyConfounders(canaryId: string): Promise<Confounder[]> {
    const confounders: Confounder[] = [];

    // Time-based confounders
    const timeAnalysis = await this.analyzeTimeEffects(canaryId);
    if (timeAnalysis.significantTimeEffect) {
      confounders.push({
        type: 'time',
        effect: timeAnalysis.effect,
        adjustment: timeAnalysis.adjustmentFactor
      });
    }

    // Traffic composition
    const trafficAnalysis = await this.analyzeTrafficComposition(canaryId);
    if (trafficAnalysis.compositionDiffers) {
      confounders.push({
        type: 'traffic_composition',
        effect: trafficAnalysis.effect,
        segments: trafficAnalysis.differingSegments
      });
    }

    // Infrastructure differences
    const infraAnalysis = await this.analyzeInfrastructure(canaryId);
    if (infraAnalysis.significantDifference) {
      confounders.push({
        type: 'infrastructure',
        effect: infraAnalysis.effect,
        details: infraAnalysis.differences
      });
    }

    return confounders;
  }

  private generateRecommendation(
    comparisons: MetricComparison[],
    causalAnalysis: CausalInference
  ): 'proceed' | 'rollback' | 'extend' | 'investigate' {
    // Check for clear degradation
    const degradedMetrics = comparisons.filter(c =>
      c.direction === 'worse' && c.significance > 0.95
    );

    if (degradedMetrics.length > 0) {
      // Check if causal analysis attributes degradation to deployment
      const deploymentCaused = causalAnalysis.attributions.some(a =>
        a.factor === 'deployment' && a.confidence > 0.8
      );

      if (deploymentCaused) {
        return 'rollback';
      } else {
        return 'investigate';  // Degradation not clearly caused by deployment
      }
    }

    // Check statistical power
    const sufficientPower = comparisons.every(c => c.statisticalPower > 0.8);

    if (!sufficientPower) {
      return 'extend';  // Need more data
    }

    // Check for improvements
    const improvedMetrics = comparisons.filter(c =>
      c.direction === 'better' && c.significance > 0.95
    );

    // All metrics stable or improved
    return 'proceed';
  }
}
\`\`\`

## ROI Measurement Framework

### Quantifying Agent Value

\`\`\`typescript
interface AgentROIMetrics {
  // Time savings
  hoursAutomated: number;
  incidentMTTR: { before: number; after: number };
  manualTasksEliminated: number;

  // Quality improvements
  dataQualityScore: { before: number; after: number };
  deploymentSuccessRate: { before: number; after: number };
  complianceGaps: { before: number; after: number };

  // Risk reduction
  incidentsPrevented: number;
  complianceFinesAvoided: number;
  securityBreachesBlocked: number;

  // Cost
  agentOperatingCost: number;
  infrastructureCost: number;
  maintenanceCost: number;
}

class ROICalculator {
  async calculateROI(
    agentType: string,
    metrics: AgentROIMetrics,
    assumptions: ROIAssumptions
  ): Promise<ROIReport> {
    // Calculate benefits
    const benefits = {
      timeSavings: metrics.hoursAutomated * assumptions.hourlyRate,
      mttrImprovement:
        (metrics.incidentMTTR.before - metrics.incidentMTTR.after) *
        assumptions.incidentCostPerHour *
        assumptions.averageIncidentsPerMonth * 12,
      qualityImprovement:
        (metrics.dataQualityScore.after - metrics.dataQualityScore.before) *
        assumptions.qualityImpactFactor,
      riskReduction:
        metrics.incidentsPrevented * assumptions.averageIncidentCost +
        metrics.complianceFinesAvoided +
        metrics.securityBreachesBlocked * assumptions.averageBreachCost
    };

    const totalBenefits = Object.values(benefits).reduce((a, b) => a + b, 0);

    // Calculate costs
    const totalCosts =
      metrics.agentOperatingCost +
      metrics.infrastructureCost +
      metrics.maintenanceCost;

    // ROI calculation
    const roi = ((totalBenefits - totalCosts) / totalCosts) * 100;
    const paybackPeriod = totalCosts / (totalBenefits / 12);  // months

    return {
      agentType,
      period: '12 months',
      benefits: {
        breakdown: benefits,
        total: totalBenefits
      },
      costs: {
        total: totalCosts,
        breakdown: {
          operating: metrics.agentOperatingCost,
          infrastructure: metrics.infrastructureCost,
          maintenance: metrics.maintenanceCost
        }
      },
      roi: \`\${roi.toFixed(1)}%\`,
      paybackPeriod: \`\${paybackPeriod.toFixed(1)} months\`,
      netBenefit: totalBenefits - totalCosts,
      recommendations: this.generateRecommendations(benefits, roi)
    };
  }

  private generateRecommendations(
    benefits: Record<string, number>,
    roi: number
  ): string[] {
    const recommendations: string[] = [];

    // Identify highest-value areas
    const sorted = Object.entries(benefits).sort((a, b) => b[1] - a[1]);

    if (sorted[0][0] === 'timeSavings') {
      recommendations.push(
        'Time savings is the primary value driver. Consider expanding automation scope.'
      );
    }

    if (roi > 300) {
      recommendations.push(
        'Strong ROI indicates opportunity to scale agent deployment to additional domains.'
      );
    }

    if (benefits.riskReduction > benefits.timeSavings) {
      recommendations.push(
        'Risk reduction exceeds efficiency gains. Prioritize guardrails and monitoring.'
      );
    }

    return recommendations;
  }
}
\`\`\`

## Key Takeaways

- Production [data-pipeline-agent]s use lineage graphs for impact analysis and intelligent remediation
- ML-powered [data-quality-agent]s detect anomalies beyond rule-based checks
- Federated [data-governance-agent] architectures balance central policy with domain ownership
- Cross-regulation compliance mapping reduces control duplication
- Privacy-preserving [natural-language-query] agents integrate differential privacy
- Zero-trust [access-control-agent]s continuously verify based on behavior and context
- [CI-cd-agent]s use causal inference to distinguish deployment impact from confounders
- ROI measurement frameworks quantify agent value for business justification
- All agents require observability, audit trails, and governance — AI governing AI

These patterns enable enterprise-scale deployment of AI agents while maintaining security, compliance, and operational excellence.`,
};

export const lesson07Quiz = {
  id: 'quiz-07-agentic-practice',
  title: 'Agentic AI in Practice Knowledge Check',
  passingScore: 70,
  questions: [
    {
      id: 'practice-q1',
      question: 'What is the main advantage of a data pipeline agent over traditional pipeline monitoring?',
      type: 'multiple-choice' as const,
      options: [
        'It uses more compute resources',
        'It can detect issues AND automatically fix common problems without human intervention',
        'It sends more alerts',
        'It only works with modern data stacks'
      ],
      correctAnswer: 1,
      explanation: 'Data pipeline agents go beyond monitoring — they can detect issues, diagnose root causes, and automatically fix common problems like schema drift or connection timeouts, reducing the need for human intervention.',
      difficulty: 'beginner' as const,
    },
    {
      id: 'practice-q2',
      question: 'A data governance agent detects a new column called "patient_diagnosis" in a dataset. What should it do?',
      type: 'multiple-choice' as const,
      options: [
        'Ignore it since it\'s a new column',
        'Delete the column immediately',
        'Classify it as PHI (protected health information), apply encryption/masking policies, restrict access to authorized roles, and log the classification for audit',
        'Send an email to the database admin'
      ],
      correctAnswer: 2,
      explanation: 'The agent should classify the column as PHI based on its name and content, apply appropriate policies (masking, encryption, access restrictions), and log all decisions for compliance audit trails.',
      difficulty: 'intermediate' as const,
    },
    {
      id: 'practice-q3',
      question: 'Why do natural-language-to-SQL agents need guardrails?',
      type: 'multiple-choice' as const,
      options: [
        'To make queries run faster',
        'To prevent malicious or dangerous queries (DROP TABLE, accessing unauthorized data, returning too many rows)',
        'To add syntax highlighting',
        'To reduce API costs'
      ],
      correctAnswer: 1,
      explanation: 'NL-to-SQL agents need guardrails to prevent dangerous operations (DROP, DELETE without WHERE), ensure users only access data they\'re authorized to see, limit result sizes, and block access to sensitive columns.',
      difficulty: 'intermediate' as const,
    },
    {
      id: 'practice-q4',
      question: 'What factors might cause a CI/CD agent to request human review instead of auto-deploying?',
      type: 'multiple-choice' as const,
      options: [
        'The code is written in Python',
        'Multiple risk factors: large change size, changes to critical paths (auth, payments), low test coverage, Friday deployment, or new contributor',
        'The PR has too many approvals',
        'The deployment is too fast'
      ],
      correctAnswer: 1,
      explanation: 'CI/CD agents assess deployment risk based on multiple factors: number of files changed, whether critical systems are affected, test coverage, deployment timing (Friday evening = risky), and author experience. High risk scores trigger human review.',
      difficulty: 'intermediate' as const,
    },
    {
      id: 'practice-q5',
      question: 'In a self-healing pipeline system, what is the risk of automated remediation without human oversight?',
      type: 'multiple-choice' as const,
      options: [
        'The system might fix too many problems',
        'The agent could apply incorrect fixes that cause data corruption, mask underlying systemic issues, or take actions with unintended business consequences',
        'Self-healing systems have no risks',
        'The system becomes too reliable'
      ],
      correctAnswer: 1,
      explanation: 'Automated remediation risks include: applying incorrect fixes that corrupt data, masking symptoms of larger problems (letting issues compound), taking actions with unintended consequences (e.g., auto-scaling costs), and acting without understanding business context.',
      difficulty: 'advanced' as const,
    },
  ],
};

export const lesson07 = {
  id: 'lesson-07',
  title: 'Agentic AI in Practice',
  subtitle: 'Reshaping Real Workflows',
  description: 'See how agentic AI is transforming data engineering, governance, security, and DevOps — with architectures you can implement today.',
  estimatedMinutes: 50,
  terms: lesson07Terms,
  advancedTopics: lesson07AdvancedTopics,
  content: lesson07Content,
  quiz: lesson07Quiz,
};

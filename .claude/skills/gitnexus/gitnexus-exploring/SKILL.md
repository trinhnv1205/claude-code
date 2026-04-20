# GitNexus — Exploring the Codebase

Use these tools when exploring unfamiliar code or answering "How does X work?" questions.

## When to Use

- User asks about architecture, patterns, or code structure
- You need to understand how a feature is implemented
- You need to find execution flows related to a concept

## Tools

### `gitnexus_query({query: "concept"})`
Find execution flows and symbols by concept. Returns process-grouped results ranked by relevance.

### `gitnexus_context({name: "symbolName"})`
Get 360-degree view of a symbol: callers, callees, process participation, cluster membership.

## Workflow

1. Start with `gitnexus_query` to find relevant execution flows
2. Drill into specific symbols with `gitnexus_context`
3. Read `gitnexus://repo/claude-code/process/{name}` for step-by-step traces
4. Use `gitnexus://repo/claude-code/clusters` to understand functional areas

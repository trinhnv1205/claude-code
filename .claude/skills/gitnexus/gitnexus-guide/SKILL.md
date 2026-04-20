# GitNexus — Tool & Resource Reference

## MCP Tools

| Tool | Purpose | Example |
|------|---------|---------|
| `query` | Find code by concept | `gitnexus_query({query: "auth validation"})` |
| `context` | 360-degree symbol view | `gitnexus_context({name: "validateUser"})` |
| `impact` | Blast radius analysis | `gitnexus_impact({target: "X", direction: "upstream"})` |
| `detect_changes` | Pre-commit scope check | `gitnexus_detect_changes({scope: "staged"})` |
| `rename` | Safe multi-file rename | `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` |
| `cypher` | Custom graph queries | `gitnexus_cypher({query: "MATCH ..."})` |

## MCP Resources

| Resource | Purpose |
|----------|---------|
| `gitnexus://repo/claude-code/context` | Codebase overview, index freshness |
| `gitnexus://repo/claude-code/clusters` | All functional areas |
| `gitnexus://repo/claude-code/processes` | All execution flows |
| `gitnexus://repo/claude-code/process/{name}` | Step-by-step execution trace |

## Index Stats

- 17,752 nodes (symbols), 50,177 edges, 1,332 clusters, 300 flows

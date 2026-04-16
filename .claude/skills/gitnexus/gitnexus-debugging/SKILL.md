# GitNexus — Debugging

Use when tracing bugs, regressions, or understanding error flows.

## Workflow

1. `gitnexus_query({query: "<error or symptom>"})` — find execution flows
2. `gitnexus_context({name: "<suspect function>"})` — see all callers, callees
3. Read `gitnexus://repo/claude-code/process/{processName}` — trace full flow
4. For regressions: `gitnexus_detect_changes({scope: "compare", base_ref: "main"})` — see what changed

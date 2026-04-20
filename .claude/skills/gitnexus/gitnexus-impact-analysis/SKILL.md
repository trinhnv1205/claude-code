# GitNexus — Impact Analysis

Use before modifying any function, class, or method to understand blast radius.

## Tools

### `gitnexus_impact({target: "symbolName", direction: "upstream"})`
Map blast radius with confidence scoring.

| Depth | Meaning | Action |
|-------|---------|--------|
| d=1 | WILL BREAK — direct callers | MUST update |
| d=2 | LIKELY AFFECTED — indirect deps | Should test |
| d=3 | MAY NEED TESTING — transitive | Test if critical |

### `gitnexus_detect_changes({scope: "staged"})`
Pre-commit scope check. Verify changes only affect expected symbols.

## Workflow

1. Run `gitnexus_impact` on target symbol
2. If HIGH/CRITICAL risk -> warn user before proceeding
3. Update all d=1 dependents
4. After changes, run `gitnexus_detect_changes()` to verify scope

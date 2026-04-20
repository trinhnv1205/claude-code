# GitNexus — Refactoring

Use when renaming, extracting, splitting, or restructuring code.

## Tools

- `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` — Always dry_run first
- `gitnexus_context({name: "target"})` — See all refs before moving code
- `gitnexus_impact({target: "target", direction: "upstream"})` — Find all external callers

## Rules

- NEVER use find-and-replace — use `gitnexus_rename`
- ALWAYS dry_run first
- ALWAYS verify with `gitnexus_detect_changes` after

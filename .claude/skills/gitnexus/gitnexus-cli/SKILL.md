# GitNexus — CLI Commands

| Command | Purpose |
|---------|---------|
| `gitnexus analyze` | Index/re-index the repository |
| `gitnexus analyze --embeddings` | Index with semantic embeddings |
| `gitnexus mcp` | Start MCP server (stdio) |
| `gitnexus serve` | Start HTTP server for web UI |
| `gitnexus status` | Show index status and freshness |
| `gitnexus clean` | Remove index data |
| `gitnexus wiki` | Generate documentation from graph |

## Re-index after changes

```bash
gitnexus analyze
```

#!/usr/bin/env node

const { execFileSync, execSync } = require("child_process");
const { existsSync, readFileSync } = require("fs");
const { join } = require("path");

const isWindows = process.platform === "win32";
const bin = isWindows ? "gitnexus.cmd" : "gitnexus";
const cwd = process.cwd();
const indexDir = join(cwd, ".gitnexus");
const metaPath = join(indexDir, "meta.json");
const hookEvent = process.env.CLAUDE_HOOK_EVENT || "";

function debug(msg) {
  if (process.env.GITNEXUS_DEBUG) console.error(`[gitnexus-hook] ${msg}`);
}

function run(args, opts = {}) {
  try {
    return execFileSync(bin, args, {
      cwd,
      timeout: 8000,
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
      ...opts,
    }).trim();
  } catch (e) {
    debug(`command failed: ${e.message}`);
    return null;
  }
}

function getHeadCommit() {
  try {
    return execSync("git rev-parse HEAD", { cwd, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).trim();
  } catch {
    return null;
  }
}

function isIndexStale() {
  if (!existsSync(metaPath)) return true;
  try {
    const meta = JSON.parse(readFileSync(metaPath, "utf8"));
    const head = getHeadCommit();
    return head && meta.lastCommit !== head;
  } catch {
    return true;
  }
}

function handleSessionStart() {
  if (!existsSync(indexDir)) {
    console.log("GitNexus index not found. Run `gitnexus analyze` to index this codebase.");
    return;
  }
  if (isIndexStale()) {
    console.log("GitNexus index is stale (HEAD changed since last index). Consider running `gitnexus analyze`.");
    return;
  }
  try {
    const meta = JSON.parse(readFileSync(metaPath, "utf8"));
    console.log(`GitNexus index ready: ${meta.stats.nodes} symbols, ${meta.stats.edges} edges, ${meta.stats.processes} flows. Last indexed: ${meta.indexedAt}`);
  } catch {
    console.log("GitNexus index exists but metadata unreadable.");
  }
}

function handlePreToolUse() {
  if (!existsSync(indexDir)) return;

  const toolName = process.env.TOOL_NAME || "";
  const toolInput = process.env.TOOL_INPUT || "{}";

  let pattern = "";
  try {
    const input = JSON.parse(toolInput);
    pattern = input.pattern || input.command || input.query || "";
  } catch {}

  if (!pattern || pattern.length < 3) return;

  // Only augment search-like tools
  if (!["Grep", "Glob", "Bash"].includes(toolName)) return;

  const result = run(["augment", "--pattern", pattern]);
  if (result) {
    console.log(result);
  }
}

function handlePostToolUse() {
  const toolName = process.env.TOOL_NAME || "";
  if (toolName !== "Bash") return;
  if (!existsSync(indexDir)) return;

  // Check if a git mutation happened
  const input = process.env.TOOL_INPUT || "{}";
  let command = "";
  try {
    command = JSON.parse(input).command || "";
  } catch {}

  const gitMutations = ["git commit", "git merge", "git rebase", "git pull", "git checkout", "git switch", "git reset"];
  if (!gitMutations.some(m => command.includes(m))) return;

  if (isIndexStale()) {
    console.log("GitNexus index is now stale after git operation. Run `gitnexus analyze` to update.");
  }
}

function main() {
  if (hookEvent === "SessionStart") {
    handleSessionStart();
  } else if (hookEvent === "PreToolUse") {
    handlePreToolUse();
  } else if (hookEvent === "PostToolUse") {
    handlePostToolUse();
  }
}

main();

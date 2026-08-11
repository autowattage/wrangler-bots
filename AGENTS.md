# AGENTS.md

Tiny Bun Slack bot (`@slack/bolt`, socket mode). Single entrypoint: `index.ts`.

## Commands

- Install deps: `bun install`
- Run: `bun run index.ts` (Bun runtime — do NOT use `npm`/`node`; there is no build step, no lint/test/typecheck scripts)

## Runtime requirements

- `.env` (gitignored) must define `SLACK_TOKEN` and `SLACK_APP_TOKEN`; the app starts a live Slack socket-mode connection, so it will fail without valid tokens.
- Edit `index.ts` while it's running → restart it (no watch mode).

## Pinned patch (do not remove)

- `package.json` has `patchedDependencies` for `@slack/socket-mode@3.0.0` (`patches/@slack%2Fsocket-mode@3.0.0.patch`). It changes `dist/src/SlackWebSocket.js` to `require("undici/index.js")` instead of `undici`.
- Why: Bun silently shadows the bare `undici` import with its own shim, which lacks the `ping` export and the `undici:websocket:ping/pong` diagnostics channels that socket-mode's heartbeat needs. Under the shim the bot logs `undici_1.ping is not a function` (or "A pong wasn't received" timeouts). The patch forces the installed `undici` package, which works under Bun.
- Applied automatically by `bun install`. If you ever drop `patchedDependencies`/the patch, the heartbeat breaks — regenerate via `bun patch @slack/socket-mode`.

## Behavior quirks

- `index.ts` only replies to one hardcoded user ID (`U0BP2G0BZFH`) and skips any message with a `subtype` (e.g. edits, threads of bots). Handle replies accordingly when testing.
- The message handler replies "mrauwwwww".

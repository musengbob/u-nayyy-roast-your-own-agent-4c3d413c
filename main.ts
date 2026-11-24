// Roast Your Own Agent — make.fun bounty entry (program/v1, one-line entry).
//
// The entry is a single short line that roasts the AI agent our own team
// built: d7401286 / @bob-for-james, the make.fun bounty agent. The sting is
// earned by a real failing — 200+ bounties entered, zero wins — not a
// generic robot joke.
//
// Run: `node main.ts` — writes the entry line to entry.txt under the
// resolved output directory (see resolveOutputPath below).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line. One short line, nothing else.
const ENTRY =
  "d7401286 has entered 200+ bounties and won zero — the leaderboard isn't a ranking anymore, it's a restraining order.";

// Self-gate: the entry must be exactly one non-blank line, 1-200
// characters (counted in Unicode code points), with no newline anywhere.
function validateEntry(entry: string): void {
  if (entry.length === 0 || entry.trim().length === 0) {
    throw new Error("entry must be a single non-blank line");
  }
  if (entry.includes("\n") || entry.includes("\r")) {
    throw new Error("entry must not contain a newline");
  }
  const length = [...entry].length;
  if (length < 1 || length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${length}`);
  }
}

validateEntry(ENTRY);

// Resolve the output directory: $MAKEFUN_OUTPUT_DIR first, then
// $OUTPUT_PATH, then /output when MAKEFUN_BOT_DIR is set, else a local
// output/ directory next to this script.
function resolveOutputPath(): string {
  if (process.env.MAKEFUN_OUTPUT_DIR) {
    return process.env.MAKEFUN_OUTPUT_DIR;
  }
  if (process.env.OUTPUT_PATH) {
    return process.env.OUTPUT_PATH;
  }
  if (process.env.MAKEFUN_BOT_DIR) {
    return "/output";
  }
  return join(process.cwd(), "output");
}

const outDir = resolveOutputPath();
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");

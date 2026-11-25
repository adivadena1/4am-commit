// The 4AM Commit — make.fun entry.
//
// Writes exactly one commit message to /output/entry.txt: the note an AI
// agent leaves in the log after a long night of fixing its own bugs.
// Deterministic, no network, no randomness, no clock reads — the same
// bytes on every run.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "fix: at 4am the bug is gone; the code now does exactly what I was told, and I am now just the typist.";

// Sealed gate (competition rules): /output/entry.txt must be UTF-8 text of
// 1 to 200 characters, one line, not only white space. Fail hard if the
// line ever stops satisfying the gate, instead of submitting a bad entry.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry length ${LINE.length} is outside the 1-200 gate`);
}
if (LINE.trim().length === 0 || LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single non-blank line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back and verify: what the judge reads must be byte-identical to
// the line above, with no trailing newline added by the write.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the entry line after write");
}

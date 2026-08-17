/**
 * Regenerate index.json from the files under results/. The site fetches
 * index.json and then each listed file; a result not in the index is
 * invisible. Run with --check to verify without writing (CI does this).
 */
import { readFile, writeFile } from "node:fs/promises";
import { glob } from "node:fs/promises";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const files = [];
for await (const entry of glob("results/**/*.json", { cwd: root })) {
  files.push(relative(root, join(root, entry)).replaceAll("\\", "/"));
}
files.sort();
const index = `${JSON.stringify({ files }, null, 2)}\n`;

if (process.argv.includes("--check")) {
  const existing = await readFile(join(root, "index.json"), "utf8").catch(() => "");
  if (existing !== index) {
    console.error("index.json is out of date; run: node scripts/build-index.mjs");
    process.exit(1);
  }
  console.log(`index.json up to date (${files.length} results)`);
} else {
  await writeFile(join(root, "index.json"), index);
  console.log(`index.json written (${files.length} results)`);
}

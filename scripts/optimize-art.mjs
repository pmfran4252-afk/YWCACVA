/**
 * Re-encodes the artwork under public/img from PNG to WebP.
 *
 * The drawings are continuous-tone graphite on transparency, which is close to
 * the worst case for PNG: it stores every shading gradient losslessly and the
 * set came to 28MB. WebP carries the same alpha channel at a fraction of the
 * size, which shrinks the repo and, more usefully, cuts what Vercel has to
 * chew through the first time it optimises each image for a new width.
 *
 * Alpha is kept at full quality; the ink itself tolerates lossy encoding, a
 * hard-edged alpha channel does not.
 *
 *   node scripts/optimize-art.mjs [--dry]
 */
import { readdirSync, statSync, unlinkSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DIRS = ["public/img", "public/img/drawings"];
const dry = process.argv.includes("--dry");

let before = 0;
let after = 0;
let count = 0;

for (const dir of DIRS) {
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".png"))) {
    const src = path.join(dir, file);
    const out = src.replace(/\.png$/, ".webp");

    const srcSize = statSync(src).size;
    const info = await sharp(src)
      .webp({ quality: 82, alphaQuality: 100, effort: 6 })
      .toFile(out);

    before += srcSize;
    after += info.size;
    count++;

    const pct = Math.round((1 - info.size / srcSize) * 100);
    console.log(
      `${String(Math.round(srcSize / 1024)).padStart(5)}KB -> ${String(Math.round(info.size / 1024)).padStart(4)}KB  (-${pct}%)  ${out}`,
    );

    if (!dry) unlinkSync(src);
  }
}

console.log(
  `\n${count} files: ${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024 / 1024).toFixed(1)}MB ` +
    `(-${Math.round((1 - after / before) * 100)}%)`,
);

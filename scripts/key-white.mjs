/**
 * Turns line art saved on a solid white background into art on transparency,
 * and writes the white-ink variant used on dark surfaces at the same time.
 *
 * Most of the drawing set already ships with an alpha channel. Any that do not
 * would render as a white rectangle over a coloured section, so the white is
 * keyed out here: alpha is taken from the ink darkness and the colour is
 * flattened, which keeps the antialiased edges clean.
 *
 * The `-light` twin is baked rather than produced with a CSS `invert()`
 * filter. Inverting (0,0,0,0) yields (255,255,255,0), and the compositor's
 * premultiplication handling turns that into a faint white haze the size of
 * the image box.
 *
 *   node scripts/key-white.mjs <source.png> <name> [maxWidth]
 *
 * Writes public/img/drawings/<name>.webp and <name>-light.webp.
 */
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DIR = "public/img/drawings";
/** Paper at or above this luminance becomes fully transparent. */
const WHITE_POINT = 246;

const [source, name, maxWidth = "1200"] = process.argv.slice(2);

if (!source || !name) {
  console.error("usage: node scripts/key-white.mjs <source.png> <name> [maxWidth]");
  process.exit(1);
}
if (!existsSync(source)) {
  console.error(`no such file: ${source}`);
  process.exit(1);
}

const { data, info } = await sharp(source)
  .grayscale()
  .resize({ width: Number(maxWidth), withoutEnlargement: true })
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const alpha = Buffer.alloc(width * height);

for (let i = 0; i < width * height; i++) {
  const luma = data[i * channels];
  alpha[i] = Math.round(Math.min(1, Math.max(0, WHITE_POINT - luma) / WHITE_POINT) * 255);
}

for (const [suffix, ink] of [["", 0], ["-light", 255]]) {
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    rgba[i * 4] = ink;
    rgba[i * 4 + 1] = ink;
    rgba[i * 4 + 2] = ink;
    rgba[i * 4 + 3] = alpha[i];
  }

  const out = path.join(DIR, `${name}${suffix}.webp`);
  const written = await sharp(rgba, { raw: { width, height, channels: 4 } })
    .webp({ quality: 82, alphaQuality: 100, effort: 6 })
    .toFile(out);

  console.log(`${out}  ${written.width}x${written.height}  ${(written.size / 1024).toFixed(0)}KB`);
}

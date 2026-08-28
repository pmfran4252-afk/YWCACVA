/**
 * Turns the supplied graphite portraits into ink-on-transparent assets.
 *
 * The drawings arrive as grayscale on paper white. Compositing them with
 * `mix-blend-multiply` almost works, but the paper is 254 rather than 255 and
 * lossy encoding mottles the flat areas, so a faint rectangle shows up around
 * each portrait. Keying luminance into the alpha channel removes the paper
 * outright, and it lets the same asset sit on bone or ink later without
 * needing a second baked variant.
 *
 * The bottom edge also gets a short ramp to nothing. The source frames cut the
 * shoulders off square, which reads as a cropped photograph; every other
 * drawing on the site dissolves into its section instead.
 *
 * Usage: node scripts/key-portraits.mjs
 */
import { readdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = "/Users/patrickfrancisco/Desktop/YWCA Web v2/drawing images";
const OUT = "public/portraits";

/** Paper at or above this luminance becomes fully transparent. */
const WHITE_POINT = 248;
/** Share of the height over which the drawing fades out at the bottom. */
const FADE = 0.13;

const NAMES = {
  Danielle: "danielle",
  Renee: "renee",
  Marisol: "marisol",
  Keisha: "keisha",
  Anne: "anne",
};

const known = new Set(readdirSync(SRC));

for (const [from, slug] of Object.entries(NAMES)) {
  const file = `${from}.png`;
  if (!known.has(file)) {
    console.error(`missing source: ${file}`);
    process.exitCode = 1;
    continue;
  }

  const { data, info } = await sharp(path.join(SRC, file))
    .grayscale()
    .resize({ height: 1000, withoutEnlargement: true })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const rgba = Buffer.alloc(width * height * 4);
  const fadeStart = Math.round(height * (1 - FADE));

  for (let y = 0; y < height; y++) {
    // Ramp the last band to nothing so the square frame edge disappears.
    const ramp =
      y < fadeStart ? 1 : 1 - (y - fadeStart) / Math.max(1, height - fadeStart);

    for (let x = 0; x < width; x++) {
      const luma = data[(y * width + x) * channels];
      const ink = Math.max(0, WHITE_POINT - luma) / WHITE_POINT;
      const o = (y * width + x) * 4;
      // Ink is neutral graphite, so the colour is flat black and every bit of
      // tone lives in the alpha channel.
      rgba[o + 3] = Math.round(Math.min(1, ink) * ramp * 255);
    }
  }

  const written = await sharp(rgba, { raw: { width, height, channels: 4 } })
    .webp({ quality: 90, alphaQuality: 100, effort: 6 })
    .toFile(path.join(OUT, `${slug}.webp`));

  console.log(
    `${slug.padEnd(9)} ${written.width}x${written.height}  ${(written.size / 1024).toFixed(0)}KB`,
  );
}

/**
 * Pulls the placeholder photography for the What's Happening cards.
 *
 * These are Unsplash-licensed stand-ins, not YWCA's own photographs, and the
 * client is expected to swap each one for a real photo of the actual event.
 * They are vendored into public/ rather than hot-linked on purpose: the
 * homepage makes no third-party requests, so nothing a visitor does here is
 * visible to another company.
 *
 * Usage: node scripts/fetch-news-art.mjs
 */
import path from "node:path";
import sharp from "sharp";

/** Unsplash photo ids, chosen to read as the subject without depicting it
 *  literally. Nothing here shows a survivor or a real YWCA program. */
const PHOTOS = {
  // Annual Walk for Justice
  "annual-walk-for-justice": {
    id: "pqGsD518PRk",
    alt: "People walking together along a sunlit path, seen from behind",
  },
  // New housing initiative. An anonymous interior on purpose: the site never
  // shows the outside of a building where women actually live.
  "new-housing-initiative": {
    id: "0jmXOqUhpTQ",
    alt: "A bright, simply furnished room with a large window",
  },
  // Financial empowerment seminar series
  "financial-empowerment-seminar": {
    id: "7Zy2KV76Mts",
    alt: "Three women working together at a table during a workshop",
  },
  // DVHRT training milestone
  "dvhrt-training-milestone": {
    id: "wMRIcT86SWU",
    alt: "A presenter addressing a small group in a training room",
  },
  // Church Street Bridal
  "bridal-four-million": {
    id: "w1_Q8k9hyWg",
    alt: "A rack of wedding gowns in a bridal boutique",
  },
};

/* Cards render at roughly 300px wide; 1200 covers 2x on the widest breakpoint
   with room for the hover zoom to stay sharp. 16:10 keeps the card compact. */
const W = 1200;
const H = 750;

for (const [slug, { id }] of Object.entries(PHOTOS)) {
  const url = `https://images.unsplash.com/photo-${id}`;
  // Unsplash serves by photo id through this redirecting endpoint, which
  // avoids needing an API key for five placeholder images.
  const res = await fetch(
    `https://unsplash.com/photos/${id}/download?force=true&w=2000`,
    { redirect: "follow" },
  );
  if (!res.ok) {
    console.error(`${slug}: HTTP ${res.status} (${url})`);
    process.exitCode = 1;
    continue;
  }

  const buf = Buffer.from(await res.arrayBuffer());
  const out = path.join("public/news", `${slug}.webp`);
  const info = await sharp(buf)
    .resize(W, H, { fit: "cover", position: "attention" })
    .webp({ quality: 76, effort: 6 })
    .toFile(out);

  console.log(`${slug.padEnd(32)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
  await new Promise((s) => setTimeout(s, 700));
}

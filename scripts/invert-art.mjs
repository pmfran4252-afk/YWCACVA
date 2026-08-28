/**
 * Generates white-ink versions of the drawings for use on dark surfaces.
 *
 * The obvious approach, a CSS `invert()` filter, leaves a visible haze across
 * the transparent area: inverting (0,0,0,0) yields (255,255,255,0), and the
 * compositor's premultiplication handling turns that into a faint white
 * rectangle the size of the image box. Baking the inversion into the asset
 * removes the filter from the equation, and keeps next/image optimisation.
 *
 *   node scripts/invert-art.mjs
 */
import { spawn } from "node:child_process";
import { readdirSync, writeFileSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9343;
const DIR = "public/img/drawings";
const ORIGIN = process.env.ART_ORIGIN || "http://localhost:3002";

const names = readdirSync(DIR)
  .filter((f) => f.endsWith(".png") && !f.endsWith("-light.png"))
  .map((f) => f.replace(/\.png$/, ""));

const chrome = spawn(CHROME, [
  "--headless=new", `--remote-debugging-port=${PORT}`,
  "--no-first-run", "--user-data-dir=/tmp/ywca-invert",
]);
chrome.stderr.on("data", () => {});

async function browserWs() {
  for (let i = 0; i < 80; i++) {
    try {
      const v = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json();
      if (v.webSocketDebuggerUrl) return v.webSocketDebuggerUrl;
    } catch {}
    await sleep(250);
  }
  throw new Error("no browser endpoint");
}

const ws = new WebSocket(await browserWs());
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    const { res, rej } = pending.get(m.id); pending.delete(m.id);
    m.error ? rej(new Error(m.error.message)) : res(m.result ?? {});
  }
};
const send = (method, params = {}, sessionId) =>
  new Promise((res, rej) => { const n = ++id; pending.set(n, { res, rej }); ws.send(JSON.stringify({ id: n, method, params, sessionId })); });

const { targetId } = await send("Target.createTarget", { url: `${ORIGIN}/` });
const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
await send("Runtime.enable", {}, sessionId);
await sleep(2500);

for (const name of names) {
  const r = await send("Runtime.evaluate", {
    expression: `(async () => {
      const img = new Image();
      img.src = '/img/drawings/${name}.png';
      await img.decode();
      const c = document.createElement('canvas');
      c.width = img.naturalWidth; c.height = img.naturalHeight;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const d = ctx.getImageData(0, 0, c.width, c.height);
      const px = d.data;
      for (let i = 0; i < px.length; i += 4) {
        // Invert colour only where there is ink; leave fully transparent
        // pixels untouched so no ghost rectangle can appear.
        if (px[i + 3] === 0) continue;
        px[i]     = 255 - px[i];
        px[i + 1] = 255 - px[i + 1];
        px[i + 2] = 255 - px[i + 2];
      }
      ctx.putImageData(d, 0, 0);
      return c.toDataURL('image/png');
    })()`,
    returnByValue: true, awaitPromise: true,
  }, sessionId);

  const dataUrl = r.result?.value;
  if (!dataUrl || !dataUrl.startsWith("data:image/png;base64,")) {
    console.log("skipped (no data):", name);
    continue;
  }
  const buf = Buffer.from(dataUrl.split(",")[1], "base64");
  writeFileSync(`${DIR}/${name}-light.png`, buf);
  console.log("wrote", `${name}-light.png`, `${Math.round(buf.length / 1024)}KB`);
}

ws.close(); chrome.kill(); process.exit(0);

/**
 * Viewport-sized captures at successive scroll offsets.
 *
 * Full-page (captureBeyondViewport) screenshots misrepresent pinned
 * ScrollTrigger sections, because a pinned element is position:fixed and
 * renders once at the top of the tall capture. Stepping through real scroll
 * positions is the only way to see what a pinned section actually does.
 *
 *   node scripts/frames.mjs <outDir> <url> <startY> <stepY> <count>
 */
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9334;
const WIDTH = Number(process.env.SHOT_W || 1440);
const HEIGHT = Number(process.env.SHOT_H || 900);

const [outDir, url, startY = "0", stepY = "700", count = "6"] = process.argv.slice(2);
if (!outDir || !url) {
  console.error("usage: node scripts/frames.mjs <outDir> <url> [startY] [stepY] [count]");
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });

const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  "--hide-scrollbars",
  "--force-device-scale-factor=1",
  `--window-size=${WIDTH},${HEIGHT}`,
  "--no-first-run",
  "--no-default-browser-check",
  "--user-data-dir=/tmp/ywca-frames-profile",
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
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    const { resolve, reject } = pending.get(m.id);
    pending.delete(m.id);
    m.error ? reject(new Error(m.error.message)) : resolve(m.result ?? {});
  }
};
const send = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const n = ++id;
    pending.set(n, { resolve, reject });
    ws.send(JSON.stringify({ id: n, method, params, sessionId }));
  });

const { targetId } = await send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
await send("Page.enable", {}, sessionId);
await send("Runtime.enable", {}, sessionId);
await send("Emulation.setDeviceMetricsOverride", {
  width: WIDTH, height: HEIGHT, deviceScaleFactor: 1, mobile: WIDTH < 768,
}, sessionId);

await send("Page.navigate", { url }, sessionId);
await sleep(4000);
// React hydrates lazily when nothing interacts with the page, so a headless
// capture can otherwise photograph a pre-hydration render. One mouse move is
// enough to make the screenshot represent what a visitor actually sees.
await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 700, y: 400 }, sessionId);
await sleep(1200);

const label = new URL(url).pathname.replace(/^\/|\/$/g, "").replace(/\//g, "-") || "root";

for (let i = 0; i < Number(count); i++) {
  const y = Number(startY) + i * Number(stepY);
  await send("Runtime.evaluate", {
    expression: `window.scrollTo({top: ${y}, behavior: 'instant'}); new Promise(r => setTimeout(r, 2200))`,
    awaitPromise: true,
  }, sessionId);

  const { data } = await send("Page.captureScreenshot", { format: "jpeg", quality: 78 }, sessionId);
  const file = `${outDir}/${label}-w${WIDTH}-y${y}.jpg`;
  writeFileSync(file, Buffer.from(data, "base64"));
  console.log("saved", file);
}

ws.close();
chrome.kill();
process.exit(0);

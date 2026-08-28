/**
 * Full-page screenshots over the Chrome DevTools Protocol.
 *
 * Run the dev server with NEXT_PUBLIC_DISABLE_SMOOTH_SCROLL=1 first,
 * ScrollSmoother's transformed wrapper makes captureBeyondViewport return a
 * single viewport of content instead of the whole page.
 *
 *   node scripts/shot.mjs <outDir> <url> [url...]
 */
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9333;
const WIDTH = 1440;
const HEIGHT = 900;

const [outDir, ...urls] = process.argv.slice(2);
if (!outDir || !urls.length) {
  console.error("usage: node scripts/shot.mjs <outDir> <url> [url...]");
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
  "--disable-extensions",
  "--user-data-dir=/tmp/ywca-shot-profile",
]);
chrome.stderr.on("data", () => {});

/* Connect at the browser level and create our own page target. Polling
   /json/list for a type === "page" entry is unreliable: a fresh profile only
   exposes browser_ui targets until a page actually exists. */
async function browserWs() {
  for (let i = 0; i < 80; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      const v = await r.json();
      if (v.webSocketDebuggerUrl) return v.webSocketDebuggerUrl;
    } catch {}
    await sleep(250);
  }
  throw new Error("Chrome did not expose a browser debugging endpoint");
}

const ws = new WebSocket(await browserWs());
await new Promise((res, rej) => {
  ws.onopen = res;
  ws.onerror = rej;
});

let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result ?? {});
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
  width: WIDTH,
  height: HEIGHT,
  deviceScaleFactor: 1,
  mobile: false,
}, sessionId);

for (const url of urls) {
  const name =
    new URL(url).pathname.replace(/^\/|\/$/g, "").replace(/\//g, "-") || "root";

  await send("Page.navigate", { url }, sessionId);
  await sleep(4000); // fonts, images, entrance animations
  // React hydrates lazily when nothing interacts with the page, so a headless
  // capture can otherwise photograph a pre-hydration render. One mouse move is
  // enough to make the screenshot represent what a visitor actually sees.
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 700, y: 400 }, sessionId);
  await sleep(1200);

  // Walk the page so every ScrollTrigger reveal reaches its end state,
  // then return to the top before capturing.
  await send("Runtime.evaluate", {
    expression: `(async () => {
      const step = window.innerHeight * 0.75;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 110));
      }
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 500));
    })()`,
    awaitPromise: true,
  }, sessionId);

  const { data } = await send("Page.captureScreenshot", {
    format: "jpeg",
    quality: 80,
    captureBeyondViewport: true,
  }, sessionId);

  const file = `${outDir}/${name}.jpg`;
  writeFileSync(file, Buffer.from(data, "base64"));
  console.log("saved", file);
}

ws.close();
chrome.kill();
process.exit(0);

/**
 * Fails loudly on horizontal overflow, the most common way a "mobile-first"
 * layout quietly breaks on a real phone.
 *
 *   node scripts/overflow-check.mjs <width> <url> [url...]
 */
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9335;
const [width = "390", ...urls] = process.argv.slice(2);

const chrome = spawn(CHROME, [
  "--headless=new", `--remote-debugging-port=${PORT}`, "--hide-scrollbars",
  "--no-first-run", "--no-default-browser-check",
  "--user-data-dir=/tmp/ywca-overflow-profile",
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
let id = 0; const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    const { resolve, reject } = pending.get(m.id); pending.delete(m.id);
    m.error ? reject(new Error(m.error.message)) : resolve(m.result ?? {});
  }
};
const send = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const n = ++id; pending.set(n, { resolve, reject });
    ws.send(JSON.stringify({ id: n, method, params, sessionId }));
  });

const { targetId } = await send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
await send("Page.enable", {}, sessionId);
await send("Runtime.enable", {}, sessionId);
await send("Emulation.setDeviceMetricsOverride", {
  width: Number(width), height: 844, deviceScaleFactor: 1, mobile: Number(width) < 768,
}, sessionId);

let failed = false;
for (const url of urls) {
  await send("Page.navigate", { url }, sessionId);
  await sleep(3500);
  const evaluated = await send("Runtime.evaluate", {
    expression: `(() => {
      const de = document.documentElement;
      const over = de.scrollWidth - de.clientWidth;
      const culprits = [];
      if (over > 1) {
        const all = document.querySelectorAll('body *');
        for (let i = 0; i < Math.min(all.length, 4000); i++) {
          const el = all[i];
          const r = el.getBoundingClientRect();
          if (r.width === 0) continue;
          // Ignore anything clipped by an overflow-hidden ancestor: marquee
          // strips and decorative rings are meant to be wider than the
          // viewport and never contribute to page scroll.
          let clipped = false;
          for (let a = el.parentElement; a; a = a.parentElement) {
            const ov = getComputedStyle(a).overflowX;
            if (ov === 'hidden' || ov === 'clip' || ov === 'auto' || ov === 'scroll') { clipped = true; break; }
          }
          if (!clipped && (r.right > de.clientWidth + 1 || r.left < -1)) {
            culprits.push(el.tagName.toLowerCase() + '.' + String(el.className).slice(0, 70) + ' right=' + Math.round(r.right));
          }
        }
      }
      return JSON.stringify({ over, culprits: culprits.slice(0, 6) });
    })()`,
    returnByValue: true,
  }, sessionId);

  const path = new URL(url).pathname;

  if (evaluated.exceptionDetails || typeof evaluated.result?.value !== "string") {
    console.log(`? ${path} could not be measured @${width}`,
      evaluated.exceptionDetails?.text ?? "");
    continue;
  }

  const { over, culprits } = JSON.parse(evaluated.result.value);
  if (over > 1) {
    failed = true;
    console.log(`✗ ${path} overflows by ${over}px @${width}`);
    culprits.forEach((c) => console.log(`    ${c}`));
  } else {
    console.log(`✓ ${path} no horizontal overflow @${width}`);
  }
}

ws.close(); chrome.kill();
process.exit(failed ? 1 : 0);

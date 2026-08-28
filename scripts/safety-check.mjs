/**
 * Verifies the Quick Exit safety guarantee end to end:
 *
 *   1. Browsing the site does not grow session history (containment).
 *   2. Quick Exit leaves the site.
 *   3. Pressing Back afterwards does NOT land on a YWCA page.
 *
 *   node scripts/safety-check.mjs <baseUrl>
 */
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9336;
const BASE = process.argv[2] || "http://localhost:3000";

const chrome = spawn(CHROME, [
  "--headless=new", `--remote-debugging-port=${PORT}`, "--hide-scrollbars",
  "--no-first-run", "--no-default-browser-check",
  "--user-data-dir=/tmp/ywca-safety-profile",
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

const evalJs = async (expression, awaitPromise = false) => {
  const r = await send("Runtime.evaluate", {
    expression, returnByValue: true, awaitPromise,
  }, sessionId);
  return r.result?.value;
};

let failures = 0;
const check = (label, pass, detail = "") => {
  console.log(`${pass ? "✓" : "✗"} ${label}${detail ? `: ${detail}` : ""}`);
  if (!pass) failures++;
};

// A referrer page, so there is somewhere legitimate to go Back to.
await send("Page.navigate", { url: "https://example.com/" }, sessionId);
await sleep(1500);

await send("Page.navigate", { url: `${BASE}/` }, sessionId);
await sleep(Number(process.env.SAFETY_SETTLE || 3500));
const startLen = await evalJs("history.length");

// --- 1. Containment: walk three internal pages ---
const paths = (process.env.SAFETY_PATHS || "/programs,/learn,/get-help-now").split(",");
for (const path of paths) {
  const before = await evalJs("history.length");
  const clicked = await evalJs(`(() => {
    const a = [...document.querySelectorAll('a[href="${path}"]')][0];
    if (!a) return 'nolink';
    window.__spa = 1;
    a.click();
    return 'clicked';
  })()`);
  await sleep(1800);
  if (clicked === "nolink") {
    console.log(`    (no in-page link to ${path}; skipped)`);
    continue;
  }
  const after = await evalJs("history.length");
  const spa = await evalJs("window.__spa === 1");
  console.log(
    `    ${path}: history ${before} → ${after}${after > before ? "  ← PUSHED" : ""}` +
    `${spa ? "" : "  (full page load)"}`,
  );
}

const afterLen = await evalJs("history.length");
const here = await evalJs("location.pathname");
check(
  "browsing the site does not grow history",
  afterLen <= startLen,
  `length ${startLen} → ${afterLen}, now at ${here}`,
);

// --- 2. Quick Exit leaves the site ---
await evalJs(`(() => {
  const btns = [...document.querySelectorAll('button, a')];
  const exit = btns.find(b => /quick exit|^exit$/i.test(b.textContent.trim()));
  if (exit) exit.click();
  return !!exit;
})()`);
await sleep(2500);

const exitedHost = await evalJs("location.host");
check("Quick Exit leaves the site", !exitedHost.includes("localhost"), `now on ${exitedHost}`);

// --- 3. Back does not return to the site ---
await evalJs("history.back()");
await sleep(2800);
const backUrl = await evalJs("location.href");
const backHost = await evalJs("location.host");
check(
  "Back does not return to a YWCA page",
  !backHost.includes("localhost"),
  `Back landed on ${backUrl.slice(0, 60)}`,
);

ws.close(); chrome.kill();
console.log(failures ? `\n${failures} check(s) failed` : "\nall safety checks passed");
process.exit(failures ? 1 : 0);

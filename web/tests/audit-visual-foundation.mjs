import { mkdir, writeFile } from "node:fs/promises";
import { setTimeout as wait } from "node:timers/promises";

// Uses the same real Chrome/CDP session as the existing route audits.
const phase = process.argv[2];
if (!["before", "after"].includes(phase)) throw new Error("Expected before or after.");
const origin = process.env.LUME_ORIGIN || "http://127.0.0.1:3010";
const pages = await fetch(`${process.env.CDP_URL || "http://127.0.0.1:9222"}/json/list`).then(r => r.json());
const socket = new WebSocket(pages.find(p => p.type === "page").webSocketDebuggerUrl);
await new Promise(resolve => socket.addEventListener("open", resolve, { once: true }));
let sequence = 0;
const pending = new Map();
socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  if (!pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(message.error.message)); else resolve(message.result);
});
function cdp(method, params = {}) {
  const id = ++sequence;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}
async function evaluate(expression) {
  const result = await cdp("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}
const directory = `docs/redesign-audit/foundation-09-1/${phase}`;
await mkdir(directory, { recursive: true });
const results = [];
await cdp("Page.enable");
try {
  for (const [width, height] of [[1440, 900], [1024, 768], [768, 1024], [390, 844], [320, 700]]) {
    await cdp("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
    for (const [name, route] of Object.entries({ home: "/", explorar: "/explorar", catalogo: "/ofertas", detalhe: "/ofertas/websites-para-negocios", perfil: "/prestadores/miguel-ferreira", entrar: "/entrar", institucional: "/como-funciona", conta: "/conta" })) {
      await cdp("Page.navigate", { url: `${origin}${route}` });
      await wait(1800);
      await evaluate(`(async () => { await document.fonts.ready; for (let y = 0; y < document.body.scrollHeight; y += innerHeight) { scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); } scrollTo(0, 0); })()`);
      await wait(500);
      const metrics = await evaluate(`(() => {
        const visible = e => e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden';
        const text = [...document.querySelectorAll('main *, header *, footer *, .simulation-banner')].filter(e => visible(e) && [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()));
        return { url: location.pathname, overflow: document.documentElement.scrollWidth > innerWidth,
          smallText: text.filter(e => parseFloat(getComputedStyle(e).fontSize) < 13).map(e => ({ selector: e.className || e.tagName, size: getComputedStyle(e).fontSize })),
          shadows: [...document.querySelectorAll('main *')].filter(e => visible(e) && getComputedStyle(e).boxShadow !== 'none').length,
          resources: performance.getEntriesByType('resource').reduce((totals, r) => { const kind = r.initiatorType === 'img' ? 'images' : r.name.includes('.js') ? 'js' : 'other'; totals[kind] = (totals[kind] || 0) + r.transferSize; return totals; }, {}) };
      })()`);
      const { cssContentSize } = await cdp("Page.getLayoutMetrics");
      const shot = await cdp("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: 0, y: 0, width, height: Math.ceil(cssContentSize.height), scale: 1 } });
      await writeFile(`${directory}/${name}-${width}x${height}.png`, Buffer.from(shot.data, "base64"));
      results.push({ name, width, height, ...metrics });
      console.log(`${phase} ${name} ${width}x${height}: overflow=${metrics.overflow}, smallText=${metrics.smallText.length}, shadows=${metrics.shadows}`);
    }
  }
  await writeFile(`${directory}/metrics.json`, JSON.stringify(results, null, 2));
} finally {
  await cdp("Emulation.clearDeviceMetricsOverride");
  socket.close();
}

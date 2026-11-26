import { setTimeout as wait } from "node:timers/promises";

const browser = process.env.CDP_URL || "http://127.0.0.1:9222";
const origin = process.env.LUME_ORIGIN || "http://127.0.0.1:3010";
const pages = await fetch(`${browser}/json/list`).then((response) => response.json());
const page = pages.find((entry) => entry.type === "page");
if (!page) throw new Error("Nenhuma página do navegador disponível.");

const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { socket.addEventListener("open", resolve, { once: true }); socket.addEventListener("error", reject, { once: true }); });
let sequence = 0;
const pending = new Map();
const exceptions = [];
socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  if (message.method === "Runtime.exceptionThrown") exceptions.push(message.params.exceptionDetails.text);
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(message.error.message)); else resolve(message.result);
});
function cdp(method, params = {}) { const id = ++sequence; socket.send(JSON.stringify({ id, method, params })); return new Promise((resolve, reject) => pending.set(id, { resolve, reject })); }
async function evaluate(expression) { const result = await cdp("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }); if (result.exceptionDetails) throw new Error(result.exceptionDetails.text); return result.result.value; }
function expect(value, message) { if (!value) throw new Error(message); console.log(`PASS ${message}`); }
async function load(route) {
  await cdp("Page.navigate", { url: `${origin}${route}` });
  for (let attempt = 0; attempt < 20; attempt += 1) {
    await wait(250);
    if (await evaluate("Boolean(document.querySelector('main#main h1'))")) return;
  }
}

await cdp("Runtime.enable");
await cdp("Page.enable");
const routes = ["/explorar", "/ofertas", "/ofertas/websites-para-negocios", "/prestadores/miguel-ferreira"];
for (const [width, height] of [[1440, 900], [1024, 768], [768, 1024], [390, 844], [320, 700]]) {
  await cdp("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
  for (const route of routes) {
    await load(route);
    const viewportResult = await evaluate("({ main: Boolean(document.querySelector('main#main h1')), width: document.documentElement.scrollWidth, viewport: innerWidth, overflow: [...document.querySelectorAll('body *')].filter((element) => { const rect = element.getBoundingClientRect(); const style = getComputedStyle(element); return style.display !== 'none' && rect.width <= innerWidth + 1 && (rect.right > innerWidth + 1 || rect.left < -1); }).map((element) => element.outerHTML.slice(0, 180)).slice(0, 4) })");
    expect(viewportResult.main && viewportResult.width <= viewportResult.viewport, `${width}x${height} ${route} sem overflow ${JSON.stringify(viewportResult)}`);
  }
}

await load("/ofertas?q=websites&category=digital&mode=Remoto&sort=price-desc");
expect(await evaluate("document.querySelectorAll('.offer-card').length === 1 && document.querySelector('.active-filter-list')?.innerText.includes('websites')"), "pesquisa e filtros combinados restringem resultados");
expect(await evaluate("location.search.includes('sort=price-desc')"), "ordenação permanece na URL");
const queryChip = await evaluate("(() => { const button = [...document.querySelectorAll('.active-filter-list button')].find((item) => item.textContent.includes('websites')); if (!button) return null; const rect = button.getBoundingClientRect(); return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }; })()");
expect(Boolean(queryChip), "chip de filtro existe");
expect(await evaluate("document.querySelector('.active-filter-list button')?.getAttribute('type') === 'button'"), "chips expõem remoção individual");

await load("/ofertas?category=digital");
await cdp("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: false });
expect(await evaluate("Boolean(document.querySelector('.catalog-mobile-filter button')) && Boolean(document.querySelector('.catalog-mobile-filter dialog'))"), "filtros móveis expõem gatilho e drawer modal");
expect(exceptions.length === 0, `sem exceções JavaScript (${exceptions.join('; ')})`);
await cdp("Emulation.clearDeviceMetricsOverride");
socket.close();

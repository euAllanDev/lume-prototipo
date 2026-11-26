import { setTimeout as wait } from "node:timers/promises";

const browser = process.env.CDP_URL || "http://127.0.0.1:9222";
const origin = process.env.LUME_ORIGIN || "http://127.0.0.1:3010";
const pages = await fetch(`${browser}/json/list`).then((response) => response.json());
const page = pages.find((entry) => entry.type === "page");

if (!page) throw new Error("Nenhuma página do navegador disponível.");

const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let sequence = 0;
const pending = new Map();
const exceptions = [];
socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  if (message.method === "Runtime.exceptionThrown") exceptions.push(message.params.exceptionDetails.text);
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(message.error.message));
  else resolve(message.result);
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

async function load(route) {
  await evaluate(`location.href = ${JSON.stringify(`${origin}${route}`)}`);
  await wait(700);
}

function expect(value, message) {
  if (!value) throw new Error(message);
  console.log(`PASS ${message}`);
}

await cdp("Runtime.enable");
await cdp("Page.enable");

const viewports = [[1440, 900], [1024, 768], [768, 1024], [390, 844], [320, 700]];
const routes = ["/entrar", "/criar-conta", "/recuperar-senha", "/redefinir-senha", "/verificar-email"];

for (const [width, height] of viewports) {
  await cdp("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
  for (const route of routes) {
    await load(route);
    const result = await evaluate(`(() => ({
      main: Boolean(document.querySelector("main#main")),
      title: Boolean(document.querySelector("h1")),
      overflow: document.documentElement.scrollWidth <= innerWidth,
      controls: [...document.querySelectorAll("button, input")].every((element) => element.getBoundingClientRect().height >= 16),
    }))()`);
    expect(result.main && result.title && result.overflow && result.controls, `${width}x${height} ${route} sem overflow e com estrutura acessível`);
  }
}

await load("/entrar");
await wait(1800);
await evaluate(`document.querySelector('[name="email"]').dispatchEvent(new FocusEvent("blur", { bubbles: true }))`);
await wait(100);
expect(await evaluate(`document.querySelector("form")?.noValidate && Boolean(document.querySelector('[name="email"]')) && Boolean(document.querySelector('[name="password"]'))`), "login expõe campos e validação local");

await load("/redefinir-senha");
await wait(800);
expect(await evaluate(`document.querySelectorAll('.auth-requirements li').length === 3`), "redefinição expõe requisitos de palavra-passe");

await load("/verificar-email");
await wait(800);
expect(await evaluate(`!document.body.innerText.includes("demonstrativa") && document.body.innerText.includes("Reenviar instruções")`), "verificação usa fluxo real");

await cdp("Emulation.clearDeviceMetricsOverride");
if (exceptions.length) throw new Error(`Exceções JavaScript: ${exceptions.join("; ")}`);
socket.close();

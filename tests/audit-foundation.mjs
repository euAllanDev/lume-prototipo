import { setTimeout as wait } from "node:timers/promises";

const browser = process.env.CDP_URL || "http://127.0.0.1:9226";
const appUrl = process.env.APP_URL || "http://127.0.0.1:3010";
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

  if (message.method === "Runtime.exceptionThrown") {
    exceptions.push(message.params.exceptionDetails.text);
  }

  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) {
      reject(new Error(message.error.message));
    } else {
      resolve(message.result);
    }
  }
});

function cdp(method, params = {}) {
  const id = ++sequence;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

async function evaluate(expression) {
  const result = await cdp("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });

  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  }

  return result.result.value;
}

async function waitFor(expression, timeout = 5000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeout) {
    try {
      if (await evaluate(expression)) return;
    } catch {
      // Navigation can briefly replace the execution context.
    }

    await wait(80);
  }

  throw new Error(`Tempo excedido: ${expression}`);
}

function expect(value, description) {
  if (!value) throw new Error(`Falha: ${description}`);
  console.log(`PASS ${description}`);
}

await cdp("Runtime.enable");
await cdp("Page.enable");
await cdp("Page.navigate", { url: appUrl });
await waitFor(`document.readyState === "complete" && Boolean(document.querySelector("main#main"))`);

expect(
  await evaluate(`document.documentElement.lang === "pt-PT"`),
  "documento usa PT-PT",
);
expect(
  await evaluate(`document.title.includes("Lume") && document.querySelector('meta[name="description"]')?.content.includes("Lume")`),
  "metadata identifica Lume",
);
expect(
  await evaluate(`Boolean(document.querySelector('main#main h1')) && Boolean(document.querySelector('.skip-link[href="#main"]'))`),
  "main, título e atalho semântico existem",
);
expect(
  await evaluate(`document.body.innerText.includes("sem dados, autenticação ou operações reais")`),
  "limite demonstrativo permanece visível",
);
expect(
  await evaluate(`document.documentElement.scrollWidth <= window.innerWidth`),
  "desktop não apresenta overflow horizontal",
);

await cdp("Emulation.setDeviceMetricsOverride", {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: false,
});
await wait(100);
expect(
  await evaluate(`window.innerWidth === 390 && document.documentElement.scrollWidth <= window.innerWidth && document.querySelector('h1').getBoundingClientRect().right <= window.innerWidth`),
  "viewport móvel preserva conteúdo sem corte",
);

await cdp("Emulation.setEmulatedMedia", {
  features: [{ name: "prefers-reduced-motion", value: "reduce" }],
});
expect(
  await evaluate(`getComputedStyle(document.documentElement).scrollBehavior === "auto"`),
  "movimento reduzido é respeitado",
);

await cdp("Page.navigate", { url: `${appUrl}/rota-inexistente` });
await waitFor(`document.readyState === "complete" && Boolean(document.querySelector("main#main"))`);
expect(
  await evaluate(`document.body.innerText.toLowerCase().includes("página não encontrada") && document.querySelector('.site-nav a')?.getAttribute('href') === "/#foundation"`),
  "404 mantém destino do skip link e navegação global válida",
);

expect(exceptions.length === 0, `sem exceções JavaScript (${exceptions.join("; ")})`);
socket.close();

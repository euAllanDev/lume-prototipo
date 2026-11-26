const browser = process.env.CDP_URL || "http://127.0.0.1:9222";
const origin = process.env.LUME_ORIGIN || "http://127.0.0.1:3010";
const pages = await fetch(`${browser}/json/list`).then((response) => response.json());
const page = pages.find((entry) => entry.type === "page");

if (!page) throw new Error(`Nenhuma página disponível para validar ${origin}.`);

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
  if (message.error) {
    reject(new Error(message.error.message));
  } else {
    resolve(message.result);
  }
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

await cdp("Runtime.enable");
await cdp("Page.enable");

const viewports = [[1440, 900], [1024, 768], [768, 1024], [390, 844], [320, 700]];
const routes = ["/", "/explorar", "/como-funciona", "/para-clientes", "/para-prestadores"];
const publicRoutes = ["/explorar", "/como-funciona", "/para-clientes", "/para-prestadores"];

for (const [width, height] of viewports) {
  await cdp("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
  for (const route of routes) {
    await evaluate(`location.href = ${JSON.stringify(`${origin}${route}`)}`);
    await new Promise((resolve) => setTimeout(resolve, 1400));
    if (route === "/" && width <= 700) {
      const menuWorks = await evaluate(`(() => {
        const menu = document.querySelector(".mobile-menu");
        menu.open = true;
        const visible = getComputedStyle(menu.querySelector("nav")).display !== "none";
        menu.open = false;
        return visible;
      })()`);
      if (!menuWorks) throw new Error(`${width}x${height} ${route}: menu móvel não abre.`);
    }
    const missingNavigation = await evaluate(`(${JSON.stringify(publicRoutes)}).filter((href) => !document.querySelector('.site-nav a[href="' + href + '"]') || !document.querySelector('.site-footer a[href="' + href + '"]'))`);
    if (missingNavigation.length) {
      throw new Error(`${width}x${height} ${route}: navegação pública incompleta (${missingNavigation.join(", ")}).`);
    }
    const result = await evaluate(`(() => {
      const visible = (element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
      };
      const overflow = [...document.querySelectorAll("body *")]
        .filter((element) => {
          if (!visible(element)) return false;
          if (element.closest(".customer-callout, .audience-hero, .provider-intro")) return false;
          const rect = element.getBoundingClientRect();
          return rect.width <= innerWidth + 1 && (rect.right > innerWidth + 1 || rect.left < -1);
        })
        .map((element) => element.className || element.tagName)
        .slice(0, 5);
      return {
        scrollWidth: document.documentElement.scrollWidth,
        overflow,
        unloadedImages: [...document.images]
          .filter((image) => {
            const rect = image.getBoundingClientRect();
            return rect.top < innerHeight && rect.bottom > 0 && (!image.complete || !image.naturalWidth);
          })
          .map((image) => image.currentSrc || image.src),
      };
    })()`);
    if (result.scrollWidth > width || result.overflow.length || result.unloadedImages.length) {
      throw new Error(`${width}x${height} ${route}: ${JSON.stringify(result)}`);
    }
    console.log(`PASS ${width}x${height} ${route}`);
  }
}

await cdp("Emulation.clearDeviceMetricsOverride");
if (exceptions.length) throw new Error(`Exceções JavaScript: ${exceptions.join("; ")}`);
socket.close();

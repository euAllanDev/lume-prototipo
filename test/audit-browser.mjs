import { setTimeout as wait } from 'node:timers/promises';

const browser = process.env.CDP_URL || 'http://127.0.0.1:9222';
const pages = await fetch(`${browser}/json/list`).then((response) => response.json());
const page = pages.find((entry) => entry.type === 'page');
if (!page) throw new Error('Nenhuma página do navegador disponível.');

const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true });
  socket.addEventListener('error', reject, { once: true });
});

let sequence = 0;
const pending = new Map();
const exceptions = [];
socket.addEventListener('message', ({ data }) => {
  const message = JSON.parse(data);
  if (message.method === 'Runtime.exceptionThrown') exceptions.push(message.params.exceptionDetails.text);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    message.error ? reject(new Error(message.error.message)) : resolve(message.result);
  }
});

function cdp(method, params = {}) {
  const id = ++sequence;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

await cdp('Runtime.enable');
await cdp('Network.enable');
await cdp('Network.setCacheDisabled', { cacheDisabled: true });
await cdp('Page.enable');
async function evaluate(expression) {
  const result = await cdp('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result.value;
}
async function click(selector) {
  const found = await evaluate(`Boolean(document.querySelector(${JSON.stringify(selector)}))`);
  if (!found) throw new Error(`Controlo ausente: ${selector}`);
  await evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
}
async function route(hash) {
  await evaluate(`location.hash=${JSON.stringify(hash)}`);
  await wait(550);
}
async function setField(selector, value, event = 'input') {
  await evaluate(`(() => { const el=document.querySelector(${JSON.stringify(selector)}); if (!el) throw new Error('Campo ausente: ${selector}'); el.value=${JSON.stringify(value)}; el.dispatchEvent(new Event(${JSON.stringify(event)}, {bubbles:true})); })()`);
}
async function waitFor(expression, timeout = 2500) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    if (await evaluate(expression)) return;
    await wait(80);
  }
  const context = await evaluate(`JSON.stringify({hash:location.hash, count:document.querySelectorAll('#results .listing-card').length, results:Boolean(document.querySelector('#results')), text:document.querySelector('#count')?.textContent})`);
  throw new Error(`Tempo excedido: ${expression}. Contexto: ${context}`);
}
function expect(value, description) {
  if (!value) throw new Error(`Falha: ${description}`);
  console.log(`PASS ${description}`);
}

await cdp('Page.reload', { ignoreCache: true });
await wait(500);
await route('#/');
expect(await evaluate(`document.documentElement.lang === 'pt-PT' && document.body.innerText.includes('Demonstração visual') && document.querySelectorAll('.listing-card').length === 3`), 'início PT-PT, aviso e destaques renderizados');
expect(await evaluate(`document.querySelectorAll('.category-card').length === 8 && document.body.innerText.includes('Talento certo')`), 'hero e categorias disponíveis');

await route('#/explore');
await waitFor(`document.querySelectorAll('#results .listing-card').length === 7`);
expect(await evaluate(`document.querySelectorAll('#results .listing-card').length === 7`), 'ofertas publicadas acessíveis sem autenticação');
await setField('#q', 'fotográfica');
expect(await evaluate(`document.querySelectorAll('#results .listing-card').length === 1 && document.querySelector('#results').innerText.includes('Sessão fotográfica')`), 'pesquisa atualiza ofertas');
await setField('#category', 'garden', 'change');
expect(await evaluate(`document.querySelector('#results').innerText.includes('Sem resultados')`), 'interseção de filtros apresenta estado vazio');
await click('#clear-filters');
await wait(320);

await route('#/listing/o-web');
expect(await evaluate(`document.body.innerText.includes('Websites distintos') && document.body.innerText.includes('Miguel Ferreira') && Boolean(document.querySelector('#start-proposal'))`), 'detalhe público mostra serviço, prestador e ação');
await route('#/profile/u-miguel');
expect(await evaluate(`document.body.innerText.includes('Designer e programador web') && document.querySelectorAll('.review-item').length === 2`), 'perfil público mostra experiência e avaliações');

await route('#/listing/o-web');
await click('#start-proposal');
await wait(100);
expect(await evaluate(`Boolean(document.querySelector('[role="dialog"]')) && document.body.innerText.includes('protege dados reais')`), 'proposta sem sessão abre autenticação demonstrativa');
await evaluate(`document.querySelector('#auth-form').requestSubmit()`);
await wait(80);
expect(await evaluate(`document.body.innerText.includes('246 810') && document.body.innerText.includes('Nenhum e-mail real')`), 'verificação de e-mail é explicitamente simulada');
await click('#verify-email');
await wait(420);
expect(await evaluate(`state.authenticated && state.emailVerified && Boolean(document.querySelector('#proposal-form'))`), 'sessão simulada regressa ao fluxo de proposta');
await setField('[name="message"]', 'Gostaria de criar um novo site para a minha pequena marca e rever toda a estrutura.');
await setField('[name="terms"]', '900 € · 3 semanas');
await setField('[name="availability"]', 'Posso começar dia 12');
await click('[name="confirm"]');
await evaluate(`document.querySelector('#proposal-form').requestSubmit()`);
await wait(420);
expect(await evaluate(`state.proposals.some(p => p.listingId === 'o-web' && p.authorId === 'u-demo' && p.status === 'submitted') && document.body.innerText.includes('está em análise')`), 'proposta enviada e refletida no detalhe');

await route('#/requests');
expect(await evaluate(`document.querySelectorAll('#results .listing-card').length === 4 && document.body.innerText.includes('Área privada simulada')`), 'pedidos acessíveis na sessão autenticada');

await route('#/create?type=offer');
expect(await evaluate(`Boolean(document.querySelector('#create-form')) && document.querySelector('#create-form').dataset.type === 'offer'`), 'formulário de oferta disponível');
await setField('[name="title"]', 'Consultoria de organização digital');
await setField('[name="category"]', 'tech', 'change');
await setField('[name="mode"]', 'remote', 'change');
await setField('[name="summary"]', 'Organização simples para ficheiros, rotinas e ferramentas.');
await setField('#create-form [name="description"]', 'Revejo a organização digital e desenho uma rotina clara para a equipa trabalhar melhor.');
await setField('[name="details"]', 'Sessão inicial, plano de organização e acompanhamento durante uma semana.');
await setField('[name="location"]', 'Todo o país');
await setField('[name="price"]', 'Desde 150 €');
await setField('[name="availability"]', 'Disponível em novembro');
await setField('#create-form [name="description"]', 'Revejo a organização digital e desenho uma rotina clara para a equipa trabalhar melhor.');
expect(await evaluate(`document.querySelector('#create-form').checkValidity()`), 'dados da oferta satisfazem validação local');
await evaluate(`document.querySelector('#create-form').requestSubmit()`);
await waitFor(`state.listings[0].title === 'Consultoria de organização digital'`);
expect(await evaluate(`state.listings[0].type === 'offer' && state.listings[0].status === 'published' && document.body.innerText.includes('Consultoria de organização digital')`), 'criação de oferta atualiza área pessoal');

await route('#/create?type=request');
expect(await evaluate(`document.querySelector('#create-form').dataset.type === 'request'`), 'formulário alterna para pedido');
await setField('[name="title"]', 'Fotografar novo espaço de trabalho');
await setField('[name="category"]', 'photo', 'change');
await setField('[name="mode"]', 'in_person', 'change');
await setField('[name="summary"]', 'Imagens luminosas do espaço e da pequena equipa.');
await setField('#create-form [name="description"]', 'Precisamos de fotografias naturais para apresentar o novo espaço no website e nas redes sociais.');
await setField('[name="details"]', 'Vinte imagens finais, incluindo retratos e detalhes do espaço.');
await setField('[name="location"]', 'Lisboa');
await setField('[name="price"]', 'Até 300 €');
await setField('[name="availability"]', 'Até ao fim de novembro');
await evaluate(`document.querySelector('#create-form').requestSubmit()`);
await waitFor(`state.listings[0].title === 'Fotografar novo espaço de trabalho'`);
expect(await evaluate(`state.listings[0].type === 'request' && state.listings[0].status === 'published'`), 'criação de pedido fica coerente no estado local');

await route('#/proposals/r-site');
expect(await evaluate(`document.querySelectorAll('.proposal-card').length === 3 && document.body.innerText.includes('Miguel Ferreira')`), 'propostas recebidas e perfis comparáveis');
await click('[data-accept="p-1"]');
await wait(180);
expect(await evaluate(`listing('r-site').status === 'closed' && state.proposals.find(p=>p.id==='p-1').status === 'accepted' && state.proposals.filter(p=>p.listingId==='r-site'&&p.status==='declined').length === 2`), 'aceitação encerra publicação e recusa concorrentes');
expect(await evaluate(`document.body.innerText.includes('Proposta de Miguel Ferreira aceite') && !document.querySelector('[data-accept]')`), 'resultado exclusivo recebe feedback visual');

await route('#/dashboard');
await click('[data-tab="reviews"]');
expect(await evaluate(`document.querySelectorAll('.review-item').length === 2 && document.body.innerText.includes('Avaliações públicas')`), 'área pessoal expõe avaliações de cliente e prestador');

await cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: false });
await route('#/');
expect(await evaluate(`document.documentElement.scrollWidth <= window.innerWidth && document.querySelector('.hero h1').getBoundingClientRect().right <= window.innerWidth && document.querySelector('.nav').getBoundingClientRect().bottom > window.innerHeight - 20`), 'início móvel preserva hero e navegação inferior sem corte');
await route('#/explore');
expect(await evaluate(`getComputedStyle(document.querySelector('#filter-toggle')).display !== 'none' && document.documentElement.scrollWidth <= window.innerWidth`), 'exploração adapta-se a ecrã móvel sem overflow');
await click('#filter-toggle');
expect(await evaluate(`document.querySelector('#filters').classList.contains('show')`), 'painel móvel de filtros abre');
await cdp('Emulation.clearDeviceMetricsOverride');

await route('#/create?type=offer');
expect(await evaluate(`Array.from(document.querySelectorAll('#create-form input, #create-form select, #create-form textarea')).every(el => el.labels.length > 0)`), 'campos possuem labels associados');
await evaluate(`document.querySelector('.skip-link').focus()`);
expect(await evaluate(`document.activeElement.classList.contains('skip-link') && getComputedStyle(document.activeElement).outlineStyle !== 'none'`), 'atalho e foco visível funcionam');
expect(exceptions.length === 0, `sem exceções JavaScript (${exceptions.join('; ')})`);
socket.close();

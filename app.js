const demoData = {
  people: {
    demo: { id: 'u-demo', name: 'Inês Martins', initials: 'IM', location: 'Lisboa', headline: 'Cliente e prestadora independente', bio: 'Organizo projetos digitais e presto consultoria de conteúdo a pequenos negócios.', skills: ['Estratégia de conteúdo', 'Organização digital', 'Web design'], memberSince: '2023' },
    miguel: { id: 'u-miguel', name: 'Miguel Ferreira', initials: 'MF', location: 'Porto', headline: 'Designer e programador web', bio: 'Crio experiências digitais rápidas e acessíveis para marcas portuguesas, do conceito ao lançamento.', skills: ['Web design', 'Front-end', 'Acessibilidade'], memberSince: '2021' },
    beatriz: { id: 'u-beatriz', name: 'Beatriz Alves', initials: 'BA', location: 'Lisboa', headline: 'Fotógrafa de pessoas e marcas', bio: 'Fotografia natural para equipas, espaços e histórias de marca.', skills: ['Retrato', 'Eventos', 'Edição'], memberSince: '2022' },
    tiago: { id: 'u-tiago', name: 'Tiago Correia', initials: 'TC', location: 'Cascais', headline: 'Manutenção e reparações domésticas', bio: 'Pequenas reparações com planeamento claro, cuidado e atenção ao espaço.', skills: ['Montagem', 'Reparações', 'Pintura'], memberSince: '2020' },
    helena: { id: 'u-helena', name: 'Helena Sousa', initials: 'HS', location: 'Braga', headline: 'Jardinagem responsável', bio: 'Cuido de jardins urbanos e varandas com soluções adequadas a cada estação.', skills: ['Jardinagem', 'Poda', 'Hortas'], memberSince: '2022' },
    rui: { id: 'u-rui', name: 'Rui Neves', initials: 'RN', location: 'Coimbra', headline: 'Apoio informático sem complicações', bio: 'Ajudo famílias e pequenos negócios a resolver tecnologia com linguagem simples.', skills: ['Computadores', 'Redes', 'Formação'], memberSince: '2019' },
    sara: { id: 'u-sara', name: 'Sara Lopes', initials: 'SL', location: 'Setúbal', headline: 'Limpeza e organização de espaços', bio: 'Serviço cuidado para casas e pequenos escritórios.', skills: ['Limpeza', 'Organização', 'Alojamento local'], memberSince: '2021' },
    daniel: { id: 'u-daniel', name: 'Daniel Rocha', initials: 'DR', location: 'Lisboa', headline: 'Desenvolvimento WordPress', bio: 'Sites simples e sustentáveis para negócios locais.', skills: ['WordPress', 'SEO técnico', 'Manutenção'], memberSince: '2020' }
  },
  categories: [
    { id: 'web', name: 'Digital e web', icon: 'cursor', description: 'Design, sites e conteúdo' },
    { id: 'photo', name: 'Fotografia', icon: 'camera', description: 'Retratos, espaços e eventos' },
    { id: 'home', name: 'Casa e reparações', icon: 'tool', description: 'Montagem e manutenção' },
    { id: 'garden', name: 'Jardim e exterior', icon: 'leaf', description: 'Cuidado e transformação' },
    { id: 'clean', name: 'Limpeza', icon: 'sparkle', description: 'Casas e espaços profissionais' },
    { id: 'tech', name: 'Apoio informático', icon: 'monitor', description: 'Tecnologia descomplicada' },
    { id: 'events', name: 'Eventos', icon: 'calendar', description: 'Produção e apoio local' },
    { id: 'learning', name: 'Aulas e idiomas', icon: 'book', description: 'Aprender com flexibilidade' }
  ],
  listings: [
    { id: 'o-web', type: 'offer', ownerId: 'u-miguel', title: 'Websites distintos para negócios com ambição', category: 'web', mode: 'remote', location: 'Todo o país', distance: null, price: 'Desde 850 €', priceValue: 850, summary: 'Estratégia, design e desenvolvimento de um site rápido, acessível e feito à medida.', description: 'Transformo uma ideia ou presença digital desatualizada num website claro e memorável. O processo inclui descoberta, arquitetura, design responsivo e implementação.', details: 'Inclui até 5 páginas, otimização técnica, formação de entrega e 30 dias de acompanhamento.', availability: 'Próxima vaga em novembro', status: 'published', featured: true },
    { id: 'o-photo', type: 'offer', ownerId: 'u-beatriz', title: 'Sessão fotográfica para a sua marca', category: 'photo', mode: 'in_person', location: 'Lisboa e margem sul', distance: 4.8, price: 'Desde 180 €', priceValue: 180, summary: 'Imagens naturais e consistentes para equipas, espaços e comunicação digital.', description: 'Planeamos uma sessão alinhada com a personalidade da marca. Recebe uma seleção editada e pronta para web e redes sociais.', details: 'Sessão de 90 minutos, 25 fotografias editadas e galeria privada de seleção.', availability: 'Disponível em 6 dias', status: 'published', featured: true },
    { id: 'o-repair', type: 'offer', ownerId: 'u-tiago', title: 'Pequenas reparações, sem deixar pontas soltas', category: 'home', mode: 'in_person', location: 'Cascais e Oeiras', distance: 13.2, price: '32 €/hora', priceValue: 32, summary: 'Montagem, fixação, retoques e pequenos arranjos tratados com cuidado.', description: 'Resolvo listas de pequenas reparações domésticas numa única visita, com confirmação prévia do material necessário.', details: 'Deslocação incluída até 12 km. Materiais específicos orçamentados antes do serviço.', availability: 'Disponível esta semana', status: 'published', featured: true },
    { id: 'o-garden', type: 'offer', ownerId: 'u-helena', title: 'Jardins e varandas cuidados em cada estação', category: 'garden', mode: 'in_person', location: 'Braga', distance: 2.6, price: '25 €/hora', priceValue: 25, summary: 'Manutenção regular, poda leve e orientação para espaços verdes mais saudáveis.', description: 'Visitas pontuais ou regulares para recuperar e manter jardins, pátios e varandas.', details: 'Avaliação inicial incluída em serviços superiores a três horas.', availability: 'Terças e quintas', status: 'published' },
    { id: 'o-tech', type: 'offer', ownerId: 'u-rui', title: 'Apoio informático paciente e claro', category: 'tech', mode: 'hybrid', location: 'Coimbra ou remoto', distance: 1.9, price: '30 €/hora', priceValue: 30, summary: 'Configuração, segurança, cópias de dados e aprendizagem sem linguagem técnica.', description: 'Apoio remoto ou presencial para resolver problemas e ganhar autonomia com os seus equipamentos.', details: 'Diagnóstico inicial de 15 minutos sem custo, antes de confirmar a intervenção.', availability: 'Resposta no próprio dia', status: 'published' },
    { id: 'o-clean', type: 'offer', ownerId: 'u-sara', title: 'Limpeza cuidada para recuperar o seu tempo', category: 'clean', mode: 'in_person', location: 'Setúbal', distance: 5.4, price: 'Desde 45 €', priceValue: 45, summary: 'Limpeza pontual ou regular com atenção aos detalhes e ao seu espaço.', description: 'Serviço para apartamentos, moradias e pequenos espaços profissionais, ajustado às prioridades indicadas.', details: 'Produtos base incluídos. Opção de produtos sem fragrância mediante pedido.', availability: 'Vagas ao sábado', status: 'published' },
    { id: 'o-content', type: 'offer', ownerId: 'u-demo', title: 'Estratégia de conteúdo que soa à sua marca', category: 'web', mode: 'remote', location: 'Todo o país', distance: null, price: 'Desde 240 €', priceValue: 240, summary: 'Mensagem, estrutura e conteúdo digital para pequenos negócios.', description: 'Organizo a mensagem da marca e transformo-a em conteúdo claro para website ou lançamento.', details: 'Sessão estratégica, documento de tom de voz e conteúdo para três páginas.', availability: 'Próxima vaga em 2 semanas', status: 'published' },
    { id: 'r-site', type: 'request', ownerId: 'u-demo', title: 'Atualizar website de atelier de cerâmica', category: 'web', mode: 'hybrid', location: 'Lisboa', distance: 3.1, price: 'Orçamento 700–950 €', priceValue: 950, summary: 'Precisamos de rever estrutura, imagens e experiência móvel de um pequeno website.', description: 'O atelier já tem identidade e conteúdos base. Procuramos alguém que redesenhe cinco páginas e simplifique pedidos de workshop.', details: 'Valorizamos WordPress, acessibilidade e disponibilidade para uma reunião presencial inicial.', availability: 'Conclusão até 28 de novembro', status: 'published' },
    { id: 'r-garden', type: 'request', ownerId: 'u-beatriz', title: 'Recuperar pequeno jardim depois do verão', category: 'garden', mode: 'in_person', location: 'Almada', distance: 7.8, price: 'Até 160 €', priceValue: 160, summary: 'Poda leve, limpeza e sugestões para quatro canteiros.', description: 'Jardim de cerca de 35 m² que precisa de uma manhã de manutenção e orientação para o inverno.', details: 'Ferramentas maiores disponíveis no local. Sem remoção de árvores.', availability: 'Preferência: manhã de sábado', status: 'published' },
    { id: 'r-photo', type: 'request', ownerId: 'u-miguel', title: 'Fotografar equipa num escritório no Porto', category: 'photo', mode: 'in_person', location: 'Porto', distance: 1.3, price: 'Até 320 €', priceValue: 320, summary: 'Retratos descontraídos para website e duas fotografias de grupo.', description: 'Equipa de oito pessoas. Procuramos direção simples e resultado natural.', details: 'Escritório com boa luz. Necessário entregar 20 imagens finais.', availability: 'Entre 12 e 15 de novembro', status: 'published' },
    { id: 'r-support', type: 'request', ownerId: 'u-demo', title: 'Configurar cópias de segurança para associação', category: 'tech', mode: 'in_person', location: 'Lisboa', distance: 2.2, price: 'Até 180 €', priceValue: 180, summary: 'Organizar cópias seguras em três computadores e explicar rotina à equipa.', description: 'Associação pequena, com três computadores Windows. Precisamos de uma solução simples e documentada.', details: 'A proposta deve incluir configuração e sessão de formação de uma hora.', availability: 'Durante novembro', status: 'published' }
  ],
  proposals: [
    { id: 'p-1', listingId: 'r-site', authorId: 'u-miguel', message: 'Posso redesenhar o site e trabalhar a implementação com foco em acessibilidade. Incluo uma sessão presencial de descoberta.', terms: '890 € · 3 semanas', status: 'submitted' },
    { id: 'p-2', listingId: 'r-site', authorId: 'u-daniel', message: 'Tenho experiência com ateliers e WordPress. Proponho manter a gestão simples para a equipa.', terms: '760 € · 4 semanas', status: 'submitted' },
    { id: 'p-3', listingId: 'r-site', authorId: 'u-rui', message: 'Posso tratar a atualização técnica e formar a equipa para manutenção futura.', terms: '820 € · 3 semanas', status: 'submitted' },
    { id: 'p-4', listingId: 'o-content', authorId: 'u-beatriz', message: 'Preciso de reorganizar conteúdo de um portefólio e gostaria de começar pela sessão estratégica.', terms: '240 € conforme oferta', status: 'submitted' }
  ],
  reviews: [
    { id: 'rv-1', subjectId: 'u-miguel', author: 'Leonor F.', role: 'cliente', rating: 5, text: 'Processo muito claro e resultado acima do esperado. O site ficou rápido e muito mais nosso.' },
    { id: 'rv-2', subjectId: 'u-miguel', author: 'João M.', role: 'cliente', rating: 5, text: 'Excelente comunicação, atenção ao detalhe e entrega dentro do prazo.' },
    { id: 'rv-3', subjectId: 'u-beatriz', author: 'Marta C.', role: 'cliente', rating: 5, text: 'Criou um ambiente descontraído e as fotografias ficaram naturais.' },
    { id: 'rv-4', subjectId: 'u-tiago', author: 'Ana R.', role: 'cliente', rating: 4, text: 'Pontual, cuidadoso e explicou todas as opções antes de avançar.' },
    { id: 'rv-5', subjectId: 'u-demo', author: 'Tomás V.', role: 'cliente', rating: 5, text: 'A Inês trouxe clareza ao projeto e deu-nos uma estrutura que conseguimos usar.' },
    { id: 'rv-6', subjectId: 'u-demo', author: 'Miguel F.', role: 'prestador', rating: 5, text: 'Pedido bem explicado, decisões rápidas e colaboração muito tranquila.' }
  ]
};

const state = {
  authenticated: false,
  emailVerified: false,
  authStep: 'email',
  pendingRoute: '',
  toast: '',
  filtersOpen: false,
  dashboardTab: 'publications',
  loadingResults: false,
  draft: null,
  listings: demoData.listings.map((item) => ({ ...item })),
  proposals: demoData.proposals.map((item) => ({ ...item })),
  reviews: demoData.reviews.map((item) => ({ ...item }))
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const route = () => location.hash.slice(1) || '/';
const routePath = () => route().split('?')[0];
const params = () => new URLSearchParams(route().split('?')[1] || '');
const currentUser = () => demoData.people.demo;
const person = (id) => Object.values(demoData.people).find((item) => item.id === id);
const listing = (id) => state.listings.find((item) => item.id === id);
const category = (id) => demoData.categories.find((item) => item.id === id);
const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
const go = (path) => { location.hash = path; };

function icon(name) {
  const paths = {
    logo: '<path d="M6 17.5c4-8 7-7 12-13-1 8-3 13-10 15"/><path d="M6 20c1-5 4-8 9-11"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    cursor: '<path d="m5 3 14 8-6 2-2 6Z"/><path d="m13 13 4 4"/>',
    camera: '<path d="M4 7h3l2-3h6l2 3h3v12H4Z"/><circle cx="12" cy="13" r="3.5"/>',
    tool: '<path d="M14.7 6.3a4 4 0 0 0-5-5l2.1 2.1-2.4 2.4-2.1-2.1a4 4 0 0 0 5 5L20 16.4 16.4 20l-7.7-7.7"/>',
    leaf: '<path d="M20 4c-8 0-14 4-14 10 0 3 2 5 5 5 6 0 9-7 9-15Z"/><path d="M4 21c2-6 6-10 12-13"/>',
    sparkle: '<path d="m12 3 1.3 4.2L17 9l-3.7 1.8L12 15l-1.3-4.2L7 9l3.7-1.8Z"/><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7Z"/>',
    monitor: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    book: '<path d="M4 5a3 3 0 0 1 3-3h5v18H7a3 3 0 0 0-3 2Z"/><path d="M20 5a3 3 0 0 0-3-3h-5v18h5a3 3 0 0 1 3 2Z"/>',
    location: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    inbox: '<path d="M4 4h16l2 12H2Z"/><path d="M2 16h6a4 4 0 0 0 8 0h6"/>',
    euro: '<path d="M18 7a7 7 0 1 0 0 10M5 10h10M5 14h9"/>'
  };
  return `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.sparkle}</svg>`;
}

function statusLabel(status) {
  return ({ draft: 'Rascunho', published: 'Publicada', paused: 'Em pausa', closed: 'Encerrada', cancelled: 'Cancelada', submitted: 'Em análise', accepted: 'Aceite', declined: 'Não selecionada' })[status] || status;
}

function modeLabel(mode) {
  return ({ remote: 'Remoto', in_person: 'Presencial', hybrid: 'Híbrido' })[mode] || mode;
}

function notify(message) {
  state.toast = message;
  render();
  window.clearTimeout(notify.timer);
  notify.timer = window.setTimeout(() => {
    state.toast = '';
    $('.toast')?.remove();
  }, 4200);
}

function requireAuth(destination) {
  if (state.authenticated) return true;
  if (state.pendingRoute === destination) return false;
  state.pendingRoute = destination || routePath();
  state.authStep = 'email';
  render();
  window.setTimeout(() => $('#auth-email')?.focus(), 30);
  return false;
}

function closeAuth() {
  state.pendingRoute = '';
  state.authStep = 'email';
  render();
}

function header() {
  const path = routePath();
  return `<div class="simulation-bar"><strong>Demonstração visual</strong> · dados, autenticação e operações são simulados localmente</div>
    <header class="site-header">
      <div class="shell header-inner">
        <a class="brand" href="#/" aria-label="Lume, início"><span class="brand-mark">${icon('logo')}</span><span>Lume</span></a>
        <nav class="nav" aria-label="Navegação principal">
          <a class="${path === '/' ? 'active' : ''}" href="#/">Início</a>
          <a class="${path === '/explore' ? 'active' : ''}" href="#/explore">Ofertas</a>
          <a class="${path === '/requests' ? 'active' : ''}" href="#/requests">Pedidos</a>
          <a class="${path === '/dashboard' ? 'active' : ''}" href="#/dashboard">Área pessoal</a>
        </nav>
        <div class="header-actions">
          <a class="button ghost small" href="#/create?type=offer">Publicar</a>
          ${state.authenticated
            ? `<button class="avatar-button" id="account-button" type="button" aria-label="Abrir área de ${currentUser().name}"><span class="avatar small">${currentUser().initials}</span><span>Inês</span></button>`
            : '<button class="button small" id="login-button" type="button">Entrar</button>'}
        </div>
      </div>
    </header>`;
}

function footer() {
  return `<footer class="footer"><div class="shell footer-inner"><div><strong>Lume</strong> · Protótipo de marketplace para Portugal</div><div>A distância indicada é aproximada, em linha reta. <a href="#/">Sem transações reais.</a></div></div></footer>`;
}

function shell(content) {
  return `${header()}<main id="main" class="shell main">${content}</main>${footer()}${authModal()}${state.toast ? `<div class="toast" role="status">${icon('check')}<span>${escapeHtml(state.toast)}</span></div>` : ''}`;
}

function authModal() {
  if (!state.pendingRoute || state.authenticated) return '';
  if (state.authStep === 'verify') {
    return `<div class="modal-backdrop" id="auth-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <div class="modal-head"><div><span class="eyebrow">Sessão de demonstração</span><h2 id="auth-title">Verifique o e-mail</h2></div><button class="icon-button" id="close-auth" type="button" aria-label="Fechar">${icon('close')}</button></div>
      <p>Simulámos o envio de um código para <strong>ines.demo@exemplo.pt</strong>. Nenhum e-mail real foi enviado.</p>
      <div class="code-box"><span class="field-help">Código demonstrativo</span><br><strong>246 810</strong></div>
      <button class="button" id="verify-email" type="button">Verificar e continuar ${icon('arrow')}</button>
    </section></div>`;
  }
  return `<div class="modal-backdrop" id="auth-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
    <div class="modal-head"><div><span class="eyebrow">Sessão de demonstração</span><h2 id="auth-title">Entre para continuar</h2></div><button class="icon-button" id="close-auth" type="button" aria-label="Fechar">${icon('close')}</button></div>
    <p>A autenticação serve apenas para demonstrar áreas privadas. Não protege dados reais.</p>
    <form id="auth-form"><label>E-mail<input id="auth-email" name="email" type="email" value="ines.demo@exemplo.pt" required autocomplete="email"></label><div class="form-actions"><button class="button" type="submit">Continuar ${icon('arrow')}</button></div></form>
  </section></div>`;
}

function averageRating(personId) {
  const reviews = state.reviews.filter((item) => item.subjectId === personId);
  return reviews.length ? (reviews.reduce((total, item) => total + item.rating, 0) / reviews.length).toFixed(1) : 'Novo';
}

function listingCard(item) {
  const owner = person(item.ownerId);
  const cat = category(item.category);
  return `<article class="listing-card">
    <div class="card-art art-${escapeHtml(item.category)}"><span class="art-badge">${item.type === 'offer' ? 'Oferta' : 'Pedido'}</span></div>
    <div class="card-body">
      <div class="provider-row"><span class="avatar small">${owner.initials}</span><span>${escapeHtml(owner.name)} · <span class="rating">${averageRating(owner.id)} / 5</span></span></div>
      <h3><a href="#/listing/${item.id}">${escapeHtml(item.title)}</a></h3>
      <p class="card-copy">${escapeHtml(item.summary)}</p>
      <div class="tag-row"><span class="tag ${item.mode === 'remote' ? 'remote' : ''}">${modeLabel(item.mode)}</span><span class="status ${item.status}">${statusLabel(item.status)}</span></div>
      <div class="card-meta"><div><span>${icon('location')} Localização</span><strong>${escapeHtml(item.location)}${item.distance ? ` · ${item.distance.toFixed(1).replace('.', ',')} km` : ''}</strong></div><div><span>${icon('euro')} Valor</span><strong>${escapeHtml(item.price)}</strong></div></div>
    </div>
  </article>`;
}

function home() {
  const featured = state.listings.filter((item) => item.type === 'offer' && item.status === 'published' && item.featured);
  return `<section class="hero">
    <div class="hero-copy"><span class="eyebrow">Serviços com mais clareza</span><h1>Talento certo.<br>À distância de uma conversa.</h1><p>Encontre profissionais de confiança ou transforme o que sabe fazer numa oportunidade, em todo Portugal.</p>
      <form class="searchbar" id="home-search"><input name="q" aria-label="Pesquisar serviços" placeholder="De que serviço precisa?"><button class="button" type="submit">${icon('search')} Pesquisar</button></form>
      <div class="hero-links"><a class="button secondary" href="#/explore">Explorar ofertas</a><a class="text-link" href="#/create?type=request">Publicar um pedido ${icon('arrow')}</a></div>
    </div>
    <div class="hero-visual" aria-hidden="true"><div class="orb one"></div><div class="orb two"></div><div class="floating-card top"><strong>Website para atelier</strong><span>Proposta recebida agora</span><div class="mini-row"><span class="mini-check">${icon('check')}</span><span>Perfil com 4,9 / 5</span></div></div><div class="floating-card bottom"><strong>Fotografia de marca</strong><span>Lisboa · a 4,8 km</span><div class="mini-row"><span class="avatar small">BA</span><span>Beatriz Alves</span></div></div></div>
  </section>
  <section class="trust-strip" aria-label="Princípios do protótipo"><div class="trust-item"><strong>Escolha informada</strong><span>Perfis, experiência e avaliações em contexto.</span></div><div class="trust-item"><strong>Dois sentidos</strong><span>Ofereça talento ou publique uma necessidade.</span></div><div class="trust-item"><strong>Portugal primeiro</strong><span>Localidades, euros e linguagem PT-PT.</span></div></section>
  <section class="section"><div class="section-head"><div><span class="eyebrow">Descobrir</span><h2>O que precisa, num só lugar</h2></div><a class="text-link" href="#/explore">Ver todas as categorias ${icon('arrow')}</a></div><div class="category-grid">${demoData.categories.map((item) => `<a class="category-card" href="#/explore?category=${item.id}"><span class="category-icon">${icon(item.icon)}</span><strong>${item.name}<span>${item.description}</span></strong></a>`).join('')}</div></section>
  <section class="section"><div class="section-head"><div><span class="eyebrow">Seleção Lume</span><h2>Profissionais em destaque</h2><p>Serviços demonstrativos com informação suficiente para decidir com confiança.</p></div><a class="text-link" href="#/explore">Explorar todas ${icon('arrow')}</a></div><div class="cards">${featured.map(listingCard).join('')}</div></section>`;
}

function filterPanel(type) {
  const query = params();
  return `<aside class="filters ${state.filtersOpen ? 'show' : ''}" id="filters" aria-label="Filtros">
    <div class="filters-head"><strong>Filtrar</strong><button class="icon-button mobile-filter-button" id="close-filters" type="button" aria-label="Fechar filtros">${icon('close')}</button></div>
    <div class="filter-fields">
      <label>Pesquisa<input id="q" value="${escapeHtml(query.get('q') || '')}" placeholder="Palavra-chave"></label>
      <label>Categoria<select id="category"><option value="">Todas as categorias</option>${demoData.categories.map((item) => `<option value="${item.id}" ${query.get('category') === item.id ? 'selected' : ''}>${item.name}</option>`).join('')}</select></label>
      <label>Modalidade<select id="mode"><option value="">Todas</option><option value="remote">Remoto</option><option value="in_person">Presencial</option><option value="hybrid">Híbrido</option></select></label>
      <label>Localidade<input id="location" placeholder="Ex.: Lisboa"></label>
      <label>Valor máximo<select id="price"><option value="">Sem limite</option><option value="50">Até 50 €</option><option value="200">Até 200 €</option><option value="500">Até 500 €</option><option value="1000">Até 1 000 €</option></select></label>
      <button class="button ghost" id="clear-filters" type="button">Limpar filtros</button>
    </div>
  </aside>`;
}

function explore(type = 'offer') {
  const isRequest = type === 'request';
  return `<div class="section-head"><div><span class="eyebrow">${isRequest ? 'Oportunidades para prestar' : 'Profissionais disponíveis'}</span><h1>${isRequest ? 'Pedidos de serviço' : 'Explorar ofertas'}</h1><p>${isRequest ? 'Pedidos visíveis apenas nesta sessão autenticada de demonstração.' : 'Ofertas publicadas, disponíveis para consulta sem autenticação.'}</p></div><button class="button ghost mobile-filter-button" id="filter-toggle" type="button">${icon('search')} Filtros</button></div>
    ${isRequest ? '<div class="info-note">Área privada simulada. Autenticação real e controlo de acesso não estão implementados.</div><br>' : ''}
    <div class="explore-shell">${filterPanel(type)}<section aria-live="polite" aria-busy="${state.loadingResults}"><div class="results-toolbar"><strong id="count">A procurar resultados…</strong><label>Ordenar<select id="sort"><option value="recommended">Recomendados</option><option value="distance">Mais próximos</option><option value="price">Menor valor</option></select></label></div><div class="active-filters" id="active-filters"></div><div class="result-list" id="results"><div class="skeleton"></div><div class="skeleton"></div></div></section></div>`;
}

function updateResults(type) {
  const root = $('#results');
  if (!root) return;
  const q = ($('#q')?.value || '').trim().toLowerCase();
  const cat = $('#category')?.value || '';
  const mode = $('#mode')?.value || '';
  const locationValue = ($('#location')?.value || '').trim().toLowerCase();
  const maxPrice = Number($('#price')?.value || Infinity);
  let results = state.listings.filter((item) => item.type === type && item.status === 'published' && (!q || `${item.title} ${item.summary} ${item.description}`.toLowerCase().includes(q)) && (!cat || item.category === cat) && (!mode || item.mode === mode) && (!locationValue || item.location.toLowerCase().includes(locationValue)) && item.priceValue <= maxPrice);
  const sort = $('#sort')?.value;
  if (sort === 'distance') results.sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));
  if (sort === 'price') results.sort((a, b) => a.priceValue - b.priceValue);
  $('#count').textContent = `${results.length} ${type === 'offer' ? 'oferta' : 'pedido'}${results.length === 1 ? '' : 's'}`;
  const active = [q && `Pesquisa: ${q}`, cat && category(cat)?.name, mode && modeLabel(mode), locationValue && `Local: ${locationValue}`, Number.isFinite(maxPrice) && `Até ${maxPrice} €`].filter(Boolean);
  $('#active-filters').innerHTML = active.map((label) => `<button class="filter-chip" type="button" id="clear-active">${escapeHtml(label)} ×</button>`).join('');
  root.innerHTML = results.length ? results.map(listingCard).join('') : emptyState('Sem resultados', 'Experimente remover um filtro ou pesquisar outro serviço.', type === 'offer' ? '#/explore' : '#/requests', 'Limpar pesquisa');
}

function detail(id) {
  const item = listing(id);
  if (!item) return emptyState('Publicação não encontrada', 'Pode ter sido removida desta demonstração.', '#/explore', 'Voltar às ofertas');
  if (item.type === 'request' && !state.authenticated) {
    window.setTimeout(() => requireAuth(`/listing/${id}`), 0);
    return emptyState('Sessão necessária', 'Os pedidos só podem ser consultados numa sessão autenticada de demonstração.', '#/', 'Voltar ao início');
  }
  const owner = person(item.ownerId);
  const isOwner = state.authenticated && item.ownerId === currentUser().id;
  const hasProposal = state.proposals.some((proposal) => proposal.listingId === id && proposal.authorId === currentUser().id);
  const proposalLabel = item.type === 'offer' ? 'Pedir este serviço' : 'Apresentar proposta';
  return `<div class="detail-layout"><article class="detail-main">
      <div class="detail-hero art-${item.category}"><div class="tag-row"><span class="tag">${item.type === 'offer' ? 'Oferta de serviço' : 'Pedido de serviço'}</span><span class="tag ${item.mode === 'remote' ? 'remote' : ''}">${modeLabel(item.mode)}</span><span class="status ${item.status}">${statusLabel(item.status)}</span></div><h1>${escapeHtml(item.title)}</h1></div>
      <div class="detail-content"><span class="eyebrow">Sobre ${item.type === 'offer' ? 'o serviço' : 'o pedido'}</span><p>${escapeHtml(item.description)}</p><h2>O que está incluído</h2><p>${escapeHtml(item.details)}</p><h2>Quem publica</h2><div class="provider-row"><span class="avatar">${owner.initials}</span><div><strong>${escapeHtml(owner.name)}</strong><br><span>${escapeHtml(owner.headline)} · ${averageRating(owner.id)} / 5</span></div></div><p><a class="text-link" href="#/profile/${owner.id}">Ver perfil e avaliações ${icon('arrow')}</a></p><div class="demo-note">Perfil, avaliações, valores e disponibilidade são dados fictícios. Não existe verificação profissional ou transação real.</div></div>
    </article><aside class="detail-side"><span class="field-help">${item.type === 'offer' ? 'Valor indicativo' : 'Orçamento indicativo'}</span><strong class="price">${escapeHtml(item.price)}</strong><div class="facts"><div class="fact">${icon('location')}<div><span>Área aproximada</span><strong>${escapeHtml(item.location)}${item.distance ? ` · ${item.distance.toFixed(1).replace('.', ',')} km em linha reta` : ''}</strong></div></div><div class="fact">${icon('clock')}<div><span>Disponibilidade</span><strong>${escapeHtml(item.availability)}</strong></div></div><div class="fact">${icon('user')}<div><span>Publicado por</span><strong>${escapeHtml(owner.name)}</strong></div></div></div><div class="side-actions">
      ${isOwner ? `<a class="button" href="#/proposals/${item.id}">${icon('inbox')} Ver propostas recebidas</a>` : item.status === 'published' && !hasProposal ? `<button class="button" id="start-proposal" data-id="${item.id}" type="button">${proposalLabel} ${icon('arrow')}</button>` : hasProposal ? '<div class="success-note">A sua proposta foi enviada e está em análise.</div>' : '<div class="demo-note">Esta publicação já não recebe propostas.</div>'}
      <a class="button ghost" href="${item.type === 'offer' ? '#/explore' : '#/requests'}">Voltar aos resultados</a></div></aside></div>`;
}

function profile(id) {
  const profilePerson = person(id);
  if (!profilePerson) return emptyState('Perfil não encontrado', '', '#/explore', 'Explorar serviços');
  const reviews = state.reviews.filter((item) => item.subjectId === id);
  const offers = state.listings.filter((item) => item.ownerId === id && item.type === 'offer' && item.status === 'published');
  return `<section class="profile-hero"><span class="avatar large">${profilePerson.initials}</span><div><span class="eyebrow">Perfil demonstrativo</span><h1>${escapeHtml(profilePerson.name)}</h1><p>${escapeHtml(profilePerson.headline)}</p><p>${icon('location')} ${escapeHtml(profilePerson.location)} · Membro desde ${profilePerson.memberSince}</p></div>${id !== currentUser().id ? `<a class="button" href="${offers[0] ? `#/listing/${offers[0].id}` : '#/explore'}">Ver serviço</a>` : ''}</section>
    <div class="metric-row"><div class="metric"><strong>${averageRating(id)} / 5</strong><span>${reviews.length} avaliações públicas</span></div><div class="metric"><strong>${offers.length || '—'}</strong><span>ofertas ativas</span></div><div class="metric"><strong>~ 2 h</strong><span>tempo de resposta demonstrativo</span></div></div>
    <div class="profile-grid"><section class="panel"><h2>Experiência</h2><p>${escapeHtml(profilePerson.bio)}</p><div class="tag-row">${(profilePerson.skills || []).map((skill) => `<span class="tag">${escapeHtml(skill)}</span>`).join('')}</div><div class="demo-note" style="margin-top:20px">Informação declarada e não verificada pela plataforma.</div></section><section class="panel"><h2>Avaliações públicas</h2>${reviews.length ? reviews.map((review) => `<article class="review-item"><div class="stars" aria-label="${review.rating} em 5">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div><p>“${escapeHtml(review.text)}”</p><small>${escapeHtml(review.author)} · ${escapeHtml(review.role)} demonstrativo</small></article>`).join('') : '<p class="field-help">Ainda sem avaliações.</p>'}</section></div>
    ${offers.length ? `<section class="section"><div class="section-head"><div><span class="eyebrow">Serviços</span><h2>Ofertas publicadas</h2></div></div><div class="cards">${offers.map(listingCard).join('')}</div></section>` : ''}`;
}

function proposalForm(id) {
  const item = listing(id);
  if (!item || item.status !== 'published') return emptyState('Proposta indisponível', 'A publicação já não está aberta a novas propostas.', '#/explore', 'Explorar');
  if (!state.authenticated) {
    window.setTimeout(() => requireAuth(`/proposal/${id}`), 0);
    return '';
  }
  const owner = person(item.ownerId);
  return `<div class="form-shell"><section class="form-card"><span class="eyebrow">Proposta demonstrativa</span><h1>Começar uma conversa com ${escapeHtml(owner.name.split(' ')[0])}</h1><p>Explique como pode ajudar, confirme condições e reveja antes de enviar.</p><div class="info-note"><strong>${escapeHtml(item.title)}</strong><br>${escapeHtml(item.price)}</div><form id="proposal-form" data-id="${item.id}"><div class="form-grid" style="margin-top:20px"><label class="full">Mensagem<textarea name="message" required minlength="20" placeholder="Apresente o contexto, abordagem e disponibilidade."></textarea><span class="field-help">Mínimo de 20 caracteres.</span></label><label>Condições propostas<input name="terms" required placeholder="Ex.: 780 € · 3 semanas"></label><label>Disponibilidade<input name="availability" required placeholder="Ex.: Posso começar dia 12"></label></div><label style="margin-top:18px"><span><input name="confirm" type="checkbox" required style="width:auto;min-height:auto"> Confirmo que esta operação é apenas demonstrativa.</span></label><div class="form-actions"><button class="button" type="submit">Enviar proposta ${icon('arrow')}</button><a class="button ghost" href="#/listing/${item.id}">Cancelar</a></div></form></section></div>`;
}

function createPublication() {
  if (!state.authenticated) {
    window.setTimeout(() => requireAuth(route()), 0);
    return '';
  }
  const type = params().get('type') === 'request' ? 'request' : 'offer';
  const noun = type === 'offer' ? 'oferta' : 'pedido';
  return `<div class="form-shell"><section class="form-card"><span class="eyebrow">Nova publicação</span><h1>Crie ${type === 'offer' ? 'uma oferta' : 'um pedido'} memorável</h1><p>Informação clara ajuda a receber propostas mais adequadas. Tudo será guardado apenas nesta sessão.</p><div class="segmented"><a class="${type === 'offer' ? 'active' : ''}" href="#/create?type=offer">Oferecer um serviço</a><a class="${type === 'request' ? 'active' : ''}" href="#/create?type=request">Pedir um serviço</a></div><form id="create-form" data-type="${type}"><div class="form-grid">
    <label class="full">Título da ${noun}<input name="title" required maxlength="80" placeholder="Ex.: Fotografia natural para marcas"></label>
    <label>Categoria<select name="category" required><option value="">Escolha uma categoria</option>${demoData.categories.map((item) => `<option value="${item.id}">${item.name}</option>`).join('')}</select></label>
    <label>Modalidade<select name="mode" required><option value="">Escolha</option><option value="remote">Remoto</option><option value="in_person">Presencial</option><option value="hybrid">Híbrido</option></select></label>
    <label class="full">Resumo<input name="summary" required maxlength="150" placeholder="Uma frase clara sobre o resultado esperado."></label>
    <label class="full">Descrição<textarea name="description" required minlength="30" placeholder="Descreva escopo, processo e resultado."></textarea></label>
    <label class="full">Detalhes incluídos<textarea name="details" required placeholder="Entregáveis, requisitos ou limites relevantes."></textarea></label>
    <label>Área aproximada<input name="location" required placeholder="Ex.: Lisboa ou Todo o país"><span class="field-help">Não introduza uma morada completa.</span></label>
    <label>${type === 'offer' ? 'Preço indicativo' : 'Orçamento indicativo'}<input name="price" required placeholder="Ex.: Desde 120 €"></label>
    <label class="full">Disponibilidade ou prazo<input name="availability" required placeholder="Ex.: Próxima vaga em duas semanas"></label>
  </div><div class="demo-note" style="margin-top:20px">Estado inicial: <strong>published</strong>. Nesta demonstração, pode gerir depois estados draft, published, paused, closed e cancelled.</div><div class="form-actions"><button class="button" type="submit">Publicar ${noun} ${icon('arrow')}</button><a class="button ghost" href="#/dashboard">Cancelar</a></div></form></section></div>`;
}

function proposalsPage(id) {
  if (!state.authenticated) {
    window.setTimeout(() => requireAuth(`/proposals/${id}`), 0);
    return '';
  }
  const item = listing(id);
  if (!item || item.ownerId !== currentUser().id) return emptyState('Propostas privadas', 'Só o autor desta publicação pode consultar as propostas.', '#/dashboard', 'Área pessoal');
  const proposals = state.proposals.filter((proposal) => proposal.listingId === id);
  const accepted = proposals.find((proposal) => proposal.status === 'accepted');
  return `<div class="section-head"><div><span class="eyebrow">Propostas recebidas</span><h1>${escapeHtml(item.title)}</h1><p>${proposals.length} proposta${proposals.length === 1 ? '' : 's'} nesta demonstração.</p></div><span class="status ${item.status}">${statusLabel(item.status)}</span></div>
    ${accepted ? `<div class="success-note" style="margin-bottom:18px">${icon('check')} Proposta de <strong>${escapeHtml(person(accepted.authorId).name)}</strong> aceite. Publicação encerrada; propostas concorrentes deixaram de estar elegíveis.</div>` : ''}
    <section class="panel">${proposals.length ? proposals.map((proposal) => { const author = person(proposal.authorId); return `<article class="proposal-card"><span class="avatar">${author.initials}</span><div><h3>${escapeHtml(author.name)}</h3><span class="field-help">${escapeHtml(author.headline)} · ${averageRating(author.id)} / 5</span><p>${escapeHtml(proposal.message)}</p><span class="proposal-terms">${escapeHtml(proposal.terms)}</span><p><a class="text-link" href="#/profile/${author.id}">Consultar perfil e avaliações</a></p></div><div>${proposal.status === 'submitted' && item.status === 'published' ? `<button class="button small" data-accept="${proposal.id}" type="button">Aceitar proposta</button>` : `<span class="status ${proposal.status}">${statusLabel(proposal.status)}</span>`}</div></article>`; }).join('') : emptyState('Ainda sem propostas', 'Quando alguém responder, a proposta aparecerá aqui.', '#/dashboard', 'Voltar')}</section>`;
}

function dashboard() {
  if (!state.authenticated) {
    window.setTimeout(() => requireAuth('/dashboard'), 0);
    return '';
  }
  const mine = state.listings.filter((item) => item.ownerId === currentUser().id);
  const received = state.proposals.filter((proposal) => mine.some((item) => item.id === proposal.listingId));
  const authored = state.proposals.filter((proposal) => proposal.authorId === currentUser().id);
  const reviews = state.reviews.filter((review) => review.subjectId === currentUser().id);
  let content = '';
  if (state.dashboardTab === 'publications') {
    content = `<section class="panel">${mine.map((item) => `<article class="publication-row"><div><div class="tag-row"><span class="tag">${item.type === 'offer' ? 'Oferta' : 'Pedido'}</span><span class="status ${item.status}">${statusLabel(item.status)}</span></div><h3><a href="#/listing/${item.id}">${escapeHtml(item.title)}</a></h3><p>${escapeHtml(item.location)} · ${escapeHtml(item.price)}</p></div><a class="button ghost small" href="#/proposals/${item.id}">${state.proposals.filter((proposal) => proposal.listingId === item.id).length} propostas</a></article>`).join('')}</section>`;
  } else if (state.dashboardTab === 'proposals') {
    content = `<section class="panel"><h2>Recebidas</h2>${received.map((proposal) => { const item = listing(proposal.listingId); return `<article class="publication-row"><div><span class="status ${proposal.status}">${statusLabel(proposal.status)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(person(proposal.authorId).name)} · ${escapeHtml(proposal.terms)}</p></div><a class="button ghost small" href="#/proposals/${item.id}">Consultar</a></article>`; }).join('') || '<p class="field-help">Sem propostas recebidas.</p>'}<h2 style="margin-top:30px">Enviadas</h2>${authored.map((proposal) => { const item = listing(proposal.listingId); return `<article class="publication-row"><div><span class="status ${proposal.status}">${statusLabel(proposal.status)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(proposal.terms)}</p></div><a class="button ghost small" href="#/listing/${item.id}">Ver publicação</a></article>`; }).join('') || '<p class="field-help">Ainda não enviou propostas.</p>'}</section>`;
  } else {
    content = `<section class="panel"><h2>Avaliações públicas</h2>${reviews.map((review) => `<article class="review-item"><div class="stars" aria-label="${review.rating} em 5">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div><p>“${escapeHtml(review.text)}”</p><small>${escapeHtml(review.author)} · ${escapeHtml(review.role)}</small></article>`).join('')}</section>`;
  }
  return `<section class="dashboard-hero"><div><span class="eyebrow" style="color:#bfe8d6">Área pessoal demonstrativa</span><h1>Olá, Inês.</h1><p>Atue como cliente e prestadora na mesma sessão.</p></div><a class="button" href="#/create?type=offer">Criar publicação</a></section><div class="tabs" role="tablist" aria-label="Secções da área pessoal"><button class="${state.dashboardTab === 'publications' ? 'active' : ''}" data-tab="publications" role="tab">Publicações</button><button class="${state.dashboardTab === 'proposals' ? 'active' : ''}" data-tab="proposals" role="tab">Propostas</button><button class="${state.dashboardTab === 'reviews' ? 'active' : ''}" data-tab="reviews" role="tab">Avaliações</button></div>${content}`;
}

function emptyState(title, text, href, label) {
  return `<section class="empty"><div><span class="empty-icon">${icon('search')}</span><h2>${escapeHtml(title)}</h2>${text ? `<p>${escapeHtml(text)}</p>` : ''}${href ? `<a class="button" href="${href}">${escapeHtml(label)}</a>` : ''}</div></section>`;
}

function render() {
  const path = routePath();
  let content;
  if (path === '/') content = home();
  else if (path === '/explore') content = explore('offer');
  else if (path === '/requests') content = state.authenticated ? explore('request') : (requireAuth('/requests'), emptyState('Pedidos protegidos', 'Inicie uma sessão demonstrativa para consultar pedidos publicados.', '#/', 'Voltar ao início'));
  else if (path.startsWith('/listing/')) content = detail(path.split('/')[2]);
  else if (path.startsWith('/profile/')) content = profile(path.split('/')[2]);
  else if (path.startsWith('/proposal/')) content = proposalForm(path.split('/')[2]);
  else if (path === '/create') content = createPublication();
  else if (path.startsWith('/proposals/')) content = proposalsPage(path.split('/')[2]);
  else if (path === '/dashboard') content = dashboard();
  else content = emptyState('Página não encontrada', 'O endereço não existe nesta demonstração.', '#/', 'Voltar ao início');
  $('#app').innerHTML = shell(content || '');
  bind();
  if ((path === '/explore' || path === '/requests') && (!state.pendingRoute || state.authenticated)) {
    state.loadingResults = false;
    updateResults(path === '/requests' ? 'request' : 'offer');
  }
}

function bind() {
  $('#login-button')?.addEventListener('click', () => { state.pendingRoute = routePath(); state.authStep = 'email'; render(); });
  $('#account-button')?.addEventListener('click', () => go('/dashboard'));
  $('#close-auth')?.addEventListener('click', closeAuth);
  $('#auth-form')?.addEventListener('submit', (event) => { event.preventDefault(); state.authStep = 'verify'; render(); window.setTimeout(() => $('#verify-email')?.focus(), 30); });
  $('#verify-email')?.addEventListener('click', () => { const destination = state.pendingRoute; state.authenticated = true; state.emailVerified = true; state.pendingRoute = ''; state.authStep = 'email'; notify('E-mail verificado. Sessão demonstrativa iniciada.'); if (destination && destination !== routePath()) go(destination); });
  document.addEventListener('keydown', handleEscape, { once: true });
  $('#home-search')?.addEventListener('submit', (event) => { event.preventDefault(); go(`/explore?q=${encodeURIComponent(new FormData(event.currentTarget).get('q') || '')}`); });
  $('#filter-toggle')?.addEventListener('click', () => { state.filtersOpen = true; render(); });
  $('#close-filters')?.addEventListener('click', () => { state.filtersOpen = false; render(); });
  ['q', 'category', 'mode', 'location', 'price', 'sort'].forEach((id) => { const element = $(`#${id}`); if (element) { element.addEventListener('input', () => updateResults(routePath() === '/requests' ? 'request' : 'offer')); element.addEventListener('change', () => updateResults(routePath() === '/requests' ? 'request' : 'offer')); } });
  $('#clear-filters')?.addEventListener('click', () => { go(routePath()); if (route() === routePath()) render(); });
  $('#active-filters')?.addEventListener('click', () => { go(routePath()); if (route() === routePath()) render(); });
  $('#start-proposal')?.addEventListener('click', (event) => { const destination = `/proposal/${event.currentTarget.dataset.id}`; if (requireAuth(destination)) go(destination); });
  $('#proposal-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const id = event.currentTarget.dataset.id;
    state.proposals.push({ id: `p-${Date.now()}`, listingId: id, authorId: currentUser().id, message: form.get('message'), terms: `${form.get('terms')} · ${form.get('availability')}`, status: 'submitted' });
    go(`/listing/${id}`);
    notify('Proposta enviada. Pode acompanhá-la na área pessoal.');
  });
  $('#create-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = Object.fromEntries(new FormData(event.currentTarget));
    const type = event.currentTarget.dataset.type;
    const id = `${type === 'offer' ? 'o' : 'r'}-${Date.now()}`;
    const numericPrice = Number(String(form.price).replace(/[^0-9]/g, '')) || 0;
    state.listings.unshift({ ...form, id, type, ownerId: currentUser().id, priceValue: numericPrice, distance: form.mode === 'remote' ? null : 0, status: 'published' });
    go('/dashboard');
    notify(`${type === 'offer' ? 'Oferta' : 'Pedido'} publicado em modo demonstrativo.`);
  });
  $$('[data-accept]').forEach((button) => button.addEventListener('click', () => {
    const accepted = state.proposals.find((proposal) => proposal.id === button.dataset.accept);
    const source = listing(accepted.listingId);
    state.proposals.forEach((proposal) => { if (proposal.listingId === source.id && proposal.status === 'submitted') proposal.status = proposal.id === accepted.id ? 'accepted' : 'declined'; });
    source.status = 'closed';
    notify(`Proposta de ${person(accepted.authorId).name} aceite. Publicação encerrada.`);
  }));
  $$('[data-tab]').forEach((button) => button.addEventListener('click', () => { state.dashboardTab = button.dataset.tab; render(); }));
}

function handleEscape(event) {
  if (event.key === 'Escape' && state.pendingRoute && !state.authenticated) closeAuth();
}

window.addEventListener('hashchange', () => { state.filtersOpen = false; render(); window.scrollTo({ top: 0, behavior: 'instant' }); });
render();

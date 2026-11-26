# Lume: Product Experience & Design Blueprint

**Fase:** 00 - auditoria e planeamento.  
**Data:** 2026-11-07.  
**Âmbito:** direção de produto, UX, UI e arquitetura para próximos incrementos. Sem implementação, instalação, alteração de regras existentes ou dependências externas.

## 1. Diagnóstico

### Estado atual em `web`

| Área | Estado encontrado | Decisão |
| --- | --- | --- |
| Stack | Next.js 16.4.3, React 19.3, TypeScript estrito, Tailwind v4, Motion, GSAP, Lucide | Preservar. Não criar nova stack visual. |
| App Router | Root layout, páginas Server Component por defeito, segmentos dinâmicos para ofertas e prestadores | Preservar e expandir com route groups/layouts. |
| Rotas | `/`, `/ofertas`, `/ofertas/[slug]`, `/prestadores/[slug]`, `not-found` | Preservar estrutura e conteúdo útil; refatorar apresentação para nova identidade. |
| Dados | `src/data/marketplace.ts` tipa 12 ofertas, 12 prestadores e 6 categorias PT-PT | Preservar como base demonstrativa de ofertas; expandir tipos por domínio, sem simular regras pendentes. |
| UI | Header, footer, banner de simulação, cards, grelha, pesquisa e filtros | Preservar conceitos e partes reutilizáveis; substituir CSS acoplado à linguagem verde/creme. |
| Estilos | `tokens.css` e `globals.css` concentram tokens e 400 linhas de CSS por página | Refatorar para tokens semânticos, primitives e estilos por componente/feature. |
| Responsividade | Breakpoints 1100/900/700/390; grelhas passam a coluna; foco e skip link existem | Preservar intenção; substituir menu mobile que hoje apenas liga a `/ofertas` por navegação real. |
| Acessibilidade | `lang=pt-PT`, skip link, `focus-visible`, labels em pesquisa/filtros, `aria-live` em resultados, redução de movimento | Preservar; completar diálogos, drawers, erros, estados, targets e testes. |
| Motion | Motion nos cards/grelha; GSAP apenas para entrada da hero e orb, com limpeza por `useGSAP` | Preservar dependências; limitar Motion a interações de UI e GSAP a composições editoriais isoladas. |
| Configuração | `cacheComponents`, `partialPrefetching`, Turbopack/Tailwind; alias `@/*` | Preservar. Verificar comportamento de cache por rota quando houver dados reais. |
| Testes | Sem testes em `web`. Só protótipo raiz tem auditoria CDP manual | Substituir estratégia implícita por unitários + E2E Playwright num incremento dedicado. |

### Protótipo raiz histórico

`app.js`, `index.html`, `styles.css` e `test/audit-browser.mjs` contêm experiência anterior mais completa: autenticação simulada, pedidos, publicação, propostas, seleção, dashboard e filtros. Não alterar nesta fase. Usar apenas como referência de jornadas e inventário de conteúdo; não copiar regras, pois conflita com decisões OpenSpec posteriores sobre aceitação, ciclo de vida e visibilidade dos pedidos.

### Lacunas para experiência premium completa

- Sem páginas de apresentação distintas para clientes e prestadores.
- Sem autenticação, workspace, criação/edição de publicação, pedidos, propostas, notificações, segurança ou preferências no Next app.
- Catálogo filtra só texto, categoria e modalidade em memória; URL inicial não se mantém depois da interação; preço é texto parseado.
- Detalhe de oferta e perfil não possuem estados de loading/error segmentados, avaliações textuais, estado de disponibilidade separado ou CTA autenticada contextual.
- Root layout aplica header/footer públicos a todas as futuras áreas; impede navegação e chrome próprios de autenticação/workspace.
- CSS atual mistura tokens, layouts, páginas e estados; dificulta migração de identidade e consistência.

## 2. Skills e fontes consultadas

### Skills instaladas

| Área procurada | Resultado |
| --- | --- |
| Frontend/UI-UX/design system | Ausente. |
| Next.js App Router/arquitetura React | Ausente. |
| Motion/GSAP | Ausente. |
| Acessibilidade/performance | Ausente. |
| Playwright/testes UI | Ausente. |
| Disponíveis | `caveman`, `cavecrew` e variantes para comunicação, delegação, revisão e commits; não aplicáveis à produção deste blueprint. |

Não foi instalada nem simulada skill ausente.

### Documentação oficial consultada

- Next.js: [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) e [Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages). Implicação: Server Components por defeito; limites client pequenos; layouts aninhados para três experiências.
- React: [`useDeferredValue`](https://react.dev/reference/react/useDeferredValue). Implicação: mantém input responsivo, mas não faz debounce de pedidos de rede; pesquisa remota precisa debounce/cancelamento próprio.
- Motion: [Accessibility](https://motion.dev/docs/react-accessibility). Implicação: `MotionConfig reducedMotion="user"`; evitar parallax/transformação de superfícies grandes para utilizadores com redução de movimento.
- GSAP: [React](https://gsap.com/resources/React/). Implicação: `useGSAP` scoped e cleanup; GSAP só em Client Components.
- W3C: [WCAG 2.2](https://www.w3.org/TR/WCAG22/). Implicação: alvo de engenharia WCAG 2.2 AA, incluindo reflow, foco não oculto, alvo mínimo e autenticação acessível.
- Playwright: [Installation](https://playwright.dev/docs/intro). Implicação: candidato para E2E com Chromium, Firefox, WebKit e emulação mobile; não instalado nesta fase.

## 3. Direção de arte

### Princípio

**White & Blue: premium claymorphism com vidro fosco.** Lume deve parecer curado e humano, não painel SaaS: descoberta editorial de serviços, dados operacionais claros e workspace calmo. Branco cria espaço; azul orienta ação, confiança e profundidade; conteúdo real e fotografia evitam que efeitos visuais substituam informação.

### Regras visuais

- Fundo branco frio com halos azul névoa muito subtis; ruído apenas se impercetível e nunca necessário para contraste.
- Superfícies clay para objetos acionáveis ou editoriais: cartões, compositores, KPI de atividade. Luz superior-esquerda, sombra externa azul-cinza baixa e highlight interno branco.
- Vidro apenas em chrome flutuante: header, drawer, filtros mobile, painel contextual, modal. Fundo sólido/fallback quando `backdrop-filter` não existir ou contraste falhar.
- Azul saturado reservado para ação principal, seleção e foco. Azuis pálidos para contexto. Nunca usar cor como único indicador de estado.
- Cantos 12--28 px conforme dimensão; evitar pílulas para tudo. Chips, badges e filtros podem ser pill; cards, inputs e painéis não.
- Composição em camadas nas páginas públicas: fotografia, cartões informativos e círculos/luzes leves. Workspace reduz ornamentação e maximiza leitura.
- Tipografia de display expressiva mas funcional para hero e títulos; sans de alta legibilidade para dados, formulários e navegação. PT-PT em todo conteúdo novo.

### Fotografia

- Fotografia documental luminosa de profissionais portugueses em contexto de trabalho, ferramentas/mãos/espaços e resultado; não usar stock corporativo posado como imagem principal.
- Proporções: hero 4:5/3:4, cards 4:3, detalhe 16:10, avatar 1:1. Definir `sizes`, placeholder e `alt` específico no asset.
- Gradiente/overlay só quando necessário para legibilidade; imagens não devem prometer verificação, cobertura ou resultado.
- Dados reais futuros: consentimento, origem, licença, descrição alternativa e política de remoção antes de publicação.

## 4. Mapa de páginas e experiências

### Layouts propostos

| Grupo | Layout | Chrome | Rotas |
| --- | --- | --- | --- |
| `(public)` | `PublicLayout` | Header público, footer, aviso de demonstração enquanto aplicável | home, produto, como funciona, clientes, prestadores, ofertas, perfis, pedidos somente se audiência aprovada |
| `(auth)` | `AuthLayout` | Marca mínima, retorno ao público, sem footer | login, registo, recuperação, redefinição, verificação |
| `(workspace)` | `WorkspaceLayout` | Sidebar/rail desktop, header compacto, nav inferior mobile, notificações | dashboard, atividade, ofertas/pedidos, propostas, perfil, preferências, segurança, criação/edição |

### Público

| Página/rota proposta | Objetivo e público | Componentes e ações | Entrada/saída | Dados/estados | Desktop/mobile |
| --- | --- | --- | --- | --- | --- |
| `/` | Explicar proposta e converter visitante em exploração ou caminho contextual; cliente e prestador | Hero pesquisa, categorias, ofertas selecionadas, split client/prestador, prova de processo, CTA | Entrada direta; sai para `/ofertas`, `/para-clientes`, `/para-prestadores`, `/como-funciona` | Conteúdo editorial, categorias, ofertas publicadas/available; loading de seleção, fallback sem resultados | Desktop composição em camadas; mobile sequência linear e CTA visível, sem parallax |
| `/produto` | Apresentar valor do marketplace sem inventar garantias | Blocos de benefícios, cenário oferta/pedido, FAQ aprovada | Header/footer; sai para personas e exploração | CMS/local estático; vazio não aplicável | Desktop editorial; mobile acordeões sem esconder conteúdo essencial |
| `/como-funciona` | Explicar descoberta, publicação e proposta por direção | Timeline dual, links por papel, notas de limites | Home/footer; sai para personas/auth | Conteúdo estático; sem alegar aceitação/mensagens | Comparação lado a lado; tabs/stack no mobile |
| `/para-clientes` | Cliente descobre ofertas e, autenticado, cria pedido/proposta oferta | Hero específico, passos, exemplos de oferta, CTA | Home/produto; sai para ofertas, login, `/pedidos/novo` | Ofertas públicas; regra de pedidos explicitamente pendente | Cards lado a lado; mobile prioriza “explorar ofertas” |
| `/para-prestadores` | Prestador publica oferta e, conforme audiência, descobre pedidos | Hero específico, passos, exemplos de pedido, CTA | Home/produto; sai para login, `/ofertas/nova`, pedidos condicionais | Conteúdo editorial; não prometer procura ou verificação | Grelha/linha editorial; mobile CTA fixo contextual |
| `/ofertas` | Descoberta pública de ofertas | Search, filtro desktop/drawer mobile, chips, ordenação, contagem, grelha/lista | Home/nav/categoria; sai para detalhe | Ofertas `published`+`available`; loading, erro, vazio, sem resultados | Sidebar sticky >=1024; botão/drawer <1024 |
| `/ofertas/[slug]` | Avaliar oferta e iniciar proposta autenticada | Galeria, escopo, preço, modalidade, área aproximada, disponibilidade, prestador, CTA | Catálogo, perfil, links relacionados; sai para login/proposta e catálogo | Oferta pública permitida; loading/404; indisponível/retirada não exposta publicamente | Colunas com CTA sticky; CTA bottom sheet no mobile |
| `/prestadores/[slug]` | Avaliar identidade pública mínima e ofertas | Hero perfil, competências declaradas, área aproximada, ofertas, reputação quando aprovada | Oferta/catálogo; retorna preservando origem | Perfil público allowlist; loading/404; sem ofertas | Biografia + aside; stack mobile |
| `/pedidos` e `/pedidos/[slug]` | Descobrir pedidos e permitir proposta de prestador | Mesmo shell de discovery/detalhe, campos e CTA próprios | Só expor após decisão de audiência | **Bloqueado:** visibilidade, campos públicos, autorização e localização | Mesmo comportamento de filtros; não criar rota pública antes da decisão |

### Autenticação

| Página/rota | Objetivo | Componentes/ações | Estados e navegação |
| --- | --- | --- | --- |
| `/entrar` | Iniciar sessão e restaurar destino seguro | Email/password ou método aprovado, link recuperação, CTA registo | Validação, submitting, erro credencial, rate limit, sucesso -> `returnTo` allowlisted/dashboard |
| `/registar` | Criar conta única capaz de atuar nos dois contextos | Dados mínimos aprovados, consentimentos aprovados, password/método definido, progressivo | Validação por campo/resumo, email existente, sucesso -> verificação; não pedir papel exclusivo |
| `/recuperar-password` | Pedir recuperação | Email, confirmação neutra | Validação, envio, erro recuperável; sempre resposta anti-enumeração quando real |
| `/redefinir-password` | Definir password via token válido | Nova password, confirmação, regras claras | Token inválido/expirado, sucesso -> login |
| `/verificar-email` | Completar verificação aprovada | Estado de envio, reenvio limitado, confirmação | Pendente, expirado, sucesso -> retorno seguro |

Método, fornecedor de email, sessões e autenticação permanecem pendentes no OpenSpec. Em incremento demonstrativo, estes ecrãs podem existir com dados locais explicitamente simulados; não assumir contrato de autenticação real.

### Workspace autenticado

| Página/rota | Objetivo, componentes e ações | Dados/estados | Desktop/mobile |
| --- | --- | --- | --- |
| `/area` | Resumo único da conta: próximos passos, publicações, propostas, notificações recentes | Agregados privados autorizados; skeleton, vazio orientado, erro/retry | Rail + conteúdo; tabs/ações prioritárias no mobile |
| `/area/atividade` | Linha temporal de ações e alterações | Eventos/auditoria aprovados; vazio, paginação, erro | Lista agrupada por data; filtros no drawer |
| `/area/ofertas` | Gerir próprias ofertas | Lista, estado publicação/disponibilidade, criar, editar, retirar/indisponibilizar conforme regra | Dados owner-only; draft/vazio/erro; cards mobile |
| `/area/pedidos` | Gerir próprios pedidos | Lista, criar/editar, pausa/retirada conforme regra | Bloqueado por campos/estado finais; shell comum às ofertas |
| `/area/propostas/recebidas` | Consultar propostas recebidas por recurso próprio | Filtros origem/estado, detalhe contextual | Privado; vazio/erro/paginação |
| `/area/propostas/enviadas` | Acompanhar propostas próprias | Lista e detalhe contextual | Privado; estado apenas `submitted` no primeiro MVP operacional |
| `/area/perfil` | Gerir apresentação pública e informação privada separada | Preview público, bio, competências, área declarada | Draft, validação, preview; nunca misturar morada privada |
| `/area/preferencias` | Preferências aprovadas de comunicação/experiência | Toggles com texto e confirmação | Sem decidir notificações reais nesta fase |
| `/area/notificacoes` | Ver notificações quando capacidade existir | Lista, lida/não lida, preferências | **Posterior:** notificações são fora de escopo operacional atual |
| `/area/seguranca` | Sessões/password/conta quando auth aprovada | Password, sessões, email verificado | Dependente da solução auth; ações destrutivas exigem confirmação |

### Publicações

| Página/rota | Objetivo | Componentes, ações e estados |
| --- | --- | --- |
| `/ofertas/nova` e `/ofertas/[id]/editar` | Criar/editar oferta do prestador | Stepper: base, modalidade/localização, condições/disponibilidade, revisão. Draft/salvar/publicar/erro. Publicar só com categoria ativa e campos aprovados. Edição de publicada depende de política pendente. |
| `/pedidos/novo` e `/pedidos/[id]/editar` | Criar/editar pedido do cliente | Mesmo padrão, campos próprios: necessidade, prazo, modalidade/localização, condições, audiência/revisão. Bloqueado até audiência, exposição e campos aprovados. |

## 5. Sistema de design

### Tokens base propostos

| Grupo | Tokens iniciais | Uso |
| --- | --- | --- |
| Neutros | `canvas #F6F9FF`, `surface #FFFFFF`, `surface-soft #F0F5FF`, `ink #10213F`, `ink-muted #52627A`, `line #D9E2F0` | Fundo, texto, separadores |
| Azul | `blue-700 #1256D8`, `blue-600 #2870F0`, `blue-500 #4E90FF`, `blue-100 #E5F0FF`, `blue-50 #F3F8FF` | Marca, ação, foco, destaque e fundos suaves |
| Semântica | success `#087B5C`, warning `#A85B08`, danger `#C1374B`, info `#1E63CE` mais variantes 50/100 | Estados, nunca só por cor |
| Tipografia | Display: `Manrope` ou equivalente licenciada; Sans: `Inter`/system fallback | Confirmar licença e carregar com `next/font`; números tabulares em preço/data |
| Tamanhos | 12, 14, 16, 18, 20, 24, 32, 40, 48, 64, 80 | Texto em 14--18; display fluido 40--72 |
| Espaço | 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 112 | Grid de 4 px; blocos editoriais 64--112 |
| Radius | 10, 14, 18, 24, 28 | Inputs 14; cards 18/24; hero 28. Pills só para chips/badges. |
| Sombras | `clay-sm 0 8px 24px rgba(31,82,160,.10), inset 0 1px 0 rgba(255,255,255,.92)`; `clay-md 0 20px 50px rgba(23,66,132,.13)` | Uma sombra dominante por composição; não empilhar efeito em todos elementos |

### Superfícies e estados

- `glass`: `rgba(255,255,255,.72)`, borda branca translúcida, `backdrop-filter: blur(18px) saturate(130%)`; fallback `#FFFFFF`.
- `clay`: `surface` com borda `line`, highlight interno e sombra de baixa opacidade. Nada de contraste essencial dentro da transparência.
- Botão primário: `blue-700`; hover `blue-600` com elevação 1--2 px; active regressa ao plano; disabled reduz saturação, mantém texto legível e sem cursor/ação.
- Botão secundário: surface/clay; terciário: texto azul com sublinhado no hover/focus.
- Input: borda `line`; hover `blue-300`; focus ring azul de 3 px externo e 1 px interno; erro inclui ícone, texto associado e borda danger.
- Card clicável: área toda clicável, título semântico, hover discreto; não depender de hover para revelar ação.

### Componentes únicos e reutilizáveis

| Componente | Uso | Variantes necessárias |
| --- | --- | --- |
| `Button`/`IconButton` | ações e navegação | primary, secondary, ghost, destructive; tamanho; loading; ícone antes/depois |
| `TextField`, `Select`, `Textarea`, `Combobox` | formulários e filtros | label, hint, error, required, prefix/suffix; sem criar input duplicado por feature |
| `Card` | oferta, pedido, atividade, configuração | `elevated`, `outlined`, `glass`; composição interna específica por domínio |
| `StatusBadge` | publicação, disponibilidade, proposta | semântica textual + cor/ícone |
| `FilterChip` | filtro ativo removível | label, contador opcional, remove acessível |
| `Drawer`/`Dialog` | filtros mobile, confirmação, ações | foco contido, Esc/backdrop quando permitido, retorno ao gatilho |
| `EmptyState`, `ErrorState`, `Skeleton` | feedback reutilizável | título, explicação, ação; skeleton preserva estrutura |
| `OfferCard`, `RequestCard`, `PublicationCard` | domínio | partilham primitives, não forçar modelo único; dados e CTAs próprios |
| `LocationDisclosure` | área pública vs privada | recebe apenas representação permitida, nunca entidade interna |

### Breakpoints e iconografia

- Layout fluido primeiro; 320 px, 480 px, 768 px, 1024 px, 1280 px e 1536 px são pontos de verificação, não obrigatoriamente media queries rígidas.
- 44x44 CSS px mínimo para controlos de toque; focus nunca oculto por header, drawer ou bottom nav.
- Lucide permanece biblioteca única. `strokeWidth` consistente 1.75/2, rótulo visível em ações importantes, `aria-hidden` em ícones decorativos.

### Motion

- Duração: 120--180 ms micro-interação, 180--280 ms transição de painel/lista, até 500 ms hero editorial. Easing suave, sem bounce em ações de confiança.
- Motion para layout de filtros, entrada de cards e feedback; GSAP apenas hero/composição de marketing. Não usar ambos sobre mesma propriedade/elemento.
- `MotionConfig reducedMotion="user"` no limite client; preferir opacity para reduced motion. Sem autoplay, scroll-jacking, parallax ou animação contínua essencial.

## 6. Filtros e pesquisa

### Modelo e sincronização

Uma API de filtro partilhada, com configurações próprias de oferta e pedido. URL é fonte de verdade partilhável e navegável: `q`, `category`, `subcategory`, `mode`, `minPrice`, `maxPrice`, `location`, `radius`, `availability`, `rating`, `deadline`, `published`, `sort`, `page`. Valores inválidos são removidos/normalizados no servidor; alterações client usam `router.replace` com transição e preservam scroll enquanto o utilizador filtra.

| Filtro | Oferta | Pedido | Disponível localmente agora | Dependência futura |
| --- | --- | --- | --- | --- |
| Texto | título, resumo, área aprovada | título, necessidade, área aprovada | Sim | Índice/pesquisa servidor para escala |
| Categoria/subcategoria | Sim | Sim | Categoria atual; subcategoria não | Taxonomia com IDs ativos aprovada |
| Preço/orçamento | intervalo/modelo de preço | intervalo/orçamento | Só se número tipado; não fazer parse de texto | Campos financeiros e semântica aprovados |
| Modalidade | remote/in_person/hybrid | Igual | Sim | Nenhuma |
| Localização | área de atendimento pública | Conforme audiência | Texto demonstrativo apenas | Política, geocodificação e representação pública |
| Distância | Presencial/híbrido | Presencial/híbrido | Não | Origem autorizada, geocodificação, cálculo e precisão aprovados |
| Disponibilidade | available/agenda, quando aprovada | open/pausado, quando aprovado | Parcial demonstrativo | Estados definitivos |
| Avaliação | Futuro | Não presumir | Não | Reputação é posterior ao MVP operacional |
| Prazo | Não típico de oferta | Sim | Não | Campos mínimos de pedido/aprovação |
| Data publicação | Sim | Sim se audiência permitir | Sim com timestamp demonstrativo | Persistência/paginação |
| Ordenação | recente, preço, proximidade escolhida | recente, prazo, proximidade escolhida | recomendada/preço em demo | Regra explícita, estável por ID; nunca relevância opaca |

### Comportamento

- Desktop: sidebar sticky, grupos semânticos e contadores opcionais; resultados mantêm espaço visual durante atualização.
- Mobile: botão “Filtros (n)” abre drawer modal com título, aplicar, limpar e fechar; foco retorna ao gatilho. Filtros ativos aparecem como chips horizontais acima de resultados.
- Cada chip remove só o próprio critério; “Limpar tudo” remove todos e preserva pesquisa se decisão de UX separar ambos, ou limpa explicitamente tudo com rótulo claro.
- Pesquisa local: `useDeferredValue` para renderização. Pesquisa remota futura: debounce de 250--350 ms, abortar pedido anterior, não confundir debounce com `useDeferredValue`.
- Contagem, carregamento, erro e vazio usam região `aria-live="polite"`; não anunciar cada tecla antes de debounce.
- Estado vazio: explicar combinação aplicada, oferecer limpeza e categorias. Erro: preservar critérios e oferecer retry. Loading: skeleton estruturado e `aria-busy`.

## 7. Arquitetura técnica futura

### Organização alvo

```text
src/
  app/
    (public)/...
    (auth)/...
    (workspace)/area/...
  components/
    ui/              # primitives sem regra de negócio
    layout/          # public, auth, workspace chrome
  features/
    offers/          # UI, schemas, queries, types próprios
    requests/        # UI, schemas, queries, types próprios
    proposals/
    profile/
    discovery/       # filtros/URL/resultados partilhados
    auth/
  data/
    demo/            # fixtures tipadas, separadas do acesso a dados futuro
  lib/
    formatters/ validation/ navigation/
  styles/
    tokens.css globals.css
```

- Páginas, layouts e detalhe são Server Components por defeito. Componentes client apenas para campos, drawer/dialog, animação, filtros URL, upload futuro e feedback transitório.
- Feature importa primitives UI; `components/ui` não importa feature. Não criar “Listing” genérico que misture offer/request; partilhar taxonomia, modalidade, localização, filtros e proposta apenas onde invariantes são iguais.
- Schemas de validação por domínio e por intenção: oferta draft/publicar, pedido draft/publicar, proposta. Biblioteca de schema ainda não aprovada; escolher antes de implementar, sem instalar nesta fase.
- Fixtures demonstrativas tipadas devem conter números/data/enums normalizados; formatadores produzem EUR, datas e rótulos PT-PT na borda de apresentação.
- Navegação usa `next/link` para destinos previsíveis e `router` apenas em submissões/interações. `returnTo` autenticado é allowlisted. Filtros usam URL; estado efémero local fica no client.
- Acesso a dados, segredos e autorização futura só no servidor. Dados públicos são DTO allowlisted; localizações pública, operacional e privada nunca reutilizam mesmo objeto serializado.

### Testes futuros

| Nível | Alvo | Exemplos |
| --- | --- | --- |
| Unitário | formatadores, normalização de filtros, transições permitidas, schemas | preço, URL inválida, modalidade/localização, ownership |
| Componente | primitives e features interativas | foco dialog/drawer, labels/erros, chip remove, estados de card |
| E2E Playwright | jornadas por viewport e browser | pesquisa->oferta, perfil, login demonstrativo, criação, proposta; desktop e mobile |
| Visual/manual | direção artística e WCAG | contraste, zoom 200%/320 px, teclado, leitor de ecrã, reduced motion, imagem/overflow |

Playwright não existe em `web`; introduzir somente no incremento de qualidade depois de avaliar versão, browsers, CI e custo de manutenção.

## 8. Fluxos prioritários

| Fluxo | Percurso | Regra/dependência |
| --- | --- | --- |
| 1. Visitante encontra oferta | `/` pesquisa/categoria -> `/ofertas` URL com filtros -> card -> `/ofertas/[slug]` -> CTA proposta -> `/entrar?returnTo=...` | Oferta pública `published` + `available` confirmada. Proposta exige auth. |
| 2. Visitante abre perfil | oferta -> `/prestadores/[slug]` -> oferta do perfil -> detalhe | Perfil só expõe allowlist; reputação textual depende de capacidade futura. |
| 3. Login | CTA privado -> `/entrar` -> validação -> sessão -> returnTo seguro | Método, sessões e fornecedor pendentes. |
| 4. Registo | `/registar` -> validação -> `/verificar-email` -> destino/orientação | Conta única para ambos contextos confirmada; campos e auth pendentes. |
| 5. Cliente workspace | login -> `/area` -> ofertas/propostas enviadas -> cria pedido ou propõe a oferta | Criar pedido pode existir; descoberta de pedidos aguarda audiência. |
| 6. Prestador workspace | login -> `/area` -> ofertas próprias -> criar oferta -> pedidos/propostas enviadas | Pedidos disponíveis ao prestador só após audiência/elegibilidade. |
| 7. Prestador cria oferta | `/ofertas/nova` -> dados -> modalidade/localização -> condições -> revisão -> draft/publicar -> `/area/ofertas` | Campos, geocodificação e edição publicada pendentes; publicação exige auth. |
| 8. Cliente prepara pedido | `/pedidos/novo` -> necessidade -> modalidade/localização -> orçamento/prazo -> audiência/revisão -> publicar | **Bloqueado:** audiência, exposição, campos, precisão geográfica e estados definitivos. |
| 9. Acompanha propostas | detalhe/área -> recebidas ou enviadas -> detalhe privado | Primeiro MVP operacional suporta `submitted`; aceitar/rejeitar/retirar e efeitos estão pendentes. |

Não desenhar UI que afirme seleção, contrato, mensagens, pagamento, conclusão ou avaliação operacional antes de decisão OpenSpec. O protótipo histórico pode demonstrar estes percursos, mas não é regra atual.

## 9. Decisões pendentes e limites

| Tema | Estado OpenSpec | Impacto UX | Alternativa demonstrativa isolada |
| --- | --- | --- | --- |
| Visibilidade de pedidos | Pendente: público controlado, autenticado ou prestadores elegíveis | Define rota, SEO, filtros, dados e CTAs de `/pedidos` | Esconder descoberta; mostrar pedido apenas ao proprietário em workspace local |
| Conta cliente/prestador | Confirmado: uma conta atua nos dois contextos | Sem seletor de “tipo de conta”; ação deriva recurso/sessão | Perfil demo mostra ambos papéis sem conceder autorização real |
| Aceitação de proposta | Pendente; fora primeiro incremento | Não mostrar “aceitar”, recusar concorrentes ou mudar publicação | Estado estático “proposta enviada” sem mutação |
| Cancelar/reabrir | Retirada/pausa recomendadas; regra final pendente | Ações e copy não podem prometer reversão | Dados podem mostrar estado não interativo rotulado demo |
| Estados | Oferta: publicação + disponibilidade separados recomendados; pedido idem | Badges e gestão precisam dois eixos | Fixtures documentam enum separado, sem transições não aprovadas |
| Localização pública/privada | Exposição e precisão pendentes | Nunca renderizar morada/coordenada; área aproximada apenas aprovada | “Todo o país”/localidade ampla em fixture |
| Distância | Confirmada como requisito de futuro primeiro incremento; método/provedor/precisão pendentes | Não apresentar km simulados como cálculo real | Ocultar ordenação distância; explicar indisponibilidade quando dados faltam |
| Avaliações | Fora MVP operacional posterior | Não usar selo de confiança/verificação | Dados históricos claramente demonstrativos, sem capacidade de escrever avaliação |
| Taxonomia/categorias reguladas | IDs/governança confirmados; catálogo inicial pendente | Criar/publicar e filtros finais bloqueados | Manter seis categorias demo sem alegar catálogo aprovado |

## 10. Plano de implementação incremental

| Incremento | Objetivo, rotas e ficheiros prováveis | Dependências/testes | Aceite e riscos |
| --- | --- | --- | --- |
| 01. Fundação visual | Migrar tokens verde/creme para azul/branco; primitives, layouts públicos, tipografia, MotionConfig. Afeta `styles/`, `components/ui/`, `components/layout/`, `app/layout.tsx` | Sem dependência externa obrigatória; lint/typecheck; contraste e reduced motion manual | Página existente mantém conteúdo/rotas e nova linguagem consistente. Risco: regressão responsiva causada por CSS monolítico. |
| 02. Público editorial | Home, `/produto`, `/como-funciona`, `/para-clientes`, `/para-prestadores`; reutiliza oferta/card | Conteúdo aprovado; testes de links, viewport e semântica | Valor bidirecional claro sem prometer funções pendentes. Risco: copy implica garantias/confiança não verificadas. |
| 03. Discovery de ofertas | Refatorar `/ofertas`, detalhe e perfil; filtros URL, drawer mobile, chips, estados e DTO demo | Taxonomia demonstrativa; unitários URL; E2E pesquisa/detalhe/mobile | Filtros persistem na URL e mobile é operável por teclado. Risco: tratar preço textual/dados demo como regra definitiva. |
| 04. Auth demonstrativa | `(auth)` e rotas login/registo/recuperação/redefinição/verificação, returnTo seguro | Decidir fronteira demo; testes de erros/foco/navegação | Fluxos são coerentes e explicitamente simulados, sem auth real. Risco: UX antecipar fornecedor/segurança não aprovados. |
| 05. Workspace shell | `(workspace)`, `/area`, atividade, perfil, preferências, segurança como estrutura demonstrativa | Auth demo; E2E navegação desktop/mobile | Conta única vê áreas sem confundir papel com permissão. Risco: criar ações privadas falsas sem etiqueta demo. |
| 06. Gestão de ofertas | Criar/editar oferta, drafts, revisão e estados aprovados em fixtures; `/area/ofertas` | Definir campos mínimos e política de edição antes de regras finais; schemas; testes de formulário | Validação acessível, preview, rascunho e publicação simulada. Risco: localização/geocodificação bloqueia versão operacional. |
| 07. Pedidos condicionais | Criar/editar pedido e descoberta só após audiência/privacidade aprovada | Decisões de pedidos/localização/taxonomia; autorização futura | Nenhum campo privado é exposto e audiência é imposta. Risco alto de privacidade/reidentificação. |
| 08. Propostas e qualidade | Propostas enviadas/recebidas, teste E2E Playwright, regressão a11y/performance | Decisão do escopo `submitted`; avaliar Playwright; fixtures | Autor/destinatário/origem claros e privados; cobertura dos 9 fluxos aplicáveis. Risco: aceitação indevidamente introduzida. |
| 09. Operacionalização futura | Auth real, PostgreSQL/Drizzle, geocodificação/distância, autorização, dados reais | Todas decisões de `prepare-operational-mvp-architecture` | Segurança, privacidade, acessibilidade e concorrência demonstradas. Risco máximo; não iniciar sem aprovações. |

**Primeiro incremento recomendado:** 01, Fundação visual. Substitui identidade em ponto central, cria primitives e separa layout público sem ampliar regras de negócio. Depois, 02 e 03 tornam experiência pública demonstrável antes de introduzir auth ou dados privados.

## 11. Critérios de qualidade transversais

- PT-PT consistente; preços, datas, termos de modalidade e mensagens claros.
- WCAG 2.2 AA como referência: HTML semântico, labels, foco visível/não oculto, targets >=44 px, teclado, `aria-live` proporcional, contraste validado, zoom 200% e reflow a 320 px.
- Nenhuma alegação de verificação, garantia, seguro, pagamento, contratação, cobertura ou qualificação profissional sem regra aprovada.
- Dados demonstrativos e mutações simuladas identificados em contexto; banner global só enquanto experiência for demo.
- Server Components por defeito; JavaScript client limitado; imagens otimizadas com `next/image`, `sizes` e alt útil; sem blur/backdrop em massa.
- Motion opcional e reduzido por preferência; sem animação que esconda estado, atrase ação ou cause desconforto.
- Filtros, ordenação e estados reproduzíveis via URL; resultados estáveis e explicáveis, sem relevância opaca.
- Testes automatizados por rota/estado e revisão manual por teclado, leitor de ecrã, mobile, zoom, reduced motion e erro/retry antes de cada incremento concluído.
- Ofertas, pedidos, propostas e localizações mantêm fronteiras de domínio e dados públicos/privados separadas.

## Referências internas

- `openspec/changes/prepare-operational-mvp-architecture/decisions.md`
- `openspec/changes/prepare-operational-mvp-architecture/design.md`
- `openspec/changes/create-service-marketplace-prototype/design.md`
- `web/src/app`, `web/src/components`, `web/src/data/marketplace.ts`, `web/src/styles/tokens.css`

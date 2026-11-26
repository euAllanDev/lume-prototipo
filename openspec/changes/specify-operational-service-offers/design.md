# Design: Ofertas de Servico Operacionais

## Contexto e Precedencia

Esta mudanca especializa `consolidate-lume-business-rules`, `specify-lume-operational-foundation` e `specify-user-profiles-and-capabilities`, sem promover proposta deste documento a decisao aprovada. Decisoes normativas anteriores prevalecem; alternativas aqui descritas exigem aprovacao quando marcadas pendentes. Estados `withdrawn`, `available`, `unavailable`, `open`, `fulfilled` e proposta somente `submitted` sao historicos obsoletos, nao extensoes deste design.

Origem verificada: `consolidate-lume-business-rules/decisions.md` deixa edicao de publicacao `published` e tecnologia geoespacial pendentes. Este incremento incorpora aprovacao posterior e limitada para o efeito da desativacao taxonomica sobre ofertas; identidade fisica, renomeacao e reclassificacao continuam pendentes. `prepare-operational-mvp-architecture` registra PostGIS como recomendacao nao aprovada e campos minimos/disponibilidade de oferta como pendencias. Opcionalidade comercial consolidada pertence a pedidos e nao e transferivel para ofertas.

`web/src/data/marketplace.ts` e `web/src/features/offers/catalog.ts` continuam demonstrativos. Nenhum registro futuro de oferta pode reutilizar seus IDs como se fossem chaves persistentes.

## Fronteiras de Dominio

| Conceito | Fonte de verdade | Responsabilidade |
| --- | --- | --- |
| Identidade | Better Auth `user` | Ator autenticado e verificacao de email. |
| Perfil | `lume_profile` | Apresentacao publica do prestador. |
| Capacidade | `lume_profile_capability` | Elegibilidade comercial `provider`. |
| Oferta | `service_offer` proposto | Conteudo, condicoes e ciclo de vida da oferta. |
| Localizacao da oferta | `service_offer_location` proposto | Representacoes publica, privada e operacional da area atendida. |
| Taxonomia | estrutura persistente pendente | Gestao autorizada de categoria/subcategoria; identidade, estado ativo e historico dependem de politica propria. |
| Proposta | dominio futuro | Interesse privado e aceite exclusivo; nao implementado aqui. |

Capacidade permite tentar operacao; nao prova ownership, verificacao profissional, administracao ou validade do estado. Oferta referencia diretamente identidade proprietaria. Perfil e capacidade continuam derivados pelo `owner_user_id`, sem duplicacao de identidade.

## Modelo Persistente Proposto

Todo tipo, campo, constraint e indice desta secao e proposta tecnica, nao autorizacao de schema ou migration. Campos comerciais, campos minimos finais, estrutura geografica e quota por prestador permanecem bloqueios de produto.

### `service_offer`

| Coluna conceitual | Tipo proposto | Nulabilidade e regra |
| --- | --- | --- |
| `id` | UUID | PK, gerado no servidor, nunca exposto em DTO publico. |
| `owner_user_id` | text | FK obrigatoria para `user.id`; ator sempre derivado da sessao. |
| `public_slug` | text | Unico, obrigatorio, estavel, gerado no servidor, nao editavel. |
| `subcategory_id` | ID estavel da taxonomia | FK opcional no rascunho; obrigatoriedade para publicar e identidade taxonomica sao propostas pendentes. Categoria seria derivada pelo pai. |
| `title` | text | Pode faltar em rascunho; obrigatoriedade para publicar e proposta pendente. |
| `description` | text | Pode faltar em rascunho; obrigatoriedade para publicar e proposta pendente. |
| `mode` | enum | Valores aprovados: `remote`, `in_person` ou `hybrid`; obrigatoriedade no nucleo minimo de publicacao permanece pendente. |
| `price_type` | enum opcional | `fixed`, `starting_at`, `hourly` ou `quote`. |
| `price_amount_minor` | bigint opcional | Centimos de EUR, positivo; ausente somente sem preco ou com `quote`. |
| `currency` | char(3) opcional | `EUR` quando preco existe. |
| `availability_note` | text opcional | Nota publica limitada, sem agenda ou garantia. |
| `lead_time_min_days` | integer opcional | Inteiro nao negativo. |
| `lead_time_max_days` | integer opcional | Inteiro nao negativo e maior ou igual ao minimo. |
| `status` | enum | `draft`, `published`, `paused`, `closed` ou `cancelled`; default `draft`. |
| `published_at` | timestamptz opcional | Primeira publicacao, imutavel depois de preenchida. |
| `last_published_at` | timestamptz opcional | Publicacao inicial ou retomada mais recente. |
| `state_changed_at` | timestamptz | Momento da ultima transicao. |
| `closed_at` | timestamptz opcional | Preenchido somente em `closed`. |
| `cancelled_at` | timestamptz opcional | Preenchido somente em `cancelled`. |
| `created_at` | timestamptz | Criacao. |
| `updated_at` | timestamptz | Ultima alteracao de conteudo ou estado. |
| `revision` | bigint | Versao monotona para concorrencia otimista. |

Na proposta candidata, `price_type=quote` nao aceita montante, outros tipos exigem montante positivo e `EUR`, e prazo pode usar minimo, maximo ou ambos com intervalo coerente. Modelo, opcionalidade e limites de dinheiro, texto e prazo permanecem pendentes e devem ser aprovados antes da migration.

### `service_offer_location`

Relacao zero-ou-um para um com oferta, usando `offer_id` simultaneamente como PK e FK. Separacao reduz risco de selecionar endereco ou coordenada numa query publica.

| Grupo | Campos conceituais | Exposicao |
| --- | --- | --- |
| Publico da oferta | Campos ainda por aprovar; candidatos: `city`, `region`, `service_area_label` | Nao confundir com allowlist do perfil nem ampliar precisao sem aprovacao. |
| Privado da oferta | Endereco estruturado necessario e texto original, conforme contrato futuro | Proprietario e operacao interna autorizada, com finalidade e retencao pendentes. |
| Operacional | Coordenadas e qualidade/origem da geocodificacao em estrutura ainda por escolher | Servidor; nunca serializadas publicamente. |

Oferta `remote` nao exige localizacao operacional, conforme decisao aprovada. Exigir cidade, regiao, area de atendimento ou coordenadas para publicar oferta `in_person` ou `hybrid` e proposta de requisitos minimos ainda pendente. Descricao especifica da parte presencial em oferta hibrida permanece candidata; campo adicional depende de necessidade de produto demonstrada.

PostGIS nao foi aprovado. Estrutura geografica, provedor, precisao de entrada, raio, qualidade minima e retencao continuam pendentes; nenhuma migration futura pode pressupor extensao, tipo ou indice espacial antes da decisao.

### Camadas e Audiencias de Localizacao

| Camada | Estado documental | Limite |
| --- | --- | --- |
| Localizacao publica do perfil | Aprovada | No maximo cidade e regiao; opcional no perfil e sem coordenadas/endereco. |
| Localizacao publica da oferta | Pendente | Publicidade da oferta nao aprova automaticamente cidade, regiao, area ou outra precisao. Campos devem receber allowlist propria. |
| Localizacao aproximada para autenticados | Aprovada somente para pedido | Pedido pode mostrar cidade, regiao e area aproximada. Para oferta, autenticacao nao amplia o DTO publico sem nova aprovacao. |
| Localizacao privada | Permitida somente quando necessaria | Endereco ou entrada original exige finalidade, acesso e retencao aprovados. |
| Coordenadas operacionais | Necessidade funcional aprovada; modelo pendente | Podem suportar distancia em linha reta internamente, mas tecnologia, precisao, acesso e retencao nao estao aprovados. |

### Taxonomia

Quando oferta possuir classificacao taxonomica conforme contrato minimo que vier a ser aprovado, nova publicacao `draft -> published` e retomada `paused -> published` exigem categoria e subcategoria referenciadas ativas. Desativacao posterior nao altera oferta ja `published`: ela permanece publicada, visivel no catalogo, detalhe e perfil, sem pausa, fechamento ou cancelamento automatico. Referencia taxonomica e historico permanecem preservados.

Armazenar somente `subcategory_id` e derivar categoria continuam propostas coerentes com a separacao categoria/subcategoria. IDs fisicos, renomeacao e reclassificacao ainda dependem de especificacao propria. A decisao aprovada nao autoriza implementar taxonomia nem dominio de ofertas, e nao define se oferta publicada sob classificacao depois desativada pode receber novas propostas.

Detalhe fisico das tabelas, identidade, estado, historico editorial e permissao administrativa pertence a especificacao propria de taxonomia. Esta mudanca preserva somente o limite aprovado: utilizador comum nao gere categoria ou subcategoria, e administracao nao concede acesso aos dados privados da oferta.

## Invariantes e Constraints Propostas

- PK UUID em oferta; unique index em `public_slug`.
- FK de proprietario e FK de subcategoria com exclusao restrita enquanto retencao/exclusao de conta estiver pendente.
- Enum/check para modalidade e estado; tipo de preco depende de aprovacao comercial.
- Checks de preco, moeda e prazo somente se esses campos forem aprovados; timestamps terminais seguem ciclo aprovado.
- Unique/PK em `service_offer_location.offer_id`.
- Constraints de latitude/longitude ou SRID/geometria e indice correspondente dependem da estrutura geografica aprovada.
- Escrita owner-only inclui `owner_user_id` e `revision` no predicado.
- Publicacao e retomada validam capacidade, email, ownership, estado, taxonomia ativa quando houver classificacao, e somente campos/localizacao que vierem a ser aprovados.
- Nao existe hard delete de oferta por endpoint comum. Politica de eliminacao/retencao permanece pendente.

Indices B-tree propostos:

- `(owner_user_id, updated_at DESC, id)` para workspace.
- `(status, last_published_at DESC, id)` para descoberta publica.
- `(subcategory_id, status, last_published_at DESC, id)` para taxonomia.
- `(mode, status, last_published_at DESC, id)` para modalidade.
- Parcial de preco para linhas publicadas com montante.

Indices devem ser confirmados com planos de consulta e volume real antes da migration; nao criar indices duplicados por especulacao.

## Ciclo de Vida

| Origem | Destino | Ator | Consequencia |
| --- | --- | --- | --- |
| `draft` | `published` | proprietario | Valida publicacao, define datas e torna DTO publico consultavel. |
| `published` | `paused` | proprietario; efeito administrativo ainda pendente | Remove imediatamente de publico e bloqueia propostas. |
| `published` | `closed` | proprietario ou aceite futuro atomico | Remove de publico, bloqueia propostas e define `closed_at`. |
| `published` | `cancelled` | proprietario | Remove de publico, bloqueia propostas, define `cancelled_at` e preserva historico. |
| `paused` | `published` | proprietario | Revalida contrato aprovado e, quando houver classificacao, exige taxonomia ativa; atualiza `last_published_at`. |
| `paused` | `closed` | proprietario ou aceite futuro aplicavel | Estado final e `closed_at`. |
| `paused` | `cancelled` | proprietario | Estado final e `cancelled_at`; historico preservado. |

`closed` e `cancelled` finais, transicoes e edicao livre de `draft` ja estao aprovados. Politica de edicao de `published` permanece pendente. Pausar, editar e retomar e recomendacao de MVP por preservar consistencia com propostas e descoberta, mas nao constitui requisito. Edicao de `paused`, semantica de republicacao e substituicao de oferta final devem acompanhar a politica aprovada.

## Autorizacao

Pipeline de toda mutacao:

1. Resolver sessao Better Auth no servidor.
2. Derivar `actorUserId` de `session.user.id`.
3. Consultar capacidade `provider` persistida.
4. Localizar oferta por ID privado e confirmar ownership sem enumerar recurso alheio.
5. Para publicar/retomar, exigir email verificado.
6. Validar estado, `revision`, campos, taxonomia e localizacao.
7. Escrever com ownership e revisao no predicado; incrementar revisao.
8. Retornar DTO privado allowlisted.

Criacao nao aceita `ownerId`; usa ator da sessao. IDs, papeis, capacidades, verificacao ou flags administrativas enviados pelo cliente nao participam da decisao. Visitante e utilizador autenticado podem ler contrato publico de oferta `published` sem capacidade especial. Administrador de taxonomia nao recebe edicao da oferta nem acesso a localizacao privada.

## DTOs

### `PublicOfferSummaryDTO` candidato

- `slug`, `title` e `description` como campos candidatos.
- IDs e nomes de categoria/subcategoria somente conforme politica taxonomica e allowlist aprovadas.
- `mode`, ja aprovado no dominio.
- Preco estruturado somente se modelo e exposicao forem aprovados.
- Localizacao publica da oferta somente apos allowlist e precisao proprias aprovadas.
- Nota de disponibilidade e prazo somente se modelo e exposicao forem aprovados.
- `publishedAt`/`lastPublishedAt` como campos candidatos.
- Resumo do prestador somente apos aprovar subconjunto proprio da allowlist do perfil.

### `PublicOfferDetailDTO`

Inclui os campos publicos do resumo. Nao inclui ID interno, `ownerUserId`, revisao, estado redundante, endereco, coordenada, qualidade/origem geografica, email, telefone, propostas, flags administrativas ou timestamps internos.

### `OwnerOfferDTO`

Contrato autenticado inclui ID interno, slug, campos editaveis, estado, revisao, timestamps e localizacao privada/operacional estritamente necessaria ao formulario do proprietario. Ainda e allowlist: nao incorpora entidade Better Auth, perfil completo, sessoes, permissoes ou propostas.

Queries publicas selecionam somente colunas permitidas. Nao carregam entidade completa para remover campos depois.

## Descoberta e Perfil Publico

Descoberta considera ofertas `published`; desativacao posterior de sua categoria ou subcategoria nao as remove dos resultados. Filtros propostos: texto publico, categoria, subcategoria, modalidade, tipo/faixa de preco e localizacao/distancia quando origem valida for fornecida. Ordenacao default proposta e publicacao mais recente, com identificador como desempate estavel; proximidade usa distancia em linha reta e desempate estavel. Estrutura de calculo, raio default e unidade de apresentacao aguardam aprovacao.

Perfil publico de prestador consulta ofertas pelo mesmo predicado publico e retorna DTO de resumo. Nenhuma lista e derivada de fixtures. Pausa, fechamento e cancelamento removem oferta conforme ciclo aprovado; desativacao taxonomica posterior nao remove oferta que continua `published`.

## Integracao Futura com Propostas

Oferta elegivel para nova proposta deve estar `published` e ter autor diferente do proprietario. Efeito de taxonomia posteriormente desativada sobre novas propostas permanece pendente e nao pode ser derivado da visibilidade publica. Criacao de proposta deve revalidar a politica futura no mesmo momento atomico da escrita. `paused`, `closed` e `cancelled` recusam proposta.

Aceite futuro executa uma transacao que bloqueia a oferta e propostas concorrentes, confirma oferta ainda `published` ou `paused` conforme regra do dominio de propostas, aceita no maximo uma proposta, fecha concorrentes `pending`, muda oferta para `closed` e incrementa revisao. Constraint/lock deve tornar impossivel dois aceites. Esta mudanca apenas reserva compatibilidade; nao cria tabela, endpoint ou comportamento de propostas.

## Contratos HTTP Propostos

### Publicos

| Metodo e rota | Resultado |
| --- | --- |
| `GET /api/offers` | Pagina cursor-based de `PublicOfferSummaryDTO`; filtros publicos allowlisted. |
| `GET /api/offers/{slug}` | `PublicOfferDetailDTO` somente para oferta `published`; demais casos retornam `404`. |

### Autenticados

| Metodo e rota | Resultado |
| --- | --- |
| `POST /api/me/offers` | Cria rascunho para ator `provider`; payload pode ser parcial, nao aceita owner/status e nao exige revisao previa. |
| `GET /api/me/offers` | Lista ofertas do ator, todos os estados, por cursor. |
| `GET /api/me/offers/{id}` | Retorna `OwnerOfferDTO` owner-only. |
| `PATCH /api/me/offers/{id}` | Proposta: edita `draft`; edicao de `paused` e `published` depende da politica pendente; exige `expectedRevision`. |
| `POST /api/me/offers/{id}/publish` | `draft -> published`; exige verificacao e o contrato minimo que vier a ser aprovado. |
| `POST /api/me/offers/{id}/pause` | `published -> paused`. |
| `POST /api/me/offers/{id}/resume` | `paused -> published`; revalida contrato completo. |
| `POST /api/me/offers/{id}/close` | `published|paused -> closed`. |
| `POST /api/me/offers/{id}/cancel` | `published|paused -> cancelled`. |

Rotas de acao tornam transicoes explicitas e evitam PATCH arbitrario de `status`. Resposta de mutacao inclui nova revisao. Chave de idempotencia para criacao permanece proposta futura; transicoes repetidas retornam conflito em vez de inventar transicao.

### Erros

| Codigo | Uso |
| --- | --- |
| `400` | Payload ou filtro malformado sem semantica de campo util. |
| `401` | Sessao ausente, expirada, revogada ou forjada em rota privada. |
| `403` | Capacidade `provider` ausente ou email nao verificado; codigo seguro distingue gate acionavel. |
| `404` | Slug publico inelegivel, oferta privada inexistente ou recurso alheio nao enumeravel. |
| `409` | Revisao obsoleta, transicao invalida, slug raro em colisao nao recuperada ou conflito concorrente. |
| `422` | Campos, preco, prazo, modalidade, taxonomia ou localizacao semanticamente invalidos. |
| `503` | Banco/geocodificacao necessaria indisponivel; nao confirmar publicacao. |

Erros nao retornam SQL, endereco, coordenadas, existencia de oferta privada ou dado de outra identidade.

## Concorrencia

- Edicao e transicao usam `WHERE id=? AND owner_user_id=? AND revision=?`; zero linhas produz `409` ou `404` conforme ownership ja estabelecido sem vazamento.
- Publicacao/retomada e desativacao taxonomica coordenam por transacao, lock ou predicado condicional equivalente.
- Se publicacao confirma primeiro, desativacao posterior preserva oferta publicada e visivel. Se desativacao confirma primeiro, publicacao ou retomada falha sem mudar o estado da oferta. Nenhuma escrita pode confirmar nova publicacao em taxonomia ja inativa.
- Proposta futura valida estado sob lock; aceite usa single-winner atomico.
- Slug e protegido por unique constraint e geracao server-side com retry limitado.
- Nenhuma operacao usa check-then-write sem constraint, lock ou predicado de revisao correspondente.

## Estrategia de Migration Futura

1. Confirmar pendencias bloqueantes e escolher estrutura geografica no ambiente Neon alvo.
2. Se PostGIS for aprovado, validar extensao e adiciona-la em migration revisada, nunca no startup.
3. Criar enums/tabelas/constraints sem tocar fixtures demonstrativas.
4. Criar indices B-tree e somente o indice geografico correspondente a estrutura aprovada apos revisar SQL gerado pelo Drizzle Kit.
5. Aplicar com `DATABASE_URL_UNPOOLED`, primeiro em banco descartavel e depois por ambiente.
6. Testar rollback operacional por nova migration corretiva; nao reescrever migration aplicada.

Nao existe backfill a partir do catalogo demonstrativo. Importacao futura, se desejada, exige processo explicito e validacao como dados reais.

## Decisoes Ainda Pendentes

Estas recomendacoes nao estao aprovadas e bloqueiam somente a parte indicada:

| Problema | Alternativas | Consequencias | Recomendacao |
| --- | --- | --- | --- |
| Edicao de oferta `published` | pausar, editar e republicar; editar diretamente com revisao/auditoria e notificacao; criar versao nova e manter anterior ate ativacao | Pausa simplifica consistencia, mas retira oferta e cria friccao; edicao direta melhora UX, mas pode alterar base de propostas; versao preserva historico, mas aumenta schema, API e operacao. | Para MVP, recomendar pausa, edicao e republicacao por menor complexidade e maior previsibilidade. Recomendacao nao aprova nem autoriza esta politica. |
| Estrutura geografica | latitude/longitude convencionais; PostGIS `geography(Point,4326)`; abstracao de localizacao com backend evolutivo | Colunas comuns reduzem operacao e funcionam no PostgreSQL/Neon sem extensao adicional, mas Haversine, constraints e consistencia ficam sob responsabilidade da aplicacao/SQL e indices por distancia sao limitados; PostGIS oferece tipos, funcoes e indice espacial robustos, mas exige validar extensao no plano/regiao Neon, SQL/mapeamento Drizzle, migration, testes e operacao; abstracao reduz acoplamento e permite evoluir, mas exige contrato estavel, testes e plano de conversao disciplinado. | Para MVP de distancia em linha reta e volume ainda desconhecido, recomendar abstracao de dominio/API com latitude/longitude convencionais internamente, constraints explicitas e caminho testado para PostGIS quando planos de consulta e volume demonstrarem necessidade. Decisao permanece pendente. |
| Localizacao publica da oferta | nenhuma localizacao; cidade/regiao; cidade/regiao e area aproximada propria | Menos dados reduz risco e utilidade; mais detalhe melhora descoberta e aumenta reidentificacao. Perfil, oferta e pedido possuem finalidades diferentes. | Aprovar matriz campo x audiencia x finalidade x precisao antes de expor; autenticacao so amplia pedido pela regra atual, nao oferta. |
| Campos comerciais e publicacao | preco/disponibilidade/prazo opcionais como proposto; obrigatoriedade global; obrigatoriedade por categoria/modalidade | Opcional reduz friccao e comparabilidade; obrigatorio melhora descoberta e pode excluir casos; regras condicionais exigem governanca. | Validar com produto antes do schema; nao reutilizar opcionalidade aprovada para pedidos. |
| Quantidade de ofertas por prestador | sem quota; quota global; quota por plano/categoria/estado | Sem quota simplifica MVP e aumenta risco de abuso; quota exige valor, UX, concorrencia e excecoes; regras segmentadas ampliam complexidade comercial. | Nao impor limite sem evidencia e aprovacao; controlar abuso por politica separada, sem interpretar isso como aprovacao de quantidade ilimitada. |
| Limites de texto, preco e prazo | globais; por categoria; somente limites tecnicos amplos | Globais simplificam UX; por categoria exigem governanca; amplos reduzem protecao editorial. | Limites globais iniciais, revistos com evidencia. |
| Geocodificacao | provedor gerido; dados abertos/servico proprio; entrada manual verificada | Variam cobertura Portugal, custo, termos, cache, privacidade e operacao. | Comparar provedores por fonte oficial e oferecer confirmacao textual acessivel. |
| Precisao e raio | ponto exato interno; centroide/localidade; areas/poligonos | Mais precisao melhora distancia e aumenta risco; areas elevam complexidade. | Ponto operacional confirmado, nunca residencial por inferencia, com apresentacao textual menos precisa. |
| Retencao geografica | enquanto oferta existir; prazo apos final; minimizacao imediata | Afeta suporte, RGPD, propostas e recuperacao. | Definir com analise juridica e finalidade antes de dados reais. |
| Endereco privado | estruturado completo; codigo postal/localidade; nenhum endereco apos geocodificar | Correcao e auditabilidade competem com minimizacao. | Guardar somente componentes necessarios a correcao conforme retencao aprovada. |
| Moderacao de texto | reativa; preventiva; sem publicacao aberta | Muda risco, custo e tempo de publicacao. | Politica reativa e denuncia antes de escala, sujeita a revisao juridica. |
| Radius/default de busca | fixo; escolhido pelo utilizador; nenhum default | Afeta resultados, explicabilidade e desempenho. | Exigir escolha/localidade ate evidencia justificar default. |
| Exclusao de conta/oferta | restrict e anonimizacao; cascade; retencao legal | Pode quebrar historico de propostas e privacidade. | Restrict inicialmente; decidir anonimizacao/retencao com dominios relacionados. |
| Desativacao de capacidade | bloquear; pausar ofertas; permitir apenas acoes protetivas | Pode deixar oferta publica sem prestador elegivel ou impedir proprietario de encerra-la. | Manter desativacao indisponivel ate politica atomica propria pausar ofertas e preservar gestao segura. |
| Idempotencia de criacao | chave HTTP; deduplicacao por payload; nenhuma | Chave evita duplicacao por retry; exige armazenamento/expiracao. | Chave de idempotencia server-side quando API de escrita for implementada. |
| Rate limits | por IP; por conta; combinados/distribuidos | IP pune redes partilhadas; conta nao cobre anonimos; combinado custa mais. | Combinado, com storage distribuido e valores medidos antes de producao. |

Imagens/anexos permanecem fora ate decisao de storage, tipos, tamanho, malware, licenca, consentimento, moderacao, acessibilidade, remocao e autorizacao.

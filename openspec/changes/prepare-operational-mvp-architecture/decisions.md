# Registro de Decisoes do MVP Operacional

Atualizado em 2026-10-29. "Confirmado" registra decisao do responsavel pelo produto ou escolha tecnica ja aprovada. "Recomendado" nao autoriza implementacao. "Pendente" exige aprovacao ou pesquisa.

## Confirmado

| Item | Registro |
| --- | --- |
| Arquitetura | Monolito full-stack em Node.js, Next.js App Router e TypeScript. |
| Dados | PostgreSQL gerenciado pelo Neon, inicialmente considerando infraestrutura gratuita. Adequacao e limites vigentes devem ser verificados. |
| Acesso a dados | Drizzle ORM para acesso e migracoes em mudanca futura. |
| Metodo | Desenvolvimento incremental com SDD/OpenSpec. |
| Mercado e idioma | Portugal e PT-PT como direcao de produto, sem validacao comercial concluida. |
| Modelos de publicacao | Dois recursos distintos: oferta de servico criada por prestador e pedido de servico criado por cliente. Nao sao automaticamente um unico registro fisico. |
| Propostas | Cliente pode propor a oferta; prestador pode propor ao pedido. Envio exige autenticacao. |
| Descoberta publica | Ofertas `published` e disponiveis podem ser consultadas por visitante sem autenticacao. Rascunhos e propostas permanecem privados. |
| Localizacao | Publicacoes presenciais e hibridas terao suporte a localizacao detalhada e calculo de distancia desde o primeiro incremento. Isso nao aprova exposicao publica de morada completa. |
| Modalidade | `remote`, `in_person` e `hybrid`; remoto exclusivo nao exige localizacao operacional. |
| Taxonomia | Categorias/subcategorias com IDs estaveis e governanca; lista extensa nao esta aprovada. |
| Acessibilidade | Requisito central. WCAG 2.2 AA e referencia de projeto, nao certificacao ou declaracao legal. |
| Limite comercial | Decisoes acima nao alteram H-01 a H-09 nem provam procura, segmento, cobertura ou viabilidade. |

## Recomendado, Aguardando Confirmacao

| Item | Recomendacao | Motivo e limite |
| --- | --- | --- |
| Estrutura de dominio | Agregados separados `ServiceOffer` e `ServiceRequest`; componentes compartilhados para taxonomia, modalidade, localizacao, pesquisa e proposta. | Evita combinacoes invalidas e mantem regras de ownership/audiencia explicitas. Estrutura fisica continua pendente. |
| Estados | Oferta: `draft`, `published`, `withdrawn`, com disponibilidade separada `available`/`unavailable`. Pedido: `draft`, `published`, `withdrawn`, com necessidade `open`/`paused`/`fulfilled` somente onde aprovada. | Separar publicacao de disponibilidade evita sobrecarregar estado. `fulfilled` e efeito de aceitacao continuam pendentes. |
| Proposta | Uma entidade com tipo de origem obrigatorio (`offer` ou `request`), exatamente um recurso de origem, autor e destinatario derivados. | Compartilha invariantes sem fundir publicacoes. Aceitacao nao entra no incremento inicial. |
| Oferta publica | Expor somente campos aprovados da oferta, area aproximada e identidade minima necessaria. | Catalogo publico nao autoriza publicar email, morada detalhada, coordenada exata, propostas ou dados privados. |
| Pedidos | Comparar tres audiencias antes de escolher: publico com campos controlados; somente autenticados; somente prestadores elegiveis. | Escolha depende de aquisicao, risco de reidentificacao, seguranca do cliente e operacionalizacao de elegibilidade. |
| Geografia | Preferir PostgreSQL com PostGIS e coluna `geography(Point,4326)` para ponto operacional, mantendo endereco estruturado privado e representacao publica separada. | Facilita indice e distancia em metros. Requer confirmar extensao Neon, integracao Drizzle e complexidade operacional. Nao aprovado. |
| Geocodificacao | Geocodificar no servidor endereco explicitamente fornecido; permitir correcao e fluxo manual quando indisponivel; nunca enviar morada a mais provedores que o necessario. | Provedor, termos, cache, retencao, custo e cobertura Portugal continuam pendentes. |
| Mapas | Nao tornar mapa requisito do primeiro incremento; pesquisa, introducao e resultados devem funcionar por endereco/localidade e lista textual. | Reduz dependencia/custo e preserva acessibilidade. Se mapa for aprovado, sera complemento. |
| Distancia | Calcular distancia geodesica entre ponto de pesquisa autorizado e ponto/area operacional; ordenar por distancia com desempate estavel por ID quando usuario escolher proximidade. | Algoritmo exato e precisao continuam pendentes. Distancia em linha reta nao representa rota/tempo. |
| Pesquisa minima | Texto nos campos publicos aprovados, categoria, subcategoria, modalidade, elegibilidade por estado/audiencia e ordenacao estavel. | Previsivel e testavel; relevancia avancada e personalizada ficam adiadas. |
| Autenticacao | Better Auth como candidato, sujeito a versoes, email, sessoes, revogacao, abuso e operacao. | Recomendacao anterior permanece nao aprovada. |
| Conta | Uma conta pode atuar nos dois contextos. Papel da acao deriva do recurso e da sessao, nao de seletor ou ID enviado pelo cliente. | Evita contas duplicadas e escalonamento de privilegio. |

## Comparacao Pendente: Visibilidade dos Pedidos

| Opcao | Beneficio | Risco/custo |
| --- | --- | --- |
| Publico com campos controlados | Maior descoberta e indexacao; menor friccao para perceber procura. | Maior risco de expor rotina, domicilio, urgencia e identidade; exige redacao, localizacao aproximada, moderacao e revisao juridica rigorosas. |
| Somente autenticados | Reduz indexacao e scraping casual; permite termos e controlos de conta. | Autenticacao nao prova legitimidade; adiciona friccao e ainda exige minimizacao/rate limit. |
| Somente prestadores elegiveis | Maior controlo por categoria, area e estado de conta. | Elegibilidade ainda nao definida; aumenta dados, autorizacao, explicabilidade e risco de falsa garantia. |

**Estado:** pendente de aprovacao do responsavel pelo produto. Ate decisao, documentacao nao presume pedidos publicos.

## Decisoes Pendentes Antes de Implementar

| Item | Pergunta a resolver | Evidencia/aceite necessario |
| --- | --- | --- |
| Geocodificacao | Qual modelo e provedor? Geocodificacao sob demanda, base propria ou servico gerenciado? | Fonte oficial atual; termos, cobertura Portugal, cache/retencao, atribuicao, limites, custo, privacidade, disponibilidade e degradacao. |
| Armazenamento geografico | PostGIS `geography`, coordenadas numericas ou outra estrutura? | Suporte Neon/Drizzle, indice, constraints, precisao, migracao e operacao comparados. |
| Provedor de mapas | Mapa e necessario? Se sim, qual fornecedor/renderizacao? | Fonte oficial atual, termos, atribuicao, custo/limites, privacidade, acessibilidade e fallback textual. |
| Algoritmo de distancia | PostGIS geodesico, Haversine na aplicacao ou outro? | Unidade, precisao, desempenho, indice, casos de teste e declaracao de que nao representa rota. |
| Visibilidade dos pedidos | Qual das tres audiencias comparadas sera adotada? | Campos publicos, elegibilidade, localizacao, identidade e resposta de autorizacao aprovados. |
| Precisao geografica | Que precisao e guardada, usada e mostrada por operacao? | Matriz por perfil/oferta/pedido, modalidade, pesquisa, proposta e fase do ciclo. |
| Retencao/exposicao geografica | Por quanto tempo guardar endereco, coordenada e consultas; quem acessa? | Finalidade, base juridica, titulares, logs/backups, correcao, eliminacao e resposta a incidente. |
| Aceitacao de proposta | O que constitui aceitar e o que acontece com publicacao e outras propostas? | Transicoes, concorrencia, notificacao e reversao documentadas. Fora do primeiro incremento ate decisao. |
| Campos minimos | Quais campos de oferta e pedido sao obrigatorios por modalidade/categoria? | Validacao de produto, privacidade e acessibilidade. |
| Taxonomia | Quais categorias iniciais e quais sao proibidas/reguladas? | Validacao editorial/comercial e analise juridica por categoria. |
| Autenticacao | Biblioteca, versoes, email/senha, verificacao, recuperacao e sessoes? | Compatibilidade e politica operacional aprovadas. |
| Email | Qual provedor, dominio e politica de entrega/retencao? | Limites e termos oficiais verificados na data de escolha. |
| Rate limiting | Quais limites para auth, publicacao, pesquisa/geocodificacao e propostas? | Chaves, janelas, armazenamento, respostas e observabilidade. |
| Neon | Regiao, plano, extensao geografica, ambientes, conexoes e recuperacao? | Confirmacao oficial atual e teste futuro em ambiente aprovado. |
| Seguranca/privacidade | Logs, exclusao de conta, incidentes, scraping, enumeracao e abuso? | Politicas minimas antes de dados reais/publicacao aberta. |
| Legal | RGPD, DSA, DAC7, consumo, e-commerce e categorias locais? | Analise juridica aplicavel; este documento nao declara conformidade. |
| Git | Repositorio proprio ou convencao externa? | Ownership e `.gitignore` confirmados antes de escrita Git. |

## Adiavel para Etapas Posteriores

- Aceitacao, rejeicao e retirada de propostas, enquanto seu efeito de produto nao for aprovado.
- Mensagens, notificacoes, pagamentos, contratos, disputas, conclusao, avaliacoes e verificacao profissional.
- Rotas/tempo de viagem, areas poligonais complexas, localizacao em tempo real e mapas avancados.
- Relevancia personalizada, recomendacao automatica, multi-categoria e taxonomia extensa.
- Expansao internacional e categorias reguladas sem preparacao propria.

## Regra Minima de Seguranca para Categoria Inativa

Enquanto taxonomia concreta permanece pendente, comportamento minimo nao permanece ambiguo: categoria desativada bloqueia nova publicacao/republicacao; publicacao existente sai da descoberta e deixa de receber propostas ate o proprietario reclassificar para subcategoria ativa; referencia historica e propostas existentes nao sao apagadas. Reorganizacao equivalente preserva ID; mudanca semantica exige novo ID e comunicacao ao proprietario.

## Fontes Oficiais para Verificacao

Consulta documental em 2026-10-29; precos e limites externos devem ser revistos na data de decisao.

- [PostgreSQL: tipos geometricos](https://www.postgresql.org/docs/current/datatype-geometric.html).
- [PostGIS: tipo geography](https://postgis.net/docs/using_postgis_dbmanagement.html#PostGIS_Geography).
- [PostGIS: ST_Distance](https://postgis.net/docs/ST_Distance.html) e [ST_DWithin](https://postgis.net/docs/ST_DWithin.html).
- [Neon: extensao PostGIS](https://neon.com/docs/extensions/postgis).
- [Drizzle ORM: tipos PostgreSQL](https://orm.drizzle.team/docs/column-types/pg) e [SQL magico](https://orm.drizzle.team/docs/sql).
- [W3C: WCAG 2.2](https://www.w3.org/TR/WCAG22/).
- Fontes de autenticacao, email, Neon e conformidade ja registradas em [operational-readiness.md](operational-readiness.md).

## Limite com Validacao Comercial

`prepare-marketplace-product-validation` continua com entrevistas, demonstracoes e sintese reais pendentes. Marketplace bidirecional, Portugal, servicos locais/remotos, catalogo publico de ofertas e geolocalizacao sao decisoes de produto, nao evidencia de demanda ou adequacao comercial.

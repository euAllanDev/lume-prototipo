# Proposta: Ofertas de Servico Operacionais

## Objetivo

Especificar o dominio persistente de ofertas reais do Lume antes de qualquer implementacao. A mudanca define modelo, ciclo de vida, autorizacao, privacidade, integracoes, persistencia e contratos de API compativeis com Next.js, TypeScript, PostgreSQL Neon e Drizzle ORM.

## Motivacao

O produto ja possui catalogo demonstrativo, autenticacao, perfis e capacidades persistentes, mas ofertas ainda usam dados de demonstracao e nao possuem contrato operacional. Implementar sem esta especificacao permitiria ownership falsificavel, exposicao de localizacao, estados contraditorios e aceite concorrente de propostas.

## Escopo

- Entidade persistente `ServiceOffer` e localizacao operacional separada.
- Relacao com identidade Better Auth, perfil Lume, capacidade `provider` e taxonomia persistente.
- Classificacao dos campos propostos para publicacao e dos campos comerciais ainda pendentes.
- Estados `draft`, `published`, `paused`, `closed` e `cancelled` e suas transicoes.
- Policies owner-only, gate de email verificado e consulta publica.
- DTOs publicos e privados por allowlist.
- Integracao futura com descoberta, perfis publicos e propostas.
- Alternativas de constraints, indices, concorrencia e estrategia futura de migrations Drizzle, sem escolha geografica implicita.
- Contratos HTTP propostos, validacoes e erros.

## Fora de Escopo

- Codigo de aplicacao, alteracao de schema, migrations ou dependencias.
- Implementacao de propostas, pagamentos, contratos, mensagens, agendamentos, avaliacoes ou moderacao.
- Alteracao do prototipo raiz ou mistura entre fixtures demonstrativas e registros persistentes.
- Escolha de provedor de geocodificacao, politica de retencao geografica ou limites numericos ainda pendentes.
- Upload de imagens ou anexos.

## Decisoes Incorporadas e Origem

As seguintes regras ja estavam efetivamente aprovadas em mudancas normativas anteriores:

- Uma identidade pode acumular capacidades `client` e `provider`; oferta pertence ao `userId` unico, e ownership deriva da sessao.
- Criar rascunho exige sessao e capacidade `provider`; publicar exige email verificado.
- Oferta `published` e publica sem login; demais estados do ciclo aprovado nao sao publicos.
- Desativar categoria ou subcategoria bloqueia nova publicacao ou retomada nessa classificacao, mas ofertas ja `published` permanecem publicadas e visiveis, sem pausa ou encerramento automatico; referencias e historico sao preservados.
- Modalidade usa `remote`, `in_person` ou `hybrid`; oferta exclusivamente remota nao exige localizacao operacional.
- Ciclo de vida usa `draft`, `published`, `paused`, `closed` e `cancelled`, com as transicoes ja consolidadas.
- Distancia inicial, quando aprovada a estrutura geografica, representa linha reta e nao rota ou tempo de viagem.
- Dados sao privados por default; endereco completo e coordenadas exatas nao podem integrar projecao publica.
- Perfil publico mostra no maximo cidade e regiao; localizacao da oferta nao e copiada do perfil sem confirmacao.
- Aceite futuro de proposta fecha a publicacao atomicamente e impede aceite concorrente ou novas propostas.

O rastreio usa a precedencia documental declarada em `consolidate-lume-business-rules/proposal.md`: sua spec e `decisions.md` prevalecem sobre a preparacao arquitetural anterior. Assim, recomendacoes de `prepare-operational-mvp-architecture` nao sao aprovacoes, e itens que a consolidacao devolveu ao estado pendente continuam pendentes.

## Classificacao das Regras de Oferta

| Regra | Classificacao | Origem e limite |
| --- | --- | --- |
| Preco opcional | Decisao pendente | `consolidate-lume-business-rules` aprovou orcamento opcional somente para pedido. Opcionalidade, tipos e EUR para oferta sao proposta de produto deste incremento, nao regra aprovada. |
| Modalidade presencial, remota ou ambas | Ja aprovada | `prepare-operational-mvp-architecture/decisions.md` confirmou `remote`, `in_person` e `hybrid`; a consolidacao posterior nao revogou essa semantica. |
| Disponibilidade opcional | Decisao pendente | `prepare-operational-mvp-architecture/tasks.md` manteve regras de disponibilidade de oferta por aprovar. Nota textual opcional e proposta de produto deste incremento. |
| Prazo opcional | Decisao pendente | Nenhuma fonte normativa aprova prazo para oferta. Intervalo em dias e proposta de produto deste incremento. |
| Requisitos minimos para publicacao | Decisao pendente | `prepare-operational-mvp-architecture/decisions.md` manteve campos minimos pendentes. Titulo, descricao, subcategoria ativa, nome de apresentacao como gate e detalhe geografico nao podem ser exigidos por inferencia; modalidade e ausencia de localizacao para oferta remota estao aprovadas isoladamente. |
| Quantidade de ofertas por prestador | Decisao pendente | Nenhuma fonte aprova quota nem quantidade ilimitada. Ambas sao escolhas de produto; implementacao nao pode inventar limite ou ausencia normativa de limite. |

Entre estas seis regras, somente a modalidade ja esta aprovada. Os modelos candidatos de preco, disponibilidade e prazo sao propostas tecnicas ou de produto, mas a escolha entre opcionalidade e obrigatoriedade continua sendo decisao pendente.

## Decisoes Pendentes

- Politica de edicao de oferta `published`: a consolidacao normativa declara esta regra pendente. Pausar antes de editar permanece recomendacao de MVP, nao decisao.
- Estrutura geografica: colunas convencionais, PostGIS ou abstracao evolutiva continuam em avaliacao. PostGIS nao esta aprovado.
- Localizacao publica da oferta e qualquer representacao aproximada adicional para utilizador autenticado: audiencia, campos e precisao continuam pendentes. A allowlist publica do perfil nao autoriza copiar ou ampliar localizacao da oferta.
- Preco, disponibilidade, prazo, campos minimos finais e eventual limite de ofertas por prestador.
- Identificador fisico, tipos comerciais, imagens/anexos e resumo exato do prestador permanecem propostas tecnicas ou de produto quando nao cobertos pelas allowlists aprovadas.
- Elegibilidade de ofertas em taxonomia posteriormente desativada para receber novas propostas permanece pendente; a decisao de visibilidade nao aprova esse comportamento.

## Impacto

Esta mudanca cria somente documentos em `openspec/changes/specify-operational-service-offers/`. Nao altera `web/`, schema Drizzle, migrations, banco, dependencias ou prototipo.

## Criterios de Aceite

- Requisitos possuem cenarios positivos, negativos, de privacidade e de autorizacao.
- Estados e transicoes nao excedem regras aprovadas.
- Contratos publicos usam allowlist e nunca retornam entidade persistente completa.
- Persistencia proposta e compativel com schema atual de identidade/perfil sem modifica-lo nesta mudanca.
- Pendencias permanecem identificadas, com alternativas e recomendacoes sem aprovacao implicita.
- `openspec validate --all --strict` termina sem erros.

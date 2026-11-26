# Tarefas: Especificacao Operacional de Ofertas

## 1. Contexto

- [x] 1.1 Ler blueprint, regras consolidadas, fundacao operacional, perfis/capacidades e mudancas anteriores.
- [x] 1.2 Inspecionar estrutura atual, schema Drizzle, migrations existentes e separacao dos dados demonstrativos.
- [x] 1.3 Resolver precedencia entre regras atuais, recomendacoes antigas e comportamento obsoleto do prototipo.
- [x] 1.4 Verificar origem de edicao publicada, desativacao taxonomica, PostGIS e regras comerciais sem tratar recomendacao como aprovacao.

## 2. Decisoes

- [x] 2.1 Classificar regras previamente aprovadas, propostas e pendentes pela fonte documental.
- [x] 2.2 Registrar alternativas e recomendacao nao vinculante para edicao de oferta publicada.
- [x] 2.3 Separar localizacao de perfil, oferta, audiencia autenticada e operacao privada.
- [x] 2.4 Comparar alternativas para taxonomia inativa e armazenamento geografico sem aprova-las.
- [x] 2.5 Registrar pendencias sem promove-las a requisito aprovado.
- [x] 2.6 Classificar preco, modalidade, disponibilidade, prazo, campos minimos e quantidade por prestador como aprovados, propostas ou pendentes conforme fonte.

## 3. Especificacao

- [x] 3.1 Documentar agregado, relacoes, constraints e indices como propostas sujeitas as decisoes bloqueantes.
- [x] 3.2 Definir ciclo de vida e consequencias de cada transicao.
- [x] 3.3 Definir autorizacao server-side, ownership e gates de capacidade/verificacao.
- [x] 3.4 Definir limites aprovados dos DTOs e deixar campos/precisao da localizacao da oferta pendentes.
- [x] 3.5 Definir integracoes com taxonomia, descoberta, perfis e propostas futuras.
- [x] 3.6 Definir contratos HTTP, validacoes, erros e concorrencia.
- [x] 3.7 Definir estrategia futura de migration sem criar migration nesta mudanca.

## 4. Validacao

- [x] 4.1 Executar `openspec validate --all --strict`.
- [x] 4.2 Confirmar que somente os quatro documentos autorizados desta mudanca OpenSpec foram alterados.

## 5. Implementacao Futura Bloqueada

- [ ] 5.1 Aprovar pendencias necessarias antes de schema ou API reais.
- [ ] 5.2 Criar change separada para implementar schema, migration, servicos, endpoints e testes.
- [ ] 5.3 Criar change separada para propostas; preservar aceite exclusivo e atomico.
- [x] 5.4 Aprovar efeito da desativacao taxonomica: preservar ofertas publicadas e visiveis, bloquear novas publicacoes/retomadas e manter historico sem transicao automatica.
- [ ] 5.5 Aprovar preco, disponibilidade, prazo, campos minimos finais e eventual quota por prestador.
- [ ] 5.6 Aprovar matriz de localizacao da oferta por campo, audiencia, finalidade e precisao.
- [ ] 5.7 Decidir se nome de apresentacao do perfil sera requisito para publicar oferta; allowlist publica do perfil, isoladamente, nao cria esse gate.
- [ ] 5.8 Aprovar politica de edicao publicada.
- [ ] 5.9 Aprovar estrutura geografica.
- [ ] 5.10 Aprovar elegibilidade para novas propostas quando taxonomia de oferta publicada for desativada.

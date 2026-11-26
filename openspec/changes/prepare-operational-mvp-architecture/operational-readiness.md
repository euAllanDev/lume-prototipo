# Prontidao Operacional: Stack, Dados, Localizacao e Servicos

Consulta em 2026-10-29. Este registro prepara implementacao futura. Nenhuma versao, provedor, configuracao, conta, banco, credencial, tabela, migracao ou funcionalidade foi criada nesta mudanca.

## Estados das Decisoes

| Tema | Estado | Registro |
| --- | --- | --- |
| Node.js, Next.js App Router, TypeScript, Drizzle e Better Auth | Recomendado, aguardando aprovacao | Conjunto de versoes abaixo foi verificado nas fontes oficiais; instalar e fixar lockfile pertencem a mudanca futura. |
| Better Auth | Recomendado, aguardando aprovacao | Candidato preferencial, nao escolha definitiva. |
| Resend | Recomendado, aguardando aprovacao | Provedor transacional candidato; exige conta, chave e dominio verificado em etapa futura. |
| Brevo | Pendente de pesquisa | Alternativa comparada. Confirmar requisitos de conta, dominio e limites no dia de adesao. |
| Mailpit local | Adiavel para etapa futura | Alternativa sem envio externo para desenvolvimento e testes; somente se equipe decidir instalar ferramenta local. |
| Regiao Neon e topologia projeto/branch | Pendente de pesquisa | Dependem de deploy, usuarios, requisitos de dados e limites vigentes. |
| Git proprio de `prototipo/` | Recomendado, aguardando aprovacao | Estrategia proposta; nao executar antes de confirmar ownership e convencoes. |
| Portugal/PT-PT e escopo dual | Confirmado para preparacao documental | Mercado inicial, idioma inicial e inclusao de servicos digitais e locais foram confirmados pelo responsavel do produto; nao validam demanda, segmento, categoria prioritaria ou cobertura local. |
| Oferta e pedido | Confirmado pelo produto | Prestador publica oferta; cliente publica pedido. Estrutura fisica, campos finais e audiencia do pedido continuam pendentes. |
| Ofertas publicas | Confirmado pelo produto | Visitante consulta oferta publicada/disponivel; proposta exige autenticacao. Allowlist publica e protecao contra abuso ainda precisam implementacao futura. |
| Localizacao e distancia | Confirmado no escopo funcional | Publicacoes presenciais/hibridas terao localizacao detalhada e calculo de distancia no primeiro incremento. Estrutura, provedor, algoritmo, precisao, exposicao e retencao nao estao aprovados. |
| PostGIS | Recomendado, aguardando aprovacao | Candidato para pontos, raio e distancia geodesica no PostgreSQL/Neon; confirmar extensao, plano/regiao, Drizzle, indices e operacao antes de adotar. |
| Geocodificacao e mapas | Pendente de pesquisa | Nenhum provedor escolhido. Verificar fontes oficiais, termos, cobertura Portugal, atribuicao, cache, retencao, limites, custo, privacidade e acessibilidade. |
| Conformidade Portugal | Pendente de analise juridica | RGPD, DSA, DAC7 e regras condicionadas por modelo devem ser resolvidos antes de dados reais ou publicacao aberta. |

## Versoes Compativeis

| Componente | Recomendacao | Faixa compativel documentada | Motivo |
| --- | --- | --- | --- |
| Node.js | `26.13.0` LTS | `>=20.9`; usar somente linha LTS suportada | Next.js requer no minimo Node 20.9. Node oficial recomenda Active LTS ou Maintenance LTS para producao. Node 26 e LTS atual e evita linha 22, cujo suporte terminou em 2026-10-20. |
| Next.js App Router | `16.4.3` | `16.x` estavel, com Node `>=20.9` | Release estavel atual, App Router oficial, suporte TypeScript embutido e integracao Better Auth declarada para Next 16. Nao usar canary. |
| TypeScript | `5.9.3` | `>=5.1 <6.0` | Next exige no minimo 5.1. Fixar ultimo patch 5.9 da linha estavel evita adotar TypeScript 6 sem validacao conjunta. |
| Drizzle ORM | `0.45.4` | `0.45.x` | Ultima versao estavel publicada no npm durante consulta. Drizzle 1.0 permanece beta na documentacao, portanto fica excluido para primeiro incremento. Usar mesma linha para `drizzle-kit` apos confirmar matriz exata no lockfile. |
| Better Auth | `1.7.14` | `1.7.x` | Ultima versao estavel publicada no npm durante consulta; integra Next 16 e adaptador Drizzle PostgreSQL. Fixar patch exato e revalidar releases/advisories na proposta de implementacao. |

Fontes oficiais e consulta em 2026-10-29:

- Node: [ciclo de releases](https://nodejs.org/en/about/previous-releases).
- Next.js: [instalacao e requisitos](https://nextjs.org/docs/app/getting-started/installation).
- TypeScript: [TypeScript 5.9](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-9.html).
- Drizzle: [releases e Neon](https://orm.drizzle.team/docs/get-started/neon-new) e [registro npm](https://www.npmjs.com/package/drizzle-orm).
- Better Auth: [instalacao](https://better-auth.com/docs/installation), [Next.js](https://better-auth.com/docs/integrations/next) e [registro npm](https://www.npmjs.com/package/better-auth).

## Better Auth: Confirmacao Tecnica

### Compatibilidade e integracao

- App Router: documenta Route Handler `GET`/`POST` sob `/api/auth/[...all]`, uso em Server Components e Server Actions. Para Next 16, documenta `proxy.ts`; validacao de sessao continua obrigatoria em paginas, handlers e mutacoes protegidas.
- Node.js: fluxo usa runtime Node, inclusive `scrypt` nativo para hash de senha. Com Node 26 LTS satisfaz minimo do Next. Confirmar `engines` do pacote exato antes de instalar.
- PostgreSQL/Drizzle: adaptador oficial `@better-auth/drizzle-adapter` suporta provider `pg`. Dados de usuario, conta, verificacao e sessao ficam no PostgreSQL Neon; schema gerado deve entrar na revisao unica das migracoes Drizzle, nunca ser aplicado automaticamente por esta preparacao.
- E-mail/senha: suportado quando `emailAndPassword.enabled` e ativado. Padrao de senha e minimo 8, maximo 128; hash padrao e `scrypt`.
- Verificacao: exige callback `sendVerificationEmail`; tokens expiram em 3600 s por padrao. Recomendar `requireEmailVerification: true`, `sendOnSignUp: true` e politica de erro anti-enumeracao, sujeito a aprovacao de produto.
- Recuperacao: exige callback `sendResetPassword`; token padrao expira em 3600 s. Recomendar `revokeSessionsOnPasswordReset: true` e transacoes do adaptador Drizzle explicitamente habilitadas para que reset, revogacao e senha sejam atomicos.
- Sessoes: cookie com identificador opaco e sessao em banco; padrao expira em 7 dias e atualiza a cada 1 dia. Listagem e revogacao de sessoes existem. Nao habilitar cache de cookie inicialmente: revogacao em outro dispositivo pode permanecer valida ate expirar cache.

### Abuso, seguranca e limites

- Rate limit integrado fica ativo por padrao somente em producao, inativo em desenvolvimento; defaults sao janela de 10 s e maximo 100, com armazenamento em memoria. Isto nao basta para varias instancias/serverless nem define limites para cadastro, login, reset e reenvio. Antes de producao, aprovar regras por rota e armazenamento compartilhado ou banco, alem de observabilidade sem dados pessoais.
- Manter verificacoes CSRF e de origem ativas. Definir `BETTER_AUTH_URL` explicitamente e lista minima de `trustedOrigins`; nao confiar em Host ou headers encaminhados sem proxy confiavel configurado.
- `BETTER_AUTH_SECRET` requer alta entropia e pelo menos 32 caracteres. Guardar somente em cofre de segredos; planejar rotacao com `BETTER_AUTH_SECRETS`, sem registrar valores.
- Email de verificacao e reset deve ser disparado sem aguardar resposta para reduzir vazamento temporal; ambiente serverless requer mecanismo equivalente a `waitUntil` para nao abortar envio.
- Better Auth nao elimina autorizacao por recurso, rate limit de mutacoes de dominio, captcha/desafio quando risco justificar, nem tratamento operacional de bounces, abuso de email e suporte de conta.

### Custos e dependencias

Better Auth e pacote de aplicacao, mas nao substitui banco Neon, hosting, dominio, DNS, servico de e-mail, observabilidade nem armazenamento compartilhado para rate limit distribuido. Nenhum custo obrigatorio da biblioteca foi encontrado na documentacao consultada; custos e limites desses fornecedores devem ser revistos antes de producao.

Limitacao relevante: Better Auth exige campo `name` no cadastro padrao por email/senha. Escopo atual trata nome como opcional. Antes de implementar, aprovar se nome de exibicao sera coletado no cadastro, se sera um valor neutro temporario com posterior edicao, ou se configuracao/schema permitira fluxo alternativo. Nao inventar valor nem coletar dado sem essa decisao.

Alternativas se aprovacao nao ocorrer: Clerk para identidade e e-mail gerenciados, com dependencia externa e plano a revisar; Auth.js exige desenho proprio para credenciais, hash, recuperacao e rate limit. Nenhuma alternativa esta aprovada.

Fontes oficiais: [email/senha, verificacao e reset](https://better-auth.com/docs/authentication/email-password), [sessoes](https://better-auth.com/docs/concepts/session-management), [opcoes, rate limit, segredo e origens](https://better-auth.com/docs/reference/options), [adaptador Drizzle](https://better-auth.com/docs/adapters/drizzle).

## Email Transacional

| Opcao | Verificacao e reset | Desenvolvimento e producao | Gratuito consultado em 2026-10-29 | Dominio e integracao | Risco/custo |
| --- | --- | --- | --- | --- | --- |
| Resend | Aplicacao chama API/SMTP a partir dos callbacks Better Auth. | API REST, SMTP e SDK Node oficial; adequado ao App Router em runtime servidor. | Free: 3.000 emails/mes, maximo 100/dia, 3 dominios e 3 inboxes. Sem overage no Free; limites interrompem fluxo, nao assumir suficiencia. | Producao requer dominio proprio verificado, SPF/DKIM e recomendacao de subdominio. Chave `RESEND_API_KEY` somente no servidor. | Dependencia de conta, DNS, reputacao e plano. Pro sobe para USD 20/mes; uso, termos e precos podem mudar. |
| Brevo | Aplicacao chama API ou SMTP nos callbacks Better Auth. | API REST, SMTP, webhooks e plano Free. | Free sem cartao; apos aprovacao de conta para envio, ate 300 emails/dia. Pagina nao informa teto mensal fixo; nao tratar como capacidade garantida. | Conta, aprovacao para envio e remetente/dominio verificado devem ser confirmados. | Dependencia de aprovacao de conta e politica comercial; planos pagos partem de 5.000 emails/mes. |
| Mailpit local | Captura mensagens de verificacao/reset; nao entrega para destinatario externo. | SMTP local, interface web e API de testes. | Software local; nao ha cota de envio externo pois nao entrega fora do ambiente. | Nenhum dominio ou conta. Integrar por SMTP em ambiente local; nao usar em producao. | Exige processo/ferramenta local; nao valida entregabilidade real. |

Recomendacao, nao decisao: Resend para primeiro incremento por documentar API/SMTP, SDK Node e limite gratuito explicitamente. Usar Mailpit no desenvolvimento local para evitar envio real. Escolha de Resend exige confirmacao explicita, dominio adquirido/controlado, DNS verificado e avaliacao de volume antes de dados reais. Brevo permanece alternativa se limite diario, canal SMTP e aprovacao de conta forem mais adequados.

Fontes oficiais: [precos Resend](https://resend.com/pricing), [dominio Resend](https://resend.com/docs/add-a-domain), [Next.js Resend](https://resend.com/docs/send-with-nextjs), [precos Brevo](https://www.brevo.com/pricing/), [Mailpit](https://mailpit.axllent.org/docs/).

## Neon: Configuracao Minima Futura

1. Criar ambientes isolados antes de dados reais: projeto Neon de producao e projeto separado de desenvolvimento e teste e recomendacao mais segura. Branches podem ser usados dentro de cada projeto para preview, somente apos revisar limite de plano, acesso e expirar branches temporarias. Nunca compartilhar URL, role ou dados de producao com desenvolvimento, teste ou preview.
2. Regiao permanece pendente. Portugal e mercado inicial pretendido, mas escolher com base em regiao do deploy, usuarios, residencia de dados e requisitos aplicaveis; regioes de exemplos nao provam conformidade.
3. Nomes propostos, todos secretos e somente servidor: `DATABASE_URL` para string pooled da aplicacao; `DATABASE_URL_UNPOOLED` para string direta de Drizzle Kit. Por ambiente, valores distintos. Segredos ficam em `.env.local` ignorado no desenvolvimento e cofre do deploy em producao; nunca em `NEXT_PUBLIC_*`, Git, log ou mensagem de erro.
4. Requisicoes web usam string pooled, cujo hostname inclui `-pooler`; Neon usa PgBouncer em modo transaction. Migracoes, `pg_dump`, replicacao, queries com estado de sessao e tarefas administrativas usam string direta. Pooler nao suporta `SET`, `LISTEN/NOTIFY`, tabelas temporarias persistentes nem SQL `PREPARE`/`DEALLOCATE`.
5. Processo Drizzle futuro: alterar schema em proposta aprovada; gerar migracao versionada; revisar SQL e ambiente alvo; aplicar uma vez por ambiente com `DATABASE_URL_UNPOOLED`, fora da requisicao; verificar resultado. Nao usar `push` contra producao como atalho. Gerar schema Better Auth e schema de dominio deve resultar em migracoes revisadas, nao em CLI de aplicacao automatica.
6. Testes usam URL de ambiente `test` isolado, preferencialmente branch/projeto descartavel sem dados pessoais. CI e desenvolvimento devem falhar ao iniciar se receberem identificador/URL de producao. Credenciais separadas por ambiente reduzem erro humano; protecao de branch e menor privilegio devem ser avaliados no provisionamento.

Fontes oficiais: [pooling](https://neon.com/docs/connect/connection-pooling), [projetos e branches](https://neon.com/docs/manage/projects), [Drizzle com Neon](https://neon.com/docs/guides/drizzle).

## Prontidao Geoespacial

Localizacao detalhada e distancia pertencem ao primeiro incremento por decisao de produto. Esta secao compara preparacao tecnica; nao escolhe estrutura, geocodificador, mapa, algoritmo ou precisao.

### Armazenamento e calculo

| Opcao | Integracao | Operacao e privacidade | Estado |
| --- | --- | --- | --- |
| PostGIS `geography(Point,4326)` | PostgreSQL calcula distancia geodesica em metros com `ST_Distance` e filtra raio com `ST_DWithin`; indice espacial pode reduzir varredura. Neon documenta extensao PostGIS. Drizzle deve mapear tipo/SQL e migracao de forma revisada. | Uma extensao e SQL espacial aumentam conhecimento e testes, mas concentram calculo no banco. Endereco privado continua separado do ponto e da representacao publica. | Recomendado, nao aprovado. |
| Latitude/longitude numericas | Drizzle usa colunas numericas comuns; Haversine pode ser SQL tipado ou aplicacao. | Menor dependencia de extensao, porem exige constraints proprias, tende a perder indice espacial e pode duplicar formula/precisao entre caminhos. | Alternativa, nao aprovada. |
| Localidade/codigo postal sem ponto | Colunas textuais/relacionais comuns. | Menor precisao e menor exposicao, mas nao satisfaz sozinho calculo de distancia detalhado confirmado. Util como apresentacao/fallback. | Complemento, nao solucao unica. |

Recomendacao tecnica: avaliar primeiro PostGIS `geography(Point,4326)`, `ST_DWithin` para elegibilidade por raio e `ST_Distance` para distancia/ordenacao. Confirmar suporte real no Neon escolhido, extensao em todos ambientes, migration Drizzle, indice, unidade, precisao e comportamento em limites. Distancia geodesica nao e rota nem tempo de viagem.

Fontes oficiais consultadas em 2026-10-29:

- [Neon: PostGIS](https://neon.com/docs/extensions/postgis).
- [PostGIS: geography](https://postgis.net/docs/using_postgis_dbmanagement.html#PostGIS_Geography), [ST_Distance](https://postgis.net/docs/ST_Distance.html) e [ST_DWithin](https://postgis.net/docs/ST_DWithin.html).
- [Drizzle: tipos PostgreSQL](https://orm.drizzle.team/docs/column-types/pg), [tipos customizados](https://orm.drizzle.team/docs/custom-types) e [SQL](https://orm.drizzle.team/docs/sql).

### Geocodificacao

| Modelo | Beneficio | Dependencia e risco |
| --- | --- | --- |
| API gerenciada | Menor operacao inicial; cobertura, autocomplete e SLA podem estar documentados. | Conta/chave, custo/limites variaveis, termos de cache/retencao, transferencia de endereco e dependencia do fornecedor. |
| Servico publico baseado em dados abertos | Pode permitir prototipo de baixo custo e boa cobertura em Portugal conforme projeto. | Endpoint publico pode proibir carga comercial/intensa; exige atribuicao, rate limit e politica propria. Dados abertos nao tornam uso irrestrito. |
| Instancia/base propria | Maior controlo de consulta e retencao. | Importacao, atualizacao, armazenamento, compute, monitoramento e qualidade aumentam muito complexidade; dificilmente minimo gratuito operacional. |
| Sem geocodificacao automatica | Menor dependencia/transferencia. | Entrada manual de coordenada e inadequada para maioria e inacessivel como unico caminho; localidade sem ponto nao cumpre distancia detalhada. |

Nenhum provedor e recomendado formalmente sem pesquisa atual. Para cada candidato, verificar pagina oficial de termos/precos e documentacao tecnica na data da decisao: cobertura Portugal, formato de morada/codigo postal, qualidade retornada, autocomplete, cache, retencao, atribuicao, rate limit, disponibilidade, processamento de dados, regioes e custo. Nao reutilizar limites de memoria ou fontes secundarias.

Fluxo minimo futuro recomendado: servidor envia somente endereco necessario ao provedor aprovado; guarda origem/qualidade e ponto operacional conforme politica; utilizador confirma localidade; ambiguidade mantem rascunho; timeout nao perde formulario; rate limit protege custo/abuso; correcao textual existe sem mapa.

### Mapas

Mapa nao e requisito tecnico para pesquisa por proximidade. Lista textual com area e distancia, campo de localidade/endereco e confirmacao acessivel permitem primeiro incremento com menor dependencia. Se produto aprovar mapa, escolher provedor somente apos verificar oficialmente termos, atribuicao, custos/limites, telemetria, cookies, transferencia de dados, cobertura Portugal e suporte acessivel. Mapa permanece complemento; gestos, arrastar marcador ou visao espacial nunca sao caminho unico.

PostgreSQL/Neon com PostGIS e experiencia sem mapa podem permitir inicio sem provedor cartografico pago, dentro dos limites oficiais que estiverem vigentes. Geocodificacao continua dependencia separada: nenhum endpoint gratuito e assumido adequado a producao sem confirmar politica de uso, capacidade, privacidade e continuidade.

### Precisao, exposicao e retencao

Antes de coletar dados reais, aprovar matriz para:

- Localizacao de perfil, oferta, pedido e origem de pesquisa como finalidades distintas.
- Endereco privado, ponto operacional e etiqueta publica como camadas distintas.
- Precisao guardada, usada no calculo e exibida para cada recurso/modalidade/audiencia.
- Quem acessa cada camada e como acesso e auditado sem registrar conteudo sensivel.
- Retencao de endereco, coordenada, resposta do provedor, origem de pesquisa, logs e backups.
- Correcao/eliminacao e efeito sobre publicacoes/propostas existentes.

Ofertas publicas nao expoem morada/coordenada exata. Pedidos nao recebem visibilidade geografica por omissao enquanto audiencia estiver pendente. Logs excluem endereco, coordenada e consulta por padrao. Analise juridica deve avaliar base, transparencia, fornecedores, transferencias, direitos e eventual AIPD; este registro nao declara conformidade.

## Diagnostico e Estrategia Git

Consulta somente leitura em 2026-10-29:

- `git rev-parse --show-toplevel` em `C:\Users\as409\prototipo` retorna `C:\Users\as409`; `.git` esta em `C:\Users\as409\.git`. Nao existe `.git` em `prototipo/`.
- `git ls-tree -r --name-only HEAD` contem apenas `README.md`. `git ls-files` confirma que arquivos do projeto, inclusive OpenSpec, nao sao rastreados.
- `git status --short` lista `prototipo/` e muitos diretorios pessoais, configuracoes, artefatos e outros projetos como nao rastreados. Houve avisos de permissao para atalhos/diretorios pessoais do Windows durante leitura.
- Nenhum `.gitignore` foi encontrado em `prototipo/`; repositorio raiz tambem nao apresentou regra aplicavel a `prototipo/` na consulta. Portanto nao ha protecao versionada conhecida contra `.env`, `node_modules` ou outros segredos do projeto.
- Historico encontrado: apenas `a522fe2 first commit`. Diff de trabalho nao e base confiavel para este projeto, pois seus arquivos ainda nao pertencem a arvore rastreada.

Estrategia recomendada, nao executada:

1. Confirmar que `C:\Users\as409` nao e repositorio deliberado para todo perfil. Ele contem dados pessoais e projetos nao relacionados; nunca adicionar tudo na raiz.
2. Confirmar ownership de `prototipo/` e se algum fluxo externo espera que ele permaneca abaixo da raiz atual. Se nao houver dependencia, criar repositorio Git dedicado em `C:\Users\as409\prototipo` em etapa aprovada, com `.gitignore` revisado antes do primeiro add, incluindo `.env*` com excecao deliberada apenas para exemplo sem segredos, `node_modules/`, outputs de build e arquivos locais.
3. Fazer primeira inclusao por allowlist de arquivos do projeto, revisar `git status`, `git diff --cached` e detectar segredos antes de commit. Nunca usar `git add .` na raiz `C:\Users\as409`.
4. Se repositorio aninhado for vedado por convencao, mover ou definir worktree/raiz de projeto em mudanca aprovada, ainda com allowlist e `.gitignore`. Decidir antes de configurar deploy, segredos ou colaboracao.

## Confirmacoes Necessarias

- Aprovar conjunto de versoes e politica de atualizacao/lockfile.
- Aprovar Better Auth ou alternativa; decidir tratamento do campo `name`, verificacao obrigatoria, reset, expiracao/revogacao de sessao e rate limit distribuido.
- Aprovar Resend ou Brevo; confirmar dominio remetente, propriedade DNS, volume previsto e custo aceitavel.
- Definir regiao Neon, ambientes, projeto versus branch e responsaveis por credenciais/rotacao.
- Confirmar estrategia Git dedicada ou convencao existente antes de qualquer operacao de escrita Git.
- Aprovar audiencia dos pedidos e campos/localizacao visiveis; ofertas publicadas ja possuem consulta publica confirmada.
- Escolher armazenamento geografico, algoritmo de distancia, geocodificacao e eventual mapa; aprovar precisao, exposicao, retencao e fallback antes de qualquer coleta.
- Confirmar cobertura geografica operacional em Portugal e taxonomia inicial sem tratar essas escolhas como validacao comercial.
- Definir rate limiting e protecao contra scraping/custo para catalogo publico, geocodificacao, autenticacao e propostas.
- Obter analise juridica de RGPD, DSA em Portugal, DAC7 e obrigacoes condicionadas por modelo antes de dados reais ou publicacao aberta. Ver `decisions.md` para fontes e limites.

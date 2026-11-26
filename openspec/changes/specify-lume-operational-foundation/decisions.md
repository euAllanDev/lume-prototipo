# Decisoes e Auditoria da Fundacao Operacional

Atualizado em 2026-11-08. **Aprovada** vem do direcionamento desta tarefa ou de change precedente. **Recomendada** define caminho de implementacao compativel, sem alterar decisoes de produto. **Pendente** exige decisao antes de comportamento correspondente.

## Auditoria Atual

| Area | Estado observado | Impacto |
| --- | --- | --- |
| Aplicacao | `web/` usa Next.js `16.4.3`, React `19.3.0`, TypeScript strict e Tailwind v4. | Preservar App Router, alias `@/*`, Server Components por defeito e identidade White & Blue. |
| Dependencias | `package.json` nao contem Better Auth, Drizzle, driver PostgreSQL, Resend, Mailpit ou framework de testes de persistencia. | Primeiro incremento de implementacao instala e fixa versoes revisadas; esta change nao altera lockfile. |
| Configuracao | `next.config.ts` usa `cacheComponents`, `partialPrefetching` e Turbopack/Tailwind. `.gitignore` ignora `.env*`, exceto exemplo. Nao ha `.env.example`. | Adicionar somente contrato de ambiente sem segredos no incremento de implementacao. |
| Infraestrutura | Nenhum Dockerfile, compose ou configuracao local de banco/Mailpit existe. | Provisionamento local e de ambientes pertence a etapa futura de infraestrutura. |
| Estrutura | Existem `src/app`, `components`, `lib`, `types`, `features` e dados demonstrativos. `features` ainda nao contem autenticacao operacional. | Acrescentar fundacao dentro de estrutura existente; nao criar segunda aplicacao ou camada paralela. |
| Autenticacao UI | Rotas `/entrar`, `/criar-conta`, `/recuperar-senha`, `/redefinir-senha` e `/verificar-email` usam `DemoAuthForm`, `setTimeout` e mensagens que afirmam simulacao. | Substituir comportamento interno futuro sem redesenhar paginas, preservando responsividade e componentes partilhados. |
| Autorizacao | Nao ha sessao, banco, endpoint nem protecao de rota real. | Toda permissao futura precisa verificacao no servidor. |
| Testes | Auditorias atuais via CDP verificam layout e simulacao; nao ha testes de banco, auth ou autorizacao. | Fundacao exige testes unitarios/integracao e negativos de acesso. |

## Decisoes Tecnicas

| Tema | Situacao | Registro |
| --- | --- | --- |
| Monolito | Aprovada | Next.js App Router, Node.js e TypeScript mantem interface, handlers, logica e persistencia no mesmo repositorio/deploy. |
| Banco | Aprovada | PostgreSQL; Neon e opcao aprovada de hospedagem. Nao usar outro banco. |
| ORM | Aprovada para implementacao | Drizzle ORM `0.45.4` e Drizzle Kit `0.31.11` gerem schemas, queries e migrations. Nao comparar alternativa, pois Drizzle ja esta decidido em `prepare-operational-mvp-architecture`. |
| Autenticacao | Aprovada | Better Auth com email e palavra-passe. Better Auth `1.7.18` consultado declara peers para Next `^16`, React/React DOM `^19` e Drizzle `^0.45.2`; versao instalada deve ser revalidada no lockfile antes de escrita. |
| Driver PostgreSQL | Recomendada | Usar driver compativel com transacoes do adaptador Drizzle/Better Auth; `pg` satisfaz peer publicado de Drizzle. Necessario para reset atomico de senha e sessoes; confirmar conjunto exato na instalacao. |
| Email | Aprovada | Mailpit captura SMTP em desenvolvimento local; Resend e provedor inicial em producao atras de interface de envio. |
| Sessoes | Aprovada | Sessoes persistem no PostgreSQL e sao validadas no servidor. Nao habilitar cache de sessao em cookie inicialmente, pois revogacao deve ser observada sem janela adicional. |
| Verificacao | Aprovada | Email verificado e exigido apenas para publicar oferta, publicar pedido e enviar proposta. Nao bloquear login, logout, navegacao publica ou consulta de ofertas. |
| Identidade | Aprovada | Um utilizador possui uma identidade; capacidades cliente/prestador sao atribuicoes comerciais persistidas, iniciadas por escolha unica no cadastro, nunca contas duplicadas. |
| Administracao | Aprovada | Administrador exige permissao especifica e nao recebe acesso automatico a propostas, enderecos ou dados pessoais. |

## Pendencias Preservadas

1. Politica numerica de rate limit, expiracao customizada de sessao/tokens e estrategia distribuida de limite.
2. Recuperacao de palavra-passe: confirmacao de produto, copy e politica operacional; arquitetura fica preparada, integracao inicial pode ficar fora de escopo.
3. Retencao, exclusao, auditoria detalhada e tratamento juridico de dados pessoais.
4. Campos fisicos completos de perfil, capacidades futuras e permissoes administrativas alem de gerir taxonomia.
5. Regiao, plano, projetos/branches Neon, dominio remetente, DNS, custos e operacao de producao.
6. Provedor/tecnologia de geocodificacao, dados de oferta/pedido/proposta e regras operacionais adiadas.

## Implementacao 06.2

- Better Auth `1.7.18` e `@better-auth/drizzle-adapter` `1.7.18` usam Next.js `16.4.3`, React `19.3.0`, Drizzle ORM `0.45.4` e Drizzle Kit `0.31.4`; peers foram validados antes da instalacao.
- `user`, `account`, `session`, `verification` e `rate_limit` foram declaradas no schema Drizzle e entram na migration `0001_harsh_metal_master.sql`. Nenhuma migration executa no arranque.
- Email/password permite login sem email verificado. Verificacao e reset usam tokens Better Auth, SMTP/Mailpit fora de producao e Resend em producao; reset revoga sessoes.
- Sessao fica no PostgreSQL sem cookie cache. CSRF/origin check permanecem ativos, cookies seguros seguem ambiente e rate limit Better Auth usa PostgreSQL. Politica numerica e limite distribuido continuam pendentes para producao.
- `requireSession` e `requireVerifiedEmail` sao helpers server-side. Nenhum papel, capacidade ou privilegio administrativo foi adicionado.

## Fontes Oficiais Verificadas

- Better Auth: [Next.js](https://www.better-auth.com/docs/integrations/next), [email e palavra-passe](https://www.better-auth.com/docs/authentication/email-password), [sessoes](https://www.better-auth.com/docs/concepts/session-management), [Drizzle](https://www.better-auth.com/docs/adapters/drizzle), [opcoes](https://www.better-auth.com/docs/reference/options).
- Drizzle: [Neon](https://orm.drizzle.team/docs/get-started/neon-new).
- Neon: [connection pooling](https://neon.com/docs/connect/connection-pooling).
- Resend: [Next.js](https://resend.com/docs/send-with-nextjs).
- Mailpit: [documentacao](https://mailpit.axllent.org/docs/).

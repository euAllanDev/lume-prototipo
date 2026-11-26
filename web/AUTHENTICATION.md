# Autenticacao Lume

## Configuracao local

1. Copie `.env.example` para `.env.local` e preencha URLs PostgreSQL isoladas.
2. Defina `BETTER_AUTH_SECRET` com segredo aleatorio de pelo menos 32 bytes e `BETTER_AUTH_URL=http://localhost:3000`.
3. Execute Mailpit localmente com SMTP em `127.0.0.1:1025`; mantenha `SMTP_*` configurado no `.env.local`.
4. Execute `npm run db:migrate`, depois `npm run dev`.

Em producao, `NODE_ENV=production` seleciona Resend. Exige `RESEND_API_KEY` e `EMAIL_FROM` num dominio verificado. Sem provedor configurado, verificacao e recuperacao falham; nenhum fluxo afirma entrega bem-sucedida.

## Arquitetura

- `src/lib/auth.ts`: instancia Better Auth com adaptador Drizzle PostgreSQL e handler em `/api/auth/[...all]`.
- `src/lib/db/schema/auth.ts`: schema Better Auth controlado por Drizzle. Migration `drizzle/0001_harsh_metal_master.sql` cria `user`, `account`, `session`, `verification` e `rate_limit`.
- `src/lib/email/`: porta unica; SMTP/Mailpit fora de producao, Resend em producao.
- `src/lib/authorization/`: consulta sessao no servidor sem cache de cookie e helpers para sessao/verificacao.

Sessoes persistem no PostgreSQL por sete dias, renovadas diariamente. Cache de sessao em cookie permanece desligado para revogacao imediata. Recuperacao de palavra-passe invalida todas as sessoes. Cookies seguem `HttpOnly` e `Secure` em producao; Better Auth mantem verificacao de origem e CSRF ativas.

Palavras-passe precisam de 8 a 128 caracteres, pelo menos uma letra maiuscula e um numero. Interface, cadastro e redefinicao aplicam a mesma politica.

`returnTo` aceita somente paths locais iniciados por uma barra e rejeita URLs externas ou protocol-relative. A sessao exposta pela interface usa resposta padrao Better Auth; nao adiciona perfis, papeis ou permissoes.

## Limites

Better Auth limita endpoints de auth em PostgreSQL. Politica numerica e infraestrutura distribuida seguem pendentes para producao. Nunca aplique migrations no startup ou com `push`; use `DATABASE_URL_UNPOOLED` e `npm run db:migrate`.

As tabelas sao declaradas para Drizzle porque adaptador necessita schema tipado. Better Auth CLI atual nao carrega modulo marcado `server-only`; schema segue modelo 1.7.18 e migration e gerada por `drizzle-kit` para revisao. Revalide schema com CLI ao alterar configuracao de plugins.

`account(provider_id, account_id)` e `rate_limit(key)` sao unicos. `rate_limit.last_request` armazena epoch em milissegundos como `bigint`, conforme contrato Better Auth 1.7.18, e possui indice para limpeza de buckets expirados.

## Testes

`npm run test:db` cobre contrato de URLs. `npm run test:auth` cobre `returnTo`; integracao com PostgreSQL isolado requer `TEST_DATABASE_URL` e Mailpit. Nunca aponte testes para base pessoal ou producao.

`compose.test.yml` fornece PostgreSQL e Mailpit exclusivos em `tmpfs`. Inicie com `docker compose -f compose.test.yml up -d --wait`, aplique migrations usando `DATABASE_URL_UNPOOLED=postgresql://lume_test:lume_test_only@127.0.0.1:55432/lume_auth_test` e execute `npm run test:auth` com `TEST_DATABASE_URL` nessa mesma URL e `TEST_MAILPIT_URL=http://127.0.0.1:58025`. O teste inicia servidor Next isolado na porta 33162 e limpa somente tabelas desse banco.

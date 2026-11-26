# Especificacao da Fundacao Operacional do Lume

## Resumo

Definir implementacao futura de identidade, autenticacao, persistencia, email e autorizacao no monolito Next.js. Esta change transforma escolhas tecnicas aprovadas em requisitos verificaveis, sem instalar dependencias, criar banco, migrations, credenciais ou fluxos operacionais de marketplace.

## Escopo

- Better Auth com email e palavra-passe, sessoes persistentes e verificacao de email.
- PostgreSQL hospedado no Neon e acesso/migrations via Drizzle ORM.
- Separacao entre identidade, sessao, perfil, capacidades de atuacao, papel administrativo e permissoes.
- Abstracao de email: Mailpit local e Resend em producao.
- Protecao no servidor, integracao futura das rotas demonstrativas e testes negativos de autorizacao.

## Fora de Escopo

- Implementar ou instalar pacotes, banco, Docker, migrations, credenciais, e-mail ou autenticacao.
- Ofertas, pedidos, propostas, pagamentos, avaliacoes, geocodificacao, distancia, administracao, moderacao, chat e notificacoes operacionais.
- Politicas numericas de rate limit, expiracao customizada, retencao de dados, recuperacao de conta e permissoes administrativas especificas ainda nao aprovadas.

## Precedencia

`consolidate-lume-business-rules` permanece fonte normativa para regras de negocio e privacidade. Esta change define fundacao tecnica compativel. Autorizacao futura nao pode ampliar allowlists, localizacao, dados privados ou capacidades alem daquela change.

## Criterios de Aceite Documentais

- Cada fluxo de identidade, sessao, verificacao, email e autorizacao possui requisito e cenario verificavel.
- Better Auth e Drizzle usam APIs e compatibilidades verificadas em fontes oficiais na data desta change.
- Verificacao de email bloqueia somente mutacoes comerciais aprovadas, nunca navegacao publica ou login por si.
- Segredos e acesso a banco/email permanecem exclusivos do servidor.
- Etapas futuras possuem dependencia, limite e aceite objetivo.

## Referencias

- [Design tecnico](design.md)
- [Decisoes e auditoria](decisions.md)
- [Tarefas futuras](tasks.md)
- [Requisitos](specs/operational-foundation/spec.md)
- [Regras de negocio consolidadas](../consolidate-lume-business-rules/specs/business-rules/spec.md)

# Lume Operational Foundation

## ADDED Requirements

### Requirement: Identidade unica separa autenticacao e capacidades

Sistema SHALL manter uma identidade Better Auth unica por utilizador. Perfil, sessao, conta de credencial, capacidade de atuar como cliente/prestador, papel administrativo e permissao SHALL ser conceitos separados. Cadastro SHALL persistir exatamente uma capacidade comercial inicial, sem criar segunda identidade ou permissao administrativa. Autorizacao SHALL derivar identidade e recurso no servidor, nunca de campo enviado pelo navegador.

#### Scenario: Utilizador atua nos dois contextos

- **WHEN** mesma sessao autenticada executa acao permitida de cliente e acao permitida de prestador
- **THEN** sistema associa ambas ao mesmo utilizador sem criar ou exigir outra conta

### Requirement: Better Auth integra email e palavra-passe no App Router

Sistema futuro SHALL expor Better Auth em `/api/auth/[...all]` com Route Handler oficial Next.js e SHALL usar cliente Better Auth React para cadastro, login, logout e estado de sessao. Credenciais SHALL ser processadas somente pelo fluxo Better Auth e nunca persistidas ou comparadas por componentes Lume.

#### Scenario: Credencial valida inicia sessao

- **WHEN** utilizador submete email e palavra-passe validos em `/entrar`
- **THEN** cliente usa fluxo Better Auth, sessao persistente e cookie seguro sao estabelecidos e destino interno validado e restaurado

### Requirement: Sessao e recursos privados sao validados no servidor

Pagina privada, Route Handler e Server Action SHALL validar sessao atual no servidor antes de ler ou alterar recurso privado. `proxy.ts` MAY redirecionar por experiencia, mas SHALL NOT ser unica verificacao de seguranca. Sessao ausente ou expirada SHALL negar recurso privado e redirecionar navegacao para `/entrar` com retorno interno allowlisted.

#### Scenario: Cookie nao equivale a sessao valida

- **WHEN** requisicao privada apresenta cookie inexistente, expirado, revogado ou forjado
- **THEN** servidor nao retorna recurso privado nem executa mutacao

### Requirement: Verificacao de email e elegibilidade comercial permanecem distintas

Sistema futuro SHALL enviar verificacao apos cadastro e SHALL permitir reenvio para sessao autenticada nao verificada sob rate limit aprovado. Sistema SHALL NOT configurar verificacao obrigatoria para login global. Utilizador nao verificado SHALL poder iniciar sessao, terminar sessao e usar funcionalidades publicas permitidas, mas SHALL ser bloqueado no servidor ao publicar oferta, publicar pedido ou enviar proposta.

#### Scenario: Utilizador nao verificado navega oferta publica

- **WHEN** utilizador nao verificado consulta oferta publicada publica
- **THEN** sistema permite consulta sem conceder elegibilidade para mutacao comercial

#### Scenario: Utilizador nao verificado tenta publicar

- **WHEN** utilizador autenticado com email nao verificado tenta publicar oferta ou pedido, ou enviar proposta
- **THEN** servidor recusa mutacao sem alterar recurso e informa necessidade de verificacao

### Requirement: Persistencia usa PostgreSQL Neon e Drizzle

Sistema futuro SHALL acessar somente PostgreSQL por Drizzle ORM. Requisicoes SHALL usar `DATABASE_URL` pooled; migrations e tarefas administrativas SHALL usar `DATABASE_URL_UNPOOLED` direta, fora de requisicoes. Alteracao de schema SHALL gerar migration versionada, revisada e aplicada uma vez por ambiente; sistema SHALL NOT auto-aplicar migration no startup ou usar `push` em producao.

#### Scenario: Migration e executada em producao

- **WHEN** migration aprovada e aplicada em producao
- **THEN** processo usa conexao direta, registra resultado sem segredos e nao depende de requisicao web

### Requirement: Envio de email usa abstracao server-only

Sistema futuro SHALL encaminhar verificacao por interface de email independente do provedor. Desenvolvimento local SHALL usar Mailpit por SMTP; producao SHALL usar Resend com `RESEND_API_KEY` e remetente de dominio verificado. Cliente SHALL NOT receber chave de email, token Better Auth ou acesso direto ao provedor. Falha de envio SHALL NOT verificar email ou conceder permissao.

#### Scenario: Provedor de email falha

- **WHEN** callback de verificacao nao consegue entregar email
- **THEN** sistema mantem utilizador nao verificado, registra falha minimizada e apresenta estado recuperavel sem expor token

### Requirement: Autorizacao preserva fronteiras de privacidade

Sistema futuro SHALL aplicar policies server-side para visitante, autenticado nao verificado, autenticado verificado e administrador explicitamente autorizado. Oferta publicada permanece publica; pedido publicado exige autenticacao; proposta permanece privada entre partes autorizadas. Administrador SHALL NOT obter acesso automatico a proposta privada, endereco ou dado pessoal.

#### Scenario: Administrador sem permissao consulta proposta privada

- **WHEN** administrador sem permissao explicita de recurso solicita proposta privada
- **THEN** servidor nao retorna conteudo ou metadados privados da proposta

### Requirement: Interface demonstrativa migra sem redesenho

Integracao futura SHALL preservar rotas `/entrar`, `/criar-conta`, `/recuperar-senha`, `/redefinir-senha` e `/verificar-email`, componentes compartilhados, identidade White & Blue e comportamento responsivo. Fluxo que se tornar real SHALL remover temporizador e copy que afirma simulacao. Recuperacao de palavra-passe MAY permanecer nao integrada ate decisao pendente, mas SHALL manter resposta neutra quando implementada.

#### Scenario: Cadastro e integrado

- **WHEN** `/criar-conta` passa a usar cadastro real
- **THEN** pagina preserva layout e acessibilidade atuais, cria uma identidade unica, um perfil e uma unica capacidade comercial inicial e encaminha utilizador para verificacao

# Design: Fundacao Operacional

## Limites e Organizacao

Futura implementacao permanece em `web/src`. Paginas e componentes existentes continuam fonte visual; comportamento demonstrativo sera substituido dentro de `components/auth` e nova feature `features/auth`, sem redesenhar ou duplicar rotas. Codigo de banco, auth e email fica server-only em modulos de `src/lib` ou `src/features`; componentes cliente usam somente cliente Better Auth e DTOs permitidos.

```text
src/
  app/api/auth/[...all]/route.ts       # handler Better Auth
  features/auth/                       # formularios, mapeamento de erros e estados UI
  lib/auth.ts                          # instancia Better Auth, somente servidor
  lib/auth-client.ts                   # cliente Better Auth
  lib/db/                              # cliente, schema e migrations Drizzle
  lib/email/                           # porta EmailSender e adaptadores por ambiente
  lib/authorization/                   # requireSession e policies por recurso
```

Nomes e localizacao exatos podem seguir convencoes ja presentes, mas fronteiras nao: navegador nao importa banco, segredo, adaptador de email ou politica confiavel de permissao.

## Modelo de Identidade e Autorizacao

| Conceito | Responsabilidade | Nao representa |
| --- | --- | --- |
| Usuario/identidade | Registro Better Auth unico, com identificador, email, estado de verificacao e metadados de auth. | Papel cliente/prestador, perfil publico ou permissao administrativa. |
| Conta de credencial | Registro Better Auth de palavra-passe ligado ao mesmo usuario. Better Auth faz hash e verificacao. | Nova identidade Lume. |
| Sessao | Registro Better Auth persistente, cookie opaco e expiracao/revogacao. | Fonte de autorizacao de recurso sem validacao servidor. |
| Perfil | Extensao 1:1 futura da identidade para apresentacao publica e dados privados separados. | Substituto de usuario, email pessoal ou colecao de permissoes. |
| Capacidade de atuacao | Atribuicao comercial persistida avaliada pela acao: `client` ou `provider`. | Permissao administrativa, ownership ou segunda identidade. |
| Papel administrativo | Atribuicao administrativa explicita futura. | Acesso irrestrito ou acesso implicito a dados privados. |
| Permissao | Policy de servidor para acao/recurso especificos. | Valor enviado por formulario, rota ou estado React. |

Cadastro exige uma unica capacidade comercial inicial: `client` para contratar ou `provider` para oferecer. A associacao persistida nao concede administracao, ownership ou elegibilidade de publicacao sem as demais policies. Segunda capacidade pode ser ativada posteriormente na mesma identidade por operacao server-side owner-only.

Cada mutacao ou leitura privada resolve sessao no servidor, deriva `userId` da sessao e executa policy de ownership, estado, verificacao e permissao explicita. Interface pode ocultar CTA, mas nunca substitui policy. Administradores passam por policy propria e continuam negados sem permissao de recurso privado.

## Better Auth

Implementacao futura configura `betterAuth` com adaptador Drizzle provider `pg`, email/password ativado, URL/origens explicitas e handler `GET`/`POST` em `/api/auth/[...all]` atraves de `toNextJsHandler`. Cliente React usa `createAuthClient` e fluxos documentados: `signUp.email`, `signIn.email`, `signOut`, `useSession` e `sendVerificationEmail`.

Nao configurar `emailAndPassword.requireEmailVerification: true`: API oficial bloqueia criacao de sessao e login para nao verificados, contradizindo regra Lume. Configurar envio de verificacao apos cadastro com `emailVerification.sendVerificationEmail` e validar `session.user.emailVerified` nas policies comerciais. O callback recebe URL/token produzido por Better Auth; servidor encaminha URL pronta ao adaptador de email e nunca cria token proprio.

Login restaura somente destino interno allowlisted. Sessao expirada ou ausente em rota privada redireciona para `/entrar` com destino seguro; handler e Server Component tambem validam sessao. `proxy.ts` pode otimizar redirecionamento em Next 16, mas nao e fronteira de seguranca: cookie existente nao basta e toda pagina, Route Handler e Server Action protegidos chama `auth.api.getSession` com headers da requisicao.

## Persistencia e Ambientes

Drizzle declara schema Better Auth e schema Lume separadamente, numa configuracao de migrations unica e revisada. Better Auth CLI pode gerar declarations de auth; alteracao entra no schema Drizzle, gera migration versionada, recebe revisao SQL e aplica fora de requisicao. Nunca usar `push` em producao ou auto-aplicar schema no startup.

`DATABASE_URL` usa conexao Neon pooled para requisicoes. `DATABASE_URL_UNPOOLED` usa conexao direta somente por Drizzle Kit, migrations, dump ou administracao. Pooled Neon opera em modo transaction e nao serve para `SET`, `LISTEN/NOTIFY`, tabelas temporarias persistentes ou SQL `PREPARE`; aplicacao nao depende destes recursos. Cada ambiente possui banco e credenciais proprios; teste aponta para banco descartavel isolado e falha se receber URL de producao.

Contrato futuro de ambiente server-only: `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `RESEND_API_KEY`, `EMAIL_FROM` e configuracao SMTP exclusiva local. Valores nunca usam prefixo `NEXT_PUBLIC_`, nao entram em Git, logs ou resposta HTTP. Validacao no startup falha sem requisito do ambiente ativo, sem imprimir valor secreto.

## Email

`EmailSender` e porta unica com entrada minimizada: destinatario, assunto, texto/HTML e chave de idempotencia opcional. `MailpitEmailSender` entrega por SMTP somente em desenvolvimento local; `ResendEmailSender` usa SDK Resend, `RESEND_API_KEY` server-only, dominio/remetente verificado em producao e trata retorno de erro sem vazar destinatario ou token. Regras de negocio chamam porta, nao provedor.

Cadastro envia verificacao. Reenvio fica disponivel para sessao autenticada nao verificada e responde de forma neutra quando falhar; controles de rate limit aplicam-se antes do envio, com valores a aprovar. Link valido marca email como verificado; token invalido/expirado mostra estado recuperavel e permite novo pedido autenticado. Falha do provedor nao marca email verificado nem concede elegibilidade; registra evento tecnico minimizado e devolve mensagem generica. Nenhum email real e enviado durante esta change.

## Interface e Fluxos

| Rota atual | Integracao futura | Limite |
| --- | --- | --- |
| `/criar-conta` | Validacao acessivel e `signUp.email`; nome atual satisfaz campo obrigatorio documentado por Better Auth; exige uma capacidade inicial e segue para `/verificar-email`. | Nao aceita ambas, campos administrativos ou perfil extra. |
| `/entrar` | `signIn.email`, sessao e `returnTo` interno allowlisted. | Credencial invalida, limitacao e erro tecnico recebem mensagens seguras. |
| `/verificar-email` | Mostra pendencia, chama reenvio para sessao nao verificada e consome retorno do link Better Auth. | Nao bloqueia exploracao publica. |
| `/recuperar-senha` e `/redefinir-senha` | Preparar contrato Better Auth `requestPasswordReset`/`resetPassword`; integrar somente quando pendencia de recuperacao for aprovada. | Resposta de recuperacao deve ser neutra contra enumeracao. |

Ao integrar, remover texto, `setTimeout` e avisos que afirmam simulacao apenas dos fluxos efetivamente reais. Layout `AuthPage`, White & Blue, responsividade, acessibilidade e links existentes permanecem.

## Seguranca e Qualidade

- Better Auth faz hash `scrypt` por defeito; aplicacao nao guarda, compara ou regista palavra-passe.
- Manter verificacao CSRF e origin check Better Auth ativas; definir `BETTER_AUTH_URL` e `trustedOrigins` minimos. Nao confiar em Host/headers encaminhados sem proxy confiavel configurado.
- Cookies seguros e HttpOnly seguem ambiente HTTPS; nao expor token a JavaScript de aplicacao.
- Rate limit Better Auth ativo em producao e regras especificas para cadastro, login, reset e reenvio antes de producao. Storage em memoria nao basta para deploy distribuido; mecanismo compartilhado depende de decisao operacional.
- Entrada e `returnTo` sao validados no servidor; erros nao revelam existencia de conta, senha, token, SQL ou segredo.
- Logs usam codigo/correlacao e metadados minimos; excluem senha, token, cookie, email completo e dados pessoais desnecessarios.
- Testes cobrem sucesso e nega: sem sessao, sessao expirada, dono errado, nao verificado, administrador sem permissao e cookie forjado/so existente.

## Etapas Futuras

1. Infraestrutura e persistencia: dependencias aprovadas, contratos de ambiente, Neon isolado, schema/migration revisada. Aceite: app conecta somente com segredo servidor e migration aplica uma vez por ambiente.
2. Better Auth: adaptador Drizzle, handler e cliente React. Aceite: cadastro/login/logout e sessao validada servidor funcionam sem endpoint proprio paralelo.
3. Verificacao e email: porta, Mailpit local, Resend producao e callbacks Better Auth. Aceite: token valido altera verificacao; falha de email nao concede elegibilidade.
4. Protecao: `requireSession`, returnTo seguro e validacao em pagina/handler/action. Aceite: ausencia/expiracao de sessao bloqueia recursos privados no servidor.
5. Identidade e policies: separar perfil/capacidades/admin e implementar gates de verificacao. Aceite: uma conta atua em ambos sentidos sem papel confiado ao cliente.
6. Integracao UI: trocar somente formularios reais, preservando design. Aceite: nenhum fluxo integrado conserva timer ou copy de simulacao.
7. Testes de seguranca: integracao com banco isolado e negativos de autorizacao. Aceite: matriz de nega passa antes de dados de dominio reais.

## Implementacao 06.2

`/api/auth/[...all]` usa `toNextJsHandler(auth)`. Formularios existentes chamam cliente Better Auth para cadastro, login, reenvio, recuperacao e redefinicao. `returnTo` e filtrado no navegador e no servidor. O adaptador de email falha sem configuracao em vez de reportar entrega ficticia. Esta change nao introduz recursos privados de dominio; gates comerciais ficam preparados em `requireVerifiedEmail` para rotas futuras.

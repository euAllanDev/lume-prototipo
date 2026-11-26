# Tarefas de Perfis e Capacidades

## 1. Inspecao Documental

- [x] Ler specs OpenSpec existentes e identificar precedencia normativa.
- [x] Inspecionar fundacao operacional, regras consolidadas, autenticacao, schemas e helpers de autorizacao.
- [x] Comparar regras operacionais com papeis e perfis do prototipo historico.
- [x] Consultar documentacao oficial Better Auth e Drizzle aplicavel.

## 2. Especificacao

- [x] Separar identidade, perfil, capacidade, autorizacao e administracao.
- [x] Definir perfil unico e matriz de dados publicos, privados e operacionais.
- [x] Definir DTOs por allowlist e tres niveis de localizacao sem inventar precisao.
- [x] Responder ativacao, alternancia, verificacao e protecao das capacidades.
- [x] Formalizar administracao limitada, owner-derived e auditoria.
- [x] Registrar recomendacoes, pendencias e contradicoes sem promove-las a aprovadas.

## 3. Implementacao 07.1

- [x] Aprovar criacao atomica do perfil e capacidade inicial unica.
- [x] Implementar schema e migration Drizzle nao destrutiva.
- [x] Integrar selecao obrigatoria ao cadastro Better Auth.
- [x] Implementar consulta e ativacao idempotente owner-only.
- [x] Implementar DTOs publicos por allowlist.
- [x] Cobrir cadastro, rollback, capacidades, privacidade e autorizacao em PostgreSQL real.
- [x] Executar typecheck, lint, build e validacao OpenSpec estrita.

## 4. Implementacao 07.2

- [x] Implementar consulta e edicao allowlisted do proprio perfil.
- [x] Criar experiencia autenticada para capacidades cumulativas.
- [x] Conectar perfis publicos de cliente e prestador ao PostgreSQL por slug aprovado.
- [x] Preservar DTOs publicos contextuais sem dados sensiveis.
- [x] Cobrir estados de interface, ownership, sessao e concorrencia em PostgreSQL real.
- [x] Executar validacoes finais e auditorias visuais.

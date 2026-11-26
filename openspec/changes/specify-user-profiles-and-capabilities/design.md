# Design: Perfis, Capacidades e Autorizacao

## Fronteiras Conceituais

| Conceito | Fonte de verdade | Responsabilidade | Nao concede |
| --- | --- | --- | --- |
| Identidade | Better Auth `user` | Identificar pessoa autenticada, email e verificacao. | Perfil publico, ownership ou administracao. |
| Sessao | Better Auth `session` | Provar sessao atual e fornecer `userId` validado. | Permissao sobre recurso por si. |
| Perfil | Extensao Lume 1:1 | Dados de apresentacao e dados pessoais categorizados. | Capacidade exclusiva ou permissao administrativa. |
| Capacidade | Atribuicao comercial persistida + policy | Determinar se identidade pode agir como cliente/prestador naquele contexto. | Acesso a recurso alheio, administracao ou bypass de estado/verificacao. |
| Autorizacao | Servidor | Combinar sessao, ownership, audiencia, verificacao, estado e permissao. | Confianca em CTA, rota ou payload. |
| Administracao | Atribuicao explicita + policy | Permitir operacao administrativa nomeada. | Superutilizador ou leitura privada global. |

## Modelo Futuro Recomendado

```text
Better Auth user 1 --- 1 Lume profile 1 --- 1..2 capability assignments
        |
        +--- owns offers, requests and proposals through server-derived userId
        |
        +--- receives explicit administrative permission assignments
```

Perfil usa `userId` como chave primaria e FK com `ON DELETE CASCADE`. Capacidade usa linha explicita e chave composta `(userId, capability)`. Relacao de query do Drizzle nao substitui constraints persistentes.

Cadastro por email usa endpoint Better Auth existente com transacoes do adapter habilitadas. Hook `databaseHooks.user.create.before` valida `initialCapability` e cria perfil/capacidade pelo adapter transacional. FKs diferiveis permitem preparar extensoes antes do insert da identidade; commit valida toda integridade. Falha em qualquer etapa reverte identidade, credencial, perfil e capacidade. Nome inicial do perfil e copiado de `user.name` somente na criacao; nao existe sincronizacao posterior implicita.

Campos de perfil nao devem ser `user.additionalFields` por conveniencia. Better Auth inclui campos adicionais em objetos de utilizador por default e aceita input por default; isso amplia superficie de sessao e auth. Campo estritamente necessario a autenticacao pode permanecer em Better Auth. Dados de apresentacao, privados e operacionais pertencem a schema Lume e DTOs dedicados.

## Projecoes e Allowlist

### Perfil Publico de Cliente

Contrato contem nome de apresentacao e avaliacoes/comentarios publicos derivados quando existirem, e pode conter foto e apresentacao opcionais. Nao inclui ofertas por implicacao, pedidos, propostas, atividade, email, telefone, endereco ou coordenadas. Slug publico unico localiza `/clientes/[slug]`, permanece fora do DTO e nao deriva diretamente de `userId`.

### Perfil Publico de Prestador

Contrato contem nome de apresentacao, avaliacoes/comentarios publicos quando existirem, ofertas `published` ativas e cidade/regiao quando localizacao de perfil existir; pode conter foto e apresentacao opcionais. Nao inclui pedidos, propostas, atividade, contato privado, endereco ou coordenadas. Slug publico unico localiza `/prestadores/[slug]`, permanece fora do DTO e nao deriva diretamente de `userId`.

### Perfil Privado do Proprio Utilizador

Contrato autenticado pode reunir campos editaveis e estado de completude necessarios para o proprio utilizador, mas continua allowlisted. Email e verificacao podem vir de projecao auth separada. Dados operacionais internos e flags administrativas nao entram automaticamente.

Mesmo utilizador pode possuir as duas projecoes. Endpoint/serializer escolhe projecao pelo caso de uso; nao retorna entidade completa e depois remove campos. Query deve selecionar somente colunas e agregados necessarios.

## Capacidades

Cadastro exige exatamente uma capacidade inicial, `client` ou `provider`. Associacao persistida e unica; cadastro nao aceita ambas. Segunda capacidade pode ser adicionada depois por operacao owner-only, aditiva e idempotente. Nao existe desativacao neste incremento. Servidor consulta associacoes persistidas em cada operacao; estado de UI ou payload nao prova capacidade.

| Operacao | Contexto | Requisitos minimos aprovados |
| --- | --- | --- |
| Editar proprio perfil | Comum | Sessao valida; `userId` derivado da sessao. |
| Criar rascunho de pedido | Cliente | Sessao valida, capacidade `client`; ownership derivado. |
| Publicar pedido | Cliente | Sessao valida, capacidade `client`, email verificado, ownership, campos/estado validos. |
| Propor a oferta de terceiro | Cliente | Sessao valida, capacidade `client`, email verificado, origem elegivel e autor diferente do proprietario. |
| Criar rascunho de oferta | Prestador | Sessao valida, capacidade `provider`; ownership derivado. |
| Publicar oferta | Prestador | Sessao valida, capacidade `provider`, email verificado, ownership, campos/estado validos e projecao publica minima disponivel. |
| Propor ao pedido de terceiro | Prestador | Sessao valida, capacidade `provider`, email verificado, audiencia/origem elegivel e autor diferente do proprietario. |
| Gerir taxonomia | Administracao | Sessao valida e permissao administrativa especifica. |

"Projecao publica minima" nao adiciona requisitos pessoais alem da allowlist: nome de apresentacao e campos exigidos pela propria oferta. Foto, apresentacao e localizacao de perfil continuam opcionais; oferta presencial possui localizacao operacional propria conforme regra futura.

Nao existe mudanca destrutiva entre cliente e prestador. Utilizador com ambas associacoes pode executar ambas modalidades na mesma sessao. Desativacao futura, onboarding reforcado ou verificacao profissional exigem nova decisao.

## Pipeline de Autorizacao

1. Resolver sessao atual no servidor e rejeitar sessao ausente, expirada ou revogada.
2. Derivar `actorUserId` exclusivamente da sessao.
3. Carregar somente recurso e campos necessarios para policy.
4. Aplicar audiencia e nao enumeracao para leitura privada.
5. Aplicar ownership ou participacao; ID de rota localiza recurso, nao identifica ator.
6. Aplicar verificacao de email somente nas mutacoes comerciais aprovadas.
7. Aplicar estado/transicao e invariantes persistentes.
8. Aplicar permissao administrativa nomeada quando operacao for administrativa.
9. Persistir atomicamente e auditar operacao administrativa importante quando aplicavel.
10. Retornar DTO allowlisted adequado, nunca linha completa.

Frontend pode esconder acoes e mostrar contexto, mas nao recebe autoridade. Payload de mutacao nao aceita `ownerId`, `actorId`, `isProvider`, `isClient`, `isAdmin` ou permissao como fonte de verdade. Alterar perfil de outra identidade e negado, salvo futura operacao administrativa explicitamente aprovada e auditada.

## Administracao

Capacidade de prestador nunca implica administracao. Administracao deve usar atribuicoes server-owned e permissions especificas. Unica permissao funcional aprovada hoje e gestao autorizada de categorias/subcategorias; nomenclatura e granularidade exatas aguardam design de implementacao.

Mesmo administrador continua sujeito a allowlists e policies privadas. Leitura de proposta, endereco ou dado pessoal requer justificativa e permissao de recurso que ainda nao foram aprovadas. Nao criar bypass global.

Conteudo, formato, retencao, acesso, imutabilidade e minimizacao do evento de auditoria continuam pendentes. Implementacao futura nao deve definir esses campos antes da aprovacao correspondente.

## Concorrencia e Seguranca

- Atualizacao de perfil usa ownership no predicado da escrita, nao somente verificacao anterior.
- Constraints 1:1 impedem dois perfis para mesma identidade sob concorrencia.
- Atribuicoes administrativas sao server-owned; nenhum endpoint comum aceita permission assignment.
- Alteracoes administrativas importantes devem respeitar atomicidade e auditoria conforme modelo futuro aprovado.
- Respostas privadas usam `404` quando necessario evitar enumeracao; escolha por recurso segue policy futura consistente.
- Logs excluem email completo, telefone, endereco, coordenadas, sessao e conteudo privado por default.

## Sequencia Futura Recomendada

1. Criar schema Lume 1:1, associacoes de capacidade e migration nao destrutiva.
2. Integrar criacao atomica ao cadastro Better Auth e selecao obrigatoria em `/criar-conta`.
3. Implementar consulta, ativacao owner-only e serializers publicos allowlisted.
4. Testar cadastro, idempotencia, sessao, falsificacao, privacidade e rollback em PostgreSQL real.

## Decisao Tecnica 07.1

`lume_profile` usa `user_id` como PK e FK diferivel para `user`. `lume_profile_capability` usa PK composta `(user_id, capability)` e FK diferivel para o perfil. A combinacao permite criar extensoes no hook transacional antes da insercao da identidade, impede perfis duplicados e torna ativacao posterior naturalmente idempotente com `ON CONFLICT DO NOTHING`.

O endpoint de ativacao aceita somente a capacidade comercial validada. O `userId` vem exclusivamente da sessao Better Auth resolvida no servidor; campos adicionais enviados pelo navegador nao participam da decisao.

# Decisoes de Perfis e Capacidades

Atualizado em 2026-11-09. **Aprovada** repete ou especializa decisao normativa existente. **Recomendada** orienta implementacao futura sem aprovar regra de produto nova. **Pendente** exige aprovacao antes de comportamento correspondente.

## Decisoes Aprovadas

| Tema | Decisao | Limite |
| --- | --- | --- |
| Identidade | Cada utilizador usa uma identidade Better Auth unica. | Conta de credencial, sessao, perfil e permissao nao criam novo utilizador. |
| Perfil | Mesma identidade possui um perfil Lume unico, mesmo atuando como cliente e prestador. | Representacoes publicas variam por contexto; nao duplicam perfil ou identidade. |
| Capacidades | Cliente e prestador sao capacidades comerciais persistidas, cumulativas e separadas de administracao. | Cadastro exige exatamente uma capacidade inicial; nao oferece ambas. |
| Cliente | Capacidade permite iniciar operacoes de cliente permitidas. | Publicar pedido ou enviar proposta exige email verificado e demais policies da operacao. |
| Prestador | Capacidade permite iniciar operacoes de prestador permitidas. | Publicar oferta ou enviar proposta exige email verificado e demais policies da operacao. |
| Ativacao | Utilizador autenticado pode ativar a segunda capacidade na propria identidade. | Operacao e aditiva, idempotente e nao aceita identidade-alvo do cliente; desativacao permanece fora de escopo. |
| Publico | Dados privados sao default; somente allowlist aprovada entra em representacao publica. | Entidade de banco ou objeto de sessao completo nunca e DTO publico. |
| Localizacao | Perfil publico mostra no maximo cidade e regiao; pedido autenticado pode mostrar area aproximada; operacao interna autorizada pode usar detalhe necessario. | Precisao, provedor e retencao continuam pendentes. |
| Ownership | Ator vem da sessao validada no servidor. | `userId`, capacidade ou papel enviados pelo cliente nao concedem acesso. |
| Administracao | Permissao administrativa e explicita e separada de capacidade de prestador. | Administrador nao acessa automaticamente proposta, endereco ou dado pessoal. |
| Taxonomia | Utilizador comum nao gere categorias ou subcategorias; administrador autorizado pode geri-las. | Outras permissoes administrativas permanecem pendentes. |
| Auditoria | Acoes administrativas importantes devem ser auditadas. | Conteudo, formato, retencao, acesso e protecao do log permanecem pendentes. |
| Identificador publico | Perfil usa slug publico unico, opaco quanto ao `userId`, gerado na criacao e nao editavel neste incremento. | Slug localiza somente projecao allowlisted; nao amplia DTO nem autoriza dados privados. |

## Recomendacoes Tecnicas

| Tema | Recomendacao | Motivo e limite |
| --- | --- | --- |
| Persistencia do perfil | Tabela Lume 1:1 com `user.id` como chave estrangeira unica, separada das tabelas Better Auth. | Evita ampliar resposta de sessao com dados pessoais; schema exato depende de change de implementacao. |
| Fonte publica | Perfil Lume e fonte canonica de nome de apresentacao, foto, apresentacao e representacao publica de localizacao. | `user.name` e `user.image` de Better Auth continuam metadados de auth, privados por default; migracao/sincronizacao inicial deve ser decidida antes de implementar. |
| Persistencia das capacidades | Tabela associativa com uma linha por capacidade e chave unica composta `(userId, capability)`. | Evita booleans, suporta ativacao idempotente e extensao controlada por migration. |
| Criacao inicial | Criar perfil e capacidade dentro da transacao de cadastro Better Auth. | Falha em perfil/capacidade reverte identidade e credencial; nao usar efeito pos-commit. |
| Cliente | Disponivel somente quando linha `client` existir. | Nao elimina gates de verificacao e validacao ao publicar/enviar proposta. |
| Prestador | Disponivel somente quando linha `provider` existir. | Nao representa verificacao profissional, aprovacao administrativa ou selo. |
| DTOs | Definir DTO publico de cliente, DTO publico de prestador e DTO privado do proprio perfil. | Projecoes separadas reduzem exposicao acidental. |
| Administracao | Policy por permissao nomeada e acao, com deny-by-default. | Nao usar um booleano `isAdmin` como bypass global. |
| Implementacao 07.1 | Usar `databaseHooks.user.create.before` do Better Auth com adapter Drizzle transacional e FKs diferiveis. | Perfil e capacidade sao inseridos antes da identidade no mesmo commit; falha reverte credencial, identidade e extensoes. |
| Ativacao 07.1 | Usar PK composta e `ON CONFLICT DO NOTHING` para adicionar capacidade comercial. | Endpoint deriva alvo da sessao; payload nunca escolhe utilizador, administracao ou ownership. |

## Campos do Perfil

| Campo conceitual | Necessidade | Exposicao | Estado |
| --- | --- | --- | --- |
| Vinculo `userId` | Essencial tecnico | Interno | Recomendado 1:1 e unico. |
| `createdAt`/`updatedAt` | Essencial tecnico | Interno | Recomendados para operacao e concorrencia; nao publicos por default. |
| Nome de apresentacao | Essencial para representacao publica | Publico em perfil cliente/prestador | Aprovado; origem inicial e sincronizacao com `user.name` pendentes. |
| Foto | Opcional | Publica quando escolhida | Aprovado; storage, moderacao e remocao pendentes. |
| Apresentacao | Opcional | Publica quando preenchida | Aprovado; limites e moderacao pendentes. |
| Cidade | Opcional ate operacao exigir | Publica se fornecida para perfil | Aprovado como nivel publico; modelo geografico pendente. |
| Regiao | Opcional ate operacao exigir | Publica se fornecida para perfil | Aprovado como nivel publico; estrutura territorial pendente. |
| Email | Essencial de autenticacao | Privado | Mantido pelo Better Auth; nunca perfil publico. |
| Telefone pessoal | Nao aprovado como obrigatorio | Privado | Coleta, finalidade e verificacao pendentes. |
| Endereco detalhado | Somente quando operacao autorizada necessitar | Privado/operacional | Finalidade, modelo e retencao pendentes. |
| Coordenadas | Somente quando operacao autorizada necessitar | Operacional interno | Tecnologia, precisao e retencao pendentes. |
| Avaliacoes | Derivadas de recursos de avaliacao | Publicas conforme regra aprovada | Nao armazenar como texto/agregado autoritativo do perfil sem estrategia futura. |
| Ofertas ativas | Derivadas de ofertas | Publicas somente na projecao de prestador | Nao sao campos editaveis do perfil. |
| Flags de moderacao/auditoria | Operacional interno | Nunca publicas por default | Modelo e permissoes pendentes. |

## Pendencias

1. Limites, sanitizacao, storage, licenca, consentimento e moderacao de foto/apresentacao.
3. Se onboarding futuro de prestador exige passos, estado, revisao, documentos ou verificacao profissional.
4. Suspensao/desativacao de capacidade e efeito sobre ofertas, pedidos, propostas e historico.
6. Telefone, endereco, coordenadas, precisao geografica, provedor, finalidade e retencao.
7. Permissoes administrativas alem de gerir taxonomia; concessao, revogacao e bootstrap de administradores.
8. Formato, conteudo, retencao, acesso e protecao do registro de auditoria.
9. Politica de moderacao de perfil e recurso de suporte que justificaria acesso excepcional a dado privado.

## Contradicoes e Tratamento

| Fonte | Contradicao aparente | Tratamento |
| --- | --- | --- |
| Prototipo `create-service-marketplace-prototype` | Contexto ativo e papeis demonstrativos restringem publicacao/candidatura. | Historico obsoleto para autorizacao operacional; conta unica e policies server-side prevalecem. |
| `worker-profiles` do prototipo | Habilidades, disponibilidade e experiencia aparecem como perfil profissional geral. | Nao entram na allowlist aprovada atual; permanecem fora ate decisao propria. |
| Blueprint antigo | Auth e audiencia de pedidos aparecem pendentes. | Substituido por fundacao auth concluida e pedido `published` somente para autenticados. |
| Better Auth `user.name`/`image` | Pode parecer perfil publico pronto. | Registro auth nao e DTO publico; perfil Lume separado governa apresentacao. |
| Requisitos anteriores desta change | Capacidade era implicita e intencao nao era persistida. | Incremento 07.1 substitui essa regra: capacidade e persistida, inicial unica e segunda ativavel; servidor continua sendo fonte de autorizacao. |
| Administrador | Pode parecer superutilizador. | Permissoes administrativas nao atravessam ownership ou privacidade sem autorizacao especifica de recurso. |

## Fontes Oficiais

- Better Auth: [Database](https://www.better-auth.com/docs/concepts/database) e [TypeScript](https://www.better-auth.com/docs/concepts/typescript). Campos adicionais podem entrar em sessao/respostas e aceitam input por default; por isso dados de perfil e autorizacao nao devem ser adicionados sem `input`/`returned` deliberados.
- Drizzle ORM: [Relations](https://orm.drizzle.team/docs/relations-v2) e [Indexes and Constraints](https://orm.drizzle.team/docs/indexes-constraints). Relacao 1:1 exige constraint persistente propria; relacao Drizzle isolada nao cria foreign key.

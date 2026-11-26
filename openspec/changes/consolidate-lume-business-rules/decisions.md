# Registro Consolidado de Regras de Negocio

Atualizado em 2026-11-08. **Aprovada** registra decisao do produto confirmada para esta change. **Pendente** exige aprovacao adicional. **Obsoleta** descreve direcao anterior substituida ou comportamento somente demonstrativo.

## Decisoes Aprovadas

| Dominio | Decisao aprovada | Limite explicito |
| --- | --- | --- |
| Privacidade | Dados sao privados por padrao; somente allowlist explicitamente autorizada pode ser publica. | Endereco completo, telefone pessoal, email pessoal e coordenadas exatas nunca sao publicos. |
| Conta e perfis | Cada utilizador possui identidade unica e pode atuar como cliente, prestador ou ambos. | Conteudo publico varia por contexto, sem duplicar identidade do utilizador. |
| Perfil de prestador | Exibe nome de apresentacao, foto opcional, apresentacao opcional, avaliacoes e comentarios publicos, ofertas publicadas e ativas, e localizacao aproximada conforme politica geografica. | Nao exibe pedidos, historico de propostas, atividades privadas, endereco completo ou contactos pessoais. |
| Perfil de cliente | Exibe nome de apresentacao, foto opcional, apresentacao opcional, avaliacoes e comentarios publicos. | Nao exibe pedidos, historico de propostas, atividades privadas, endereco completo ou contactos pessoais. |
| Pedidos | Requer titulo, descricao, categoria, modalidade, localizacao compativel e data de publicacao. Subcategoria, orcamento minimo/maximo, prazo desejado, disponibilidade/preferencia de horario e imagens/anexos sao opcionais. | Orcamento nao e obrigatorio; dados pessoais e endereco exato nao aparecem no pedido. |
| Visibilidade de pedidos | Pedido `published` e consultavel somente por utilizador autenticado. Rascunho e pedido `cancelled` nao aparecem na exploracao. | Autenticacao nao autoriza exposicao de dados pessoais ou endereco exato. |
| Localizacao | Perfil publico usa cidade e regiao; pedido para utilizador autenticado usa cidade, regiao e area aproximada; operacao interna autorizada pode usar coordenadas e endereco detalhado quando necessarios. | Servico remoto nao exige endereco; localizacao exata do cliente exige autorizacao adequada. |
| Distancia | Distancia inicial e em linha reta. Distancia por rota e evolucao futura. | Nao ha tecnologia, algoritmo detalhado, unidade ou ordenacao aprovados. |
| Propostas | Envio e bidirecional conforme tipo de publicacao. Estados sao `pending`, `accepted`, `rejected`, `withdrawn` e `closed`. | Nao existe negociacao interna no primeiro fluxo. |
| Propostas: autorizacao e aceite | Somente destinatario aceita ou rejeita; autor retira somente proposta `pending`; proposta `accepted` nao pode ser retirada unilateralmente; historico fica acessivel somente as partes autorizadas. | Campos especificos e semantica detalhada de leitura/historico de propostas `closed` permanecem pendentes. |
| Propostas: exclusividade | Aceitacao exclusiva encerra publicacao, muda proposta escolhida para `accepted`, muda concorrentes `pending` para `closed` e bloqueia novas propostas. Aceitacao deve ser consistente e atomica para impedir dois aceites concorrentes. | Nao define prazo, penalidade, pagamento, contratacao ou negociacao. |
| Ciclo de vida de publicacoes | Oferta e pedido usam `draft`, `published`, `paused`, `closed` e `cancelled`. Transicoes permitidas: `draft -> published`; `published -> paused`, `closed` ou `cancelled`; `paused -> published`, `closed` ou `cancelled`. | `closed` e `cancelled` sao finais; nao ha reabertura nem outras transicoes. |
| Publicacoes e propostas | Publicacao `paused`, `closed` ou `cancelled` nao recebe propostas. Aceitacao fecha publicacao. Cancelamento preserva historico de propostas. Rascunho pode ser editado livremente pelo proprietario. | Edicao de publicacao ja `published` permanece pendente. Republicacao exige nova publicacao. |
| Avaliacoes | Somente participantes de proposta `accepted` podem avaliar-se apos ambas as partes confirmarem conclusao do servico. Cada participante faz uma avaliacao por servico; nota e obrigatoria e comentario e opcional. Avaliacoes publicadas aparecem nos perfis publicos. | Aceite nao significa conclusao; proposta sem servico realizado nao permite avaliacao. |
| Administracao | Utilizadores comuns atuam como clientes, prestadores ou ambos; administradores possuem permissoes administrativas especificas; sistema executa operacoes internas autorizadas. Administradores autorizados podem gerir categorias e subcategorias. | Administrador nao ganha acesso automatico a propostas privadas, enderecos ou dados pessoais. |
| Auditoria e painel | Acoes administrativas importantes possuem registro de auditoria. Painel administrativo completo nao e necessario no primeiro incremento funcional. | Detalhamento da auditoria e do painel permanece pendente. |

## Contradicoes Resolvidas e Documentacao Obsoleta

| Documento | Registro anterior | Tratamento nesta change |
| --- | --- | --- |
| `create-service-marketplace-prototype/design.md` | `Task` e `Application`, selecao, mensagens, conclusao e avaliacao sao simulacoes locais com papeis e estados proprios. | Obsoleta como regra operacional; preservada como historico do prototipo. |
| `create-service-marketplace-prototype/specs/*.md` | Candidaturas, selecao, mensagens e avaliacoes referem-se ao prototipo. | Obsoleta como regra operacional; nao reescrever. |
| `prepare-operational-mvp-architecture/decisions.md` | Audiencia de pedidos estava pendente entre tres opcoes. | Substituida: pedido publicado exige autenticacao para consulta. |
| `prepare-operational-mvp-architecture/design.md` e `spec.md` | Usam `withdrawn`, `open`, `in_progress`, `completed`, `available`, `unavailable` ou similares como estados de publicacao. | Substituida pelo enum e transicoes aprovados nesta change. |
| `prepare-operational-mvp-architecture/*` | Aceitacao era futura ou pendente. | Substituida por aceite exclusivo, estados de proposta e requisito de atomicidade aprovados. |
| Documentos anteriores desta change | Verificacao de email, campos de proposta, IDs estaveis de taxonomia, desativacao/reclassificacao e politica detalhada de categoria foram tratados como aprovados. | Nao sao decisoes aprovadas nesta tarefa; permanecem pendentes e nao autorizam implementacao. |
| Documentos anteriores desta change | Perfil e localizacao publica nao tinham allowlist concreta ou camadas finais. | Substituida pelas allowlists e tres camadas aprovadas nesta change. |

## Pendencias Preservadas

1. Precisao numerica da localizacao aproximada, raio padrao, provedor de geocodificacao e tecnologia geoespacial.
2. Retencao e exclusao de dados pessoais.
3. Semantica detalhada de leitura e historico de propostas `closed`.
4. Campos especificos de proposta alem das regras aprovadas.
5. Procedimento de confirmacao de conclusao e resolucao de divergencias entre as partes.
6. Prazo, edicao, exclusao e moderacao de avaliacoes.
7. Detalhamento do registro de auditoria administrativa.
8. Politica de edicao de publicacoes `published`.
9. Regras de autenticacao e recuperacao de conta, inclusive verificacao de email.
10. Permissoes administrativas especificas, alem da gestao autorizada de categorias e subcategorias.
11. Campos publicos adicionais fora da allowlist expressa e regras de exposicao autenticada alem das camadas de pedido aprovadas.

## Limites Nao Aprovados

- Nao adicionar estados ou transicoes de publicacao e proposta alem dos registrados acima.
- Nao definir prazo, penalidade, negociacao, pagamento ou contratacao para propostas.
- Nao definir mecanismo de disputa, edicao, exclusao ou moderacao para avaliacoes.
- Nao tratar papel administrativo como acesso irrestrito.

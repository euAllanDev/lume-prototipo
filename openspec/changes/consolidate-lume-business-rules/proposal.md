# Consolidacao das Regras de Negocio do Lume

## Resumo

Formalizar decisoes aprovadas para proximo incremento funcional, sem implementar produto, alterar prototipo ou converter pendencias em decisoes. Esta change e referencia normativa para privacidade, perfis, pedidos, localizacao, propostas, ciclo de vida, avaliacoes e administracao.

## Escopo

- Registrar allowlists publicas, dados privados e camadas de localizacao aprovadas.
- Formalizar campos e audiencia de pedidos, propostas, aceite exclusivo atomico e ciclo de vida de publicacoes.
- Formalizar elegibilidade de avaliacoes e limites de autorizacao administrativa.
- Registrar contradicoes substituidas e pendencias remanescentes sem inferencia.

## Fora de Escopo

- Codigo, banco, dependencias, autenticacao funcional, endpoints, painel administrativo e dados demonstrativos.
- Precisao geografica, fornecedor, tecnologia geoespacial, retencao ou exclusao de dados pessoais.
- Campos adicionais de proposta, semantica detalhada de seu historico, negociacao, pagamento ou contratacao.
- Procedimento de conclusao ou divergencia, e prazo, edicao, exclusao ou moderacao de avaliacoes.
- Politica de edicao de publicacoes `published`, regras de autenticacao e recuperacao de conta, e detalhamento de auditoria.

## Precedencia Documental

`specs/business-rules/spec.md` e `decisions.md` desta change prevalecem para proxima implementacao quando divergirem de documentos anteriores. `create-service-marketplace-prototype` continua registro de comportamento demonstrativo concluido. `prepare-operational-mvp-architecture` continua registro de preparacao; regras incompatveis listadas como obsoletas em `decisions.md` nao autorizam implementacao.

## Criterios de Aceite Documentais

- Todas decisoes desta aprovacao constam em `decisions.md` e requisitos testaveis correspondentes constam na spec.
- Perfil publico, pedido autenticado e operacao interna usam camadas de localizacao distintas.
- Estados e transicoes de proposta e publicacao nao excedem listas aprovadas.
- Pendencias continuam explicitamente registradas e nao recebem estado de aprovada por inferencia.
- Historico demonstrativo permanece preservado e nao define regra operacional futura.

## Referencias

- [Matriz e decisoes](decisions.md)
- [Requisitos consolidados](specs/business-rules/spec.md)
- [Tarefas documentais](tasks.md)
- [Blueprint](../lume-product-experience-blueprint/blueprint.md)
- [Arquitetura operacional anterior](../prepare-operational-mvp-architecture/decisions.md)

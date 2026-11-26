# Preparacao da Arquitetura do MVP Operacional

## Resumo

Documentar arquitetura, limites e dependencias para um futuro MVP operacional bidirecional, sem implementar aplicacao, banco, autenticacao ou integracoes. Esta mudanca permanece separada de `prepare-marketplace-product-validation`: prepara decisao tecnica, mas nao substitui validacao comercial.

## Contexto e Historico

`create-service-marketplace-prototype` e registro concluido de um prototipo demonstrativo em estado local, centrado em tarefas publicadas por clientes e candidaturas de prestadores. Seus documentos nao serao reescritos. A arquitetura operacional amplia deliberadamente esse modelo com decisoes posteriores do responsavel pelo produto; isso nao converte o prototipo nem cenarios simulados em evidencia de mercado.

## Decisoes Confirmadas

- Arquitetura monolitica full-stack em Node.js, Next.js App Router e TypeScript.
- PostgreSQL gerenciado pelo Neon, inicialmente com possibilidade de plano gratuito, e Drizzle ORM para acesso e migracoes.
- Desenvolvimento incremental e gestao por SDD/OpenSpec.
- Mercado inicial pretendido: Portugal; interface inicial em portugues europeu (PT-PT), sem declarar validacao comercial.
- Marketplace suporta dois recursos distintos: oferta criada por prestador e pedido criado por cliente.
- Contratacao pode iniciar nos dois sentidos: cliente propoe a oferta; prestador propoe ao pedido.
- Servicos remotos, presenciais e hibridos entram no escopo. Localizacao detalhada e calculo de distancia fazem parte do primeiro incremento para publicacoes com componente presencial.
- Ofertas `published` podem ser consultadas sem autenticacao. Criar, alterar, publicar, retirar ou enviar/consultar proposta exige autenticacao e autorizacao aplicavel.
- Rascunhos sao privados e propostas nao sao publicas.
- Categorias/subcategorias e acessibilidade sao requisitos centrais. WCAG 2.2 AA e referencia de projeto, nao declaracao automatica de conformidade legal.

## Escopo Candidato do Primeiro Incremento

O incremento deve incluir, sujeito as decisoes operacionais pendentes:

1. Cadastro, autenticacao e sessao.
2. Rascunho, publicacao, consulta e retirada de oferta.
3. Rascunho, publicacao, consulta autorizada e retirada de pedido; audiencia final do pedido aguarda aprovacao.
4. Campos minimos, categoria, subcategoria e modalidade para ambos recursos.
5. Descoberta publica de ofertas por texto, taxonomia e modalidade, com ordenacao estavel.
6. Descoberta de pedidos conforme politica de audiencia que vier a ser aprovada.
7. Localizacao, area de atendimento, geocodificacao minima e distancia para publicacoes presenciais/hibridas, sem exposicao publica de morada detalhada.
8. Proposta de cliente para oferta e de prestador para pedido, com unicidade, ownership e consulta privada.
9. Persistencia PostgreSQL via Drizzle, validacao e autorizacao no servidor.
10. Acessibilidade verificavel de todos os fluxos incluidos.

Este escopo e maior que o anteriormente recomendado. Dois tipos de publicacao, dois sentidos de proposta e dados geograficos aumentam modelo, autorizacao, privacidade, testes e operacao. Para continuar viavel, o incremento exclui aceitacao operacional da proposta e ciclo posterior, mapas obrigatorios, mensagens, pagamentos, contratos, disputas, reputacao operacional e taxonomia extensa.

## Componentes Compartilhados e Distintos

Podem ser compartilhados: conta/sessao, taxonomia, modalidade, representacao geografica, validacao comum, pesquisa, paginacao, ordenacao, auditoria, componentes de formulario e politica base de visibilidade.

Devem permanecer distintos: ownership e destinatario, campos especificos, regras de elegibilidade, disponibilidade, audiencia, linguagem de interface e ciclo de oferta versus pedido. Nao se presume uma unica tabela ou tipo de registro; qualquer unificacao fisica futura exige demonstrar constraints claras, consultas simples e ausencia de combinacoes invalidas.

## Fora de Escopo

- Implementar ou instalar Next.js, Drizzle, PostgreSQL/PostGIS, autenticacao, geocodificacao, mapas ou qualquer funcionalidade.
- Criar conta, banco, tabela, migracao, credencial, ambiente ou servico externo.
- Mensagens, pagamentos, custodia, comissoes, contratos, disputas, selecao/conclusao operacional, notificacoes e reputacao.
- Finalizar taxonomia extensa, categorias reguladas, internacionalizacao ou expansao alem de Portugal.
- Declarar validacao comercial, conformidade legal ou adequacao do plano gratuito.
- Alterar historico ou estado da mudanca concluida `create-service-marketplace-prototype` e das hipoteses de `prepare-marketplace-product-validation`.

## Criterios de Aceite Documentais

- Decisoes confirmadas, recomendacoes e pendencias permanecem separadas.
- Oferta e pedido possuem propriedade, campos, estados, visibilidade, descoberta e retirada explicitos.
- Propostas nos dois sentidos possuem destinatario derivado, origem unica, unicidade e acesso privado.
- Solucao minima de localizacao compara opcoes para PostgreSQL/Neon e Drizzle, protege dados pessoais e nao inventa precos/limites externos.
- Especificacao cobre cenarios positivos e negativos de publicacao, descoberta, distancia, autorizacao, taxonomia e falha.
- Tarefas possuem dependencias e aceite verificavel; nenhuma implementacao futura e marcada concluida sem evidencia.
- Proxima mudanca de implementacao depende das decisoes de produto, seguranca, privacidade e operacao listadas em `decisions.md`.

Detalhes tecnicos estao em [design.md](design.md), estados de decisao em [decisions.md](decisions.md) e fontes/recomendacoes operacionais em [operational-readiness.md](operational-readiness.md).

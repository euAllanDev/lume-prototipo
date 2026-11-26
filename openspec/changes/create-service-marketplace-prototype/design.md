# Design: Marketplace de Servicos e Oportunidades

## Direcao Visual

Interface contemporanea, acolhedora e objetiva. A hierarquia deve privilegiar acao, localizacao, modalidade, prazo e remuneracao antes de detalhes secundarios. Usar cards, etiquetas e espaco em branco para tornar diversidade de servicos facil de explorar sem parecer mural de anuncios.

Nome e identidade final nao fazem parte desta mudanca. Componentes devem usar tokens de cor, espacamento e tipografia para facilitar substituicao posterior.

## Arquitetura de Informacao

- Contexto: seletor global alterna entre contratante e prestador usando usuarios ficticios pre-carregados. O papel ativo controla CTAs, acoes de mutacao e conteudo da area pessoal; nao representa autenticacao.
- Inicio: proposta de valor, busca, categorias, tarefas em destaque e caminhos para contratar ou trabalhar.
- Explorar: busca, filtros, ordenacao, resultados e estado vazio.
- Detalhe da tarefa: resumo, condicoes, requisitos, contexto de quem publicou e acao de candidatura.
- Publicar: etapas de descricao, condicoes, revisao e confirmacao.
- Perfil: apresentacao, habilidades, disponibilidade, trabalhos e avaliacoes demonstrativas.
- Area pessoal: abas para tarefas publicadas, candidaturas e tarefas em andamento/concluidas.
- Mensagens: conversa demonstrativa associada a uma tarefa.

## Dados Demonstrativos

Estado local em memoria controla filtros, formulario, candidaturas, selecao, estados, mensagens e avaliacoes. Reiniciar pagina pode restaurar dados iniciais. Todo dado exibido deve ser ficticio e coerente com localidades europeias e moeda EUR.

`currentUserId` e `activeRole` identificam a perspectiva demonstrativa. Identificadores pre-carregados permanecem estaveis durante sessao e conectam todas as entidades.

Modelos minimos:

```text
User: id, role, name, avatar, location, headline, skills, availability
Task: id, title, category, mode, location, pay, schedule, deadline,
      description, requirements, status, publisherId, selectedWorkerId
Application: id, taskId, workerId, message, proposedTerms, status
Message: id, taskId, conversationId, authorId, content, sentAt
Review: id, authorId, subjectId, taskId, rating, comment
```

`Task.publisherId`, `Task.selectedWorkerId`, `Application.taskId`, `Application.workerId`, `Message.taskId`, `Message.authorId`, `Review.authorId`, `Review.subjectId` e `Review.taskId` sao referencias a IDs estaveis. `conversationId` e derivado de `taskId`; cada tarefa em andamento possui no maximo uma conversa entre seu publicador e prestador selecionado.

### Estados e Transicoes

`Task.status`: `draft`, `open`, `in_progress`, `completed`, `cancelled`.

- `draft -> open` apos publicacao demonstrativa.
- `open -> in_progress` somente ao selecionar uma candidatura.
- `in_progress -> completed` por acao demonstrativa de conclusao.
- `cancelled` existe somente em dados pre-carregados; nenhuma transicao para esse estado e navegavel.

`Application.status`: `submitted`, `selected`, `rejected`, `withdrawn`.

- Criacao de candidatura gera `submitted` para uma tarefa `open`.
- Selecao define `Task.selectedWorkerId` com `Application.workerId`, muda uma candidatura `submitted -> selected`, muda todas as demais candidaturas `submitted` da mesma tarefa para `rejected` e move a tarefa para `in_progress`.
- `withdrawn` pode aparecer somente em dados pre-carregados nesta versao; nao ha acao navegavel para retira-la.
- Uma candidatura `selected`, `rejected` ou `withdrawn` nao recebe novas transicoes no prototipo.

## Estados e Feedback

- Aviso global: faixa persistente em todas as rotas informa que plataforma, dados e operacoes sao demonstrativos; ela nao substitui feedback de mutacao.
- Carregamento: esqueletos em listas, detalhes e perfis antes de exibir dados demonstrativos.
- Vazio: orientacao acionavel para ajustar filtros ou criar primeira tarefa.
- Sucesso: confirmacao contextual apos publicar, candidatar, selecionar, concluir ou avaliar.
- Erro de formulario: validacao local junto ao campo e resumo acessivel quando aplicavel.
- Simulacao: aviso persistente ou contextual informa que nenhuma contratacao, mensagem ou pagamento e real.

## Fluxos

### Encontrar trabalho

Inicio ou Explorar -> filtros/busca -> detalhe -> candidatura -> confirmacao -> Area pessoal -> estado atualizado. Mensagens ficam disponiveis somente apos selecao e com tarefa em andamento. Apos conclusao, contratante pode avaliar prestador.

### Contratar alguem

Inicio ou cabecalho -> Publicar -> descricao -> condicoes -> revisao -> confirmacao -> Area pessoal -> interessados -> perfil -> selecionar -> acompanhamento e mensagens demonstrativas -> conclusao -> avaliacao demonstrativa do prestador.

## Responsividade e Acessibilidade

- Desktop usa grade para resultados e painel lateral para filtros quando houver espaco.
- Celular usa uma coluna, filtros em painel/modal e barra de navegacao de facil alcance.
- Acoes principais permanecem visiveis sem depender somente de hover.
- Controles recebem rotulos, foco visivel, contraste suficiente e navegacao por teclado.
- Icones nao carregam significado sem texto acessivel.

## Servicos Regulados

Categorias podem conter tarefas que exigem qualificacao. A interface mostra requisito informado por quem publica, mas nunca declara que perfil, habilidade, avaliacao ou qualificacao foi verificada, certificada ou legalmente habilitada pela plataforma.

# Marketplace Discovery

## ADDED Requirements

### Requirement: Pagina inicial apresenta proposta e caminhos de uso

Sistema SHALL apresentar proposta de valor clara e acoes distintas para encontrar trabalho e publicar uma tarefa.

#### Scenario: Visitante abre pagina inicial

- **WHEN** visitante acessa rota inicial
- **THEN** ve busca, categorias de servico, tarefas demonstrativas em destaque e chamadas para ambos os papeis

### Requirement: Aviso global identifica o prototipo

Sistema SHALL manter aviso visivel em todas as rotas informando que dados e operacoes pertencem a um prototipo demonstrativo.

#### Scenario: Usuario navega entre rotas

- **WHEN** usuario abre inicio, explorar, detalhe, perfil, area pessoal ou mensagens
- **THEN** aviso global permanece visivel e nao afirma que servicos, comunicacoes ou pagamentos sao reais

### Requirement: Usuario explora tarefas por busca e categoria

Sistema SHALL permitir pesquisar palavras e navegar por categorias de tarefas presenciais e remotas.

#### Scenario: Usuario pesquisa uma necessidade

- **WHEN** usuario pesquisa termo ou seleciona categoria
- **THEN** lista mostra apenas tarefas demonstrativas correspondentes e informa quantidade de resultados

### Requirement: Usuario filtra e ordena resultados

Sistema SHALL oferecer filtros de categoria, modalidade, localizacao e remuneracao, alem de ordenacao demonstrativa.

#### Scenario: Usuario combina filtros

- **WHEN** usuario aplica mais de um filtro
- **THEN** lista atualiza para intersecao dos criterios e exibe filtros ativos

### Requirement: Resultados comunicam informacoes essenciais

Sistema SHALL mostrar titulo, categoria, modalidade, localizacao, remuneracao e prazo ou agenda em cada card de tarefa.

#### Scenario: Usuario avalia card de resultado

- **WHEN** usuario visualiza tarefa na listagem
- **THEN** consegue identificar condicoes essenciais antes de abrir detalhe

### Requirement: Busca sem resultado orienta proxima acao

Sistema SHALL exibir estado vazio com opcao para ajustar ou limpar filtros.

#### Scenario: Filtros nao retornam tarefas

- **WHEN** criterios aplicados nao possuem correspondencia
- **THEN** usuario ve explicacao e acao para limpar filtros ou explorar categorias

### Requirement: Visao de descoberta informa carregamento

Sistema SHALL mostrar estado de carregamento antes de apresentar resultados demonstrativos.

#### Scenario: Lista de tarefas carrega

- **WHEN** usuario acessa exploracao ou altera criterios de busca
- **THEN** esqueletos de resultados ficam visiveis antes da lista, do total ou do estado vazio

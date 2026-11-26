# Task Lifecycle

## ADDED Requirements

### Requirement: Area pessoal organiza contexto de cada papel

Sistema SHALL oferecer visao de tarefas publicadas, candidaturas e tarefas em andamento ou concluidas com estados visuais claros.

#### Scenario: Usuario abre area pessoal

- **WHEN** usuario acessa area pessoal
- **THEN** encontra abas ou secoes adequadas para acompanhar suas tarefas e candidaturas demonstrativas

### Requirement: Tarefa mostra ciclo de vida compreensivel

Sistema SHALL representar estados de tarefa `draft`, `open`, `in_progress`, `completed` e `cancelled` sem usar estados de candidatura como estados de tarefa.

#### Scenario: Usuario consulta tarefa selecionada

- **WHEN** tarefa possui prestador selecionado
- **THEN** estado `in_progress`, prestador selecionado e proxima acao simulada ficam visiveis

### Requirement: Cancelamento e estado pre-carregado somente

Sistema SHALL exibir tarefas `cancelled` presentes nos dados demonstrativos sem oferecer transicao ou botao de cancelamento.

#### Scenario: Usuario consulta tarefa cancelada

- **WHEN** usuario abre tarefa demonstrativa com estado `cancelled`
- **THEN** ve estado final e nenhuma acao para cancelar, reabrir ou alterar tarefa

### Requirement: Conclusao gera estado final demonstrativo

Sistema SHALL permitir marcar tarefa em andamento como concluida no estado local.

#### Scenario: Parte conclui tarefa

- **WHEN** usuario executa acao demonstrativa de conclusao
- **THEN** tarefa muda de `in_progress` para `completed`, usuario ve confirmacao contextual demonstrativa e contexto contratante recebe convite para avaliacao demonstrativa

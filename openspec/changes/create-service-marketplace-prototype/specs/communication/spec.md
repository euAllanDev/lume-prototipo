# Communication

## ADDED Requirements

### Requirement: Tarefa em andamento possui conversa demonstrativa

Sistema SHALL apresentar conversa demonstrativa somente quando tarefa estiver em `in_progress` e possuir candidatura `selected`.

#### Scenario: Usuario abre mensagens de tarefa em andamento

- **WHEN** usuario seleciona acao de mensagens em uma tarefa elegivel
- **THEN** ve contexto da tarefa e historico ficticio entre `Task.publisherId` e `Task.selectedWorkerId`

### Requirement: Mensagens possuem vinculos deterministas

Sistema SHALL vincular cada mensagem a `taskId`, `conversationId`, `authorId`, conteudo e horario demonstrativo; `conversationId` SHALL identificar a conversa unica daquela tarefa.

#### Scenario: Usuario abre conversa de tarefa em andamento

- **WHEN** usuario abre mensagens de tarefa elegivel
- **THEN** historico mostra somente mensagens com mesmo `taskId` e autor identificado como publicador ou prestador selecionado

### Requirement: Envio de mensagem recebe feedback simulado

Sistema SHALL adicionar mensagem enviada ao historico local e informar que comunicacao nao e real.

#### Scenario: Usuario envia mensagem

- **WHEN** usuario envia texto nao vazio na conversa demonstrativa
- **THEN** texto aparece no historico local com `authorId` do contexto ativo e interface sinaliza simulacao

### Requirement: Somente participantes enviam mensagens demonstrativas

Sistema SHALL permitir envio somente quando `currentUserId` corresponder a `Task.publisherId` ou `Task.selectedWorkerId` da conversa.

#### Scenario: Contexto ativo nao participa da tarefa

- **WHEN** `currentUserId` nao corresponde a um participante da conversa
- **THEN** campo de envio nao fica disponivel para aquela tarefa

### Requirement: Mensagens nao ficam disponiveis fora da selecao

Sistema SHALL ocultar acao de mensagens para tarefas sem candidatura `selected` ou com estado diferente de `in_progress`.

#### Scenario: Usuario abre tarefa aberta ou concluida

- **WHEN** tarefa esta em `draft`, `open`, `completed` ou `cancelled`
- **THEN** acao de mensagens nao fica disponivel

### Requirement: Interface nao simula comunicacao operacional

Sistema SHALL deixar explicito que mensagens nao sao entregues a pessoas reais.

#### Scenario: Usuario visualiza conversa

- **WHEN** usuario abre tela de mensagens
- **THEN** aviso visivel informa que conteudo e interacao pertencem ao prototipo

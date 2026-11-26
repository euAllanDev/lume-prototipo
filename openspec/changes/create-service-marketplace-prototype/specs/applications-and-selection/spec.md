# Applications and Selection

## ADDED Requirements

### Requirement: Prestador demonstra interesse em tarefa

Sistema SHALL permitir candidatura demonstrativa com mensagem e termos propostos opcionais.

#### Scenario: Prestador se candidata

- **WHEN** prestador envia candidatura valida na pagina de tarefa
- **THEN** recebe confirmacao contextual simulada e candidatura aparece em sua area pessoal com estado `submitted`

### Requirement: Detalhe informa condicoes antes da candidatura

Sistema SHALL apresentar descricao, remuneracao, localizacao, modalidade, prazo, requisitos e status antes da acao de candidatura.

#### Scenario: Prestador abre tarefa

- **WHEN** prestador acessa detalhe de tarefa aberta
- **THEN** pode avaliar condicoes importantes antes de demonstrar interesse

### Requirement: Contratante compara interessados

Sistema SHALL listar interessados com perfil, mensagem, disponibilidade, reputacao demonstrativa e termos propostos quando presentes.

#### Scenario: Contratante abre interessados

- **WHEN** tarefa publicada possui candidaturas
- **THEN** contratante consegue abrir perfis e comparar informacoes em lista consistente

### Requirement: Contratante seleciona um candidato em simulacao

Sistema SHALL permitir selecionar candidato em tarefa aberta e atualizar estados locais relacionados.

#### Scenario: Contratante seleciona interessado

- **WHEN** contratante confirma selecao de candidato
- **THEN** tarefa muda de `open` para `in_progress`, `selectedWorkerId` recebe o prestador escolhido, candidatura escolhida muda de `submitted` para `selected`, demais candidaturas `submitted` da mesma tarefa mudam para `rejected` e usuario ve confirmacao contextual demonstrativa

### Requirement: Candidaturas respeitam estado da tarefa e contexto ativo

Sistema SHALL permitir candidatura somente ao contexto prestador para tarefa `open` e apresentar estados de candidatura sem mistura-los ao estado da tarefa.

#### Scenario: Prestador abre tarefa indisponivel para candidatura

- **WHEN** prestador abre tarefa que nao esta em `open`
- **THEN** acao de candidatura nao fica disponivel e status da tarefa e da candidatura, quando houver, aparecem separadamente

# Trust and Reputation

## ADDED Requirements

### Requirement: Perfil exibe reputacao demonstrativa contextualizada

Sistema SHALL mostrar nota agregada, quantidade de avaliacoes e comentarios ficticios quando houver dados disponiveis.

#### Scenario: Usuario avalia prestador

- **WHEN** abre perfil com historico demonstrativo
- **THEN** ve nota, volume de avaliacoes e comentarios com contexto de tarefa

### Requirement: Avaliacao e vinculada a tarefa concluida

Sistema SHALL permitir somente ao contratante registrar uma avaliacao demonstrativa por tarefa `completed` para seu prestador selecionado. Avaliacao SHALL conter `authorId`, `subjectId`, `taskId`, `rating` e `comment`.

#### Scenario: Usuario avalia apos conclusao

- **WHEN** usuario abre tarefa marcada como concluida
- **THEN** contexto contratante pode informar nota e comentario para prestador selecionado e ve confirmacao contextual de simulacao

### Requirement: Avaliacao demonstrativa nao e duplicada

Sistema SHALL bloquear formulario de avaliacao quando ja existir `Review` com mesmo `authorId` e `taskId` no estado local.

#### Scenario: Contratante retorna a tarefa ja avaliada

- **WHEN** contratante abre tarefa `completed` que ja possui sua avaliacao demonstrativa
- **THEN** ve avaliacao registrada e nao ve novo formulario de avaliacao

### Requirement: Plataforma nao declara verificacoes profissionais

Sistema SHALL evitar linguagem que indique garantia, verificacao, certificacao, seguro, protecao de pagamento ou habilitacao profissional em qualquer dado de perfil, qualificacao ou reputacao.

#### Scenario: Usuario consulta sinais de confianca

- **WHEN** interface mostra reputacao ou requisitos
- **THEN** apresenta dados como informacoes demonstrativas e nao como certificacao da plataforma

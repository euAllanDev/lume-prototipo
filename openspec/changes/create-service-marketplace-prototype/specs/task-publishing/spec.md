# Task Publishing

## ADDED Requirements

### Requirement: Contratante publica tarefa por etapas

Sistema SHALL oferecer fluxo demonstrativo para informar descricao, categoria, modalidade, localizacao, prazo, remuneracao e requisitos.

#### Scenario: Contratante inicia publicacao

- **WHEN** contratante escolhe publicar tarefa
- **THEN** sistema apresenta formulario organizado em etapas com progresso visivel

#### Scenario: Prestador tenta iniciar publicacao

- **WHEN** contexto ativo e prestador
- **THEN** acao de publicacao nao fica disponivel como mutacao de tarefa

### Requirement: Formulario valida campos obrigatorios localmente

Sistema SHALL impedir avancar ou publicar enquanto informacoes essenciais estiverem ausentes ou invalidas.

#### Scenario: Contratante tenta avancar sem titulo

- **WHEN** contratante envia etapa sem titulo ou descricao obrigatoria
- **THEN** campo recebe mensagem de validacao clara e foco permanece no fluxo

### Requirement: Contratante revisa condicoes antes de publicar

Sistema SHALL mostrar resumo editavel de todos os dados antes da confirmacao.

#### Scenario: Contratante revisa tarefa

- **WHEN** contratante chega na etapa de revisao
- **THEN** ve informacoes que ficarao visiveis e pode retornar a etapa relevante para editar

### Requirement: Publicacao simulada gera feedback honesto

Sistema SHALL confirmar publicacao em estado local e identificar acao como simulada.

#### Scenario: Contratante confirma publicacao

- **WHEN** contratante confirma resumo valido
- **THEN** ve confirmacao contextual demonstrativa e tarefa fica acessivel em sua area pessoal com estado `open`

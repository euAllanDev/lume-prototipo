# Worker Profiles

## ADDED Requirements

### Requirement: Perfil apresenta informacoes profissionais relevantes

Sistema SHALL exibir nome demonstrativo, localizacao, apresentacao, habilidades, disponibilidade, experiencia relevante e historico de avaliacoes.

#### Scenario: Contratante abre perfil de interessado

- **WHEN** contratante seleciona perfil em lista de candidatos
- **THEN** ve informacoes suficientes para comparar adequacao a tarefa

### Requirement: Perfil contextualiza dados informados

Sistema SHALL identificar habilidades, disponibilidade e qualificacoes como dados demonstrativos informados no perfil.

#### Scenario: Perfil inclui qualificacao

- **WHEN** perfil exibe habilidade ou qualificacao
- **THEN** interface contextualiza dado como demonstrativo sem criar selo de qualificacao

### Requirement: Perfil permite retornar ao contexto de tarefa

Sistema SHALL manter acesso para tarefa e candidatura que originaram abertura do perfil.

#### Scenario: Contratante analisa candidato

- **WHEN** abre perfil a partir de interessados
- **THEN** pode voltar a comparacao ou selecionar candidato sem perder contexto

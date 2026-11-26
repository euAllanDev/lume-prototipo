# Editorial Claymorphism

## ADDED Requirements

### Requirement: Identidade cromatica e editorial permanece reconhecivel

Interface SHALL preservar navy `#111B40`, azul `#27345D`, rosa de acao `#C91A6E`, rosa vibrante `#EC2184`, branco `#FFFFFF` e azul acinzentado `#AAB3CA`. Titulos expressivos, assimetria, espaco negativo, divisores uteis e secoes institucionais navy SHALL permanecer. Evolucao SHALL NOT substituir identidade por paleta pastel generica ou grelha uniforme de cards.

#### Scenario: Secao institucional recebe nova linguagem

- **WHEN** secao navy e atualizada
- **THEN** hierarquia editorial e contraste permanecem, enquanto somente objetos funcionais recebem profundidade clay discreta

### Requirement: Superficies usam profundidade tatil controlada

Cards, paineis, controles e elementos flutuantes SHALL usar escala consistente de raios, superficies e sombras reutilizaveis. Sombras externas SHALL ser suaves; sombras internas MAY reforcar highlight ou pressao quando apropriado. Interface SHALL NOT usar sombras pesadas, neumorfismo de baixo contraste, glassmorphism, gradientes decorativos ou borda e sombra excessivas no mesmo objeto.

#### Scenario: Card acionavel recebe hover

- **WHEN** apontador passa sobre card acionavel
- **THEN** card ganha elevacao discreta sem deslocamento grande, perda de contraste ou animacao constante

#### Scenario: Componente nao deve virar capsula

- **WHEN** componente retangular complexo como card, input ou painel recebe novo raio
- **THEN** forma permanece adequada a funcao e nao usa capsula reservada a chips ou badges

### Requirement: Controles possuem estados completos e acessiveis

Botoes, inputs, selects, filtros e controles de dialog SHALL distinguir repouso, hover, focus, active, disabled e loading. Foco SHALL permanecer visivel por indicador de alto contraste independente da sombra. Alvos acionaveis principais SHALL manter area adequada a toque e teclado.

#### Scenario: Utilizador navega por teclado

- **WHEN** foco percorre header, formulario, filtros ou dialog
- **THEN** cada controle apresenta foco visivel, ordem funcional preservada e nenhum conteudo fica inacessivel

#### Scenario: Botao e pressionado

- **WHEN** utilizador ativa botao habilitado
- **THEN** elevacao reduz discretamente sem remover rotulo, foco ou contraste

### Requirement: Movimento respeita preferencia do utilizador

Microinteracoes MAY usar elevacao curta e transicao suave. Interface SHALL respeitar `prefers-reduced-motion` e SHALL NOT adicionar animacoes grandes, ambientes ou constantes.

#### Scenario: Movimento reduzido esta ativo

- **WHEN** sistema informa `prefers-reduced-motion: reduce`
- **THEN** transformacoes decorativas e transicoes perceptiveis sao removidas ou reduzidas ao minimo

### Requirement: Linguagem visual permanece consistente entre experiencias

Header, navegacao, ofertas demonstrativas, categorias, filtros, dialog/drawer, estados vazios, autenticacao, conta, perfis publicos e secoes institucionais SHALL compartilhar tokens e tratamento coerente. Mudanca SHALL NOT alterar estrutura funcional, regras, dados, autenticacao, autorizacao ou contratos de API.

#### Scenario: Utilizador atravessa paginas

- **WHEN** utilizador navega entre pagina publica, catalogo, autenticacao e conta
- **THEN** controles e superficies mantem linguagem clay editorial consistente sem remover funcionalidade existente

### Requirement: Layout funciona nos viewports aprovados

Paginas principais SHALL ser verificadas em larguras 1440, 1024, 768, 390 e 320 px. Interface SHALL NOT produzir overflow horizontal; texto SHALL permanecer legivel; cards e controles SHALL reorganizar sem sobreposicao; dialog SHALL caber no viewport.

#### Scenario: Catalogo abre filtros abaixo de 1024 px

- **WHEN** utilizador abre filtros em viewport de 768 px ou menor
- **THEN** drawer/dialog arredondado fica operavel por teclado, cabe no viewport e sidebar desktop permanece oculta

#### Scenario: Pagina abre em 320 px

- **WHEN** pagina principal e renderizada com 320 px de largura
- **THEN** conteudo permanece legivel, acionavel e sem rolagem horizontal

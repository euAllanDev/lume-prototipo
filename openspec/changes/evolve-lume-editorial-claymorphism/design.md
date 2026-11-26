# Design: Claymorphism Editorial do Lume

## Principio Visual

Claymorphism editorial combina superficies arredondadas e profundidade tatil com hierarquia tipografica, assimetria, fotografia e espaco negativo ja existentes. Clay serve objetos acionaveis e superficies funcionais; nao transforma secoes editoriais em blocos flutuantes nem remove divisores que organizam leitura.

Paleta aprovada permanece exata nos pontos institucionais e de acao. Tons derivados existentes podem apoiar fundos, feedback e sombras, sem criar paleta pastel alternativa.

## Tokens

Escala candidata:

| Grupo | Papel |
| --- | --- |
| Raios `sm`, `md`, `lg`, `xl`, `2xl`, `round` | Controles compactos, inputs, cards, paineis grandes e elementos circulares. Capsula fica restrita a chips/badges quando funcional. |
| Superficies `base`, `soft`, `raised`, `pressed`, `inverse` | Separar canvas, controle, card elevado, estado pressionado e secao navy. |
| Sombras `xs`, `sm`, `md`, `lg`, `inset`, `pressed` | Profundidade progressiva com azul-marinho translucidissimo e highlight interno branco. |
| Movimento `fast`, `base`, `slow`, `spring` | Hover discreto, pressao curta e mudancas de estado; transformacoes removidas com movimento reduzido. |

Sombras nao substituem foco, contraste ou delimitacao necessaria. Bordas ficam sutis e seletivas; componente nao acumula borda forte, sombra forte e inset simultaneamente.

## Aplicacao por Componente

- Header: superficie elevada discreta, separacao por sombra suave e menu flutuante arredondado; sem transparencia ou blur.
- Botoes: raio medio, highlight interno, elevacao pequena em repouso, elevacao ligeiramente maior no hover e estado pressionado rebaixado.
- Inputs/selects: superficie suave, raio medio, borda funcional leve e foco rosa explicito.
- Cards de oferta: raio grande, imagem recortada, badges organicos, sombra discreta e elevacao curta; estrutura/conteudo permanecem iguais.
- Categorias e caminhos editoriais: arredondar cada objeto somente onde ele funciona como destino acionavel; preservar ritmo e assimetria.
- Filtros: painel desktop suave; opcoes compactas podem usar capsula. Abaixo de 1024 px, dialog funciona como drawer arredondado sem coexistir com sidebar.
- Auth e conta: paineis maiores com profundidade controlada, campos coerentes e secoes internas sem empilhamento visual excessivo.
- Perfis e secoes institucionais: navy e composicao editorial permanecem; clay aparece em avatares, notas, fatos e ofertas, nao em toda a pagina.
- Estados vazios/loading: superficie suave, iconografia elevada e shimmer discreto.

## Movimento

Hover pode elevar objetos acionaveis entre 1 e 4 px. Active reduz elevacao e pode deslocar 1 px. Transicoes usam somente propriedades de estado necessarias. `prefers-reduced-motion: reduce` elimina transformacoes e reduz duracoes.

## Responsividade

- 1440 px: profundidade visivel sem aumentar densidade nem largura de leitura.
- 1024 px: filtros migram para drawer; grids preservam respiro.
- 768 px: composicoes em duas colunas tornam-se sequenciais quando necessario.
- 390 e 320 px: alvos mantem pelo menos 44 px quando acionaveis, cards ocupam uma coluna, dialogs respeitam viewport e nao existe overflow horizontal.

## Acessibilidade

- Texto e controles mantem WCAG AA sobre cada superficie.
- Foco permanece independente de sombra/hover.
- Hover nunca e unico indicador de acao ou estado.
- Disabled e loading mantem legibilidade e semantica existentes.
- Navegacao por teclado cobre menu, filtros, dialogs, auth e conta.

## Limites

Nao usar glassmorphism, blur, gradiente decorativo, sombra pesada, neumorfismo de baixo contraste ou animacao ambiente. Gradientes existentes sobre fotografia continuam apenas quando necessarios para legibilidade. Nenhuma mudanca visual autoriza alterar fluxo, copy normativa, fixture ou comportamento de dados.

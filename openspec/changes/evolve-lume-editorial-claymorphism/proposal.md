# Proposta: Evolucao Visual para Claymorphism Editorial

## Objetivo

Evoluir a aplicacao Next.js do Lume para uma linguagem de claymorphism editorial macia, tatil e tridimensional, preservando identidade cromatica, tipografia expressiva, composicao assimetrica, espaco negativo e carater profissional do marketplace.

## Motivacao

A interface atual possui base editorial consistente, mas muitos controles, cards e paineis usam cantos retos, superficies planas e estados interativos pouco tateis. A evolucao deve criar profundidade discreta e consistencia entre paginas sem converter o produto num template SaaS, numa interface infantil ou numa grelha indiscriminada de cards.

## Escopo

- Tokens reutilizaveis de raios, sombras, superficies, elevacao, pressao, foco e transicao.
- Header, navegacao, botoes, inputs, filtros, seletores, cards, modais, drawers e estados vazios.
- Autenticacao, conta, ofertas demonstrativas, perfis publicos e secoes institucionais.
- Consistencia responsiva em 1440, 1024, 768, 390 e 320 px.
- Contraste WCAG AA, foco visivel, teclado, areas de interacao e `prefers-reduced-motion`.

## Fora de Escopo

- Regras de negocio, fluxos, autenticacao, autorizacao, contratos de API ou dados.
- Ofertas operacionais reais, schema Drizzle, migrations ou banco.
- Alteracao de fixtures e dados demonstrativos.
- Modificacao do prototipo original na raiz do repositorio.
- Novas dependencias, glassmorphism, gradientes decorativos ou animacoes grandes/constantes.

## Paleta Preservada

- Navy institucional `#111B40`.
- Azul secundario `#27345D`.
- Rosa de acao `#C91A6E`.
- Rosa vibrante `#EC2184`.
- Branco `#FFFFFF`.
- Azul acinzentado `#AAB3CA`.

## Impacto

Mudanca exclusivamente visual em estilos e componentes existentes de `web/`. Estrutura funcional, conteudo, rotas, contratos e fontes de dados permanecem intactos.

## Criterios de Aceite

- Linguagem clay editorial consistente sem substituir composicao editorial por cards.
- Componentes interativos possuem estados hover, focus, active, disabled e loading distinguiveis.
- Sombras sao suaves, de baixo peso visual, e nao dependem de baixo contraste para comunicar limites.
- Nenhum overflow horizontal nos cinco viewports aprovados.
- Testes, audits e `openspec validate --all --strict` passam, ressalvadas dependencias externas documentadas.

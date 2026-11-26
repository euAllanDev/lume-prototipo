# Home v2 do Lume (protótipo)

Protótipo estático da nova home, feito com o fluxo do [taste-skill](https://github.com/Leonxlnx/taste-skill)
(MIT). Serve de referência visual para levar a home do app Next.js (`web/`) a este padrão.

Abra `index.html` no navegador. As capturas de todas as telas estão em `capturas/`.

## Decisões

- **Hero sorteado:** `collage`. Texto à esquerda e, à direita, a janela do app com um pedido recebendo
  propostas; o cartão pequeno anima a proposta sendo aceita.
- **Paleta:** as cores do próprio Lume (azul-marinho `#111B40` e rosa `#C91A6E`) sobre um fundo off-white
  `#FBFAF7`. O texto cinza foi escurecido para `#474F6E` para passar no contraste 7:1.
- **Fonte:** Instrument Sans + DM Mono, da lista do taste-skill para software. O primeiro sorteio foi o
  Geist, que é feito para ferramentas de desenvolvedor; o Lume é um marketplace de gente para gente.
- **Momentos:** `word-highlight` na frase da missão (acende palavra por palavra) e `line-carries-colour`
  na seção de confiança (a linha rosa troca o fundo para azul-marinho).
- **Sem prova inventada:** nomes, notas e preços aparecem só dentro da janela do app, que é demonstração.

## Verificações

- `layout check` sem apontamentos em 1440×900, 1024×768, 820×1180, 768×1024 e 390×844.
- `copy-lint`: 0 FAIL, 0 WARN.
- Portão final: 2 apontamentos de espaçamento no celular, na seção de perguntas, corrigidos depois que as
  3 rodadas do portão acabaram e confirmados pelo `layout check`. Duas exceções registradas: os títulos
  estão em português (o verificador procura substantivos em inglês) e os "botões" extras que ele conta
  estão dentro da janela do app.

## Fotos

Só as 6 fotos que já estão em `web/public/images`. Fotos de pessoas reais trabalhando, de preferência
brasileiras, deixariam a página bem mais forte.

# Logo do Lume em vetor

Arquivos prontos (também em `web/public/images/brand/`):

- `lume-logo.svg`: colorido, com o degradê azul. Para fundos claros.
- `lume-logo-white.svg`: branco, para fundos escuros.
- `lume-logo-navy.svg`: azul-marinho chapado, para impressão em uma cor.
- `lume-mark.svg`: só a chama (ícone do app e favicon, em `web/src/app/icon.svg`).

Como foi feito:

- **Chama:** traçada do PNG original com `trace.py` (OpenCV) e convertida em curvas, por isso a forma é a
  mesma do desenho original. O degradê e o brilho são do `build.py`.
- **Palavra:** "Lume" em contornos da Montserrat (peso 760, fonte OFL), com espaçamento levemente apertado.
  Não depende de fonte instalada.

Para regenerar: `python trace.py logo.png` (opcional) e depois `python build.py`, com a Montserrat
estática gerada por `fontTools.varLib.instancer` em `Montserrat-Bold-static.ttf`.

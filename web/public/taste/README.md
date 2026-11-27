# Kit visual da home (taste-skill)

Arquivos estáticos do [taste-skill](https://github.com/Leonxlnx/taste-skill) (licença MIT), usados só pela
home (`src/app/page.tsx`). Eles ficam aqui, fora do bundle do Next, porque os módulos JS carregam uns aos
outros por caminho relativo.

- `home.css`: cores, fontes e estilos próprios da home do Lume. É o único arquivo daqui editado à mão.
- O resto é o kit copiado sem alterações. Para atualizar, copie de novo a pasta `assets/` do taste-skill,
  mantendo só os arquivos que a home usa (ver a lista em `src/app/page.tsx`).
- O protótipo de origem, com as capturas e as verificações, está em `design/home-v2/`.

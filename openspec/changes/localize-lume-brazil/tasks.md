# Tarefas: Localização do Lume para o Brasil

## Fase 0: Aprovação

- [ ] Aprovar a mudança de mercado inicial de Portugal para o Brasil.
- [ ] Decidir a praça de lançamento.
- [ ] Decidir o papel de Portugal no pitch.
- [ ] Aprovar o formato da localização pública (cidade + UF).
- [ ] Revisar a taxonomia para o vocabulário brasileiro.

## Fase 1: Base técnica

- [x] Trocar `lang="pt-PT"` por `lang="pt-BR"`.
- [x] Centralizar locale e moeda numa única configuração (ex.: `src/lib/locale.ts`) em vez de strings espalhadas.
- [x] Formatar preços com `Intl.NumberFormat` em BRL.
- [x] Trocar `toLocaleLowerCase("pt-PT")` pela configuração central.

## Fase 2: Conteúdo

- [x] Revisar o vocabulário PT-PT em páginas, componentes e e-mails.
- [x] Reescrever os dados demonstrativos com cidades, preços e prestadores brasileiros.
- [ ] Atualizar textos de privacidade para a LGPD.

## Fase 3: Validação

- [x] Rodar `typecheck` e `lint` (2026-11-26, ambos sem erros).
- [ ] Rodar `build` e os testes unitários no PC (o ambiente do Claude não executa os binários nativos de Windows).
- [ ] Rodar `audit`, `audit:viewport`, `audit:auth` e `audit:marketplace`.
- [x] Buscar no código os termos PT-PT restantes e confirmar que nenhum ficou.
- [ ] Revisar as capturas de tela nas 5 viewports.

## Registro da implementação (2026-11-26)

Feito antes da aprovação formal das decisões da Fase 0, por pedido do fundador. Escolhas provisórias, fáceis de reverter:

- **Localização pública:** cidade + UF (ex.: "Recife, PE").
- **Dados demonstrativos:** 12 prestadores espalhados por capitais e grandes cidades (São Paulo, Rio de Janeiro, Belo Horizonte, Curitiba, Porto Alegre, Recife, Salvador, Fortaleza, Florianópolis, Goiânia, Campinas e Niterói), em vez de uma praça única. Quando a praça de lançamento for decidida, os dados podem se concentrar nela.
- **Preços:** valores de referência do mercado brasileiro, só para demonstração.
- **Taxonomia:** "Casa e reparações" virou "Casa e reparos", "Jardim e exterior" virou "Jardim e áreas externas" e "Apoio informático" virou "Suporte de informática". Os slugs das categorias não mudaram.
- **Slugs:** as URLs usadas pelos testes foram mantidas. Três prestadores ganharam nomes e slugs brasileiros: `helena-souza`, `rodrigo-neves` e `rafael-batista`.
- **Textos de LGPD:** pendentes, porque a interface ainda não tem página de privacidade.

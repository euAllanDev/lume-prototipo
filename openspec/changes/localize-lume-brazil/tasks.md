# Tarefas: Localização do Lume para o Brasil

## Fase 0: Aprovação

- [ ] Aprovar a mudança de mercado inicial de Portugal para o Brasil.
- [ ] Decidir a praça de lançamento.
- [ ] Decidir o papel de Portugal no pitch.
- [ ] Aprovar o formato da localização pública (cidade + UF).
- [ ] Revisar a taxonomia para o vocabulário brasileiro.

## Fase 1: Base técnica

- [ ] Trocar `lang="pt-PT"` por `lang="pt-BR"`.
- [ ] Centralizar locale e moeda numa única configuração (ex.: `src/lib/locale.ts`) em vez de strings espalhadas.
- [ ] Formatar preços com `Intl.NumberFormat` em BRL.
- [ ] Trocar `toLocaleLowerCase("pt-PT")` pela configuração central.

## Fase 2: Conteúdo

- [ ] Revisar o vocabulário PT-PT em páginas, componentes e e-mails.
- [ ] Reescrever os dados demonstrativos com cidades, preços e prestadores brasileiros.
- [ ] Atualizar textos de privacidade para a LGPD.

## Fase 3: Validação

- [ ] Rodar `typecheck`, `lint` e `build`.
- [ ] Rodar `audit`, `audit:viewport`, `audit:auth` e `audit:marketplace`.
- [ ] Buscar no código os termos PT-PT restantes e confirmar que nenhum ficou.
- [ ] Revisar as capturas de tela nas 5 viewports.

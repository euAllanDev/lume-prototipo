# Localização do Lume para o Brasil

## Status

Proposta aguardando aprovação. Nada desta change deve ser implementado antes de as decisões abaixo serem aprovadas.

## Por que

O Lume vai concorrer no Sebrae Supernova (3ª temporada de 2026). O programa avalia inovação e relevância, validação com o público-alvo, modelo de negócio, escalabilidade e pitch, com foco no impacto em comunidades e mercados atendidos pelo Sebrae.

A visão do produto define Portugal como mercado inicial (PT-PT, euro, regiões portuguesas). Decisão do fundador em 2026-11-25: **o Brasil passa a ser o mercado inicial**, e Portugal/Europa passam a ser uma expansão futura. Essa decisão substitui a seção 1 da visão do produto ("O projeto começa com foco no mercado português") e afeta idioma, moeda, localização, privacidade e dados demonstrativos.

A arquitetura já prevê expansão para outros países. Esta change usa essa previsão: o Brasil entra como primeiro mercado configurado, sem fechar a porta para Portugal.

## O que muda

- **Idioma:** PT-PT passa a ser PT-BR em toda a interface, nos e-mails, nos metadados (`lang="pt-BR"`) e nas comparações de texto (`toLocaleLowerCase("pt-BR")`).
- **Moeda:** euro (€) passa a ser real (R$), com formatação feita por `Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })` em vez de strings fixas.
- **Localização:** a hierarquia pública passa de cidade/região portuguesa para cidade/UF brasileira. Os níveis de privacidade (público, aproximado, interno) não mudam.
- **Privacidade:** a LGPD passa a ser a referência principal. O RGPD fica registrado para a expansão europeia.
- **Dados demonstrativos:** prestadores, ofertas, cidades e preços de `src/data/marketplace.ts` são reescritos para o contexto brasileiro.
- **Vocabulário:** termos de Portugal são trocados pelos equivalentes brasileiros (ex.: "palavra-passe" vira "senha", "iniciar sessão" vira "entrar", "saltar para o conteúdo" vira "pular para o conteúdo", "contacto" vira "contato", "equipa" vira "equipe", "gerir" vira "gerenciar", "está a ser" vira "está sendo").

## Fora de escopo

- Novas funcionalidades, regras comerciais, pagamentos ou permissões.
- Mudanças na direção visual (Gallery, Salon e Desk continuam valendo).
- Suporte a vários idiomas ao mesmo tempo (i18n completo). Isso fica para quando a expansão para Portugal for retomada.
- Escolha de provedor de geocodificação e raio de busca, que continuam pendentes.

## Decisões que precisam de aprovação

1. **Praça de lançamento:** em qual cidade ou região o Lume começa? Isso define os dados demonstrativos e a narrativa do pitch.
2. **Texto da marca:** o tagline "Serviços com confiança" e "um lugar onde habilidades encontram oportunidades" continuam como estão?
3. **Portugal:** fica documentado só como expansão futura ou aparece no pitch como prova de escalabilidade?
4. **Localização pública:** a UF é exibida sempre junto da cidade (ex.: "Campinas, SP")?
5. **Taxonomia:** as categorias atuais servem ao Brasil ou precisam de ajuste (ex.: "canalizador" vira "encanador")?

## Arquivos afetados (levantamento de 2026-11-26)

`web/src/`:
- `app/layout.tsx`: `lang="pt-PT"`.
- `features/offers/catalog.ts`: `toLocaleLowerCase("pt-PT")` na busca e nos filtros.
- `data/marketplace.ts`: preços em € e cidades portuguesas.
- `components/layout/skip-link.tsx`, `components/auth/auth-form.tsx`, `components/marketplace/catalog-explorer.tsx`, `lib/auth.ts`: vocabulário PT-PT.
- `app/como-funciona`, `app/para-prestadores`, `app/ofertas/[slug]`, `app/recuperar-senha`, `app/redefinir-senha`, `app/verificar-email`: vocabulário PT-PT.

Fora de `web/`: o protótipo antigo (`app.js`, `index.html`) não entra nesta change.

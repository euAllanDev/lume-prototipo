# Diagnóstico: o Lume diante dos critérios do Sebrae Supernova

Levantamento de 2026-11-26. Compara o que o repositório já tem com o que a banca avalia. Não é plano aprovado; serve para decidir prioridades.

## Como o Supernova avalia

Fonte: regulamento publicado do Sebrae Supernova (edição Rede Federal, capítulo VIII). **Confirmar no regulamento da 3ª temporada de 2026**, porque datas, tamanho de equipe e regras de orientador podem ser diferentes.

- **Entregas obrigatórias:** apenas duas. O **Business Model Canvas** completo e um **pitch em vídeo de até 3 minutos**, que identifique a equipe, o problema, a solução, a proposta de valor e o impacto. Entrega incompleta desclassifica.
- **Protótipo:** não é obrigatório. O produto conta como evidência dentro do pitch e da validação.
- **Critérios:** cinco, cada um com nota de 1 a 10 e o mesmo peso.
  1. Inovação e relevância.
  2. Validação e aderência ao mercado: evidências práticas com o público-alvo.
  3. Consistência e viabilidade do modelo de negócio (Canvas).
  4. Escalabilidade estimada.
  5. Qualidade do pitch: clareza, objetividade e narrativa.
- **Bônus:** +1 ponto com orientador(a) e +1 ponto com apoio do Ambiente de Inovação da instituição. Máximo de 52 pontos.
- **Desempate, nesta ordem:** inovação, validação, Canvas, escalabilidade, pitch.

## Situação atual por critério

| Critério | O que já existe | Lacuna | Situação |
| --- | --- | --- | --- |
| 1. Inovação e relevância | Visão de produto clara: uma conta com duas capacidades (cliente e prestador), serviços presenciais e remotos no mesmo lugar, privacidade de localização por níveis. | O diferencial ainda não foi comparado com os concorrentes brasileiros. A narrativa de impacto social (renda para quem tem habilidade e não tem vitrine) ainda não está nos números do Brasil. | Média |
| 2. Validação | Processo de validação muito bem desenhado: 9 hipóteses (H-01 a H-09), roteiros de entrevista com consentimento, plano de recrutamento e modelo de registro de evidências. | **0 entrevistas reais.** Todas as hipóteses estão `nao validada`. Os perfis de recrutamento citam Portugal e Países Baixos. | **Crítica** |
| 3. Modelo de negócio | Público, proposta de valor e canais estão descritos na visão do produto. | **Não existe Canvas.** A fonte de receita não está definida, e a visão proíbe inventar pagamentos. Essa decisão é do fundador. | **Crítica** (é entrega obrigatória) |
| 4. Escalabilidade | A arquitetura foi pensada para vários países. A taxonomia vem do banco, não do código. | Não há estimativa de mercado (TAM/SAM/SOM) para o Brasil nem plano de expansão por cidades. | Média |
| 5. Pitch | Produto real e navegável (Next.js, auth, perfis, catálogo) com direção visual premium, ótimo para aparecer no vídeo. | Não há roteiro, deck nem vídeo. A demo ainda está em PT-PT e em euro. | Alta prioridade |

## Concorrentes que a banca vai lembrar

O mapeamento atual (`prepare-marketplace-product-validation/competitor-mapping.md`) cobre plataformas europeias e americanas. A banca brasileira vai comparar o Lume com alternativas brasileiras. A lista abaixo é **para pesquisar e verificar**, não é análise feita: GetNinjas, Workana, 99Freelas, Triider, Parafuzo, OLX Serviços e grupos de WhatsApp e Facebook de bairro.

## Prioridades sugeridas

1. **Começar as entrevistas reais já**, com clientes e prestadores no Brasil, usando os roteiros que já existem e adaptando o recrutamento. É o critério mais fraco, é o segundo critério de desempate e não depende de código.
2. **Decidir o modelo de receita** e montar o Canvas. É entrega obrigatória.
3. **Deixar a demo em PT-BR e R$** (change `localize-lume-brazil`) para gravar o pitch.
4. **Roteiro do pitch de 3 minutos**, depois de ter as evidências das entrevistas.
5. **Conferir o bônus:** confirmar orientador(a) e o apoio do Ambiente de Inovação da instituição (+2 pontos).

## Pendências que precisam de resposta

- Data exata de entrega do Canvas e do pitch na 3ª temporada.
- Composição da equipe e orientador(a).
- Fonte de receita do Lume.

# Design: Arquitetura Proposta do MVP Operacional

## Relacao com Mudancas Anteriores

`create-service-marketplace-prototype` permanece registro historico concluido de jornadas demonstrativas baseadas em `Task` e `Application`, identidades ficticias e estado local. A arquitetura operacional nao altera esse artefato. Ela incorpora decisoes posteriores: oferta e pedido separados, propostas nos dois sentidos, ofertas publicas e geolocalizacao no primeiro incremento.

`prepare-marketplace-product-validation` permanece independente. Suas hipoteses nao validadas e tarefas pendentes nao sao resolvidas por esta preparacao tecnica.

## Arquitetura Confirmada

Futuro MVP usa monolito full-stack em Next.js App Router e TypeScript sobre Node.js. Interface, logica e acesso ao PostgreSQL Neon pertencem ao mesmo deploy/repositorio. Drizzle ORM e escolha aprovada para acesso e migracoes futuras. Navegador nunca acessa banco, geocodificador com credencial ou dados privados diretamente.

## Modelo de Dominio

### Oferta de Servico

Recurso criado por prestador para descrever servico que oferece.

Campos minimos candidatos:

- ID estavel, `ownerId`, estado de publicacao, disponibilidade e timestamps.
- Titulo, descricao do resultado/escopo e subcategoria ativa.
- Modalidade `remote`, `in_person` ou `hybrid`.
- Para `in_person`/`hybrid`: area de atendimento e localizacao operacional conforme precisao aprovada; em hibrido, descricao da parte presencial.
- Condicoes essenciais aprovadas para descoberta, por exemplo modelo de preco ou disponibilidade, sem exigir pagamento integrado.
- Campos publicos derivados/minimizados separados dos dados privados de localizacao.

Somente sessao autenticada cria oferta vinculada a si, edita seu rascunho, publica ou retira sua oferta. Visitante pode consultar somente oferta `published` e `available`, sem receber rascunho, proposta, contato privado, morada ou coordenada exata.

### Pedido de Servico

Recurso criado por cliente para descrever trabalho de que necessita.

Campos minimos candidatos:

- ID estavel, `ownerId`, estado de publicacao/necessidade e timestamps.
- Titulo, descricao do resultado/escopo e subcategoria ativa.
- Modalidade `remote`, `in_person` ou `hybrid`.
- Prazo ou janela temporal e condicoes essenciais aprovadas.
- Para `in_person`/`hybrid`: local da necessidade na precisao operacional aprovada; em hibrido, descricao da parte presencial.
- Audiencia e campos de apresentacao derivados conforme politica de visibilidade ainda pendente.

Somente sessao autenticada cria pedido vinculado a si, edita rascunho, publica ou retira. Consulta depende da audiencia aprovada: publica controlada, autenticada ou restrita a prestador elegivel.

### Separacao e Reutilizacao

Oferta e pedido nao sao o mesmo conceito: possuem autor contextual, destinatario de proposta, semantica de localizacao, disponibilidade, campos e riscos de exposicao diferentes. Nao ha justificativa aprovada para um unico registro fisico.

Podem compartilhar conta/sessao, taxonomia, enum de modalidade, componentes de endereco, representacao geografica, validadores comuns, mecanismo de pesquisa, paginacao, ordenacao, auditoria e estrutura base de proposta. Devem conservar regras proprias de ownership, audiencia, campos, estados e elegibilidade. Duplicacao pequena de constraints explicitas e preferivel a um modelo generico que aceite combinacoes invalidas.

## Estados e Ciclo de Vida

| Recurso | Estado de publicacao | Estado operacional | Regras do primeiro incremento |
| --- | --- | --- | --- |
| Oferta | `draft`, `published`, `withdrawn` | `available`, `unavailable` | Rascunho privado; publicar exige campos validos/categoria ativa; somente `published/available` e descoberto e recebe proposta; proprietario pode tornar indisponivel ou retirar. |
| Pedido | `draft`, `published`, `withdrawn` | `open`, `paused`; `fulfilled` reservado | Rascunho privado; publicar exige campos validos/categoria ativa; somente `published/open` e elegivel conforme audiencia; proprietario pode pausar ou retirar. `fulfilled` depende da decisao sobre aceitacao. |
| Proposta | `submitted` | nao aplicavel | Sem aceitar, rejeitar ou retirar no primeiro incremento; estados posteriores exigem decisao propria. |

Editar publicacao ja publicada pode mudar informacao avaliada por proponentes. Primeiro incremento deve ou restringir alteracao a disponibilidade/retirada ou criar politica explicita de revisao; escolha permanece pendente. Retirada impede novas propostas, preserva referencia privada de propostas existentes conforme retencao aprovada e remove recurso da descoberta. Nao ha exclusao silenciosa para contornar historico.

## Propostas nos Dois Sentidos

Proposta referencia exatamente uma origem:

- Cliente autenticado -> oferta publicada/disponivel de outro utilizador. Autor e cliente da sessao; destinatario e `ownerId` da oferta.
- Prestador autenticado -> pedido publicado/aberto de outro utilizador. Autor e prestador da sessao; destinatario e `ownerId` do pedido.

Campos minimos candidatos: ID, tipo/ID de origem, `authorId`, `recipientId`, mensagem/termos aprovados, estado e timestamps. Servidor deriva autor, destinatario e tipo a partir da sessao e origem; IDs enviados pelo navegador nao concedem ownership.

Invariantes:

- Uma proposta pertence a exatamente uma oferta ou um pedido, nunca ambos ou nenhum.
- Autor e destinatario sao contas distintas.
- No maximo uma proposta do mesmo autor para a mesma origem; constraint persistente protege concorrencia.
- Origem deve estar publicada e elegivel no momento atomico da criacao.
- Oferta indisponivel/retirada e pedido pausado/retirado rejeitam nova proposta.
- Autor e destinatario consultam proposta; visitante, outro utilizador e outros proponentes nao consultam nem inferem conteudo.
- Politica futura de elegibilidade de prestador deve ser aplicada no servidor e explicavel; hoje permanece pendente.

Aceitar proposta, selecionar contraparte, fechar publicacao, rejeitar demais propostas e iniciar contrato sao decisoes pendentes. Nenhuma dessas acoes, nem mensagens, pagamentos ou disputas, entra por implicacao.

## Taxonomia

Categoria e subcategoria possuem ID/chave estavel separado do nome PT-PT. Publicacao referencia subcategoria; categoria pai e derivada. Somente subcategoria ativa e permitida para nova publicacao ou republicacao.

- Renomear preserva ID e referencias.
- Desativar impede novas publicacoes e republicacoes; nao apaga referencia historica.
- No primeiro incremento, publicacao existente em categoria desativada sai da descoberta e nao recebe novas propostas ate reclassificacao. O proprietario recebe estado/motivo e caminho para escolher subcategoria ativa. Historico e propostas existentes preservam a referencia original conforme retencao aprovada.
- Reorganizacao usa mapeamento explicito e auditavel. Mudanca semantica nao reutiliza ID antigo para significado diferente.
- Reclassificacao automatica so ocorre quando equivalencia e inequivoca e aprovada; caso contrario, proprietario recebe comunicacao e publicacao aguarda escolha entre categorias ativas.
- Pesquisa pode manter sinonimos e nomes anteriores sem duplicar categoria.

Taxonomia extensa e categorias reguladas aguardam validacao comercial/editorial e analise juridica.

## Modalidade e Localizacao

### Semantica por Modalidade

- `remote`: execucao exclusivamente remota. Nao exige endereco, coordenada, area ou permissao de geolocalizacao. Localizacao de perfil nao afeta elegibilidade.
- `in_person`: exige local da necessidade para pedido ou area/ponto operacional e raio/municipios atendidos para oferta, conforme modelo aprovado.
- `hybrid`: exige indicar parte presencial e aplicar regras geograficas a essa parte; componente remoto continua encontravel sem proximidade.

### Tres Contextos Distintos

- Localizacao do perfil: base declarada opcional da pessoa; nao prova residencia, nao substitui local da publicacao e nao deve ser copiada sem confirmacao.
- Localizacao da oferta: base operacional e area onde prestador aceita atender; pode diferir do perfil.
- Localizacao do pedido: local onde trabalho presencial e necessario; tende a revelar mais sobre cliente e exige politica de exposicao mais restritiva.

### Camadas de Dados

| Camada | Exemplo | Acesso candidato |
| --- | --- | --- |
| Entrada privada | Morada estruturada, codigo postal completo, texto original | Proprietario e operacao estritamente necessaria; nunca catalogo publico. |
| Operacional | Coordenada normalizada, qualidade/origem da geocodificacao, area/raio | Servidor e funcoes autorizadas de pesquisa; acesso interno auditavel. |
| Apresentacao | Distrito/concelho/localidade, codigo postal parcial, area aproximada | Conforme audiencia do recurso; ofertas publicas recebem somente granularidade aprovada. |
| Consulta | Ponto/localidade usado para proximidade | Efemero ou retido somente conforme politica aprovada; nao inserir em logs por padrao. |

Endereco e coordenada nao sao equivalentes. Guardar texto necessario para correcao operacional separado do ponto calculado e da etiqueta publica. Coordenadas devem ser validadas para latitude/longitude e territorio suportado quando aplicavel. Resultado do geocodificador inclui qualidade suficiente para rejeitar ambiguidade; utilizador confirma localidade sem precisar manipular mapa.

Precisao minima por operacao, sem fixar numero de casas ou raio antes da aprovacao:

| Operacao | Precisao necessaria |
| --- | --- |
| Perfil | Localidade/area declarada, se coletada; nao requer ponto residencial exato. |
| Publicar oferta local | Ponto ou area operacional suficiente para testar area de atendimento e calcular proximidade; apresentacao publica deliberadamente menos precisa. |
| Publicar pedido local | Ponto operacional suficiente para proximidade; endereco completo somente se necessario e privado; apresentacao segue audiencia aprovada. |
| Descoberta por proximidade | Origem com qualidade conhecida e precisao compativel com raio/ordenacao; sistema nao mostra mais precisao que a fonte suporta. |
| Proposta | Nao aumenta acesso a endereco/coordenada por si so; eventual revelacao posterior exige decisao propria. |
| Remoto | Nenhuma precisao geografica exigida. |

Numero de casas decimais, limiar de qualidade, raio minimo, arredondamento de distancia e granularidade publica permanecem pendentes porque afetam utilidade e reidentificacao.

### Pesquisa e Distancia

Pesquisa minima aplica, nesta ordem conceitual: audiencia/estado elegivel, texto, categoria/subcategoria, modalidade e proximidade quando solicitada e disponivel. Resultados usam ordenacao escolhida e desempate estavel por ID. Sem escolha de ordenacao, criterio inicial explicito (por exemplo publicacao recente + ID) deve ser aprovado; nao usar relevancia opaca.

Para remoto, filtro geografico nao exclui resultado. Para presencial/hibrido, distancia e calculada entre origem de pesquisa autorizada e ponto/area operacional. Interface informa unidade, aproximacao e que distancia geodesica nao equivale a rota ou tempo. Se origem, coordenada ou geocodificacao faltar, resultado nao inventa distancia: informa indisponibilidade, permite introduzir localidade/endereco por texto ou mostra resultados sem ordenar por proximidade conforme regra aprovada.

### Opcoes Tecnicas

| Opcao | Vantagens | Custos/riscos |
| --- | --- | --- |
| PostGIS `geography(Point,4326)` no PostgreSQL/Neon | Distancia geodesica em metros, `ST_DWithin`, indices espaciais e filtragem no banco. | Extensao, migrations/SQL e mapeamento Drizzle precisam validacao; maior conhecimento operacional. |
| Latitude/longitude numericas + Haversine SQL/aplicacao | Estrutura simples e portavel; menor dependencia de extensao. | Constraints/indice espacial limitados, formulas repetidas, pior filtragem em escala e risco de divergencia de precisao. |
| Localidade/codigo postal sem coordenada | Menor dependencia externa e menor precisao pessoal. | Nao satisfaz calculo de distancia detalhado confirmado; serve somente como fallback/apresentacao. |

**Recomendacao tecnica, nao decisao:** PostGIS `geography(Point,4326)` para pontos operacionais e consultas por raio/distancia; enderecos privados e apresentacao aproximada ficam em campos separados. Drizzle pode gerir colunas suportadas e SQL tipado/customizado onde necessario, mas compatibilidade exata deve ser provada antes de esquema. Confirmar PostGIS na regiao/plano Neon escolhidos.

Geocodificacao pode usar provedor gerenciado, servico baseado em dados abertos ou base propria. Gerenciado reduz operacao mas cria dependencia, termos e custo; dados abertos nao significam endpoint publico irrestrito nem eliminam atribuicao/privacidade; operar base propria aumenta infraestrutura e atualizacao. Provedor concreto e pendente. Verificar somente fontes oficiais vigentes para cobertura Portugal, limites, cache, retencao, atribuicao, disponibilidade e preco.

PostgreSQL/Neon com PostGIS e interface sem mapa podem permitir inicio sem fornecedor cartografico pago, sujeito a limites oficiais vigentes. Isso nao resolve geocodificacao: disponibilidade gratuita de qualquer endpoint deve ser confirmada e nao pode ser presumida como adequada a carga comercial.

Mapa nao e necessario para cumprir localizacao/distancia. Se aprovado, complemento visual nunca substitui campo de endereco/localidade, lista textual, distancia em texto e confirmacao acessivel.

## Descoberta Publica e Privacidade

Visitante consulta lista/detalhe de ofertas `published/available`. Resposta publica usa allowlist de campos; nao serializa registro interno e remove email, contato privado, endereco detalhado, coordenada exata, consultas, propostas e identificadores desnecessarios. Enviar proposta redireciona/solicita autenticacao sem perder contexto seguro.

Rascunhos ficam somente com proprietario. Propostas ficam com autor e destinatario. Identidade publica usa somente nome/identificador de exibicao aprovado e informacao necessaria para avaliar publicacao; identidade civil, email e contato nao sao implicados.

Pedidos precisam de politica aprovada. Consequencias das opcoes constam em `decisions.md`. Mesmo se publicos, devem usar campos controlados, localizacao aproximada e revisao contra texto livre que exponha morada, telefone ou rotina. Autenticacao sozinha nao elimina scraping, abuso ou reidentificacao.

Toda entrada textual publica requer limites, normalizacao segura, moderacao/denuncia futura avaliada e renderizacao que nao execute conteudo. Rate limiting deve cobrir pesquisa, detalhe publico, geocodificacao e propostas segundo risco. Logs nao recebem endereco, coordenada, consulta textual ou corpo de proposta por padrao.

## Autorizacao e Erros

Sessao validada no servidor identifica conta para toda mutacao e leitura privada. Visitante tem somente leitura publica de ofertas elegiveis. Identificador de rota localiza recurso; nao concede acesso.

| Situacao | Resposta candidata |
| --- | --- |
| Mutacao sem sessao | `401`, sem persistencia. |
| Sem permissao sobre recurso conhecido | `403`; para recurso privado nao enumeravel, `404`. |
| Entrada/estado/localizacao invalida | `422` com campos seguros. |
| Proposta duplicada | `409`, protegida por constraint. |
| Origem retirada/indisponivel | `409` ou `422` consistente, sem criar proposta. |
| Geocodificacao indisponivel/ambigua | Erro recuperavel; manter rascunho e permitir correcao/fallback, sem publicar ponto incerto. |
| Banco indisponivel/timeout | `503`, sem SQL/segredo e sem confirmar gravacao. |

Validacao cobre tipo, presenca, tamanho, enum, taxonomia ativa, transicao, coordenadas, precisao, audiencia e ownership. Operacoes com multiplas escritas usam transacao e constraints persistentes.

## Acessibilidade

WCAG 2.2 AA e referencia de projeto. Cada fluxo implementado deve combinar verificacao automatizada com teste manual; automacao nao prova conformidade.

Criterios verificaveis:

- Publicacao de oferta e pedido funciona por teclado, tem progresso compreensivel, rotulos/instrucoes, erros associados, resumo antes da publicacao e foco conduzido ao erro/sucesso.
- Pesquisa/filtros anunciam quantidade, carregamento, erro, vazio e filtros ativos; remover/limpar preserva contexto; resultado e ordenacao nao dependem de cor.
- Localizacao aceita introducao textual e selecao sem mapa. Autocomplete e operavel por teclado e leitor de ecra; sugestoes, ambiguidade e confirmacao sao anunciadas.
- Mapa, se existir, e complementar. Nenhuma acao exige gesto, arrastar, precisao de ponteiro ou interpretacao visual do mapa.
- Distancia, modalidade e area sao fornecidas em texto. Resultado geografico possui alternativa em lista e nao usa somente posicao espacial.
- Envio/consulta de proposta expoe destinatario contextual, origem, estado e feedback; dialogos devolvem foco; erros dinamicos usam anuncio apropriado.
- A 200% de zoom e reflow equivalente a 320 CSS px, leitura/acao principal nao exige rolagem horizontal bidimensional, salvo conteudo essencial permitido e com alternativa.

Matriz minima:

| Metodo | Fluxos | Verificacao minima |
| --- | --- | --- |
| Automatizado | Paginas publicas, formularios, filtros, detalhe e propostas | Semantica, nome/papel, contraste detectavel, erros comuns e regressao por rota/estado. |
| Teclado | Todos os fluxos | Ordem/foco visivel, sem armadilha, skip/navigation, dialogs, autocomplete, filtros e retorno ao gatilho. |
| Zoom/reflow | Todos os fluxos | 200% e viewport estreito; texto/acoes acessiveis sem perda ou sobreposicao. |
| Leitor de ecra | Oferta/pedido, pesquisa/localizacao e proposta | Estrutura, rotulos, sugestoes, resultados dinamicos, distancia, erros e confirmacoes anunciados. |
| Manual visual/cognitivo | Todos os fluxos | Texto claro, instrucoes persistentes, alvos, contraste, estados nao dependentes de cor/icone/posicao. |

Matriz futura deve nomear navegador, sistema operativo e leitor de ecra suportados, registrar data, evidencias, falhas e excecoes. Lancamento nao pode alegar conformidade apenas por checklist.

## Viabilidade do Primeiro Incremento

Complexidade aumentou substancialmente. Viabilidade depende de sequenciamento:

1. Decidir audiencia de pedidos, localizacao/privacidade, autenticacao, Neon e taxonomia minima.
2. Construir fundacao, conta, taxonomia e representacao geografica.
3. Entregar oferta completa e descoberta publica com localizacao/distancia.
4. Entregar pedido conforme audiencia aprovada, reutilizando componentes comuns.
5. Entregar propostas nos dois sentidos e consultas privadas.
6. Verificar seguranca, privacidade, concorrencia e acessibilidade antes de dados reais.

Necessario no incremento: ambos recursos, ambos sentidos de proposta `submitted`, ofertas publicas, audiencia aprovada de pedidos, geocodificacao minima/fallback, distancia, auth/autorizacao, PostgreSQL/Drizzle e acessibilidade dos fluxos.

Posterior: aceitacao e seus efeitos, mensagens, pagamentos, contratos, disputas, notificacoes, reputacao, mapas avancados, rotas, localizacao em tempo real, relevancia personalizada e taxonomia extensa.

## Pendencias

Lista normativa de decisoes fica em [decisions.md](decisions.md). Prontidao de stack, autenticacao, email, Neon, Git e geoespacial fica em [operational-readiness.md](operational-readiness.md). Nenhuma recomendacao tecnica deste design equivale a aprovacao do responsavel pelo produto.

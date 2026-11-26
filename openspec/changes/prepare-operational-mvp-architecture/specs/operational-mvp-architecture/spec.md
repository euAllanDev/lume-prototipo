# Operational MVP Architecture Preparation

## ADDED Requirements

### Requirement: Decisoes possuem estado explicito

Documentacao SHALL separar decisoes confirmadas, recomendacoes tecnicas e pendencias, sem tratar recomendacao ou direcao de produto como validacao comercial.

#### Scenario: Equipe consulta arquitetura

- **WHEN** equipe prepara futura implementacao
- **THEN** identifica marketplace bidirecional, ofertas publicas e localizacao/distancia como decisoes confirmadas, e encontra provedores, estrutura geografica, pedidos publicos, precisao e retencao como pendencias

### Requirement: Historico do prototipo permanece preservado

Documentacao SHALL tratar `create-service-marketplace-prototype` como registro concluido de prototipo demonstrativo, sem reescreve-lo para aparentar que ja cobria arquitetura operacional posterior.

#### Scenario: Equipe compara prototipo e MVP

- **WHEN** modelo `Task/Application` do prototipo difere de oferta, pedido e proposta operacionais
- **THEN** divergencia e explicada como decisao posterior e nao como erro ou evidencia comercial do prototipo

### Requirement: Oferta e pedido sao recursos distintos

Sistema futuro SHALL representar oferta criada por prestador e pedido criado por cliente com ownership, campos, audiencia, disponibilidade e ciclo explicitamente distintos. Componentes comuns MAY ser compartilhados, mas unificacao fisica SHALL exigir justificativa arquitetural e constraints que impecam combinacoes invalidas.

#### Scenario: Prestador cria oferta

- **WHEN** prestador autenticado cria rascunho de oferta
- **THEN** servidor deriva `ownerId` da sessao, mantem rascunho privado e exige campos de oferta antes de publicar

#### Scenario: Cliente cria pedido

- **WHEN** cliente autenticado cria rascunho de pedido
- **THEN** servidor deriva `ownerId` da sessao, mantem rascunho privado e exige campos de pedido antes de publicar

#### Scenario: Cliente tenta alterar oferta alheia

- **WHEN** conta sem ownership tenta editar, publicar, tornar indisponivel ou retirar oferta
- **THEN** servidor nega operacao e nao persiste alteracao

#### Scenario: Prestador tenta alterar pedido alheio

- **WHEN** conta sem ownership tenta editar, publicar, pausar ou retirar pedido
- **THEN** servidor nega operacao e nao persiste alteracao

### Requirement: Publicacoes possuem campos minimos por modalidade

Oferta SHALL conter titulo, descricao, subcategoria, modalidade, ownership, estado e disponibilidade; pedido SHALL conter titulo, descricao, subcategoria, modalidade, ownership, estado e prazo/janela candidata. Publicacao presencial ou hibrida SHALL conter dados geograficos aplicaveis; hibrida SHALL descrever componente presencial. Publicacao exclusivamente remota SHALL NOT exigir localizacao.

#### Scenario: Utilizador publica recurso remoto

- **WHEN** oferta ou pedido valido usa modalidade `remote`
- **THEN** servidor permite publicacao sem endereco, coordenada, area de atendimento ou permissao de geolocalizacao

#### Scenario: Utilizador publica recurso presencial incompleto

- **WHEN** oferta `in_person` nao possui area de atendimento ou pedido `in_person` nao possui local da necessidade na precisao aprovada
- **THEN** servidor rejeita publicacao, mantem rascunho e informa campos necessarios

#### Scenario: Utilizador publica recurso hibrido

- **WHEN** modalidade e `hybrid`
- **THEN** servidor exige descricao da parte presencial e aplica regras geograficas somente ao componente presencial

### Requirement: Rascunho, publicacao, disponibilidade e retirada sao controlados

Oferta futura SHALL usar publicacao `draft`, `published` ou `withdrawn` e disponibilidade `available` ou `unavailable`. Pedido SHALL usar publicacao `draft`, `published` ou `withdrawn` e necessidade `open` ou `paused`; `fulfilled` SHALL NOT ser ativado antes de decisao sobre aceitacao. Somente proprietario autenticado SHALL executar transicoes permitidas.

#### Scenario: Proprietario publica rascunho valido

- **WHEN** proprietario publica rascunho com categoria ativa e campos validos
- **THEN** servidor persiste `published` e aplica audiencia e elegibilidade correspondentes

#### Scenario: Recurso e retirado

- **WHEN** proprietario retira oferta ou pedido publicado
- **THEN** recurso sai da descoberta, rejeita novas propostas e preserva referencias privadas existentes conforme politica de retencao

#### Scenario: Recurso fica temporariamente indisponivel

- **WHEN** oferta fica `unavailable` ou pedido fica `paused`
- **THEN** sistema nao aceita nova proposta e comunica indisponibilidade sem apagar historico

### Requirement: Ofertas publicadas possuem consulta publica minimizada

Visitante SHALL poder pesquisar e consultar oferta `published/available` sem sessao. Resposta publica SHALL usar allowlist e SHALL NOT conter rascunho, proposta, email, contato privado, morada detalhada, coordenada exata, consulta geografica ou identificador pessoal desnecessario.

#### Scenario: Visitante consulta oferta publicada

- **WHEN** requisicao sem sessao abre oferta elegivel
- **THEN** servidor retorna somente campos publicos aprovados, modalidade e localizacao aproximada aplicavel

#### Scenario: Visitante consulta rascunho ou oferta retirada

- **WHEN** requisicao sem sessao usa ID de oferta nao publica
- **THEN** servidor nao retorna conteudo nem permite enumerar recurso privado

#### Scenario: Visitante tenta enviar proposta

- **WHEN** visitante inicia proposta para oferta publica
- **THEN** sistema exige autenticacao, nao persiste proposta anonima e preserva apenas contexto seguro necessario para continuar

### Requirement: Audiencia dos pedidos permanece decisao explicita

Documentacao SHALL comparar pedidos publicos com campos controlados, pedidos somente para autenticados e pedidos somente para prestadores elegiveis. Implementacao futura SHALL NOT presumir audiencia antes de aprovacao e SHALL aplicar allowlist de campos e localizacao apropriada a opcao escolhida.

#### Scenario: Equipe planeja descoberta de pedidos

- **WHEN** politica de audiencia ainda nao foi aprovada
- **THEN** tarefa de implementacao permanece bloqueada e documentacao nao descreve pedido como publico por omissao

### Requirement: Propostas funcionam nos dois sentidos

Sistema futuro SHALL permitir cliente autenticado propor a oferta publicada/disponivel de outro utilizador e prestador autenticado propor ao pedido publicado/aberto de outro utilizador, conforme audiencia e elegibilidade aprovadas.

#### Scenario: Cliente propoe a oferta

- **WHEN** cliente autenticado envia proposta valida para oferta elegivel de terceiro
- **THEN** servidor deriva autor da sessao, destinatario do proprietario da oferta e origem da oferta, persistindo uma proposta `submitted`

#### Scenario: Prestador propoe ao pedido

- **WHEN** prestador autenticado envia proposta valida para pedido elegivel de terceiro
- **THEN** servidor deriva autor da sessao, destinatario do proprietario do pedido e origem do pedido, persistindo uma proposta `submitted`

#### Scenario: Utilizador propoe ao proprio recurso

- **WHEN** proprietario tenta enviar proposta a sua oferta ou pedido
- **THEN** servidor rejeita operacao e nao cria proposta

#### Scenario: Utilizador propoe a recurso inelegivel

- **WHEN** origem esta em rascunho, retirada, indisponivel, pausada ou fora da audiencia autorizada
- **THEN** servidor rejeita operacao sem revelar dado privado adicional

### Requirement: Proposta possui origem unica, unicidade e acesso privado

Cada proposta SHALL referenciar exatamente uma oferta ou um pedido, SHALL ter autor e destinatario distintos e SHALL ser unica por autor e origem, inclusive sob concorrencia. Somente autor e destinatario SHALL consultar seu conteudo.

#### Scenario: Proposta possui origem ambigua

- **WHEN** entrada tenta referenciar oferta e pedido simultaneamente ou nenhum deles
- **THEN** servidor rejeita entrada e constraint impede persistencia invalida

#### Scenario: Autor envia proposta duplicada

- **WHEN** mesmo autor envia segunda proposta para mesma origem, inclusive concorrentemente
- **THEN** banco preserva uma unica proposta e servidor retorna conflito seguro

#### Scenario: Terceiro consulta proposta

- **WHEN** visitante ou conta que nao e autor nem destinatario solicita proposta
- **THEN** servidor nao retorna conteudo nem confirma existencia privada

### Requirement: Aceitacao de proposta nao e presumida

Documentacao SHALL registrar como pendente significado de aceitar proposta e efeito sobre publicacao original e demais propostas. Primeiro incremento SHALL NOT incluir aceitacao, mensagens, pagamentos, contratos ou disputas por implicacao.

#### Scenario: Equipe planeja estado posterior a submitted

- **WHEN** nao existe decisao aprovada sobre aceitacao
- **THEN** proposta permanece somente `submitted` e nenhuma publicacao e encerrada automaticamente

### Requirement: Taxonomia preserva referencias

Categoria e subcategoria SHALL possuir identificadores estaveis separados do nome. Nova publicacao SHALL referenciar subcategoria ativa. Renomeacao, desativacao ou reorganizacao SHALL preservar referencia historica e SHALL NOT reclassificar semanticamente sem regra aprovada.

#### Scenario: Categoria e renomeada

- **WHEN** nome exibido muda sem mudar significado
- **THEN** ID permanece e publicacoes continuam referenciadas

#### Scenario: Categoria e desativada

- **WHEN** subcategoria com publicacoes existentes fica inativa
- **THEN** novas publicacoes/republicacoes sao recusadas, existentes saem da descoberta e deixam de receber propostas ate reclassificacao, proprietario recebe motivo/caminho de correcao e referencias historicas nao sao apagadas

#### Scenario: Categoria e reorganizada

- **WHEN** publicacao precisa migrar para nova hierarquia sem equivalencia inequivoca
- **THEN** sistema preserva historico, solicita reclassificacao ao proprietario e nao escolhe categoria silenciosamente

### Requirement: Localizacoes de perfil, oferta e pedido sao distintas

Sistema futuro SHALL tratar localizacao opcional de perfil, localizacao/area de atendimento da oferta e local da necessidade do pedido como dados com finalidades separadas. SHALL NOT copiar ou expor uma como outra sem confirmacao e autorizacao.

#### Scenario: Prestador altera localizacao do perfil

- **WHEN** oferta possui localizacao operacional propria
- **THEN** alteracao do perfil nao muda automaticamente area ou coordenada da oferta

#### Scenario: Cliente publica pedido presencial

- **WHEN** cliente confirma local da necessidade
- **THEN** servidor guarda camadas privada, operacional e de apresentacao conforme politica, sem tornar morada completa publica

### Requirement: Dados geograficos possuem camadas e acesso minimo

Endereco introduzido, coordenada operacional e representacao publica SHALL ser armazenados/tratados conforme finalidade, precisao, audiencia e retencao aprovadas. Coordenadas SHALL ser validadas; entradas e consultas geograficas SHALL NOT entrar em logs por padrao.

#### Scenario: Catalogo retorna localizacao

- **WHEN** oferta local aparece publicamente
- **THEN** resposta inclui somente localidade/area aproximada aprovada e nunca morada residencial ou coordenada exata

#### Scenario: Operacao precisa calcular distancia

- **WHEN** consulta autorizada possui origem e publicacao possui ponto operacional valido
- **THEN** servidor usa coordenadas operacionais sem expo-las ao cliente alem da precisao de apresentacao aprovada

#### Scenario: Coordenada e invalida ou ambigua

- **WHEN** latitude/longitude sai de limites ou geocodificacao nao identifica local inequivoco
- **THEN** servidor mantem rascunho, solicita correcao/confirmacao e nao publica distancia inventada

### Requirement: Pesquisa por proximidade degrada com clareza

Pesquisa SHALL permitir texto, categoria, subcategoria, modalidade, elegibilidade e ordenacao estavel. Proximidade SHALL aplicar-se somente quando relevante e dados validos estiverem disponiveis. Distancia exibida SHALL informar unidade/aproximacao e SHALL NOT ser apresentada como rota ou tempo de viagem.

#### Scenario: Utilizador pesquisa por proximidade

- **WHEN** origem valida e resultados presenciais/hibridos possuem coordenada operacional
- **THEN** sistema filtra/ordena conforme algoritmo aprovado, usa desempate estavel e apresenta distancia aproximada em texto

#### Scenario: Resultado remoto participa da pesquisa

- **WHEN** publicacao `remote` corresponde a texto/taxonomia
- **THEN** ausencia de localizacao nao a torna inelegivel

#### Scenario: Localizacao nao esta disponivel

- **WHEN** origem ou coordenada necessaria falta ou provedor falha
- **THEN** sistema informa que distancia nao esta disponivel, oferece entrada textual/correcao ou resultado sem proximidade conforme regra aprovada

### Requirement: Geocodificacao e mapas permanecem escolhas pendentes

Documentacao SHALL comparar opcoes com PostgreSQL/Neon, Drizzle, operacao, dependencia externa, privacidade e possibilidade de infraestrutura gratuita. Provedor concreto, estrutura geografica, mapa e algoritmo SHALL permanecer propostas ate aprovacao; precos/limites SHALL vir de fontes oficiais atuais.

#### Scenario: Equipe escolhe provedor geografico

- **WHEN** decisao de implementacao e preparada
- **THEN** registra fonte/data, cobertura Portugal, termos, atribuicao, cache/retencao, limites, custo, privacidade, disponibilidade e fallback sem inventar valores

### Requirement: Acessibilidade cobre todos os novos fluxos

WCAG 2.2 AA SHALL ser referencia de projeto, nao declaracao automatica de conformidade. Publicacao de oferta/pedido, pesquisa/filtros, localizacao, resultados geograficos e propostas SHALL ser operaveis e compreensiveis por teclado e tecnologia assistiva.

#### Scenario: Utilizador seleciona local sem mapa

- **WHEN** utilizador nao pode ou nao deseja operar mapa
- **THEN** introduz localidade/endereco por controle textual, opera sugestoes por teclado, recebe anuncio de ambiguidade e confirma escolha sem gesto ou ponteiro preciso

#### Scenario: Resultado geografico e lido por tecnologia assistiva

- **WHEN** leitor de ecra percorre resultados
- **THEN** modalidade, area, distancia aproximada, indisponibilidade e ordenacao sao comunicadas em texto e estrutura sem depender de posicao no mapa

#### Scenario: Formulario apresenta erro dinamico

- **WHEN** campo de publicacao, localizacao, filtro ou proposta e invalido
- **THEN** erro textual e associado ao campo, resumo/estado e anunciado e foco segue percurso previsivel

#### Scenario: Interface sofre zoom e reflow

- **WHEN** conteudo usa 200% de zoom ou viewport estreito equivalente
- **THEN** texto e acoes refluem sem perda, sobreposicao ou rolagem horizontal bidimensional para leitura normal

### Requirement: Avaliacao de acessibilidade combina metodos

Cada fluxo implementado SHALL passar por verificacao automatizada aplicavel e testes manuais de teclado, foco, formularios, mensagens dinamicas, zoom/reflow e pelo menos um leitor de ecra em matriz documentada.

#### Scenario: Verificador automatizado nao encontra falhas

- **WHEN** automacao termina sem erro
- **THEN** equipe ainda executa testes manuais, registra ambiente/evidencia e nao declara conformidade apenas por automacao

### Requirement: Autorizacao, validacao e falhas protegem dados

Sistema futuro SHALL validar sessao, ownership, audiencia, estado, taxonomia e entrada no servidor; SHALL usar constraints/transacoes para invariantes; e SHALL responder a falhas sem vazar SQL, segredos, localizacao privada ou existencia de recurso privado.

#### Scenario: Banco falha durante mutacao

- **WHEN** persistencia falha ou expira
- **THEN** servidor nao confirma gravacao, preserva atomicidade e retorna erro controlado sem dado interno

#### Scenario: Geocodificador falha durante rascunho

- **WHEN** dependencia externa fica indisponivel
- **THEN** dados validos de rascunho nao sao perdidos, publicacao incerta nao ocorre e utilizador recebe caminho recuperavel

### Requirement: Primeiro incremento explicita aumento de complexidade

Documentacao SHALL tratar dois recursos, dois sentidos de proposta, catalogo publico, geolocalizacao/distancia, autenticacao, PostgreSQL/Drizzle e acessibilidade como aumento real de escopo. Tarefas SHALL ser decompostas com dependencias e aceite verificavel; nenhuma tarefa SHALL ser marcada concluida sem evidencia.

#### Scenario: Equipe planeja entrega incremental

- **WHEN** prepara mudanca de implementacao
- **THEN** resolve bloqueios de audiencia/localizacao/autenticacao, sequencia fundacao, taxonomia, publicacoes, descoberta e propostas, e mantem aceitacao, mensagens, pagamentos, contratos e disputas fora

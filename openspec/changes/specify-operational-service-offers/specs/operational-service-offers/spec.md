# Operational Service Offers

## ADDED Requirements

### Requirement: Oferta pertence a identidade unica com capacidade de prestador

Sistema futuro SHALL associar cada oferta a exatamente um `userId` Better Auth e SHALL exigir capacidade `provider` persistida para criar o rascunho. Perfil, capacidade e oferta SHALL permanecer recursos separados. Sistema SHALL derivar proprietario da sessao validada e SHALL NOT aceitar `ownerId`, papel ou capacidade enviados pelo cliente como autoridade.

#### Scenario: Prestador cria rascunho

- **WHEN** sessao valida com capacidade `provider` cria oferta
- **THEN** sistema cria oferta `draft` para `session.user.id`, mesmo que payload tente indicar outro proprietario

#### Scenario: Cliente sem capacidade cria oferta

- **WHEN** sessao valida possui somente capacidade `client` e tenta criar oferta
- **THEN** servidor nega operacao sem criar oferta ou conceder capacidade

#### Scenario: Visitante cria oferta

- **WHEN** requisicao sem sessao valida tenta criar oferta
- **THEN** servidor responde como nao autenticado e nao persiste dados

### Requirement: Campos minimos de publicacao permanecem pendentes

Rascunho MAY conter dados parciais. Modalidade SHALL usar `remote`, `in_person` ou `hybrid`, e oferta exclusivamente remota SHALL NOT exigir localizacao operacional. Sistema futuro SHALL NOT inferir como aprovados titulo, descricao, subcategoria, campos geograficos ou qualquer outro nucleo minimo de publicacao antes de decisao documental. Categoria e subcategoria, quando adotadas, SHALL NOT aceitar relacoes contraditorias.

#### Scenario: Rascunho parcial e salvo

- **WHEN** proprietario provider salva rascunho sem titulo ou subcategoria
- **THEN** sistema preserva rascunho privado sem decidir sua publicabilidade antes da aprovacao do contrato minimo

#### Scenario: Implementacao prepara validacao de publicacao

- **WHEN** schema ou API precisa definir campos obrigatorios de oferta
- **THEN** equipe aprova o nucleo minimo antes de implementar, preservando que oferta remota nao exige localizacao operacional

#### Scenario: Produto deseja exigir localizacao presencial

- **WHEN** produto define oferta `in_person` ou `hybrid`
- **THEN** campos, precisao e audiencia da localizacao sao aprovados antes de se tornarem validacao

#### Scenario: Payload combina categoria e subcategoria incompativeis

- **WHEN** cliente envia categoria que nao e pai da subcategoria selecionada
- **THEN** servidor ignora categoria como autoridade ou rejeita payload e deriva categoria somente da relacao persistida

### Requirement: Publicacao aplica gates aprovados e preserva nucleo minimo pendente

Servidor SHALL exigir sessao valida, capacidade `provider`, email verificado, ownership e estado permitido antes de publicar ou retomar oferta. Campos completos SHALL significar somente o nucleo minimo que vier a ser aprovado. Nome de apresentacao pertence a allowlist publica aprovada do perfil, mas sua presenca como gate de publicacao de oferta permanece proposta de produto; sistema SHALL NOT exigi-lo por inferencia. Foto, bio e localizacao do perfil SHALL permanecer opcionais.

#### Scenario: Prestador nao verificado publica

- **WHEN** proprietario provider com email nao verificado tenta publicar rascunho valido
- **THEN** servidor recusa sem alterar estado e informa gate de verificacao

#### Scenario: Prestador verificado publica

- **WHEN** proprietario provider verificado cumpre o contrato minimo de publicacao previamente aprovado
- **THEN** sistema muda `draft` para `published` e disponibiliza DTO publico

#### Scenario: Perfil nao possui nome de apresentacao exigivel como gate

- **WHEN** implementacao pretende bloquear publicacao por ausencia de nome de apresentacao
- **THEN** equipe aprova primeiro esse requisito de produto e sua representacao publica, sem deriva-lo somente da allowlist do perfil

#### Scenario: Outro utilizador publica oferta alheia

- **WHEN** provider verificado tenta publicar ID pertencente a outra identidade
- **THEN** servidor nao altera oferta e nao confirma existencia privada

### Requirement: Oferta usa identificadores interno e publico separados

Oferta SHALL possuir UUID interno e slug publico unico, estavel, gerado pelo servidor e opaco quanto a `userId`. Slug SHALL NOT ser editavel nem mudar quando titulo mudar. DTO publico SHALL usar slug e SHALL NOT expor UUID ou `ownerUserId`.

#### Scenario: Titulo de oferta pausada muda

- **WHEN** proprietario edita titulo de oferta `paused`
- **THEN** slug publico permanece inalterado

#### Scenario: Visitante consulta slug

- **WHEN** visitante consulta slug de oferta `published`
- **THEN** resposta retorna DTO allowlisted sem UUID ou identificador da identidade

#### Scenario: Cliente envia slug escolhido

- **WHEN** criacao inclui slug ou UUID de escolha do cliente
- **THEN** servidor nao usa esses valores como identificadores autoritativos

### Requirement: Campos comerciais de oferta permanecem pendentes

Sistema futuro SHALL NOT tratar preco, disponibilidade ou prazo da oferta como opcionais, obrigatorios ou estruturados antes de aprovacao de produto. Opcionalidade de orcamento, disponibilidade e prazo aprovada para pedidos SHALL NOT ser transposta para ofertas. Tipos `fixed`, `starting_at`, `hourly` e `quote`, EUR, nota textual e intervalo em dias permanecem propostas deste incremento.

#### Scenario: Oferta omite dados comerciais

- **WHEN** desenho futuro pretende publicar oferta sem preco, disponibilidade ou prazo
- **THEN** equipe solicita aprovacao da opcionalidade antes de implementar schema ou validator

#### Scenario: Modelo de preco e escolhido

- **WHEN** produto aprova preco para oferta
- **THEN** decisao define tipos, moeda, montante, limites e representacao publica

#### Scenario: Proposta tecnica usa tipo quote

- **WHEN** implementacao considera `quote` sem montante
- **THEN** combinacao permanece proposta ate aprovacao do modelo de preco

#### Scenario: Prazo e aprovado

- **WHEN** produto aprova intervalo de prazo para oferta
- **THEN** decisao define unidade, opcionalidade, limites e validacao de intervalo

### Requirement: Imagens e anexos nao pertencem ao modelo inicial

Oferta inicial SHALL NOT persistir imagens ou anexos. Sistema SHALL NOT aceitar URL, blob ou ficheiro como campo de oferta antes de contrato de storage, licenca, consentimento, moderacao, malware, acessibilidade, remocao e autorizacao aprovado.

#### Scenario: Cliente envia anexo na criacao

- **WHEN** payload inclui imagem ou anexo nao suportado
- **THEN** servidor rejeita ou ignora campo desconhecido de forma documentada e nao o torna publico

### Requirement: Ciclo de vida usa somente estados aprovados

Oferta SHALL usar somente `draft`, `published`, `paused`, `closed` e `cancelled`. Sistema SHALL permitir somente `draft -> published`, `published -> paused|closed|cancelled` e `paused -> published|closed|cancelled`. `closed` e `cancelled` SHALL ser finais.

#### Scenario: Proprietario pausa oferta publicada

- **WHEN** proprietario solicita pausa de oferta `published` com revisao atual
- **THEN** sistema muda estado para `paused`, remove oferta do publico e bloqueia novas propostas

#### Scenario: Proprietario retoma oferta pausada

- **WHEN** proprietario verificado retoma oferta `paused` ainda valida
- **THEN** sistema muda estado para `published` e atualiza ultima data de publicacao

#### Scenario: Reabertura de estado final

- **WHEN** qualquer ator tenta mover oferta `closed` ou `cancelled`
- **THEN** servidor recusa transicao e preserva estado final

#### Scenario: Estado desconhecido e enviado

- **WHEN** payload tenta usar `available`, `withdrawn` ou outro estado nao aprovado
- **THEN** servidor rejeita valor sem mapear comportamento antigo

### Requirement: Edicao de oferta publicada permanece pendente

Proprietario SHALL poder editar livremente oferta `draft`, conforme regra aprovada. Sistema futuro SHALL NOT impor pausa antes de editar, permitir edicao direta ou criar versao substituta para oferta `published` antes de aprovacao da politica. Mudanca de estado SHALL usar transicao aprovada, nao valor arbitrario em PATCH generico.

#### Scenario: Proprietario edita rascunho

- **WHEN** proprietario altera campo permitido de oferta `draft`
- **THEN** sistema persiste alteracao privada e incrementa revisao

#### Scenario: Proprietario edita oferta publicada

- **WHEN** proprietario tenta PATCH de conteudo em oferta `published`
- **THEN** implementacao aguarda politica aprovada e nao assume pausa obrigatoria nem edicao direta

#### Scenario: Proprietario altera status por PATCH

- **WHEN** payload de edicao inclui `status=closed`
- **THEN** servidor rejeita ou ignora campo como nao editavel e exige operacao de fechamento

### Requirement: Datas refletem publicacao e estados finais

Sistema SHALL registrar criacao, atualizacao, primeira publicacao, ultima publicacao e ultima mudanca de estado. Entrada em `closed` SHALL registrar encerramento; entrada em `cancelled` SHALL registrar cancelamento. Datas finais SHALL ser ausentes fora do estado correspondente e SHALL ser definidas pelo servidor.

#### Scenario: Oferta publica pela primeira vez

- **WHEN** rascunho muda para `published`
- **THEN** primeira e ultima data de publicacao recebem instante do servidor

#### Scenario: Oferta e retomada

- **WHEN** oferta `paused` volta a `published`
- **THEN** primeira publicacao permanece e ultima publicacao e atualizada

#### Scenario: Cliente falsifica data de encerramento

- **WHEN** payload inclui timestamp de encerramento escolhido pelo cliente
- **THEN** servidor nao usa valor como fonte de verdade

### Requirement: Localizacao possui camadas e aprovacoes separadas

Perfil publico SHALL mostrar no maximo cidade e regiao. Oferta remota SHALL NOT exigir localizacao operacional. Localizacao publica da oferta, localizacao aproximada adicional para utilizador autenticado, endereco privado e coordenadas operacionais SHALL permanecer camadas distintas; sistema SHALL NOT copiar localizacao entre perfil e oferta nem ampliar precisao por autenticacao sem aprovacao. PostGIS, colunas convencionais, campos publicos da oferta, precisao e retencao permanecem pendentes.

#### Scenario: Oferta presencial aparece no catalogo

- **WHEN** visitante recebe oferta presencial `published`
- **THEN** DTO omite endereco, coordenada e metadados operacionais e inclui somente campos de oferta cuja allowlist tenha sido aprovada

#### Scenario: Oferta remota e publicada

- **WHEN** oferta remota cumpre demais requisitos
- **THEN** sistema publica sem ponto operacional ou permissao de geolocalizacao

#### Scenario: Perfil muda de cidade

- **WHEN** prestador altera localizacao do perfil
- **THEN** localizacao operacional da oferta nao muda automaticamente

#### Scenario: Equipe escolhe armazenamento geografico

- **WHEN** implementacao precisa persistir coordenadas operacionais
- **THEN** equipe compara colunas convencionais, PostGIS e abstracao evolutiva antes de definir constraints ou indices

### Requirement: Distancia e calculada sem expor coordenadas

Pesquisa futura por proximidade SHALL representar distancia em linha reta, nao rota ou tempo, e SHALL NOT expor coordenadas de oferta ou origem no DTO publico. Camada de calculo, formula, tipo PostgreSQL e indice SHALL permanecer pendentes ate escolha da estrutura geografica. Se distancia for apresentada, sua precisao e audiencia exigem aprovacao propria.

#### Scenario: Pesquisa possui origem valida

- **WHEN** consulta de proximidade recebe origem autorizada e oferta local possui ponto valido
- **THEN** sistema futuro usa estrutura e algoritmo aprovados, aplica desempate estavel e retorna somente representacao permitida

#### Scenario: Origem ou ponto falta

- **WHEN** distancia nao pode ser calculada com dados validos
- **THEN** sistema nao fabrica valor nem trata distancia como rota

#### Scenario: Visitante inspeciona resposta

- **WHEN** resposta publica inclui distancia aproximada
- **THEN** latitude e longitude de origem e oferta permanecem ausentes

### Requirement: Gestao taxonomica preserva limites aprovados

Somente administrador autorizado SHALL gerir categoria ou subcategoria. Sistema futuro SHALL rejeitar publicacao ou retomada ligada a categoria ou subcategoria inativa, sem reclassificar a oferta. IDs estaveis, relacao fisica, politica de renomeacao e reclassificacao continuam pendentes fora do efeito de desativacao aprovado abaixo.

#### Scenario: Subcategoria e renomeada

- **WHEN** administrador autorizado altera somente nome de subcategoria
- **THEN** comportamento segue politica de identidade e historico previamente aprovada, sem reclassificacao silenciosa

#### Scenario: Prestador publica em subcategoria inativa

- **WHEN** proprietario tenta publicar ou retomar oferta ligada a subcategoria inativa
- **THEN** servidor recusa a operacao, preserva `draft` ou `paused` e nao infere reclassificacao

#### Scenario: Utilizador comum gere taxonomia

- **WHEN** provider sem permissao administrativa tenta desativar categoria
- **THEN** servidor nega independentemente de ownership de ofertas

### Requirement: Desativacao taxonomica preserva ofertas ja publicadas

Quando categoria ou subcategoria for desativada, ofertas que ja estejam `published` SHALL permanecer `published` e visiveis. Sistema SHALL NOT pausa-las, fecha-las, cancela-las, apaga-las ou reclassifica-las automaticamente. Desativacao SHALL bloquear novas publicacoes e retomadas nessa classificacao e SHALL preservar referencias e historico. Esta decisao SHALL NOT autorizar implementacao do dominio de ofertas nem definir elegibilidade para novas propostas.

#### Scenario: Administrador desativa categoria ou subcategoria em uso

- **WHEN** administrador autorizado desativa categoria ou subcategoria com ofertas publicadas
- **THEN** ofertas mantem estado `published`, continuam publicamente visiveis e preservam referencias e historico

#### Scenario: Desativacao nao altera ciclo das ofertas

- **WHEN** categoria ou subcategoria e desativada com ofertas em diferentes estados
- **THEN** nenhuma oferta muda automaticamente para `paused`, `closed` ou `cancelled`

#### Scenario: Proprietario tenta retomar sem reclassificar

- **WHEN** oferta pausada ainda referencia subcategoria inativa
- **THEN** servidor recusa retomada, preserva estado `paused` e mantem referencia historica

### Requirement: Oferta publicada e publica por allowlist

Visitante sem autenticacao SHALL poder listar e consultar oferta em estado `published`, inclusive quando sua categoria ou subcategoria for desativada depois da publicacao. `draft`, `paused`, `closed` e `cancelled` SHALL NOT retornar conteudo publico nem ser enumeraveis. Semantica de disponibilidade permanece pendente e SHALL NOT ser inferida somente do estado.

#### Scenario: Visitante consulta oferta publicada

- **WHEN** slug identifica oferta `published`
- **THEN** sistema retorna DTO publico sem exigir login

#### Scenario: Visitante consulta oferta pausada

- **WHEN** slug pertence a oferta `paused`
- **THEN** endpoint publico retorna `404` sem conteudo privado

#### Scenario: Utilizador nao verificado consulta oferta

- **WHEN** sessao nao verificada consulta oferta publica
- **THEN** sistema permite leitura sem conceder publicacao ou proposta

### Requirement: DTO publico minimiza oferta e prestador

DTO publico SHALL usar allowlist e SHALL NOT conter UUID interno, `ownerUserId`, email, telefone, endereco, coordenada, proposta, revisao, flags administrativas ou entidade completa de banco/auth/perfil. Campos comerciais, localizacao publica da oferta e resumo exato do prestador SHALL entrar somente apos aprovacao propria; allowlist do perfil nao autoriza copiar localizacao ou perfil completo para oferta.

#### Scenario: Prestador possui dados privados

- **WHEN** oferta publica pertence a perfil com email, telefone ou endereco armazenados
- **THEN** resposta omite campos e nao revela sua presenca

#### Scenario: Schema ganha nova coluna interna

- **WHEN** migration futura adiciona coluna sem alterar DTO publico
- **THEN** coluna permanece ausente por default

#### Scenario: Card precisa identificar prestador

- **WHEN** catalogo retorna resumo da oferta
- **THEN** inclui somente subconjunto da allowlist de perfil aprovado especificamente para oferta, sem perfil completo

### Requirement: DTO privado do proprietario tambem usa allowlist

Endpoint owner-only MAY retornar UUID, slug, campos editaveis, estado, revisao, timestamps e localizacao privada/operacional necessaria ao formulario. SHALL NOT incorporar sessao, credenciais, perfil completo, permissoes administrativas ou propostas por conveniencia.

#### Scenario: Proprietario consulta rascunho

- **WHEN** sessao proprietaria solicita rascunho por ID interno
- **THEN** servidor retorna somente DTO privado necessario a gestao

#### Scenario: Terceiro consulta ID interno

- **WHEN** utilizador autenticado nao proprietario solicita oferta privada
- **THEN** servidor retorna resposta nao enumeravel sem DTO

### Requirement: Perfis publicos mostram somente ofertas publicadas

Perfil publico de prestador SHALL apresentar somente resumos de ofertas `published`, incluindo ofertas cuja categoria ou subcategoria tenha sido desativada depois da publicacao. Consulta SHALL usar registros persistentes e SHALL NOT combinar fixtures demonstrativas com ofertas reais.

#### Scenario: Prestador possui ofertas em varios estados

- **WHEN** visitante abre perfil com ofertas publicadas, pausadas e encerradas
- **THEN** resposta inclui somente publicadas elegiveis

#### Scenario: Perfil possui oferta em taxonomia posteriormente desativada

- **WHEN** visitante abre perfil com oferta que permaneceu `published` apos desativacao taxonomica
- **THEN** resposta continua incluindo o resumo da oferta

#### Scenario: Perfil demonstrativo possui slug semelhante

- **WHEN** dado demonstrativo coincide textualmente com registro persistente
- **THEN** sistema nao funde identidades, IDs ou ofertas entre fontes

### Requirement: Exploracao usa elegibilidade e ordenacao estavel

Exploracao SHALL filtrar primeiro ofertas `published` e SHALL manter visiveis aquelas cuja taxonomia foi desativada depois da publicacao. Paginacao e ordenacao SHALL possuir desempate estavel por ID. Filtro SHALL NOT tornar rascunho ou oferta pausada visivel. Preco, proximidade e filtros dependentes de campos ainda pendentes SHALL NOT ser implementados por inferencia.

#### Scenario: Filtro encontra texto em rascunho

- **WHEN** texto consultado corresponde somente a oferta `draft`
- **THEN** exploracao nao retorna oferta nem confirma sua existencia

#### Scenario: Resultados compartilham data

- **WHEN** varias ofertas possuem mesma chave principal de ordenacao
- **THEN** sistema usa ID como desempate e pagina sem duplicar ou omitir por instabilidade

#### Scenario: Filtro remoto usa localizacao

- **WHEN** oferta `remote` corresponde a texto/taxonomia mas nao possui ponto
- **THEN** ausencia de localizacao nao a invalida fora de ordenacao estritamente geografica aprovada

### Requirement: Operacoes owner-only possuem contratos explicitos

API futura SHALL separar listagem/detalhe publicos de criacao, leitura privada, edicao, publicacao, pausa, retomada, fechamento e cancelamento autenticados. Mudanca de estado SHALL usar operacao explicita. Criacao SHALL validar sessao, capacidade e entrada; mutacao de oferta existente SHALL validar sessao, capacidade, ownership, estado, entrada e revisao no servidor.

#### Scenario: Frontend mostra acao desatualizada

- **WHEN** cliente solicita transicao que estado persistido ja nao permite
- **THEN** servidor retorna conflito e nao altera oferta

#### Scenario: Payload falsifica verificacao

- **WHEN** cliente envia `emailVerified=true` ou `isProvider=true`
- **THEN** servidor ignora valores como autoridade e consulta fontes persistidas

#### Scenario: Administrador de taxonomia edita oferta

- **WHEN** administrador sem ownership tenta editar conteudo da oferta
- **THEN** permissao taxonomica nao concede acesso e servidor nega operacao

### Requirement: Concorrencia usa revisao e escrita condicional

Oferta SHALL possuir revisao monotona. Edicao ou transicao SHALL incluir ID, proprietario e revisao esperada no predicado persistente e SHALL incrementar revisao no sucesso. Revisao obsoleta SHALL produzir conflito sem sobrescrever alteracao concorrente.

#### Scenario: Duas edicoes concorrem

- **WHEN** duas requisicoes usam mesma revisao de oferta pausada
- **THEN** no maximo uma persiste e outra recebe conflito com necessidade de recarregar

#### Scenario: Pausa concorre com cancelamento

- **WHEN** operacoes usam mesma revisao de oferta publicada
- **THEN** uma transicao valida vence e outra nao aplica estado sobre dado obsoleto

#### Scenario: Publicacao concorre com desativacao taxonomica

- **WHEN** proprietario publica oferta enquanto administrador desativa sua categoria ou subcategoria
- **THEN** se publicacao confirmar primeiro, oferta permanece publicada e visivel; se desativacao confirmar primeiro, publicacao falha sem alterar rascunho

### Requirement: Modelo de oferta preserva compatibilidade com proposta exclusiva

Oferta `published` MAY receber proposta futura elegivel; `paused`, `closed` e `cancelled` SHALL ser inelegiveis para nova proposta. Cancelamento SHALL preservar referencias ao historico. Integracao futura SHALL permitir que aceite atomico mude a oferta para `closed` e bloqueie novas propostas sem criar estado adicional. Tabela, payload e endpoints de proposta SHALL permanecer fora desta mudanca.

#### Scenario: Proposta chega durante pausa

- **WHEN** criacao futura de proposta concorre com pausa da oferta
- **THEN** validacao atomica permite proposta somente se oferta permanecer `published` no commit

#### Scenario: Integracao futura fecha oferta por aceite exclusivo

- **WHEN** dominio futuro aceita exclusivamente uma proposta conforme regra aprovada
- **THEN** oferta suporta transicao atomica para `closed` sem estado intermediario ou nova proposta posterior

#### Scenario: Oferta cancelada possui propostas

- **WHEN** proprietario cancela oferta com historico de propostas
- **THEN** novas propostas sao bloqueadas e historico autorizado nao e apagado

### Requirement: Persistencia usa constraints, indices e migrations controladas

Schema futuro SHALL usar somente constraints e indices correspondentes as decisoes aprovadas. Estrutura geografica SHALL poder resultar em constraints numericas, tipo/indice PostGIS ou outra representacao aprovada; checks comerciais SHALL aguardar modelo comercial. Alteracao SHALL ser migration Drizzle versionada, revisada e aplicada por conexao direta fora do startup; esta especificacao SHALL NOT criar migration.

#### Scenario: Migration futura e preparada

- **WHEN** equipe implementar schema apos aprovar pendencias bloqueantes
- **THEN** SQL gerado e revisado, estrutura escolhida e validada no Neon alvo e migration roda primeiro em banco isolado

#### Scenario: Aplicacao inicia

- **WHEN** processo web sobe em qualquer ambiente
- **THEN** nao executa migration nem `push` automaticamente

#### Scenario: FK impedir registro inconsistente

- **WHEN** escrita tenta referenciar utilizador ou subcategoria inexistente
- **THEN** banco recusa persistencia mesmo sob concorrencia

### Requirement: Falhas nao vazam dados e nao confirmam escrita incerta

API SHALL distinguir autenticacao, gate de capacidade/verificacao, validacao, conflito e indisponibilidade por codigos seguros. Resposta SHALL NOT expor SQL, segredo, endereco, coordenada, existencia de oferta privada ou dado pessoal. Falha de banco ou geocodificacao necessaria SHALL NOT confirmar publicacao.

#### Scenario: Banco falha durante publicacao

- **WHEN** transacao nao completa
- **THEN** servidor nao retorna sucesso e oferta nao fica parcialmente publicada

#### Scenario: Geocodificacao falha

- **WHEN** politica aprovada exige ponto e ele nao pode ser obtido ou confirmado
- **THEN** sistema preserva rascunho, informa erro recuperavel e nao publica localizacao incerta

#### Scenario: Terceiro testa IDs privados

- **WHEN** utilizador solicita repetidamente IDs de ofertas alheias
- **THEN** respostas nao distinguem inexistencia de falta de ownership por conteudo privado

### Requirement: Pendencias permanecem bloqueios explicitos

Sistema futuro SHALL NOT inferir politica de edicao publicada, elegibilidade para propostas apos desativacao taxonomica, estrutura geografica, localizacao publica da oferta, ampliacao de localizacao para autenticados, opcionalidade/estrutura de preco, disponibilidade ou prazo, campos minimos finais, quantidade de ofertas por prestador, limites de texto/preco/prazo, provedor de geocodificacao, precisao/raio, retencao/endereco privado, moderacao, exclusao de conta, desativacao de capacidade, idempotencia ou rate limits. Imagens/anexos SHALL permanecer fora ate decisoes proprias. Implementacao correspondente SHALL aguardar aprovacao documentada.

#### Scenario: Implementacao precisa de limite pendente

- **WHEN** migration ou validator exige valor ainda nao aprovado
- **THEN** equipe solicita decisao e atualiza OpenSpec antes de implementar valor arbitrario

#### Scenario: Equipe deseja adicionar imagem

- **WHEN** design futuro necessita galeria ou anexo
- **THEN** nova decisao cobre storage, seguranca, privacidade, licenca, moderacao e remocao antes do schema/API

#### Scenario: Equipe deseja desativar capacidade de prestador

- **WHEN** politica futura permitir remover ou suspender capacidade `provider`
- **THEN** equipe aprova primeiro efeito atomico sobre ofertas publicadas, gestao pelo proprietario e historico, sem deixar oferta publica inelegivel

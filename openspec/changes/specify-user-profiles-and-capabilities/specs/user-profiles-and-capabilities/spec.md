# User Profiles and Capabilities

## ADDED Requirements

### Requirement: Identidade, perfil, capacidade e administracao permanecem separados

Sistema SHALL manter uma identidade Better Auth unica por utilizador e exatamente um perfil Lume associado apos cadastro concluido. Capacidade de cliente, capacidade de prestador, autorizacao de recurso e permissao administrativa SHALL ser conceitos independentes. Sistema SHALL NOT criar identidade ou perfil adicional quando mesmo utilizador ativa outro contexto.

#### Scenario: Mesmo utilizador atua como cliente e prestador

- **WHEN** utilizador autenticado cria recurso permitido de cliente e recurso permitido de prestador
- **THEN** ambos pertencem ao mesmo `userId`, sem exigir perfil, conta ou papel exclusivo adicional

### Requirement: Perfil Lume nao amplia objeto de autenticacao por conveniencia

Dados de apresentacao, pessoais privados e operacionais SHALL pertencer a camada Lume separada do schema central Better Auth, salvo campo estritamente necessario ao fluxo de autenticacao. Objeto de sessao SHALL NOT tornar dados de perfil ou permissoes publicos por implicacao.

#### Scenario: Aplicacao consulta sessao

- **WHEN** cliente ou servidor resolve sessao Better Auth
- **THEN** resposta de sessao nao inclui telefone, endereco, coordenadas, apresentacao, flags administrativas ou entidade completa de perfil

### Requirement: Perfil unico suporta projecoes publicas contextuais

Perfil de prestador SHALL expor nome de apresentacao, avaliacoes/comentarios publicos quando existirem, ofertas `published` ativas e cidade/regiao quando localizacao de perfil existir; MAY expor foto e apresentacao opcionais. Perfil de cliente SHALL expor nome de apresentacao e avaliacoes/comentarios publicos quando existirem; MAY expor foto e apresentacao opcionais. Um utilizador com ambas as capacidades SHALL continuar com um perfil e receber projecao correspondente ao caso de uso.

#### Scenario: Perfil de identidade com ambas capacidades e visto como prestador

- **WHEN** visitante abre representacao publica de prestador
- **THEN** resposta inclui ofertas ativas e, quando existente, cidade/regiao permitidas sem incluir pedidos, propostas, atividade ou contato pessoal

#### Scenario: Mesma identidade e vista como cliente

- **WHEN** representacao publica de cliente e solicitada
- **THEN** resposta exclui ofertas por implicacao, pedidos, propostas e historicos privados e retorna somente allowlist de cliente

### Requirement: Contratos publicos sao allowlists construidas na origem

Sistema futuro SHALL selecionar explicitamente campos autorizados para cada contrato publico e SHALL manter contratos publicos separados de contratos privados. Sistema SHALL NOT serializar linha completa de banco, perfil privado, utilizador Better Auth ou agregado interno e remover campos depois.

#### Scenario: Novo campo privado e adicionado ao perfil

- **WHEN** migration futura adiciona campo privado sem alterar DTO publico
- **THEN** campo nao aparece em resposta publica por default

### Requirement: Perfil publico usa identificador opaco dedicado

Sistema SHALL localizar perfis publicos por slug unico gerado pelo servidor, nao editavel neste incremento e opaco quanto ao `userId`. Slug SHALL permanecer fora dos DTOs publicos e privados salvo finalidade futura explicitamente aprovada.

#### Scenario: Visitante abre perfil por slug

- **WHEN** visitante solicita rota publica com slug existente e capacidade contextual correspondente
- **THEN** sistema retorna somente projecao allowlisted sem expor `userId`, email ou entidade de perfil

### Requirement: Dados pessoais permanecem privados por default

Perfil publico SHALL NOT expor solicitacoes de clientes, historico de propostas, atividades privadas, endereco completo, telefone pessoal, email pessoal ou coordenadas exatas. Campo interno ou ainda nao aprovado SHALL permanecer ausente de resposta publica e autenticada salvo contrato e finalidade explicitos.

#### Scenario: Visitante solicita perfil por identificador conhecido

- **WHEN** perfil existe com email, telefone ou localizacao operacional armazenados
- **THEN** resposta publica omite esses campos e nao revela sua presenca

### Requirement: Localizacao respeita audiencia e finalidade

Perfil publico SHALL expor no maximo cidade e regiao. Utilizador autenticado visualizando pedido autorizado MAY receber cidade, regiao e area aproximada. Somente operacao interna autorizada MAY usar endereco detalhado ou coordenadas quando necessarios. Esta especificacao SHALL NOT fixar precisao, provedor de geocodificacao ou retencao.

#### Scenario: Perfil publico possui localizacao operacional

- **WHEN** visitante consulta perfil com dados geograficos internos
- **THEN** resposta retorna no maximo cidade e regiao e exclui endereco e coordenadas

### Requirement: Cadastro persiste exatamente uma capacidade inicial

Cadastro SHALL exigir escolha entre capacidade `client` e `provider`, SHALL persistir somente a escolhida e SHALL NOT oferecer escolha simultanea das duas. Criacao da identidade, perfil e capacidade inicial SHALL ser atomica. Falha em perfil ou capacidade SHALL NOT deixar identidade parcial.

#### Scenario: Nova conta escolhe cliente

- **WHEN** cadastro valido escolhe contratar servicos
- **THEN** sistema cria uma identidade, um perfil e somente capacidade `client`

#### Scenario: Nova conta escolhe prestador

- **WHEN** cadastro valido escolhe oferecer servicos
- **THEN** sistema cria uma identidade, um perfil e somente capacidade `provider`

#### Scenario: Cadastro omite capacidade

- **WHEN** requisicao de cadastro nao contem capacidade inicial valida
- **THEN** servidor recusa cadastro sem criar identidade, perfil ou credencial

### Requirement: Segunda capacidade e ativada na mesma identidade

Utilizador autenticado SHALL poder ativar a capacidade ausente sem criar conta ou perfil adicional. Operacao SHALL derivar `userId` da sessao, SHALL ser aditiva e idempotente e SHALL NOT oferecer desativacao. Capacidade comercial SHALL NOT conceder permissao administrativa.

#### Scenario: Cliente ativa capacidade de prestador

- **WHEN** sessao de identidade com `client` ativa `provider` repetidamente
- **THEN** sistema mantem uma identidade, um perfil e exatamente uma associacao de cada capacidade

#### Scenario: Navegador envia identidade alheia

- **WHEN** ativacao inclui `userId` diferente do utilizador autenticado
- **THEN** servidor ignora identificador como autoridade e altera somente associacoes do ator da sessao

### Requirement: Capacidades persistidas participam da autorizacao

Operacao comercial SHALL exigir capacidade correspondente consultada no servidor. Capacidade ausente SHALL ser distinguida de sessao ausente. Interface e payload SHALL NOT falsificar capacidade, ownership ou administracao.

#### Scenario: Cliente tenta operacao de prestador

- **WHEN** sessao valida possui somente `client` e solicita operacao reservada a `provider`
- **THEN** servidor nega por capacidade ausente sem conceder administracao ou revelar dado privado

### Requirement: Verificacao de email bloqueia somente mutacoes comerciais aprovadas

Utilizador autenticado nao verificado SHALL poder editar proprio perfil, criar rascunho permitido e navegar conteudo autorizado. Servidor SHALL exigir email verificado antes de publicar oferta, publicar pedido ou enviar proposta em qualquer sentido. Verificacao SHALL NOT transformar cliente em prestador nem prestador em administrador.

#### Scenario: Prestador nao verificado tenta publicar oferta

- **WHEN** sessao valida com email nao verificado publica oferta
- **THEN** servidor recusa mutacao sem alterar oferta e informa gate de verificacao

#### Scenario: Cliente nao verificado prepara perfil

- **WHEN** sessao valida atualiza campos permitidos do proprio perfil
- **THEN** servidor permite operacao sem conceder elegibilidade para publicacao ou proposta

### Requirement: Servidor deriva ator e ownership da sessao

Leitura privada e mutacao SHALL resolver sessao no servidor e derivar ator de `session.user.id`. Identificador, capacidade, papel, ownership ou permissao enviados pelo navegador SHALL NOT substituir ator autenticado. Escrita owner-only SHALL incluir ownership na verificacao e no predicado persistente aplicavel.

#### Scenario: Utilizador altera userId no payload

- **WHEN** utilizador autenticado envia ID de outra identidade ao editar perfil ou recurso
- **THEN** servidor ignora ID como fonte de autoridade, nega alteracao alheia e nao persiste mudanca

### Requirement: Autorizacao combina policies especificas

Servidor SHALL combinar sessao, audiencia, ownership ou participacao, verificacao de email, estado do recurso e permissao administrativa aplicavel. Frontend MAY ocultar acao, mas SHALL NOT ser fonte de verdade. Falha SHALL evitar enumeracao ou exposicao de dado privado conforme policy do recurso.

#### Scenario: CTA aparece por estado desatualizado

- **WHEN** frontend oferece acao que sessao ou recurso ja nao autoriza
- **THEN** servidor recusa operacao e preserva estado persistido

### Requirement: Administracao usa permissoes explicitas sem bypass global

Utilizador comum SHALL NOT gerir taxonomia. Administrador com permissao especifica MAY gerir categorias e subcategorias. Capacidade de prestador SHALL NOT implicar administracao. Administrador SHALL continuar sem acesso automatico a proposta privada, endereco, coordenada ou dado pessoal.

#### Scenario: Prestador tenta gerir taxonomia

- **WHEN** utilizador possui ofertas mas nao permissao administrativa de taxonomia
- **THEN** servidor nega operacao independentemente da capacidade de prestador

#### Scenario: Administrador de taxonomia consulta proposta privada

- **WHEN** administrador sem participacao ou permissao especifica de recurso solicita proposta
- **THEN** servidor nao retorna conteudo nem metadados privados da proposta

### Requirement: Operacoes administrativas importantes sao auditaveis

Sistema futuro SHALL registrar operacoes administrativas importantes para auditoria. Conteudo, formato, retencao, acesso, imutabilidade e minimizacao do evento SHALL permanecer pendentes ate aprovacao.

#### Scenario: Administrador executa operacao importante autorizada

- **WHEN** administrador executa operacao administrativa importante conforme permissao aprovada
- **THEN** sistema produz registro de auditoria segundo contrato futuro aprovado

### Requirement: Pendencias nao se tornam requisitos por inferencia

Sistema futuro SHALL NOT presumir sincronizacao continua entre perfil e Better Auth, onboarding ou verificacao profissional de prestador, suspensao/desativacao de capacidade, telefone obrigatorio, precisao geografica, provedor, retencao, moderacao, permissoes administrativas adicionais ou detalhe de auditoria. Cada item SHALL exigir aprovacao antes da implementacao correspondente.

#### Scenario: Implementacao precisa de regra ainda pendente

- **WHEN** equipa encontra decisao pendente necessaria para schema, API ou policy
- **THEN** change de implementacao permanece bloqueada nesse ponto e solicita aprovacao em vez de inventar comportamento

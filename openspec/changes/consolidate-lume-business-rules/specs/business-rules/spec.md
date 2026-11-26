# Lume Business Rules Consolidation

## ADDED Requirements

### Requirement: Conta unica suporta ambos os contextos

Sistema futuro SHALL associar cada utilizador a uma unica identidade, capaz de atuar como cliente, prestador ou ambos conforme recurso e acao autorizados. Representacao publica SHALL variar somente pelos campos autorizados para cada contexto, sem criar identidade distinta.

#### Scenario: Mesmo utilizador atua nos dois contextos

- **WHEN** utilizador autorizado publica uma oferta e um pedido
- **THEN** sistema associa ambos a mesma identidade de utilizador

### Requirement: Perfis publicos usam allowlist e minimizacao

Sistema futuro SHALL manter dados privados por padrao e SHALL expor somente campos explicitamente autorizados nesta especificacao. Perfil de prestador SHALL expor nome de apresentacao, foto opcional, apresentacao opcional, avaliacoes e comentarios publicos, ofertas `published` e ativas, e cidade/regiao conforme politica geografica. Perfil de cliente SHALL expor nome de apresentacao, foto opcional, apresentacao opcional, avaliacoes e comentarios publicos. Perfil publico SHALL NOT expor pedidos, historico de propostas, historico de atividades privadas, endereco completo, telefone pessoal, email pessoal ou coordenadas exatas.

#### Scenario: Visitante consulta perfil de prestador

- **WHEN** visitante consulta perfil publico de prestador
- **THEN** resposta contem somente campos autorizados para perfil de prestador e exclui dados privados e pedidos

#### Scenario: Visitante consulta perfil de cliente

- **WHEN** visitante consulta perfil publico de cliente
- **THEN** resposta contem somente campos autorizados para perfil de cliente e exclui ofertas, pedidos e historicos privados nao autorizados

### Requirement: Pedido possui campos e audiencia aprovados

Sistema futuro SHALL exigir titulo, descricao, categoria, modalidade `presencial`, `remoto` ou `ambos`, localizacao compativel com modalidade e data de publicacao para pedido `published`. Sistema futuro MAY aceitar subcategoria, orcamento minimo, orcamento maximo, prazo desejado, disponibilidade ou preferencia de horario, imagens e anexos de referencia. Pedido `published` SHALL ser consultavel somente por utilizador autenticado. Pedido SHALL NOT conter dados pessoais nem endereco exato na representacao consultavel. Pedido `draft` ou `cancelled` SHALL NOT aparecer na exploracao.

#### Scenario: Pedido presencial sem localizacao compativel

- **WHEN** proprietario tenta publicar pedido com modalidade `presencial` sem localizacao compativel
- **THEN** sistema recusa publicacao

#### Scenario: Visitante consulta pedido publicado

- **WHEN** visitante sem autenticacao consulta pedido `published`
- **THEN** sistema nao retorna conteudo do pedido

#### Scenario: Pedido publicado sem orcamento

- **WHEN** proprietario publica pedido valido sem orcamento minimo ou maximo
- **THEN** sistema permite publicacao

### Requirement: Localizacao respeita tres camadas

Sistema futuro SHALL expor cidade e regiao em perfil publico. Sistema futuro SHALL expor cidade, regiao e area aproximada em pedido acessivel a utilizador autenticado. Coordenadas e endereco detalhado SHALL ser restritos a operacao interna autorizada quando necessarios. Sistema SHALL NOT expor endereco residencial completo ou coordenadas exatas publicamente, nem revelar localizacao exata de cliente sem autorizacao adequada. Servico remoto SHALL NOT exigir endereco. Distancia inicial SHALL usar linha reta; distancia por rota SHALL NOT fazer parte deste fluxo.

#### Scenario: Consulta publica usa localizacao de perfil

- **WHEN** visitante consulta perfil publico
- **THEN** resposta inclui no maximo cidade e regiao, sem endereco detalhado ou coordenadas exatas

#### Scenario: Pedido remoto e publicado

- **WHEN** proprietario publica pedido valido com modalidade `remoto`
- **THEN** sistema nao exige endereco

### Requirement: Propostas possuem estados, autoria e privacidade aprovados

Sistema futuro SHALL usar somente estados de proposta `pending`, `accepted`, `rejected`, `withdrawn` e `closed`. Sistema SHALL permitir proposta bidirecional conforme tipo de publicacao. Somente destinatario SHALL aceitar ou rejeitar proposta. Autor SHALL poder retirar somente proposta `pending`; proposta `accepted` SHALL NOT ser retirada unilateralmente. Historico SHALL permanecer acessivel somente as partes autorizadas.

#### Scenario: Autor retira proposta pendente

- **WHEN** autor retira sua proposta `pending`
- **THEN** sistema muda estado para `withdrawn`

#### Scenario: Autor tenta retirar proposta aceita

- **WHEN** autor tenta retirar proposta `accepted`
- **THEN** sistema recusa retirada unilateral

#### Scenario: Destinatario rejeita proposta pendente

- **WHEN** destinatario rejeita proposta `pending`
- **THEN** sistema muda estado para `rejected`

#### Scenario: Terceiro consulta proposta

- **WHEN** utilizador que nao e parte autorizada solicita proposta
- **THEN** sistema nao retorna conteudo ou historico da proposta

### Requirement: Aceitacao de proposta e exclusiva e atomica

Sistema futuro SHALL permitir aceite ou rejeicao somente ao destinatario da proposta. Ao aceitar proposta `pending`, sistema SHALL mudar proposta escolhida para `accepted`, mudar propostas concorrentes `pending` da mesma publicacao para `closed`, fechar publicacao e bloquear novas propostas. Operacao SHALL ser atomica e consistente, impedindo aceite de duas propostas concorrentes para mesma publicacao. Sistema SHALL NOT incluir negociacao interna neste fluxo.

#### Scenario: Duas propostas concorrentes recebem aceite simultaneo

- **WHEN** destinatario tenta aceitar duas propostas `pending` da mesma publicacao em operacoes concorrentes
- **THEN** sistema aceita no maximo uma proposta e fecha as demais pendentes como `closed`

### Requirement: Publicacoes usam ciclo de vida fechado

Oferta e pedido SHALL usar somente `draft`, `published`, `paused`, `closed` e `cancelled`. Sistema SHALL permitir somente `draft -> published`, `published -> paused`, `published -> closed`, `published -> cancelled`, `paused -> published`, `paused -> closed` e `paused -> cancelled`. Estados `closed` e `cancelled` SHALL ser finais e SHALL NOT permitir reabertura. Publicacao `paused`, `closed` ou `cancelled` SHALL NOT receber propostas. Aceitacao exclusiva SHALL fechar publicacao. Cancelamento SHALL preservar historico de propostas. Proprietario SHALL poder editar livremente publicacao `draft`; republicacao SHALL exigir nova publicacao.

#### Scenario: Publicacao pausada recebe proposta

- **WHEN** utilizador tenta enviar proposta para publicacao `paused`
- **THEN** sistema recusa nova proposta

#### Scenario: Proprietario tenta reabrir publicacao encerrada

- **WHEN** proprietario tenta mover publicacao `closed` ou `cancelled` para qualquer outro estado
- **THEN** sistema recusa transicao

### Requirement: Avaliacao depende de servico concluido bilateralmente

Sistema futuro SHALL permitir avaliacao somente entre participantes de proposta `accepted` apos ambas as partes confirmarem conclusao do servico. Cliente SHALL poder avaliar prestador e prestador SHALL poder avaliar cliente. Sistema SHALL permitir uma avaliacao por participante por servico, exigir nota e aceitar comentario opcional. Avaliacao publicada SHALL aparecer em perfil publico. Aceitacao de proposta SHALL NOT significar conclusao de servico; proposta sem servico realizado SHALL NOT permitir avaliacao.

#### Scenario: Uma parte ainda nao confirmou conclusao

- **WHEN** somente uma parte confirmou conclusao do servico
- **THEN** sistema nao libera avaliacao para nenhuma parte

#### Scenario: Participante tenta segunda avaliacao

- **WHEN** participante ja publicou avaliacao para mesmo servico
- **THEN** sistema recusa nova avaliacao desse participante

### Requirement: Administracao usa permissoes limitadas e auditaveis

Sistema futuro SHALL distinguir utilizadores comuns, administradores com permissoes administrativas especificas e sistema para operacoes internas autorizadas. Utilizador comum SHALL NOT gerir categorias ou subcategorias. Administrador autorizado SHALL poder gerir categorias e subcategorias. Administrador SHALL NOT receber automaticamente acesso a propostas privadas, enderecos ou dados pessoais. Sistema SHALL registrar acoes administrativas importantes para auditoria. Painel administrativo completo SHALL NOT ser requisito do primeiro incremento funcional.

#### Scenario: Administrador sem permissao de recurso privado consulta proposta

- **WHEN** administrador sem autorizacao explicita para proposta privada tenta consulta-la
- **THEN** sistema nao retorna conteudo da proposta

### Requirement: Detalhes nao aprovados permanecem indefinidos

Sistema futuro SHALL NOT definir por inferencia precisao numerica de localizacao aproximada, raio padrao, provedor de geocodificacao, tecnologia geoespacial, retencao ou exclusao de dados pessoais, campos adicionais de proposta, leitura detalhada de propostas `closed`, procedimento de conclusao ou divergencia, prazo/edicao/exclusao/moderacao de avaliacoes, detalhe de auditoria, edicao de publicacao `published` ou regras de autenticacao e recuperacao de conta.

#### Scenario: Equipe planeja detalhe pendente

- **WHEN** equipe precisa implementar detalhe listado como nao aprovado
- **THEN** equipe solicita aprovacao antes de o transformar em requisito ou comportamento

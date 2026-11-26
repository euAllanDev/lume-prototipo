# Marketplace de Servicos e Oportunidades

## Resumo

Criar prototipo web responsivo de marketplace que conecta pessoas e organizacoes que precisam executar uma tarefa a prestadores disponiveis para realiza-la. O prototipo representa descoberta, publicacao, candidatura, selecao, acompanhamento, mensagens e reputacao sem backend, pagamentos ou comunicacao real.

## Problema

Pessoas disponiveis para trabalhar tem dificuldade em encontrar oportunidades compativeis com suas habilidades, localizacao e disponibilidade. Pessoas e empresas que precisam de ajuda tambem enfrentam dificuldade para encontrar, comparar e combinar condicoes com prestadores adequados.

Solucoes atuais tendem a atender nichos isolados. Esta mudanca valida visualmente uma experiencia integrada para tarefas presenciais e remotas, sem presumir diploma, experiencia formal ou empresa constituida.

## Objetivos

- Tornar proposta de valor compreensivel na primeira visita.
- Representar claramente quem contrata e quem procura oportunidades.
- Permitir explorar, filtrar e abrir tarefas de categorias presenciais e remotas.
- Demonstrar jornadas completas de publicacao e candidatura/selecao.
- Exibir estados e feedbacks honestamente simulados.
- Garantir navegacao e legibilidade em desktop e celular.

## Fora de Escopo

- Backend, persistencia, autenticacao ou autorizacao reais.
- Pagamentos, custodia, transferencia de dinheiro ou impostos.
- Verificacao de identidade, antecedentes, documentos ou qualificacoes.
- Chat, notificacoes, contratos ou disputas reais.
- Aplicativos nativos e correspondencia por IA.
- Garantias de renda, contratacao ou habilitacao profissional.

## Decisoes de Prototipo

- Mercado demonstrativo: Europa, com localidades e valores ficticios em EUR.
- Interface e conteudo: portugues do Brasil, sem afirmar cobertura geografica real.
- Remuneracao: valores fixos, faixas e "a combinar" exibidos como dados demonstrativos.
- Contexto ativo: seletor alterna entre contratante e prestador com identidades ficticias estaveis, sem cadastro ou login.
- Fluxos: candidaturas para todas as tarefas abertas; contratante seleciona manualmente um candidato.
- Informacoes de confianca: rotuladas como dados demonstrativos, sem selos de verificacao.
- Simulacao: aviso global persistente identifica dados e operacoes como demonstrativos; mutacoes recebem confirmacao contextual.
- Cancelamento: estado pre-carregado de demonstracao, sem fluxo navegavel ou acao funcional nesta versao.

## Capacidades

- `marketplace-discovery`: pagina inicial, busca, filtros, categorias e listagem de tarefas.
- `task-publishing`: formulario em etapas para publicar tarefa simulada.
- `worker-profiles`: perfis demonstrativos de prestadores.
- `applications-and-selection`: candidatura e comparacao/selecao simuladas.
- `task-lifecycle`: area pessoal e estados da tarefa.
- `communication`: conversa demonstrativa vinculada a tarefa.
- `trust-and-reputation`: avaliacoes e reputacao apresentadas de modo transparente.
- `responsive-experience`: navegacao e layouts adaptados para diferentes telas.

## Riscos e Pendencias

- Pais de lancamento, idioma definitivo e identidade de marca seguem em aberto.
- Regras legais para servicos regulados devem ser definidas antes de qualquer produto operacional.
- Modelo comercial, deslocamento, negociacao externa e regra de quem confirma conclusao requerem validacao futura.

## Criterios de Aceite

- Fluxos principais conectam telas sem depender de dados reais.
- Tarefa pode ser descoberta, aberta, receber candidatura e chegar a estado de conclusao simulado.
- Contratante pode publicar tarefa simulada, analisar interessados e selecionar um prestador.
- Interface sinaliza claramente que conteudo, mensagens e acoes sao demonstrativos.
- Experiencia permanece utilizavel em larguras de desktop e celular.

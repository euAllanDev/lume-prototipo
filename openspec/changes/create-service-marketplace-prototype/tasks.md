# Tarefas de Implementacao

## 1. Fundacao

- [x] Definir nome provisorio, tokens visuais e tipografia.
- [x] Criar estrutura de aplicacao, rotas, navegacao global responsiva e seletor de contexto.
- [x] Modelar dados ficticios relacionados para usuarios, tarefas, perfis, candidaturas, mensagens e avaliacoes.
- [x] Implementar estado local, transicoes permitidas, contexto ativo e aviso global de prototipo.

## 2. Descoberta e Perfis

- [x] Construir pagina inicial com busca, categorias, destaques e CTAs para ambos os papeis. Depende de dados demonstrativos e modelo de tarefas.
- [x] Construir exploracao com busca, filtros, ordenacao, carregamento e vazio. Depende de dados demonstrativos e modelo de tarefas.
- [x] Construir detalhe da tarefa com condicoes transparentes e candidatura. Candidatura depende de descoberta e detalhe da tarefa.
- [x] Construir pagina de perfil de prestador e avaliacoes demonstrativas. Depende de dados de usuarios, candidaturas e avaliacoes.

## 3. Jornadas Principais

- [x] Construir formulario de publicacao em etapas, validacao e revisao. Depende de estado local e transicao `draft -> open`.
- [x] Construir confirmacao de publicacao e lista de interessados. Lista depende de candidaturas e perfis de prestadores.
- [x] Construir fluxo de candidatura, comparacao e selecao de prestador. Selecao depende de candidaturas e transicoes de estado.
- [x] Construir area pessoal com tarefas, candidaturas e transicoes de ciclo de vida. Depende de contexto ativo e mutacoes de publicacao, candidatura e selecao.
- [x] Construir conversa e feedbacks demonstrativos de conclusao/avaliacao. Mensagens dependem de selecao e tarefa em andamento; avaliacao depende de conclusao.

## 4. Qualidade

- [x] Adaptar layouts e navegacao para celular e desktop.
- [x] Verificar teclado, foco, rotulos e contraste dos controles principais.
- [x] Testar fluxos de encontrar trabalho e contratar alguem ponta a ponta. Depende da implementacao dos fluxos correspondentes.
- [x] Verificar que nenhum texto sugere pagamentos, verificacoes ou comunicacao reais.

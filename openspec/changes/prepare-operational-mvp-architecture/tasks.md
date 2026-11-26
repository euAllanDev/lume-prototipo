# Tarefas de Preparacao da Arquitetura

## 1. Registro Documental Concluido

- [x] Registrar stack confirmada, Drizzle ORM, Portugal/PT-PT, desenvolvimento incremental e SDD/OpenSpec.
- [x] Registrar comparacoes iniciais de autenticacao, email, Neon e estrategia Git sem instalar ou provisionar recursos.
- [x] Preservar limites entre preparacao tecnica, prototipo concluido e validacao comercial ainda pendente.
- [x] Registrar as decisoes posteriores do produto: publicacao bidirecional, localizacao/distancia no primeiro incremento e consulta publica de ofertas com propostas autenticadas.
- [x] Atualizar proposta, design, decisoes, prontidao, especificacao e tarefas para refletir essas decisoes sem implementar codigo.

## 2. Decisoes Bloqueadoras de Produto e Privacidade

- [ ] Aprovar audiencia dos pedidos: publico com campos controlados, autenticado ou apenas prestadores elegiveis. Aceite: audiencia, campos visiveis e resposta a acesso negado documentados. Depende de analise de privacidade e risco de reidentificacao.
- [ ] Definir significado de aceitar proposta e se oferta/pedido original permanece publicado, fica indisponivel ou e retirado. Aceite: transicoes, concorrencia e efeito sobre outras propostas documentados. Nao bloqueia envio inicial, mas bloqueia aceitacao.
- [ ] Aprovar campos minimos finais e regras de disponibilidade de oferta e pedido. Aceite: obrigatoriedade por modalidade e transicoes sem ambiguidades.
- [ ] Aprovar granularidade publica, privada e operacional de localizacao para oferta, pedido e perfil. Aceite: matriz campo x audiencia x finalidade x retencao. Depende de analise juridica e de risco.
- [ ] Aprovar politica de retencao, correcao e eliminacao de enderecos, coordenadas e consultas geograficas. Aceite: prazos/eventos de eliminacao e tratamento de backups/logs documentados.
- [ ] Aprovar taxonomia inicial limitada e politica para categorias reguladas. Aceite: IDs estaveis, responsavel editorial, desativacao, reorganizacao e comunicacao ao proprietario.

## 3. Decisoes Tecnicas Bloqueadoras

- [ ] Escolher estrutura geografica: PostGIS `geography`, latitude/longitude numericas ou alternativa documentada. Aceite: precisao, indices, constraints, migracao e suporte Drizzle comprovados em fontes oficiais.
- [ ] Escolher algoritmo de distancia e regra de ordenacao/desempate. Aceite: unidade, modelo terrestre, limites de precisao e testes de referencia documentados.
- [ ] Escolher modelo/provedor de geocodificacao. Aceite: fonte oficial, termos, cobertura Portugal, limites atuais, cache/retencao, atribuicao, privacidade, falhas e custo verificados na data da decisao.
- [ ] Decidir se mapa entra no primeiro incremento e escolher provedor somente se necessario. Aceite: mapa nao e unica forma de introduzir ou compreender localizacao; termos, atribuicao, custo e acessibilidade verificados.
- [ ] Escolher autenticacao, versoes Node/Next, login, verificacao de email, recuperacao e sessoes. Aceite: compatibilidade, revogacao, anti-enumeracao e ownership no servidor documentados.
- [ ] Escolher email transacional e confirmar dominio, DNS, volume, custo e limites em fonte oficial atual.
- [ ] Definir rate limiting para autenticacao, publicacao, pesquisa/geocodificacao e propostas. Aceite: chave, janela, armazenamento, resposta e observabilidade minimizada.
- [ ] Confirmar Neon: regiao, plano/limites atuais, extensao geografica escolhida, conexoes, ambientes, backup/exportacao e comportamento de indisponibilidade.
- [ ] Confirmar estrategia Git segura antes de rastrear ou implementar arquivos.

## 4. Decomposicao da Futura Implementacao

- [ ] Propor mudanca OpenSpec de implementacao somente apos decisoes bloqueadoras aplicaveis. Nao altera mudancas concluidas.
- [ ] Implementar fundacao de conta, sessao, ambientes e migracoes. Aceite: isolamento dev/test/prod, segredos fora do cliente e testes de autorizacao. Depende das escolhas de autenticacao, Neon e Git.
- [ ] Implementar taxonomia com IDs estaveis e governanca minima. Aceite: publicar apenas em subcategoria ativa; referencias historicas sobrevivem a renomeacao/desativacao. Depende da taxonomia aprovada.
- [ ] Implementar rascunho/publicacao/retirada de oferta. Aceite: ownership, campos por modalidade, visibilidade publica apenas de `published/available` e testes negativos.
- [ ] Implementar rascunho/publicacao/retirada de pedido. Aceite: ownership e audiencia aprovada, sem vazamento de localizacao ou identidade. Depende da politica de pedidos.
- [ ] Implementar armazenamento e validacao geografica. Aceite: enderecos e coordenadas separados por finalidade, constraints e acesso privado. Depende das decisoes geograficas.
- [ ] Implementar geocodificacao e degradacao controlada. Aceite: consentimento/aviso aplicavel, rate limit, timeout, cache permitido e alternativa manual. Depende do provedor.
- [ ] Implementar pesquisa de ofertas, filtros e distancia. Aceite: texto, categoria, subcategoria, modalidade, elegibilidade e ordenacao estavel; remoto nao exige localizacao; ausencia de localizacao e explicita.
- [ ] Implementar descoberta de pedidos conforme audiencia aprovada. Aceite: mesmos controles comuns sem assumir exposicao publica.
- [ ] Implementar proposta cliente -> oferta. Aceite: destinatario e origem derivados, autenticacao, unicidade e bloqueios de self/retirado/indisponivel.
- [ ] Implementar proposta prestador -> pedido. Aceite: mesmas invariantes comuns e elegibilidade especifica de prestador.
- [ ] Implementar consultas privadas de propostas. Aceite: somente autor e destinatario; listagens nao vazam existencia para terceiros.
- [ ] Executar matriz automatizada de validacao, autorizacao, duplicidade concorrente, pesquisa e calculo de distancia.
- [ ] Executar matriz manual de acessibilidade por teclado, foco, formularios, mensagens dinamicas, zoom/reflow e leitor de ecra, incluindo alternativa textual ao mapa.
- [ ] Fazer analise juridica aplicavel a RGPD, DSA, DAC7, consumo e categorias antes de dados reais ou publicacao aberta.

## 5. Etapas Posteriores

- [ ] Projetar aceitacao/rejeicao/retirada de proposta apos decisao de produto.
- [ ] Projetar mensagens, notificacoes, pagamentos, contratos, disputas, conclusao e reputacao somente em mudancas proprias aprovadas.
- [ ] Avaliar mapas avancados, rotas/tempo de viagem, areas poligonais, relevancia personalizada e taxonomia extensa depois de evidencia e necessidade operacional.

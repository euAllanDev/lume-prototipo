# Especificacao de Perfis e Capacidades do Lume

## Resumo

Especificar e implementar a primeira camada operacional de perfil e capacidades comerciais ligada a identidade Better Auth ja operacional.

## Escopo

- Separar identidade autenticada, perfil Lume, capacidades de cliente/prestador, autorizacao por operacao e permissoes administrativas.
- Definir perfil unico 1:1, categorias de dados e contratos publicos por allowlist.
- Exigir uma capacidade comercial inicial unica no cadastro e permitir ativar a segunda posteriormente na mesma identidade.
- Definir como uma identidade atua nos dois contextos sem contas exclusivas ou privilegios enviados pelo cliente.
- Formalizar gates de sessao, ownership, verificacao de email e permissao administrativa.
- Preservar pendencias de localizacao, retencao, onboarding e auditoria detalhada.

## Fora de Escopo

- Implementar administracao, taxonomia, ofertas, pedidos ou propostas.
- Escolher precisao geografica, geocodificador, retencao, exclusao, moderacao ou requisitos profissionais.
- Criar papel global ou campo booleano `isClient`, `isProvider` ou `isAdmin` como atalho de autorizacao.
- Definir painel administrativo completo ou acesso administrativo a dados privados.

## Precedencia

`consolidate-lume-business-rules` permanece fonte normativa para allowlists, localizacao, publicacoes, propostas, avaliacoes e limites administrativos. `specify-lume-operational-foundation` permanece fonte para identidade, sessao, Better Auth e verificacao de email. Esta change especializa perfil e capacidades sem ampliar aquelas regras.

Documentos do prototipo descrevem comportamento demonstrativo historico. Quando divergirem, nao definem autorizacao operacional.

## Criterios de Aceite Documentais

- Identidade, perfil, capacidade, autorizacao e administracao possuem responsabilidades e limites distintos.
- Cadastro exige exatamente uma capacidade inicial persistida; segunda capacidade pode ser ativada depois sem nova conta.
- Uma identidade pode acumular capacidades de cliente e prestador sem alternar conta ou papel exclusivo.
- Contratos publicos usam allowlists distintas dos contratos privados.
- Servidor deriva ator da sessao e nunca aceita identidade/capacidade administrativa enviada pelo navegador.
- Toda regra ainda nao aprovada permanece identificada como recomendacao ou pendencia.

## Referencias

- [Design](design.md)
- [Decisoes e contradicoes](decisions.md)
- [Tarefas](tasks.md)
- [Requisitos](specs/user-profiles-and-capabilities/spec.md)
- [Regras de negocio](../consolidate-lume-business-rules/specs/business-rules/spec.md)
- [Fundacao operacional](../specify-lume-operational-foundation/specs/operational-foundation/spec.md)

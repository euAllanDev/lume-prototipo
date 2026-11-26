# Tarefas de Implementacao Futura

## Incremento 06.1: Persistencia e Infraestrutura

- [x] Instalar Drizzle ORM `0.45.4`, Drizzle Kit `0.31.11` e driver PostgreSQL `pg` `8.23.1` no monolito `web/`.
- [x] Criar contrato `.env.example` e validacao server-only para URLs PostgreSQL pooled e direta, sem valores secretos.
- [x] Criar cliente Drizzle centralizado, schema tecnico minimo e migration versionada revisavel, sem schema Better Auth ou de dominio.
- [x] Adicionar scripts explicitos para gerar migration, aplicar migration direta e verificar conexao/query; migrations nao executam no startup.
- [x] Adicionar teste de validacao de ambiente; conectividade e aplicacao real da migration dependem de banco isolado configurado.

## 1. Preparacao

- [x] Revalidar versoes, advisories, engines e peer dependencies antes de instalar Better Auth, Drizzle, driver PostgreSQL, Drizzle Kit e SDK Resend.
- [x] Criar contrato `.env.example` sem segredos e validacao server-only de ambiente.
- [ ] Provisionar Neon isolado para desenvolvimento, testes e producao; definir regiao, acessos e URLs pooled/direta.
- [ ] Provisionar Mailpit local e dominio/credencial Resend somente em ambiente aprovado.

## 2. Persistencia e Autenticacao

- [x] Declarar schemas Better Auth e Lume, gerar migration revisavel e aplicar por ambiente com conexao direta.
- [x] Configurar Better Auth, adaptador Drizzle, handler App Router e cliente React.
- [x] Substituir fluxos demonstrativos de cadastro, login e logout sem alterar desenho das paginas.
- [x] Implementar sessao persistente, protecao de rota e `returnTo` allowlisted.

## 3. Verificacao e Autorizacao

- [x] Implementar porta de email e adaptadores Mailpit/Resend.
- [x] Integrar verificacao e reenvio sem bloquear login ou navegacao publica.
- [x] Implementar policies server-side para sessao e verificacao; ownership e permissoes de recurso aguardam recursos de dominio.
- [x] Preparar separacao de perfil, capacidades de atuacao e identidade unica sem criar papeis de cliente/prestador.

## 4. Qualidade

- [ ] Definir rate limit distribuido e valores aprovados antes de producao.
- [ ] Criar testes de auth, banco isolado, expiracao, verificacao, CSRF/origem e autorizacao negativa.
- [ ] Verificar teclado, leitor de ecra, mobile e mensagens de erro nas rotas auth integradas.
- [ ] Revisar logs, segredos, migrations e configuracao de producao antes de dados reais.

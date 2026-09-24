# Bolão

Um bolão de campeonato de futebol para amigos: participantes registram palpites, administradores registram resultados, e a aplicação calcula pontuações e ranking com transparência.

## Estado atual

O projeto está em discovery e fundações. A primeira entrega será um bolão de futebol pequeno e funcional, priorizando regras explícitas e um domínio coerente em vez de complexidade técnica prematura.

## MVP

```text
Criar bolão → Adicionar participantes → Cadastrar partidas → Registrar palpites
→ Registrar resultados → Calcular pontuação → Atualizar ranking
```

O MVP concentra-se em prazos previsíveis para palpites, cálculo automático de pontuação, ranking determinístico e explicações para cada pontuação concedida.

## Escopo

- Criar e visualizar um bolão.
- Adicionar participantes e gerenciar partidas.
- Registrar e alterar palpites enquanto permitido.
- Registrar resultados, calcular pontuação e exibir ranking.
- Tornar as regras e explicações de pontuação visíveis.

Pagamentos, apostas, aplicativos mobile nativos, provedores externos de resultados, microsserviços e recursos de IA não fazem parte da primeira entrega.

## Navegação do projeto

- [Visão de produto](docs/product/vision.md)
- [Recorte do MVP](docs/product/mvp.md)
- [Regulamento v1](docs/product/regulation-v1.md)
- [Roadmap do MVP](https://github.com/users/mspavanelli/projects/1)
- [Issues abertas](https://github.com/mspavanelli/World-Cup-Pool/issues)
- [Convenções de engenharia](AGENTS.md)

## Acordos de trabalho

O trabalho é acompanhado nas GitHub Issues e no roadmap. Cada issue possui uma label `status:` e uma `type:`; milestones agrupam o trabalho por fase de entrega.

## Desenvolvimento local

Requisitos: Node.js 24, pnpm 12.4.2 e Docker com Compose.

1. Instale as dependências com `pnpm install`.
2. Inicie os serviços com `docker compose up -d` e aguarde `docker compose ps` mostrar o PostgreSQL como saudável.
3. Crie a configuração local com `cp .env.example .env` e carregue as variáveis no shell com `set -a; source .env; set +a`.
4. Execute as migrações com `pnpm db:migrate`.
5. Inicie interface e API com `pnpm dev`.

A interface fica em <http://localhost:5173>, a API responde em <http://localhost:3000/api/health> e a caixa de testes Mailpit fica em <http://localhost:8025>. O Vite encaminha as chamadas a `/api` para a API durante o desenvolvimento. O Mailpit está disponível para os futuros fluxos de acesso por e-mail; ainda não há envio de mensagens neste ticket.

O comando `pnpm db:generate` gera uma migração SQL a partir das alterações no esquema Drizzle. Revise e versione o SQL gerado antes de aplicar `pnpm db:migrate`. A migração inicial estabelece o histórico sem criar tabelas de domínio.

### Verificação

Com o PostgreSQL em execução e `DATABASE_URL` carregada, execute:

```sh
pnpm lint
pnpm format:check
pnpm typecheck
pnpm db:migrate
pnpm test
pnpm --filter @bolao/web build
```

`pnpm test` inclui um teste de integração da API contra o PostgreSQL real. A CI executa as mesmas verificações em cada pull request. Para encerrar os serviços locais, use `docker compose down`; o volume do banco é preservado.

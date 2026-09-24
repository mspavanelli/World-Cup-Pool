# Arquitetura inicial — issue #3

## Objetivo e sequência

Construir um monólito modular para um bolão pequeno, com interface utilizável no navegador. A primeira execução e validação serão locais e gratuitas, com Docker. A escolha da hospedagem e do serviço real de envio de e-mails ocorrerá antes de convidar pessoas para uso real.

## Stack

| Responsabilidade | Escolha inicial |
| --- | --- |
| Interface | Vue com TypeScript e Vite, executado no navegador |
| Servidor e API | Node.js com TypeScript e Fastify; HTTP/JSON em estilo REST |
| Persistência | PostgreSQL; Drizzle para consultas e esquema, com migrações SQL versionadas |
| Autenticação | Link de e-mail de uso único, válido por 15 minutos; sessão no servidor por 30 dias, revogável por logout |
| E-mail local | Caixa de testes Mailpit em Docker |
| Testes | Vitest para regras e componentes; integração da API com PostgreSQL real; Playwright para poucos fluxos completos |
| Organização | Um repositório com `pnpm` workspaces para interface e servidor |

No desenvolvimento, interface e API podem ser processos separados. Na publicação, deverão compartilhar a mesma origem, com a API em `/api`; o provedor de hospedagem ainda não foi escolhido.

## Fronteiras

Cada módulo do servidor reúne sua apresentação HTTP, seus casos de uso, suas regras de domínio e sua infraestrutura de persistência. As rotas validam o formato da entrada, identificam a sessão e chamam casos de uso; não decidem regras do bolão. Os casos de uso aplicam autorização e coordenam operações. O domínio calcula e valida regras sem depender de Fastify, Vue ou Drizzle. A infraestrutura traduz a persistência para as necessidades dos casos de uso.

Módulos iniciais:

- **Acesso**: links de e-mail, sessões e identificação da pessoa.
- **Bolão e participação**: criação, administração, solicitações de entrada e situação dos participantes.
- **Partidas**: cadastro, início real, suspensão, resultado e correções auditáveis.
- **Palpites**: criação, alteração, bloqueio e visibilidade.
- **Apuração**: pontuação explicável e ranking, derivados dos palpites, resultados e da versão do regulamento.

Os módulos colaboram por chamadas síncronas no mesmo processo. A apuração consulta os dados vigentes; não há total de pontos persistido, fila, consumidor, cache distribuído ou tarefa de recálculo no MVP. Uma operação que altera resultado e histórico grava ambos na mesma transação. A transação confirma os dados vigentes e auditáveis; as próximas consultas refletem a correção ao calcular pontuação e ranking.

## Prazos e acesso

O relógio do servidor determina a validade dos palpites e o momento de registro do início real. A verificação do prazo ocorre junto à gravação no banco, evitando aceitar uma escrita que passou do prazo enquanto aguardava processamento. O navegador exibe o prazo, mas não autoriza um palpite. Instantes são persistidos de modo inequívoco; a forma de exibir o fuso pertence à interface.

O link de acesso é de uso único. Seus registros e as sessões ficam no PostgreSQL, sem Redis. A sessão usa cookie protegido e pode ser invalidada no logout. A API verifica autorização e visibilidade em cada operação; até o prazo, apenas o autor pode ver o conteúdo de um palpite, inclusive quando o administrador consulta o bolão.

## Verificação inicial

- Testes de regras cobrem prazos, pontuação, empates, anulação, correção e versões do regulamento.
- Testes de integração exercitam autenticação, autorização, transações e persistência contra PostgreSQL.
- Poucos testes de navegador percorrem acesso por e-mail, envio de palpite e correção de resultado com ranking atualizado.

## Decisões relacionadas

- [PostgreSQL como persistência inicial](../adr/0004-postgresql-como-persistencia-inicial.md)
- [Acesso por link de e-mail](../adr/0005-acesso-por-link-de-email.md)
- [Monólito modular por conceito](../adr/0006-monolito-modular-por-conceito.md)

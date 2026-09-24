# PostgreSQL como persistência inicial

O MVP usará PostgreSQL, executado localmente com Docker. SQLite reduziria a infraestrutura de desenvolvimento, mas o bolão precisa preservar de forma consistente participações, palpites, resultados, correções e suas consequências para o ranking; começar com PostgreSQL também evita uma migração de banco antes da futura publicação. A escolha de hospedagem fica para uma decisão posterior.

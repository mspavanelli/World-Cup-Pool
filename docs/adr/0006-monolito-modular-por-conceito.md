# Monólito modular organizado por conceitos do bolão

A primeira aplicação terá um frontend Vue no navegador e uma API TypeScript/Node no mesmo projeto. O servidor será organizado por conceitos do bolão, com fronteiras de apresentação, aplicação, domínio e infraestrutura dentro de cada módulo, em vez de quatro diretórios globais de camadas. Isso mantém regras e fluxos relacionados próximos sem exigir serviços distribuídos; o custo é disciplinar as dependências entre módulos e camadas.

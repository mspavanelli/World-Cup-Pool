# Bolão

Uma aplicação para criar e participar de bolões esportivos, registrar palpites, acompanhar resultados e manter o ranking dos participantes de forma automática, transparente e auditável.

O primeiro objetivo do projeto é construir um **bolão de campeonato de futebol**, começando por um escopo pequeno e funcional. A arquitetura e o domínio, entretanto, devem permitir evolução gradual para regras mais sofisticadas, automações, integrações externas e diferentes formatos de competição.

O projeto tem caráter **educacional e experimental**. O objetivo não é apenas chegar a uma aplicação funcionando, mas utilizar sua construção como laboratório para praticar **Product Design, UX/UI, modelagem de domínio, arquitetura de software, testes e desenvolvimento assistido por IA**.

---

## Objetivo

Construir uma experiência de bolão que substitua soluções improvisadas — planilhas, mensagens e alterações manuais no banco — por um sistema no qual:

* participantes possam registrar seus próprios palpites;
* os palpites tenham regras claras e verificáveis;
* resultados possam ser registrados;
* a pontuação seja calculada automaticamente;
* o ranking seja atualizado sem intervenção manual;
* as regras do bolão sejam explícitas;
* alterações relevantes sejam rastreáveis;
* o sistema possua uma base arquitetural sólida para evoluir.

O foco inicial é resolver bem o problema básico antes de introduzir complexidade desnecessária.

---

## Contexto

Bolões entre amigos costumam começar de maneira simples, mas rapidamente acumulam problemas:

* palpites registrados em diferentes lugares;
* planilhas difíceis de manter;
* resultados atualizados manualmente;
* cálculos de pontuação feitos de forma inconsistente;
* regras combinadas informalmente;
* mudanças de regras difíceis de rastrear;
* necessidade de alterar diretamente o banco de dados;
* pouca transparência sobre como uma pontuação foi calculada.

Este projeto parte desse problema e busca construir uma solução na qual **o domínio e suas regras sejam parte explícita do produto**, e não detalhes espalhados pela interface ou pela infraestrutura.

---

# Escopo inicial

A primeira versão deve permitir realizar o ciclo fundamental de um bolão:

```text
Criar bolão
    ↓
Adicionar participantes
    ↓
Cadastrar partidas
    ↓
Participantes registram palpites
    ↓
Partidas acontecem
    ↓
Resultados são registrados
    ↓
Pontuação é calculada
    ↓
Ranking é atualizado
```

### Funcionalidades iniciais

#### Bolão

* criar um bolão;
* definir informações básicas;
* visualizar o bolão;
* visualizar participantes;
* visualizar partidas;
* visualizar ranking.

#### Participantes

* entrar em um bolão;
* identificar-se dentro do bolão;
* visualizar seus palpites;
* visualizar sua pontuação;
* acompanhar sua posição no ranking.

#### Partidas

* cadastrar uma partida;
* definir equipes;
* definir data e horário;
* acompanhar o estado da partida;
* registrar o resultado.

#### Palpites

* registrar um palpite;
* visualizar o próprio palpite;
* alterar um palpite enquanto permitido;
* impedir alterações após o prazo definido;
* visualizar o palpite após o encerramento da partida.

#### Pontuação

* calcular a pontuação de cada palpite;
* associar a pontuação ao participante;
* atualizar o ranking;
* permitir compreender como determinada pontuação foi obtida.

#### Ranking

* ordenar participantes de acordo com as regras vigentes;
* apresentar pontuação;
* apresentar posição;
* lidar com empates de acordo com uma política definida pelo bolão.

---

# O que não faz parte da primeira versão

A primeira versão **não deve tentar resolver todos os problemas possíveis de uma plataforma de bolões**.

Inicialmente ficam fora do escopo:

* múltiplos esportes;
* apostas com dinheiro real;
* pagamentos;
* integração com casas de apostas;
* mercado de odds;
* criação de uma plataforma pública de bolões;
* aplicativos mobile nativos;
* múltiplos provedores externos;
* agentes autônomos;
* funcionalidades avançadas de IA;
* microsserviços;
* infraestrutura distribuída;
* generalização prematura do domínio.

Esses assuntos podem aparecer posteriormente como experimentos ou evoluções, mas não devem orientar a implementação inicial.

---

# Princípios do projeto

## 1. Começar simples

A primeira implementação deve ser um sistema pequeno e coerente.

Complexidade deve ser adicionada quando houver uma necessidade concreta do domínio, produto ou arquitetura.

Não introduzir uma tecnologia apenas porque ela poderia ser utilizada.

---

## 2. O domínio vem antes da arquitetura

Antes de decidir estruturas, frameworks ou padrões, precisamos entender:

* quem participa do bolão;
* quais são os objetos importantes;
* quais comportamentos existem;
* quais estados existem;
* quais regras precisam ser garantidas;
* quais acontecimentos modificam o estado do sistema.

A arquitetura deve surgir dessas necessidades.

---

## 3. Regras de negócio não devem depender da interface

Uma regra como:

> "um palpite não pode ser alterado depois do início da partida"

deve existir como uma regra do domínio.

Ela não deve depender exclusivamente de:

* um botão desabilitado;
* uma validação no frontend;
* uma condição específica de uma página.

A interface pode comunicar e antecipar a regra, mas o domínio deve ser capaz de protegê-la.

---

## 4. Evitar alterações manuais de estado

Uma das motivações do projeto é eliminar situações como:

```text
"precisamos entrar no banco e corrigir isso."
```

Quando uma operação fizer parte do domínio, ela deve possuir um fluxo explícito no sistema.

Alterações administrativas importantes devem possuir:

* operação definida;
* validação;
* autorização;
* rastreabilidade quando necessário;
* testes.

---

## 5. Transparência

O participante deve conseguir entender:

> "Por que recebi essa pontuação?"

Sempre que possível, uma pontuação deve poder ser explicada a partir de:

```text
Palpite
+
Resultado
+
Regras utilizadas
=
Pontuação
```

A aplicação deve evitar cálculos que sejam uma "caixa-preta".

---

## 6. Evolução incremental

O projeto deve permitir que decisões sejam revisitadas.

Uma decisão arquitetural tomada na primeira versão não precisa ser tratada como definitiva.

Quando uma nova necessidade surgir, devemos perguntar:

> "O modelo atual continua adequado?"

em vez de tentar antecipar todos os problemas futuros.

---

# Conceitos iniciais do domínio

Os conceitos abaixo são apenas um **ponto de partida para discovery**, não um modelo definitivo.

```text
Pool
Participant
Match
Team
Prediction
MatchResult
Score
Ranking
Regulation
```

Durante a modelagem do domínio, esses conceitos podem:

* mudar de nome;
* ser divididos;
* ser combinados;
* desaparecer;
* dar origem a novos conceitos.

O modelo final deve refletir o domínio descoberto, e não necessariamente esta lista.

---

# Ciclo de vida

O sistema provavelmente precisará representar diferentes estados.

Por exemplo, uma partida pode passar por:

```text
Scheduled
    ↓
Live
    ↓
Finished
```

Um palpite pode possuir regras relacionadas ao ciclo da partida:

```text
Open
    ↓
Locked
    ↓
Scored
```

Um bolão também pode possuir seu próprio ciclo de vida.

Esses estados ainda precisam ser explorados e validados durante o domain modeling.

---

# Regulamento

O regulamento é um conceito importante do projeto.

As regras do bolão não devem ficar implícitas no código ou em acordos informais.

O regulamento deverá eventualmente definir, entre outras coisas:

* quem pode participar;
* quando um participante pode entrar;
* prazo para envio de palpites;
* possibilidade de alteração de palpites;
* regras de pontuação;
* critérios de desempate;
* tratamento de partidas adiadas ou canceladas;
* tratamento de resultados alterados;
* regras administrativas.

A primeira versão pode utilizar um conjunto fixo e simples de regras.

Porém, a arquitetura deve deixar espaço para que o conceito de **regulamento** evolua posteriormente.

Uma possível evolução é permitir versões:

```text
Regulation v1
       ↓
Regulation v2
       ↓
Regulation v3
```

mantendo a capacidade de identificar quais regras foram utilizadas para produzir determinado resultado.

Isso é uma direção de evolução, não um requisito da primeira versão.

---

# Pontuação

A pontuação será inicialmente baseada no resultado previsto e no resultado real da partida.

O mecanismo exato de pontuação ainda deve ser definido durante o processo de descoberta e modelagem.

A implementação deve evitar espalhar regras de pontuação pela aplicação.

Uma possível direção arquitetural é possuir um mecanismo conceitual semelhante a:

```text
Prediction
     +
MatchResult
     +
Scoring Rules
     ↓
Score
```

O desenho definitivo deve ser resultado do domain modeling.

---

# Ranking

O ranking representa a classificação dos participantes de acordo com as regras do bolão.

Além da pontuação total, poderão existir critérios adicionais de desempate.

Por exemplo:

```text
Pontuação
    ↓
Critério de desempate 1
    ↓
Critério de desempate 2
    ↓
...
```

Esses critérios devem ser explícitos, determinísticos e testáveis.

---

# Arquitetura

A primeira versão deve priorizar uma arquitetura simples e bem estruturada.

Uma possibilidade é iniciar com um **monólito modular**, mantendo separação clara entre:

```text
Presentation
Application
Domain
Infrastructure
```

ou outra organização que se mostre mais adequada durante o processo de arquitetura.

A escolha de:

* Clean Architecture;
* Hexagonal Architecture;
* DDD;
* CQRS;
* Event-driven architecture;
* Outbox;
* mensageria;
* microsserviços;

não é um requisito inicial.

Essas abordagens poderão ser exploradas conforme surgirem problemas que justifiquem sua utilização.

---

# Evoluções arquiteturais possíveis

O projeto deve servir também como laboratório para experimentar a evolução de um sistema.

Algumas possibilidades futuras:

### Integração com resultados externos

```text
External Sports API
        ↓
Integration Adapter
        ↓
Match Result
        ↓
Domain
```

### Processamento assíncrono

```text
Domain Event
     ↓
Message
     ↓
Consumer
     ↓
Score Calculation
```

### Auditoria

Registrar acontecimentos importantes:

```text
PredictionCreated
PredictionChanged
MatchResultRecorded
ScoreCalculated
RegulationChanged
```

### Outbox

Garantir consistência entre alterações de domínio e publicação de eventos.

### CQRS

Separar modelos de escrita e leitura caso o domínio ou a experiência do produto justifique.

### Microsserviços

Somente como experimento posterior, caso existam fronteiras de domínio e problemas que tornem essa separação justificável.

---

# Automação

Uma das metas de evolução é remover progressivamente operações manuais.

Inicialmente:

```text
Admin registra resultado
        ↓
Sistema calcula pontuação
        ↓
Ranking atualizado
```

Posteriormente:

```text
Fonte externa
        ↓
Sistema identifica resultado
        ↓
Resultado validado
        ↓
Pontuação calculada
        ↓
Ranking atualizado
        ↓
Participantes notificados
```

A automação deve ser construída gradualmente, com atenção especial a:

* idempotência;
* retries;
* falhas externas;
* resultados duplicados;
* resultados alterados;
* partidas adiadas;
* indisponibilidade de serviços externos.

---

# Product Design

O produto deve ser desenvolvido a partir do problema e dos usuários, não a partir da estrutura técnica.

O processo deve explorar:

* objetivos dos participantes;
* necessidades administrativas;
* principais jornadas;
* momentos de maior ansiedade;
* informações importantes antes de uma partida;
* acompanhamento do ranking;
* compreensão da pontuação;
* tratamento de erros;
* estados vazios;
* estados de carregamento;
* situações excepcionais.

A interface deve tornar o estado do bolão compreensível sem exigir conhecimento sobre o funcionamento interno do sistema.

---

# Design de Interface

A interface deverá ser desenvolvida como parte do processo de produto.

Entre os principais fluxos esperados estão:

```text
Criar bolão
Entrar em bolão
Visualizar bolão
Registrar palpite
Alterar palpite
Visualizar partidas
Visualizar resultado
Visualizar pontuação
Visualizar ranking
Consultar regulamento
```

Antes da implementação definitiva, os fluxos poderão ser prototipados e avaliados.

O projeto também servirá para praticar:

* design system;
* composição de componentes;
* estados de interface;
* acessibilidade;
* responsividade;
* hierarquia visual;
* microinterações;
* feedback de ações;
* visualização de dados.

---

# IA como ferramenta de desenvolvimento

IA faz parte do processo de construção do projeto, mas não substitui as decisões de engenharia e produto.

O projeto será utilizado para experimentar:

* Skills;
* agentes;
* MCP;
* context engineering;
* geração e revisão de código;
* testes;
* documentação;
* análise arquitetural;
* product discovery;
* design de interface.

As decisões importantes devem continuar sendo compreendidas e validadas pelo desenvolvedor.

A IA deve funcionar como **ferramenta de amplificação do processo**, e não como substituta da compreensão do sistema.

---

# Skills

O desenvolvimento deverá utilizar Skills para estruturar o processo de trabalho.

Entre os possíveis usos:

```text
Discovery
    ↓
Domain Modeling
    ↓
Product Specification
    ↓
Architecture
    ↓
Implementation
    ↓
Testing
    ↓
Review
    ↓
Refactoring
```

As Skills podem produzir ou atualizar artefatos como:

* documentação;
* especificações;
* modelos de domínio;
* decisões arquiteturais;
* tickets;
* testes;
* protótipos;
* revisões.

O conjunto definitivo de Skills utilizadas será definido durante o projeto.

---

# MCP e Agents

MCP e agentes fazem parte das possíveis evoluções do projeto, mas não são requisitos do MVP.

Quando introduzidos, devem resolver problemas concretos.

Exemplos futuros:

```text
Consultar ranking
Consultar partidas
Consultar palpites
Explicar pontuação
Consultar regulamento
Identificar inconsistências
Gerar insights sobre o bolão
```

Um possível futuro MCP poderia expor capacidades como:

```text
get_pool
get_matches
get_prediction
get_ranking
get_score_explanation
get_regulation
```

Isso permitiria explorar a aplicação como uma plataforma consumível por agentes, sem acoplar o domínio a uma interface específica.

---

# Qualidade

O projeto deve ser desenvolvido com preocupação explícita com qualidade.

Entre os aspectos a serem praticados:

* testes unitários;
* testes de integração;
* testes de API;
* testes de componentes;
* testes end-to-end;
* testes de regras de negócio;
* testes de casos extremos;
* análise estática;
* linting;
* formatação;
* revisão de código;
* observabilidade.

As regras de domínio devem possuir testes especialmente fortes.

---

# Documentação e decisões

O projeto deve registrar decisões importantes.

Decisões relevantes podem ser documentadas através de ADRs ou mecanismo equivalente.

Exemplos:

```text
Por que um monólito modular?
Por que determinada modelagem de Prediction?
Como a pontuação é calculada?
Como empates são resolvidos?
Como resultados externos são tratados?
Por que determinado evento existe?
Por que determinada tecnologia foi ou não utilizada?
```

A documentação deve registrar **decisões e seus motivos**, e não apenas descrever o código.

---

# Roadmap conceitual

O roadmap abaixo representa uma direção de evolução, não um backlog fechado.

## Fase 1 — Bolão básico

* [ ] Criar bolão
* [ ] Adicionar participantes
* [ ] Cadastrar partidas
* [ ] Registrar palpites
* [ ] Registrar resultados
* [ ] Calcular pontuação
* [ ] Exibir ranking

## Fase 2 — Regulamento

* [ ] Definir regras explícitas
* [ ] Definir regras de pontuação
* [ ] Definir critérios de desempate
* [ ] Definir prazos
* [ ] Definir tratamento de exceções
* [ ] Explorar versionamento de regras

## Fase 3 — Produto

* [ ] Refinar jornadas
* [ ] Melhorar experiência de palpites
* [ ] Melhorar ranking
* [ ] Exibir explicações de pontuação
* [ ] Criar experiência administrativa
* [ ] Desenvolver estados e feedbacks

## Fase 4 — Automação

* [ ] Jobs
* [ ] Atualização automática de partidas
* [ ] Integração com fonte externa
* [ ] Notificações
* [ ] Tratamento de falhas

## Fase 5 — Arquitetura

* [ ] Revisar boundaries
* [ ] Domain Events
* [ ] Outbox
* [ ] Processamento assíncrono
* [ ] CQRS como experimento
* [ ] Outras abordagens conforme necessidade

## Fase 6 — IA

* [ ] MCP
* [ ] Skills específicas do domínio
* [ ] Agentes
* [ ] Insights
* [ ] Evals
* [ ] Observabilidade de agentes

---

# O que significa "terminado"

O projeto não será considerado concluído apenas porque todas as telas funcionam.

Uma versão significativa deve permitir responder positivamente a perguntas como:

* Um participante consegue completar o fluxo inteiro sem intervenção manual?
* O sistema impede palpites inválidos?
* O sistema calcula a pontuação corretamente?
* É possível explicar por que alguém recebeu determinada pontuação?
* O ranking é determinístico?
* As principais regras possuem testes?
* É possível alterar resultados sem corromper o histórico?
* Os fluxos administrativos são explícitos?
* O sistema possui uma separação razoável entre domínio, aplicação e infraestrutura?
* As decisões arquiteturais importantes estão documentadas?
* O produto é compreensível para alguém que nunca viu o código?

O objetivo é construir um **sistema pequeno, porém sério**.

---

# Natureza do projeto

Este projeto é deliberadamente experimental.

Nem toda tecnologia ou abordagem planejada precisa chegar à versão final.

Algumas ideias podem ser implementadas apenas como experimentos para responder perguntas:

> "Isso realmente melhora o sistema?"

> "Qual problema essa arquitetura resolve?"

> "Qual complexidade ela introduz?"

> "Onde a abstração deixou de valer a pena?"

O principal resultado esperado não é apenas a aplicação funcionando.

É desenvolver a capacidade de **projetar, modelar, implementar, avaliar e evoluir software utilizando IA como parte do processo de engenharia**.

---

## Princípio norteador

> **Começar pequeno. Modelar o domínio. Tornar as regras explícitas. Automatizar o que for possível. Evoluir a arquitetura somente quando houver motivo.**

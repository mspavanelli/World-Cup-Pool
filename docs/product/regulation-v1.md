# Regulamento v1

Este documento define as regras compartilhadas por todos os bolões criados sob o Regulamento v1. Cada bolão permanece vinculado à versão de regulamento usada em sua criação; versões futuras não alteram seu histórico.

## Participação

- Exceto o administrador que escolhe participar na criação do bolão, a pessoa solicita entrada e precisa ser aprovada pela administração.
- A entrada é permitida somente antes do início previsto da primeira partida do bolão.
- Se o início previsto da primeira partida mudar antes do prazo de entrada, o prazo acompanha o novo horário. Depois de vencido, uma alteração posterior não reabre a entrada.
- Se a primeira partida for cancelada antes de vencer o prazo de entrada, o prazo passa a ser o início previsto da próxima partida válida. Se já venceu, o cancelamento não reabre a entrada.
- Uma pessoa pode ocupar apenas uma participação no mesmo bolão.
- Um participante pode ser desativado. Nesse caso, deixa de registrar ou alterar palpites, mas os já registrados continuam válidos para pontuação; a pessoa permanece identificada no ranking atual e no histórico, com seus pontos preservados.
- O administrador pode reativar um participante desativado para palpites futuros. Desativação e reativação registram responsável, momento e motivo, sem alterar palpites ou pontos anteriores.
- Uma pessoa pode participar de vários bolões, mas possui no máximo uma participação em cada um. Nome de exibição, palpites e posição pertencem a cada bolão.

## Palpites

- Cada participante pode registrar um palpite por partida.
- O palpite contém dois placares inteiros não negativos, um para cada equipe.
- O participante pode substituir seu palpite enquanto o prazo estiver aberto; somente a versão vigente no prazo é considerada.
- A ausência de palpite concede zero ponto. O sistema não cria palpites automaticamente.
- O prazo de uma partida é seu horário de início previsto, avaliado pelo relógio do sistema e sem tolerância. Se o administrador registrar seu início real antes desse horário, os palpites são bloqueados imediatamente.
- O início real pode ser informado depois de ter ocorrido. Nesse caso, o bloqueio antecipado vale a partir do registro no sistema: palpites aceitos antes desse registro não são invalidados retroativamente.
- O início real, a suspensão e a retomada de uma partida são registrados pelo administrador. Suspensão e retomada não reabrem os palpites.
- Se o horário mudar antes do prazo vigente, o prazo acompanha o novo horário.
- Se o prazo já tiver vencido, uma alteração posterior de horário não reabre os palpites.
- Antes do prazo, apenas o autor pode conhecer o conteúdo do palpite. Nem a administração pode consultar palpites de terceiros.
- Após o prazo, os participantes podem consultar os palpites uns dos outros.

## Resultado válido

Para pontuação, vale o placar ao fim do tempo regulamentar e de seus acréscimos. Prorrogação e disputa de pênaltis não fazem parte do resultado regulamentar.

Depois que um participante registrar um palpite para uma partida, ou depois de seu início real, suas equipes não podem ser substituídas. Um confronto com equipes diferentes deve ser cadastrado como outra partida.

O administrador pode cadastrar novas partidas com início previsto futuro enquanto o bolão estiver aberto, inclusive depois de sua primeira partida começar. Não pode cadastrar partida cujo início previsto já tenha passado.

Uma partida cadastrada por engano pode ser excluída apenas antes do primeiro palpite e de seu início real. Depois disso, o registro permanece e, caso não haja resultado regulamentar, pode ser classificado como sem pontuação.

## Pontuação

Para cada participante em uma partida com resultado regulamentar, a pontuação é determinada assim, mesmo que não exista palpite:

| Situação | Pontos |
| --- | ---: |
| Placar exato | 5 |
| Resultado correto — vitória, empate ou derrota — sem placar exato | 3 |
| Resultado incorreto ou ausência de palpite | 0 |

### Exemplos

Para um resultado regulamentar de `2 × 1`:

- `2 × 1` recebe 5 pontos;
- `3 × 1` recebe 3 pontos;
- `1 × 1` recebe 0 ponto.

Para um resultado regulamentar de `1 × 1`:

- `1 × 1` recebe 5 pontos;
- `2 × 2` recebe 3 pontos;
- `1 × 0` recebe 0 ponto.

Toda pontuação deve ser explicável pelo palpite, pelo resultado regulamentar e pela regra aplicada.

Antes do registro do resultado regulamentar, a pontuação da partida está pendente. Esse estado é distinto de zero ponto calculado após o resultado.

## Ranking e desempate

1. Maior pontuação total.
2. Maior quantidade de placares exatos.
3. Persistindo a igualdade, os participantes compartilham a mesma posição.

As posições seguem o padrão de ranking de competição. Se duas pessoas ocuparem o primeiro lugar, a próxima ocupará o terceiro: `1º, 1º, 3º`.

Uma ordenação alfabética pode estabilizar a apresentação de participantes empatados, mas não constitui desempate.

## Exceções de partidas

### Partida suspensa

Se uma partida iniciada for suspensa e posteriormente retomada, ela conserva os mesmos palpites, que permanecem bloqueados. A pontuação aguarda a conclusão de seu tempo regulamentar.

### Cancelamento, anulação ou WO

Uma partida cancelada, anulada ou decidida por WO sem resultado regulamentar jogado:

- não concede pontos;
- não conta para critérios de desempate;
- não transforma um placar administrativo em resultado regulamentar.

Se uma partida já pontuada for anulada, seus pontos e placares exatos deixam de contar no ranking. O resultado anteriormente registrado e a anulação permanecem visíveis no histórico, com motivo, responsável e momento da mudança.

Se a partida for disputada novamente desde o início, a nova ocorrência possui prazo e palpites próprios.

## Correção de resultados

- Somente a administração pode corrigir um resultado registrado.
- A correção pode ocorrer a qualquer momento, inclusive após o encerramento do bolão.
- Cada correção registra o valor anterior, o novo valor, o motivo, o responsável e o momento da alteração.
- Depois da correção, todas as pontuações afetadas e o ranking são recalculados.
- Uma anulação equivocada pode ser revertida pela administração, inclusive após o encerramento do bolão, restabelecendo o resultado regulamentar e a pontuação com motivo e histórico auditável.
- O histórico da correção é visível aos participantes. Publicamente, o responsável pode ser apresentado como “administração”.
- O Regulamento v1 não exige notificações externas sobre correções.

## Evolução do regulamento

Regulamentos futuros podem definir regras diferentes, inclusive outro esquema de pontuação. Eles se aplicam apenas aos bolões criados sob essas versões e não reinterpretam palpites, pontuações ou rankings de bolões vinculados ao Regulamento v1.

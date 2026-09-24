# Modelo de domínio do bolão

Este documento reúne as relações, invariantes e ciclos de vida definidos para o MVP. A linguagem canônica está em [`CONTEXT.md`](../../CONTEXT.md); as regras numéricas e operacionais estão no [Regulamento v1](../product/regulation-v1.md).

## Relações

- Uma **pessoa** é identificada por e-mail verificado. Pode administrar e participar de vários **bolões**, mas ocupa no máximo uma participação em cada um.
- Cada bolão tem exatamente um **administrador**, um campeonato de futebol informado na criação e uma **versão do regulamento** vinculada permanentemente. O administrador pode optar por participar na criação.
- Cada bolão contém seus próprios **participantes** e **partidas**. Mesmo que dois bolões acompanhem o mesmo confronto real, seus registros de partida, resultados e correções são independentes.
- Cada partida pertence a um bolão e identifica duas equipes e um horário de início previsto. Um participante pode ter no máximo um **palpite vigente** para ela, composto de um placar não negativo por equipe.
- Uma partida tem no máximo um **resultado regulamentar vigente**. Correções e anulações preservam os valores anteriores e seus motivos no histórico.
- A **pontuação** de cada participante numa partida com resultado vigente decorre de seu palpite vigente, se existir, e da versão do regulamento do bolão. O **ranking** agrega essas pontuações e a quantidade de placares exatos dos participantes do mesmo bolão.

## Ciclos de vida

| Conceito | Estados relevantes | Mudanças permitidas |
| --- | --- | --- |
| Bolão | Aberto, encerrado | O administrador encerra após todas as partidas terem desfecho; o encerramento não impede correções de resultado. |
| Solicitação de entrada | Pendente, recusada, aprovada | O administrador decide antes do prazo de entrada; uma recusa pode ser reconsiderada nesse período. |
| Participante | Ativo, desativado | O administrador desativa ou reativa com registro auditável. |
| Partida | Agendada, em andamento, suspensa, concluída com resultado, sem pontuação | Início, suspensão e retomada são registrados pelo administrador; conclusão ou classificação sem pontuação determinam o desfecho. Anulação e reversão podem mudar o desfecho depois. |
| Palpite | Editável, bloqueado | O prazo ou o início real antecipado registrado bloqueia novas alterações; resultado e pontuação não reabrem o palpite. |
| Pontuação da partida | Pendente, calculada, sem pontuação | Resultado calcula 0, 3 ou 5 pontos; anulação remove a contribuição; correção ou reversão recalcula. |

### Bolão e participação

1. O administrador cria o bolão aberto e escolhe se também será participante. A versão do regulamento fica vinculada nesse momento.
2. Outra pessoa solicita entrada pelo convite. A solicitação fica pendente até aprovação ou recusa; uma recusa pode ser reconsiderada enquanto a entrada estiver aberta.
3. A aprovação admite a pessoa como participante. O prazo de entrada é o início previsto da primeira partida válida. Adiamento ou cancelamento antes do prazo pode deslocá-lo; depois de vencido, ele não reabre.
4. Um participante ativo pode ser desativado e depois reativado pelo administrador. Enquanto desativado, não cria nem altera palpites; os anteriores continuam elegíveis para pontuação. Ambas as mudanças são auditadas.
5. O administrador pode encerrar o bolão quando todas as partidas estiverem concluídas com resultado ou classificadas como sem pontuação. Encerrado, o bolão não recebe novos participantes, partidas ou palpites. Consultas, correções de resultado e reversões de anulação continuam possíveis.

### Partida e resultado

1. O administrador cadastra uma partida com início previsto futuro. Pode acrescentar partidas futuras mesmo depois da primeira partida do bolão.
2. Antes do primeiro palpite e do início real, uma partida cadastrada por engano pode ser excluída. Depois de qualquer um desses marcos, permanece identificável; suas equipes não podem ser substituídas.
3. Antes de vencer o prazo do palpite, um adiamento muda o horário previsto e, com ele, o prazo. Após o vencimento, o novo horário não reabre palpites. A partida e os palpites existentes são preservados.
4. O administrador registra o início real. Uma partida iniciada pode ser suspensa e retomada, mantendo os palpites bloqueados. Ao final do tempo regulamentar, o administrador registra o resultado regulamentar.
5. Uma partida cancelada, anulada ou decidida por WO sem resultado regulamentar jogado fica sem pontuação. Se for disputada novamente desde o início, a nova ocorrência é outra partida, com prazo e palpites próprios.
6. O administrador pode corrigir um resultado, anular uma partida já pontuada ou reverter uma anulação, inclusive após o encerramento do bolão. Cada mudança preserva valor anterior, valor novo, motivo, responsável e momento; pontuação e ranking são recalculados.

### Palpite, pontuação e ranking

1. Enquanto o prazo está aberto e o participante está ativo, ele pode criar ou substituir seu próprio palpite. Não há palpite automático.
2. O prazo é o início previsto vigente ou, se for registrado antes dele, o momento do registro do início real. O bloqueio é definitivo. Se o início real for registrado tarde, palpites aceitos antes do registro não são invalidados retroativamente.
3. Até o prazo, somente o autor vê o conteúdo do palpite. Após o prazo, os demais participantes do bolão podem vê-lo.
4. Antes de existir resultado regulamentar vigente, a pontuação da partida está **pendente**, distinta de zero calculado. Com resultado, placar exato vale 5 pontos; resultado correto sem placar exato, 3; erro ou ausência de palpite, 0. Ausência não cria um palpite fictício.
5. Uma partida sem pontuação não contribui para pontos nem placares exatos. Correção, anulação e reversão recalculam todas as contribuições afetadas.
6. O ranking inclui participantes ativos e desativados. Ordena por pontos totais e depois por quantidade de placares exatos; empates restantes compartilham posição no padrão de competição (`1º, 1º, 3º`).

## Invariantes

- Uma pessoa ocupa no máximo uma participação por bolão; um bolão possui exatamente um administrador e uma versão imutável do regulamento.
- Uma partida pertence a um único bolão e não pode ser cadastrada com início previsto no passado.
- Uma partida não pode ser excluída nem ter equipes trocadas após o primeiro palpite ou o início real.
- Um participante possui no máximo um palpite vigente por partida, com dois placares inteiros não negativos; não pode criar ou alterar palpites após o prazo nem enquanto estiver desativado.
- O início real antecipado só bloqueia palpites a partir do registro no sistema; nenhuma mudança de horário ou registro tardio reabre o prazo ou invalida palpites antes aceitos.
- Antes do prazo, o conteúdo de um palpite é visível somente ao autor, inclusive perante o administrador.
- Resultado regulamentar exige tempo regulamentar jogado; cancelamento, anulação e WO sem esse resultado não produzem pontuação.
- Pontuação é determinada pelo regulamento vinculado ao bolão e pelo resultado vigente. Uma correção ou anulação altera o ranking calculado, sem apagar o histórico da mudança.

## Decisões registradas

- [Vincular a versão do regulamento ao bolão](../adr/0001-vincular-regulamento-ao-bolao.md)
- [Partidas pertencem a cada bolão](../adr/0002-partidas-pertencem-a-cada-bolao.md)
- [Bloqueio antecipado pelo início real](../adr/0003-bloqueio-antecipado-pelo-inicio-real.md)

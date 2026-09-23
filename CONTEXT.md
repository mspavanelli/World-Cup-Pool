# Bolão

Este contexto descreve a linguagem do bolão de campeonato de futebol e das regras que determinam sua participação, seus palpites, sua pontuação e seu ranking.

## Language

**Regulamento v1**:
Primeira versão do conjunto de regras compartilhado por todos os bolões criados enquanto ela for a versão vigente. Não varia entre esses bolões.
_Avoid_: Regras do bolão, configuração do regulamento

**Versão do regulamento**:
Conjunto de regras vinculado permanentemente a um bolão em sua criação e usado para interpretar todo o seu histórico.
_Avoid_: Regulamento atual, regras mais recentes

**Participante**:
Pessoa cuja solicitação de entrada no bolão foi aprovada antes da primeira partida abrangida por ele. Quando desativada, permanece identificada no histórico do bolão.
_Avoid_: Jogador, apostador, usuário do bolão

**Palpite**:
Previsão de um participante formada por dois placares inteiros não negativos para uma partida. Seu conteúdo pertence somente ao autor até o prazo, quando se torna visível aos demais participantes.
_Avoid_: Aposta, palpite parcial, palpite automático

**Prazo do palpite**:
Instante de início previsto de cada partida, a partir do qual seu palpite não pode ser criado nem alterado.
_Avoid_: Fechamento global, início real da partida, tolerância

**Resultado regulamentar**:
Placar ao fim do tempo regulamentar e de seus acréscimos. Não inclui prorrogação nem disputa de pênaltis.
_Avoid_: Resultado final, placar após os pênaltis

**Partida sem pontuação**:
Partida cancelada, anulada ou decidida por WO sem um resultado regulamentar jogado. Não concede pontos nem participa do desempate.
_Avoid_: Placar administrativo, pontuação padrão

**Pontuação do palpite**:
Valor atribuído pela comparação entre um palpite e o resultado regulamentar segundo o regulamento aplicável.
_Avoid_: Pontuação do participante, pontos automáticos por ausência

**Ranking**:
Classificação dos participantes por pontuação total e, em seguida, pela quantidade de placares exatos. Participantes ainda empatados compartilham a mesma posição, e a posição seguinte considera quantos participantes os antecedem.
_Avoid_: Ordem de envio, desempate alfabético

**Correção de resultado**:
Substituição sem limite de tempo, auditável e visível aos participantes, de um resultado registrado incorretamente. Preserva o valor anterior, o novo valor, o motivo, o responsável e o momento da mudança.
_Avoid_: Edição silenciosa, exclusão do histórico

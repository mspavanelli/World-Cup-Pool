# Bolão

Este contexto descreve a linguagem do bolão de campeonato de futebol e das regras que determinam sua participação, seus palpites, sua pontuação e seu ranking.

## Language

**Bolão**:
Grupo privado de participantes e partidas de um campeonato de futebol, administrado por uma pessoa e vinculado a uma versão do regulamento. Cada bolão possui seus próprios registros de partidas e só pode ser encerrado pelo administrador após todas serem concluídas ou classificadas como sem pontuação; consultas e correções de resultado permanecem possíveis.
_Avoid_: Campeonato, competição

**Administrador**:
Pessoa responsável por administrar um bolão. Pode também ser participante, sujeita às mesmas regras de palpite, pontuação e ranking dos demais participantes.
_Avoid_: Dono do bolão, superusuário

**Pessoa**:
Indivíduo identificado por e-mail verificado, que pode administrar ou participar de vários bolões. Seu nome de exibição e sua participação pertencem a cada bolão.
_Avoid_: Participante global

**Regulamento v1**:
Primeira versão do conjunto de regras compartilhado por todos os bolões criados enquanto ela for a versão vigente. Não varia entre esses bolões.
_Avoid_: Regras do bolão, configuração do regulamento

**Versão do regulamento**:
Conjunto de regras vinculado permanentemente a um bolão em sua criação e usado para interpretar todo o seu histórico.
_Avoid_: Regulamento atual, regras mais recentes

**Participante**:
Pessoa admitida em um bolão antes da primeira partida: por aprovação de sua solicitação de entrada ou, quando é o administrador, por escolha na criação. Pode ser desativada e reativada; os palpites já registrados continuam válidos para pontuação, e sua identificação permanece no ranking e no histórico.
_Avoid_: Jogador, apostador, usuário do bolão

**Prazo de entrada**:
Instante de início previsto da primeira partida válida do bolão, a partir do qual novas pessoas não podem ser admitidas. Antes de vencer, acompanha o adiamento ou cancelamento dessa partida; depois de vencido, não reabre.
_Avoid_: Entrada a qualquer momento, reabertura por adiamento

**Partida**:
Confronto entre duas equipes cadastrado em um único bolão antes de seu início previsto. Um adiamento mantém a mesma partida e seus palpites; depois do primeiro palpite ou do início real, o confronto não pode ser excluído nem ter suas equipes substituídas.
_Avoid_: Partida global compartilhada entre bolões

**Início real da partida**:
Começo efetivo de uma partida, informado pelo administrador. Se for registrado antes do horário previsto, encerra imediatamente o prazo dos palpites, sem invalidar retroativamente os já aceitos.
_Avoid_: Horário previsto de início

**Partida suspensa**:
Partida iniciada e interrompida antes de terminar seu tempo regulamentar, com suspensão e retomada registradas pelo administrador. Conserva os palpites bloqueados e aguarda a retomada antes de receber resultado regulamentar.
_Avoid_: Partida adiada, partida cancelada

**Palpite**:
Previsão de um participante formada por dois placares inteiros não negativos para uma partida. Seu conteúdo pertence somente ao autor até o prazo, quando se torna visível aos demais participantes.
_Avoid_: Aposta, palpite parcial, palpite automático

**Prazo do palpite**:
Primeiro entre o início previsto vigente e o registro antecipado do início real de uma partida, a partir do qual seu palpite não pode ser criado nem alterado. Uma alteração posterior do horário previsto nunca o reabre.
_Avoid_: Fechamento global, tolerância

**Resultado regulamentar**:
Placar ao fim do tempo regulamentar e de seus acréscimos. Não inclui prorrogação nem disputa de pênaltis.
_Avoid_: Resultado final, placar após os pênaltis

**Partida sem pontuação**:
Partida cancelada, anulada ou decidida por WO sem um resultado regulamentar jogado. Não concede pontos nem participa do desempate; se já tiver resultado registrado, sua anulação preserva o histórico desse resultado.
_Avoid_: Placar administrativo, pontuação padrão

**Pontuação do palpite**:
Valor atribuído após o registro de um resultado regulamentar, pela comparação entre um palpite e esse resultado segundo o regulamento aplicável. Antes disso, a pontuação está pendente, distinta de zero ponto calculado.
_Avoid_: Pontuação do participante, pontos automáticos por ausência

**Ranking**:
Classificação dos participantes, inclusive os desativados, por pontuação total e, em seguida, pela quantidade de placares exatos. Participantes ainda empatados compartilham a mesma posição, e a posição seguinte considera quantos participantes os antecedem.
_Avoid_: Ordem de envio, desempate alfabético

**Correção de resultado**:
Substituição sem limite de tempo, auditável e visível aos participantes, de um resultado registrado incorretamente ou de uma anulação equivocada. Preserva o valor anterior, o novo valor, o motivo, o responsável e o momento da mudança, inclusive após o encerramento do bolão.
_Avoid_: Edição silenciosa, exclusão do histórico

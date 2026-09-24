# Recorte do MVP

## Cenário e pessoas

O primeiro uso é um bolão privado de campeonato de futebol entre um pequeno grupo de amigos.

- **Administrador:** cria e opera o bolão. Há um único administrador por bolão no MVP. Ele aprova solicitações de entrada, cadastra partidas e registra resultados. Pode também participar, sujeito às mesmas regras de palpite, pontuação e ranking dos demais participantes.
- **Participante:** pessoa admitida no bolão, inclusive o administrador quando escolhe participar. Registra palpites, acompanha resultados, consulta a explicação da própria pontuação e acompanha o ranking.

Cada pessoa acessa o produto com um e-mail verificado, sem senha. A identificação permite retornar aos próprios palpites e impede que outra pessoa participe apenas usando seu nome. Ao participar, escolhe um nome de exibição para aparecer aos amigos; o e-mail não é exibido. Nomes de exibição iguais são permitidos, mas a interface distingue as pessoas sem revelar o e-mail.

## Jornadas prioritárias

### Criar bolão

1. O administrador se identifica por e-mail verificado.
2. Informa o nome do bolão e o campeonato de futebol. O bolão é vinculado ao Regulamento v1.
3. Escolhe se também participará. Se escolher participar, informa um nome de exibição e sua participação é registrada na criação, antes da primeira partida.
4. Recebe um link de convite reutilizável para compartilhar com os amigos. O link aceita solicitações até o início previsto da primeira partida do bolão; cada pessoa ainda precisa ser aprovada.
5. Cadastra as partidas posteriormente, com equipes e horários previstos.

### Entrar no bolão

1. Um amigo acessa o link de convite e vê o nome do bolão, o campeonato e um resumo do Regulamento v1. Antes da aprovação, não vê participantes, palpites nem ranking.
2. Identifica-se por e-mail verificado, escolhe um nome de exibição e solicita entrada.
3. Vê que está aguardando aprovação. O administrador vê as solicitações pendentes na aplicação e aprova a entrada antes da primeira partida do bolão, conforme o Regulamento v1.
4. Se a solicitação for recusada, o amigo vê a recusa. O administrador pode reconsiderar e aprovar a mesma solicitação enquanto a entrada estiver aberta.
5. Depois de aprovado, o amigo acessa partidas, palpites, pontuação e ranking. O fluxo não exige notificação externa no MVP.

### Registrar palpite

1. O participante vê as partidas disponíveis e o prazo de cada palpite.
2. Abre uma partida por vez e salva dois placares inteiros não negativos.
3. Pode consultar e alterar o próprio palpite até o prazo. O sistema impede alterações após esse instante, conforme o Regulamento v1.
4. Após o prazo, os participantes podem consultar os palpites uns dos outros, conforme o Regulamento v1.

### Acompanhar resultados e ranking

1. O administrador registra o resultado regulamentar de uma partida concluída.
2. O sistema calcula a pontuação dos palpites e atualiza o ranking automaticamente.
3. Participantes podem ver o ranking desde a entrada, com zero ponto antes do primeiro resultado. Visitantes pelo link de convite não o veem.
4. O participante abre a pontuação de cada partida para ver o palpite, o resultado regulamentar, os pontos recebidos e a regra aplicada.
5. Correções de resultado e exceções de partida seguem o Regulamento v1; quando afetarem pontuação, o ranking é recalculado e o histórico relevante fica visível.

## Critério de sucesso

Um grupo real de pelo menos três pessoas completa o ciclo com pelo menos duas partidas concluídas: o administrador cria o bolão, os amigos entram, os participantes registram palpites antes dos prazos, o administrador registra os resultados e o ranking é atualizado automaticamente. O grupo consegue explicar a pontuação por partida e concluir o ciclo sem alterações manuais de dados.

## Fora do MVP

- Personalização das regras do Regulamento v1 por bolão.
- Importação automática de partidas ou resultados e integração com provedores externos.
- Notificações externas.
- Múltiplos esportes, apostas com dinheiro real, pagamentos, odds e bolões públicos.
- Aplicativos mobile nativos, agentes de IA, microsserviços e infraestrutura distribuída.

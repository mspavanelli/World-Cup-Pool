# Produto

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

O primeiro uso é um bolão privado de campeonato de futebol entre um pequeno grupo de amigos. Um administrador cria e opera cada bolão; pode também participar sob as mesmas regras. Participantes aprovados registram palpites, acompanham partidas, consultam sua pontuação e o ranking. Cada pessoa acessa com e-mail verificado, sem senha, e escolhe um nome de exibição por bolão. O e-mail não é exibido aos demais participantes.

## Product Purpose

Substituir planilhas, mensagens dispersas e correções manuais por um fluxo completo: criar o bolão, admitir participantes, cadastrar partidas, registrar palpites e resultados, calcular pontos e atualizar o ranking. O MVP tem sucesso quando um grupo real de pelo menos três pessoas conclui esse ciclo com pelo menos duas partidas, entende a pontuação de cada uma e não precisa alterar dados manualmente.

## Positioning

O Regulamento v1 é explícito e permanece vinculado ao bolão criado sob ele. Cada pontuação pode ser explicada pelo palpite, pelo resultado regulamentar e pela regra aplicada. Correções de resultado preservam histórico e recalculam o ranking.

## Operating Context

O administrador compartilha um link de convite reutilizável; amigos solicitam entrada e aguardam aprovação antes da primeira partida. Participantes palpitam uma partida por vez até o prazo e acompanham os resultados e o ranking no mesmo bolão. O administrador cadastra partidas, registra seus resultados regulamentares e trata correções e exceções. A aplicação está em fase de fundações; a interface atual é apenas um marcador para o primeiro fluxo.

## Capabilities and Constraints

- Há um administrador por bolão no MVP. A entrada depende de aprovação e fecha no início previsto da primeira partida, conforme o Regulamento v1.
- Cada participante registra no máximo um palpite vigente por partida: dois placares inteiros não negativos. Pode alterá-lo até o prazo. O início real antecipado, quando registrado, bloqueia novos palpites imediatamente.
- Antes do prazo, somente o autor conhece o conteúdo do próprio palpite. Depois, os participantes podem consultar os palpites uns dos outros.
- O resultado usado para pontuar é o placar ao fim do tempo regulamentar e acréscimos. Placar exato vale 5 pontos; resultado correto sem placar exato vale 3; resultado incorreto ou ausência de palpite vale 0. Pontuação pendente antes do resultado é distinta de zero calculado.
- O ranking ordena por pontos e depois por quantidade de placares exatos. Empates restantes compartilham a posição, no padrão de ranking de competição.
- Cancelamento, anulação e WO sem resultado regulamentar não pontuam. Correções e anulações conservam motivo, responsável, momento e histórico visível aos participantes.
- O MVP não inclui personalização do regulamento, resultados importados, notificações externas, pagamentos, apostas com dinheiro real, múltiplos esportes, bolões públicos ou aplicativos móveis nativos.

## Brand Commitments

O nome existente é **Bolão**. A linguagem do domínio em `../../CONTEXT.md` orienta os termos da interface, incluindo “bolão”, “participante”, “palpite”, “resultado regulamentar” e “Regulamento v1”.

## Evidence on Hand

- `../../docs/product/vision.md`: propósito e direção do produto.
- `../../docs/product/mvp.md`: pessoas, jornadas e critério de sucesso.
- `../../docs/product/regulation-v1.md`: regras da primeira versão.
- `../../CONTEXT.md`: linguagem do domínio.
- `src/App.vue`: interface inicial, ainda sem os fluxos do MVP.

## Product Principles

1. Tornar prazos, estados e regras compreensíveis durante cada ação.
2. Permitir que qualquer pontuação seja explicada e que mudanças relevantes sejam rastreáveis.
3. Proteger os palpites antes do prazo e a identidade privada de cada pessoa.
4. Completar bem o ciclo de um bolão pequeno antes de ampliar o escopo.

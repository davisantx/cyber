# Sistema narrativo do CYBER

## Capítulos

Cada capítulo é um objeto de dados em src/story/chapters, registrado em src/story/registry.js. O objeto define id, number, revision, title, protagonist, context, firstSceneId, nextChapterId, initialVariables, assets e scenes. Não há dependência de um protagonista único: o progresso ativo guarda o id do capítulo, e cada novo capítulo pode usar elenco, variáveis e recursos próprios.

Para acrescentar outra história:

1. Criar seu arquivo de capítulo com identificadores únicos para as cenas e um começo, conflito e encerramento completos.
2. Importar o objeto e adicioná-lo a CHAPTER_LIST em `src/story/registry.js`. CHAPTERS é derivado automaticamente dessa lista.
3. Definir nextChapterId no capítulo anterior. A transição “Enquanto isso...” iniciará automaticamente o capítulo registrado.
4. Incluir os recursos locais adequados em public e as referências em assets. Se não houver arte, usar um cenário provisório identificado.
5. Criar testes de caminhos para escolhas, encerramentos e retomada.

Os três primeiros capítulos estão implementados. O próximo capítulo após o terceiro ainda não tem enredo nem personagem definidos.

## Cenas e entradas

Uma cena possui act, setting, background, entries e next. Entradas do tipo line registram mode (dialogue, thought ou narration), speaker, text, expression e, opcionalmente, when. Entradas do tipo choice registram prompt e options. Cada opção define id, label, to e effects. Os efeitos alteram variáveis simples do capítulo. Condições aceitam comparação de variável, all, any e not.

O motor percorre entradas, pula as condicionais que não se aplicam e resolve a próxima cena. Uma cena final aponta para chapterEnd. Esse marcador ativa a transição. A última fala permanece como quadro de fundo enquanto a tela escurece, a frase central aparece e o motor procura nextChapterId. Sem próximo capítulo registrado, surge a tela temporária.

## Capítulo 1

André trabalha numa papelaria e estuda há três anos para uma vaga de assistente administrativo. A mãe e a amiga Luana aparecem por diálogos curtos. O concurso de Aurora do Vale e a organizadora Instituto Vereda são fictícios.

| Momento | Decisão | Efeito visível |
| --- | --- | --- |
| Postagem sobre a banca | Conferir o portal, perguntar no grupo ou mudar a revisão | A consulta encerra a dúvida; mudar a revisão custa tempo e volta a aparecer na manhã da prova. |
| Hora de revisão | Refazer a questão difícil ou acompanhar o grupo | A preparação ou as interrupções reaparecem durante a prova. |
| Print sobre o local | Conferir o cartão, tentar contato oficial ou compartilhar o print | O print compartilhado gera dúvidas no grupo e abre uma decisão de reparação. |
| Grupo de candidatos | Corrigir ou apagar a mensagem; ou orientar e descansar se não compartilhou | Diálogos e encerramento reconhecem o que foi feito. |
| Última noite | Dormir ou acompanhar mensagens | O cansaço aparece na manhã seguinte e pode alterar o encerramento. |
| Entrada da escola | Ajudar uma candidata a conferir o cartão ou entrar para se preparar | A conversa e a chegada à sala reconhecem a decisão. |

Os quatro encerramentos convergem na realização da prova, sem afirmar aprovação. Variam o estado emocional, o efeito no grupo e a reflexão do protagonista. A história evita atribuir ingenuidade a André: a tensão parte da importância de três anos de preparação e da urgência simulada pelas postagens.

## Capítulo 2

Lia ajuda Tomás a preparar a rádio da feira cultural da Escola do Farol. Uma recomendação de vídeo insinua que o cantor fictício Ravi Maré morreu, mas o conteúdo completo e uma publicação do artista explicam apenas a pausa nos shows para descansar a voz. O boato chega ao grupo da turma e perde a interrogação da chamada original a cada repasse.

| Momento | Decisão | Efeito visível |
| --- | --- | --- |
| Miniatura do vídeo | Assistir, procurar o perfil do artista ou compartilhar a capa | Compartilhar antes de conferir participa da cadeia de boatos e abre uma decisão de reparação. |
| Grupo da turma | Explicar com fontes, negar sem explicar ou falar primeiro com Tomás | A resposta altera quem recebe a correção e o que ainda precisa ser explicado. |
| Alcance da correção | Avisar a turma vizinha, pedir ajuda à professora ou esperar | Muda como a correção chega a outras pessoas. |
| Rádio da escola | Explicar a confusão sem expor colegas ou seguir a programação | A explicação alcança outras turmas; seguir a programação mantém a conversa no grupo. |
| Preparação da feira | Anotar as fontes ou ensaiar uma explicação | O material preparado é retomado na feira. |
| Fim do ensaio | Assumir ou apagar a mensagem, se Lia compartilhou; preparar um guia ou conversar, caso contrário | Quatro encerramentos mostram reparação, persistência do print, apresentação de uma checagem ou conversa pontual. |

O capítulo trata o compartilhamento precipitado como algo reparável, sem garantir que toda cópia do boato desapareça. Os personagens, a escola e o artista são fictícios. Lia usa seis expressões recortadas da ficha `sprites_recortados_8`.

## Capítulo 3

Nina, colega de Lia e Tomás na Escola do Farol, vê depois da feira um anúncio que promete revelar visitantes do perfil na rede fictícia Vitra. O site externo “Espelho Social” pede a senha da conta e acesso a mensagens antes de mostrar qualquer resultado. O capítulo trata do pedido de acesso, da confiança em mensagens enviadas por perfis conhecidos e da resposta a um possível uso indevido da conta.

| Momento | Decisão | Efeito visível |
| --- | --- | --- |
| Anúncio | Conferir o anunciante, pedir opinião a Lia ou abrir a página | Muda a primeira leitura da promessa, mas todos veem o pedido de acesso. |
| Pistas do site | Ler permissões, consultar a ajuda oficial ou seguir o contador | A reflexão final retoma os sinais observados. |
| Pedido de acesso | Fechar, digitar a senha ou negar permissões | Digitar a senha produz um aviso de acesso desconhecido e mensagem enviada pelo perfil de Nina; sair da página preserva a conta. |
| Mensagem no grupo | Explicar ao grupo, conversar com Lia ou apagar a mensagem | Altera o alcance do aviso e o contexto que acompanha as cópias do link. |
| Cópia do link | Rastrear a origem, avisar outra turma ou guardar a captura | Muda o que se sabe e quem recebe o alerta. |
| Próximo passo | Proteger a conta ou adiar, se a senha foi digitada; ajudar o colega ou conversar, caso contrário | Quatro encerramentos mostram recuperação, pendência, apoio a outro aluno ou atenção à próxima promessa. |

Nina usa seis expressões da ficha `sprites_recortados_4`. Lia, Tomás e professora Nádia reaproveitam os retratos já integrados. A história evita afirmar que apagar uma mensagem desfaz um acesso ou recolhe cópias encaminhadas.

## Salvamento

O registro usa schemaVersion 2, contentRevision, chapterId, sceneId, entryIndex, phase, variables, choices e updatedAt. A revisão do conteúdo impede carregar uma posição que deixou de existir depois de alterações no roteiro. O validador reconstrói as escolhas e confere se a posição, as variáveis e a fase são alcançáveis. O dado incompatível permanece no navegador e é sinalizado no menu. Ao começar nova partida, uma versão v2 incompatível recebe cópia de segurança antes de ser substituída. Backups sucessivos diferentes usam chaves numeradas, preservando os anteriores; falhas de acesso ou falta de espaço são tratadas e sinalizadas.

O salvamento acontece após cada fala, escolha e fase de transição. Retornar ao menu não altera o progresso. “Continuar” usa somente um registro validado contra o capítulo registrado.

## Arte e interface

O menu usa o cenário ilustrado da partida salva e um cartão de sessão. A interface de história usa caixa de diálogo, retratos de todos os personagens com falas e treze fundos ilustrados em `public/backgrounds/`. Cada capítulo associa seus tipos de cena a imagens em `assets.backgrounds`; o mesmo local é reaproveitado quando o roteiro retorna a ele. André, Lia e Nina usam fichas existentes em `../artes/sprites_recortados/sprites_recortados_9`, `_8` e `_4`; Mãe, Luana, Tomás e Nádia usam as fichas em `../artes/fichas_originais/fichas_secundarios/` (caminhos relativos a `game/`).

Os três capítulos têm seis decisões por partida. Os testes percorrem 144, 216 e 486 caminhos, respectivamente. As escolhas têm rolagem própria em telas baixas. Abrir o seletor de capítulos pausa o interlúdio; fechar o modal reinicia o tempo da transição. O histórico pausa a leitura automática e Escape fecha somente o modal aberto.

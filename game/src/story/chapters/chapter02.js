const say = (speaker, text, expression = null, when = null) => ({ type: 'line', mode: 'dialogue', speaker, text, expression, when });
const think = (text, expression = 'pensativo', when = null) => ({ type: 'line', mode: 'thought', speaker: 'Lia', text, expression, when });
const narrate = (text, when = null) => ({ type: 'line', mode: 'narration', speaker: null, text, expression: null, when });
const decide = (prompt, options) => ({ type: 'choice', prompt, options });

export const chapter02 = {
  id: 'chapter-02',
  number: 2,
  revision: '3',
  title: 'O que chegou ao grupo',
  protagonist: { id: 'lia', name: 'Lia' },
  context: 'Uma chamada ambígua sobre um artista fictício vira notícia de morte no grupo da escola.',
  firstSceneId: 'preparativos',
  nextChapterId: 'chapter-03',
  initialVariables: {
    watchedVideo: false,
    checkedOfficial: false,
    sharedRumor: false,
    explainedSource: false,
    terseReply: false,
    supportedFriend: false,
    publicCorrection: false,
    apologized: false,
    preparedGuide: false,
    reachedOtherClass: false,
    askedTeacherToShare: false,
    preparedSourceCard: false,
    rehearsedExplanation: false,
    reportedClickbait: false,
    sharedOfficialOnly: false,
  },
  assets: {
    backgrounds: {
      school: 'backgrounds/school_courtyard.webp',
      corridor: 'backgrounds/school_corridor.webp',
      radio: 'backgrounds/school_radio.webp',
      digital: 'backgrounds/digital_school.webp',
    },
    portraits: {
      normal: 'characters/lia/01_normal.png',
      feliz: 'characters/lia/02_feliz.png',
      triste: 'characters/lia/03_triste.png',
      surpreso: 'characters/lia/05_surpresa.png',
      constrangido: 'characters/lia/06_constrangida.png',
      pensativo: 'characters/lia/07_pensativa.png',
    },
    supportingPortraits: {
      Tomás: {
        normal: 'characters/tomas/01_normal.png',
        feliz: 'characters/tomas/02_feliz.png',
        triste: 'characters/tomas/03_triste.png',
        surpreso: 'characters/tomas/04_surpreso.png',
        pensativo: 'characters/tomas/05_pensativo.png',
        aliviado: 'characters/tomas/06_aliviado.png',
      },
      'Professora Nádia': {
        normal: 'characters/nadia/01_normal.png',
        feliz: 'characters/nadia/02_feliz.png',
        triste: 'characters/nadia/03_triste.png',
        surpreso: 'characters/nadia/04_surpreso.png',
        pensativo: 'characters/nadia/05_pensativo.png',
        aliviado: 'characters/nadia/06_aliviado.png',
      },
    },
  },
  scenes: {
    preparativos: {
      act: 'Ato 1 · Antes da primeira aula',
      setting: 'Escola do Farol · manhã',
      background: 'school',
      entries: [
        narrate('Na Escola do Farol, Lia e Tomás organizavam a rádio da feira cultural e separavam na lista uma música do cantor fictício Ravi Maré, escolhida pela turma.'),
        say('Tomás', 'Minha irmã vem assistir na sexta. Ela adora essa música do Ravi.', 'feliz'),
        narrate('No intervalo, ao pegar o celular para conferir a programação, Lia viu uma recomendação alarmante ocupar a tela.'),
      ],
      next: 'recomendacao',
    },
    recomendacao: {
      act: 'Ato 2 · Uma chamada pela metade',
      setting: 'Celular · intervalo',
      background: 'digital',
      entries: [
        narrate('A miniatura de um canal de fofocas trazia Ravi em preto e branco com o título: “ADEUS, RAVI MARÉ? FÃS NÃO ACREDITAM” e um emoji de vela.'),
        think('É um canal de terceiros, não o perfil do artista. Mas se for verdade, o Tomás vai ficar arrasado.', 'surpreso'),
        decide('O que Lia faz antes de levar a notícia ao grupo?', [
          { id: 'abrir', label: 'Assistir ao vídeo completo para verificar o que realmente aconteceu', to: 'video_aberto', effects: { watchedVideo: true } },
          { id: 'perfil', label: 'Procurar diretamente o perfil oficial de Ravi Maré por conta própria', to: 'perfil_oficial', effects: { checkedOfficial: true }, best: true },
          { id: 'repassar', label: 'Enviar a miniatura ao grupo da turma para perguntar se alguém sabe', to: 'print_enviado', effects: { sharedRumor: true } },
        ]),
      ],
    },
    video_aberto: {
      act: 'Ato 2 · Uma chamada pela metade',
      setting: 'Celular · intervalo',
      background: 'digital',
      entries: [
        narrate('Lia abriu o vídeo: depois de uma introdução dramática, o apresentador dizia apenas que Ravi cancelara um show daquele mês para descansar a voz.'),
        say('Lia', 'É caça-cliques. Usaram foto em preto e branco e a palavra “adeus” para parecer notícia de morte.', 'pensativo'),
      ],
      next: 'grupo',
    },
    perfil_oficial: {
      act: 'Ato 2 · Uma chamada pela metade',
      setting: 'Celular · intervalo',
      background: 'digital',
      entries: [
        narrate('Lia abriu o perfil oficial de Ravi: uma nota publicada naquela manhã explicava apenas uma pausa breve na agenda por repouso vocal.'),
        say('Lia', 'A fonte primária desmente aquela capa sensacionalista. Ele está bem.', 'normal'),
      ],
      next: 'grupo',
    },
    print_enviado: {
      act: 'Ato 2 · Uma chamada pela metade',
      setting: 'Grupo da turma · intervalo',
      background: 'digital',
      entries: [
        say('Lia', 'Gente, viram essa capa? Aconteceu alguma coisa com o Ravi?', 'surpreso'),
        narrate('Ela enviou a imagem sem o link do vídeo. Alguém respondeu “acho que ele morreu” e encaminhou o print para outra turma.'),
        think('Mandei como dúvida, mas na tela de quem recebeu virou confirmação.', 'constrangido'),
      ],
      next: 'grupo',
    },
    grupo: {
      act: 'Ato 3 · A mensagem muda de forma',
      setting: 'Grupo da turma · intervalo',
      background: 'digital',
      entries: [
        narrate('No grupo da turma, a interrogação da miniatura já havia desaparecido: as mensagens afirmavam que “Ravi Maré morreu”.'),
        narrate('O print enviado por Lia aparecia no topo da discussão.', { var: 'sharedRumor', equals: true }),
        narrate('O print daquela mesma capa havia acabado de chegar por outra turma.', { var: 'sharedRumor', equals: false }),
        say('Tomás', 'O pessoal já quer transformar a apresentação em homenagem! O que diz a publicação original?', 'triste'),
        narrate('Com o vídeo completo e a nota oficial do cantor conferidos, Lia via claramente a distorção.'),
      ],
      next: 'resposta_grupo',
    },
    resposta_grupo: {
      act: 'Ato 3 · A mensagem muda de forma',
      setting: 'Grupo da turma · intervalo',
      background: 'digital',
      entries: [
        decide('Como Lia responde à turma depois de conferir as fontes?', [
          { id: 'curto', label: 'Escrever apenas “é mentira, ele está vivo” sem mostrar onde conferiu', to: 'resposta_curta', effects: { terseReply: true } },
          { id: 'privado', label: 'Explicar primeiro só para Tomás e deixar o grupo para depois', to: 'resposta_privada', effects: { supportedFriend: true } },
          { id: 'contexto', label: 'Explicar a pausa nos shows e anexar os links do vídeo completo e do perfil oficial', to: 'resposta_contexto', effects: { explainedSource: true }, best: true },
        ]),
      ],
    },
    resposta_contexto: {
      act: 'Ato 3 · A mensagem muda de forma',
      setting: 'Grupo da turma · intervalo',
      background: 'digital',
      entries: [
        say('Lia', 'Conferi o vídeo inteiro e o aviso oficial do Ravi: ele só cancelou um show para descansar a voz. A capa é clickbait; vejam nos links.', 'normal'),
        narrate('Duas pessoas abriram as fontes e corrigiram as próprias mensagens no grupo.'),
      ],
      next: 'alcance_correcao',
    },
    resposta_curta: {
      act: 'Ato 3 · A mensagem muda de forma',
      setting: 'Grupo da turma · intervalo',
      background: 'digital',
      entries: [
        say('Lia', 'É mentira, ele está vivo.', 'normal'),
        narrate('Sem link nem comprovação, vieram respostas céticas: “quem disse?” e “mas o print está em todo lugar”.'),
      ],
      next: 'alcance_correcao',
    },
    resposta_privada: {
      act: 'Ato 3 · A mensagem muda de forma',
      setting: 'Corredor da escola · intervalo',
      background: 'corridor',
      entries: [
        say('Lia', 'Tomás, conferi a nota oficial do Ravi: ele só vai descansar a voz por alguns dias.', 'normal'),
        narrate('Tomás respirou aliviado, mas no grupo da turma o print continuava circulando sem desmentido.'),
      ],
      next: 'alcance_correcao',
    },
    alcance_correcao: {
      act: 'Ato 3 · A mensagem muda de forma',
      setting: 'Corredor da escola · intervalo',
      background: 'corridor',
      entries: [
        narrate('Uma colega contou que o print sem contexto já estava no grupo da turma vizinha, onde ninguém vira a nota do cantor.'),
        decide('Como Lia tenta levar a correção além da própria turma?', [
          { id: 'vizinha', label: 'Enviar as publicações completas à representante da turma vizinha', to: 'correcao_vizinha', effects: { reachedOtherClass: true } },
          { id: 'professora', label: 'Pedir apoio à professora Nádia para orientar as outras salas com as fontes', to: 'correcao_professora', effects: { askedTeacherToShare: true }, best: true },
          { id: 'depois', label: 'Esperar o ensaio à tarde para decidir como falar do assunto', to: 'correcao_adiada', effects: {} },
        ]),
      ],
    },
    correcao_vizinha: {
      act: 'Ato 3 · A mensagem muda de forma',
      setting: 'Celular · intervalo',
      background: 'digital',
      entries: [
        say('Lia', 'O print que chegou aí é caça-cliques sobre um show adiado. Te mandei a nota oficial do Ravi para mostrar à sua turma.', 'normal'),
        narrate('A representante agradeceu e encaminhou as fontes verificadas ao grupo vizinho.'),
      ],
      next: 'ensaio',
    },
    correcao_professora: {
      act: 'Ato 3 · A mensagem muda de forma',
      setting: 'Corredor da escola · intervalo',
      background: 'corridor',
      entries: [
        say('Professora Nádia', 'Ótima iniciativa checar na origem, Lia. Vou compartilhar essas duas fontes com os professores das outras turmas.', 'feliz'),
        narrate('Nádia levou o esclarecimento documentado às outras salas antes do ensaio da tarde.'),
      ],
      next: 'ensaio',
    },
    correcao_adiada: {
      act: 'Ato 3 · A mensagem muda de forma',
      setting: 'Corredor da escola · intervalo',
      background: 'corridor',
      entries: [
        narrate('Lia deixou para explicar mais tarde, enquanto no corredor outros alunos já comentavam o boato como fato consumado.'),
        think('Quanto mais o print viaja sozinho, mais difícil fica alcançar quem acreditou.'),
      ],
      next: 'ensaio',
    },
    ensaio: {
      act: 'Ato 4 · O microfone está aberto',
      setting: 'Rádio da escola · tarde',
      background: 'radio',
      entries: [
        narrate('À tarde, alguém havia riscado a música de Ravi na pauta da rádio e escrito “homenagem” ao lado.'),
        say('Professora Nádia', 'O microfone do pátio pode esclarecer a confusão sem expor ninguém. O que vocês decidem?', 'pensativo'),
        decide('O que Lia faz no ensaio da rádio?', [
          { id: 'seguir', label: 'Manter apenas a programação musical e deixar a conversa restrita ao grupo', to: 'radio_segue', effects: {} },
          { id: 'explicar', label: 'Explicar a distorção da capa pelo microfone sem citar quem compartilhou', to: 'radio_explica', effects: { publicCorrection: true }, best: true },
        ]),
      ],
    },
    radio_explica: {
      act: 'Ato 4 · O microfone está aberto',
      setting: 'Rádio da escola · tarde',
      background: 'radio',
      entries: [
        say('Lia', 'Atenção: a capa que circulou hoje sobre Ravi Maré era caça-cliques. A nota oficial confirma que ele só pausou um show para descansar a voz. Sempre confiram a fonte completa.', 'normal'),
        narrate('Sem expor nenhum colega, o esclarecimento alcançou todas as turmas no pátio.'),
      ],
      next: 'preparo_feira',
    },
    radio_segue: {
      act: 'Ato 4 · O microfone está aberto',
      setting: 'Rádio da escola · tarde',
      background: 'radio',
      entries: [
        narrate('Lia seguiu apenas com o teste de som, enquanto alunos de outras salas ainda olhavam o print no celular sem saber da correção.'),
        say('Tomás', 'Não falamos no microfone, mas o boato ainda está correndo lá fora.', 'pensativo'),
      ],
      next: 'preparo_feira',
    },
    preparo_feira: {
      act: 'Ato 4 · Mídia fora de contexto',
      setting: 'Rádio da escola · tarde',
      background: 'radio',
      entries: [
        narrate('Logo depois, alguém jogou no grupo um vídeo cortado de 5 segundos em que Ravi dizia “não sei quando volto”, junto de uma foto dele em um hospital.'),
        say('Tomás', 'Cortaram a frase dele pelo meio e pegaram uma foto antiga de hospital para insistir na mentira! Como provamos a manipulação?', 'surpreso'),
        decide('Como Lia e Tomás desmascaram o vídeo cortado e a foto de hospital?', [
          { id: 'fontes', label: 'Fazer busca reversa da foto para provar que é antiga e mostrar o vídeo sem cortes', to: 'fontes_anotadas', effects: { preparedSourceCard: true }, best: true },
          { id: 'fala', label: 'Demonstrar aos colegas os segundos seguintes do vídeo original que foram decepados na edição', to: 'fala_ensaiada', effects: { rehearsedExplanation: true } },
        ]),
      ],
    },
    fontes_anotadas: {
      act: 'Ato 4 · Mídia fora de contexto',
      setting: 'Rádio da escola · tarde',
      background: 'radio',
      entries: [
        narrate('Pela busca reversa de imagem, Lia mostrou que a foto do hospital tinha três anos e anexou a gravação original sem o corte.'),
        say('Tomás', 'Pegaram uma foto antiga verdadeira fora de contexto para fabricar uma notícia falsa.', 'normal'),
      ],
      next: 'depois',
    },
    fala_ensaiada: {
      act: 'Ato 4 · Mídia fora de contexto',
      setting: 'Rádio da escola · tarde',
      background: 'radio',
      entries: [
        say('Lia', 'No vídeo original, logo depois de dizer “não sei quando volto”, ele completa: “a cantar neste mês”. Cortaram a frase de propósito.', 'normal'),
        say('Tomás', 'Comparar o corte com o vídeo inteiro desmonta a manipulação na hora.', 'feliz'),
      ],
      next: 'depois',
    },
    depois: {
      act: 'Ato 5 · O que se faz depois',
      setting: 'Corredor da escola · fim da tarde',
      background: 'corridor',
      entries: [
        say('Tomás', 'Minha irmã viu a explicação e perguntou como uma simples capa e um corte viraram uma mentira tão grande.', 'pensativo'),
      ],
      next: {
        routes: [{ when: { var: 'sharedRumor', equals: true }, to: 'reparar_grupo' }],
        default: 'conversa_final',
      },
    },
    reparar_grupo: {
      act: 'Ato 5 · O que se faz depois',
      setting: 'Grupo da turma · fim da tarde',
      background: 'digital',
      entries: [
        narrate('No histórico do grupo, a primeira captura que Lia enviara sem checar continuava registrada.'),
        decide('O que Lia faz com a mensagem original que ela mesma enviou?', [
          { id: 'apagar', label: 'Apagar o print antigo da conversa e evitar voltar ao assunto', to: 'apagou', effects: {} },
          { id: 'assumir', label: 'Assumir que enviou sem conferir e publicar a retratação com todas as fontes verificadas', to: 'reparo', effects: { apologized: true, explainedSource: true }, best: true },
        ]),
      ],
    },
    reparo: {
      act: 'Ato 5 · O que se faz depois',
      setting: 'Grupo da turma · fim da tarde',
      background: 'digital',
      entries: [
        say('Lia', 'Eu mandei aquela capa sem abrir o vídeo antes. Desculpem. Aqui estão a nota oficial do Ravi e a prova de que a foto do hospital é antiga; repassem a correção.', 'constrangido'),
        narrate('Uma colega que tinha encaminhado a imagem para outra turma levou imediatamente o desmentido completo para lá.'),
      ],
      next: 'fechamento',
    },
    apagou: {
      act: 'Ato 5 · O que se faz depois',
      setting: 'Grupo da turma · fim da tarde',
      background: 'digital',
      entries: [
        narrate('Lia apagou a mensagem do próprio celular, mas a captura antiga continuava salva nas respostas de outros colegas.'),
        think('Tirar da minha tela não devolve a verdade a quem já tinha recebido o print.', 'triste'),
      ],
      next: 'fechamento',
    },
    conversa_final: {
      act: 'Ato 5 · O que se faz depois',
      setting: 'Corredor da escola · fim da tarde',
      background: 'corridor',
      entries: [
        say('Tomás', 'Na sexta, podemos mostrar na rádio como a notícia foi distorcida para a turma aprender a checar.', 'pensativo'),
        decide('O que Lia propõe apresentar na feira cultural?', [
          { id: 'guia', label: 'Criar com Tomás um guia prático de 3 perguntas de checagem para a turma', to: 'guia', effects: { preparedGuide: true }, best: true },
          { id: 'conversa', label: 'Montar um mural comparando a capa caça-cliques com a nota oficial', to: 'apoio', effects: {} },
        ]),
      ],
    },
    guia: {
      act: 'Ato 5 · O que se faz depois',
      setting: 'Rádio da escola · fim da tarde',
      background: 'radio',
      entries: [
        narrate('Lia e Tomás anotaram três passos para ler qualquer postagem: “Quem publicou?”, “O que o conteúdo inteiro diz?” e “A fonte oficial confirma?”.'),
        say('Lia', 'Mostramos a capa, o corte fora de contexto e a publicação oficial antes de tocar a música.', 'feliz'),
      ],
      next: 'fechamento',
    },
    apoio: {
      act: 'Ato 5 · O que se faz depois',
      setting: 'Corredor da escola · fim da tarde',
      background: 'corridor',
      entries: [
        say('Lia', 'Vamos deixar as fontes abertas ao lado da rádio para mostrar a diferença entre clickbait e fato sem constranger ninguém.', 'normal'),
        narrate('Eles organizaram o comparativo visual pronto para quem ainda trouxesse dúvidas na feira.'),
      ],
      next: 'fechamento',
    },
    fechamento: {
      act: 'Ato 6 · O algoritmo na feira',
      setting: 'Escola do Farol · sexta-feira',
      background: 'school',
      entries: [
        narrate('Na sexta-feira da feira cultural, as fontes verificadas e o comparativo contra cortes fora de contexto ajudavam a escola a entender o caso.'),
        narrate('Alguns colegas, porém, abriram o canal de fofoca que criara a capa falsa e queriam comentar em massa xingando o vídeo e compartilhando o link.'),
        say('Tomás', 'Espere: se todo mundo clicar e comentar com raiva lá, o algoritmo vai entender que o vídeo faz sucesso e espalhar para mais gente!', 'pensativo'),
        decide('Como Lia orienta a turma a lidar com o canal caça-cliques?', [
          { id: 'divulgar_oficial', label: 'Pedir que fechem o vídeo enganoso sem dar visualizações e compartilhem apenas o perfil oficial do artista', to: 'oficial_divulgado', effects: { sharedOfficialOnly: true } },
          { id: 'denunciar_capa', label: 'Explicar que comentários de revolta geram engajamento e lucro ao canal, orientando a denunciar a postagem', to: 'clickbait_denunciado', effects: { reportedClickbait: true }, best: true },
        ]),
      ],
    },
    clickbait_denunciado: {
      act: 'Ato 6 · O algoritmo na feira',
      setting: 'Escola do Farol · sexta-feira',
      background: 'school',
      entries: [
        say('Lia', 'Canais de desinformação usam a nossa indignação para ganhar alcance no algoritmo. Não comentem nem repassem o link; usem a opção de denunciar conteúdo enganoso.', 'normal'),
        narrate('Os colegas deixaram de impulsionar o vídeo nos comentários e registraram a denúncia na plataforma.'),
      ],
      next: {
        routes: [
          { when: { all: [{ var: 'sharedRumor', equals: true }, { var: 'apologized', equals: false }] }, to: 'fim_eco' },
          { when: { var: 'apologized', equals: true }, to: 'fim_reparacao' },
          { when: { var: 'preparedGuide', equals: true }, to: 'fim_guia' },
        ],
        default: 'fim_cotidiano',
      },
    },
    oficial_divulgado: {
      act: 'Ato 6 · O algoritmo na feira',
      setting: 'Escola do Farol · sexta-feira',
      background: 'school',
      entries: [
        say('Lia', 'Cada visualização nesse vídeo recompensa quem criou o clickbait. Vamos divulgar apenas o comunicado oficial do Ravi.', 'normal'),
        narrate('A turma fechou o canal sensacionalista e passou a compartilhar somente a fonte primária.'),
      ],
      next: {
        routes: [
          { when: { all: [{ var: 'sharedRumor', equals: true }, { var: 'apologized', equals: false }] }, to: 'fim_eco' },
          { when: { var: 'apologized', equals: true }, to: 'fim_reparacao' },
          { when: { var: 'preparedGuide', equals: true }, to: 'fim_guia' },
        ],
        default: 'fim_cotidiano',
      },
    },
    fim_eco: {
      act: 'Ato 6 · A feira',
      setting: 'Rádio da escola · sexta-feira',
      background: 'radio',
      entries: [
        narrate('No intervalo da feira, uma aluna de outra sala mostrou a Lia o print que ainda circulava: apagar a mensagem inicial sem se retratar deixara a cópia correr solta.'),
        say('Lia', 'Eu repassei essa capa antes de ver o vídeo inteiro. Ele não morreu; foi só uma pausa vocal. Deixa eu te mostrar o aviso oficial.', 'constrangido'),
        think('Apagar não recolhe a desinformação; só a checagem aberta corrige o que foi espalhado.', 'triste'),
      ],
      next: 'chapterEnd',
    },
    fim_reparacao: {
      act: 'Ato 6 · A feira',
      setting: 'Rádio da escola · sexta-feira',
      background: 'radio',
      entries: [
        narrate('A retratação com fontes que Lia publicara havia alcançado as turmas vizinhas antes de a feira começar.'),
        say('Tomás', 'Minha irmã viu sua explicação completa. Assumir o erro e mostrar as fontes freou o boato a tempo.', 'aliviado'),
        think('Não controlo cada print, mas tenho responsabilidade por corrigir onde a minha mensagem chegou.', 'normal'),
      ],
      next: 'chapterEnd',
    },
    fim_guia: {
      act: 'Ato 6 · A feira',
      setting: 'Rádio da escola · sexta-feira',
      background: 'radio',
      entries: [
        narrate('Antes da música, Lia e Tomás mostraram na rádio a capa caça-cliques, o corte fora de contexto e a nota oficial completa.'),
        say('Lia', 'A pergunta sempre vem antes do compartilhamento: quem publicou, o que diz o vídeo inteiro e o que confirma a fonte oficial?', 'feliz'),
        narrate('A turma saiu da feira com um método concreto para desarmar o próximo boato.'),
      ],
      next: 'chapterEnd',
    },
    fim_cotidiano: {
      act: 'Ato 6 · A feira',
      setting: 'Rádio da escola · sexta-feira',
      background: 'radio',
      entries: [
        narrate('Ao apresentar a música de Ravi Maré, Tomás e Lia mostraram o perfil oficial do cantor a quem ainda perguntava sobre o boato.'),
        say('Lia', 'Uma miniatura chamativa ou um vídeo cortado nunca contam a história toda.', 'normal'),
        think('Checar a fonte primária antes de repassar protege toda a comunidade escolar.'),
      ],
      next: 'chapterEnd',
    },
  },
};

const say = (speaker, text, expression = null, when = null) => ({ type: 'line', mode: 'dialogue', speaker, text, expression, when });
const think = (text, expression = 'pensativo', when = null) => ({ type: 'line', mode: 'thought', speaker: 'Lia', text, expression, when });
const narrate = (text, when = null) => ({ type: 'line', mode: 'narration', speaker: null, text, expression: null, when });
const decide = (prompt, options) => ({ type: 'choice', prompt, options });

export const chapter02 = {
  id: 'chapter-02',
  number: 2,
  revision: '2',
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
        narrate('Na Escola do Farol, a feira cultural começaria na sexta-feira. Lia ajudava a montar a pequena rádio do pátio com Tomás, seu amigo desde o sexto ano.'),
        narrate('Sobre a mesa havia uma caixa de som emprestada, dois microfones e a lista de músicas que os alunos tinham escolhido.'),
        say('Tomás', 'Se a caixa falhar de novo, eu canto até alguém desligar a tomada.', 'feliz'),
        say('Lia', 'Você cantou ontem. A caixa não foi o problema.', 'feliz'),
        narrate('Tomás riu e marcou uma música de Ravi Maré, cantor fictício de quem os dois gostavam. A turma tinha ensaiado um pequeno vídeo inspirado na canção.'),
        say('Tomás', 'Minha irmã vai vir ver. Quero que ela escute essa antes de ir embora.', 'feliz'),
        think('Faltam dois dias. Se a gente acertar o volume, vai dar certo.'),
        narrate('No intervalo, Lia pegou o celular para confirmar o horário do ensaio. Uma recomendação de vídeo ocupou a tela.'),
      ],
      next: 'recomendacao',
    },
    recomendacao: {
      act: 'Ato 2 · Uma chamada pela metade',
      setting: 'Celular · intervalo',
      background: 'digital',
      entries: [
        narrate('A miniatura mostrava Ravi em preto e branco. O título dizia: “ADEUS, RAVI MARÉ? FÃS NÃO ACREDITAM”. Um emoji de vela completava a imagem.'),
        narrate('O vídeo vinha de um canal de comentários sobre música, não do perfil do artista. Lia ainda não tinha aberto o conteúdo.'),
        think('Tomás vai ver isso. Se for sério, talvez eu devesse avisar.', 'surpreso'),
        decide('O que Lia faz antes de levar a notícia ao grupo?', [
          { id: 'abrir', label: 'Assistir ao vídeo antes de comentar', to: 'video_aberto', effects: { watchedVideo: true } },
          { id: 'perfil', label: 'Procurar o perfil oficial de Ravi por conta própria', to: 'perfil_oficial', effects: { checkedOfficial: true } },
          { id: 'repassar', label: 'Enviar a miniatura ao grupo para perguntar se alguém sabe', to: 'print_enviado', effects: { sharedRumor: true } },
        ]),
      ],
    },
    video_aberto: {
      act: 'Ato 2 · Uma chamada pela metade',
      setting: 'Celular · intervalo',
      background: 'digital',
      entries: [
        narrate('Lia abriu o vídeo. Depois de uma longa introdução dramática, o apresentador explicou que Ravi havia cancelado um show para descansar a voz.'),
        narrate('O “adeus” era ao palco daquele mês. Não havia notícia de morte. A miniatura, porém, podia contar outra história para quem só passasse os olhos.'),
        say('Lia', 'Três minutos para dizer que ele vai descansar. A capa fez parecer outra coisa.', 'pensativo'),
        think('Melhor guardar o vídeo completo antes de falar com o Tomás.'),
      ],
      next: 'grupo',
    },
    perfil_oficial: {
      act: 'Ato 2 · Uma chamada pela metade',
      setting: 'Celular · intervalo',
      background: 'digital',
      entries: [
        narrate('Lia saiu da recomendação e abriu o perfil que Ravi usava para divulgar os shows. Uma postagem daquele dia explicava a pausa por orientação médica para a voz.'),
        narrate('A agenda do evento também anunciava o cancelamento da apresentação. Nenhuma das duas fontes falava em morte.'),
        say('Lia', 'Ele está bem. A apresentação é que não vai acontecer.', 'normal'),
        think('Agora preciso entender de onde veio aquela chamada.'),
      ],
      next: 'grupo',
    },
    print_enviado: {
      act: 'Ato 2 · Uma chamada pela metade',
      setting: 'Grupo da turma · intervalo',
      background: 'digital',
      entries: [
        say('Lia', 'Gente, viram essa capa? Aconteceu alguma coisa com o Ravi?', 'surpreso'),
        narrate('Ela enviou a miniatura sem o endereço do vídeo. Alguém respondeu “acho que ele morreu”; outra pessoa repassou a imagem para uma turma vizinha.'),
        say('Tomás', 'Lia, isso é verdade? Minha irmã acabou de me perguntar.', 'surpreso'),
        think('Eu mandei como pergunta. Na tela de quem recebeu, pareceu uma notícia.', 'constrangido'),
      ],
      next: 'grupo',
    },
    grupo: {
      act: 'Ato 3 · A mensagem muda de forma',
      setting: 'Grupo da turma · intervalo',
      background: 'digital',
      entries: [
        narrate('Quando Lia voltou ao grupo, a frase já era “Ravi Maré morreu”. A interrogação da miniatura desaparecera no caminho.'),
        narrate('O print que Lia tinha enviado aparecia acima das primeiras respostas de tristeza.', { var: 'sharedRumor', equals: true }),
        narrate('O print havia chegado por outra turma. Lia reconheceu a capa que tinha visto minutos antes.', { var: 'sharedRumor', equals: false }),
        say('Tomás', 'O pessoal quer trocar o vídeo da feira por uma homenagem. Eu nem consegui terminar de ler.', 'triste'),
        narrate('Lia abriu a publicação original e a postagem do artista. O vídeo falava de uma pausa nos shows; o aviso do próprio Ravi confirmava o motivo.'),
        think('O que eu vi inteiro não é o que está circulando.'),
      ],
      next: 'resposta_grupo',
    },
    resposta_grupo: {
      act: 'Ato 3 · A mensagem muda de forma',
      setting: 'Grupo da turma · intervalo',
      background: 'digital',
      entries: [
        decide('Como Lia responde à turma depois de conferir?', [
          { id: 'contexto', label: 'Explicar a pausa nos shows e indicar as duas publicações', to: 'resposta_contexto', effects: { explainedSource: true } },
          { id: 'curto', label: 'Escrever apenas “é mentira, ele está vivo”', to: 'resposta_curta', effects: { terseReply: true } },
          { id: 'privado', label: 'Conversar primeiro com Tomás e deixar o grupo para depois', to: 'resposta_privada', effects: { supportedFriend: true } },
        ]),
      ],
    },
    resposta_contexto: {
      act: 'Ato 3 · A mensagem muda de forma',
      setting: 'Grupo da turma · intervalo',
      background: 'digital',
      entries: [
        say('Lia', 'Conferi o vídeo inteiro e o aviso no perfil de Ravi. Ele cancelou um show para descansar a voz. A capa dá outra impressão; estão aqui as publicações.'),
        narrate('Duas pessoas abriram os links e corrigiram as próprias mensagens. A conversa não parou de imediato, mas agora havia algo concreto para consultar.'),
        say('Tomás', 'Obrigado. Eu só tinha recebido o print.', 'aliviado'),
      ],
      next: 'alcance_correcao',
    },
    resposta_curta: {
      act: 'Ato 3 · A mensagem muda de forma',
      setting: 'Grupo da turma · intervalo',
      background: 'digital',
      entries: [
        say('Lia', 'É mentira, ele está vivo.', 'normal'),
        narrate('Vieram respostas rápidas: “quem disse?”, “tem link?” e “mas a capa está em todo lugar”. Lia tinha conferido, mas sua mensagem não mostrava como.'),
        think('Eu esperava que acreditassem em mim. Eles só viram outra frase solta.'),
      ],
      next: 'alcance_correcao',
    },
    resposta_privada: {
      act: 'Ato 3 · A mensagem muda de forma',
      setting: 'Corredor da escola · intervalo',
      background: 'corridor',
      entries: [
        say('Lia', 'Tomás, vi o vídeo e o aviso do Ravi. Ele só vai parar de cantar por um tempo.'),
        say('Tomás', 'Ainda bem. Eu estava pensando na minha irmã lendo aquilo sozinha.', 'aliviado'),
        narrate('Os dois ficaram alguns minutos conversando. No grupo maior, o print continuou a circular sem a explicação.'),
        think('Falar com ele ajudou. Ainda tem gente vendo só a capa.'),
      ],
      next: 'alcance_correcao',
    },
    alcance_correcao: {
      act: 'Ato 3 · A mensagem muda de forma', setting: 'Corredor da escola · intervalo', background: 'corridor',
      entries: [
        narrate('Uma colega contou que a imagem já estava no grupo da turma vizinha. Lá, ninguém tinha visto a publicação de Ravi.'),
        think('A explicação no nosso grupo talvez não chegue à mesma velocidade que o print.'),
        decide('Como Lia tenta levar a correção além da própria turma?', [
          { id: 'vizinha', label: 'Enviar as publicações completas à representante da turma vizinha', to: 'correcao_vizinha', effects: { reachedOtherClass: true } },
          { id: 'professora', label: 'Pedir à professora Nádia que ajude a avisar as outras salas', to: 'correcao_professora', effects: { askedTeacherToShare: true } },
          { id: 'depois', label: 'Esperar o ensaio para decidir como falar do assunto', to: 'correcao_adiada', effects: {} },
        ]),
      ],
    },
    correcao_vizinha: {
      act: 'Ato 3 · A mensagem muda de forma', setting: 'Celular · intervalo', background: 'digital',
      entries: [
        say('Lia', 'O vídeo fala de um show cancelado. Aqui estão ele inteiro e o aviso do Ravi; você pode levar os dois junto com a correção?', 'normal'),
        narrate('A representante respondeu que mostraria as publicações à turma. Lia não podia saber quem já tinha repassado a imagem, mas a resposta começava a seguir o mesmo caminho.'),
      ], next: 'ensaio',
    },
    correcao_professora: {
      act: 'Ato 3 · A mensagem muda de forma', setting: 'Corredor da escola · intervalo', background: 'corridor',
      entries: [
        say('Professora Nádia', 'Posso avisar os professores das outras salas. Me mostra o vídeo e a publicação original?', 'pensativo'),
        narrate('Lia abriu as duas fontes. Nádia levou o esclarecimento à sala dos professores antes de começar o ensaio.'),
      ], next: 'ensaio',
    },
    correcao_adiada: {
      act: 'Ato 3 · A mensagem muda de forma', setting: 'Corredor da escola · intervalo', background: 'corridor',
      entries: [
        narrate('Lia guardou os links para o ensaio. Enquanto isso, outra pessoa perguntou no corredor se a apresentação de sexta seria uma homenagem.'),
        think('Ainda dá para explicar. Quanto mais o print viaja, mais gente precisa ouvir a resposta.'),
      ], next: 'ensaio',
    },
    ensaio: {
      act: 'Ato 4 · O microfone está aberto',
      setting: 'Rádio da escola · tarde',
      background: 'radio',
      entries: [
        narrate('À tarde, o ensaio da rádio começou atrasado. Alguém havia riscado o nome de Ravi da lista e escrito “homenagem” ao lado. O teste do microfone saía pelos alto-falantes do pátio.'),
        say('Professora Nádia', 'A turma comentou esse assunto na minha aula. Vocês conseguiram confirmar o que houve?', 'pensativo'),
        say('Lia', 'Sim. O show foi cancelado por causa da voz. A notícia de morte nasceu da capa e das mensagens que vieram depois.', 'pensativo'),
        narrate('A professora pediu que não transformassem o boato em anúncio. O microfone estava pronto; também poderia ajudar a explicar a confusão.'),
        decide('O que Lia faz no ensaio da rádio?', [
          { id: 'explicar', label: 'Explicar a confusão sem expor quem compartilhou', to: 'radio_explica', effects: { publicCorrection: true } },
          { id: 'seguir', label: 'Manter a programação e deixar a conversa no grupo', to: 'radio_segue', effects: {} },
        ]),
      ],
    },
    radio_explica: {
      act: 'Ato 4 · O microfone está aberto',
      setting: 'Rádio da escola · tarde',
      background: 'radio',
      entries: [
        say('Lia', 'Antes da música: a capa de um vídeo fez muita gente pensar que Ravi Maré morreu. O vídeo completo e o aviso dele falam de uma pausa nos shows. Confiram a publicação inteira antes de repassar.'),
        narrate('Ela não citou nomes nem leu mensagens da turma em voz alta. Tomás recolocou a música na lista.'),
        say('Tomás', 'A gente pode tocar essa na sexta, então.'),
      ],
      next: 'preparo_feira',
    },
    radio_segue: {
      act: 'Ato 4 · O microfone está aberto',
      setting: 'Rádio da escola · tarde',
      background: 'radio',
      entries: [
        narrate('Lia testou o volume e seguiu com a lista de músicas. Tomás recolocou Ravi na programação. A professora avisou a turma dela sobre o erro, mas outras salas ainda tinham recebido só o print.'),
        say('Tomás', 'Não precisamos falar disso no microfone. Mas talvez falte responder no grupo.', 'pensativo'),
        think('A programação saiu. A conversa continua em outro lugar.'),
      ],
      next: 'preparo_feira',
    },
    preparo_feira: {
      act: 'Ato 4 · O microfone está aberto', setting: 'Rádio da escola · tarde', background: 'radio',
      entries: [
        say('Tomás', 'Na sexta, ainda podem perguntar sobre aquela capa. O que deixamos pronto para responder?', 'pensativo'),
        decide('Como Lia e Tomás preparam a explicação para a feira?', [
          { id: 'fontes', label: 'Anotar os endereços das publicações para mostrar a quem perguntar', to: 'fontes_anotadas', effects: { preparedSourceCard: true } },
          { id: 'fala', label: 'Ensaiar uma explicação curta para a rádio', to: 'fala_ensaiada', effects: { rehearsedExplanation: true } },
        ]),
      ],
    },
    fontes_anotadas: {
      act: 'Ato 4 · O microfone está aberto', setting: 'Rádio da escola · tarde', background: 'radio',
      entries: [
        narrate('Lia anotou o perfil do artista e o vídeo completo numa folha ao lado da lista de músicas.'),
        say('Tomás', 'Se vier outra pergunta, mostramos onde conferimos.', 'normal'),
      ], next: 'depois',
    },
    fala_ensaiada: {
      act: 'Ato 4 · O microfone está aberto', setting: 'Rádio da escola · tarde', background: 'radio',
      entries: [
        say('Lia', 'A capa sugeria uma coisa; o vídeo completo e o aviso do Ravi dizem que ele só vai pausar os shows.', 'normal'),
        say('Tomás', 'Cabe entre duas músicas. E se pedirem, a gente abre as publicações.', 'feliz'),
      ], next: 'depois',
    },
    depois: {
      act: 'Ato 5 · O que se faz depois',
      setting: 'Corredor da escola · fim da tarde',
      background: 'corridor',
      entries: [
        narrate('No fim do ensaio, Lia encontrou Tomás guardando os cabos. O grupo ainda tinha mensagens novas; algumas pessoas já sabiam da correção, outras tinham visto só a capa.'),
        say('Tomás', 'Minha irmã viu a explicação. Ela perguntou como a mesma imagem virou duas notícias diferentes.', 'pensativo'),
        think('No começo havia um título insinuando. Depois, cada pessoa tirou um pedaço da pergunta.'),
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
        narrate('Lia procurou a primeira mensagem que tinha enviado. O print estava ali, com a pergunta que muita gente já não lembrava.'),
        decide('O que Lia faz com sua mensagem original?', [
          { id: 'assumir', label: 'Dizer que enviou sem conferir e publicar a correção com as fontes', to: 'reparo', effects: { apologized: true, explainedSource: true } },
          { id: 'apagar', label: 'Apagar o print e evitar voltar ao assunto', to: 'apagou', effects: {} },
        ]),
      ],
    },
    reparo: {
      act: 'Ato 5 · O que se faz depois',
      setting: 'Grupo da turma · fim da tarde',
      background: 'digital',
      entries: [
        say('Lia', 'Eu mandei a capa sem abrir o vídeo. Desculpem. O aviso do Ravi e o vídeo completo explicam a pausa nos shows. Se vocês repassaram o print, mandem a correção também.', 'constrangido'),
        narrate('Uma colega respondeu que tinha enviado a imagem a outra turma e voltou lá com o esclarecimento. Lia não sabia até onde o print tinha chegado, mas podia responder onde alcançasse.'),
        say('Tomás', 'Valeu por falar. Eu teria feito a mesma pergunta se tivesse visto primeiro.', 'aliviado'),
      ],
      next: 'fechamento',
    },
    apagou: {
      act: 'Ato 5 · O que se faz depois',
      setting: 'Grupo da turma · fim da tarde',
      background: 'digital',
      entries: [
        narrate('Lia apagou a mensagem. O print desapareceu da tela dela; uma captura antiga continuava nas respostas.'),
        say('Tomás', 'Ainda perguntaram no outro grupo de onde saiu essa imagem.'),
        think('Tirar daqui não devolve a explicação a quem recebeu lá.', 'triste'),
      ],
      next: 'fechamento',
    },
    conversa_final: {
      act: 'Ato 5 · O que se faz depois',
      setting: 'Corredor da escola · fim da tarde',
      background: 'corridor',
      entries: [
        say('Tomás', 'Na sexta, a gente podia mostrar como a frase mudou antes de tocar a música. Sem expor ninguém.', 'pensativo'),
        decide('O que Lia propõe para a feira?', [
          { id: 'guia', label: 'Criar com Tomás um exemplo de checagem para a turma', to: 'guia', effects: { preparedGuide: true } },
          { id: 'conversa', label: 'Conversar com os colegas e concluir a programação', to: 'apoio', effects: {} },
        ]),
      ],
    },
    guia: {
      act: 'Ato 5 · O que se faz depois',
      setting: 'Rádio da escola · fim da tarde',
      background: 'radio',
      entries: [
        narrate('Lia e Tomás escreveram três perguntas para a apresentação: “Quem publicou?”, “O que o conteúdo inteiro diz?” e “Há confirmação em outro lugar?”.'),
        say('Lia', 'A gente pode mostrar a capa, depois a frase que chegou ao grupo, e só então abrir a publicação completa.', 'feliz'),
        say('Tomás', 'E terminar com a música, do jeito que a gente tinha planejado.', 'feliz'),
      ],
      next: 'fechamento',
    },
    apoio: {
      act: 'Ato 5 · O que se faz depois',
      setting: 'Corredor da escola · fim da tarde',
      background: 'corridor',
      entries: [
        say('Lia', 'Vamos terminar o ensaio. Se alguém perguntar, mostramos as publicações e explicamos sem constranger ninguém.'),
        narrate('Tomás assentiu. Eles guardaram os cabos e escolheram uma forma simples de responder a quem ainda trouxesse o print.'),
        think('Nem toda conversa precisa virar um cartaz. Mas eu preciso saber explicar o que conferi.'),
      ],
      next: 'fechamento',
    },
    fechamento: {
      act: 'Ato 6 · A feira',
      setting: 'Escola do Farol · sexta-feira',
      background: 'school',
      entries: [
        narrate('Na sexta-feira, a feira começou com mesas tortas, cartazes feitos à mão e a caixa de som finalmente funcionando.'),
        narrate('Alguns alunos ainda tinham apenas a mensagem curta de Lia. Ela mostrou as publicações completas a quem perguntou.', { var: 'terseReply', equals: true }),
        narrate('A representante da turma vizinha contou que havia enviado as duas fontes junto da correção.', { var: 'reachedOtherClass', equals: true }),
        narrate('Nádia disse que outros professores já tinham explicado o cancelamento nas salas.', { var: 'askedTeacherToShare', equals: true }),
        narrate('Lia deixou a folha com os endereços das publicações ao lado do microfone, pronta para quem quisesse conferir.', { var: 'preparedSourceCard', equals: true }),
        narrate('Antes de ligar o microfone, Lia repetiu a explicação que havia ensaiado com Tomás.', { var: 'rehearsedExplanation', equals: true }),
        narrate('Tomás trouxe a irmã para ouvir a rádio. Ela já sabia que o show fora cancelado e queria entender por que tanta gente tinha pensado em outra coisa.'),
        narrate('Lia ouviu a primeira música começar. Lembrou de como uma interrogação havia desaparecido a cada repasse.'),
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
        narrate('No intervalo da feira, uma aluna mostrou a Lia o print que ainda circulava. A primeira mensagem já tinha sido apagada, mas a cópia havia chegado sem a explicação.'),
        narrate('Lia já tinha explicado no grupo. Nem todos, porém, tinham recebido aquela resposta junto com a imagem.', { var: 'explainedSource', equals: true }),
        narrate('Lia falara na rádio, mas o print tinha saído da escola sem esse aviso.', { all: [{ var: 'explainedSource', equals: false }, { var: 'publicCorrection', equals: true }] }),
        narrate('Lia havia respondido apenas a parte das pessoas envolvidas. Faltava dar uma fonte a quem recebera a imagem.', { all: [{ var: 'explainedSource', equals: false }, { var: 'publicCorrection', equals: false }] }),
        say('Lia', 'Eu vi essa capa antes de assistir ao vídeo. Ele não morreu; houve uma pausa nos shows. Posso te mostrar o aviso inteiro?', 'constrangido'),
        narrate('A aluna abriu o aviso. Lia entendeu que a correção também precisava chegar a quem só tinha visto a cópia.'),
        say('Tomás', 'Vamos tocar a música agora?', 'feliz'),
        think('Apagar não fez a informação voltar. Explicar ainda pode alcançar alguém.'),
      ],
      next: 'chapterEnd',
    },
    fim_reparacao: {
      act: 'Ato 6 · A feira',
      setting: 'Rádio da escola · sexta-feira',
      background: 'radio',
      entries: [
        narrate('Uma colega contou que havia enviado a correção para a turma vizinha. Outras pessoas ainda perguntavam, mas a resposta já não dependia só de Lia.'),
        say('Tomás', 'Minha irmã viu sua mensagem. Ela disse que você mostrou até onde tinha ido a informação errada.', 'aliviado'),
        think('Eu não consigo recolher cada print. Consigo voltar aos lugares em que falei.', 'normal'),
        narrate('Lia ajustou o volume enquanto a feira enchia o pátio. Quando a canção de Ravi começou, ninguém precisou chamá-la de homenagem.'),
      ],
      next: 'chapterEnd',
    },
    fim_guia: {
      act: 'Ato 6 · A feira',
      setting: 'Rádio da escola · sexta-feira',
      background: 'radio',
      entries: [
        narrate('Antes da música, Lia e Tomás mostraram a miniatura, a frase que o grupo tinha criado e o vídeo completo. A diferença entre as três versões coube numa folha.'),
        say('Tomás', 'Se a gente tivesse visto só a capa, teria escrito a mesma coisa.', 'pensativo'),
        say('Lia', 'Por isso a pergunta vem antes do compartilhamento: quem disse e onde está o conteúdo inteiro?', 'feliz'),
        narrate('A turma não saiu da feira imune a boatos. Saiu com um jeito concreto de parar e conferir a próxima mensagem.'),
      ],
      next: 'chapterEnd',
    },
    fim_cotidiano: {
      act: 'Ato 6 · A feira',
      setting: 'Rádio da escola · sexta-feira',
      background: 'radio',
      entries: [
        narrate('Tomás apresentou a música e comentou, com poucas palavras, que Ravi estava descansando a voz. Uma aluna perguntou onde ele tinha visto o aviso.'),
        say('Lia', 'No perfil em que ele divulga os shows. Também abrimos o vídeo inteiro. Eu te mostro depois da apresentação.', 'normal'),
        narrate('A conversa foi pequena, mas suficiente para aquela aluna voltar ao grupo com a publicação correta.'),
        think('Um título não é a história toda. A próxima mensagem também merece tempo.'),
      ],
      next: 'chapterEnd',
    },
  },
};

const say = (speaker, text, expression = null, when = null) => ({ type: 'line', mode: 'dialogue', speaker, text, expression, when });
const think = (text, expression = 'pensativo', when = null) => ({ type: 'line', mode: 'thought', speaker: 'André', text, expression, when });
const narrate = (text, when = null) => ({ type: 'line', mode: 'narration', speaker: null, text, expression: null, when });
const decide = (prompt, options) => ({ type: 'choice', prompt, options });

export const chapter01 = {
  id: 'chapter-01',
  number: 1,
  revision: '3',
  title: 'Três anos de preparação',
  protagonist: { id: 'andre', name: 'André' },
  context: 'Um concurso fictício na reta final de uma preparação de três anos.',
  firstSceneId: 'estudo',
  nextChapterId: 'chapter-02',
  initialVariables: {
    reorganizedStudy: false,
    askedGroup: false,
    checkedCard: false,
    calledOrganizer: false,
    sharedRumor: false,
    correctedGroup: false,
    helpedGroup: false,
    rested: false,
    practicedWeakPoint: false,
    followedGroup: false,
    helpedAtGate: false,
    settledAtGate: false,
    reportedScam: false,
    ignoredScam: false,
  },
  assets: {
    backgrounds: {
      study: 'backgrounds/study.webp',
      'study-day': 'backgrounds/study_day.webp',
      home: 'backgrounds/kitchen.webp',
      digital: 'backgrounds/digital_home.webp',
      morning: 'backgrounds/morning_way.webp',
      exam: 'backgrounds/exam_classroom.webp',
      after: 'backgrounds/home_afternoon.webp',
    },
    portraits: {
      normal: 'characters/andre/01_normal.png',
      feliz: 'characters/andre/02_feliz.png',
      triste: 'characters/andre/03_triste.png',
      surpreso: 'characters/andre/05_surpreso.png',
      constrangido: 'characters/andre/06_constrangido.png',
      pensativo: 'characters/andre/07_pensativo.png',
    },
    supportingPortraits: {
      Mãe: {
        normal: 'characters/mae/01_normal.png',
        feliz: 'characters/mae/02_feliz.png',
        triste: 'characters/mae/03_triste.png',
        surpreso: 'characters/mae/04_surpreso.png',
        pensativo: 'characters/mae/05_pensativo.png',
        aliviado: 'characters/mae/06_aliviado.png',
      },
      Luana: {
        normal: 'characters/luana/01_normal.png',
        feliz: 'characters/luana/02_feliz.png',
        triste: 'characters/luana/03_triste.png',
        surpreso: 'characters/luana/04_surpreso.png',
        pensativo: 'characters/luana/05_pensativo.png',
        aliviado: 'characters/luana/06_aliviado.png',
      },
    },
  },
  scenes: {
    estudo: {
      act: 'Ato 1 · A preparação',
      setting: 'Quarto de estudos · sexta-feira à noite',
      background: 'study',
      entries: [
        narrate('Três anos conciliando o balcão da papelaria e as noites de estudo chegavam ao fim: no domingo, André faria a prova para assistente administrativo de Aurora do Vale.'),
        think('Falta pouco. Só não posso perder o foco na véspera.'),
        say('André', 'Edital revisado e cartão de confirmação separado: Escola Municipal das Palmeiras, portões às 8h.', 'pensativo'),
        say('Mãe', 'Trouxe seu jantar, filho. Não esquece de descansar até domingo.', 'feliz'),
        say('André', 'Obrigado, mãe. Só vou conferir os avisos finais e já paro.', 'normal'),
      ],
      next: 'contagem',
    },
    contagem: {
      act: 'Ato 2 · A prova se aproxima',
      setting: 'Quarto de estudos · sexta-feira',
      background: 'study',
      entries: [
        narrate('André acompanhava grupos de candidatos para saber de avisos sobre o concurso.'),
        say('Luana', 'Salva o endereço do Portal do Candidato do Instituto Vereda nos favoritos. Grupo vira bagunça na véspera.', 'pensativo'),
        narrate('Logo depois de salvar a página oficial, uma notificação chamativa cobriu a tela.'),
      ],
      next: 'boato_banca',
    },
    boato_banca: {
      act: 'Ato 3 · O primeiro boato',
      setting: 'Celular · sexta-feira',
      background: 'digital',
      entries: [
        narrate('O perfil não oficial “Radar das Provas” anunciava: “BANCA ALTERADA. NOVO CONTEÚDO PARA DOMINGO”, sem número de edital nem link da organizadora.'),
        think('Três pessoas já encaminharam isso no grupo. Se for verdade, minha revisão inteira muda.', 'surpreso'),
        decide('O que André faz com a notícia sobre a banca?', [
          { id: 'grupo', label: 'Perguntar no grupo se alguém encontrou o comunicado oficial', to: 'banca_grupo', effects: { askedGroup: true } },
          { id: 'portal', label: 'Abrir o portal da organizadora pelo endereço oficial salvo', to: 'banca_portal', effects: {}, best: true },
          { id: 'revisar', label: 'Trocar o plano de revisão para a suposta nova banca', to: 'banca_revisao', effects: { reorganizedStudy: true } },
        ]),
      ],
    },
    banca_portal: {
      act: 'Ato 4 · Primeiras decisões',
      setting: 'Quarto de estudos · sexta-feira',
      background: 'study',
      entries: [
        narrate('André abriu o favorito. A página de avisos do Instituto Vereda continuava mostrando a mesma banca e o mesmo conteúdo.'),
        say('André', 'Era a arte antiga do edital com outra frase colada por cima.', 'pensativo'),
        say('Luana', 'Ainda bem que você conferiu na fonte oficial, e não no link da postagem.', 'aliviado'),
      ],
      next: 'revisao_sabado',
    },
    banca_grupo: {
      act: 'Ato 4 · Primeiras decisões',
      setting: 'Celular · sexta-feira',
      background: 'digital',
      entries: [
        say('André', 'Alguém achou essa mudança publicada no portal da organizadora?', 'pensativo'),
        narrate('Luana enviou o endereço oficial do Instituto Vereda; André abriu a página de avisos e conferiu.'),
        say('André', 'Conferi lá: não há mudança de banca nem de conteúdo.', 'normal'),
      ],
      next: 'revisao_sabado',
    },
    banca_revisao: {
      act: 'Ato 4 · Primeiras decisões',
      setting: 'Quarto de estudos · sexta-feira',
      background: 'study',
      entries: [
        narrate('André separou novos resumos e passou duas horas procurando provas da suposta nova banca.'),
        say('Mãe', 'Quem publicou essa mudança de banca, filho?', 'pensativo'),
        think('Eu mudei tudo sem nem verificar quem era o autor da postagem.', 'triste'),
        narrate('Quando abriu o portal oficial, viu que a organizadora continuava a mesma — mas as duas horas já tinham ido embora.'),
      ],
      next: 'revisao_sabado',
    },
    revisao_sabado: {
      act: 'Ato 4 · Isca digital no grupo',
      setting: 'Quarto de estudos · sábado',
      background: 'study-day',
      entries: [
        narrate('No sábado, André voltou ao plano original, tentando compensar a manhã perdida com o boato.', { var: 'reorganizedStudy', equals: true }),
        narrate('No sábado, André seguia o plano de estudos, mas o celular vibrava sem parar.', { var: 'reorganizedStudy', equals: false }),
        narrate('No grupo, alguém enviou o link “vereda-edital-urgente.xyz”, prometendo um “Resumo Secreto da Nova Banca” para quem cadastrasse nome e CPF.'),
        say('Luana', 'Olha o final desse endereço: “.xyz”. Estão usando o susto de ontem para coletar dados.', 'pensativo'),
        decide('O que André faz diante do link que pede CPF pelo suposto material?', [
          { id: 'grupo', label: 'Abrir o link para ver se existe algum comunicado anexado', to: 'grupo_acompanhado', effects: { followedGroup: true } },
          { id: 'questao', label: 'Identificar o domínio falso (.xyz), não clicar e alertar o grupo sobre o golpe', to: 'questao_refeita', effects: { practicedWeakPoint: true }, best: true },
        ]),
      ],
    },
    questao_refeita: {
      act: 'Ato 4 · Isca digital no grupo',
      setting: 'Quarto de estudos · sábado',
      background: 'study-day',
      entries: [
        say('André', 'Pessoal, a banca não usa domínio “.xyz” nem pede CPF fora do Portal do Candidato. Esse link é isca para roubar dados.', 'normal'),
        narrate('O alerta evitou que colegas entregassem seus dados e permitiu que André revisasse o edital em paz até as 18h.'),
      ],
      next: 'boato_local',
    },
    grupo_acompanhado: {
      act: 'Ato 4 · Isca digital no grupo',
      setting: 'Quarto de estudos · sábado',
      background: 'study-day',
      entries: [
        narrate('André abriu a página e viu um contador falso exigindo CPF e telefone. Fechou a aba sem preencher nada, mas perdeu tempo precioso de revisão.'),
        say('André', 'Era só uma página caça-cliques se aproveitando do nervosismo do grupo.', 'triste'),
      ],
      next: 'boato_local',
    },
    boato_local: {
      act: 'Ato 4 · O segundo boato',
      setting: 'Celular · sábado',
      background: 'digital',
      entries: [
        narrate('Às 18h, chegou um print: “LOCAL DE PROVA ALTERADO. CANDIDATOS DEVEM IR AO CENTRO CÍVICO. Compartilhe agora”. Um adesivo vermelho cobria a origem da imagem.'),
        think('Se eu aparecer no prédio errado amanhã, três anos acabam no portão fechado.', 'surpreso'),
        say('Luana', 'Meu cartão continua mostrando a Escola das Palmeiras. O seu mudou?'),
        decide('Como André resolve a dúvida sobre o local?', [
          { id: 'compartilhar', label: 'Repassar o print ao grupo enquanto reorganiza o trajeto', to: 'local_compartilhado', effects: { sharedRumor: true } },
          { id: 'telefone', label: 'Buscar o contato oficial no edital e tentar confirmar com a banca', to: 'local_telefone', effects: { checkedCard: true, calledOrganizer: true } },
          { id: 'cartao', label: 'Conferir o próprio Cartão de Confirmação no Portal do Candidato', to: 'local_cartao', effects: { checkedCard: true }, best: true },
        ]),
      ],
    },
    local_cartao: {
      act: 'Ato 4 · A decisão sobre o local',
      setting: 'Quarto de estudos · sábado',
      background: 'study',
      entries: [
        narrate('Pelo endereço oficial salvo, André abriu seu Cartão de Confirmação: Escola Municipal das Palmeiras, portões às 8h, sem nenhuma retificação.'),
        say('André', 'O print esconde a fonte com um adesivo. Vou seguir o meu cartão oficial.', 'normal'),
      ],
      next: 'apoio_grupo',
    },
    local_telefone: {
      act: 'Ato 4 · A decisão sobre o local',
      setting: 'Quarto de estudos · sábado',
      background: 'study',
      entries: [
        narrate('André consultou o número do próprio edital, e não o do print. O atendimento telefônico já havia encerrado, mas o Portal do Candidato confirmava a Escola das Palmeiras.'),
        think('O telefone não atendeu, mas o documento oficial no portal responde sem deixar dúvida.', 'pensativo'),
      ],
      next: 'apoio_grupo',
    },
    local_compartilhado: {
      act: 'Ato 4 · A decisão sobre o local',
      setting: 'Celular · sábado',
      background: 'digital',
      entries: [
        say('André', 'Gente, viram isso? Estão dizendo que mudou para o Centro Cívico!', 'surpreso'),
        narrate('Em minutos, candidatos já trocavam linhas de ônibus. Só então André conferiu o próprio cartão no portal oficial: o local continuava na Escola das Palmeiras.'),
        say('Luana', 'André, o print era montagem, mas o grupo acreditou porque você encaminhou.', 'triste'),
      ],
      next: 'reparar_grupo',
    },
    reparar_grupo: {
      act: 'Ato 5 · O que fica no grupo',
      setting: 'Celular · sábado',
      background: 'digital',
      entries: [
        think('Fui eu que espalhei no impulso. Muita gente já está mudando o caminho de amanhã.', 'constrangido'),
        decide('O que André faz depois de conferir o cartão oficial?', [
          { id: 'corrigir', label: 'Corrigir a mensagem no grupo e indicar o portal da organizadora', to: 'correcao', effects: { checkedCard: true, correctedGroup: true }, best: true },
          { id: 'apagar', label: 'Apagar o print em silêncio e guardar a confirmação para si', to: 'silencio', effects: { checkedCard: true } },
        ]),
      ],
    },
    correcao: {
      act: 'Ato 5 · O que fica no grupo',
      setting: 'Celular · sábado',
      background: 'digital',
      entries: [
        say('André', 'Conferi meu cartão no Portal do Candidato: a prova continua na Escola das Palmeiras. O print que mandei não tem fonte oficial; desculpem a confusão.', 'constrangido'),
        narrate('Com o desmentido de André, outros candidatos abriram os próprios cartões e apagaram o print que haviam repassado.'),
      ],
      next: 'ultima_noite',
    },
    silencio: {
      act: 'Ato 5 · O que fica no grupo',
      setting: 'Celular · sábado',
      background: 'digital',
      entries: [
        narrate('André apagou a própria mensagem, mas o print continuou circulando nas respostas de outros candidatos sobre o Centro Cívico.'),
        think('Sumiu da minha tela, mas quem viu antes continua com a informação errada.', 'constrangido'),
      ],
      next: 'ultima_noite',
    },
    apoio_grupo: {
      act: 'Ato 5 · O que fica no grupo',
      setting: 'Celular · sábado',
      background: 'digital',
      entries: [
        say('Luana', 'Ainda tem gente no grupo assustada com o print do Centro Cívico. Como respondemos?'),
        decide('Como André age diante da dúvida dos colegas no grupo?', [
          { id: 'descansar', label: 'Deixar Luana responder e voltar aos preparativos', to: 'grupo_luana', effects: {} },
          { id: 'orientar', label: 'Explicar por que o print é suspeito e enviar o caminho do portal oficial', to: 'grupo_orientado', effects: { helpedGroup: true }, best: true },
        ]),
      ],
    },
    grupo_orientado: {
      act: 'Ato 5 · O que fica no grupo',
      setting: 'Celular · sábado',
      background: 'digital',
      entries: [
        say('André', 'Não usem prints sem fonte. Entrem pelo endereço da organizadora que consta no edital e abram o Cartão de Confirmação individual.', 'normal'),
        narrate('Os candidatos conferiram os próprios cartões no site oficial e viram que nenhum indicava o Centro Cívico.'),
      ],
      next: 'ultima_noite',
    },
    grupo_luana: {
      act: 'Ato 5 · O que fica no grupo',
      setting: 'Quarto de estudos · sábado',
      background: 'study',
      entries: [
        say('André', 'Pode mandar o caminho lá, Luana. Vou separar meus documentos para amanhã.', 'normal'),
        narrate('Luana publicou o link oficial no grupo enquanto André deixava o cartão e o documento prontos na mesa.'),
      ],
      next: 'ultima_noite',
    },
    ultima_noite: {
      act: 'Ato 5 · Corrente na madrugada',
      setting: 'Quarto de estudos · madrugada',
      background: 'study',
      entries: [
        narrate('À meia-noite, chegou ao grupo um áudio marcado como “Encaminhada com frequência”, dizendo em tom de pânico que os portões fechariam às 7h.'),
        say('Mãe', 'Mais um alerta sem autor a essa hora, filho? O horário oficial já está no seu cartão.', 'pensativo'),
        decide('Como André reage ao áudio alarmista sem fonte na véspera da prova?', [
          { id: 'dormir', label: 'Reconhecer o padrão de corrente falsa, silenciar o grupo e dormir', to: 'sono', effects: { rested: true }, best: true },
          { id: 'rolar', label: 'Continuar acordado procurando nas redes se o áudio tem fundamento', to: 'vigilia', effects: { rested: false } },
        ]),
      ],
    },
    sono: {
      act: 'Ato 5 · Corrente na madrugada',
      setting: 'Quarto de estudos · madrugada',
      background: 'study',
      entries: [
        say('André', 'Áudio reencaminhado sem fonte e pedindo pressa é corrente falsa. Vou confiar no cartão oficial e dormir.', 'normal'),
        narrate('André guardou o celular e conseguiu descansar até o despertador tocar.'),
      ],
      next: 'entrada_escola',
    },
    vigilia: {
      act: 'Ato 5 · Corrente na madrugada',
      setting: 'Quarto de estudos · madrugada',
      background: 'study',
      entries: [
        narrate('André passou horas lendo discussões repetidas sobre o áudio. Nenhuma nota saiu da organizadora, e sobraram poucas horas de sono.'),
        say('André', 'Deixei um áudio anônimo roubar meu descanso na noite mais importante.', 'triste'),
      ],
      next: 'entrada_escola',
    },
    entrada_escola: {
      act: 'Ato 5 · O dia da prova',
      setting: 'Escola das Palmeiras · manhã',
      background: 'morning',
      entries: [
        narrate('Na manhã de domingo, André chegou à Escola das Palmeiras sentindo o peso da noite mal dormida, mas com o cartão oficial na mão.', { var: 'rested', equals: false }),
        narrate('Na manhã de domingo, André chegou descansado e com antecedência à Escola das Palmeiras.', { var: 'rested', equals: true }),
        narrate('Na fila do portão, uma candidata aflita olhava no celular o print falso do Centro Cívico sem saber se estava no local certo.'),
        decide('O que André faz antes de entrar na escola?', [
          { id: 'entrar', label: 'Entrar direto para localizar a sala enquanto Luana orienta a candidata', to: 'entrada_calma', effects: { settledAtGate: true } },
          { id: 'ajudar', label: 'Mostrar como abrir o cartão oficial no Portal do Candidato para confirmar o local', to: 'entrada_ajuda', effects: { helpedAtGate: true }, best: true },
        ]),
      ],
    },
    entrada_ajuda: {
      act: 'Ato 5 · O dia da prova',
      setting: 'Escola das Palmeiras · manhã',
      background: 'morning',
      entries: [
        say('André', 'Esse print é falso. Abra o Portal do Candidato pelo endereço do edital; o local oficial é o que consta no seu cartão.', 'normal'),
        narrate('A candidata conferiu o documento oficial, agradeceu aliviada e entrou no prédio junto com André.'),
      ],
      next: 'prova',
    },
    entrada_calma: {
      act: 'Ato 5 · O dia da prova',
      setting: 'Escola das Palmeiras · manhã',
      background: 'morning',
      entries: [
        narrate('André localizou sua sala com calma, enquanto Luana ajudava a candidata na fila a conferir o próprio cartão.'),
        think('Ela recebeu ajuda para checar a fonte, e eu posso focar na prova.'),
      ],
      next: 'prova',
    },
    prova: {
      act: 'Ato 6 · Golpe pós-prova',
      setting: 'Escola das Palmeiras · saída',
      background: 'exam',
      entries: [
        narrate('André fez a prova com segurança no conteúdo do edital, livre da isca que tentara desviar sua revisão.', { var: 'practicedWeakPoint', equals: true }),
        narrate('André concluiu a prova precisando redobrar o foco após o tempo perdido com links suspeitos na véspera.', { var: 'followedGroup', equals: true }),
        narrate('Na saída do exame, circulava no grupo uma nova montagem: “PROVA ANULADA! Pague R$ 25 via PIX para enviar o recurso obrigatório ainda hoje”.'),
        decide('Como André reage à montagem que cobra PIX por um suposto recurso obrigatório?', [
          { id: 'denunciar_golpe', label: 'Alertar o grupo de que recursos oficiais são gratuitos no portal da banca e denunciar a montagem', to: 'golpe_denunciado', effects: { reportedScam: true }, best: true },
          { id: 'ignorar_golpe', label: 'Reconhecer o golpe financeiro, fechar o grupo e aguardar o cronograma oficial do edital', to: 'golpe_ignorado', effects: { ignoredScam: true } },
        ]),
      ],
    },
    golpe_denunciado: {
      act: 'Ato 6 · Golpe pós-prova',
      setting: 'Escola das Palmeiras · saída',
      background: 'exam',
      entries: [
        say('André', 'Pessoal, é golpe de PIX. Qualquer comunicado ou recurso oficial é gratuito e segue o calendário do Instituto Vereda.', 'normal'),
        narrate('O alerta imediato impediu que candidatos exaustos caíssem na fraude financeira logo após a prova.'),
      ],
      next: {
        routes: [
          { when: { all: [{ var: 'sharedRumor', equals: true }, { var: 'correctedGroup', equals: false }] }, to: 'fim_silencio' },
          { when: { all: [{ var: 'reorganizedStudy', equals: true }, { var: 'rested', equals: false }] }, to: 'fim_cansaco' },
          { when: { var: 'correctedGroup', equals: true }, to: 'fim_correcao' },
        ],
        default: 'fim_tranquilo',
      },
    },
    golpe_ignorado: {
      act: 'Ato 6 · Golpe pós-prova',
      setting: 'Escola das Palmeiras · saída',
      background: 'exam',
      entries: [
        narrate('André identificou na hora a armadilha financeira que explorava o cansaço pós-prova e fechou a conversa sem clicar.'),
        think('Da véspera até a saída do portão, todo golpe tenta usar a pressa contra quem não consulta o edital.'),
      ],
      next: {
        routes: [
          { when: { all: [{ var: 'sharedRumor', equals: true }, { var: 'correctedGroup', equals: false }] }, to: 'fim_silencio' },
          { when: { all: [{ var: 'reorganizedStudy', equals: true }, { var: 'rested', equals: false }] }, to: 'fim_cansaco' },
          { when: { var: 'correctedGroup', equals: true }, to: 'fim_correcao' },
        ],
        default: 'fim_tranquilo',
      },
    },
    fim_silencio: {
      act: 'Ato 6 · Depois da prova',
      setting: 'Casa · tarde',
      background: 'after',
      entries: [
        narrate('No ônibus de volta, André viu relatos de candidatos que deram viagem perdida ao Centro Cívico por causa do print que ele havia repassado e apagado sem desmentir.'),
        think('Apagar a minha mensagem não apagou o desvio que ela causou nos outros.', 'triste'),
        say('André', 'Pessoal, desculpem não ter avisado ontem: o local certo estava apenas no cartão oficial de cada um.', 'constrangido'),
        say('Mãe', 'Que bom que você reconheceu isso, filho. Agora venha almoçar em paz.', 'normal'),
      ],
      next: 'chapterEnd',
    },
    fim_cansaco: {
      act: 'Ato 6 · Depois da prova',
      setting: 'Casa · tarde',
      background: 'after',
      entries: [
        narrate('Em casa, o cansaço de ter mudado a revisão e perdido o sono com boatos pesava nos ombros de André.'),
        say('André', 'Cheguei lá, mãe, mas gastei energia demais correndo atrás de postagens sem fonte quando tudo já estava no edital.', 'triste'),
        say('Mãe', 'Você fez a prova e aprendeu a filtrar esse barulho. Agora é hora de descansar.', 'aliviado'),
      ],
      next: 'chapterEnd',
    },
    fim_correcao: {
      act: 'Ato 6 · Depois da prova',
      setting: 'Casa · tarde',
      background: 'after',
      entries: [
        narrate('Ao chegar em casa, André recebeu mensagem de Luana: “Meu primo viu sua correção antes de pegar o ônibus errado. Obrigada por voltar lá e explicar”.'),
        think('Eu devia ter conferido antes de compartilhar, mas assumir o erro e mostrar a fonte oficial protegeu outras pessoas.', 'normal'),
        say('Mãe', 'Ter responsabilidade pelo que a gente repassa também faz parte da sua conquista, filho.', 'feliz'),
      ],
      next: 'chapterEnd',
    },
    fim_tranquilo: {
      act: 'Ato 6 · Depois da prova',
      setting: 'Casa · tarde',
      background: 'after',
      entries: [
        narrate('Em casa, André encontrou uma mensagem de Luana comemorando que ambos fizeram a prova sem cair nos boatos da véspera.'),
        narrate('No portão, a candidata a quem mostrara como checar o cartão oficial também havia conseguido entrar a tempo.', { var: 'helpedAtGate', equals: true }),
        narrate('Ter conferido apenas os canais oficiais permitiu que ele chegasse à sala com tranquilidade.', { var: 'settledAtGate', equals: true }),
        say('André', 'Verificar cada informação na fonte oficial protegeu três anos de estudo.', 'feliz'),
        say('Mãe', 'E garantiu o nosso almoço de domingo em paz.', 'feliz'),
      ],
      next: 'chapterEnd',
    },
  },
};

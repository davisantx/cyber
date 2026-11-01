const say = (speaker, text, expression = null, when = null) => ({ type: 'line', mode: 'dialogue', speaker, text, expression, when });
const think = (text, expression = 'pensativo', when = null) => ({ type: 'line', mode: 'thought', speaker: 'Nina', text, expression, when });
const narrate = (text, when = null) => ({ type: 'line', mode: 'narration', speaker: null, text, expression: null, when });
const decide = (prompt, options) => ({ type: 'choice', prompt, options });

export const chapter03 = {
  id: 'chapter-03',
  number: 3,
  revision: '2',
  title: 'Quem viu meu perfil?',
  protagonist: { id: 'nina', name: 'Nina' },
  context: 'Um aplicativo que promete revelar visitantes do perfil pede acesso à conta e às mensagens.',
  firstSceneId: 'saida_feira',
  nextChapterId: null,
  initialVariables: {
    checkedPublisher: false,
    askedLia: false,
    openedAd: false,
    gavePassword: false,
    rejectedApp: false,
    warnedGroup: false,
    warnedLia: false,
    deletedMessage: false,
    securedAccount: false,
    helpedFriend: false,
    readPermissions: false,
    checkedVitraHelp: false,
    followedCountdown: false,
    tracedLink: false,
    warnedOtherGroup: false,
  },
  assets: {
    backgrounds: {
      school: 'backgrounds/school_courtyard.webp',
      corridor: 'backgrounds/school_corridor.webp',
      digital: 'backgrounds/digital_school.webp',
      'digital-night': 'backgrounds/digital_nina_night.webp',
      after: 'backgrounds/school_gate.webp',
    },
    portraits: {
      normal: 'characters/nina/01_normal.png',
      feliz: 'characters/nina/02_feliz.png',
      triste: 'characters/nina/03_triste.png',
      surpreso: 'characters/nina/05_surpresa.png',
      constrangido: 'characters/nina/06_constrangida.png',
      pensativo: 'characters/nina/07_pensativa.png',
    },
    supportingPortraits: {
      Lia: {
        normal: 'characters/lia/01_normal.png',
        feliz: 'characters/lia/02_feliz.png',
        triste: 'characters/lia/03_triste.png',
        surpreso: 'characters/lia/05_surpresa.png',
        pensativo: 'characters/lia/07_pensativa.png',
      },
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
      },
    },
  },
  scenes: {
    saida_feira: {
      act: 'Ato 1 · Depois da feira', setting: 'Escola do Farol · sexta-feira', background: 'school',
      entries: [
        narrate('A feira cultural terminava. Nina guardou os cartazes da turma enquanto Lia e Tomás recolhiam os cabos da rádio.'),
        narrate('Ela tinha publicado uma foto do mural naquela manhã. Ainda esperava que uma amiga de outra escola visse o convite antes de a feira acabar.'),
        say('Tomás', 'Seu cartaz ficou na entrada. Deve ter passado muita gente por lá.', 'feliz'),
        say('Nina', 'Na foto, eu só consigo ver as curtidas. Queria saber quem chegou a olhar.', 'pensativo'),
        narrate('Ao abrir a rede social fictícia Vitra, apareceu um anúncio: “Descubra quem visitou seu perfil hoje. Resultado em um minuto”.'),
        think('Parece feito para a minha pergunta.', 'surpreso'),
      ], next: 'anuncio',
    },
    anuncio: {
      act: 'Ato 2 · A promessa', setting: 'Celular · corredor da escola', background: 'digital',
      entries: [
        narrate('A propaganda usava cores parecidas com as da Vitra. O nome do anunciante, porém, era “Espelho Social”, e o endereço levava a outro site.'),
        decide('O que Nina faz antes de decidir se usa o aplicativo?', [
          { id: 'origem', label: 'Conferir quem publicou e para onde o anúncio leva', to: 'olhou_origem', effects: { checkedPublisher: true } },
          { id: 'lia', label: 'Mostrar a promessa a Lia e pedir uma segunda opinião', to: 'ouviu_lia', effects: { askedLia: true } },
          { id: 'abrir', label: 'Abrir o anúncio para ver o que ele oferece', to: 'abriu_anuncio', effects: { openedAd: true } },
        ]),
      ],
    },
    olhou_origem: {
      act: 'Ato 2 · A promessa', setting: 'Celular · corredor da escola', background: 'digital',
      entries: [
        narrate('Nina tocou no nome do anunciante. A página não mostrava vínculo com a Vitra, nem explicava como obteria a suposta lista de visitantes.'),
        think('Se eles sabem tanto sobre meu perfil, por que precisam que eu entre com a senha?', 'pensativo'),
      ], next: 'sinais_site',
    },
    ouviu_lia: {
      act: 'Ato 2 · A promessa', setting: 'Corredor da escola · sexta-feira', background: 'corridor',
      entries: [
        say('Lia', 'O anúncio parece da Vitra, mas o endereço não é o mesmo. O que ele pede para funcionar?', 'pensativo'),
        say('Nina', 'Vou ler a tela antes de tocar em qualquer campo.', 'normal'),
      ], next: 'sinais_site',
    },
    abriu_anuncio: {
      act: 'Ato 2 · A promessa', setting: 'Celular · corredor da escola', background: 'digital',
      entries: [
        narrate('Nina abriu a página. Uma animação de retratos girou por alguns segundos e parou sobre um botão: “Liberar resultado”.'),
        think('A lista está sempre quase pronta. Ainda não vi nenhuma explicação.', 'pensativo'),
      ], next: 'sinais_site',
    },
    sinais_site: {
      act: 'Ato 2 · A promessa', setting: 'Celular · corredor da escola', background: 'digital',
      entries: [
        narrate('Antes do botão final, havia um texto pequeno sobre acesso à conta e um contador que pressionava Nina a continuar.'),
        decide('O que Nina confere antes de decidir sobre o acesso?', [
          { id: 'permissoes', label: 'Ler quais dados o site quer usar', to: 'leu_permissoes', effects: { readPermissions: true } },
          { id: 'ajuda', label: 'Abrir a ajuda da Vitra pelo aplicativo oficial', to: 'ajuda_vitra', effects: { checkedVitraHelp: true } },
          { id: 'contador', label: 'Seguir para o resultado antes de o contador acabar', to: 'seguiu_contador', effects: { followedCountdown: true } },
        ]),
      ],
    },
    leu_permissoes: {
      act: 'Ato 2 · A promessa', setting: 'Celular · corredor da escola', background: 'digital',
      entries: [
        narrate('O texto citava contatos e mensagens, mas não explicava por que seriam necessários para mostrar visitantes.'),
        think('A lista é a promessa; meus dados são o que ele pede de verdade.'),
      ], next: 'pedido_acesso',
    },
    ajuda_vitra: {
      act: 'Ato 2 · A promessa', setting: 'Celular · corredor da escola', background: 'digital',
      entries: [
        narrate('Nina abriu a ajuda dentro da Vitra. Não havia uma função para listar visitantes do perfil nem indicação do Espelho Social como parceiro.'),
        say('Nina', 'Se fosse um recurso da Vitra, eu encontraria alguma explicação aqui.', 'pensativo'),
      ], next: 'pedido_acesso',
    },
    seguiu_contador: {
      act: 'Ato 2 · A promessa', setting: 'Celular · corredor da escola', background: 'digital',
      entries: [
        narrate('Nina avançou. O contador recomeçou na tela seguinte, como se a oferta fosse expirar outra vez.'),
        think('Ele quer que eu tenha pressa. Ainda posso parar e ler o que aparece.'),
      ], next: 'pedido_acesso',
    },
    pedido_acesso: {
      act: 'Ato 3 · O preço da curiosidade', setting: 'Celular · corredor da escola', background: 'digital',
      entries: [
        narrate('A tela seguinte pedia usuário e senha da Vitra. Abaixo, em letras menores: acesso a contatos, mensagens e publicações.'),
        narrate('Um contador dizia que o resultado expiraria em dois minutos. Nina podia sair da página sem perder a própria conta.'),
        say('Nina', 'Para mostrar uma lista, ele quer ler minhas conversas?', 'surpreso'),
        decide('Como Nina responde ao pedido de acesso?', [
          { id: 'fechar', label: 'Fechar a página sem digitar a senha', to: 'pagina_fechada', effects: { rejectedApp: true } },
          { id: 'entrar', label: 'Digitar a senha para tentar ver a lista', to: 'senha_digitada', effects: { gavePassword: true } },
          { id: 'negar', label: 'Negar as permissões extras e sair da página', to: 'permissoes_negadas', effects: { rejectedApp: true } },
        ]),
      ],
    },
    pagina_fechada: {
      act: 'Ato 3 · O preço da curiosidade', setting: 'Corredor da escola · sexta-feira', background: 'corridor',
      entries: [
        narrate('Nina fechou a página antes de preencher qualquer campo. O contador sumiu junto com a promessa.'),
        think('A curiosidade continua. Minha senha pode ficar comigo.', 'normal'),
      ], next: 'mensagem_grupo',
    },
    permissoes_negadas: {
      act: 'Ato 3 · O preço da curiosidade', setting: 'Celular · corredor da escola', background: 'digital',
      entries: [
        narrate('Nina negou o acesso a contatos e mensagens. O aplicativo insistiu que sem essas permissões não mostraria nada.'),
        say('Nina', 'Então não vou instalar. Não preciso entregar minhas conversas para matar uma dúvida.', 'pensativo'),
      ], next: 'mensagem_grupo',
    },
    senha_digitada: {
      act: 'Ato 3 · O preço da curiosidade', setting: 'Celular · corredor da escola', background: 'digital',
      entries: [
        narrate('Nina digitou a senha. A página girou mais uma vez e exibiu nomes borrados, mas nenhum resultado verificável.'),
        narrate('Ela fechou a janela. Um aviso de novo acesso apareceu no aplicativo original da Vitra minutos depois.'),
        think('Eu digitei a senha em outro site. O aviso pode estar ligado a isso.', 'constrangido'),
      ], next: 'mensagem_grupo',
    },
    mensagem_grupo: {
      act: 'Ato 4 · A mensagem que chegou', setting: 'Grupo da turma · fim da feira', background: 'digital',
      entries: [
        narrate('O grupo recebeu uma mensagem enviada pelo perfil de Nina: “Veja quem andou olhando você também”, seguida do mesmo endereço.', { var: 'gavePassword', equals: true }),
        narrate('O grupo recebeu a mesma propaganda, agora encaminhada pelo perfil de um colega. Nina reconheceu a página que acabara de fechar.', { var: 'gavePassword', equals: false }),
        say('Tomás', 'Isso chegou para a minha irmã. Ela perguntou se a lista mostra mesmo quem entrou no perfil.', 'surpreso'),
        say('Nina', 'O site pediu senha e acesso a mensagens. A lista não apareceu para mim.', 'triste', { var: 'gavePassword', equals: true }),
        say('Nina', 'Eu vi o anúncio. Ele queria senha e acesso a mensagens antes de mostrar qualquer lista.', 'pensativo', { var: 'gavePassword', equals: false }),
        say('Lia', 'Precisamos avisar de onde veio esse link. Quem recebeu pode achar que foi uma recomendação sua.', 'pensativo'),
        decide('Como Nina avisa as pessoas que receberam o endereço?', [
          { id: 'grupo', label: 'Explicar no grupo o que o site pediu e pedir que não usem o link', to: 'aviso_grupo', effects: { warnedGroup: true } },
          { id: 'lia', label: 'Contar a Lia em particular para pensar no que fazer', to: 'aviso_lia', effects: { warnedLia: true } },
          { id: 'apagar', label: 'Apagar a mensagem da própria tela e esperar a conversa passar', to: 'mensagem_apagada', effects: { deletedMessage: true } },
        ]),
      ],
    },
    aviso_grupo: {
      act: 'Ato 4 · A mensagem que chegou', setting: 'Grupo da turma · fim da feira', background: 'digital',
      entries: [
        say('Nina', 'Esse endereço é de outro site. Ele pede a senha da Vitra e acesso às mensagens; não consegui confirmar a lista que promete. Não abram por minha causa.', 'pensativo'),
        narrate('Alguns colegas agradeceram. Uma captura do link já tinha ido para outro grupo, então Nina pediu que levassem o aviso junto.'),
      ], next: 'alcance_link',
    },
    aviso_lia: {
      act: 'Ato 4 · A mensagem que chegou', setting: 'Corredor da escola · fim da feira', background: 'corridor',
      entries: [
        say('Nina', 'Quero entender se minha conta foi usada. Você fica comigo enquanto eu confiro?', 'triste', { var: 'gavePassword', equals: true }),
        say('Nina', 'O link chegou pelo perfil de outra pessoa. Vamos ajudar sem expor esse colega?', 'pensativo', { var: 'gavePassword', equals: false }),
        say('Lia', 'Fico. Depois avisamos também quem está no grupo.', 'feliz'),
      ], next: 'alcance_link',
    },
    mensagem_apagada: {
      act: 'Ato 4 · A mensagem que chegou', setting: 'Grupo da turma · fim da feira', background: 'digital',
      entries: [
        narrate('Nina apagou a mensagem da própria conversa. Uma captura ainda aparecia nas respostas de outros colegas.'),
        think('Sumiu da minha tela, mas eles ainda estão vendo o endereço.', 'triste'),
      ], next: 'alcance_link',
    },
    alcance_link: {
      act: 'Ato 4 · A mensagem que chegou', setting: 'Grupo da turma · fim da feira', background: 'digital',
      entries: [
        narrate('Tomás mostrou outra captura: a mesma mensagem havia chegado ao grupo da irmã. Ela queria saber se podia confiar no endereço.'),
        decide('Como Nina lida com essa nova cópia do link?', [
          { id: 'origem', label: 'Perguntar a quem recebeu de qual perfil saiu a mensagem', to: 'rastreou_link', effects: { tracedLink: true } },
          { id: 'aviso', label: 'Enviar um aviso à turma da irmã de Tomás com o que o site pede', to: 'avisou_outra_turma', effects: { warnedOtherGroup: true } },
          { id: 'esperar', label: 'Guardar a captura e cuidar primeiro da conversa atual', to: 'guardou_captura', effects: {} },
        ]),
      ],
    },
    rastreou_link: {
      act: 'Ato 4 · A mensagem que chegou', setting: 'Grupo da turma · fim da feira', background: 'digital',
      entries: [
        narrate('A irmã de Tomás conferiu o remetente e respondeu. A captura vinha do perfil que já tinha enviado o link ao grupo da turma.'),
        think('Agora sabemos por onde essa cópia passou. Ainda precisamos avisar quem a recebeu.'),
      ], next: 'passo_seguinte',
    },
    avisou_outra_turma: {
      act: 'Ato 4 · A mensagem que chegou', setting: 'Grupo da turma · fim da feira', background: 'digital',
      entries: [
        say('Nina', 'Esse endereço é de outro site. Ele pede senha e acesso a mensagens antes de mostrar qualquer lista. Não digitem dados lá.', 'normal'),
        narrate('Tomás encaminhou o aviso à irmã, que o publicou ao lado da captura original.'),
      ], next: 'passo_seguinte',
    },
    guardou_captura: {
      act: 'Ato 4 · A mensagem que chegou', setting: 'Corredor da escola · fim da feira', background: 'corridor',
      entries: [
        narrate('Nina guardou a captura e voltou ao próprio aplicativo. A irmã de Tomás ainda esperava uma resposta sobre o link.'),
        think('Preciso resolver minha conta, se ela foi usada. Depois, essa conversa também vai precisar de contexto.'),
      ], next: 'passo_seguinte',
    },
    passo_seguinte: {
      act: 'Ato 5 · Retomar o controle', setting: 'Celular · fim da feira', background: 'digital',
      entries: [
        narrate('Nina abriu a Vitra pelo aplicativo que já usava. O aviso de acesso desconhecido continuava lá.', { var: 'gavePassword', equals: true }),
        narrate('Nina conferiu a própria conta pelo aplicativo que já usava. Não havia aviso de novo acesso.', { var: 'gavePassword', equals: false }),
        say('Professora Nádia', 'Se o link saiu de alguma conta, vale cuidar dela e avisar quem recebeu. Posso ajudar vocês a falar com a turma.', 'pensativo'),
      ],
      next: {
        routes: [{ when: { var: 'gavePassword', equals: true }, to: 'escolha_recuperacao' }],
        default: 'escolha_apoio',
      },
    },
    escolha_recuperacao: {
      act: 'Ato 5 · Retomar o controle', setting: 'Celular · fim da feira', background: 'digital',
      entries: [
        decide('O que Nina faz depois de digitar a senha no outro site?', [
          { id: 'proteger', label: 'Trocar a senha pelo aplicativo oficial, encerrar sessões e avisar quem recebeu o link', to: 'conta_protegida', effects: { securedAccount: true, warnedGroup: true } },
          { id: 'so_apagar', label: 'Apagar o link e deixar a troca de senha para depois', to: 'conta_pendente', effects: {} },
        ]),
      ],
    },
    conta_protegida: {
      act: 'Ato 5 · Retomar o controle', setting: 'Celular · fim da feira', background: 'digital',
      entries: [
        narrate('Pelo aplicativo original, Nina mudou a senha, encerrou as sessões que não reconhecia e ativou uma confirmação adicional de acesso.'),
        say('Nina', 'Se uma mensagem minha trouxe aquele link, não fui eu que recomendei. Já protegi a conta; por favor, não repassem.', 'normal'),
        say('Lia', 'Eu mostro o aviso à turma que recebeu a captura.', 'feliz'),
      ], next: 'fechamento',
    },
    conta_pendente: {
      act: 'Ato 5 · Retomar o controle', setting: 'Celular · fim da feira', background: 'digital',
      entries: [
        narrate('Nina retirou o endereço da conversa, mas o aviso de acesso desconhecido continuava aberto. Outras cópias do link ainda circulavam.'),
        think('Apagar a mensagem não muda a senha que eu digitei lá.', 'triste'),
      ], next: 'fechamento',
    },
    escolha_apoio: {
      act: 'Ato 5 · Retomar o controle', setting: 'Escola do Farol · fim da feira', background: 'school',
      entries: [
        decide('Como Nina pode ajudar sem ter entregado sua própria senha?', [
          { id: 'ajudar', label: 'Ajudar o colega a conferir a conta e levar o aviso aos outros grupos', to: 'colega_ajudado', effects: { helpedFriend: true, warnedGroup: true } },
          { id: 'conversar', label: 'Conversar com Lia e responder a quem perguntar', to: 'conversa_pequena', effects: {} },
        ]),
      ],
    },
    colega_ajudado: {
      act: 'Ato 5 · Retomar o controle', setting: 'Escola do Farol · fim da feira', background: 'school',
      entries: [
        narrate('Com Nádia por perto, o colega abriu as configurações do próprio aplicativo. Ele percebeu um acesso que não reconhecia e começou a proteger a conta.'),
        say('Nina', 'A captura saiu do seu perfil, mas a gente pode explicar o que o site pediu sem colocar a culpa em você.', 'feliz'),
        narrate('O aviso chegou a mais um grupo com a origem do link e um pedido para não digitarem senhas naquela página.'),
      ], next: 'fechamento',
    },
    conversa_pequena: {
      act: 'Ato 5 · Retomar o controle', setting: 'Corredor da escola · fim da feira', background: 'corridor',
      entries: [
        say('Lia', 'Se alguém trouxer a captura depois, mostramos que o anúncio leva a outro endereço.', 'pensativo'),
        say('Nina', 'E explicamos o que ele pede antes de prometer qualquer resultado.', 'normal'),
      ], next: 'fechamento',
    },
    fechamento: {
      act: 'Ato 6 · O que ficou', setting: 'Escola do Farol · fim da tarde', background: 'after',
      entries: [
        narrate('A feira terminou, mas o anúncio continuou aparecendo em outras telas. Nina sabia agora reconhecer a promessa e o pedido escondido atrás dela.'),
        narrate('O aviso de Nina alcançou pessoas que tinham recebido o link como se fosse recomendação de um amigo.', { var: 'warnedGroup', equals: true }),
        narrate('Ler as permissões deixou claro por que uma lista de visitantes não justificava acesso às conversas.', { var: 'readPermissions', equals: true }),
        narrate('A ajuda da Vitra não apresentava aquela função; Nina tinha uma referência oficial para mostrar a quem perguntasse.', { var: 'checkedVitraHelp', equals: true }),
        narrate('O contador tinha recomeçado quando ela avançou. A urgência fazia parte da página, não da necessidade de Nina.', { var: 'followedCountdown', equals: true }),
        narrate('A origem da captura estava identificada; faltava levar o aviso a quem tinha recebido aquela cópia.', { all: [{ var: 'tracedLink', equals: true }, { var: 'warnedOtherGroup', equals: false }] }),
        narrate('A irmã de Tomás recebeu o aviso junto da captura e pôde responder no próprio grupo.', { var: 'warnedOtherGroup', equals: true }),
        narrate('Nina ainda precisaria contar ao grupo o que havia descoberto; falar só com uma pessoa não alcançava todas as cópias.', { all: [{ var: 'warnedGroup', equals: false }, { var: 'warnedLia', equals: true }] }),
        narrate('Na conversa, o silêncio deixou a captura circular sem contexto por mais tempo.', { var: 'deletedMessage', equals: true }),
      ],
      next: {
        routes: [
          { when: { all: [{ var: 'gavePassword', equals: true }, { var: 'securedAccount', equals: false }] }, to: 'fim_pendente' },
          { when: { var: 'securedAccount', equals: true }, to: 'fim_recuperacao' },
          { when: { var: 'helpedFriend', equals: true }, to: 'fim_apoio' },
        ],
        default: 'fim_atencao',
      },
    },
    fim_pendente: {
      act: 'Ato 6 · O que ficou', setting: 'Celular · noite', background: 'digital-night',
      entries: [
        narrate('Em casa, Nina viu outro aviso de acesso. Não tinha certeza de quem estava usando a conta; sabia que precisava voltar às configurações oficiais.'),
        say('Nina', 'A primeira coisa amanhã é proteger a conta e contar às pessoas que receberam o link.', 'pensativo'),
        narrate('A conversa ainda podia ser corrigida. A senha, porém, continuava exigindo uma ação concreta.'),
      ], next: 'chapterEnd',
    },
    fim_recuperacao: {
      act: 'Ato 6 · O que ficou', setting: 'Celular · noite', background: 'digital-night',
      entries: [
        narrate('Nina conferiu novamente as sessões da conta. Não havia outro acesso desconhecido depois da troca de senha, embora ela continuasse atenta.'),
        say('Tomás', 'Minha irmã viu seu aviso antes de abrir. Obrigado por explicar.', 'aliviado'),
        think('Eu não pude desfazer o que digitei. Pude proteger a conta e avisar quem recebeu a mensagem.', 'normal'),
      ], next: 'chapterEnd',
    },
    fim_apoio: {
      act: 'Ato 6 · O que ficou', setting: 'Portão da escola · fim da tarde', background: 'after',
      entries: [
        narrate('Quando a escola fechou, o colega já tinha encontrado ajuda para proteger a conta. O aviso seguia com a captura para outros grupos.'),
        say('Professora Nádia', 'Vocês olharam o pedido de acesso e ajudaram quem recebeu a mensagem. Isso muda o caminho do link.', 'feliz'),
        think('Uma promessa curiosa virou uma pergunta concreta: o que esse site quer de mim?', 'feliz'),
      ], next: 'chapterEnd',
    },
    fim_atencao: {
      act: 'Ato 6 · O que ficou', setting: 'Portão da escola · fim da tarde', background: 'after',
      entries: [
        narrate('Nina voltou à foto do mural. Ainda não sabia exatamente quem tinha passado pelo perfil, e já não precisava daquela lista para conversar com a amiga.'),
        say('Lia', 'Se ela não viu o convite, você pode mandar a foto diretamente.', 'feliz'),
        say('Nina', 'Vou fazer isso. Sem entregar minhas mensagens para um aplicativo desconhecido.', 'feliz'),
      ], next: 'chapterEnd',
    },
  },
};

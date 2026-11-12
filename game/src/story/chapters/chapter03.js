const say = (speaker, text, expression = null, when = null) => ({ type: 'line', mode: 'dialogue', speaker, text, expression, when });
const think = (text, expression = 'pensativo', when = null) => ({ type: 'line', mode: 'thought', speaker: 'Nina', text, expression, when });
const narrate = (text, when = null) => ({ type: 'line', mode: 'narration', speaker: null, text, expression: null, when });
const decide = (prompt, options) => ({ type: 'choice', prompt, options });

export const chapter03 = {
  id: 'chapter-03',
  number: 3,
  revision: '3',
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
    enabledTwoFactor: false,
    warnedFakeSupport: false,
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
      act: 'Ato 1 · Depois da feira',
      setting: 'Escola do Farol · sexta-feira',
      background: 'school',
      entries: [
        narrate('No fim da feira cultural, Nina olhava a foto do mural que publicara na rede social fictícia Vitra, curiosa para saber se uma amiga de outra escola tinha visto o convite.'),
        say('Nina', 'Na foto eu só vejo as curtidas. Queria saber quem chegou a visitar meu perfil hoje.', 'pensativo'),
        narrate('Logo abaixo, surgiu um anúncio: “Descubra quem visitou seu perfil hoje. Resultado em um minuto”.'),
      ],
      next: 'anuncio',
    },
    anuncio: {
      act: 'Ato 2 · A promessa',
      setting: 'Celular · corredor da escola',
      background: 'digital',
      entries: [
        narrate('A propaganda imitava as cores da Vitra, mas o anunciante era “Espelho Social” e o link apontava para um site externo desconhecido.'),
        decide('O que Nina faz antes de decidir se usa o aplicativo?', [
          { id: 'abrir', label: 'Abrir o anúncio imediatamente para ver a lista prometida', to: 'abriu_anuncio', effects: { openedAd: true } },
          { id: 'origem', label: 'Conferir quem publicou o anúncio e para qual endereço (URL) ele redireciona', to: 'olhou_origem', effects: { checkedPublisher: true }, best: true },
          { id: 'lia', label: 'Mostrar a promessa a Lia e pedir uma segunda opinião', to: 'ouviu_lia', effects: { askedLia: true } },
        ]),
      ],
    },
    olhou_origem: {
      act: 'Ato 2 · A promessa',
      setting: 'Celular · corredor da escola',
      background: 'digital',
      entries: [
        narrate('Nina tocou no nome do anunciante: a página não tinha vínculo com a Vitra e redirecionava para um domínio estranho fora da rede.'),
        think('Usam as cores da Vitra para parecer oficial, mas o endereço mostra que é outro site.', 'pensativo'),
      ],
      next: 'sinais_site',
    },
    ouviu_lia: {
      act: 'Ato 2 · A promessa',
      setting: 'Corredor da escola · sexta-feira',
      background: 'corridor',
      entries: [
        say('Lia', 'O anúncio imita a Vitra, mas o endereço é externo. Vamos ver o que essa página pede antes de tocar em qualquer campo.', 'pensativo'),
        say('Nina', 'Boa ideia. Promessa fácil demais costuma esconder armadilha.', 'normal'),
      ],
      next: 'sinais_site',
    },
    abriu_anuncio: {
      act: 'Ato 2 · A promessa',
      setting: 'Celular · corredor da escola',
      background: 'digital',
      entries: [
        narrate('Nina abriu a página. Uma animação de retratos borrados girou por segundos e parou sobre o botão “Liberar resultado”.'),
        think('A lista parece quase pronta, mas até agora não explicaram como teriam esses dados.', 'pensativo'),
      ],
      next: 'sinais_site',
    },
    sinais_site: {
      act: 'Ato 2 · Pistas da armadilha',
      setting: 'Celular · corredor da escola',
      background: 'digital',
      entries: [
        narrate('Antes do botão final, havia letras miúdas sobre permissões de conta e um relógio regressivo pressionando Nina a continuar.'),
        decide('O que Nina confere antes de decidir sobre o acesso?', [
          { id: 'contador', label: 'Seguir rápido para o resultado antes de o contador zerar', to: 'seguiu_contador', effects: { followedCountdown: true } },
          { id: 'ajuda', label: 'Consultar a Central de Ajuda no aplicativo oficial da Vitra', to: 'ajuda_vitra', effects: { checkedVitraHelp: true } },
          { id: 'permissoes', label: 'Ler nas letras miúdas quais dados e permissões o site exige', to: 'leu_permissoes', effects: { readPermissions: true }, best: true },
        ]),
      ],
    },
    leu_permissoes: {
      act: 'Ato 2 · Pistas da armadilha',
      setting: 'Celular · corredor da escola',
      background: 'digital',
      entries: [
        narrate('As letras miúdas pediam autorização para ler contatos, mensagens privadas e publicar pelo perfil.'),
        think('A lista de visitantes é só a isca; o que o site quer de verdade são meus dados e minhas conversas.'),
      ],
      next: 'pedido_acesso',
    },
    ajuda_vitra: {
      act: 'Ato 2 · Pistas da armadilha',
      setting: 'Celular · corredor da escola',
      background: 'digital',
      entries: [
        narrate('Na Central de Ajuda oficial da Vitra, um aviso alertava que a rede não mostra visitantes do perfil e que sites com essa promessa buscam roubar senhas.'),
        say('Nina', 'A própria Vitra confirma que essa função não existe.', 'pensativo'),
      ],
      next: 'pedido_acesso',
    },
    seguiu_contador: {
      act: 'Ato 2 · Pistas da armadilha',
      setting: 'Celular · corredor da escola',
      background: 'digital',
      entries: [
        narrate('Nina avançou, e o contador simplesmente recomeçou do início na tela seguinte para simular urgência.'),
        think('O relógio é um gatilho de pressa para que eu não pare para ler o que estão pedindo.'),
      ],
      next: 'pedido_acesso',
    },
    pedido_acesso: {
      act: 'Ato 3 · O preço da curiosidade',
      setting: 'Celular · corredor da escola',
      background: 'digital',
      entries: [
        narrate('A tela seguinte exibia um formulário falso pedindo usuário e senha da Vitra, além de acesso a contatos, mensagens e publicações.'),
        say('Nina', 'Para mostrar uma lista, um site desconhecido pede minha senha e acesso às minhas conversas?', 'surpreso'),
        decide('Como Nina responde ao pedido de acesso?', [
          { id: 'entrar', label: 'Digitar a senha para tentar ver a lista prometida', to: 'senha_digitada', effects: { gavePassword: true } },
          { id: 'fechar', label: 'Fechar a página imediatamente sem digitar a senha', to: 'pagina_fechada', effects: { rejectedApp: true }, best: true },
          { id: 'negar', label: 'Negar as permissões abusivas de mensagens e contatos e sair da página', to: 'permissoes_negadas', effects: { rejectedApp: true } },
        ]),
      ],
    },
    pagina_fechada: {
      act: 'Ato 3 · O preço da curiosidade',
      setting: 'Corredor da escola · sexta-feira',
      background: 'corridor',
      entries: [
        narrate('Nina fechou a aba sem digitar nenhum dado. O falso contador desapareceu e sua conta permaneceu protegida.'),
        think('Nenhuma curiosidade vale entregar minha senha a um site de terceiros.', 'normal'),
      ],
      next: 'mensagem_grupo',
    },
    permissoes_negadas: {
      act: 'Ato 3 · O preço da curiosidade',
      setting: 'Celular · corredor da escola',
      background: 'digital',
      entries: [
        narrate('Ao negar o acesso a contatos e mensagens, o aplicativo bloqueou a tela e exigiu permissão total.'),
        say('Nina', 'Não preciso entregar minhas conversas privadas para matar uma curiosidade. Fechei na hora.', 'pensativo'),
      ],
      next: 'mensagem_grupo',
    },
    senha_digitada: {
      act: 'Ato 3 · O preço da curiosidade',
      setting: 'Celular · corredor da escola',
      background: 'digital',
      entries: [
        narrate('Nina digitou a senha. O site mostrou apenas nomes borrados sem resultado real e, minutos depois, o aplicativo oficial da Vitra alertou sobre um novo acesso desconhecido.'),
        think('Entreguei minha senha em uma página de phishing. Alguém acabou de entrar na minha conta.', 'constrangido'),
      ],
      next: 'mensagem_grupo',
    },
    mensagem_grupo: {
      act: 'Ato 4 · A mensagem que chegou',
      setting: 'Grupo da turma · fim da feira',
      background: 'digital',
      entries: [
        narrate('No grupo da turma, surgiu uma mensagem enviada automaticamente pelo perfil de Nina: “Veja quem andou olhando você também”, com o link falso.', { var: 'gavePassword', equals: true }),
        narrate('No grupo da turma, surgiu a mesma propaganda enviada automaticamente pelo perfil de um colega que caíra na armadilha.', { var: 'gavePassword', equals: false }),
        say('Tomás', 'Isso chegou para a minha irmã! Ela achou que era indicação real de amigo.', 'surpreso'),
        say('Lia', 'O golpe usa contas invadidas para espalhar o link como se fosse recomendação confiável.', 'pensativo'),
        decide('Como Nina avisa as pessoas que receberam o endereço?', [
          { id: 'apagar', label: 'Apagar a mensagem da própria tela e esperar o assunto passar', to: 'mensagem_apagada', effects: { deletedMessage: true } },
          { id: 'lia', label: 'Conversar primeiro com Lia em particular para decidir como agir', to: 'aviso_lia', effects: { warnedLia: true } },
          { id: 'grupo', label: 'Explicar no grupo que o site rouba senhas e pedir que ninguém toque no link', to: 'aviso_grupo', effects: { warnedGroup: true }, best: true },
        ]),
      ],
    },
    aviso_grupo: {
      act: 'Ato 4 · A mensagem que chegou',
      setting: 'Grupo da turma · fim da feira',
      background: 'digital',
      entries: [
        say('Nina', 'Não abram esse link! É um site falso que pede a senha da Vitra, acessa as mensagens e dispara spam automático.', 'pensativo'),
        narrate('Os colegas agradeceram o alerta e pararam de clicar na publicação.'),
      ],
      next: 'alcance_link',
    },
    aviso_lia: {
      act: 'Ato 4 · A mensagem que chegou',
      setting: 'Corredor da escola · fim da feira',
      background: 'corridor',
      entries: [
        say('Nina', 'Preciso conferir os acessos da minha conta agora mesmo. Você fica comigo?', 'triste', { var: 'gavePassword', equals: true }),
        say('Nina', 'O link saiu da conta de um colega. Vamos ajudar sem expor ele na frente da turma?', 'pensativo', { var: 'gavePassword', equals: false }),
        say('Lia', 'Claro. E logo depois avisamos os grupos para ninguém cair no link.', 'feliz'),
      ],
      next: 'alcance_link',
    },
    mensagem_apagada: {
      act: 'Ato 4 · A mensagem que chegou',
      setting: 'Grupo da turma · fim da feira',
      background: 'digital',
      entries: [
        narrate('Nina apagou a mensagem para si mesma, mas o link continuou ativo e visível na tela dos demais colegas.'),
        think('Sumiu só para mim; quem está no grupo continua exposto à armadilha.', 'triste'),
      ],
      next: 'alcance_link',
    },
    alcance_link: {
      act: 'Ato 4 · A mensagem que chegou',
      setting: 'Grupo da turma · fim da feira',
      background: 'digital',
      entries: [
        narrate('Tomás mostrou outra captura: o mesmo link malicioso já havia sido encaminhado ao grupo da turma da irmã dele.'),
        decide('Como Nina lida com essa nova cópia do link em outra turma?', [
          { id: 'origem', label: 'Identificar de qual perfil saiu a captura para avisar o dono da conta comprometida', to: 'rastreou_link', effects: { tracedLink: true } },
          { id: 'aviso', label: 'Enviar um alerta à turma da irmã de Tomás explicando o golpe de roubo de senha', to: 'avisou_outra_turma', effects: { warnedOtherGroup: true }, best: true },
          { id: 'esperar', label: 'Guardar a captura e cuidar primeiro apenas da conversa atual', to: 'guardou_captura', effects: {} },
        ]),
      ],
    },
    rastreou_link: {
      act: 'Ato 4 · A mensagem que chegou',
      setting: 'Grupo da turma · fim da feira',
      background: 'digital',
      entries: [
        narrate('Pela captura, Nina identificou o perfil que estava disparando o spam automático sem o dono perceber.'),
        think('Descobrir a conta comprometida permite estancar a origem dos disparos.'),
      ],
      next: 'passo_seguinte',
    },
    avisou_outra_turma: {
      act: 'Ato 4 · A mensagem que chegou',
      setting: 'Grupo da turma · fim da feira',
      background: 'digital',
      entries: [
        say('Nina', 'Avisem lá: esse endereço é phishing. Ele pede senha da Vitra e acesso às mensagens privadas; não digitem seus dados.', 'normal'),
        narrate('Tomás encaminhou o alerta à irmã, que publicou o aviso ao lado da captura no grupo dela.'),
      ],
      next: 'passo_seguinte',
    },
    guardou_captura: {
      act: 'Ato 4 · A mensagem que chegou',
      setting: 'Corredor da escola · fim da feira',
      background: 'corridor',
      entries: [
        narrate('Nina guardou a captura sem enviar o alerta naquele instante, deixando a outra turma sem aviso imediato.'),
        think('Enquanto o alerta demora, outros alunos podem confiar no link por vir de um conhecido.'),
      ],
      next: 'passo_seguinte',
    },
    passo_seguinte: {
      act: 'Ato 5 · Retomar o controle',
      setting: 'Celular · fim da feira',
      background: 'digital',
      entries: [
        narrate('No aplicativo oficial da Vitra, o aviso de login desconhecido continuava ativo na conta de Nina.', { var: 'gavePassword', equals: true }),
        narrate('A conta de Nina seguia intacta, mas o colega cujo perfil enviara o link precisava encerrar o acesso invasor.', { var: 'gavePassword', equals: false }),
        say('Professora Nádia', 'Quando uma senha vaza, é preciso agir nas configurações de segurança e alertar quem recebeu o link.', 'pensativo'),
      ],
      next: {
        routes: [{ when: { var: 'gavePassword', equals: true }, to: 'escolha_recuperacao' }],
        default: 'escolha_apoio',
      },
    },
    escolha_recuperacao: {
      act: 'Ato 5 · Retomar o controle',
      setting: 'Celular · fim da feira',
      background: 'digital',
      entries: [
        decide('O que Nina faz depois de ter digitado a senha no site falso?', [
          { id: 'proteger', label: 'Trocar a senha no app oficial, encerrar sessões desconhecidas e avisar quem recebeu o link', to: 'conta_protegida', effects: { securedAccount: true, warnedGroup: true }, best: true },
          { id: 'so_apagar', label: 'Apenas apagar o link do chat e deixar a troca de senha para depois', to: 'conta_pendente', effects: {} },
        ]),
      ],
    },
    conta_protegida: {
      act: 'Ato 5 · Retomar o controle',
      setting: 'Celular · fim da feira',
      background: 'digital',
      entries: [
        narrate('Pelo aplicativo oficial da Vitra, Nina trocou a senha, desconectou todas as sessões desconhecidas e revogou o acesso externo.'),
        say('Nina', 'Se receberam aquele link pelo meu perfil, foi disparo automático de golpe. Já recuperei a conta; não cliquem.', 'normal'),
      ],
      next: 'fechamento',
    },
    conta_pendente: {
      act: 'Ato 5 · Retomar o controle',
      setting: 'Celular · fim da feira',
      background: 'digital',
      entries: [
        narrate('Nina apagou a postagem no chat, mas o acesso invasor continuava conectado à conta dela com a senha antiga.'),
        think('Apagar a mensagem não impede que continuem usando meu perfil.', 'triste'),
      ],
      next: 'fechamento',
    },
    escolha_apoio: {
      act: 'Ato 5 · Retomar o controle',
      setting: 'Escola do Farol · fim da feira',
      background: 'school',
      entries: [
        decide('Como Nina ajuda diante do golpe sem ter entregado a própria senha?', [
          { id: 'conversar', label: 'Conversar apenas com Lia e responder somente a quem perguntar', to: 'conversa_pequena', effects: {} },
          { id: 'ajudar', label: 'Ajudar o colega a trocar a senha e encerrar sessões no app oficial, levando o alerta aos grupos', to: 'colega_ajudado', effects: { helpedFriend: true, warnedGroup: true }, best: true },
        ]),
      ],
    },
    colega_ajudado: {
      act: 'Ato 5 · Retomar o controle',
      setting: 'Escola do Farol · fim da feira',
      background: 'school',
      entries: [
        narrate('Com o apoio de Nina e da professora Nádia, o colega encerrou o acesso desconhecido, mudou a senha e enviou o alerta aos grupos sem passar por constrangimento.'),
        say('Nina', 'Explicamos como o golpe funciona sem culpar quem foi enganado pela página falsa.', 'feliz'),
      ],
      next: 'fechamento',
    },
    conversa_pequena: {
      act: 'Ato 5 · Retomar o controle',
      setting: 'Corredor da escola · fim da feira',
      background: 'corridor',
      entries: [
        say('Lia', 'Se alguém mostrar a captura depois, ensinamos a checar a URL externa.', 'pensativo'),
        say('Nina', 'E mostramos que nenhum aplicativo externo precisa ler nossas mensagens.', 'normal'),
      ],
      next: 'fechamento',
    },
    fechamento: {
      act: 'Ato 6 · Falso suporte e verificação em duas etapas',
      setting: 'Escola do Farol · fim da tarde',
      background: 'after',
      entries: [
        narrate('Logo em seguida, alguns alunos receberam mensagem privada de um perfil chamado “Suporte Vitra Oficial”, pedindo o código de 6 dígitos enviado por SMS para “cancelar a invasão”.'),
        say('Lia', 'Olha isso, Nina: agora os golpistas fingem ser o suporte da rede para roubar o código de verificação!', 'surpreso'),
        decide('O que Nina faz diante do perfil de “falso suporte” que pede o código de SMS?', [
          { id: 'alertar_turma_2fa', label: 'Avisar imediatamente no grupo que o suporte real jamais pede senha ou código de verificação por chat', to: 'turma_alertada_2fa', effects: { warnedFakeSupport: true } },
          { id: 'ativar_2fa', label: 'Nunca informar o código, denunciar o perfil impostor e ativar a verificação em duas etapas no app oficial', to: 'suporte_denunciado', effects: { enabledTwoFactor: true }, best: true },
        ]),
      ],
    },
    suporte_denunciado: {
      act: 'Ato 6 · Falso suporte e verificação em duas etapas',
      setting: 'Escola do Farol · fim da tarde',
      background: 'after',
      entries: [
        say('Nina', 'Código de segurança nunca se compartilha. Denunciei a conta falsa e ativei a verificação em duas etapas nas configurações oficiais.', 'normal'),
        narrate('Com a autenticação em duas etapas ativa e o impostor denunciado, as contas ganharam uma camada real de proteção.'),
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
    turma_alertada_2fa: {
      act: 'Ato 6 · Falso suporte e verificação em duas etapas',
      setting: 'Escola do Farol · fim da tarde',
      background: 'after',
      entries: [
        say('Nina', 'Pessoal, nenhuma plataforma pede código de SMS no chat! Esse “Suporte Vitra” é golpe para tomar a conta; bloqueiem e ativem a verificação em duas etapas.', 'normal'),
        narrate('O alerta rápido evitou que colegas entregassem o código de segurança aos golpistas.'),
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
      act: 'Ato 6 · O que ficou',
      setting: 'Celular · noite',
      background: 'digital-night',
      entries: [
        narrate('Em casa, Nina recebeu outro alerta de acesso suspeito: apagar o link do grupo sem trocar a senha deixara a conta vulnerável.'),
        say('Nina', 'Não dá para adiar. Vou trocar a senha no aplicativo oficial, encerrar todas as sessões e avisar quem recebeu o link.', 'pensativo'),
        narrate('Nina abriu as configurações de segurança para finalmente retomar o controle da conta.'),
      ],
      next: 'chapterEnd',
    },
    fim_recuperacao: {
      act: 'Ato 6 · O que ficou',
      setting: 'Celular · noite',
      background: 'digital-night',
      entries: [
        narrate('À noite, Nina conferiu as sessões da conta: após trocar a senha e ativar as proteções oficiais, nenhum acesso estranho voltou a acontecer.'),
        say('Tomás', 'Minha irmã viu seu alerta antes de clicar no link. Obrigado por explicar a armadilha, Nina.', 'aliviado'),
        think('Não pude desfazer o clique, mas agir rápido para recuperar a conta e avisar a turma protegeu todo mundo.', 'normal'),
      ],
      next: 'chapterEnd',
    },
    fim_apoio: {
      act: 'Ato 6 · O que ficou',
      setting: 'Portão da escola · fim da tarde',
      background: 'after',
      entries: [
        narrate('Quando a escola fechou, o colega já tinha recuperado a conta e o alerta contra o phishing e o falso suporte havia chegado aos outros grupos.'),
        say('Professora Nádia', 'Vocês analisaram as permissões, protegeram os acessos e ajudaram quem caiu no golpe sem julgamentos.', 'feliz'),
        think('Diante de qualquer promessa curiosa na rede, a pergunta certa é: que dados esse site está pedindo em troca?', 'feliz'),
      ],
      next: 'chapterEnd',
    },
    fim_atencao: {
      act: 'Ato 6 · O que ficou',
      setting: 'Portão da escola · fim da tarde',
      background: 'after',
      entries: [
        narrate('No portão da escola, Nina voltou à foto do mural sabendo reconhecer domínios falsos, contadores de urgência e pedidos abusivos de acesso.'),
        say('Lia', 'Se quiser saber se sua amiga viu o convite, manda mensagem direto para ela.', 'feliz'),
        say('Nina', 'Bem melhor do que entregar minha senha e minhas conversas para um site desconhecido.', 'feliz'),
      ],
      next: 'chapterEnd',
    },
  },
};

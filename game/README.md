# CYBER — Visual Novel

Jogo da ação de extensão **Bytes para a Cidadania — Cyber**, voltado a estudantes do Ensino Fundamental II. Há três capítulos jogáveis com protagonistas diferentes: André enfrenta boatos sobre um concurso fictício; Lia acompanha a propagação de uma notícia falsa no grupo da escola; Nina encontra um aplicativo que promete revelar visitantes do perfil. A tela inicial usa um cenário ilustrado e apresenta o estado da sessão salva.

## Executar

Requer Node.js 20.19+ e npm. Na pasta `game`:

```bash
npm install
npm run dev
```

Abra o endereço local indicado pelo Vite. Para validar:

```bash
npm test
npm run build
npm run preview
```

Para os testes de interface, instale o navegador uma vez e execute:

```bash
npx playwright install chromium
npm run test:e2e
```

Esse comando compila e testa a versão de produção com Playwright. Para usar o Chrome já instalado no Windows, execute `$env:PLAYWRIGHT_CHANNEL='chrome'` no PowerShell antes de `npm run test:e2e`. A integração contínua executa os testes de motor, compilação e interface a cada push e pull request.

O aplicativo usa arquivos locais e não faz chamadas a APIs. Execute por HTTP local; a abertura de módulos JavaScript por `file://` pode falhar. Não há service worker: para uso sem internet na escola, mantenha o servidor e os arquivos disponíveis na máquina ou rede local.

## Jogar

- **Novo Jogo** inicia o Capítulo 1. Se houver progresso válido, o menu confirma antes de substituí-lo ou permite escolher outro capítulo.
- **Continuar** restaura capítulo, cena, posição da fala, escolhas, variáveis e fase da transição. Fica desabilitado sem progresso válido.
- **Capítulos** (no menu inicial e no topo da tela durante a partida) permite pular diretamente para o início do Capítulo 1 (André), Capítulo 2 (Lia) ou Capítulo 3 (Nina).
- Clique em **COMPLETAR**, na caixa de texto ou no cenário para revelar a fala gradual; o clique seguinte avança. Enter, Espaço ou seta para a direita seguem a mesma regra quando o foco não está em outro controle.
- Escolhas são feitas pelos botões, com mouse ou teclado. O botão **MENU** e Escape retornam à tela inicial; o progresso é salvo a cada avanço.
- Use **Histórico** ou H/L para reler falas, **Auto** ou A para leitura automática e 1–3 para escolher alternativas. As setas para cima e para baixo também percorrem as escolhas. Em telas baixas, role a área de alternativas para ver todas as opções.
- As configurações oferecem velocidade do texto, redução de movimento e modos Padrão, Grande e Projetor.
- Depois dos encerramentos dos Capítulos 1 e 2, “Enquanto isso...” inicia automaticamente o capítulo seguinte. Abrir o seletor de capítulos pausa essa transição; fechá-lo reinicia seu tempo de apresentação. Partidas antigas compatíveis salvas na tela de espera podem iniciar o novo capítulo por um botão.

## Conteúdo atual

**Capítulo 1 — Três anos de preparação:** André trabalha, estuda e se prepara para a prova de assistente administrativo de Aurora do Vale. Postagens não oficiais sobre a banca e o local da prova exploram o nervosismo da véspera. Seis decisões mudam suas conversas, a revisão, o descanso, a chegada à prova e o efeito de um boato no grupo. Há quatro encerramentos.

**Capítulo 2 — O que chegou ao grupo:** Lia e Tomás preparam a rádio da feira cultural na Escola do Farol. A capa ambígua de um vídeo sobre o cantor fictício Ravi Maré vira um boato de morte no grupo da turma. Seis decisões permitem buscar fontes, responder à turma, levar a correção a outras salas, usar o microfone, preparar a feira e reparar um compartilhamento precipitado. Há quatro encerramentos. Ao final, a transição inicia o Capítulo 3.

**Capítulo 3 — Quem viu meu perfil?:** Nina encontra, após a feira, um anúncio de aplicativo que promete mostrar visitantes do perfil na rede fictícia Vitra. Seis decisões tratam da origem do anúncio, das pistas do site, do pedido de acesso, dos avisos aos colegas, das cópias do link e da proteção das contas. Há quatro encerramentos.

O município, o concurso, o Instituto Vereda, a Escola do Farol e Ravi Maré são fictícios. O roteiro distingue mensagens de terceiros de publicações consultadas diretamente. Nenhum resultado de concurso real é apresentado.

## Estrutura

- `src/story/chapters/chapter01.js`: roteiro em dados, com cenas, falas, pensamentos, escolhas, condições, efeitos e encerramentos.
- `src/story/chapters/chapter02.js`: segunda história, com protagonista, variáveis, escolhas e encerramentos próprios.
- `src/story/chapters/chapter03.js`: terceira história, sobre a promessa de um aplicativo de visitantes e a proteção da conta.
- `src/story/registry.js`: registro dos capítulos implementados.
- `src/story/engine.js`: navegação e avaliação de condições, sem dependência de React.
- `src/story/components/`: palco, diálogo gradual, transição e tela temporária do capítulo seguinte.
- `src/lib/save.js`: leitura, validação e escrita do progresso local.
- `src/App.jsx`: integração entre menu, capítulo, modais e salvamento.
- `src/styles.css`: estilos do menu e do sistema narrativo.
- `public/characters/andre/`: cópias locais de seis expressões do personagem 9 existente na pasta superior.
- `public/characters/lia/`: cópias locais de seis expressões do personagem 8 existente na pasta superior.
- `public/characters/nina/`: cópias locais de seis expressões do personagem 4 existente na pasta superior.
- `public/backgrounds/`: treze cenários ilustrados em WebP para as cenas dos três capítulos.
- `public/characters/mae/`, `luana/`, `tomas/` e `nadia/`: seis expressões por personagem, usadas ao longo dos três capítulos.
- `../artes/fichas_originais/fichas_secundarios/` e `../scripts/recortar_secundarios.py`: fichas originais e script de recorte.
- `tests/game.spec.js` e `playwright.config.js`: testes de interface em navegador.

Para executar os scripts de arte a partir da raiz do repositório, instale as dependências com `python -m pip install -r scripts/requirements.txt`. Os scripts de recorte regeneram arquivos de imagem; execute-os apenas quando quiser atualizar os sprites. Consulte [scripts/README.md](../scripts/README.md).

Os três capítulos usam cenários ilustrados: casa, trajeto e sala de prova de André; pátio, corredor, rádio e portão da Escola do Farol; e ambientes de celular adequados a cada história. Os sprites de André, Lia e Nina reaproveitam fichas existentes; Mãe, Luana, Tomás e professora Nádia têm retratos próprios com expressões. Consulte `docs/narrativa.md` para acrescentar capítulos.

## Progresso e versões

O progresso usa a chave `cyber:save:v2`, `schemaVersion: 2` e a revisão do roteiro do capítulo. A validação reconstrói as escolhas para conferir posição, variáveis e fase. Dados incompatíveis não são apagados silenciosamente: o menu avisa, a chave antiga `cyber:save:v1` é preservada e um registro v2 incompatível recebe cópia em `cyber:save:incompatible-backup` antes de ser substituído. Backups diferentes posteriores usam os sufixos `:2`, `:3` etc.; um backup idêntico é reutilizado. Se o armazenamento estiver bloqueado ou sem espaço, o jogo informa a falha e permite jogar, mas não garante a retomada após sair. Não há backend.

## Estado da entrega

Os testes de motor cobrem os 144 caminhos do primeiro capítulo, 216 do segundo e 486 do terceiro, além de persistência, armazenamento bloqueado, falta de espaço, backups sucessivos, progresso incoerente, transições e presença de retratos e cenários. A suíte de interface cobre leitura, teclado, modais, foco e escolhas em cinco tamanhos de tela nos três modos de texto. Execute `npm test` e `npm run test:e2e` antes de publicar. A homologação com o público-alvo e a avaliação completa com leitores de tela continuam necessárias.

O desenvolvimento foi auxiliado por Codex. O pedido e o uso de IA estão no [registro de prompts](../docs/planejamento/registro-prompts.md). O [documento acadêmico oficial](../README.md) está em formato Markdown. O [índice de documentação](../docs/README.md) distingue o material atual dos estudos históricos.

# Validação

## Correções de estabilidade — 02/11/2026

- Testes do motor e persistência: 27 testes, incluindo 846 caminhos narrativos, armazenamento bloqueado, falta de espaço, backups sucessivos e rejeição de progresso incoerente.
- Testes de interface: 23 testes passaram no Chrome com Playwright sobre o build de produção, incluindo leitura, teclado, histórico, interlúdio, rolagem de textos longos, atualização do progresso ao recuperar foco e armazenamento bloqueado.
- A compilação de produção passou com Vite 6.4.5; `npm audit` não reportou vulnerabilidades nas dependências verificadas.
- A matriz de escolhas cobre 320×568, 390×844, 640×360, 844×390 e 1366×768 nos modos Padrão, Grande e Projetor. Cada alternativa é rolada até a área visível e verificada como alvo de clique; a terceira opção é selecionada.
- A inspeção visual no Chrome confirmou os controles separados dos nomes em 390×844 e a terceira alternativa acessível em 844×390 no modo Projetor. Também foi revista uma cena em 1366×768.
- O script `scripts/recortar_sprites_2.py` foi executado em uma cópia temporária com a ficha original e gerou os treze PNGs esperados, sem modificar a arte publicada.
- O workflow em `.github/workflows/test.yml` executa testes e build em novos pushes e pull requests. A execução remota depende do envio ao GitHub; a validação desta revisão foi local.
- Não foi realizada homologação completa com leitores de tela, outros navegadores ou o público-alvo.

## Histórico: versão anterior com blockout

- O conteúdo acadêmico foi preservado. Na época desta validação, `../README.md` continha um PDF apesar da extensão; posteriormente, foi convertido para Markdown. `Projeto_Cyber_PSOC_ADS.pdf` e `docs/prototipo/` não estavam presentes. Os documentos correspondentes disponíveis na raiz foram consultados.
- `npm test`: 3 testes passaram, cobrindo persistência/normalização de preferências, validação do progresso e cálculo da navegação por setas.
- Build de produção: passou com Vite 8.1.0 disponível localmente. O projeto declara React 19 e Vite 6; `npm run build` com o Vite 6 instalado foi bloqueado pelo sandbox ao iniciar o processo auxiliar do esbuild (`spawn EPERM`). O build com Vite 8 foi gerado em `dist`.
- Servidor local: a página e o cenário WebP responderam HTTP 200. O build inclui somente `cafe-blockout.webp` em `dist/images`.
- A pré-visualização raster da cafeteria foi aberta e inspecionada visualmente em 1920×1080. Ela confirma o enquadramento, contraste quente/frio, objetos e espaço de leitura. Seu acabamento ainda é de **blockout**, sem a qualidade de pintura anime final.
- Interface completa: a tentativa de captura com Chrome falhou por restrições de processos do ambiente (`mojo`/`crashpad`, acesso negado). Por isso, posicionamento preciso, interações e responsividade precisam de inspeção visual em navegador disponível. A interface usa controles HTML nativos, CSS responsivo e gerenciamento de foco.

## Atualização do cenário ilustrado

- `public/images/cafe-ilustrado.webp` foi gerado para substituir o blockout na tela inicial e validado como imagem WebP íntegra.
- `npm test`: os 3 testes continuam passando.
- A inspeção visual da imagem isolada confirmou composição 16:9, cafeteria chuvosa e espaço de leitura à esquerda. A interface completa ainda precisa de conferência em navegador.

## Atualização da abertura escolar

- O cenário ativo passou a ser `public/images/sala-cyber.webp`; as versões da cafeteria permanecem apenas como histórico.
- O menu agora apresenta o tema da investigação de informações, informa o estado de desenvolvimento e oferece uma explicação do projeto.
- O arquivo escolar foi validado como WebP íntegro, com 1672×941 pixels e 190086 bytes.
- `npm test`: os 3 testes passaram. `npm run build` continua bloqueado por `spawn EPERM` neste ambiente, inclusive com carregamento nativo da configuração.
- A composição da imagem escolar foi inspecionada isoladamente. A leitura da interface sobre a imagem e a navegação em tamanhos de tela diferentes ainda precisam de inspeção em navegador.

## Versão atual: abertura abstrata

- O menu usa apenas gradientes CSS. As ilustrações anteriores foram preservadas em `docs/visual-history/` e não são carregadas pela interface.
- O título, as quatro opções e o estado de desenvolvimento são os únicos elementos da abertura; não há premissa ou cenário narrativo.
- A revisão visual completa em navegador continua pendente por causa das restrições de execução do ambiente.

## Sistema narrativo e Capítulo 1

- `npm test`: 8 testes passaram, incluindo todos os 36 caminhos de decisões, finais, transição sem Capítulo 2, persistência e versões incompatíveis.
- O executável local do esbuild compilou `src/main.jsx`, os componentes JSX e o CSS em um pacote de verificação. O comando padrão `npm run build` segue bloqueado por `spawn EPERM` ao iniciar subprocessos neste ambiente.
- Chrome em modo headless falhou com acesso negado em `crashpad` e `mojo`. Assim, a responsividade e a interação visual do capítulo ainda precisam de inspeção em um navegador disponível.
- O roteiro, o motor e o salvamento foram separados do React. Os seis sprites de André foram copiados de `sprites_recortados_9`; os cenários narrativos são gradientes temporários identificados na interface.

## Capítulo 2 — O que chegou ao grupo

- `npm test`: 11 testes passaram. Foram percorridas as 36 combinações das quatro decisões do Capítulo 2, além da passagem automática do Capítulo 1, dos quatro tipos de final e da retomada de um salvamento antigo na tela de espera.
- `npm run build`: passou com Vite 6.4.5 neste ambiente.
- Seis expressões de Lia foram copiadas de `sprites_recortados_8`; os cenários continuam provisórios. A nova história ainda precisa de conferência visual e de leitura por pessoas da equipe e do público-alvo antes de publicação.
- A interface do Capítulo 2 foi aberta no Chrome local em 1366×768 e 390×844. A cena inicial e a primeira escolha foram capturadas; as três opções apareceram, o retrato carregou e não houve rolagem horizontal no celular. Essa checagem cobre apenas essas telas, não uma revisão visual de toda a história.

## Capítulo 3 — Quem viu meu perfil?

- `npm test`: 15 testes passaram. O motor percorreu as 54 combinações das quatro decisões do Capítulo 3, validou seus quatro tipos de final, a transição automática do Capítulo 2 e a retomada de um salvamento antigo na tela de espera.
- O teste de retratos confirma que cada fala dos três capítulos aponta para uma expressão existente do personagem certo.
- `npm run build`: passou com Vite 6.4.5.
- Seis expressões de Nina foram copiadas de `sprites_recortados_4`. Os cenários continuam provisórios. O capítulo ainda precisa de leitura e conferência visual completas antes de publicação.

## Cenários ilustrados dos três capítulos

- Foram criados treze fundos em `public/backgrounds/`, associados ao contexto de cada capítulo. O quarto de estudos tem versões diurna e noturna; o celular de André aparece no quarto; Lia e Nina compartilham o ambiente digital escolar; os finais noturnos de Nina têm um fundo próprio.
- O palco narrativo e a transição entre capítulos usam as imagens. Os gradientes existentes servem como cor de fundo durante o carregamento.
- Um teste verifica que toda cena dos três capítulos tem uma imagem existente. A leitura do roteiro foi usada para evitar texto legível ou elementos de interface que contradigam as mensagens narradas.
- As aberturas dos Capítulos 1, 2 e 3 foram capturadas no Chrome em 1366×768. Os fundos carregaram, as legendas e as caixas de diálogo ficaram legíveis e não houve sobreposição visível nessa amostra. A inspeção não cobre todas as cenas ou escolhas.

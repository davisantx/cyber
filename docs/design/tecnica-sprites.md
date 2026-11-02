# Relatório Técnico: Viabilidade e Comparativo da Técnica de Spritesheet (Texture Atlas) para o Jogo "Operação Camisa 10"

> Referência histórica de outro protótipo, preservada para consulta. As dependências, personagens, caminhos e medições abaixo não descrevem o CYBER atual. O jogo usa retratos PNG individuais e fundos WebP; consulte o [README do jogo](../../game/README.md) para a estrutura vigente.

**Data:** 22 de Outubro de 2026
**Projeto:** Operação Camisa 10 (Mistério da Rifa do Interclasses — Fake News)
**Stack do Projeto:** React 19, Vite 8, Tailwind CSS v4, Sharp

---

## 1. Resumo Executivo e Veredito

> **Veredito:** **SIM, a técnica é 100% viável, altamente recomendada e perfeitamente compatível com o projeto atual.**

A abordagem de unificar as poses e expressões de cada personagem em uma única imagem agregadora (**Spritesheet** ou **Texture Atlas**) e recortar as áreas correspondentes via código é o padrão clássico da indústria de desenvolvimento de jogos (2D e Visual Novels).

No contexto específico deste projeto, além de viável, a técnica resolve problemas críticos presentes na infraestrutura de assets do jogo:
1. Elimina o **flickering** (flash visual) durante as transições de emoções dos diálogos;
2. Reduz o número de requisições de rede de **19 arquivos dispersos** para apenas **1 por personagem** (ou 1 atlas consolidado para todo o jogo);
3. Permite uma compressão de dados muito superior (redução estimada do peso visual de **16,6 MB** para menos de **1,2 MB** com WebP);
4. O projeto **já possui o ecossistema pronto** para automatizar isso: o `sharp` já está instalado em `devDependencies` e scripts de geração de contato como `create-preview.mjs` e `process-sprites.mjs` já existem no repositório.

---

## 2. Diagnóstico da Situação Atual no Projeto

Atualmente, o projeto possui duas frentes paralelas de sprites:

```
jogo-camisa10/
├── src/components/sprites/
│   └── CharacterSprite.jsx    <-- [FRENTE ATIVA NO JOGO]: Vetorial Procedural / Inline SVG
├── sprites_raw/               <-- Imagens brutas geradas por IA (JPG/PNG com fundo branco)
├── process-sprites.mjs        <-- Script com Sharp para remoção de fundo e normalização
└── src/assets/characters/     <-- [FRENTE DE ASSETS RASTER]: 19 PNGs individuais de 896x1200 (~16.6 MB)
```

### 2.1. Frente Ativa: Renderização Vetorial Procedural (`CharacterSprite.jsx`)
No código em execução no React:
- **Bia:** Utiliza a biblioteca `@dicebear/adventurer` para gerar o rosto e as emoções em SVG proceduralmente via código JavaScript + um tronco/camisa desenhado com SVG inline.
- **Demais Personagens (Cauã, Léo, Igor, Socorro, Raimundo, Diretor):** São desenhados puramente com nós vetoriais `<svg>`, `<ellipse>`, `<path>`, `<polygon>` hardcoded dentro do componente React, mudando coordenadas e cores com base na prop `emotion`.

### 2.2. Frente Experimental/Legada: PNGs Individuais (`src/assets/characters/`)
Existe uma suíte completa de sprites raster (PNGs de 8bit RGBA) normalizados para `896 x 1200 px`:
- São **19 arquivos individuais**: `bia_calm.png`, `bia_panicked.png`, `bia_crying.png`, `caua_calm.png`, `leo_furious.png`, etc.
- O peso total dessa pasta é de **16,6 MB** (~800 KB a 1 MB por pose individual).
- Cada troca de diálogo exigiria uma nova requisição `<img>` caso esses assets fossem chamados diretamente na cena.

---

## 3. A Técnica Proposta: Spritesheet / Texture Atlas

### 3.1. O que é?
A técnica consiste em reunir todos os quadros (*frames*) ou variações expressivas de um elemento visual dentro de uma única matriz de pixels (imagem combinada). Juntamente à imagem, utiliza-se uma convenção de grade (*grid-based*) ou um arquivo de metadados (*JSON Texture Atlas*) que define as coordenadas de corte `(x, y, largura, altura)` de cada emoção.

```
+-----------------------------------------------------------------------+
|  SPRITESHEET DA BIA (ex: bia_atlas.webp)                              |
|  +-----------------+ +-----------------+ +-----------------+          |
|  | [0, 0]          | | [358, 0]        | | [716, 0]        |          |
|  | bia_calm        | | bia_panicked    | | bia_crying      | ...      |
|  +-----------------+ +-----------------+ +-----------------+          |
|  +-----------------+ +-----------------+ +-----------------+          |
|  | [0, 480]        | | [358, 480]      | | [716, 480]      |          |
|  | bia_hopeful     | | bia_relieved    | | bia_champion    | ...      |
|  +-----------------+ +-----------------+ +-----------------+          |
+-----------------------------------------------------------------------+
```

### 3.2. Formas de Recorte por Código no Ambiente React / Web

Existem três formas consolidadas de implementar o recorte no navegador:

#### A) CSS `background-position` / `clip-path` (Mais Simples e Eficiente para React/Tailwind)
Uma `div` com dimensões fixadas e a imagem de fundo definida:
```jsx
// Exemplo conceitual com CSS puro / Tailwind
<div
  style={{
    backgroundImage: `url(${characterAtlasUrl})`,
    backgroundPosition: `-${coords.x}px -${coords.y}px`,
    width: `${coords.width}px`,
    height: `${coords.height}px`,
    backgroundSize: `${atlasTotalWidth}px ${atlasTotalHeight}px`
  }}
  className="character-sprite select-none pointer-events-none"
/>
```

#### B) Invólucro de Imagem com `overflow: hidden` e `transform: translate` (Ideal para Layouts Responsivos)
Permite escalar o sprite proporcionalmente utilizando porcentagens ou flexbox:
```jsx
<div className="relative w-72 h-96 overflow-hidden">
  <img
    src="/assets/characters/bia_atlas.webp"
    alt="Bia"
    className="absolute max-w-none transition-none"
    style={{
      transform: `translate(-${colIndex * 100}%, -${rowIndex * 100}%)`,
      width: `${totalCols * 100}%`
    }}
  />
</div>
```

#### C) HTML5 Canvas 2D (`ctx.drawImage`)
Se o jogo renderizar o palco via `<canvas>`, o método nativo recorta em altíssima performance diretamente na GPU:
```javascript
ctx.drawImage(atlasImage, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
```

---

## 4. Comparativo Aprofundado das Técnicas

Abaixo, compara-se a técnica proposta (**Spritesheet**) com as duas abordagens existentes no projeto: a **Vetorial Procedural (SVG)** e a de **Imagens PNG Individuais**.

| Critério de Análise | 1. Vetorial SVG Atual (`CharacterSprite.jsx`) | 2. Imagens PNG Individuais (`src/assets/characters/`) | 3. Técnica Proposta: Spritesheet / Atlas |
| :--- | :--- | :--- | :--- |
| **Peso do Download / Bundle** | **Excepcional:** Praticamente 0 KB adicionais (código puro no bundle JS ~25 KB). | **Crítico:** 16,6 MB somando os 19 arquivos PNG descompactados. | **Muito Bom:** ~1 MB a 1,8 MB para todos os personagens juntos em WebP. |
| **Transição de Emoções (Flickering)** | Instantânea, pois o SVG é recalculado diretamente pelo React. | **Ruim:** Cada emoção dispara um novo download; a tela pisca em branco até carregar. | **Perfeita:** A imagem já está em cache e na VRAM da GPU. Troca de frame a 60 fps. |
| **Requisições de Rede (HTTP Requests)** | 0 requisições HTTP adicionais. | 19 requisições HTTP dispersas conforme o jogador avança o roteiro. | **Apenas 1 requisição** por personagem (ou 1 única requisição global). |
| **Qualidade Artística e Expressividade** | **Limitada:** Estilo geométrico plano básico. Diferença gritante entre Bia e Cauã. | **Excelente:** Estilo ilustrado/pixel-art rico, sombras, hachuras e vestimentas detalhadas. | **Excelente:** Mantém 100% da fidelidade artística do ilustrador / IA. |
| **Consumo de Memória (VRAM)** | Quase nulo. | Baixo por tela (mas com picos de *garbage collection* a cada download). | Moderado (controlado e constante, ideal para texturas de até 2048x2048). |
| **Escalabilidade Artística** | **Baixa:** Desenhar novos personagens em SVG manual exige programação pura. | Média: Fácil de salvar novas imagens, mas poluído em número de arquivos. | **Alta:** Fluxo padrão de exportação direta do Photoshop, Aseprite ou Sharp. |

---

## 5. Análise de Viabilidade Específica para este Projeto

### 5.1. Fatores Facilitadores Já Presentes no Repositório

1. **Dependência `sharp` já instalada:** O projeto possui `sharp: ^0.35.4` configurado em `package.json`. O Sharp é a biblioteca mais rápida do ecossistema Node.js para composição, corte e empacotamento de imagens em matriz.
2. **Script de Geração de Contato Pré-Existente:** O arquivo `create-preview.mjs` já cria literalmente uma folha de sprites (*contact sheet*) de `358x480 px` com fundo transparente ou sólido:
   ```javascript
   // Trecho de create-preview.mjs existente no projeto:
   const biaPoses = ['bia_calm', 'bia_panicked', 'bia_crying', 'bia_hopeful', 'bia_relieved', 'bia_champion'];
   await createContactSheet(biaPoses, 'sprites_preview/bia.png', 'Bia — Expressões');
   ```
3. **Resoluções e Posicionamentos Já Normalizados:** O script `process-sprites.mjs` já trata transparência, defringe (remoção de halo branco) e alinha todos os personagens pelo pé na base `896x1200`.

### 5.2. O Gargalo Atual que Precisa Ser Ajustado: Resolução Excessiva

Os PNGs brutos em `src/assets/characters/` estão com `896 x 1200 px`.
No layout do jogo (`GameStage.jsx` e `CharacterSprite.jsx`), o personagem ocupa na tela no máximo:
- Telas de Celular: `w-52` (~208 px de largura, ~260 px de altura).
- Telas de Desktop: `w-68` (~272 px de largura, ~340 px de altura).

Se criarmos um Spritesheet com as 6 poses da Bia em resolução cheia (896x1200), teríamos uma imagem de `5376 x 1200 px` ou uma grade 3x2 de `2688 x 2400 px` (~24 MB de VRAM descompactada).
**Solução recomendada:** Redimensionar os quadros para `448 x 600 px` (50% do original, ainda retendo 2x de densidade Retina). Uma grade 3x2 ficaria com apenas `1344 x 1200 px`, pesando menos de **250 KB** em WebP.

---

## 6. Proposta Prática de Implementação

Caso opte por adotar a técnica, a implementação consiste em dois passos simples:

### Passo 1: Script de Build do Atlas (`build-atlas.mjs`)
Usando o `sharp` já existente no projeto, junta-se as emoções em grade e gera-se um arquivo JSON de coordenadas:

```javascript
// Exemplo de saída: bia_atlas.json
{
  "image": "bia_atlas.webp",
  "frameWidth": 448,
  "frameHeight": 600,
  "frames": {
    "calm": { "x": 0, "y": 0 },
    "panicked": { "x": 448, "y": 0 },
    "crying": { "x": 896, "y": 0 },
    "hopeful": { "x": 0, "y": 600 },
    "relieved": { "x": 448, "y": 600 },
    "champion": { "x": 896, "y": 600 }
  }
}
```

### Passo 2: Componente React Universal (`CharacterAtlasSprite.jsx`)

```jsx
import React from 'react';
import ATLAS_DATA from '../../assets/characters/atlas_manifest.json';

export const CharacterAtlasSprite = ({ character = 'bia', emotion = 'calm', speaking = false }) => {
  const charConfig = ATLAS_DATA[character];
  if (!charConfig) return null;

  const frame = charConfig.frames[emotion] || charConfig.frames['calm'];

  return (
    <div className={`relative overflow-hidden ${speaking ? 'scale-105' : 'scale-100'} transition-transform duration-200`}>
      <div
        className="w-56 h-75 sm:w-68 sm:h-90 bg-no-repeat pointer-events-none drop-shadow-xl"
        style={{
          backgroundImage: `url(${charConfig.imageUrl})`,
          backgroundPosition: `-${frame.x}px -${frame.y}px`,
          backgroundSize: `${charConfig.totalWidth}px ${charConfig.totalHeight}px`,
          imageRendering: 'pixelated'
        }}
      />
    </div>
  );
};
```

---

## 7. Conclusão e Recomendações

1. **Adoção recomendada:** A migração para Spritesheets é a melhor alternativa caso o objetivo seja trazer para dentro do jogo os sprites ilustrados ricos que estão hoje isolados em `sprites_raw/` e `src/assets/characters/`.
2. **Padronização Visual:** A técnica atual em SVG procedural foi uma excelente solução para um MVP sem dependência de assets pesados, mas cria inconsistência estilística (Bia feita em biblioteca DiceBear vs outros personagens desenhados com polígonos manuais). O Spritesheet trará identidade visual 100% uniforme a todos os 7 personagens.
3. **Conversão de Formato:** Recomenda-se exportar os atlas em formato **WebP** com qualidade 85-90%, garantindo suporte a canal alfa (transparência) com peso 70% menor do que PNG.
4. **Resolução de Exportação:** Não utilizar 896x1200 por quadro no atlas; padronizar cada quadro entre `358x480` e `448x600 px` para maximizar a performance em qualquer smartphone ou computador escolar.

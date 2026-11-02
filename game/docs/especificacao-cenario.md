# Cenários e composição

O jogo usa treze cenários locais em WebP, em `public/backgrounds/`. Cada capítulo relaciona as chaves de cenário aos arquivos em `assets.backgrounds`. O menu reutiliza o cenário salvo e usa `study.webp` como padrão.

## Critérios

- Manter contraste suficiente para o título e as cinco opções em computador, projetor e celular.
- Adaptar o enquadramento sem colocar informação essencial dentro da imagem.
- Manter todas as alternativas acessíveis em telas estreitas ou baixas, inclusive no modo Projetor, com rolagem quando necessário.
- Evitar imagens externas, carregamento remoto e texto incorporado ao fundo.
- Respeitar a preferência de movimento reduzido e manter o fundo sem animação essencial.

As ilustrações testadas anteriormente estão em `docs/visual-history/` e não participam do menu atual.

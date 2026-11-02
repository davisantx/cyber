# Ferramentas de arte

Requer Python 3.10+ e as dependências de `requirements.txt`. Na raiz do repositório:

```bash
python -m pip install -r scripts/requirements.txt
```

- `python scripts/recortar_sprites_2.py`: recorta a ficha do personagem 2 em `artes/sprites_recortados/sprites_recortados_2/`.
- `python scripts/recortar_sprites_novos.py`: recorta as fichas dos personagens 3–10 em `artes/sprites_recortados/`.
- `python scripts/recortar_secundarios.py`: recorta os quatro personagens secundários diretamente em `game/public/characters/`.
- `teste_sprites.html`: pré-visualização das expressões e alinhamento dos recortes.

Os comandos regeneram os arquivos de saída. Faça uma revisão visual antes de incorporar mudanças de arte. Os retratos dos protagonistas publicados em `game/public/characters/` são cópias selecionadas dos recortes.

`game/scripts/render_menu_blockout.py` gera apenas uma referência histórica em `game/docs/visual-history/`; não faz parte da compilação do jogo.

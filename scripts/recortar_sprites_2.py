from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = Path(__file__).resolve().parents[1]
SHEET_PATH = ROOT / "artes" / "fichas_originais" / "Ficha de Personagem_ Expressões e Vistas.png"
out_dir = ROOT / "artes" / "sprites_recortados" / "sprites_recortados_2"
out_dir.mkdir(parents=True, exist_ok=True)

im = Image.open(SHEET_PATH).convert('RGBA')
arr = np.array(im)

def clean_patch_rgba(patch, hair_limit):
    out = patch.copy()
    v = out[:, :, :3].max(axis=2).astype(np.float32)
    fg = v > 12

    # Mantém apenas o componente principal (elimina textos de legenda e ruídos)
    labeled, num = ndimage.label(fg)
    if num == 0:
        return out
    sizes = ndimage.sum(fg, labeled, range(1, num + 1))
    main_lbl = np.argmax(sizes) + 1
    clean_fg = (labeled == main_lbl)

    # Preenche regiões escuras internas da silhueta (blusa preta, cinto, cílios, etc.)
    filled_fg = ndimage.binary_fill_holes(clean_fg)

    # Reabre os vãos entre mechas. O fundo original nem sempre é preto puro:
    # a antialiasing produz pixels de valor 2..12 que a regra anterior deixava opacos.
    dist_to_ext = ndimage.distance_transform_edt(filled_fg)
    holes = filled_fg & (~clean_fg)
    h_labeled, h_num = ndimage.label(holes)
    for i in range(1, h_num + 1):
        h_mask = (h_labeled == i)
        ys, _ = np.where(h_mask)
        if ys.min() < hair_limit and dist_to_ext[h_mask].min() <= 12:
            filled_fg[h_mask] = False

    interior = ndimage.binary_erosion(filled_fg, iterations=1)
    near_edge = ndimage.binary_dilation(filled_fg, iterations=1)

    # Suaviza a borda [4, 32] -> alpha [0, 255]
    a_new = np.clip((v - 4.0) * (255.0 / (32.0 - 4.0)), 0, 255)
    a_new[~near_edge] = 0
    a_new[interior] = 255
    out[:, :, 3] = np.round(a_new).astype(np.uint8)
    out[out[:, :, 3] == 0, :3] = 0
    return out

# 1. Personagem de corpo inteiro
fb_patch = clean_patch_rgba(arr[50:1478, 0:346], hair_limit=330)
ys, xs = np.where(fb_patch[:, :, 3] > 0)
fb_crop = fb_patch[ys.min():ys.max()+1, xs.min():xs.max()+1]
fb_canvas = np.zeros((fb_crop.shape[0] + 8, fb_crop.shape[1] + 8, 4), dtype=np.uint8)
fb_canvas[4:4+fb_crop.shape[0], 4:4+fb_crop.shape[1]] = fb_crop
Image.fromarray(fb_canvas, 'RGBA').save(out_dir / '00_corpo_inteiro.png', compress_level=9)
print('Saved 00_corpo_inteiro.png:', fb_canvas.shape[1], 'x', fb_canvas.shape[0])

# 2. 12 Expressões (Canvas padronizado: 240 x 310, alinhado na base e centralizado pelos ombros)
STD_W, STD_H = 240, 310
rows_y = [(65, 367), (415, 717), (765, 1063), (1115, 1412)]
cols_x = [(341, 578), (574, 804), (804, 1020)]
names = [
    ['01_normal', '02_feliz', '03_triste'],
    ['04_brava', '05_surpresa', '06_constrangida'],
    ['07_pensativa', '08_rindo', '09_com_raiva'],
    ['10_olhando_esquerda', '11_olhando_direita', '12_de_costas']
]

for r_idx, (ry0, ry_bot) in enumerate(rows_y):
    for c_idx, (cx0, cx1) in enumerate(cols_x):
        name = names[r_idx][c_idx]
        patch = clean_patch_rgba(arr[ry0:ry_bot+1, cx0:cx1], hair_limit=275)
        sh_slice = patch[-40:, :, 3]
        _, sh_xs = np.where(sh_slice > 128)
        sh_center = (sh_xs.min() + sh_xs.max()) / 2.0

        canvas = np.zeros((STD_H, STD_W, 4), dtype=np.uint8)
        ph, pw = patch.shape[:2]
        x_offset = int(round(STD_W / 2.0 - sh_center))
        y_offset = STD_H - ph

        x_src0 = max(0, -x_offset)
        x_dst0 = max(0, x_offset)
        copy_w = min(pw - x_src0, STD_W - x_dst0)
        canvas[y_offset:STD_H, x_dst0:x_dst0+copy_w] = patch[:, x_src0:x_src0+copy_w]

        out_path = out_dir / f'{name}.png'
        Image.fromarray(canvas, 'RGBA').save(out_path, compress_level=9)
        print(f'Saved {name}.png: {STD_W}x{STD_H} (x_offset={x_offset}, y_offset={y_offset})')

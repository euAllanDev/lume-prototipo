"""Gera o logo do Lume em SVG: a chama desenhada à mão e o "Lume" em contornos da Montserrat Bold."""
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

# --- chama: duas folhas separadas por uma curva em S, numa caixa 100 x 130 ---
_traced = open("flame_paths.txt").read().split("\n")
LEFT, RIGHT = _traced[1], _traced[2]  # traçado da chama original (trace.py)
FLAME_W, FLAME_H = round(float(_traced[0]), 2), 130

# --- palavra: Montserrat Bold (wght 700), altura das maiúsculas = 64% da chama ---
font = TTFont("Montserrat-Bold-static.ttf")
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
cap = font["OS/2"].sCapHeight
scale = (FLAME_H * 0.64) / cap
baseline = FLAME_H * 0.853
text_x = FLAME_W + FLAME_H * 0.13
tracking = -0.035 * 1000  # leve aperto entre letras, em unidades da fonte

def word_path(word: str) -> tuple[str, float]:
    pen = SVGPathPen(glyphs)
    x = 0.0
    for ch in word:
        name = cmap[ord(ch)]
        tp = TransformPen(pen, (scale, 0, 0, -scale, text_x + x * scale, baseline))
        glyphs[name].draw(tp)
        x += glyphs[name].width + tracking
    return pen.getCommands(), text_x + (x - tracking) * scale

WORD, word_end = word_path("Lume")
WIDTH = round(word_end + 2, 1)

GRAD = """<linearGradient id="{id}" x1="0" y1="1" x2="1" y2="0" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#06123d"/><stop offset=".45" stop-color="#0c2670"/><stop offset=".8" stop-color="#1747b4"/><stop offset="1" stop-color="#2a6be3"/>
    </linearGradient>"""
WGRAD = """<linearGradient id="{id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#143795"/><stop offset="1" stop-color="#0a1a4f"/>
    </linearGradient>"""

def svg(body: str, w: float, h: float, defs: str = "", title: str = "Lume") -> str:
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-label="{title}">\n'
            f'  <title>{title}</title>\n' + (f'  <defs>\n    {defs}\n  </defs>\n' if defs else "") + body + "</svg>\n")

flame_color = (f'  <path d="{LEFT}" fill="url(#lume-flame-l)"/>\n'
               f'  <path d="{RIGHT}" fill="url(#lume-flame-r)"/>\n'
               f'  <path d="{LEFT}" fill="url(#lume-sheen)"/>\n'
               f'  <path d="{RIGHT}" fill="url(#lume-sheen)"/>\n')
SHEEN = '''<radialGradient id="lume-sheen" cx=".9" cy=".25" r=".95" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#6fa4ff" stop-opacity=".3"/><stop offset=".55" stop-color="#3b78f0" stop-opacity=".12"/><stop offset="1" stop-color="#3b78f0" stop-opacity="0"/>
    </radialGradient>'''
defs_color = SHEEN + "\n    " + GRAD.format(id="lume-flame-l") + "\n    " + GRAD.format(id="lume-flame-r") + "\n    " + WGRAD.format(id="lume-word")

files = {
    "lume-logo.svg": svg(flame_color + f'  <path d="{WORD}" fill="url(#lume-word)"/>\n', WIDTH, FLAME_H, defs_color),
    "lume-logo-white.svg": svg(f'  <g fill="#fbfaf7"><path d="{LEFT}"/><path d="{RIGHT}"/><path d="{WORD}"/></g>\n', WIDTH, FLAME_H),
    "lume-logo-navy.svg": svg(f'  <g fill="#111b40"><path d="{LEFT}"/><path d="{RIGHT}"/><path d="{WORD}"/></g>\n', WIDTH, FLAME_H),
    "lume-mark.svg": svg(flame_color, FLAME_W, FLAME_H, SHEEN + "\n    " + GRAD.format(id="lume-flame-l") + "\n    " + GRAD.format(id="lume-flame-r")),
}
for name, content in files.items():
    open(name, "w").write(content)
print("largura", WIDTH, "escala", round(scale, 4))

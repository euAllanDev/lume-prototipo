"""Traça a chama do logo original (PNG) e grava os contornos das duas folhas em flame_paths.txt.

Uso: python trace.py caminho/para/logo.png
Recorta a chama, amplia 6x, suaviza, extrai os contornos com OpenCV, simplifica e converte cada contorno
em curvas de Bézier (Catmull-Rom), normalizados para 130 de altura.
"""
import sys

import cv2
import numpy as np
from PIL import Image

src = sys.argv[1] if len(sys.argv) > 1 else "logo.png"
a = np.array(Image.open(src).convert("RGBA"))
x0, y0, x1, y1 = 113, 202, 113 + 380, 677  # caixa da chama no logo original de 1680x944
reg = a[y0 - 10:y1 + 10, x0 - 10:x1 + 10]
mask = ((reg[..., :3].min(axis=2) < 200) & (reg[..., 3] > 100)).astype(np.uint8) * 255

S = 6
big = cv2.resize(mask, None, fx=S, fy=S, interpolation=cv2.INTER_CUBIC)
big = cv2.GaussianBlur(big, (0, 0), S * 1.2)
_, big = cv2.threshold(big, 127, 255, cv2.THRESH_BINARY)
cnts, _ = cv2.findContours(big, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
cnts = sorted([c for c in cnts if cv2.contourArea(c) > 5000], key=lambda c: cv2.boundingRect(c)[0])

pts = np.vstack(cnts).reshape(-1, 2).astype(float)
minx, miny = pts.min(0)
maxx, maxy = pts.max(0)
sc = 130.0 / (maxy - miny)
width = (maxx - minx) * sc


def to_path(c):
    p = cv2.approxPolyDP(c, S * 0.9, True).reshape(-1, 2).astype(float)
    p = (p - [minx, miny]) * sc
    n = len(p)
    d = f"M{p[0][0]:.2f} {p[0][1]:.2f}"
    for i in range(n):
        p0, p1, p2, p3 = p[(i - 1) % n], p[i], p[(i + 1) % n], p[(i + 2) % n]
        c1, c2 = p1 + (p2 - p0) / 6, p2 - (p3 - p1) / 6
        d += f"C{c1[0]:.2f} {c1[1]:.2f} {c2[0]:.2f} {c2[1]:.2f} {p2[0]:.2f} {p2[1]:.2f}"
    return d + "Z"


open("flame_paths.txt", "w").write(f"{width:.2f}\n" + "\n".join(to_path(c) for c in cnts))

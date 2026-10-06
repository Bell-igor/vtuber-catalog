#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Сжимает скачанные с Twitch картинки в webp (запускается в GitHub Actions
после обновления статуса). Требует Pillow; если его нет — просто выходит."""
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
IMG = os.path.join(ROOT, "assets", "img")

try:
    from PIL import Image
except ImportError:
    print("Pillow не установлен — пропускаю сжатие картинок")
    sys.exit(0)


def convert(src_name, dst_name, quality, width=None):
    src = os.path.join(IMG, src_name)
    if not os.path.exists(src):
        print(f"нет файла {src_name} — пропускаю")
        return
    im = Image.open(src).convert("RGB")
    if width and im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    dst = os.path.join(IMG, dst_name)
    im.save(dst, "WEBP", quality=quality, method=6)
    print(f"{dst_name}: {os.path.getsize(dst) // 1024} КБ, {im.size}")


convert("banner-twitch.png", "banner-twitch.webp", 84, 1440)
convert("avatar-twitch.png", "avatar-twitch.webp", 88, 300)

"""Bouwt de subpagina's van 't Kleinhof opnieuw.

Header en footer komen uit ../index.html. De inhoud van elke subpagina staat
in _bouw/pages/<naam>.html: bovenaan TITLE: en DESC:, dan een regel '---',
daarna de HTML die tussen <main> en </main> komt.

Gebruik (vanuit eender welke map):
    python _bouw/build.py
Pas dus eerst header/footer aan in index.html en draai dan dit script.
"""
import os, re

here = os.path.dirname(os.path.abspath(__file__))
site = os.path.dirname(here)
pages_dir = os.path.join(here, 'pages')

tpl = open(os.path.join(site, 'index.html'), encoding='utf-8').read()
head, rest = tpl.split('<main>', 1)
_, foot = rest.split('</main>', 1)

def esc(s):
    return s.replace('&', '&amp;')

for name in sorted(os.listdir(pages_dir)):
    src = open(os.path.join(pages_dir, name), encoding='utf-8').read()
    meta, body = src.split('\n---\n', 1)
    title = re.search(r'^TITLE: (.*)$', meta, re.M).group(1).strip()
    desc = re.search(r'^DESC: (.*)$', meta, re.M).group(1).strip()
    h = head
    h = re.sub(r'<title>.*?</title>', '<title>' + esc(title) + '</title>', h)
    h = re.sub(r'(<meta name="description" content=")[^"]*(")', lambda m: m.group(1) + esc(desc) + m.group(2), h)
    h = re.sub(r'(<meta property="og:title" content=")[^"]*(")', lambda m: m.group(1) + esc(title) + m.group(2), h)
    h = re.sub(r'(<meta property="og:description" content=")[^"]*(")', lambda m: m.group(1) + esc(desc) + m.group(2), h)
    out = h + '<main>\n' + body.rstrip() + '\n  </main>' + foot
    open(os.path.join(site, name), 'w', encoding='utf-8', newline='\n').write(out)
    print('gebouwd:', name)

# 't Kleinhof: nieuwe website

Zelfde huisstijl en teksten als kleinhof.be (appelgroen logo, Fraunces + Nunito Sans, handgeschreven accent zoals het logo), in een rustige, ambachtelijke opmaak: foto's in de hoofdrol, gewone tekstkolommen en dunne lijnen.

Achtergrond, bronnen, ontwerpkeuzes, Cloudflare en openstaande punten: zie [PROJECT-NOTITIES.md](PROJECT-NOTITIES.md).

## Bestanden

| Bestand | Inhoud |
|---|---|
| `styles.css` | Gedeelde stylesheet voor alle pagina's |
| `scripts.js` | Menu, formuliervalidatie en de automatische hoogte van het reserveringssysteem |
| `index.html` | Home: veldfoto, even voorstellen, op de boerderij, zorg-boerderij, Bio-kast, nieuwsbrief |
| `visie.html` | Visie en verhaal, als een brief van Liesbeth & Gert |
| `bio-boerderij.html` | Dieren en teelt, akkerbouw-teeltplan, spelt + voedingstabel, Bio-kast |
| `reserveren.html` | Reserveringssysteem (zelfde app als nu op kleinhof.be, met live voorraad) |
| `contact.html` | Gegevens, contactformulier, Google Maps |
| `privacy.html` | Privacybeleid |
| `afbeeldingen/` | Foto's van de akkerbouw + kopieën van logo/hero/foto Liesbeth & Gert |

## Reserveringssysteem
`reserveren.html` laadt de bestaande app `https://bio-reservering.vibepreview.app` in een iframe. Producten, prijzen, voorraad en bevestigingen blijven dus in die app beheerd. De hoogte past zich automatisch aan (bericht `kleinhof:resize`, zie `scripts.js`).

## Overzetten naar GoHighLevel
1. **CSS**: plak `styles.css` in *Settings → Custom CSS* van de funnel/website (of in elke pagina via Custom CSS).
2. **Fonts**: voeg in de *Head tracking code* deze regel toe:
   `<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500&family=Nunito+Sans:wght@400;600;700&family=Sue+Ellen+Francisco&display=swap" rel="stylesheet" />`
3. **JS**: plak de inhoud van `scripts.js` tussen `<script>…</script>` in de *Footer tracking code*.
4. **Pagina's**: maak per HTML-bestand een pagina (`home`, `visie`, `bio-boerderij`, `reserveren`, `contact`, `privacy`) en plak alles tussen `<body>` en `</body>` in een Custom HTML/Code-element (zonder de `<script src="scripts.js">`-regel).
5. **Links**: de bestanden linken naar elkaar als `visie.html` enz. Vervang die in GHL door de paden van je pagina's (`/visie`, `/bio-boerderij`, …).
6. **Afbeeldingen**: logo, hero-foto en de foto van Liesbeth & Gert staan al in de GHL-mediabibliotheek (die links werken meteen). Upload `hooien.jpg`, `ploegen.jpg`, `aardappelen-rooien.jpg` en `spelt.jpg` uit `afbeeldingen/` en vervang de `afbeeldingen/...`-paden door de nieuwe URL's.
7. **Formulieren**: het nieuwsbrief- en contactformulier zijn demo's (alleen validatie, er wordt niets verstuurd). Vervang ze door de embedcode van je GHL-formulieren.

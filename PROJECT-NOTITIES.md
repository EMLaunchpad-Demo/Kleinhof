# 't Kleinhof: projectnotities

Alles wat bekend is over dit websiteproject, zodat je verder kan zonder de oorspronkelijke chat (gemaakt op 9 en 10 oktober 2026).
Praktische stappen voor GoHighLevel staan in [LEESMIJ.md](LEESMIJ.md).

---

## 1. Opdracht
- Klant: **'t Kleinhof Vechmaal**, een kleinschalige biologische boerderij van Liesbeth & Gert.
- Vraag van Martijn: een nieuwe website met dezelfde stijlen en dezelfde tekst als de huidige site, maar moderner. Het moet landbouw/biologisch aanvoelen, en het reserveringssysteem moet erin.
- Alles hoort in `Websites/Kleinhof` (deze map).

## 2. Stand van zaken (10 oktober 2026)
- De website is klaar: 6 pagina's plus `styles.css` en `scripts.js`.
- Repository **github.com/EMLaunchpad-Demo/Kleinhof**, branch `main`. De commit "Website" is gepusht (via GitHub Desktop).
- **Volgende stap:** online zetten via Cloudflare Pages (zie punt 9).
- Nog niet op GitHub: de map `_bouw/` en dit bestand. Commit en push ze via GitHub Desktop.

## 3. Klantgegevens
| | |
|---|---|
| Naam | 't Kleinhof, Vechmaal |
| Eigenaars | Gert Vanbrabant en Liesbeth Cochet |
| Adres | Brugstraat 2a, 3870 Vechmaal |
| E-mail | info@kleinhof.be |
| Gert (bio-boerderij) | 0476 53 79 38 |
| Liesbeth (zorg-boerderij) | 0486 02 98 11 |
| Facebook | https://www.facebook.com/tkleinhof/ |
| Certificering | Bio-gecertificeerd door TÜV Nord Integra (akkerbouwpercelen, weides, kippen, koeien) |

## 4. Bronnen die gebruikt zijn
- **Huidige live site kleinhof.be** draait op GoHighLevel en is door EMLaunchpad gebouwd. De teksten van Home, Visie en Bio-boerderij zijn daarvan overgenomen.
  - Menu van de live site: Home, Visie en verhaal, Reserveren, Zorg-Boerderij, Bio-Boerderij, Contact.
  - In de footer staan nog links naar /eieren, /aardappelen, /vleesverkoop, /groenten-en-fruit, /updates, /faq en /zorgboerderij. Die pagina's waren op 9 oktober 2026 **leeg** (er stond geen inhoud op).
  - Lettertypes van de live site: Fraunces (titels) en Nunito Sans (tekst).
- **Oude Drupal-site** (www.kleinhof.be/sites/default/…, thema "barley", lettertype Sue Ellen Francisco). Daaruit komen de akkerbouwtekst, de uitleg over spelt, de voedingstabel en 4 foto's.
- **Eerdere versies** in `Websites/EMLaunchpad/kleinhof/`:
  - een eerste site uit augustus 2026 (index, visie, bio-boerderij, reserveren, contact, privacy). Het adres, de telefoonnummers en de privacytekst komen daarvandaan.
  - `export/` met exacte kopieën van de oude pagina's bio-boerderij en de-akkerbouw (september 2026), inclusief de map `afbeeldingen`.

## 5. Reserveringssysteem
- Het is een **aparte app**: `https://bio-reservering.vibepreview.app`. Die zit op de live site in een Custom Code-blok in GHL.
- De app beheert zelf de producten, prijzen, live voorraad en de reservaties. Er is geen online betaling: de klant betaalt bij afhaling.
- De app stuurt een bericht `kleinhof:resize` met de hoogte. De pagina past de hoogte van de iframe daarop aan (zie `scripts.js`).
- Originele embedcode van de live site:
  ```html
  <iframe id="kleinhof" src="https://bio-reservering.vibepreview.app" width="100%"
    style="border:0; display:block;" scrolling="no" loading="lazy"></iframe>
  <script>
    window.addEventListener('message', function (e) {
      var d = e.data || {};
      if (d.type === 'kleinhof:resize') {
        var f = document.getElementById('kleinhof');
        if (f) f.style.height = d.height + 'px';
      }
    });
  </script>
  ```
- Aanbod in de app op 9 oktober 2026 (ter info, de app is de bron):
  - Pakket Rundsvlees (6 tot 10 kg): 18,00 EUR/kg. Bevat biefstuk, entrecote, stoofvlees, gemengd gehakt, hamburger, worst, kotelet, varkenslapjes, spek, gebraad en leverpaté. Er is ook een wachtlijst; de volgende afhaaldag voor rundsvlees was eind november.
  - Bio weide-eieren: 10 stuks 5,00 EUR, 6 stuks 3,00 EUR.
  - Bio aardappel Alouette (rood) en Nicola (wit): 5,00 EUR per zakje van 3 kg.
  - Bio ajuin Red Baron (rood) en Sturon (wit): 5,00 EUR per zakje van 2 kg.
- Getest: de app laadt en schaalt mee op een gewone pagina (localhost). In een dubbele iframe vanaf een lokaal bestand laadde hij niet. Controleer na het online zetten of hij goed laadt op het Cloudflare-adres.

## 6. Afbeeldingen
Al in de GHL-mediabibliotheek (de links werken overal):
- Logo (groen vierkant met bij, "'t Kleinhof Vechmaal"): `https://assets.cdn.filesafe.space/ZgvefHL6tlfdRaNGLqdD/media/694a73c4a6b40253f5b23d27.png`
- Herofoto (veld met grasaren, 1920x600): `https://assets.cdn.filesafe.space/ZgvefHL6tlfdRaNGLqdD/media/6a88b6cd3556614796dc6c4f.jpg`
- Liesbeth & Gert bij de kippenwagen: `https://assets.cdn.filesafe.space/ZgvefHL6tlfdRaNGLqdD/media/52459343-5302-4f97-ac52-d328e1867f45.jpg`

In de map `afbeeldingen/` (van de oude site, 830x500): `hooien.jpg`, `ploegen.jpg`, `aardappelen-rooien.jpg`, `spelt.jpg`. Daarnaast staan er lokale kopieën van de drie foto's hierboven: `logo.png`, `veld-hero.jpg`, `liesbeth-gert.jpg`.

**Fotogalerij op Bio-boerderij (11/10/2026):** bij de zes onderwerpen (koeien, varkens, hoogstamweide, bijen, moestuin, aardappelen) staan een klein fotootje en "Bekijk foto's". Een klik opent een rustig fotovenster (`<dialog>` in `scripts.js`: vorige/volgende, pijltjes, Esc, vegen); zonder JS toont de link de fotolijst (`#fotos-…`, via `:target`). De foto's staan in `afbeeldingen/galerij/` (`<onderwerp>-N.webp` + `-klein.webp`) en komen uit de GHL-mediabibliotheek van T'Kleinhof: de foto's van de oude Drupal-subpagina's (/de-koeien, /de-varkens, …; welke foto bij welke pagina hoorde, gecontroleerd via de Wayback Machine) plus 3 foto's uit de oude Mailchimp-nieuwsbrief. Ze zijn maar 830x500 (één 2048 breed): grotere originelen zijn er niet. De hoogstamweide heeft maar 1 foto.

**Ontbreekt nog:** meer en grotere foto's (vooral hoogstamweide en de Bio-kast). Vraag ze aan Liesbeth & Gert.

## 7. Ontwerp: wat er gebeurd is
1. **Versie 1 (afgekeurd):** modern met afgeronde kaartjes met icoontjes, genummerde tegels, groene schuine woorden in de titels, een draaiende stempel "Biologisch gecertificeerd", een schuivende productband, pill-knoppen en donkere blokken. Martijn vond dat **"te AI"** en wilde iets natuurlijkers.
2. **Versie 2 (huidige):** rustig en ambachtelijk, zoals een boerderijkrantje.
   - Foto's in de hoofdrol, met handgeschreven onderschriften (Sue Ellen Francisco, het lettertype van het logo).
   - Gewone tekstkolommen en dunne lijnen tussen onderwerpen; rechte knoppen (3px hoeken).
   - Kleuren: papier `#f6f2e9`, band `#ece6d8`, tekst `#34302a`, titels `#2b261f`, knoppen gedempt bladgroen `#56722a`, logo-groen `#8cc63f` alleen als klein accent, footer `#2f3426`.
   - Lettertypes: Fraunces 400/500 (titels), Nunito Sans 400/600/700 (tekst), Sue Ellen Francisco (handschrift).
   - Visie en verhaal leest als een brief, met de handtekening "Liesbeth & Gert".
   - **Vermijden** bij verdere aanpassingen: kaartjes met icoontjes, nummering 01/02, gekleurde schuine woorden, schaduwen, animaties en andere decoratie.

## 8. Pagina's en opbouw
- `index.html` is de basis: daar staan de header (menu) en de footer.
- De subpagina's worden gemaakt met `_bouw/build.py`:
  - de inhoud per pagina staat in `_bouw/pages/<naam>.html` (bovenaan TITLE en DESC, dan `---`, dan de HTML voor binnen `<main>`)
  - het script zet de header en footer van `index.html` eromheen.
  - Werkwijze: menu of footer aanpassen in `index.html` → `python _bouw/build.py` draaien. Pas inhoud van een subpagina aan in `_bouw/pages/`, **niet** rechtstreeks in de html-bestanden in de hoofdmap (die worden overschreven).
- Zorg-boerderij heeft geen eigen pagina (er bestaat geen inhoud voor). Het is een blok op de homepage (`index.html#zorg-boerderij`) met het nummer van Liesbeth.
- Het nieuwsbrief- en contactformulier zijn **demo's**: ze controleren de velden, maar versturen niets. Koppel ze nog aan een GHL-formulier (embedcode) of een andere formulierdienst.
- De contactpagina gebruikt een Google Maps-iframe van Brugstraat 2a, 3870 Vechmaal.

## 9. Online zetten via Cloudflare Pages
1. Cloudflare dashboard → *Workers & Pages* → *Create* → *Pages* → *Connect to Git*.
2. Kies de repository `EMLaunchpad-Demo/Kleinhof`, branch `main`.
3. Build-instellingen: framework preset *None*, build command **leeg**, build output directory `/`.
4. Na de deploy: controleer of het reserveringssysteem laadt en schaalt.
5. Eigen domein (bv. kleinhof.be) koppelen via *Custom domains*. Let op: kleinhof.be wijst nu naar GoHighLevel. Een domein omzetten haalt de huidige site offline, dus spreek dat eerst af met de klant.
- Cloudflare Pages serveert alle bestanden uit de repository. `_bouw/`, `LEESMIJ.md` en dit bestand staan dan ook online; daar staat geen geheime informatie in. Wil je dat niet, laat die map dan buiten de repository.

## 10. Lokaal bekijken en testen
- In `Business/Claude/.claude/launch.json` staat een testserver "kleinhof": `python -m http.server 8737 --directory Websites/Kleinhof` → http://localhost:8737
- Of gewoon `index.html` openen in de browser (het reserveringssysteem werkt het best via een server).
- Screenshots maken zonder browserpaneel:
  `"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless=new --hide-scrollbars --window-size=1440,3600 --virtual-time-budget=8000 --screenshot=uit.png http://localhost:8737/index.html`
  Voor mobiel werkt `--window-size=390,...` niet goed (Edge headless heeft een minimale breedte); zet de pagina dan in een iframe van 390px breed.

## 11. Openstaande punten
- [ ] Cloudflare Pages koppelen en het reserveringssysteem daar testen.
- [ ] Formulieren (nieuwsbrief, contact) koppelen aan een echte dienst.
- [ ] Extra foto's van de boerderij vragen aan Liesbeth & Gert (vooral hoogstamweide en Bio-kast; liefst groter dan 830 px).
- [ ] Beslissen of de zorg-boerderij een eigen pagina krijgt (tekst nodig van Liesbeth).
- [ ] Beslissen wat er met de lege pagina's van de live site gebeurt (eieren, aardappelen, vleesverkoop, groenten en fruit, updates, FAQ). In de nieuwe footer verwijzen de productlinks naar de reserveringspagina.
- [ ] Afspreken wanneer het domein kleinhof.be overgaat van GHL naar Cloudflare.

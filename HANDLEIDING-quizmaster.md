# Handleiding — De Grote Freymannshof Pubquiz

## De bestanden

| Bestand | Waarvoor |
|---|---|
| `Pubquiz-Ardennen-2026.html` | **Het echte deck.** Open in Chrome, `F` voor volledig scherm. Hier zitten Street View en de fragmenten live in de slide. |
| `Pubquiz-Ardennen-2026.pptx` | Back-up voor als de laptop, het wifi of jij het niet meer trekt. Zelfde 84 slides; Street View en fragmenten zijn hier klikbare links in plaats van live beeld. Antwoorden staan in de speakernotes. |
| `Pubquiz-Scoreblad.xlsx` | Drie tabbladen: **Antwoordblad** (printen, 1 per team), **Scoretelling** (telt automatisch op en rangschikt), **Antwoorden** (alleen voor jou). |

## Besturing van het HTML-deck

| Toets | Doet |
|---|---|
| `→` / spatie / klik | volgende slide |
| `←` | terug |
| `A` | antwoord tonen/verbergen (alleen voor jouw ogen — zet het niet op de beamer) |
| `T` | timer van 60 seconden starten |
| `O` | overzicht van alle slides, om te springen |
| `F` | volledig scherm |

## Wat je nog moet doen (± 20 minuten)

### 1. Muziek- en filmfragmenten invullen

Open het HTML-bestand in Kladblok of VS Code. Bovenaan staat een blok `const QUIZ = {`. Zoek per fragment het veld `url:` en zet daar een YouTube-link in:

```js
{v:"Fragment 1 — artiest én titel?", a:"Nirvana — Smells Like Teen Spirit (1991)",
 url:"https://www.youtube.com/watch?v=xxxxxxxxxxx&t=42", start:0, duur:20},
```

- Rechtsklik op een YouTube-video → **"Video-URL kopiëren op huidige tijd"** — dan pakt het deck automatisch het juiste startpunt.
- `duur` = hoeveel seconden het fragment loopt; daarna stopt het zelf.
- Laat je `url` leeg? Dan toont de slide een zoekknop naar YouTube. Werkt ook, maar minder soepel.
- Bij de muziekronde blijft het beeld bedekt door een draaiende plaat — alleen geluid. Bij de filmronde is het beeld zichtbaar met de titelbalk afgeplakt.
- **De vier filmfragmenten zijn suggesties** (Gladiator, Pulp Fiction, New Kids Turbo, LOTR). Vervang ze door wat jullie leuker vinden — pas dan ook het `a:` veld aan, want dat is het antwoord op de nakijksheet.

### 2. Street View-locaties (optioneel)

De acht locaties staan er al in. Wil je er een wisselen: rechtsklik in Google Maps op de plek, kopieer de coördinaten, en zet ze in `lat:` en `lng:`. `heading:` is de kijkrichting in graden (0 = noord).

### 3. Teamnamen

Onderaan de config staat `teams: [...]`. Vul de namen in voor de eindstand-slide, of laat leeg en schrijf ze met een stift op een flipover.

### 4. Testen

Klik één keer het hele deck door met internet aan. Street View-tegels en YouTube laden pas als de slide in beeld komt.

## Draaiboek — ± 2 uur

| Tijd | Onderdeel |
|---|---|
| 0:00 | Welkom, teams vormen, spelregels (slide 2) |
| 0:08 | Ronde 1 — Van Hengelo naar het Hoge Venen |
| 0:18 | Ronde 2 — Muziek |
| 0:30 | **Bladen wisselen + nakijksheet 1** |
| 0:38 | Ronde 3 — Film & Series |
| 0:50 | Ronde 4 — Street View |
| 1:03 | **Nakijksheet 2** |
| 1:11 | Ronde 5 — Twente & Hengelo |
| 1:20 | Ronde 6 — Bier & België |
| 1:30 | **Nakijksheet 3** |
| 1:38 | Ronde 7 — De Onmogelijke Ronde |
| 1:50 | Ronde 8 — Alles of Niets (inzetronde) |
| 2:02 | **Nakijksheet 4** + eindstand |

Reken op ± 1 minuut per vraag, iets meer bij Street View. Loopt het uit: schrap ronde 3 of kort de nakijkmomenten in.

## Puntentelling

- 1 punt per goed antwoord. 64 vragen totaal.
- Waar het antwoord uit twee delen bestaat (bijvoorbeeld Botrange + hoogte, of Vianden + land) staat de verdeling in de toelichting op de nakijksheet.
- **Ronde 8 is een inzetronde.** Teams zetten per vraag vooraf 1, 2 of 3 punten in. Goed = erbij, fout = eraf. Vraag ze de inzet op te schrijven *voordat* je de vraag voorleest, anders werkt het niet.
- Bij schattingsvragen wint het team dat er het dichtst bij zit; marges staan op de nakijksheet.
- Gelijke stand? Slotvraag 8 van ronde 8: het aantal gereden kilometers.

## Kleine dingen die het beter maken

- Zet de nakijksheet op de beamer en laat teams elkaars blad nakijken. Dat levert het hardste gemopper op.
- Ronde 7 is bewust onmogelijk. Zeg dat vooraf, dan wordt het leuk in plaats van deprimerend.
- Prijs voor de laatste plaats werkt beter dan een prijs voor de eerste.
- Ronde 4 (Street View) kun je ook op één laptop laten rondgaan zodat teams zelf mogen rondkijken. Kost tijd, levert veel op.

# Interrail 2026

En mobilvenlig og installerbar rejseapp bygget specifikt til **Ronny og Jolantas Interrail-rejse i 2026**.

## Formål

Appen samler hele rejseplanen fra **Snekkersten** via **Kraków**, **Wien**, **Alperne** og **Antwerpen** og tilbage til Snekkersten. Den er lavet til hurtig brug på mobilen under rejsen og fungerer også på tablet og computer.

## Live app

Når GitHub Pages er aktiveret, findes appen på:

`https://ronnykisbye.github.io/Interrail/`

## Funktioner i version 1.0

- Mobilvenligt dashboard
- Automatisk visning af den relevante rejsedag
- Dag-for-dag-tidslinje
- Interaktivt OpenStreetMap-kort med hele ruten
- Særskilte farver for dagtog, nattog og panoramabaner
- Officielle links til togoperatører og stationer
- Lys og mørk tilstand
- PWA-installation på mobil og computer
- Offline-cache af appens vigtigste filer
- Tydelig markering af oplysninger, der endnu afventer booking eller endelig køreplan

## Ruten

Snekkersten → København Syd → Berlin → Kraków → Wien → Innsbruck → Chur → St. Moritz → Tirano → Milano → Montreux → Interlaken → Antwerpen → Bruxelles → Hamborg → København → Snekkersten.

## Sådan bruges appen

### Overblik
Viser næste eller aktuelle etape, nedtælling og hurtig adgang til de vigtigste funktioner.

### Rejse
Viser dagens rute, status, overnatning og alle dagens trin i kronologisk rækkefølge.

### Kort
Viser hele rejsen på et interaktivt kort. Grøn er dagtog, blå er nattog og orange er panoramabaner.

### Links
Åbner de officielle sider for DSB, Snälltåget, DB, PKP, ÖBB, SBB, RhB, Trenord, GoldenPass, Belgian Train, European Sleeper og Interrail.

### Om
Forklarer appens formål og principper. Perron-, sæde- og tognumre vises ikke som faste, før de er dokumenteret.

## Installation på mobil

### Android / Chrome
1. Åbn appens GitHub Pages-link.
2. Tryk på browsermenuen.
3. Vælg **Installer app** eller **Føj til startskærm**.

### iPhone / Safari
1. Åbn appens GitHub Pages-link.
2. Tryk på Del-knappen.
3. Vælg **Føj til hjemmeskærm**.

## Projektstruktur

```text
Interrail/
├── index.html
├── styles.css
├── app.js
├── manifest.webmanifest
├── service-worker.js
├── README.md
├── assets/
│   └── icon.svg
└── data/
    ├── itinerary.json
    └── links.json
```

## Opdatering af rejseplanen

Rejsedata ligger i `data/itinerary.json`. Hver dag indeholder:

- dato
- titel
- overnatning
- status
- kort beskrivelse
- dagens hændelser med tid, titel og detaljer

Officielle links ligger i `data/links.json`.

## Datakvalitet

Appen skelner mellem:

- **Bekræftet**: dokumenteret hovedforløb eller offentlig køreplan
- **Rute låst**: ruten er valgt, men præcis afgang afventer
- **Afventer**: tognummer, perron, sæde eller endeligt klokkeslæt skal kontrolleres senere

Der indsættes ikke opdigtede perron- eller pladsnumre.

## Offline

Ved første besøg gemmer appens service worker de vigtigste appfiler. Derefter kan rejseplan, links og grundkortvisningen åbnes uden stabil internetforbindelse. Selve OpenStreetMap-kortfliser kræver internet, medmindre de tidligere er blevet cachet af browseren.

## Version

**1.0.0** – Første komplette, fungerende udgave med dashboard, tidslinje, rutekort, officielle links, PWA og offline-cache.

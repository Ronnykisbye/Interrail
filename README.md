# Rejser

En mobilvenlig og installerbar rejseapp, som samler flere rejser i én fælles hub.

Live app:
`https://ronnykisbye.github.io/Interrail/`

## Aktive rejser

1. **Antwerpen 2026** – bilrejse med Ford Mustang Mach-E, hoteller, rute, miljøzoner, opladning og nyttige links.
2. **Interrail mod Istanbul** – foreløbig rute via bl.a. Kraków, Bratislava, Budapest, București og Sofia.
3. **Skiferie 2027** – uge 5, 30. januar–6. februar 2027, 4 voksne, med fokus på Sestriere i Italien.

Der er desuden 3 reservepladser til kommende rejser.

## Skiferie 2027

Skiferien har sit eget modul:
- `ski-2027.html` – visning inde fra hovedappen
- `ski-2027-delt.html` – delt visning uden navigation til de øvrige rejser
- `ski-2027.css` – design
- `ski-2027.js` – rendering og links
- `data/ski-2027.json` – rejseplan, priser, Nortlander-info og informationslinks

Delt ski-link:
`https://ronnykisbye.github.io/Interrail/ski-2027-delt.html`

Den delte side er lavet til familie/børn og viser kun skiferien. Den har `noindex,nofollow,noarchive`, men GitHub Pages er stadig teknisk offentlig hosting, så dette er praktisk begrænset adgang og ikke stærk autentificering.

### Aktuel skiplan
- 4 voksne
- 30. januar–6. februar 2027
- fly fra København
- ski-in/ski-out eller helst maks. 300–500 m til lift/piste
- mindst 2 separate soveværelser
- Sestriere er aktuelt eneste destination i appen
- dokumenteret pakke: 8.945 kr. pr. person / 35.780 kr. for 4, inkl. fly fra København og 6 dages liftkort, før transfer, skiudstyr og ekstra bagage

### Nortlander-info
- skitransport: 599 kr. pr. person i den aktuelle bookingvisning
- maks. 12 kg pr. skitransport, angivet som skitaske + støvlepose
- 5 kg håndbagage + 10 kg indchecket bagage pr. person inkluderet
- ekstra indchecket bagage fra 149 kr. pr. person
- sædevalg fra 25 kr. pr. person
- ved 2 egne skisæt budgetteres foreløbigt med 1.198 kr. i skitransport

Den konkrete booking/rejsebevis har altid forrang, fordi priser og regler kan ændre sig.

### Information i ski-appen
Der er en særskilt **Information**-sektion med bl.a.:
- YouTube-video om skiferien
- ekstra YouTube-video om Sestriere
- Slopestar snestatistik for Sestriere
- Skisport.dk pistekort for Sestriere

Derudover findes en sektion med nyttige links til Via Lattea, Skisport.dk, Nortlander, Slopestar, SAS og Norwegian.

## Projektstruktur

```text
Interrail/
├── index.html
├── hub.css
├── hub.js
├── manifest.webmanifest
├── service-worker.js
├── MASTER_PROMPT.md
├── README.md
├── antwerpen.html
├── antwerpen.css
├── antwerpen.js
├── interrail-istanbul.html
├── interrail-istanbul.css
├── interrail-istanbul.js
├── ski-2027.html
├── ski-2027-delt.html
├── ski-2027.css
├── ski-2027.js
├── interrail.html
├── styles.css
├── app.js
├── install.js
├── assets/
└── data/
    ├── trips.json
    ├── antwerpen.json
    ├── interrail-istanbul.json
    ├── ski-2027.json
    ├── itinerary.json
    ├── hotels.json
    └── links.json
```

## Udviklingsprincip

**Én fil = ét tydeligt ansvar.**

- data i JSON
- udseende i CSS
- funktioner i JavaScript
- større rejser i egne HTML-moduler

GitHub er source of truth. Før ændringer hentes den aktuelle fil og SHA. Efter ændringer kvalitetssikres struktur, navigation, JSON, links, PWA-cache og at følsomme oplysninger ikke er offentliggjort.

## Installation

### iPhone / Safari
1. Åbn det ønskede app-link i Safari.
2. Tryk på Del-knappen.
3. Vælg **Føj til hjemmeskærm**.
4. Vælg navn og tryk **Tilføj**.

### Android / Chrome
1. Åbn app-linket.
2. Tryk på browsermenuen.
3. Vælg **Installer app** eller **Føj til startskærm**.

## Sikkerhed og privatliv

Bookingreferencer, ansøgningsnumre, e-mail, telefonnumre, adresser, betalingskortdata og andre følsomme oplysninger må ikke lægges i de offentlige HTML-, JavaScript- eller JSON-filer.

## Status

Projektet er i aktiv udvikling. Antwerpen, Interrail Istanbul og Skiferie 2027 er aktive moduler, mens den tidligere Interrail-app fortsat er bevaret separat for at undgå at ødelægge fungerende funktioner.

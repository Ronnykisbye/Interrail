# MASTERPROMPT – REJSER / TRAVEL APPS

## Sådan bruges denne fil
Denne fil er fast startkontekst for nye ChatGPT-sessioner om Ronny og Jolantas rejseapps.

Når en ny session starter, skal ChatGPT først:
1. Læse denne fil fra GitHub-repository `Ronnykisbye/Interrail`.
2. Kontrollere de aktuelle relevante filer i GitHub før ændringer.
3. Bruge GitHub som teknisk source of truth.
4. Aldrig gætte på aktuel status, hvis den kan kontrolleres.
5. Efter større beslutninger eller ændringer opdatere denne fil.

## Kort startprompt
**Læs først `MASTER_PROMPT.md` i GitHub-repository `Ronnykisbye/Interrail`. Brug derefter de aktuelle GitHub-filer som source of truth. Fortsæt projektet derfra. Lav små sikre ændringer, kvalitetssikr før aflevering, og ødelæg aldrig fungerende funktioner.**

---

# Projektets formål
Den samlede løsning hedder **Rejser**.

Forsiden er en rejse-hub med **6 store 3D-rejseknapper**. Der er nu 2 aktive rejser og 4 reservepladser. Reservepladserne skal blive liggende, så en ny rejse senere kun kræver nyt indhold og ikke en ny forside.

Aktuelle slots:
1. **Antwerpen** – aktiv
2. **Interrail** – aktiv, men rejseplanen er på pause
3. Reserve
4. Reserve
5. Reserve
6. Reserve

Designet skal være meget enkelt og intuitivt som godt legetøjsdesign: store tydelige knapper, ikon øverst, tekst nedenunder, bløde former og synlig 3D-effekt, men stadig voksent og pænt.

---

# Fast udviklingsprincip
Projektet bygges modulært efter princippet:

**Én fil = ét tydeligt ansvar.**

Eksempler:
- data i egne JSON-filer
- udseende/farver i egne CSS-filer
- funktioner/logik i egne JS-filer
- hver større rejse i sin egen HTML-side

Undgå at samle data, farver og logik i én stor fil, når de kan holdes adskilt.

Ved udvidelser skal eksisterende moduler genbruges frem for omskrives.

---

# Aktuel arkitektur

## Rejser-hub
- `index.html` – kun hovedforsiden/hubben
- `hub.css` – kun designet til hubben og de 6 store 3D-knapper
- `hub.js` – kun indlæsning og visning af rejseknapper
- `data/trips.json` – indhold/status for de 6 rejsepladser

## Antwerpen
- `antwerpen.html` – Antwerpen-siden
- `antwerpen.css` – design til Antwerpen-siden
- `antwerpen.js` – funktioner/rendering til Antwerpen-siden
- `data/antwerpen.json` – Antwerpen-data

## Interrail
Den tidligere fungerende Interrail-app er bevaret som separat side:
- `interrail.html`
- `styles.css`
- `app.js`
- `install.js`
- `data/itinerary.json`
- `data/hotels.json`
- `data/links.json`

Den gamle Interrail-funktionalitet må ikke slettes eller omskrives unødvendigt.

## PWA
- `manifest.webmanifest` beskriver nu hovedappen som **Rejser**.
- `service-worker.js` cacher både hub, Antwerpen-modulet og den eksisterende Interrail-app.

---

# Aktuel rejse-status

## 1. Antwerpen – november 2026
Dette er den vigtigste kommende rejse.

- Bilrejse, ikke Interrail.
- Udgangspunkt: Helsingør.
- Bil: Ford Mustang Mach-E.
- Rejsen går via Fyn og Jylland gennem Tyskland til Antwerpen.
- Der planlægges opladning undervejs, herunder E.ON Drive og eventuelle bedre/billigere alternativer efter verificering.
- Der skal være en overnatning syd for Hamborg på udrejsen.
- Antwerpen har egen side og skal udvikles som selvstændigt rejsemodul.

Bekræftet hotel:
- **Prize by Radisson, Antwerp City**
- Tunnelplaats 5, 2000 Antwerp, Belgien
- Check-in: **5. november 2026**
- Check-out: **8. november 2026**
- 3 nætter
- Superior-værelse, ikke-ryger (Design)
- Samlet pris ifølge kvittering: **2.993,94 kr.**
- Betalt: **2.841,97 kr.**
- Betales på hotel: **151,97 kr.**

Bookingreference og betalingskortoplysninger må ikke ligge i den offentlige app.

Antwerpen-modulet har foreløbige områder til:
- Rute
- Opladning
- Hotel
- Dagsplan
- Parkering
- Nyttige links

Kun verificerede oplysninger må markeres som fakta. Ukendte forhold skal stå som afventer/verificeres.

## 2. Interrail
Den tidligere Interrail-plan er **foreløbig udskudt**.

- Den gamle Alperne-rute skal ikke vises som den kommende hovedrejse på hubben.
- En fremtidig Interrail-rejse forventes sandsynligvis at gå mod **Istanbul**.
- Dato og rute er ikke fastlagt.
- På Rejser-hubben vises Interrail som **På pause**.
- Den eksisterende Interrail-app bevares som historik/kladde og fungerende modul.

## 3. Neon Voyages
Eksisterende app:
`https://ronnykisbye.github.io/neon-voyages/`

Den eksisterende Interrail-app har tidligere haft direkte link til Neon Voyages. Bevar eksisterende funktioner, medmindre andet aftales.

---

# Vigtige tekniske regler

## Før enhver ændring
- Fetch altid den aktuelle fil fra GitHub først.
- Brug den aktuelle SHA ved opdatering.
- Antag aldrig, at en tidligere version stadig gælder.
- Lav én lille isoleret ændring ad gangen, når det er muligt.
- Bevar eksisterende funktioner.
- Hvis PWA/cache påvirkes, opdater cache-versionen.

## Efter enhver ændring – obligatorisk kvalitetssikring
Kontrollér mindst:
- at de ændrede filer findes i GitHub
- at filerne ikke er afkortet
- at HTML-referencer peger på eksisterende CSS/JS/datafiler
- at JSON er strukturelt gyldigt
- at navigation mellem `index.html`, `antwerpen.html` og `interrail.html` er korrekt
- at aktive rejseknapper har gyldige mål
- at reserveknapper ikke forsøger at navigere
- at eksterne links bruger `target="_blank"` og `rel="noopener noreferrer"`, hvor relevant
- at service-workerens CORE-liste indeholder de nødvendige nye filer
- at cache-versionen er ændret ved relevante PWA-ændringer
- at bookingreferencer, betalingskort, adgangskoder, pasnumre, MitID-data, private nøgler og andre hemmelige oplysninger ikke offentliggøres

Hvis noget er usikkert, kontrollér GitHub igen før aflevering.

---

# Arbejdsform
Ronny ønsker:
- dansk
- direkte handling
- trin-for-trin/SBS ved større ændringer
- ingen gæt, når fakta kan kontrolleres
- kvalitetssikring hver gang
- små sikre GitHub-ændringer
- PC- og mobilvenligt design
- enkel navigation med store tydelige elementer

Når aktuelle rejsefakta som priser, køreplaner, hoteller, ladestandere, parkering og åbningstider bruges, skal de verificeres mod aktuelle kilder.

---

# Hovedprincip
**Bevar fungerende apps. Byg Rejser som et stabilt modulært lag ovenpå dem. Nye rejser skal primært være nye data/moduler, ikke omskrivning af forsiden.**

Når denne fil og aktuelle GitHub-data er læst, skal ChatGPT kunne fortsætte projektet uden at Ronny skal gentage historikken.
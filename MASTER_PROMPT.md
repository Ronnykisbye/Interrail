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

Forsiden er en rejse-hub med **6 store 3D-rejseknapper**. Der er nu 3 aktive rejser og 3 reservepladser. Reservepladserne skal blive liggende, så en ny rejse senere kun kræver nyt indhold og ikke en ny forside.

Aktuelle slots:
1. **Antwerpen** – aktiv
2. **Interrail** – aktiv plan mod Istanbul, dato ikke fastlagt
3. **Skiferie 2027** – aktiv planlægning, uge 5, Italien, Sestriere som foreløbig kandidat
4. Reserve
5. Reserve
6. Reserve

Designet skal være enkelt og intuitivt som godt legetøjsdesign: store tydelige knapper, ikon øverst, tekst nedenunder, bløde former og synlig 3D-effekt, men stadig voksent og pænt.

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
- `hub.css` – design til hubben og de 6 store 3D-knapper
- `hub.js` – indlæsning og visning af rejseknapper
- `data/trips.json` – indhold/status for de 6 rejsepladser

## Antwerpen
- `antwerpen.html`
- `antwerpen.css`
- `antwerpen.js`
- `data/antwerpen.json`

## Ny Interrail-plan mod Istanbul
- `interrail-istanbul.html` – den aktive foreløbige Istanbul-plan
- `interrail-istanbul.css` – design
- `interrail-istanbul.js` – rendering/funktion
- `data/interrail-istanbul.json` – rute, ophold, status og officielle kilder

## Skiferie 2027
- `ski-2027.html` – aktiv side for skiferieplanen
- `ski-2027-delt.html` – delt skiferievisning uden navigation til de øvrige rejser
- `ski-2027.css` – design
- `ski-2027.js` – rendering/funktion
- `data/ski-2027.json` – foreløbig plan og status

## Tidligere Interrail-app
Den tidligere fungerende Alperne-version er stadig bevaret separat:
- `interrail.html`
- `styles.css`
- `app.js`
- `install.js`
- `data/itinerary.json`
- `data/hotels.json`
- `data/links.json`

Den gamle funktionalitet må ikke slettes eller omskrives unødvendigt.

## PWA
- `manifest.webmanifest` beskriver hovedappen som **Rejser**.
- `service-worker.js` cacher hub, Antwerpen, den nye Istanbul-plan, Skiferie 2027, den delte skiferievisning og den gamle Interrail-side.

---

# Adgangsmodel

Målet er:
- Ronny og Jolanta bruger hovedappen og kan se alle rejser.
- Børn/familie kan få et direkte link til `ski-2027-delt.html`, som kun viser skiferien og ikke har navigation tilbage til hovedappen.
- Den delte side har `noindex,nofollow,noarchive`, så den ikke bør indekseres af søgemaskiner.
- GitHub Pages er stadig teknisk offentlig hosting. En direkte delt URL er derfor praktisk begrænset adgang, men ikke stærk autentificering.
- Følsomme oplysninger må ikke lægges i offentlige HTML/JS/JSON-filer.
- Hvis der senere ønskes reel lukket adgang til hovedappen, skal der bruges et eksternt autentificerings-/access-lag foran siden.

---

# Aktuel rejse-status

## 1. Antwerpen – november 2026
Dette er den vigtigste kommende rejse.

- Bilrejse, ikke Interrail.
- Udgangspunkt: Helsingør.
- Bil: Ford Mustang Mach-E.
- Rejsen går via Fyn og Jylland gennem Tyskland til Antwerpen.
- Der planlægges opladning undervejs, herunder E.ON Drive og eventuelle bedre/billigere alternativer efter verificering.
- Antwerpen har egen side og udvikles som selvstændigt rejsemodul.

Tilladelser og miljøzoner:
- Antwerpen LEZ-ansøgning er indsendt **26. august 2026** og afventer behandling.
- Grøn tysk **Umweltplakette** er bestilt hos **FDM 26. august 2026** til Ford Mustang Mach-E.
- Pris for Umweltplakette: **200 kr. + 45 kr. fragt = 245 kr.**
- Ordrenumre, ansøgningsnumre, e-mail og andre personlige oplysninger må ikke ligge i den offentlige app.

Udrejse:
- Bekræftet hotelophold i **Jesteburg** fra **3. november 2026** til **5. november 2026**.
- Hotel: **Hotel Heideblick an der Lüneburger Heide**.
- Adresse: **Itzenbütteler Straße 35, 21266 Jesteburg, Tyskland**.
- Check-in: **3. november 2026 kl. 15:00**.
- Check-out: **5. november 2026 kl. 11:00**.
- 2 nætter.
- Economy-dobbeltværelse.
- Screenshot fra Hotels.com viser bl.a. gratis Wi‑Fi, gratis selvstændig parkering, motionscenter og døgnåben reception.
- Der køres videre til Antwerpen den **5. november 2026**.

Bekræftet hotel i Antwerpen:
- **Prize by Radisson, Antwerp City**
- Tunnelplaats 5, 2000 Antwerp, Belgien
- Check-in: **5. november 2026**
- Check-out: **8. november 2026**
- 3 nætter
- Superior-værelse, ikke-ryger (Design)
- Samlet pris ifølge kvittering: **2.993,94 kr.**
- Betalt: **2.841,97 kr.**
- Betales på hotel: **151,97 kr.**

Hjemrejse:
- Afgang fra Antwerpen **8. november 2026**.
- **Bremen er hovedmuligheden**: Best Western Hotel Zur Post, Bahnhofsplatz 11, 28195 Bremen.
- Check-in Bremen: **8. november 2026 kl. 15:00**.
- Check-out Bremen: **9. november 2026 kl. 12:00**.
- 1 nat.
- **Kiel er booket som alternativ på samme dato**: Hotel Consul, Walkerdamm 11, 24103 Kiel.
- Check-in Kiel: **8. november 2026 kl. 15:00**.
- Check-out Kiel: **9. november 2026 kl. 11:00**.
- Hotel Consul skal vises som alternativ, ikke som erstatning for Bremen, indtil der træffes et valg.

Bookingreferencer, e-mail og betalingskortoplysninger må ikke ligge i den offentlige app.

## 2. Interrail – Istanbul
Ny foreløbig hovedplan:

- Start: Snekkersten.
- Første lange stræk tænkes via København Syd og nattog mod Berlin, når den valgte dato understøtter det.
- Videre til **Kraków**, hvor planen er **4 nætter**.
- Derefter ønskes ruten via **Bratislava**.
- Foreløbig korridor videre: Bratislava → Budapest → București → Sofia → Istanbul/Halkalı.
- I **Istanbul planlægges 7 nætter**.
- Hjemrejsen går foreløbigt tilbage gennem samme centrale korridor mod Danmark.
- Rejsedatoen er **ikke fastlagt**, derfor må eksakte tognumre, klokkeslæt, priser og reservationer ikke fremstilles som låste fakta endnu.

## 3. Skiferie – uge 5, 2027
Aktiv planlægning i rejseplads 3.

- Uge 5, 2027.
- Italien prioriteres.
- **Sestriere er foreløbig kandidat**, men destinationen er ikke låst.
- Der skal arbejdes videre med fly fra København, transfer, hotel/lejlighed, liftkort og skileje.
- Overnatning skal som udgangspunkt have **3 rigtige værelser/soveværelser**, ikke kun sovesofa/alkove.
- Nye priser, pakkerejser og konkrete forbindelser skal verificeres før de vises som fakta.

## 4. Neon Voyages
Eksisterende app:
`https://ronnykisbye.github.io/neon-voyages/`

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
- at navigation mellem hub og rejsemoduler er korrekt
- at aktive rejseknapper har gyldige mål
- at reserveknapper ikke forsøger at navigere
- at eksterne links bruger `target="_blank"` og `rel="noopener noreferrer"`, hvor relevant
- at service-workerens CORE-liste indeholder nødvendige nye filer
- at cache-versionen er ændret ved relevante PWA-ændringer
- at følsomme oplysninger ikke offentliggøres
- at rejsefakta med mulighed for ændring er markeret med korrekt status og kilde

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
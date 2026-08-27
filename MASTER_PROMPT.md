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

Forsiden er en rejse-hub med **6 store 3D-rejseknapper**. Der er nu 3 aktive rejser og 3 reservepladser.

Aktuelle slots:
1. **Antwerpen** – aktiv
2. **Interrail** – aktiv plan mod Istanbul, dato ikke fastlagt
3. **Skiferie 2027** – aktiv planlægning, uge 5, Italien, Sestriere som foreløbig prisfavorit og Livigno som stærkt alternativ
4. Reserve
5. Reserve
6. Reserve

Designet skal være enkelt og intuitivt som godt legetøjsdesign: store tydelige knapper, ikon øverst, tekst nedenunder, bløde former og synlig 3D-effekt, men stadig voksent og pænt.

---

# Fast udviklingsprincip
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
- `index.html`
- `hub.css`
- `hub.js`
- `data/trips.json`

## Antwerpen
- `antwerpen.html`
- `antwerpen.css`
- `antwerpen.js`
- `data/antwerpen.json`

## Interrail mod Istanbul
- `interrail-istanbul.html`
- `interrail-istanbul.css`
- `interrail-istanbul.js`
- `data/interrail-istanbul.json`

## Skiferie 2027
- `ski-2027.html` – aktiv side for skiferieplanen
- `ski-2027-delt.html` – delt visning uden navigation til de øvrige rejser
- `ski-2027.css`
- `ski-2027.js`
- `data/ski-2027.json`

## Tidligere Interrail-app
Bevares separat:
- `interrail.html`
- `styles.css`
- `app.js`
- `install.js`
- `data/itinerary.json`
- `data/hotels.json`
- `data/links.json`

## PWA
- `manifest.webmanifest` beskriver hovedappen som **Rejser**.
- `service-worker.js` cacher hub, Antwerpen, Istanbul-planen, Skiferie 2027, den delte skiferievisning og den gamle Interrail-side.

---

# Adgangsmodel
- Ronny og Jolanta bruger hovedappen og kan se alle rejser.
- Børn/familie kan få direkte link til `ski-2027-delt.html`, som kun viser skiferien og ikke har navigation tilbage til hovedappen.
- Den delte side har `noindex,nofollow,noarchive`.
- GitHub Pages er stadig teknisk offentlig hosting; delt link er praktisk begrænsning, ikke stærk autentificering.
- Følsomme oplysninger må ikke ligge i offentlige HTML/JS/JSON-filer.

---

# Aktuel rejse-status

## 1. Antwerpen – november 2026
- Bilrejse fra Helsingør i Ford Mustang Mach-E.
- LEZ-ansøgning til Antwerpen indsendt 26. august 2026 og afventer behandling.
- Tysk Umweltplakette bestilt hos FDM 26. august 2026, 245 kr. inkl. fragt.
- Jesteburg: Hotel Heideblick, 3.–5. november 2026.
- Antwerpen: Prize by Radisson, Antwerp City, 5.–8. november 2026.
- Hjemrejse: Bremen som hovedmulighed 8.–9. november; Kiel som alternativ samme dato.
- Bookingreferencer, e-mail og betalingskortoplysninger må ikke offentliggøres.

## 2. Interrail – Istanbul
- Start Snekkersten via København Syd og nattog mod Berlin, når dato understøtter det.
- Kraków 4 nætter.
- Videre via Bratislava → Budapest → București → Sofia → Istanbul/Halkalı.
- Istanbul planlagt til 7 nætter.
- Dato ikke fastlagt, så tognumre, tider, priser og reservationer må ikke fremstilles som låste fakta.

## 3. Skiferie – uge 5, 2027
Seneste kvalitetssikrede rejseoversigt er dateret 27.08.2026.

Faste krav:
- **4 voksne**.
- Dato: **30. januar – 6. februar 2027**.
- Fly fra København.
- Ski-in/ski-out eller helst maks. 300–500 m til lift/piste.
- Mindst **2 separate soveværelser**.
- Sovefordeling: par i ét værelse; datter + far kan dele det andet.

Sestriere:
- Foreløbig prisfavorit.
- Byhøjde 2.035 m.
- Dokumenteret 7-dages flypakke 30/1 2027: **8.945 kr. pr. person** i 2-værelses lejlighed for 4, inkl. fly fra København og 6 dages liftkort.
- Samlet **35.780 kr. for 4** før transfer, skiudstyr og ekstra bagage.
- Dobbeltværelsesfund: 10.299–10.999 kr. pr. person inkl. fly + 6 dages liftkort.
- Grand Hotel Sestriere standard: 11.195 kr. pr. person inkl. fly + 6 dages liftkort.

Livigno:
- Stærkeste alternativ på beliggenhed/ski-in-ski-out.
- Byhøjde 1.816 m.
- Officiel destination oplyser 115 km pister og 32 lifte.
- Hotel Montivas Lodge: 12.405 kr. pr. person, 30/1 2027, 7 dage, inkl. fly CPH + 6 dages liftkort.
- Standard dobbeltværelse-bureau-fund: 10.799 kr. pr. person.
- 3-værelses lejlighed til maks. 4: 7.495 kr. pr. person ved 4, men med bus og 8 dage fra 29/1.

Bagage og egne ski:
- Nortlander: brug foreløbigt 599 kr. pr. skisæt som budget; endelig bookingpris skal kontrolleres.
- Ved 2 egne skisæt budgetteres 1.198 kr. i skitransport.
- Nortlander standardbagage angivet som 10 kg indchecket + 5 kg håndbagage pr. person.
- Ekstra 5 kg: 149 kr.; ekstra 10 kg: 199 kr. på relevante charterafgange.

Foreløbig anbefaling:
- Arbejd videre med Sestriere først på grund af den dokumenterede 4-personers flypakke til 8.945 kr. pr. person.
- Behold Livigno som stærkt alternativ, især hvis der findes en 2-soveværelses ski-in/ski-out bolig til en pris, der opvejer den dyrere transport/pakke.
- Før booking skal slutprisen indeholde: 4 voksne, 2 separate værelser, fly, transfer, 6 dages liftkort, 2 skisæt som specialbagage, støvle/skitøjstaske, eventuel ekstra kuffert og skileje til dem uden eget udstyr.
- Alle priser og bagageregler kan ændre sig; konkret booking/rejsebevis har altid forrang.

## 4. Neon Voyages
Eksisterende app: `https://ronnykisbye.github.io/neon-voyages/`

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

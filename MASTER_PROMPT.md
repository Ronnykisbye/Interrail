# MASTERPROMPT – REJSER / TRAVEL APPS

## Sådan bruges denne fil
Denne fil er fast startkontekst for nye ChatGPT-sessioner om rejseapps-projektet.

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
3. **Skiferie 2027** – aktiv planlægning, uge 5, Sestriere i Italien
4. Reserve – Athen 2026 er afsluttet og fjernet fra forsiden
5. Reserve
6. Reserve

Designet skal være enkelt og intuitivt: store tydelige knapper, ikon øverst, tekst nedenunder, bløde former og synlig 3D-effekt, men stadig voksent og pænt.

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
- `ski-2027-delt.html` – delt visning uden navigation til øvrige rejser
- `ski-2027.css`
- `ski-2027.js`
- `data/ski-2027.json`

## Athen-viden · arkiv
Selve Athen-rejsen og app-siden er fjernet. Kun genbrugelig, generel Athen-viden bevares:
- `data/athen-2026.json` – generel transport, museer/seværdigheder og seniorinfo; ingen fly eller rejsepersoner
- `data/athen-food.json` – græske specialiteter og konkrete spisesteder
- `data/athen-stay.json` – kun generel Koukaki-/områdeinformation; ingen konkret booking eller boligdata
- `data/athen-practical.json` – taxa, betaling og råd til offentlig transport
- `data/athen-tickets.json` – officielle billet- og transportkilder samt tydeligt markerede tredjepartsalternativer
- `assets/athen-banner.svg` – generelt visuelt materiale

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
- `service-worker.js` cacher hub, Antwerpen, Istanbul-planen, Skiferie 2027, den delte skiferievisning, den gamle Interrail-side samt generelle Athen-datafiler; den afsluttede Athen-app caches ikke længere.

---

# Adgangsmodel
- Hovedappen bruges til alle rejser.
- Familie/børn kan få direkte link til `ski-2027-delt.html`, som kun viser skiferien og ikke har navigation tilbage til hovedappen.
- Den delte side har `noindex,nofollow,noarchive`.
- GitHub Pages er stadig teknisk offentlig hosting; delt link er praktisk begrænsning, ikke stærk autentificering.
- Følsomme oplysninger må ikke ligge i offentlige HTML/JS/JSON-filer.
- Booking-/ordrenumre må ikke lægges i offentlige rejsemoduler.

---

# Aktuel rejse-status

## 1. Antwerpen – november 2026
- Bilrejse fra Helsingør i Ford Mustang Mach-E.
- **Antwerpen LEZ er GODKENDT pr. 1. september 2026.**
- Registreringen gælder fra **26. august 2026** og giver adgang til LEZ i **Antwerpen og Gent**.
- Registreringen gælder **ikke Bruxelles**.
- Slutdatoen er foreløbig ikke fastlagt og kan ændres ved ændringer i LEZ-reglerne; adgang skal derfor kontrolleres igen tættere på rejsen.
- Ansøgningsnummer, nummerplade og øvrige personlige LEZ-oplysninger må ikke gemmes i den offentlige app.
- Tysk Umweltplakette bestilt hos FDM 26. august 2026, 245 kr. inkl. fragt.
- Jesteburg: Hotel Heideblick, 3.–5. november 2026, check-in 3/11 kl. 15:00, check-out 5/11 kl. 11:00.
- Antwerpen: Prize by Radisson, Antwerp City, 5.–8. november 2026, check-in 5/11 kl. 15:00, check-out 8/11 kl. 12:00.
- Kiel: **Garner Hotel Kiel - Akademie by IHG**, 8.–11. november 2026, check-in 8/11 kl. 15:00, check-out 11/11 kl. 12:00. Tidligere Bremen-plan og Hotel Consul er ikke længere del af den aktive rejseplan.
- **A Tribute to Whitney Houston by Glennis Grace**: fredag 6. november 2026 kl. 20:00, Lotto Arena Antwerpen – Merksem (Antwerpen), 2 eTickets. Sæde-/ordreoplysninger og private billetlinks må ikke gemmes offentligt.
- Antwerpen-appen viser rejseforløbet øverst som **fra → til**: 3/11 Helsingør → Jesteburg, 5/11 Jesteburg → Antwerpen, 8/11 Antwerpen → Kiel og 11/11 Kiel → Helsingør.
- Hjemrejsen går nu via Kiel 8.–11. november; Bremen og det tidligere Hotel Consul er fjernet fra aktiv plan.
- Bookingreferencer, e-mail og betalingskortoplysninger må ikke offentliggøres.

## 2. Interrail – Istanbul
- Start Snekkersten via København Syd og nattog mod Berlin, når dato understøtter det.
- Kraków 4 nætter.
- Videre via Bratislava → Budapest → București → Sofia → Istanbul/Halkalı.
- Istanbul planlagt til 7 nætter.
- Dato ikke fastlagt, så tognumre, tider, priser og reservationer må ikke fremstilles som låste fakta.

## 3. Skiferie – uge 5, 2027
Aktuel fokusdestination: **Sestriere**. Livigno er fjernet fra appen og skal ikke længere vises som alternativ.

Faste krav:
- **4 voksne**.
- Dato: **30. januar – 6. februar 2027**.
- Fly fra København.
- Ski-in/ski-out eller helst maks. 300–500 m til lift/piste.
- Mindst **2 separate soveværelser**.
- Sovefordeling: par i ét værelse; datter + far kan dele det andet.

Sestriere – konkrete pakker:
- **Apartment Villaggio Olimpico**: 30/1 2027, 7 dage, fly fra København, 2-værelses lejlighed til 4, 6 dages liftkort, dokumenteret pris **8.945 kr. pr. person / 35.780 kr. for 4** før transfer, skiudstyr og ekstra bagage. Lejlighederne ligger ca. 50 m fra piste/lift.
- **Grand Hotel Sestriere**: 30/1 2027, 7 dage, fly fra København, dobbeltværelse standard, 6 dages liftkort, dokumenteret pris **11.195 kr. pr. person ved 2 personer**. To separate værelser og samlet pris for 4 skal bekræftes.
- Pakkekort i appen må kun være klikbare, når de leder direkte til den konkrete indkvartering/pakke. Generelle destinationslinks må ikke bruges som pakkelinks.
- Øvrige fund uden direkte hotel-/pakkelink vises som information uden klik.

Nortlander og bagage:
- Skitransport vist i booking: **599 kr. pr. person**.
- Maksimal vægt pr. skitransport: **12 kg**, angivet som skitaske + støvlepose.
- Skitransport skal bestilles på forhånd og kan blive udsolgt.
- Inkluderet bagage: **5 kg håndbagage + 10 kg indchecket bagage** pr. person.
- Ekstra indchecket bagage kan tilkøbes fra **149 kr. pr. person**.
- Tidligere Nortlander-info viser ekstra 5 kg til 149 kr. og ekstra 10 kg til 199 kr.; konkret bookingpris har altid forrang.
- Sædevalg i flyet vises fra **25 kr. pr. person**.
- Ved 2 egne skisæt budgetteres foreløbigt med **1.198 kr.** i skitransport.

Før booking skal slutprisen indeholde:
- 4 voksne
- 2 separate værelser
- fly
- transfer
- 6 dages liftkort
- 2 skisæt som specialbagage
- støvle/skitøjstaske
- eventuel ekstra kuffert
- eventuelt sædevalg
- skileje til dem uden eget udstyr

Alle priser og bagageregler kan ændre sig; konkret booking/rejsebevis har altid forrang.

### Information i ski-appen
Ski-appen har en særskilt **Information**-sektion. Aktuelle informationslinks:
- YouTube: `https://www.youtube.com/watch?v=0HuF-0JFL8I`
- YouTube Sestriere: `https://www.youtube.com/watch?v=_l2_XI1dJLA`
- Slopestar snestatistik: `https://www.slopestar.dk/sestriere/snestatistik`
- Skisport.dk pistekort: `https://www.skisport.dk/italien/sestriere/pistekort/`

### Nyttige links i ski-appen
Aktuelle kategorier omfatter:
- Apartment Villaggio Olimpico – konkret pakke
- Grand Hotel Sestriere – konkret pakke
- officiel Via Lattea / Sestriere
- Skisport.dk
- Nortlander Italien
- Nortlander booking
- Slopestar
- Nortlander fly og skitransport
- Nortlander FAQ
- SAS specialbagage og ski
- Norwegian bagagepriser

Eksterne links skal åbne med `target="_blank"` og `rel="noopener noreferrer"`.

## Arkiv · Athen-viden
- Den konkrete Athen-rejse er slettet som rejseprojekt.
- Flytider, rejsedatoer, rejsende, bookingstatus og den konkrete bolig er fjernet fra de bevarede data.
- Kun generelle oplysninger om Athen, Koukaki, transport, taxa, billetter, museer/seværdigheder og madsteder bevares til mulig genbrug.
- Athen vises ikke på Rejser-forsiden.

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

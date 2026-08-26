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

Forsiden er en rejse-hub med **6 store 3D-rejseknapper**. Der er 2 aktive rejser og 4 reservepladser. Reservepladserne skal blive liggende, så en ny rejse senere kun kræver nyt indhold og ikke en ny forside.

Aktuelle slots:
1. **Antwerpen** – aktiv
2. **Interrail** – aktiv plan mod Istanbul, dato ikke fastlagt
3. Reserve
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
- `service-worker.js` cacher hub, Antwerpen, den nye Istanbul-plan og den gamle Interrail-side.

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
- Antwerpen har egen side og udvikles som selvstændigt rejsemodul.

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
- Hjemrejsen går via **Bremen**.
- Bekræftet overnatning: **Best Western Hotel Zur Post**, Bahnhofsplatz 11, 28195 Bremen.
- Check-in: **8. november 2026 kl. 15:00**.
- Check-out: **9. november 2026 kl. 12:00**.
- 1 nat.
- Classic-værelse med 1 dobbeltseng, køleskab; kan omdannes til 2 enkeltsenge.
- Screenshot fra Hotels.com viser bl.a. gratis Wi‑Fi, pool, spa, kæledyrsvenligt og mulighed for parkering.
- Der køres videre mod Danmark efter udtjekning 9. november.

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
- Den konkrete Kraków–Bratislava-forbindelse og alle øvrige skifteforbindelser skal verificeres igen, når datoen kendes.
- Officielle 2026-kilder dokumenterer bl.a. Snälltåget København–Berlin, internationale MÁV-korridorer, Budapest–București, București–Sofia samt Sofia–Halkalı. Disse er dato-/sæsonafhængige og skal genkontrolleres ved booking.

## 3. Neon Voyages
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
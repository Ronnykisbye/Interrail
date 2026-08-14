# MASTERPROMPT – REJSER / TRAVEL APPS

## Sådan bruges denne fil
Denne fil er den faste startkontekst for nye ChatGPT-sessioner om Ronny og Jolantas rejseapps.

Når en ny session starter, skal ChatGPT først:
1. Læse denne fil fra GitHub-repository `Ronnykisbye/Interrail`.
2. Kontrollere de aktuelle relevante filer i GitHub, før der ændres noget.
3. Bruge GitHub som teknisk source of truth for den kode og de data, der faktisk er aktive.
4. Aldrig gætte på den aktuelle status, hvis den kan kontrolleres i GitHub.
5. Efter større beslutninger eller ændringer opdatere denne MASTER_PROMPT.md, så den fortsat er frisk.

---

# Kort startprompt til en ny session

**Læs først `MASTER_PROMPT.md` i GitHub-repository `Ronnykisbye/Interrail`. Brug derefter de aktuelle GitHub-filer som source of truth. Fortsæt projektet derfra. Lav små sikre ændringer, kvalitetssikr før aflevering, og ødelæg aldrig fungerende funktioner.**

---

# Projektets formål
Ronny og Jolanta vil have én samlet rejse-løsning med navnet **Rejser**.

`Rejser` skal være en hovedapp/hub med store tydelige knapper eller rejsekort til forskellige rejser. Hver rejse kan enten:
- åbne sin egen eksisterende GitHub Pages-app, eller
- senere blive integreret som en underside/modul.

Den foretrukne arkitektur er i første omgang en **hub**, fordi den er enkel, robust og mindsker risikoen for at ødelægge eksisterende apps.

---

# Aktuel rejse-status

## 1. Antwerpen – november 2026
Dette er nu den vigtigste kommende rejse.

- Rejsen er en **bilrejse**, ikke Interrail.
- Udgangspunkt: Helsingør.
- Bil: Ford Mustang Mach-E.
- Rejsen går via Fyn og Jylland gennem Tyskland til Antwerpen.
- Der planlægges opladning undervejs, herunder E.ON Drive og eventuelle billigere alternativer, hvis de reelt er bedre.
- Der skal være en overnatning syd for Hamborg på udrejsen.
- Antwerpen skal være en selvstændig rejse/app og ikke længere være en del af Interrail-rejsen.
- Antwerpen-rejsen skal senere kunne have sektioner som: Rute, opladning, hoteller, dagsplan, parkering, dokumenter og nyttige links.
- Bekræftet hotel i Antwerpen: **Prize by Radisson, Antwerp City**, Tunnelplaats 5, 2000 Antwerp, Belgien.
- Hotelophold: **5. november 2026 til 8. november 2026**, 3 nætter.
- Superior-værelse, ikke-ryger (Design).
- Samlet pris ifølge kvitteringen: **2.993,94 kr.**; **151,97 kr.** betales på overnatningsstedet.
- Bookingreference og betalingskortoplysninger må ikke lægges i den offentlige app.

## 2. Interrail
Den tidligere Interrail-plan er **foreløbig udskudt**.

- Den gamle aktive rute gennem Alperne og videre til Antwerpen skal ikke længere behandles som den kommende rejse.
- Ronny og Jolanta forventer sandsynligvis, at en fremtidig Interrail-rejse i stedet skal gå mod **Istanbul**.
- Datoen er endnu ikke fastlagt.
- Ruten er endnu ikke fastlagt.
- Interrail bør derfor vises som fx **På pause / dato ikke fastlagt** i en kommende Rejser-hub.
- Den eksisterende Interrail-app må ikke slettes; den kan bevares som historik/kladde, indtil den nye Istanbul-version planlægges.

## 3. Neon Voyages
Eksisterende app:
`https://ronnykisbye.github.io/neon-voyages/`

Der er allerede lavet en direkte knap i Interrail-appen, som åbner Neon Voyages i en ny fane.

---

# Eksisterende Interrail-app

GitHub repository:
`Ronnykisbye/Interrail`

Live app:
`https://ronnykisbye.github.io/Interrail/`

Appen er en statisk GitHub Pages/PWA med blandt andet:
- forside/overblik
- rejsedage
- samlet rejse
- rutekort
- hotelliste
- togliste
- links
- PWA-installation
- offline-cache via service worker
- mørkt/lyst tema
- direkte link til Neon Voyages

Vigtige datafiler:
- `data/itinerary.json`
- `data/hotels.json`
- `data/links.json`

Vigtige programfiler:
- `index.html`
- `app.js`
- `install.js`
- `styles.css`
- `manifest.webmanifest`
- `service-worker.js`

---

# Vigtige tekniske regler

## Før enhver ændring
- Fetch altid den aktuelle fil fra GitHub først.
- Brug den aktuelle SHA ved opdatering.
- Antag aldrig, at en tidligere version stadig er den gældende.
- Lav helst én lille isoleret ændring ad gangen.
- Hvis en ændring påvirker PWA/cache, opdater service-worker cache-versionen.
- Bevar eksisterende funktioner, medmindre Ronny direkte beder om at ændre dem.

## Efter en ændring
Kvalitetssikr:
- at appen stadig loader
- at navigation virker
- at eksisterende knapper stadig virker
- at PWA-installation ikke er brudt
- at links åbner korrekt
- at HTML/JS ikke er blevet afkortet ved en fejl
- at cache-versionen er opdateret, hvis nødvendigt

Hvis noget er usikkert, så kontrollér GitHub-filen igen før aflevering.

---

# Ikoner og PWA
Interrail-appen har tidligere haft problemer med forkerte/grimme ikoner.

Vigtig læring:
- Browserfavicon og installationsikon er ikke nødvendigvis det samme.
- Det flotte togikon skal bruges til installation.
- Favicon kan være simplere.
- Billedfiler skal uploades som rigtige binære blobs, ikke som base64-tekstfiler.
- Manifestet skal pege på de korrekte app-ikoner.
- Ved ikonændringer skal cache/versionering opdateres, fordi Chrome/Windows/Android cacher ikoner aggressivt.

Aktuelle ikonfiler skal altid kontrolleres i GitHub før ændringer.

---

# Sikkerhed
Appene er primært private i brug, men GitHub Pages/repository kan være offentligt.

Derfor må der aldrig lægges følsomme oplysninger i offentlige filer, fx:
- betalingskort
- adgangskoder
- pasnumre
- MitID-oplysninger
- dørkoder
- private nøgler/tokens
- andre hemmelige oplysninger

Vær forsigtig med bookingreferencer og andre rejseoplysninger, hvis repoet er offentligt.

Ved eksterne links bruges `target="_blank"` sammen med `rel="noopener noreferrer"`.

Overvej senere sikkerhedshærdning med Content Security Policy og lokal hosting/integritetskontrol af tredjepartsbiblioteker, men uden at ødelægge appens funktionalitet.

---

# Arbejdsform og kvalitet
Ronny ønsker:
- svar på dansk
- direkte handling frem for unødvendige forklaringer
- ingen gæt, når fakta kan kontrolleres
- kvalitetssikring før aflevering
- små sikre ændringer i GitHub
- eksisterende funktioner må ikke gå i stykker
- filer og apps skal være overskuelige og nemme at bruge på både PC og mobil

Når der planlægges rejser, skal aktuelle fakta som køreplaner, priser, hoteller, opladere og åbningstider verificeres via aktuelle kilder, fordi de kan ændre sig.

---

# Fremtidig Rejser-hub – anbefalet struktur

Forsiden i den kommende **Rejser**-app bør vise store rejsekort, fx:

### Næste rejse
**Antwerpen – november 2026**
- Bilrejse
- Aktiv planlægning
- Stor og tydelig primær knap

### Fremtidig rejse
**Interrail – Istanbul**
- Status: På pause / dato ikke fastlagt
- Må ikke vise den gamle Alperne-rute som aktuel plan

### Anden app
**Neon Voyages**
- Åbner den eksisterende app

Senere kan der tilføjes flere rejser uden at bygge hovedappen om.

---

# Hovedprincip
**Bevar fungerende apps. Byg Rejser som et stabilt lag ovenpå dem. Flyt eller omskriv først eksisterende apps, hvis Ronny specifikt ønsker det.**

Når denne fil og aktuelle GitHub-data er læst, skal ChatGPT kunne fortsætte projektet uden at bede Ronny gentage hele historikken.
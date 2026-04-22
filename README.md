# Website Kieferorthopädische Praxis Dr. Insa Baumfalk

Willkommen! Diese Kurzanleitung erklärt, wie Sie die Inhalte Ihrer Website selbst pflegen können — ohne Programmierkenntnisse.

## Login in den Editor

1. Öffnen Sie `https://IHRE-DOMAIN/admin/` (die Adresse bekommen Sie nach dem Launch mitgeteilt).
2. Melden Sie sich mit Ihrer E-Mail-Adresse und dem Passwort an, das Sie bei der Einladung gesetzt haben.
3. Sie sehen jetzt die Bereiche **Seiten**, **Team**, **Frage & Antwort** und **Website-Daten**.

## Text auf einer Seite ändern

1. Klicken Sie links auf **Seiten**.
2. Wählen Sie die Seite aus (z.B. „Praxis").
3. Bearbeiten Sie den Text direkt im Editor — wie in Word.
4. Rechts oben auf **Publish** → **Publish now** klicken.
5. Nach ca. 1 Minute ist Ihre Änderung live.

## Ein Foto austauschen

1. Seite oder Teammitglied im Editor öffnen.
2. Beim Foto-Feld auf **Choose an image** klicken.
3. Entweder ein bereits hochgeladenes Bild auswählen oder auf **Upload new** klicken.
4. Speichern & Publish.

## Neues Teammitglied hinzufügen

1. Links auf **Team** → oben rechts auf **New Team**.
2. Name, Rolle und Beschreibung eintragen.
3. Reihenfolge: kleinere Zahl = weiter vorne auf der Seite.
4. Optional ein Foto hochladen.
5. Publish.

## Neue FAQ-Frage hinzufügen

1. Links auf **Frage & Antwort** → **New Frage & Antwort**.
2. Frage oben eintragen, Antwort im großen Textfeld.
3. Reihenfolge festlegen (kleinere Zahl = weiter oben).
4. Publish.

## Öffnungszeiten oder Telefonnummer ändern

1. Links auf **Website-Daten** → **Stammdaten & Kontakt**.
2. Felder anpassen.
3. Publish.

## Farbe der Website ändern

1. Links auf **Website-Daten** → **Design / Farbe**.
2. Im Feld **Aktives Farbpreset** eines der drei Presets wählen (Salbei, Grün klassisch, Blau).
3. Publish — nach ca. 1 Minute erscheint die Website in der neuen Farbe.

Die einzelnen Farbwerte der Presets sollten nur mit Rücksprache mit Ihrer Agentur geändert werden.

## Was passiert nach „Publish"?

Jedes Mal, wenn Sie **Publish** klicken, wird die Website automatisch neu gebaut und veröffentlicht. Das dauert in der Regel **unter einer Minute**. Solange der Build läuft, sehen Besucher weiterhin die alte Version — es gibt also keine „leere" Seite.

## Wenn etwas nicht funktioniert

- Seite neu laden (F5 / Strg+R bzw. Cmd+R).
- Kontaktieren Sie Ihre Agentur, wenn eine Fehlermeldung angezeigt wird.

---

## Für Entwickler

### Tech-Stack

- [Astro](https://astro.build) v6 (Static Site Generator)
- [Tailwind CSS](https://tailwindcss.com) v4
- [Decap CMS](https://decapcms.org) v3 (Content Management)
- [Netlify](https://netlify.com) Identity + Git Gateway
- [Fontsource](https://fontsource.org) (Fraunces + Inter, selbstgehostet, DSGVO-konform)

### Lokale Entwicklung

```bash
npm install
npm run dev          # Dev-Server auf http://localhost:4321
npm run build        # Production-Build nach dist/
npm run preview      # Preview des Builds
```

### Struktur

- `src/pages/*.astro` — Routen
- `src/content/pages/*.md` — Seiten-Inhalte (Home, Praxis, …)
- `src/content/team/*.md` — Teammitglieder
- `src/content/faq/*.md` — FAQ-Einträge
- `src/data/site.json` — Kontaktdaten, Öffnungszeiten, Logo-Pfad
- `src/data/theme.json` — aktives Farbpreset + Preset-Definitionen
- `src/components/*.astro` — Header, Footer, Mobile Sticky CTA
- `src/layouts/BaseLayout.astro` — Globales Layout mit Theme-Injection
- `public/admin/` — Decap CMS Interface + Config
- `public/uploads/` — via CMS hochgeladene Bilder

### Farbsystem

Die aktive Farbe kommt aus `src/data/theme.json` (`activePreset`). `BaseLayout.astro` rendert die vier Farben des aktiven Presets als inline CSS-Variablen auf `<html>`; Tailwind exposed sie über `@theme` als Utility-Klassen (`bg-primary`, `text-accent`, …).

Neue Presets: in `theme.json` ergänzen **und** einen weiteren Block im `presets`-Objekt in `public/admin/config.yml` sowie eine neue Option im `activePreset`-Select anlegen.

### Deploy

1. Repo auf GitHub pushen.
2. Netlify: „Add new site" → Repo verknüpfen. Build-Befehl und Publish-Ordner kommen aus `netlify.toml`.
3. Netlify Identity aktivieren, Registration auf „Invite only" stellen, Git Gateway einschalten.
4. Praxis-E-Mail einladen, Passwort setzen → `/admin/` funktioniert.

### Bekannte Limitierungen

- `activePreset` unterstützt im CMS nur die drei vordefinierten Presets (sage, classicGreen, blue). Ein neues Preset muss im Code und der CMS-Config angelegt werden.
- Doctolib ist als Link eingebunden, nicht als iFrame (DSGVO-konform, bewusste Entscheidung).

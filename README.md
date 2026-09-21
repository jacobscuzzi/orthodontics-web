# Website Kieferorthopädische Praxis Dr. Insa Baumfalk

Willkommen! Diese Kurzanleitung erklärt, wie Sie die Inhalte Ihrer Website selbst pflegen können — ohne Programmierkenntnisse.

## Login in den Editor

1. Öffnen Sie <https://jacobscuzzi.github.io/orthodontics-web/admin/>.
2. Auf **Mit GitHub anmelden** (Sign in with GitHub) klicken.
3. Beim ersten Mal fragt GitHub nach Ihrem GitHub-Benutzernamen, Passwort und dem Code aus Ihrer Authenticator-App. Danach einmal auf **Authorize** klicken.
4. Sie sehen jetzt die Bereiche **Seiten**, **Team**, **Frage & Antwort** und **Website-Daten**.

> Der Login bleibt im Browser gespeichert. Auf einem neuen Gerät oder nach dem Löschen der Browserdaten melden Sie sich einfach erneut mit GitHub an. Wie Sie Zugang bekommen, steht im Abschnitt **Zugang für eine neue Person einrichten** weiter unten.

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

Jedes Mal, wenn Sie **Publish** klicken, wird die Website automatisch neu gebaut und veröffentlicht. Das dauert in der Regel **2 bis 3 Minuten**. Wer die Seite kurz vorher offen hatte, sieht die alte Version unter Umständen noch bis zu 10 Minuten oder muss einmal neu laden. Solange der Build läuft, sehen Besucher weiterhin die alte Version — es gibt also keine „leere" Seite.

## Wenn etwas nicht funktioniert

- Seite neu laden (F5 / Strg+R bzw. Cmd+R).
- Kontaktieren Sie Ihre Agentur, wenn eine Fehlermeldung angezeigt wird.

---

## Zugang für eine neue Person einrichten

Das CMS speichert alle Inhalte in einem GitHub-Repository. Wer Inhalte bearbeiten soll, braucht deshalb ein eigenes, kostenloses GitHub-Konto. Das Konto sieht man später nie, es dient nur zum Anmelden.

### Schritt 1: GitHub-Konto anlegen (die neue Person)

1. <https://github.com/signup> öffnen, E-Mail-Adresse, Passwort und Benutzernamen wählen.
2. Bestätigungsmail anklicken.
3. **Zwei-Faktor-Schutz einschalten:** <https://github.com/settings/security> → **Two-factor authentication** → **Enable**. Am einfachsten mit einer Authenticator-App (z.B. Google Authenticator, Microsoft Authenticator). Die angezeigten Wiederherstellungs-Codes ausdrucken oder im Passwort-Manager speichern.
4. Den Benutzernamen an den Inhaber des Repositories weitergeben.

### Schritt 2: Person zum Repository einladen (Inhaber, aktuell `jacobscuzzi`)

1. <https://github.com/jacobscuzzi/orthodontics-web/settings/access> öffnen.
2. **Add people** → Benutzernamen eingeben → Rolle **Write** wählen → **Add**.
3. Die Person bekommt eine E-Mail und muss die Einladung dort annehmen.

### Schritt 3: Im CMS anmelden

Ab jetzt funktioniert **Mit GitHub anmelden** unter <https://jacobscuzzi.github.io/orthodontics-web/admin/> wie oben beschrieben.

### Zugang wieder entziehen

<https://github.com/jacobscuzzi/orthodontics-web/settings/access> öffnen und die Person entfernen. Sie kann sich danach sofort nicht mehr anmelden.

---

## Für Entwickler

### Tech-Stack

- [Astro](https://astro.build) v6 (Static Site Generator)
- [Tailwind CSS](https://tailwindcss.com) v4
- [Sveltia CMS](https://github.com/sveltia/sveltia-cms) (Content Management, GitHub-Backend, Login per GitHub-OAuth)
- [Fontsource](https://fontsource.org) (Fraunces + Inter, selbstgehostet, DSGVO-konform)
- Hosting: **GitHub Pages** (Deploy via GitHub Actions, siehe [.github/workflows/astro.yml](.github/workflows/astro.yml))

### CMS-Login (GitHub OAuth)

Der Button **Mit GitHub anmelden** läuft über einen kleinen Cloudflare Worker (kostenloser Free-Tarif), der zwischen CMS und GitHub vermittelt:

- Code: <https://github.com/jacobscuzzi/sveltia-cms-auth> (Kopie von [sveltia/sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth)), Deploy läuft automatisch über Cloudflare bei Änderungen im Repo.
- Adresse: `https://sveltia-cms-auth.j-baumfalk.workers.dev`, eingetragen als `base_url` in [public/admin/config.yml](public/admin/config.yml).
- Variablen im Worker (Cloudflare → Workers & Pages → sveltia-cms-auth → Settings → Variables): `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` (Secret), `ALLOWED_DOMAINS` = `jacobscuzzi.github.io`.
- Die zugehörige OAuth-App liegt im GitHub-Konto des Inhabers unter <https://github.com/settings/developers>, Callback-URL ist die Worker-Adresse plus `/callback`.

### Lokale Entwicklung

```bash
npm install
npm run dev          # Dev-Server auf http://localhost:4321
npm run build        # Production-Build nach dist/
npm run preview      # Preview des Builds
```

#### CMS lokal nutzen (ohne PAT)

In `public/admin/config.yml` ist `local_backend: true` gesetzt. Damit kann das CMS lokal direkt aufs Dateisystem schreiben — ohne Token, ohne GitHub-Roundtrip.

```bash
# In einem zweiten Terminal:
npx @sveltia/cms-proxy-server

# In einem dritten Terminal:
npm run dev
```

Dann `http://localhost:4321/orthodontics-web/admin/` öffnen. Änderungen landen direkt in `src/content/` und `public/uploads/` — committen wie gewohnt.

### Struktur

- `src/pages/*.astro` — Routen
- `src/content/pages/*.md` — Seiten-Inhalte (Home, Praxis, …)
- `src/content/team/*.md` — Teammitglieder
- `src/content/faq/*.md` — FAQ-Einträge
- `src/data/site.json` — Kontaktdaten, Öffnungszeiten, Logo-Pfad
- `src/data/theme.json` — aktives Farbpreset + Preset-Definitionen
- `src/components/*.astro` — Header, Footer, Mobile Sticky CTA
- `src/layouts/BaseLayout.astro` — Globales Layout mit Theme-Injection
- `public/admin/` — Sveltia CMS Interface + Config
- `public/uploads/` — via CMS hochgeladene Bilder
- `site.config.mjs` — zentrale Site-URL (für Domain-Wechsel nur diese Datei anfassen)

### Farbsystem

Die aktive Farbe kommt aus `src/data/theme.json` (`activePreset`). `BaseLayout.astro` rendert die vier Farben des aktiven Presets als inline CSS-Variablen auf `<html>`; Tailwind exposed sie über `@theme` als Utility-Klassen (`bg-primary`, `text-accent`, …).

Neue Presets: in `theme.json` ergänzen **und** einen weiteren Block im `presets`-Objekt in `public/admin/config.yml` sowie eine neue Option im `activePreset`-Select anlegen.

### Deploy

Hosting: **GitHub Pages**, Auto-Deploy via Workflow [.github/workflows/astro.yml](.github/workflows/astro.yml). Jeder Push auf `main` baut und veröffentlicht.

Erstmaliges Setup:
1. Repo auf GitHub pushen.
2. **Settings → Pages → Source: GitHub Actions** wählen (nicht „Deploy from branch").
3. Personal Access Token nach Anleitung im Abschnitt **CMS-Zugang einrichten** erstellen und im CMS hinterlegen.

Domain-Wechsel: nur `site.config.mjs` anpassen (eine Zeile, `SITE_URL`). Die GitHub-Pages-URL ergibt sich daraus, der Code zieht alles über `withBase()` aus `src/utils/base.ts` korrekt.

### Bekannte Limitierungen

- `activePreset` unterstützt im CMS nur die drei vordefinierten Presets (sage, classicGreen, blue). Ein neues Preset muss im Code und der CMS-Config angelegt werden.
- Doctolib ist als Link eingebunden, nicht als iFrame (DSGVO-konform, bewusste Entscheidung).

# Website Kieferorthopädische Praxis Dr. Insa Baumfalk

Willkommen! Diese Kurzanleitung erklärt, wie Sie die Inhalte Ihrer Website selbst pflegen können — ohne Programmierkenntnisse.

## Login in den Editor

1. Öffnen Sie `https://IHRE-DOMAIN/admin/` (die Adresse bekommen Sie nach dem Launch mitgeteilt).
2. Wählen Sie **Use Personal Access Token** und fügen Sie Ihren Token ein. Den Token bekommen Sie von Ihrer Agentur oder erstellen ihn nach der Anleitung im Abschnitt **CMS-Zugang einrichten** weiter unten.
3. Sie sehen jetzt die Bereiche **Seiten**, **Team**, **Frage & Antwort** und **Website-Daten**.

> Der Token wird nur in Ihrem Browser gespeichert (LocalStorage). Auf einem neuen Gerät oder nach dem Löschen der Browserdaten müssen Sie ihn einmalig erneut eintragen.

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

## CMS-Zugang einrichten (Personal Access Token)

Sveltia CMS spricht direkt mit GitHub. Dafür brauchen Sie einen **Fine-grained Personal Access Token**, den Sie einmalig in GitHub erstellen und im CMS hinterlegen.

### Schritt 1: Token in GitHub erstellen

1. Bei GitHub einloggen.
2. Pfad öffnen: **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**
   - Direktlink: <https://github.com/settings/personal-access-tokens/new>
3. Felder ausfüllen:
   - **Token name:** `sveltia-cms-orthodontics-web` (oder ein anderer wiedererkennbarer Name)
   - **Expiration:** **1 Jahr** empfohlen. Maximum sind 366 Tage. Notieren Sie das Ablaufdatum — danach müssen Sie einen neuen Token erstellen.
   - **Resource owner:** Ihr Account (`jacobscuzzi`)
   - **Repository access:** **Only select repositories** → `orthodontics-web` auswählen
4. **Permissions → Repository permissions** setzen:
   - **Contents:** *Read and write* (Pflicht — damit das CMS Inhalte speichern kann)
   - **Metadata:** *Read-only* (wird automatisch gesetzt)
   - **Pull requests:** *Read and write* (nur nötig, falls Sie den Editorial Workflow nutzen)
5. Auf **Generate token** klicken.
6. **Token kopieren und sicher aufbewahren** (Passwort-Manager). GitHub zeigt ihn nur **einmal** an.

### Schritt 2: Im CMS einloggen

1. `https://jacobscuzzi.github.io/orthodontics-web/admin/` öffnen.
2. Auf der Login-Seite **Use Personal Access Token** wählen.
3. Token einfügen → **Sign in**.
4. Fertig. Das CMS speichert den Token im Browser-LocalStorage.

### Sicherheit

- Behandeln Sie den Token wie ein Passwort. **Nicht teilen, nicht in Chats schicken, nicht ins Repo committen.**
- Wenn Sie den Verdacht haben, dass jemand Ihren Token kennt: in GitHub unter **Settings → Developer settings → Fine-grained tokens** sofort widerrufen und neu erstellen.
- Beim Wechsel auf ein neues Gerät: einfach denselben Token erneut eintragen — oder einen neuen erstellen und den alten widerrufen.

### Token läuft ab — was tun?

Sie sehen einen Auth-Fehler beim Speichern? Vermutlich ist Ihr Token abgelaufen.
1. In GitHub einen neuen Token nach der Anleitung oben erstellen.
2. `https://jacobscuzzi.github.io/orthodontics-web/admin/` öffnen, ausloggen, mit neuem Token wieder einloggen.

---

## Für Entwickler

### Tech-Stack

- [Astro](https://astro.build) v6 (Static Site Generator)
- [Tailwind CSS](https://tailwindcss.com) v4
- [Sveltia CMS](https://github.com/sveltia/sveltia-cms) (Content Management, GitHub-Backend mit Fine-grained PAT)
- [Fontsource](https://fontsource.org) (Fraunces + Inter, selbstgehostet, DSGVO-konform)
- Hosting: **GitHub Pages** (Deploy via GitHub Actions, siehe [.github/workflows/astro.yml](.github/workflows/astro.yml))

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

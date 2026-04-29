# GitHub Pages + Sveltia CMS Setup

## Was sich ändert?

Statt Netlify hostest du jetzt auf **GitHub Pages** (kostenlos, keine Limits) und nutzt **Sveltia CMS** mit direktem GitHub Token.

## Schritt 1: GitHub Personal Access Token erstellen

1. Gehe zu https://github.com/settings/tokens
2. Klick auf **"Generate new token (classic)"**
3. Gib einen Namen ein (z.B. `cms-token`)
4. Wähle diese Scopes:
   - ✅ `repo` (complete control of private repositories)
   - ✅ `workflow` (update GitHub Action workflows)
5. Klick **"Generate token"**
6. **Speichere den Token irgendwo sicher!** (Du siehst ihn nur einmal)

## Schritt 2: Token ins CMS eingeben

1. Gehe zu `/admin` auf deiner Website
2. Beim Login wird dir ein Input-Feld angezeigt
3. Füge deinen Token ein: `ghp_xxxxxxxxxxxxx`
4. Der Token wird im **Local Storage** deines Browsers gespeichert

## Schritt 3: GitHub Pages aktivieren

1. Gehe zu: https://github.com/jacobscuzzi/orthodontics-web/settings/pages
2. **Source:** Wähle `Deploy from a branch`
3. **Branch:** `main` / folder `/` 
4. Speichern

## Schritt 4: Deployment konfigurieren

Für automatische Builds bei jedem Push, erstelle eine GitHub Action (optional):

→ `.github/workflows/deploy.yml` (nicht nötig, GitHub macht das automatisch)

## Wenn der Token abläuft/Sicherheit

- Token sind 1 Jahr gültig → danach neuen generieren
- Den Token **nie** in Code committen!
- Er wird nur im Browser Local Storage gespeichert

## Limits mit GitHub Pages

✅ **Unbegrenzte Deployments**  
✅ **100 GB Bandbreite/Monat gratis**  
✅ **1 GB Repo-Größe**  
✅ **Keine Build-Limits**  

## Support

Bei Fragen zu Sveltia CMS: https://sveltia.github.io/sveltia-cms/

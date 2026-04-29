// Zentrale Stelle für die komplette Site-URL.
// Beim Domain-Wechsel NUR HIER anpassen.
//
// Beispiele:
//   GitHub Pages (Project):  'https://USER.github.io/REPO/'
//   GitHub Pages (User/Org): 'https://USER.github.io/'
//   Eigene Domain:           'https://www.meine-domain.de/'
//   Subpfad-Hosting:         'https://www.meine-domain.de/praxis/'
//
// Wichtig: Die URL muss mit '/' enden.

export const SITE_URL = 'https://jacobscuzzi.github.io/orthodontics-web/';

const url = new URL(SITE_URL);
export const SITE = url.origin;
export const BASE = url.pathname;

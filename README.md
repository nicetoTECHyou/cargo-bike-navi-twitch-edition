<div align="center">

# 🚲 CargoNavi
### Satellitengestützte Navigation für Lastenräder & Co.

[![PWA](https://img.shields.io/badge/PWA-Ready-green?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-blue?style=flat-square)]()
[![No Backend](https://img.shields.io/badge/No%20Backend-100%25%20Client-brightgreen?style=flat-square)]()
[![Voice Nav](https://img.shields.io/badge/Voice-Navigation-8b5cf6?style=flat-square)]()
[![GPS](https://img.shields.io/badge/GPS-Realtime-3b82f6?style=flat-square)]()
[![Twitch](https://img.shields.io/badge/Twitch-Community_Navigation-9146FF?style=flat-square)]()
[![Tabs](https://img.shields.io/badge/UI-Tabbed_Sidebar-10b981?style=flat-square)]()
[![Version](https://img.shields.io/badge/Version-1.0-059669?style=flat-square)]()

**Dein Lastenrad-Navi: Ohne App Store, ohne Backend, ohne Datensammlung und vor allem ohne Kosten.**

<br>

[![Open CargoNavi](https://img.shields.io/badge/🚲_CargoNavi_öffnen-Navi_Starten-2ea44f?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0tMiAxNWwtNS01IDEuNDEtMS40MUwxMCAxNC4xN2w3LjU5LTcuNTlMMTkgOGwtOSA5eiIvPjwvc3ZnPg==)](https://nicetotechyou.github.io/Cargo-Bike-Navi/navigation_v4.html)

</div>

---

## 📱 Installation (PWA)

CargoNavi ist eine **Progressive Web App**. Du kannst sie ohne App Store direkt auf deinem Home-Bildschirm installieren:

| Plattform | Anleitung |
| :--- | :--- |
| 🤖 **Android** | Chrome öffnen → ⋮ Menü → **"App installieren"** |
| 🍎 **iOS** | Safari öffnen → ☐↑ Teilen → **"Zum Home-Bildschirm"** |
| 🖥️ **Desktop** | Chrome/Edge → ⊕ **Installations-Icon** in der Adressleiste |

---

## ✨ Features

### 🗺️ Navigation & Karten
* **Hochauflösende Satellitenbilder:** Nutzung von ESRI World Imagery mit 4 Kartenstilen (Satellit, Topographisch, Straße, Dunkel).
* **Echte GPS-Navigation:** Start Navigation nutzt das echte GPS-Signal deines Geräts — blauer GPS-Punkt folgt deiner Position in Echtzeit mit Genauigkeitskreis und Kompass-Indikator.
* **Demo-Modus:** Separater Button zum virtuellen Abfahren der Route mit animiertem Fahrzeug-Icon — läuft unabhängig von der GPS-Navigation.
* **Fahrspur-Tracking:** Gefahrene GPS-Route wird als orange Linie (#f97316) auf der Karte eingezeichnet — geplante Route bleibt in Grün. GPS-Punkte nur bei ≥3m Bewegung aufgezeichnet.
* **Intelligentes Routing:** Fahrradoptimierte Strecken via BRouter-API mit OSRM-Fallback. Bis zu 3 Alternativrouten mit automatischer Deduplikation identischer Routen.
* **Interaktive Planung:** Wegpunkte per Klick & Drag setzen, automatisch nach Entfernung sortiert. Multi-Stop-Routen unterstützt.
* **Echte Geschwindigkeit:** GPS-Modus zeigt deine reale Geschwindigkeit in km/h an — oder berechnet sie aus aufeinanderfolgenden GPS-Positionen.
* **Auto-Arrival:** Erkennt automatisch wenn du innerhalb von 30m des Ziels ankommst.
* **Höhenprofil:** Anstieg & Abstieg der Route automatisch berechnet und angezeigt.
* **Fahrzeugabmessungen:** Breite & Höhe eingeben — Route vermeidet enge Wege & niedrige Brücken.
* **Autobahnen meiden:** Schalter zum Vermeiden von highways/motorways.

### 🗣️ Sprachnavigation & Lautstärke
* **Turn-by-Turn Ansagen:** Kündigt Abbiegungen automatisch per Stimme an — kein Hinsehen nötig. Nutzt die Web Speech API des Browsers (kein Backend, keine API-Keys).
* **GPS-basierte Ansagen:** Sprachnavigation arbeitet mit dem echten GPS-Signal in Echtzeit. Smart Look-Ahead scannt bis zu 200 Punkte voraus.
* **Distanz-Trigger:** Ansagen bei 500m, 300m, 200m, 100m, 50m vor dem Abbiegepunkt. Sofort-Ansage *"Jetzt rechts abbiegen"* direkt am Abbiegepunkt.
* **Zielankunft:** Automatische Ansage *"Sie haben Ihr Ziel erreicht"*.
* **Routen-Überwachung:** Off-Route Warnung bei >50m Abweichung (gedrosselt auf 15s). Falsche-Fahrtrichtung Erkennung bei >135° Abweichung (gedrosselt auf 10s).
* **Mute-Button:** Stiller Schalter (🔇) in der Sidebar und auf der Karte während der Navigation — beide synchronisiert.
* **Lautstärke-Regler:** Slider (0–100%) zum Einstellen der Sprachlautstärke mit großem Touch-Friendly Thumb.
* **Sprechtempo:** Wählbare Geschwindigkeit: 0.8x, 1x, 1.2x, 1.5x.
* **Mehrsprachig:** Sprachausgabe wechselt automatisch zwischen Deutsch und Englisch basierend auf der App-Sprache.
* **Ein-/Ausschaltbar:** Schalter in der Sidebar zum Deaktivieren der Sprachausgabe.

### 🚲 Fahrzeugprofile
Wähle dein passendes Profil für präzise Ankunftszeiten (1–200 km/h einstellbar):
* **Cargo-Linie:** FRANKY — Das Lastenrad mit eigenem Top-Down-Marker und dediziertem Bild.
* **Sport:** Mountain Bike (Gelände) & Racing Bike (Straße) — jeweils mit eigenen Top-Down-Markern.
* **Easter Egg:** **DeLorean** mit speziellem CSS-Glow-Effekt bei ≥88 km/h ("Flux-Kompensator aktiviert!").

### 🔍 POIs & Suche
* **Adresssuche:** Schnellsuche via Nominatim / OpenStreetMap mit Rate-Limit-Respektierung (1 req/s).
* **⚡ EV Ladestationen:** Echtzeit-Suche via Overpass API mit Betreiber, Steckertypen & Kosteninfo.
* **⛺ Campingplätze:** Camping- und Stellplätze mit Details zu Zelten, Wohnwagen & WiFi.
* **📸 Sehenswürdigkeiten:** Burgen, Schlösser, Museen, Kirchen, Denkmäler, Ruinen, Aussichtspunkte & mehr.
* **POI-Liste:** Sortierte Übersicht der nächsten POIs (max. 50) mit Entfernung, Kategorie-Badges und aufklappbaren Details.
* **In Route einfügen:** Ein-Klick "Als Ziel" oder "Als Via-Wegpunkt" aus jedem POI-Popup.

### 💬 Twitch Community Navigation
* **Chat-Verbindung:** Verbinde dich mit deinem Twitch-Kanal per tmi.js WebSocket — kein Backend nötig. Kanalname, Bot-Name und OAuth-Token mit Auto-Load.
* **Sichere Token-Verwaltung:** OAuth-Token wird base64-verschlüsselt in localStorage gespeichert, nie im Klartext angezeigt. Show/Hide-Toggle (Eye-Icon) für manuelle Prüfung. Sicherheits-Check vor Verbindungsaufbau.
* **Chat-Commands:** Viewer reichen Wegpunkte per `!waypoint <Adresse>` ein. Mods verwalten per `!approve <nr>` / `!reject <nr>`. Streamer: `!clearroute`.
* **Content-Moderation:** Bad-Word-Filter (DE/EN inkl. L33t-Speak-Erkennung), Cooldown pro User, Limits pro User & gesamt, maximale Zeichenanzahl.
* **Adressvalidierung:** Eingereichte Adressen werden via Nominatim API validiert — graceful Fallback bei API-Fehler.
* **Pending Queue:** Visuelle Liste mit Username, Adresse, Zeitstempel und Approve/Reject-Buttons. Bulk-Actions (Alle akzeptieren/ablehnen).
* **Community-Route:** Automatische Routenberechnung durch alle bestätigten Wegpunkte via BRouter API. Navigation direkt aus dem Twitch-Tab starten.
* **Live Chat:** Dark-Themed Chat-Panel zeigt CargoNavi-Nachrichten in Echtzeit mit Zeitstempel und farbigen Usernamen.
* **Bot-Antworten:** Automatische Chat-Meldungen für Transparenz. Silent-Reject-Prinzip für abgelehnte Einreichungen (Trolls bekommen keine Aufmerksamkeit).
* **Einstellungen:** Command-Prefix, Cooldown, Limits, Filter — alles einstellbar und einklappbar.
* **GPX-Export:** Community-Routen direkt aus dem Twitch-Tab exportieren.

### 🌍 System & UI
* **Tabbed Sidebar:** 4 organisierte Tabs — Route, Navigate, Twitch, POI — für eine aufgeräumte, fokussierte Oberfläche mit grünem Active-Indicator.
* **Clean Map View:** Sucheingaben in der Sidebar — Karte zeigt nur Controls, Route, Richtungs-Shortcuts und Navi-Overlays. Keine schwebenden Eingabefelder mehr.
* **Dark Mode:** Helles und dunkles Theme per Klick umschaltbar — volle Unterstützung in allen UI-Komponenten. Einstellungen persistent via localStorage.
* **Kartenstile:** Satellit, Topographisch, Straßenkarte & Dunkle Karte per Dropdown.
* **Ansichten:** Folgemodus (hinter dem Fahrzeug) & Drohnenansicht (3D rotierend).
* **Vollbildmodus:** Komplett auf die Karte fokussieren — UI ein-/ausblenden per Ctrl+F.
* **Mehrsprachig:** Deutsch & Englisch per Klick umschaltbar — 90+ i18n-Strings.
* **GPS Live-Tracking:** Eigene Position mit Genauigkeitskreis & Kompass-Indikator. Auto-Center beim Laden.
* **Responsive Design:** Optimiert für Smartphone, Tablet & Desktop mit Touch-optimierten Controls.
* **Export-Profi:** Unterstützt GPX, KML, TCX, CSV & Google Maps Direktlinks.
* **Tastenkürzel:** Strg+N (Navigation), Strg+D (Dark Mode), Strg+F (Vollbild), Esc (Schließen).
* **Race-Condition-Schutz:** Versionszähler verhindert, dass veraltete API-Antworten neuere Ergebnisse überschreiben.
* **Performance:** Sliding-Window-Optimierung für Distanzberechnung auf langen Routen (±500 Punkte Suchfenster).

---

## 🛠️ Technische Details

| Komponente | Technologie |
| :--- | :--- |
| **Karte** | [MapLibre GL JS](https://maplibre.org/) v4.7 |
| **Routing** | [BRouter](https://brouter.de/) API (+ OSRM Fallback) |
| **Geocoding** | Nominatim (OSM) via JSONP (throttled) |
| **POIs** | [Overpass API](https://overpass-api.de/) |
| **Sprachausgabe** | Web Speech API (`speechSynthesis`) |
| **Twitch Chat** | [tmi.js](https://tmi.js/) v1.9.0-pre.1 (WebSocket CDN) |
| **Styling** | Tailwind CSS + Custom CSS (Dark Mode) |
| **Architektur** | 100% Client-Side (Single-File HTML, 5695 Zeilen) |
| **Offline** | Service Worker (Cache-First für Assets, Network-First für API) |
| **PWA** | Installierbar auf Android, iOS, Desktop |

### 📂 Dateistruktur
```text
CargoNavi/
├── navigation_v4.html      # Hauptdatei (v1.0)
├── navigation_v3.html      # Vorherige Version (Backup)
├── manifest.json           # PWA-Manifest
├── sw.js                   # Service Worker (Offline-Cache)
├── icon-192.png            # App-Icon (192×192)
├── icon-512-final.png      # App-Icon (512×512)
├── FRANKY.png              # Fahrzeugmarker — Cargo Bike
├── mtb_topdown.png         # Fahrzeugmarker — Mountain Bike
├── racingbike_topdown.png  # Fahrzeugmarker — Racing Bike
├── delorean_topdown.png    # Fahrzeugmarker — DeLorean
├── Readme.md               # Projekt-Readme
└── CHANGELOG.md            # Änderungsprotokoll
```

---

## 🚀 Version History

| Version | Datum | Beschreibung |
| :--- | :--- | :--- |
| **v1.0** | 2026-04-05 | Erste offizielle Veröffentlichung. Vollständiges Feature-Set: GPS-Navigation, Sprachansagen, Twitch-Integration, Tabbed Sidebar, POIs, Export |
| v0.5 | 2026-04-05 | GPS-Nav Marker (blauer Puls-Punkt), Fahrspur-Tracking (orange), Fahrzeug-Icons nur im Demo-Modus, Alternativrouten-Fix |
| v0.4 | 2026-04-05 | 15 Bugfixes (Race Conditions, Cache, GPS-Leak, XSS, Performance) |
| v0.3 | 2026-04-05 | Auto-Center & Auto GPS-Tracking beim Laden |
| v0.2 | 2026-04-04 | Echte GPS-Navigation, Demo-Modus, Lautstärke-Steuerung |
| v0.1 | 2026-04-04 | Sprachnavigation, Routen-Überwachung, Fahrzeug-Marker (Bilder) |

---

## 🤖 Gebaut mit Z.ai — KI-Assistent

Dieses Projekt wurde mit Unterstützung von **Z.ai**, einem leistungsstarken KI-Assistenten von Zhipu AI entwickelt. Von der Architektur über die GPS-Navigation bis zur Sprachsteuerung und Twitch-Integration — Z.ai war dabei als kreativer Partner an meiner Seite und hat maßgeblich dazu beigetragen, CargoNavi zu dem zu machen, was es heute ist.

[![Powered by Z.ai](https://img.shields.io/badge/Powered_by-Z.ai-0ea5e9?style=for-the-badge)](https://chat.z.ai)

**Bugs, Fragen oder Ideen?** → [![Discord](https://img.shields.io/badge/Discord-nicetoTECHyou-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.com/users/nicetotechyou)

---

## 🔗 Datenquellen

* 🗺️ Karten: [OpenStreetMap](https://www.openstreetmap.org/) (ODbL)
* 🛰️ Satellit: [ESRI World Imagery](https://www.esri.com/)
* 🚴 Routing: [BRouter](https://brouter.de/) (Open Source)
* 📍 Geocoding: [Nominatim](https://nominatim.openstreetmap.org/) (OSM)
* 🏪 POIs: [Overpass API](https://overpass-api.de/) (OSM)

## 📺 Support & Community

Begleite **Rene Kreher** live bei seinen Projekten und Reisen — Er war die Inspiration dieses Navi zu programmieren, da es nicht wirklich gute kostenlose Navis gibt, die so viel Umfang bieten eine Route zu planen.

[![Twitch Status](https://img.shields.io/badge/Live_auf-Twitch-purple?style=for-the-badge&logo=twitch&logoColor=white)](https://www.twitch.tv/renekreher)

> [!IMPORTANT]
> **Haftungsausschluss:** **ReneKreher** hat nichts mit der Entwicklung der App zu tun! Dies ist ein **Fanmade Projekt** von [nicetoTECHyou (Twitch)](https://twitch.tv/nicetoTECHyou), um Renes Projekte & Reisen zu unterstützen und die Suche nach Strecken, Sehenswürdigkeiten, Charging- & Camping-Spots zu erleichtern.

---

## 📄 Lizenz

Dieses Projekt ist **Open Source**. Die Kartendaten unterliegen der [ODbL](https://opendatacommons.org/licenses/odbl/) Lizenz von OpenStreetMap.

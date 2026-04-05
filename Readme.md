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
* **Hochauflösende Satellitenbilder:** Nutzung von ESRI World Imagery.
* **Echte GPS-Navigation:** Start Navigation nutzt das echte GPS-Signal deines Geräts — blauer GPS-Punkt folgt deiner Position in Echtzeit.
* **Demo-Modus:** Separater Button zum virtuellen Abfahren der Route mit animiertem Fahrzeug-Icon.
* **Fahrspur-Tracking:** Gefahrene GPS-Route wird als orange Linie auf der Karte eingezeichnet — geplante Route bleibt in Grün.
* **Intelligentes Routing:** Fahrradoptimierte Strecken via BRouter-API.
* **Interaktive Planung:** Wegpunkte per Klick & Drag setzen; bis zu 3 Alternativrouten.
* **Echte Geschwindigkeit:** GPS-Modus zeigt deine reale Geschwindigkeit in km/h an.
* **Auto-Arrival:** Erkennt automatisch wenn du within 30m des Ziels ankommst.
* **Höhenprofil:** Anstieg & Abstieg der Route automatisch berechnet und angezeigt.
* **Fahrzeugabmessungen:** Breite & Höhe eingeben — Route vermeidet enge Wege & niedrige Brücken.
* **Autobahnen meiden:** Schalter zum Vermeiden von highways/motorways.

### 🗣️ Sprachnavigation & Lautstärke
* **Turn-by-Turn Ansagen:** Kündigt Abbiegungen automatisch per Stimme an — kein Hinsehen nötig.
* **GPS-basierte Ansagen:** Sprachnavigation arbeitet mit dem echten GPS-Signal in Echtzeit.
* **Distanz-Trigger:** Ansagen bei 500m, 300m, 200m, 100m, 50m vor dem Abbiegepunkt.
* **Sofort-Ansagen:** *"Jetzt rechts abbiegen"* wenn du direkt am Abbiegepunkt bist.
* **Zielankunft:** Automatische Ansage *"Sie haben Ihr Ziel erreicht"*.
* **Mute-Button:** Stiller Schalter (🔇) in der Sidebar und auf der Karte während der Navigation.
* **Lautstärke-Regler:** Slider (0–100%) zum Einstellen der Sprachlautstärke.
* **Sprechtempo:** Wählbare Geschwindigkeit: 0.8x, 1x, 1.2x, 1.5x.
* **Mehrsprachig:** Sprachausgabe wechselt automatisch zwischen Deutsch und Englisch.
* **Kein Backend:** Nutzt die Web Speech API des Browsers.
* **Ein-/Ausschaltbar:** Schalter in der Sidebar zum Deaktivieren der Sprachausgabe.

### ⚠️ Routen-Überwachung (NEU)
* **Off-Route Erkennung:** Warnt dich wenn du mehr als 50m von der geplanten Route abkommst.
* **Falsche-Fahrtrichtung Erkennung:** Erkennt wenn du in die falsche Richtung fährst (>135° Abweichung).
* **Smart gedrosselt:** Warnungen maximal alle 10–15 Sekunden — kein Spam.
* **GPS-basiert:** Nutzt die Live-GPS-Position für präzise Abweichungserkennung.

### 🚲 Fahrzeugprofile
Wähle dein passendes Profil für präzise Ankunftszeiten (1–200 km/h einstellbar):
* **Cargo-Linie:** FRANKY — Das Lastenrad mit eigenem Top-Down-Marker.
* **Sport:** Mountain Bike (Gelände) & Racing Bike (Straße) — jeweils mit eigenen Top-Down-Markern.
* **Easter Egg:** **DeLorean** mit speziellem "Flux-Kompensator" Effekt bei ≥88 km/h.

### 🔍 POIs & Suche
* **Adresssuche:** Schnellsuche via Nominatim / OpenStreetMap.
* **⚡ EV Ladestationen:** Echtzeit-Suche mit Betreiber, Steckertypen & Kosteninfo.
* **⛺ Campingplätze:** Camping- und Stellplätze mit Details zu Zelten, Wohnwagen & WiFi.
* **📸 Sehenswürdigkeiten:** Burgen, Schlösser, Museen, Kirchen, Denkmäler, Ruinen, Aussichtspunkte & mehr.
* **POI-Liste:** Sortierte Übersicht der nächsten POIs mit Entfernung und Detail-Infos.

### 🌍 System & UI
* **Tabbed Sidebar:** 4 organized tabs — Route, Navigate, Twitch, POI — for a clean, focused interface
* **Clean Map View:** Search inputs moved to sidebar; map shows only controls, route, and navigation overlays
* **Dark Mode:** Helles und dunkles Theme per Klick umschaltbar.
* **Kartenstile:** Satellit, Topographisch, Straßenkarte & Dunkle Karte.
* **Ansichten:** Folgemodus (hinter dem Fahrzeug) & Drohnenansicht (3D rotierend).
* **Vollbildmodus:** Komplett auf die Karte fokussieren — UI ein-/ausblenden.
* **Mehrsprachig:** Deutsch & Englisch per Klick umschaltbar.
* **GPS Live-Tracking:** Eigene Position mit Genauigkeitskreis & Kompass-Indikator.
* **Auto-Center:** Karte zentriert sich automatisch auf deinem Standort beim Laden der App.
* **Responsive Design:** Optimiert für Smartphone, Tablet & Desktop.
* **Export-Profi:** Unterstützt GPX, KML, TCX, CSV & Google Maps Direktlinks.
* **Tastenkürzel:** Strg+N (Navigation), Strg+D (Dark Mode), Strg+F (Vollbild), Esc (Schließen).

### 💬 Twitch Community Navigation (NEU)
* **Chat-Verbindung:** Verbinde dich mit deinem Twitch-Kanal per tmi.js WebSocket — kein Backend nötig
* **Sichere Token-Verwaltung:** OAuth-Token wird base64-verschlüsselt in localStorage gespeichert, nie im Klartext angezeigt
* **Chat-Commands:** Viewer reichen Wegpunkte per `!waypoint <Adresse>` ein, Mods verwalten per `!approve` / `!reject`
* **Content-Moderation:** Bad-Word-Filter (DE/EN inkl. L33t-Speak), Cooldown, User-Limits, Adressvalidierung
* **Pending Queue:** Visuelle Liste mit Approve/Reject-Buttons — Bulk-Actions für schnelle Bearbeitung
* **Community-Route:** Automatische Routenberechnung durch alle bestätigten Wegpunkte via BRouter
* **Live Chat:** Dark-Themed Chat-Panel zeigt CargoNavi-Nachrichten in Echtzeit
* **Bot-Antworten:** Automatische Chat-Meldungen für Transparenz — Silent-Reject für abgelehnte Einreichungen
* **Einstellungen:** Command-Prefix, Cooldown, Limits, Filter — alles einstellbar in der Sidebar

---

## 🛠️ Technische Details

| Komponente | Technologie |
| :--- | :--- |
| **Karte** | [MapLibre GL JS](https://maplibre.org/) v4.7 |
| **Routing** | [BRouter](https://brouter.de/) API |
| **Geocoding** | Nominatim (OSM) via JSONP |
| **POIs** | [Overpass API](https://overpass-api.de/) |
| **Sprachausgabe** | Web Speech API (`speechSynthesis`) |
| **Twitch Chat** | [tmi.js](https://tmi.js/) v1.8 (WebSocket) |
| **Styling** | Tailwind CSS + Custom CSS |
| **Architektur** | 100% Client-Side (Single-File HTML) |

### 📂 Dateistruktur
```text
├── navigation_v4.html      # Hauptdatei (v4.0 — Tabs + Twitch)
├── navigation_v3.html      # Vorherige Version (Backup)
├── manifest.json           # PWA-Manifest
├── sw.js                   # Service Worker (Offline-Cache)
├── icon-192.png            # App-Icon (192×192)
├── icon-512-final.png      # App-Icon (512×512)
├── FRANKY.png              # Fahrzeugmarker — Cargo Bike
├── mtb_topdown.png         # Fahrzeugmarker — Mountain Bike
├── racingbike_topdown.png  # Fahrzeugmarker — Racing Bike
└── delorean_topdown.png    # Fahrzeugmarker — DeLorean
```

---

## 🚀 Changelog

### [v4.0] — Tabbed Sidebar & Twitch Integration
**Datum:** 2026-04-05

**Neu:**
- 🗂️ **Tabbed Sidebar:** Sidebar in 4 Tabs organisiert — Route, Navigate, Twitch, POI
- 📍 **Suche im Sidebar:** Start/Ziel-Eingabefelder in den Route-Tab verschoben — sauberere Kartenansicht
- 🗺️ **Clean Map View:** Keine Suchleiste mehr auf der Karte — nur Controls, Route und Navi-Overlays
- 💬 **Twitch Integration:** Viewer können per Chat-Command Wegpunkte einreichen (`!waypoint`)
- 🔐 **Sichere Token-Verwaltung:** OAuth-Token base64-verschlüsselt gespeichert, nie im Klartext sichtbar
- ⚡ **Content-Moderation:** Bad-Word-Filter, Cooldown, User-Limits, Adressvalidierung
- 📋 **Pending Queue:** Wegpunkte mit Approve/Reject verwalten — auch per Chat-Command
- 🛤️ **Community-Route:** Automatische Routenberechnung aus bestätigten Wegpunkten
- 💬 **Live Chat:** Twitch-Chat-Panel direkt in der Sidebar
- ⚙️ **Twitch-Einstellungen:** Command, Cooldown, Limits, Filter — alles konfigurierbar

**Technisch:**
- tmi.js v1.8 via CDN für Twitch-Chat-Verbindung
- Tab-System mit CSS-Klass-Toggling (`.tab-content.active`)
- `TwitchManager` Singleton für Chat-Verwaltung, Command-Parsing und Routenberechnung
- `ContentFilter` für Bad-Word-Erkennung inkl. L33t-Speak
- 31 neue i18n-Strings (DE/EN) für Twitch-Features
- OAuth-Token als base64 in localStorage, `escapeXml()` Null-Safety-Fix

### [v3.5] — GPS-Nav Marker & Fahrspur-Tracking
**Datum:** 2026-04-05

**Neu:**
- 📍 **GPS-Navigationsmarker:** In der GPS-Navigation wird jetzt ein sauberer blauer GPS-Punkt angezeigt statt des Fahrzeug-Icons — kein nerviges Spinnen mehr bei schlechtem GPS-Signal
- 🚗 **Fahrzeug-Icons nur im Demo-Modus:** Fahrzeug-Icons (FRANKY, Mountain Bike, Racing Bike, DeLorean) werden jetzt ausschließlich im Demo-Modus angezeigt
- 🛤️ **Fahrspur-Tracking:** Die tatsächlich gefahrene GPS-Route wird als orange Linie auf der Karte eingezeichnet — die geplante Route bleibt grün, so dass du den Vergleich direkt sehen kannst

**Behoben:**
- 🐛 **Alternativrouten-Panel zeigte nicht:** BRouter API liefert manchmal identische Routen für verschiedene `alternativeidx`-Werte (z.B. car-fast altidx=0 und altidx=2 geben exakt die gleichen Koordinaten zurück). Neue `deduplicateRoutes()`-Funktion entfernt Duplikate per Koordinaten-Fingerprint — das Panel zeigt jetzt nur wirklich unterschiedliche Routen

**Technisch:**
- Neuer `gps-nav-marker` CSS-Stil mit Puls-Animation für die GPS-Navigation
- Neue `driven-path` GeoJSON-Quelle und Layer (orange, 5px breit mit dunklem Outline)
- `deduplicateRoutes()` Hilfsfunktion mit Koordinaten-Fingerprint (erste + letzte 5 Punkte)
- `updateDrivenPathLayer()` und `clearDrivenPathLayer()` Hilfsfunktionen hinzugefügt
- GPS-Punkte werden nur bei ≥3m Abstand aufgezeichnet (verhindert Datenmüll bei Standstill)
- Route-Farben werden nach Deduplikation neu zugewiesen
- Service Worker Cache-Version auf `v35` hochgestuft

### [v3.4] — Auto-Center & UX-Verbesserungen
**Datum:** 2026-04-05

**Neu:**
- 🎯 **Auto-Center:** Karte zentriert sich automatisch auf deinem Standort beim Laden der App
- 📍 **Auto GPS-Tracking:** GPS-Tracking startet automatisch beim Laden — kein Klick nötig
- 🔄 **Sanfter Flug:** Smooth flyTo-Animation beim ersten Zentrieren (1,5s)

**Technisch:**
- GPS-Abfrage direkt nach Karten-Load, Fallback auf Standard-Zentrum (Berlin) wenn keine Erlaubnis

### [v3.3] — Echte GPS-Navigation & Lautstärke-Steuerung
**Datum:** 2026-04-04

**Neu:**
- 📍 **Echte GPS-Navigation:** "Start Navigation" nutzt das echte GPS-Signal — Fahrzeugmarker, Geschwindigkeit und Richtung folgen deiner Position in Echtzeit
- 🎮 **Demo-Modus:** Separater Button zum virtuellen Abfahren der Route mit Animation
- 🔇 **Mute-Button:** Stiller Schalter in der Sidebar + Schnell-Mute auf der Karte während der Navigation
- 🔊 **Lautstärke-Regler:** Volume-Slider (0–100%) in der Sidebar
- ⏩ **Sprechtempo:** Wählbare Geschwindigkeit: 0.8x, 1x, 1.2x, 1.5x
- 🏁 **Auto-Arrival:** Erkennt automatisch wenn du innerhalb 30m des Ziels ankommst
- 💨 **Echte Geschwindigkeit:** Zeht die reale GPS-Geschwindigkeit in km/h an

**Verbessert:**
- Off-Route Erkennung nutzt jetzt Point-to-Line-Segment Distanz (genauer als Punkt-zu-Punkt)
- Sprachnavigation arbeitet jetzt mit dem echten GPS-Signal (nicht nur Simulation)
- Distanz-Trigger für Ansagen optimiert (1,5s statt 3s Mindestintervall)
- Dead '20m' Bracket aus der Ansagen-Logik entfernt

### [v3.2] — Sprachnavigation & Routen-Überwachung
**Datum:** 2026-04-04

**Neu:**
- 🗣️ Vollständiges Voice-Navigationssystem mit Web Speech API
- Distanzbasierte Turn-by-Turn-Ansagen (500m → 20m → "Jetzt")
- Off-Route Warnung bei >50m Abweichung von der geplanten Route
- Falsche-Fahrtrichtung Erkennung (>135° Gegenrichtung)
- 22 neue i18n-Strings für Sprachausgabe (DE/EN)
- Sprachnavigation Toggle-Schalter in der Sidebar

**Geändert:**
- Intelligente Look-Ahead-Kurvensuche (scannt bis zu 200 Punkte voraus)
- GPS-Position verknüpft mit Routen-Abweichungs-Check
- Fahrzeugbilder zum Service Worker Precache hinzugefügt

### [v3.1] — Fahrzeug-Marker Overhaul
**Datum:** 2026-04-04

**Geändert:**
- Alle Fahrzeugmarker auf Top-Down-Bilddateien umgestellt (nose-north)
- Base64-Daten entfernt (~340 KB Einsparung, 65% kleinere HTML-Datei)
- Konsistente Darstellung zwischen Fahrzeugkarten und Kartenmarkern
- DeLorean Easter Egg auf CSS-Glow-Effekte umgestellt (kein Bild-Swap mehr)

---

## 🗺️ Roadmap

[![Roadmap](https://img.shields.io/badge/🚀_Roadmap-Zukünftige_Pläne-a855f7?style=for-the-badge)](roadmap.md) [![Twitch Spec](https://img.shields.io/badge/🚲_Twitch_Integration-Spec_Doc-7C3AED?style=for-the-badge)](TWITCH_INTEGRATION_SPEC.md)

---

## 🤖 Gebaut mit Z.ai — KI-Assistent

Dieses Projekt wurde mit Unterstützung von **Z.ai**, einem leistungsstarken KI-Assistenten von Zhipu AI entwickelt. Von der Architektur über die GPS-Navigation bis zur Sprachsteuerung — Z.ai war dabei als kreativer Partner an meiner Seite und hat maßgeblich dazu beigetragen, CargoNavi zu dem zu machen, was es heute ist.

[![Powered by Z.ai](https://img.shields.io/badge/Powered_by-Z.ai-0ea5e9?style=for-the-badge)](https://chat.z.ai)

**Bugs, Fragen oder Ideen?** → [![Discord](https://img.shields.io/badge/Discord-nicetoTECHyou-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.com/users/nicetotechyou)

---

## 🔗 Social Media & Lizenz

**Datenquellen:**

  * 🗺️ Karten: [OpenStreetMap](https://www.openstreetmap.org/) (ODbL)
  * 🛰️ Satellit: [ESRI World Imagery](https://www.esri.com/)

## 📺 Support & Community

Begleite **Rene Kreher** live bei seinen Projekten und Reisen - Er war die Inspiration dieses Navi zu Programmieren , da es nicht wirklich gute Kostenlose Navis gibt die so viel umfang bieten eine route zu planen.

[![Twitch Status](https://img.shields.io/badge/Live_auf-Twitch-purple?style=for-the-badge&logo=twitch&logoColor=white)](https://www.twitch.tv/renekreher)

> [!IMPORTANT]
> **Haftungsausschluss:** **ReneKreher** hat nichts mit der Entwicklung der App zu tun! Dies ist ein **Fanmade Projekt** von [nicetoTECHyou (Twitch)](https://twitch.tv/nicetoTECHyou), um Rene´s Projekte & Reisen zu unterstützen und die Suche nach Strecken , Sehenswürdigkeiten , Charging- & Camping-Spots zu erleichtern.

---

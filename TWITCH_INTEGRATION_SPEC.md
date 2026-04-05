<div align="center">

# 🚲 CargoNavi — Twitch Community Navigation
### Technisches Pflichtenheft & Implementierungs-Guide v1.0

*Community-gesteuerte Navigation via Twitch Chat*

*html + dieses dokument hochladen damit die KI versteht was zu machen ist*

**nicetoTECHyou** | [GitHub: nicetotechyou/Cargo-Bike-Navi](https://github.com/nicetotechyou/Cargo-Bike-Navi) | April 2026

*Erstellt mit Unterstützung von [Z.ai](https://chat.z.ai)*

</div>

---

## 📑 Inhaltsverzeichnis

- [1. Projektübersicht](#1-projektübersicht)
  - [1.1 Konzept](#11-konzept)
  - [1.2 Ziele](#12-ziele)
  - [1.3 Nicht-Ziele](#13-nicht-ziele)
- [2. Architektur & Technisches Design](#2-architektur--technisches-design)
  - [2.1 Systemarchitektur](#21-systemarchitektur)
  - [2.2 Datenfluss](#22-datenfluss)
  - [2.3 Architektur-Diagramm](#23-architektur-diagramm)
- [3. Twitch-Integration](#3-twitch-integration)
  - [3.1 Verbindungsaufbau](#31-verbindungsaufbau)
  - [3.2 Setup-UI (Twitch Panel in der Sidebar)](#32-setup-ui-twitch-panel-in-der-sidebar)
  - [3.3 Chat-Commands](#33-chat-commands)
  - [3.4 Bot-Antworten im Chat](#34-bot-antworten-im-chat)
- [4. Admin-Panel](#4-admin-panel)
  - [4.1 Übersicht](#41-übersicht)
  - [4.2 Panel-Bereiche](#42-panel-bereiche)
  - [4.3 Kontroll-Buttons](#43-kontroll-buttons)
- [5. Sicherheit & Content-Moderation](#5-sicherheit--content-moderation)
  - [5.1 Schutz-Ebenen](#51-schutz-ebenen)
  - [5.2 Bad-Word-Filter Details](#52-bad-word-filter-details)
  - [5.3 Silent Reject Prinzip](#53-silent-reject-prinzip)
- [6. Datenmodell & Speicherung](#6-datenmodell--speicherung)
  - [6.1 Wegpunkt-Datenstruktur](#61-wegpunkt-datenstruktur)
  - [6.2 Session-Datenstruktur](#62-session-datenstruktur)
  - [6.3 Session-Statistiken](#63-session-statistiken)
  - [6.4 Speicher-Strategie](#64-speicher-strategie)
- [7. UI-Komponenten](#7-ui-komponenten)
  - [7.1 Sidebar-Erweiterungen](#71-sidebar-erweiterungen)
  - [7.2 Admin-Panel Overlay](#72-admin-panel-overlay)
  - [7.3 Chat-Overlay (Streamer-Bildschirm)](#73-chat-overlay-streamer-bildschirm)
  - [7.4 Karten-Marker](#74-karten-marker)
- [8. Implementierungsplan](#8-implementierungsplan)
  - [8.1 Phase 1: Twitch-Verbindung & Commands](#81-phase-1-twitch-verbindung--commands)
  - [8.2 Phase 2: Filterung & Admin-Panel](#82-phase-2-filterung--admin-panel)
  - [8.3 Phase 3: Navigation & Speicherung](#83-phase-3-navigation--speicherung)
  - [8.4 Aufwandsschätzung](#84-aufwandsschätzung)
- [9. Abhängigkeiten & Bibliotheken](#9-abhängigkeiten--bibliotheken)
  - [9.1 Externe Bibliotheken](#91-externe-bibliotheken)
  - [9.2 Bereits vorhandene APIs (CargoNavi)](#92-bereits-vorhandene-apis-cargonavi)
- [10. Dateistruktur & Code-Organisation](#10-dateistruktur--code-organisation)
  - [10.1 Navigation v3.html Erweiterungen](#101-navigation-v3html-erweiterungen)
  - [10.2 Speicher-Schema (IndexedDB)](#102-speicher-schema-indexeddb)
- [11. Internationalisierung (i18n)](#11-internationalisierung-i18n)
  - [11.1 Neue Text-Strings](#11-neue-text-strings)
- [12. Event-Referenz & Datenfluss-Detail](#12-event-referenz--datenfluss-detail)
  - [12.1 TMI.js Event-Handler](#121-tmijts-event-handler)
  - [12.2 UI-Event-Handler](#122-ui-event-handler)
- [13. Hinweise & Best Practices](#13-hinweise--best-practices)
  - [13.1 OAuth-Token Sicherheit](#131-oauth-token-sicherheit)
  - [13.2 Cooldown-Implementierung](#132-cooldown-implementierung)
  - [13.3 Fallback-Verhalten](#133-fallback-verhalten)
  - [13.4 Kompatibilität](#134-kompatibilität)

---

## 1. Projektübersicht

### 1.1 Konzept

Das Projekt erweitert CargoNavi um eine Twitch-Integration, die es dem Chat ermöglicht, per Chat-Commands Wegpunkte für eine gemeinsame Route einzureichen. Der Streamer oder Moderator überprüft die eingereichten Wegpunkte in einem Admin-Panel und kann diese bestätigen oder ablehnen. Bestätigte Wegpunkte werden automatisch in eine Route umgewandelt, die der Streamer dann live mit dem CargoNavi abfahren kann. Das gesamte System funktioniert client-seitig ohne dedizierten Backend-Server.

Die Kernidee ist es, Community-Events zu schaffen, bei denen die Zuschauer aktiv an der Routenplanung teilnehmen. Der Chat reicht Adressen ein, der Streamer wählt die besten aus, und die berechnete Route wird live auf der Karte angezeigt und abgefahren. Dies ermöglicht interaktive Inhalte wie Community-Roadtrips, Chat-entschiedene Ziele und gemeinsame Entdeckungstouren.

### 1.2 Ziele

- Viewer können per Chat-Command (`!waypoint <Adresse>`) Orte einreichen
- Admin-Panel (Streamer/Moderator) zur Überprüfung und Verwaltung der Wegpunkte
- Automatische Routenberechnung aus bestätigten Wegpunkten
- Content-Moderation: Bad-Word-Filter, Adressvalidierung, Pending-Queue
- Bot-Antworten im Chat für Transparenz (nur approved Einreichungen)
- Route speichern (IndexedDB, GPX-Export) und teilen
- Komplett client-seitig — kein Server, kein Backend nötig
- Bestehender Twitch-Bot bleibt unangetastet, CargoNavi verbindet sich zusätzlich

### 1.3 Nicht-Ziele

- Keine Channel-Points-Integration (benötigt Backend-Server)
- Keine persistenten Leaderboards über Stream-Sessions hinweg
- Keine automatische Navigation ohne Admin-Bestätigung
- Keine Veränderung des bestehenden Bot-Codes

---

## 2. Architektur & Technisches Design

### 2.1 Systemarchitektur

Das System ist als rein client-seitige Lösung konzipiert. CargoNavi verbindet sich über **tmi.js** (Twitch Message Interface) direkt per WebSocket mit dem Twitch-Chat. Es fungiert als zusätzlicher Chat-Client neben dem bestehenden Bot. Alle Datenverarbeitung, Filterung und Verwaltung findet im Browser statt. Es wird **kein separater Server** benötigt.

| Schicht | Technologie | Zweck |
|:---|:---|:---|
| **Chat-Verbindung** | tmi.js (WebSocket) | Chat lesen & schreiben |
| **Adressvalidierung** | Nominatim API (OSM) | Eingaben als echte Adresse verifizieren |
| **Content-Filter** | Bad-Word-Liste (JS) | Beleidigungen & Spam blockieren |
| **Routenberechnung** | BRouter API | Route aus bestätigten Wegpunkten |
| **Kartenanzeige** | MapLibre GL JS | Route & Wegpunkte anzeigen |
| **Datenspeicherung** | IndexedDB + localStorage | Routes, Einstellungen, Token |
| **UI** | Tailwind CSS + Custom | Sidebar, Admin-Panel, Chat-Overlay |
| **Sprachausgabe** | Web Speech API | Turn-by-Turn Navigation |

### 2.2 Datenfluss

Der folgende Ablauf beschreibt den kompletten Weg eines Wegpunkts von der Einreichung im Chat bis zur Navigation. Jeder Schritt wird im Detail in den nachfolgenden Kapiteln erläutert. Es ist wichtig zu verstehen, dass jeder Wegpunkt zwingend die Pending-Queue durchläuft und vom Admin bestätigt werden muss, bevor er in die Route aufgenommen wird.

1. Viewer sendet im Chat: `!waypoint Brandenburger Tor, Berlin`
2. CargoNavi empfängt Nachricht über tmi.js WebSocket-Verbindung
3. Command-Parser extrahiert die Adresse aus der Nachricht
4. **Cooldown-Check:** Wurde der Command in den letzten X Sekunden bereits genutzt?
5. **User-Limit-Check:** Hat der Viewer bereits das Maximum pro Session erreicht?
6. **Follower-Check** (optional): Ist der Viewer überhaupt Follower?
7. **Bad-Word-Filter:** Enthält die Eingabe verbotene Wörter?
8. **Nominatim-Validierung:** Ist die Eingabe eine gültige Adresse mit Koordinaten?
9. Wegpunkt wird in **Pending-Queue** eingefügt (Status: wartend)
10. Bot sendet Bestätigung im Chat: `@viewer dein Wegpunkt wartet auf Bestätigung`
11. **Admin** sieht den Wegpunkt im Admin-Panel und klickt **Approve** oder **Reject**
12. Bei Approve: Bot meldet im Chat, Wegpunkt wird zur Route hinzugefügt
13. **Route wird automatisch neu berechnet** mit allen bestätigten Wegpunkten
14. **Streamer startet Navigation** — Route wird live auf der Karte angezeigt

### 2.3 Architektur-Diagramm

```
Twitch Chat (irc.chat.twitch.tv:443)
     ↕↕  WebSocket (tmi.js)

CargoNavi (Browser)
  ├── Chat Listener Module
  ├── Command Parser (!waypoint, !route, !clear)
  ├── Content Filter (Bad-Word + Nominatim)
  ├── Pending Queue Manager
  ├── Admin Panel Controller
  ├── Route Builder (BRouter API)
  ├── Navigation Engine (GPS/Demo)
  ├── Storage Manager (IndexedDB)
  └── Chat Bot Response Handler
```

---

## 3. Twitch-Integration

### 3.1 Verbindungsaufbau

CargoNavi verbindet sich über die **tmi.js** Bibliothek per WebSocket direkt mit dem Twitch-Chat. Der Benutzer muss lediglich seinen Kanalnamen, den Bot-Namen und einen OAuth-Token eingeben. Diese Credentials werden verschlüsselt im localStorage gespeichert und bei jedem Besuch automatisch geladen. Der bestehende Bot des Streamers bleibt völlig unangetastet — CargoNavi verbindet sich als **zusätzliches Client**.

Der OAuth-Token wird nur mit den Scopes `chat:read` und `chat:edit` angefordert, was den minimal notwendigen Berechtigungsumfang darstellt. Der Token kann über https://twitchtokengenerator.com/ generiert werden, was den Setup-Prozess für den Streamer so einfach wie möglich gestaltet.

### 3.2 Setup-UI (Twitch Panel in der Sidebar)

Das Twitch-Setup wird als neues Panel in der CargoNavi-Sidebar integriert. Es enthält Eingabefelder für die Verbindung und erweiterte Einstellungen. Das Panel ist standardmäßig eingeklappt und kann per Klick auf "Twitch Integration" geöffnet werden. Nach dem ersten Setup werden die Daten automatisch geladen und die Verbindung wird bei Aktivierung automatisch hergestellt.

#### Verbindungseinstellungen

| Feld | Typ | Standard | Beschreibung |
|:---|:---|:---|:---|
| **Kanal** | Text-Input | — | Twitch Kanalname (z.B. nicetotechyou) |
| **Bot-Name** | Text-Input | — | Name des Bot-Accounts |
| **OAuth Token** | Password-Input | — | Token von twitchapps.com/tmi |
| **Auto-Connect** | Toggle | false | Verbindung beim Start automatisch herstellen |

#### Command-Einstellungen

| Feld | Typ | Standard | Beschreibung |
|:---|:---|:---|:---|
| **Command** | Text-Input | `!waypoint` | Trigger-Command für Wegpunkte |
| **Cooldown** | Number | `30` | Mindestabstand in Sekunden zwischen Nutzungen |
| **Max pro User** | Number | `3` | Maximale Einreichungen pro User pro Session |
| **Max gesamt** | Number | `20` | Maximale Wegpunkte pro Session |
| **Follower-Only** | Toggle | `false` | Nur Follower dürfen einreichen |
| **Min. Follow-Zeit** | Number | `0` | Mindest-Follow-Zeit in Minuten |

#### Filter-Einstellungen

| Feld | Typ | Standard | Beschreibung |
|:---|:---|:---|:---|
| **Bad-Word-Filter** | Toggle | `true` | Aktiviert den Beleidigungs-Filter |
| **Adressvalidierung** | Toggle | `true` | Nur gültige Adressen zulassen |
| **Max. Zeichen** | Number | `100` | Maximale Länge der Eingabe |

### 3.3 Chat-Commands

Das System unterstützt mehrere Chat-Commands, die von Viewern und Moderatoren genutzt werden können. Commands werden nur erkannt, wenn CargoNavi mit dem Chat verbunden ist und die Twitch-Integration aktiv ist. Die Commands sind so gestaltet, dass sie intuitiv und leicht zu merken sind.

| Command | Rolle | Beschreibung | Beispiel |
|:---|:---|:---|:---|
| `!waypoint <Adresse>` | Viewer | Reicht eine Adresse als Wegpunkt ein | `!waypoint Brandenburger Tor, Berlin` |
| `!route` | Viewer | Zeigt aktuelle Route & nächsten Stop | `!route` |
| `!stops` | Viewer | Zeigt alle bestätigten Wegpunkte | `!stops` |
| `!clearroute` | Mod/Streamer | Löscht alle Wegpunkte & Route | `!clearroute` |
| `!approve <Nr>` | Mod/Streamer | Bestätigt Wegpunkt aus der Queue | `!approve 3` |
| `!reject <Nr>` | Mod/Streamer | Lehnt Wegpunkt ab | `!reject 3` |

> **Hinweis:** Die Mod/Streamer-Commands (`!clearroute`, `!approve`, `!reject`) können auch über das Admin-Panel bedient werden. Chat-Commands sind ein zusätzlicher Weg für Moderatoren, die ohnehin im Chat aktiv sind.

### 3.4 Bot-Antworten im Chat

Der Bot sendet automatisch Nachrichten in den Chat, um den Viewern Feedback zu geben. Wichtig dabei ist, dass **nur approved Wegpunkte öffentlich gemeldet** werden. Abgelehnte Einreichungen werden stillschweigend verworfen, um Trolls keine Aufmerksamkeit zu geben.

| Ereignis | Bot-Nachricht | Sichtbar für |
|:---|:---|:---|
| Eingereicht (pending) | 🚲 `@viewer` hat eine Adresse eingereicht — wartet auf Bestätigung! | Alle |
| Approved | ✅ `@viewer` dein Wegpunkt wurde zur Route hinzugefügt! | Alle |
| Rejected | *(keine Nachricht)* | Niemanden |
| Ungültige Adresse | ❌ `@viewer` das ist keine gültige Adresse — versuch z.B. `!waypoint Brandenburger Tor, Berlin` | Nur den User |
| Cooldown | ⏳ `@viewer` bitte warte noch kurz bevor du den nächsten Wegpunkt einreichst | Nur den User |
| Limit erreicht | 🚫 `@viewer` du hast das Maximum an Wegpunkten für diesen Stream erreicht | Nur den User |
| Route gestartet | 🏁 Die Community-Route wurde gestartet! Nächster Halt: *[Ziel]* | Alle |
| Wegpunkt erreicht | 🎯 Zwischenstopp erreicht: *[Name]* — nächster Halt: *[Ziel]* | Alle |
| Route beendet | 🏆 Community-Reise abgeschlossen! *[Anzahl]* Stopps, *[Distanz]* km | Alle |

---

## 4. Admin-Panel

### 4.1 Übersicht

Das Admin-Panel ist die zentrale Steuerungsoberfläche für den Streamer und Moderatoren. Es wird als Overlay auf der Karte angezeigt und kann per Button in der Sidebar oder per Tastenkürzel aufgerufen werden. Das Panel zeigt alle eingereichten Wegpunkte, ihre Status und ermöglicht die Verwaltung der Route. Das Design ist so gewählt, dass es während des Streams gut lesbar und bedienbar ist.

Das Panel besteht aus zwei Hauptbereichen: der **Pending-Queue** (neue Einreichungen) und der **Route-Liste** (bestätigte Wegpunkte). Zusätzlich gibt es Kontrollbuttons zum Starten, Stoppen und Exportieren der Route. Die Oberfläche ist responsiv und funktioniert sowohl im Vollbild als auch im sidebar-Layout.

### 4.2 Panel-Bereiche

#### 4.2.1 Pending Queue

Die Pending Queue zeigt alle eingereichten Wegpunkte, die noch auf Bestätigung warten. Jeder Eintrag zeigt den Nutzernamen, die Adresse, den Zeitstempel der Einreichung und die Validierungsergebnisse (Adressprüfung bestanden/nicht bestanden). Der Admin kann jeden Eintrag einzeln über Approve/Reject-Buttons bestätigen oder ablehnen. Es gibt auch Bulk-Actions um alle auf einmal zu bearbeiten.

```
Pending Queue (max. 50 Einträge sichtbar, Scrollbar):

⏳ [1] @viewer2000 | Brandenburger Tor, Berlin | vor 2 Min. | ✅ Adresse  [APPROVE] [REJECT]
⏳ [2] @xXTrollXx  | lol xd                  | vor 1 Min. | ❌ Keine Adresse  [APPROVE] [REJECT]
⏳ [3] @fan_girl92 | Europa-Park, Rust        | vor 30 Sek. | ✅ Adresse  [APPROVE] [REJECT]

  [ALLE BESTÄTIGEN]  [ALLE ABLEHNEN]  [QUEUE LEEREN]
```

#### 4.2.2 Route-Liste (Bestätigte Wegpunkte)

Die Route-Liste zeigt alle bestätigten Wegpunkte in der Reihenfolge, in der sie abgefahren werden. Die Reihenfolge kann per **Drag-and-Drop** angepasst werden. Jeder Eintrag zeigt den Namen, den Viewer der ihn eingereicht hat, und die Entfernung zum nächsten Wegpunkt. Die Gesamtstrecke und die geschätzte Fahrzeit werden am Ende der Liste angezeigt.

```
Community Route (4 Wegpunkte, ~127 km, ~6:30 Std.):

📍 START  | Aktuelle Position
🚲 STOP 1 | Brandenburger Tor, Berlin    (@viewer2000)  | 12 km
🚲 STOP 2 | Europa-Park, Rust           (@fan_girl92)  | 58 km
🚲 STOP 3 | Schloss Neuschwanstein       (@bike_fan)   | 42 km
🚲 STOP 4 | Marienplatz, München       (@nicetotechyou) | 15 km

  [ROUTE BERECHNEN]  [NAVIGATION STARTEN]  [GPX EXPORTIEREN]
  [ROUTE LÖSCHEN]  [WAYPOINT HINZUFÜGEN]
```

### 4.3 Kontroll-Buttons

| Button | Aktion | Beschreibung |
|:---|:---|:---|
| **Route berechnen** | BRouter API | Berechnet die optimale Route durch alle Wegpunkte |
| **Navigation starten** | GPS/Demo | Startet die Navigation entlang der berechneten Route |
| **GPX exportieren** | Download | Exportiert die Route als GPX-Datei zum Speichern |
| **Route löschen** | Reset | Löscht alle bestätigten Wegpunkte und die Route |
| **Wegpunkt hinzufügen** | Manual | Öffnet Adresssuche für manuelle Wegpunkte |
| **Verbinden/Trennen** | tmi.js | Verbindet oder trennt die Twitch-Chat-Verbindung |

---

## 5. Sicherheit & Content-Moderation

### 5.1 Schutz-Ebenen

Das Sicherheitssystem ist mehrschichtig aufgebaut, um sicherzustellen, dass kein unerwünschter Inhalt im Stream angezeigt wird. Jede Schicht filtert einen bestimmten Aspekt und in Kombination ergibt sich ein umfassender Schutz. Die wichtigste Regel ist: **Nichts geht live ohne Admin-Bestätigung.** Selbst wenn alle automatischen Filter einen Eintrag durchlassen, hat der Admin immer das letzte Wort.

| Schicht | Mechanismus | Filtert |
|:---|:---|:---|
| **1. Twitch AutoMod** | Twitch-seitig | Beleidigungen, Hassrede (bereits im Chat) |
| **2. Follower-Check** | Client-seitig | Nur Follower dürfen einreichen (optional) |
| **3. Cooldown** | Client-seitig | Spam-Verhinderung (z.B. 30s zwischen Commands) |
| **4. User-Limit** | Client-seitig | Max. X Einreichungen pro User pro Session |
| **5. Bad-Word-Filter** | Client-seitig | Deutsche & englische Schimpfwörter, L33t-Speak, Variationen |
| **6. Adressvalidierung** | Nominatim API | Nur gültige Adressen mit Koordinaten |
| **7. Längenbegrenzung** | Client-seitig | Max. Zeichenanzahl (Standard: 100) |
| **8. Pending-Queue** | Admin-Panel | Manuelle Freigabe durch Streamer/Mod |

### 5.2 Bad-Word-Filter Details

Der Bad-Word-Filter arbeitet mit einer JavaScript-Wortliste, die deutsche und englische Begriffe enthält. Er erkennt auch Variationen wie L33t-Speak (z.B. `f4ck`, `h4te`), getrennte Wörter (`f i c k`) und Sonderzeichen-Ersetzungen. Die Wortliste ist als JavaScript-Array im Code hinterlegt und kann bei Bedarf erweitert werden. Bei einem Treffer wird der Wegpunkt automatisch abgelehnt, ohne dass der Admin ihn sieht.

### 5.3 Silent Reject Prinzip

Das psychologisch wichtigste Feature ist der **Silent Reject**. Abgelehnte Einreichungen (egal ob durch Filter oder Admin) werden im Chat **nicht erwähnt**. Der einreichende Viewer erhält höchstens eine private Benachrichtigung (whisper oder focused message), aber der öffentliche Chat sieht nichts. Dies entzieht Trolls die Aufmerksamkeit, die sie suchen. Nur erfolgreiche Einreichungen werden öffentlich gemeldet, was **positive Gamification** fördert.

---

## 6. Datenmodell & Speicherung

### 6.1 Wegpunkt-Datenstruktur

Jeder Wegpunkt wird als JavaScript-Objekt mit folgenden Eigenschaften gespeichert. Diese Struktur wird sowohl in der Pending-Queue als auch in der Route-Liste verwendet. Der Status unterscheidet zwischen `pending` (wartend), `approved` (bestätigt), `rejected` (abgelehnt) und `active` (aktuell angefahren).

| Feld | Typ | Beschreibung |
|:---|:---|:---|
| `id` | string | Eindeutige ID (UUID oder Timestamp-basiert) |
| `username` | string | Twitch-Username des Einreichers |
| `displayName` | string | Anzeigename (inkl. Farbcode) |
| `input` | string | Original-Eingabe des Viewers |
| `address` | string | Normalisierte Adresse (Nominatim Result) |
| `lat` | number | Breitengrad |
| `lon` | number | Längengrad |
| `status` | string | `pending` \| `approved` \| `rejected` \| `active` |
| `timestamp` | number | Unix-Timestamp der Einreichung |
| `queueNumber` | number | Position in der Pending-Queue |
| `routeOrder` | number | Position in der Route (nach Approve) |
| `addressValid` | boolean | Nominatim-Validierung erfolgreich |
| `badWordFound` | boolean | Bad-Word-Filter ausgelöst |

### 6.2 Session-Datenstruktur

Die Session speichert den Gesamtzustand der Twitch-Integration für den aktuellen Stream. Sie enthält die Verbindungsinformationen, die aktuellen Wegepunkte und die Routing-Ergebnisse. Die Session wird in IndexedDB gespeichert und beim nächsten Besuch wiederhergestellt.

| Feld | Typ | Beschreibung |
|:---|:---|:---|
| `channel` | string | Twitch Kanalname |
| `botName` | string | Bot-Account Name |
| `connected` | boolean | Chat-Verbindung aktiv |
| `pendingWaypoints` | Array | Alle pending Wegpunkte |
| `approvedWaypoints` | Array | Alle bestätigten Wegpunkte |
| `routeData` | Object | BRouter Routing-Ergebnis (GeoJSON) |
| `stats` | Object | Session-Statistiken (siehe unten) |
| `settings` | Object | Command/Filter Einstellungen |

### 6.3 Session-Statistiken

Für die Transparenz im Stream und für das Chat-Overlay werden Statistiken pro Session erfasst. Diese können von Viewern mit `!route` oder `!stops` abgefragt werden.

| Statistik | Typ | Beschreibung |
|:---|:---|:---|
| `totalSubmitted` | number | Gesamt eingereichte Wegpunkte |
| `totalApproved` | number | Davon bestätigt |
| `totalRejected` | number | Davon abgelehnt |
| `totalDistance` | number | Gesamtstrecke der Route in km |
| `estimatedTime` | string | Geschätzte Fahrzeit |
| `topContributor` | string | User mit meisten approved WP |
| `sessionStart` | number | Startzeitpunkt der Session |

### 6.4 Speicher-Strategie

Alle Daten werden client-seitig gespeichert, ohne dass ein Server oder Cloud-Dienst benötigt wird. Die Speicherung erfolgt auf zwei Ebenen: **localStorage** für kleine, häufig benütigte Daten (Einstellungen, Token) und **IndexedDB** für größere Datenmengen (Wegpunkte, Routing-Ergebnisse, gespeicherte Routen).

| Daten | Speicher | Beschreibung |
|:---|:---|:---|
| Twitch Token & Einstellungen | localStorage | Verschlüsselt, maskiert in der UI |
| Sprache, Dark Mode | localStorage | Bereits vorhanden in CargoNavi |
| Aktuelle Session | IndexedDB | Wegpunkte, Route, Stats |
| Gespeicherte Routen | IndexedDB | Abgeschlossene Routen zum Laden |
| Fahrzeugbilder | Cache API | Bereits vorhanden (SW Precache) |

---

## 7. UI-Komponenten

### 7.1 Sidebar-Erweiterungen

Die bestehende CargoNavi-Sidebar wird um folgende Bereiche erweitert. Alle neuen Elemente fügen sich nahtlos in das bestehende Design ein und respektieren Dark Mode und Responsive Layout.

- **Twitch-Panel** (einklappbar): Verbindungseinstellungen, Statusanzeige (Grün/Rot), Connect/Disconnect Button
- **Twitch-Status-Anzeige**: "Verbunden mit #kanal" oder "Nicht verbunden" mit User-Anzahl
- **Pending-Counter**: Badge "3 neu" auf dem Twitch-Panel bei neuen Einreichungen
- **Session-Stats-Box**: Kurzanzeige mit Anzahl Wegpunkte, Strecke, Fahrzeit
- **Route-Speicher Button**: "Route speichern" in IndexedDB
- **Meine Routen**: Öffnet Liste gespeicherter Routen zum Laden/Löschen

### 7.2 Admin-Panel Overlay

Das Admin-Panel wird als Overlay über der Karte angezeigt. Es ist halbtransparent und kann verschoben und in der Größe angepasst werden, damit der Streamer es neben dem Stream-Layout positionieren kann.

- **Titelzeile**: "Admin Panel — Community Route" mit Schließen-Button
- **Pending-Queue**: Scrollbare Liste mit Approve/Reject Buttons pro Eintrag
- **Route-Liste**: Drag-and-Drop sortierbare Liste der bestätigten Wegpunkte
- **Karten-Mini-Vorschau**: Kleine Karte im Panel zeigt die aktuelle Route
- **Kontrollbuttons**: Route berechnen, Starten, Exportieren, Löschen
- **Statistik-Bereich**: Anzahl Einreichungen, bestätigt, abgelehnt, Top-Contributor
- **Responsive**: Funktioniert auf Desktop (Overlay) und Mobile (Fullscreen)
- **Tastenkürzel**: `Strg+T` zum Öffnen/Schließen des Admin-Panels

### 7.3 Chat-Overlay (Streamer-Bildschirm)

Ein kleines, halbtransparentes Overlay auf der Karte zeigt die letzten Chat-Nachrichten bezogen auf CargoNavi. Dieses Overlay ist speziell für den Stream gedacht, damit der Streamer die Einreichungen direkt auf der Karte sehen kann, ohne den Twitch-Chat im Auge behalten zu müssen. Es zeigt nur relevante Nachrichten (Wegpunkt-Einreichungen, Bot-Antworten) und blendet sich nach wenigen Sekunden automatisch aus.

### 7.4 Karten-Marker

Neue Marker auf der Karte unterscheiden sich visuell von den bestehenden POI-Markern, um sofort erkennbar zu sein:

| Marker | Farbe | Symbol | Beschreibung |
|:---|:---|:---|:---|
| **Pending-Wegpunkt** | Gelb | ⏳ | Wartet auf Bestätigung, pulsierend |
| **Approved-Wegpunkt** | Grün | 📍 | In der Route aufgenommen |
| **Aktiver Wegpunkt** | Blau | 🚲 | Aktuell angefahren |
| **Erreicht** | Grau | ✅ | Bereits abgefahren |

---

## 8. Implementierungsplan

### 8.1 Phase 1: Twitch-Verbindung & Commands

Die erste Phase konzentriert sich auf die Grundinfrastruktur: die Verbindung zum Twitch-Chat, das Parsing von Commands und die Basis-Validierung. Nach dieser Phase kann CargoNavi bereits Chat-Nachrichten empfangen und auf `!waypoint` reagieren. Die Wegpunkte werden zunächst nur in der Konsole protokolliert.

- [ ] tmi.js Bibliothek in CargoNavi einbinden (CDN oder inline)
- [ ] Twitch-Setup-Panel in Sidebar erstellen (Eingabefelder für Kanal, Bot, Token)
- [ ] Verbindungslogik implementieren (connect, disconnect, reconnect)
- [ ] Token verschlüsselt in localStorage speichern
- [ ] Chat-Listener für `!waypoint` Command implementieren
- [ ] Command-Parser: Adresse aus Nachricht extrahieren
- [ ] Cooldown-System pro User implementieren
- [ ] User-Limit-System pro Session implementieren
- [ ] Statusanzeige in Sidebar (Verbunden/Nicht verbunden)
- [ ] Follower-Check implementieren (Twitch API Call oder TMI WHOIS)

### 8.2 Phase 2: Filterung & Admin-Panel

Die zweite Phase baut die Content-Moderation und das Admin-Panel auf. Hier entsteht die Pending-Queue, der Bad-Word-Filter und die Adressvalidierung. Am Ende dieser Phase kann der Admin Wegpunkte überprüfen und verwalten.

- [ ] Bad-Word-Filter implementieren (deutsch/englische Wortliste, L33t-Speak Erkennung)
- [ ] Nominatim Adressvalidierung implementieren (async, mit Timeout)
- [ ] Pending-Queue Datenstruktur & Logik aufbauen
- [ ] Admin-Panel UI als Overlay erstellen
- [ ] Approve/Reject Buttons mit Logik verknüpfen
- [ ] Bot-Response Handler implementieren (Chat-Nachrichten senden)
- [ ] Drag-and-Drop Sortierung in Route-Liste
- [ ] Route aus bestätigten Wegpunkten zusammenbauen
- [ ] Karten-Marker für Wegpunkte (Pending, Approved, Active, Reached)
- [ ] Bulk-Actions (Alle bestätigen, Alle ablehnen)

### 8.3 Phase 3: Navigation & Speicherung

Die dritte Phase verbindet die bestätigten Wegpunkte mit dem bestehenden Navigationssystem von CargoNavi und fügt die Speicher-Funktionen hinzu. Am Ende dieser Phase ist das System voll funktionsfähig.

- [ ] BRouter API: Route durch alle bestätigten Wegpunkte berechnen
- [ ] Multi-Wegpunkt-Routing (Route durch N Punkte optimieren)
- [ ] Navigation entlang der Community-Route (GPS und Demo-Modus)
- [ ] Auto-Transition: Erkennung wenn ein Zwischenstopp erreicht wird
- [ ] Bot-Announce bei Erreichen eines Zwischenstopps
- [ ] Bot-Announce bei Abschluss der Route
- [ ] IndexedDB Speicher-System: Route nach Session speichern
- [ ] Meine Routen UI: Gespeicherte Routen anzeigen, laden, löschen
- [ ] GPX-Export für Community-Routen
- [ ] Session-Statistiken & Top-Contributor Ermittlung
- [ ] Chat-Overlay auf der Karte (letzte Einreichungen)
- [ ] Route teilen: URL-Hash mit Base64-kodierter Route

### 8.4 Aufwandsschätzung

| Phase | Teile | Geschätzter Aufwand |
|:---|:---|:---|
| **Phase 1** | Twitch-Verbindung & Commands | 1–2 Tage |
| **Phase 2** | Filterung & Admin-Panel | 2–3 Tage |
| **Phase 3** | Navigation & Speicherung | 2–3 Tage |
| **Gesamt** | Alle Phasen | **5–8 Tage** |

---

## 9. Abhängigkeiten & Bibliotheken

### 9.1 Externe Bibliotheken

Alle neuen Abhängigkeiten werden über CDN oder als inline-Script in die bestehende `navigation_v3.html` eingebunden. Es werden keine Build-Tools oder npm-Module benötigt, um die Kompatibilität mit der aktuellen Single-File-Architektur zu gewährleisten.

| Bibliothek | Version | CDN | Zweck |
|:---|:---|:---|:---|
| **tmi.js** | v1.8+ | unpkg.com | Twitch Chat WebSocket Client |
| **SortableJS** | v1.15+ | cdn.jsdelivr.net | Drag-and-Drop für Route-Liste |
| **idb** | v8.0+ | cdn.jsdelivr.net | IndexedDB Wrapper (optional) |

### 9.2 Bereits vorhandene APIs (CargoNavi)

Die Twitch-Integration nutzt verschiedene bereits vorhandene APIs und Module von CargoNavi. Diese müssen nicht neu implementiert werden, sondern werden durch die neuen Module erweitert.

- **BRouter API**: Bereits vorhanden, wird für Multi-Wegpunkt-Routing erweitert
- **Nominatim API**: Bereits vorhanden (Adresssuche), wird für Validierung genutzt
- **MapLibre GL JS**: Bereits vorhanden, wird um neue Marker erweitert
- **Web Speech API**: Bereits vorhanden, wird für Navigation genutzt
- **IndexedDB**: Neue Implementierung, parallel zu localStorage
- **i18n-System**: Bereits vorhanden, wird um Twitch-Strings erweitert
- **Dark Mode**: Bereits vorhanden, wird auf neue UI-Elemente angewendet

---

## 10. Dateistruktur & Code-Organisation

### 10.1 Navigation v3.html Erweiterungen

Da CargoNavi eine Single-File-Architektur verwendet, werden alle neuen Funktionen in die bestehende `navigation_v3.html` integriert. Der Code wird in logische Sektionen mit Kommentaren gegliedert.

| Code-Bereich | Position | Beschreibung |
|:---|:---|:---|
| `tmi.js` Script | `<head>` | CDN-Import der Twitch Chat Bibliothek |
| `SortableJS` Script | `<head>` | CDN-Import für Drag-and-Drop |
| `TwitchManager` | `<script>` | Klasse: Chat-Verbindung, Command-Parsing |
| `ContentFilter` | `<script>` | Klasse: Bad-Word-Filter, Adressvalidierung |
| `PendingQueue` | `<script>` | Klasse: Wegpunkt-Warteschlange-Verwaltung |
| `AdminPanel` | `<script>` | Klasse: Admin-Panel UI & Logik |
| `RouteStorage` | `<script>` | Klasse: IndexedDB Speicher-Operationen |
| `TwitchUI` | `<script>` | Klasse: Sidebar-Panel, Statusanzeigen |
| `ChatOverlay` | `<script>` | Klasse: Karten-Chat-Overlay |
| `WaypointMarker` | `<script>` | Klasse: Karten-Marker für Wegpunkte |
| `BotResponder` | `<script>` | Klasse: Chat-Bot Antworten |
| `SessionStats` | `<script>` | Klasse: Session-Statistiken |
| `i18n Twitch` | `<script>` | Alle neuen Text-Strings (DE/EN) |
| `Twitch CSS` | `<style>` | Styles für Admin-Panel, Marker, Overlay |

### 10.2 Speicher-Schema (IndexedDB)

Die IndexedDB-Datenbank wird **`CargoNaviDB`** genannt und enthält folgende Object Stores:

- **twitchSessions**: Speichert aktuelle und vergangene Twitch-Sessions
- **savedRoutes**: Gespeicherte Community-Routen mit Wegpunkten und Routing-Daten
- **waypointHistory**: Verlauf aller eingereichten Wegpunkte über alle Sessions

---

## 11. Internationalisierung (i18n)

### 11.1 Neue Text-Strings

Alle neuen UI-Elemente und Bot-Nachrichten müssen in Deutsch und Englisch verfügbar sein. Das bestehende i18n-System wird um einen neuen Abschnitt `twitch` erweitert.

| Schlüssel | Deutsch | Englisch |
|:---|:---|:---|
| `twitch.title` | Twitch Integration | Twitch Integration |
| `twitch.connect` | Verbinden | Connect |
| `twitch.disconnect` | Trennen | Disconnect |
| `twitch.connected` | Verbunden mit #{channel} | Connected to #{channel} |
| `twitch.disconnected` | Nicht verbunden | Not connected |
| `twitch.pending` | Wartend | Pending |
| `twitch.approved` | Bestätigt | Approved |
| `twitch.rejected` | Abgelehnt | Rejected |
| `twitch.route` | Community-Route | Community Route |
| `twitch.adminPanel` | Admin Panel | Admin Panel |
| `twitch.saveRoute` | Route speichern | Save Route |
| `twitch.myRoutes` | Meine Routen | My Routes |
| `twitch.submitWaypoint` | @{user} hat eine Adresse eingereicht | @{user} submitted an address |
| `twitch.approvedMsg` | @{user} dein Wegpunkt wurde zur Route hinzugefügt! | @{user} your waypoint was added to the route! |
| `twitch.invalidAddress` | @{user} das ist keine gültige Adresse | @{user} that is not a valid address |
| `twitch.cooldown` | @{user} bitte warte noch kurz | @{user} please wait a moment |
| `twitch.routeStarted` | Community-Route gestartet! Nächster Halt: {next} | Community route started! Next stop: {next} |
| `twitch.stopReached` | Zwischenstopp erreicht: {name} | Stop reached: {name} |
| `twitch.routeComplete` | Community-Reise abgeschlossen! {stops} Stopps, {dist} km | Community trip complete! {stops} stops, {dist} km |

---

## 12. Event-Referenz & Datenfluss-Detail

### 12.1 TMI.js Event-Handler

Die folgenden Twitch-Events werden von CargoNavi behandelt. Jeder Event-Handler ist dafür verantwortlich, eingehende Chat-Nachrichten zu verarbeiten und entsprechende Aktionen auszulösen.

| Event | Handler | Aktion |
|:---|:---|:---|
| `connected` | `onConnect` | Statusanzeige grün, Bot-Nachricht: *CargoNavi ist online!* |
| `disconnected` | `onDisconnect` | Statusanzeige rot, Warne-Overlay |
| `message` | `onMessage` | Command-Parsing, Filterung, Queue-Verwaltung |
| `chat` | `onChat` | Chat-Overlay aktualisieren |
| `reconnect` | `onReconnect` | Automatische Wiederverbindung |

### 12.2 UI-Event-Handler

| UI-Element | Event | Aktion |
|:---|:---|:---|
| Connect Button | `click` | Twitch-Verbindung herstellen/trennen |
| Approve Button | `click` | Wegpunkt bestätigen, Route neu berechnen |
| Reject Button | `click` | Wegpunkt ablehnen, Queue aktualisieren |
| Drag-and-Drop | `sort` | Reihenfolge der Route ändern |
| Route berechnen | `click` | BRouter API mit allen approved WPs aufrufen |
| Navigation starten | `click` | Bestehende `startNavigation()` mit Route nutzen |
| GPX exportieren | `click` | Route als GPX herunterladen |
| Route speichern | `click` | Route + Wegpunkte in IndexedDB speichern |
| Admin Panel Toggle | `click` / `Ctrl+T` | Admin-Panel öffnen/schließen |
| Twitch Panel | `click` | Einklappen/Ausklappen |

---

## 13. Hinweise & Best Practices

### 13.1 OAuth-Token Sicherheit

Der OAuth-Token wird im `localStorage` gespeichert und in der UI maskiert (`****`) angezeigt. Da CargoNavi eine client-seitige Anwendung ist, kann der Token theoretisch von jedem mit Tab-Zugriff gelesen werden. Dies ist ein akzeptables Risiko, da der Token nur mit den Scopes `chat:read` und `chat:edit` generiert wird und keine sensiblen Berechtigungen enthält. Der Token kann jederzeit auf Twitch widerrufen werden.

### 13.2 Cooldown-Implementierung

Das Cooldown-System verwendet ein `Map`-Objekt, das den letzten Nutzungsjieitpunkt pro Username speichert. Bei jedem `!waypoint` Command wird geprüft, ob die Cooldown-Zeit seit der letzten Nutzung abgelaufen ist. Das System ist unabhängig vom globalen Chat-Rate-Limiting von Twitch und funktioniert rein client-seitig.

### 13.3 Fallback-Verhalten

Wenn die Nominatim API nicht erreichbar ist oder ein Timeout auftritt, wird die Adressvalidierung übersprungen und der Wegpunkt wird direkt in die Pending-Queue aufgenommen mit dem Flag `addressValid: null`. Der Admin kann dann manuell entscheiden. Dies stellt sicher, dass das System auch bei API-Ausfällen funktionsfähig bleibt.

Wenn die Twitch-Verbindung abbricht, wird automatisch alle 10 Sekunden ein Reconnect versucht. Der Connection-Status wird in der UI angezeigt. Bereits in der Queue befindliche Wegpunkte bleiben erhalten und werden nicht gelöscht.

### 13.4 Kompatibilität

Die Twitch-Integration wurde so konzipiert, dass sie die bestehenden CargoNavi-Funktionen in keiner Weise beeinträchtigt. Alle neuen Features sind **optional** — wenn die Twitch-Integration nicht aktiv ist, funktioniert CargoNavi genau wie vorher. Die bestehenden Navigation, POI-Suche, Sprachnavigation und alle anderen Features bleiben unangetastet. Der Code ist modular aufgebaut, sodass die Twitch-Module bei Bedarf komplett entfernt werden könnten, ohne den Rest der Anwendung zu beeinflussen.

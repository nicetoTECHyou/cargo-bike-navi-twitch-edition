# Changelog — CargoNavi Navigation System

All notable changes to CargoNavi will be documented in this file.

---

## [v1.1] — Smart Waypoint Routing & Twitch Bugfixes — 2026-04-05

### Added
- **Smart Auto-Sort Waypoints** — Approved community waypoints are automatically sorted by distance from your current GPS position (nearest first, farthest last). Uses `haversine()` calculation with live GPS coordinates.
- **Auto VIA / Finish Assignment** — The farthest approved waypoint is automatically labeled as **Finish** (🏁 amber). All other approved waypoints become **Via** stops (📍 blue). With only 1 waypoint, it's always the Finish.
- **Smart Finish Replacement** — When a newly approved waypoint is farther away than the current Finish, the new point automatically becomes the Finish and the old Finish is demoted to a Via stop. No manual reordering needed.
- **Auto-Recalculate Route** — Route recalculates automatically (800ms debounce) every time you approve, reject, or remove a waypoint. No need to click "Calculate Route" while driving — just approve and go.
- **Tap to Set Finish** — Click any Via waypoint in the approved list to manually promote it to Finish. The old Finish becomes a Via, the list re-sorts, and the route recalculates.
- **Remove Approved Waypoint** — Each approved waypoint now has an ✕ button to remove it from the route. Route auto-recalculates.
- **Distance Badges** — Each approved waypoint shows its distance from your current GPS position (e.g., "2.3km", "150m", "?" if unknown).
- **Color-Coded Route List** — Via items are blue-themed, Finish items are amber/gold-themed. Visual distinction at a glance.

### Fixed
- **Chat Messages Not Showing** — `onChatMessage()` discarded ALL non-command messages with `if (!text.startsWith('!')) return;`. Now ALL incoming Twitch chat messages are displayed in the chat panel. Command processing happens separately after display.
- **Commands Not Accepted (Case Sensitivity)** — Command comparison `command === this.settings.command` was case-sensitive. If the user typed `!Waypoint` in settings but viewers sent `!waypoint`, it wouldn't match. Fixed with `.toLowerCase()` on both sides.
- **ContentFilter False Positive on "Kassel"** — The bad-word filter used substring matching (`includes()`), so "Kassel" matched "ass" and was silently rejected. Rewrote filter to use word-start matching (`startsWith()`): "Kassel" no longer matches "ass", but "asshole" still does. L33t-speak detection ("f4ck", "s h i t") still works via concatenated text check.
- **Duplicate Chat Messages** — Removed redundant `addChatMessage()` calls from `handleWaypoint()` and `handleRoute()` since all messages are now displayed in `onChatMessage()` before command processing.
- **Route Not Cleared on `!clearroute`** — The `handleClearRoute()` chat command now also clears the route from the map and resets the distance/time stats display.

### Changed
- **`renderRouteList()`** — Completely rewritten. Now shows route order number, role label (Via/Finish), waypoint address, submitter, distance badge, and remove button. Items are color-coded by role.
- **`ContentFilter.check()`** — Rewrote from single-pass `includes()` to word-boundary-aware matching. Single words use `startsWith()` per word (catches "asshole" but not "Kassel"). Multi-segment l33t-speak words (containing spaces) use concatenated text check.
- **`handleClearRoute()`** — Now clears route GeoJSON from map source and resets stats display.

### Design Decisions
- **Why auto-recalculate?** When driving, you can't tap "Calculate Route" after every approval. Auto-recalculate with 800ms debounce handles rapid approvals gracefully (approving 5 waypoints quickly triggers only one calculation).
- **Why near-to-far sorting?** The most intuitive route for a cargo bike delivery is: nearest stop first, work your way outward, farthest point last. Viewers don't need to know the order — the app figures it out.
- **Why word-start matching for bad words?** Substring matching ("Kassel" contains "ass") produces too many false positives on normal city names and addresses. Word-start matching is stricter: it catches standalone profanity and prefixed forms ("asshole") while allowing legitimate words ("Kassel", "classic", "pass").

### Technical Notes
- `getDistFromPos(wp)` uses `haversine()` with `state.lastGpsLat/Lng` for distance calculation
- `sortAndLabelWaypoints()` handles both sort and role assignment in one pass
- `setAsFinish(index)` uses closure-bound `onclick` handlers for correct index binding
- `autoCalculateRoute()` uses `setTimeout`/`clearTimeout` pattern for debouncing
- Route order: `GPS Position` → `Via 1` (nearest) → `Via 2` → ... → `Finish` (farthest)
- ContentFilter preserves l33t-speak detection by checking `bw.includes(' ')` for multi-segment words

---

## [v1.0] — Initial Release — 2026-04-05

CargoNavi v1.0 is the first official release of the cargo bike navigation system. It consolidates all prior development (v3.0–v3.5, v4.0) into a single, polished release with a complete feature set: real-time GPS navigation, voice guidance, interactive route planning, Twitch community integration, POI discovery, and a tabbed sidebar UI.

### Navigation & Routing
- **Real-Time GPS Navigation** — "Start Navigation" uses the device's GPS signal via `watchPosition()`. A blue pulsing dot follows your position in real-time with live heading, speed (km/h), and accuracy display. Auto-arrival triggers when within 30m of the destination.
- **Demo Mode** — Separate animated route simulation with vehicle icon (FRANKY, MTB, Racing Bike, or DeLorean). Runs independently from GPS navigation — both modes cannot be active simultaneously.
- **Driven Path Tracking** — Actual GPS-driven path recorded and rendered as an orange line (#f97316) on the map. Planned route stays green. Points recorded only when moving ≥3m to avoid clutter at standstill.
- **Intelligent Routing** — Bicycle-optimized routes via BRouter API with fallback to OSRM. Supports up to 3 alternative routes with deduplication (removes identical routes that BRouter sometimes returns).
- **Interactive Waypoints** — Set via click & drag on the map. Waypoints are sorted by distance from start. Supports multi-stop routes.
- **Elevation Profile** — Automatic ascent/descent calculation and display for the planned route.
- **Vehicle Dimensions** — Width & height inputs to avoid narrow paths and low bridges.
- **Highway Avoidance** — Toggle to skip motorways and highways.
- **Route Deduplication** — `deduplicateRoutes()` creates a coordinate fingerprint (first/last 5 points) to filter out identical alternatives from BRouter API.

### Voice Navigation
- **Turn-by-Turn Announcements** — Web Speech API with distance triggers at 500m, 300m, 200m, 100m, 50m, and immediate "turn now" at the maneuver point.
- **Route Deviation Warnings** — Off-route alert when >50m from planned route (throttled to 15s). Wrong-way detection when heading deviates >135° (throttled to 10s).
- **Volume Controls** — Mute toggle, volume slider (0–100%), and speech rate selector (0.8x, 1.2x, 1.5x). Quick-mute button on the map during navigation.
- **Bilingual** — Automatic German/English voice output based on app language setting.

### Map & UI
- **Tabbed Sidebar** — 4 organized tabs for a clean, focused interface:
  - **Route** — Start/destination search inputs, vehicle selector, routing profile, vehicle dimensions, options (avoid highways, elevation)
  - **Navigate** — Custom speed, simulation speed, voice navigation controls, route info, navigation buttons, export, fullscreen, keyboard shortcuts
  - **Twitch** — Chat connection, live chat display, pending waypoint queue, community route builder, collapsible settings
  - **POI** — POI layer toggles (charging stations, camping, tourist attractions) and POI list
- **Clean Map View** — Search inputs moved into the sidebar. Map shows only controls, route, direction shortcuts, and navigation overlays — no floating input boxes.
- **Map Styles** — Satellite (ESRI World Imagery), Topographic, Street (OpenStreetMap), and Dark.
- **Camera Modes** — Follow mode (behind vehicle) and Drone view (3D rotating).
- **Dark Mode** — Light/dark theme toggle with full support across all UI components.
- **Fullscreen Mode** — Toggle all UI for a map-only view.
- **Bilingual UI** — German and English with 90+ i18n strings.
- **Responsive Design** — Optimized for smartphone, tablet, and desktop.
- **Keyboard Shortcuts** — Ctrl+N (navigation), Ctrl+D (dark mode), Ctrl+F (fullscreen), Esc (close).

### Vehicle Profiles
- **FRANKY** — Cargo bike with custom top-down marker and dedicated image.
- **Mountain Bike** — Off-road profile with top-down marker.
- **Racing Bike** — Street profile with top-down marker.
- **DeLorean** — Easter egg with CSS glow effects at ≥88 km/h ("Flux Capacitor activated!").
- Custom speed per profile (1–200 km/h) for accurate ETA calculations.

### POI & Search
- **Address Search** — Nominatim / OpenStreetMap with throttled requests (respects 1 req/sec rate limit).
- **EV Charging Stations** — Real-time Overpass API query with operator, socket types, and cost info.
- **Camping Places** — Campsites and RV spots with details on tents, caravans, and WiFi.
- **Tourist Attractions** — Castles, museums, churches, monuments, ruins, viewpoints, and more via Overpass API.
- **POI List** — Sorted overview of nearest POIs with distance, category badges, and expandable details.
- **Add to Route** — One-click "Add as Destination" or "Add as Via" from any POI popup.

### Twitch Community Navigation
- **Chat Connection** — Connect to any Twitch channel via tmi.js WebSocket client (no backend required). Channel name, bot name, and OAuth token inputs with auto-load from saved credentials.
- **Secure Token Handling** — OAuth token stored as base64-encoded string in `localStorage`, never displayed in clear text. Show/hide toggle (eye icon) for manual verification. `typeof tmi` safety guard before connection attempt.
- **Chat Commands** — Viewer-submitted waypoints via `!waypoint <address>`, `!route`, `!stops`. Moderator commands: `!approve <nr>`, `!reject <nr>`, `!clearroute` (mod/streamer only).
- **Content Moderation** — Bad-word filter (DE/EN with word-start matching, l33t-speak detection), cooldown system per user, per-user submission limits, total waypoint cap, max character limit.
- **Address Validation** — Submitted addresses validated via Nominatim API with graceful fallback on API failure.
- **Pending Queue** — Visual list of submitted waypoints with username, address, timestamp, and approve/reject buttons. Bulk approve/reject all actions.
- **Community Route Builder** — Approved waypoints auto-sorted near-to-far with automatic VIA/FINISH roles. Route calculates automatically on approve. Tap any Via to set as Finish.
- **Live Chat Display** — Dark-themed chat panel showing ALL Twitch chat messages in real-time with timestamps and colored usernames (from Twitch user colors).
- **Bot Responses** — Automated chat messages for transparency (pending notification, approval confirmation, route info). Rejected entries use silent reject principle.
- **Collapsible Settings** — Command prefix, cooldown timer, max per user, max total, bad-word filter toggle, address validation toggle, max characters.
- **Auto-Connect** — Optional auto-connection on page load if credentials are saved.
- **GPX Export** — Export community routes directly from the Twitch tab.

### Export & Sharing
- **GPX** — GPS Exchange Format for GPS devices and apps.
- **KML** — Google Earth / Maps format.
- **TCX** — Training Center XML for sports apps.
- **CSV** — Spreadsheet-compatible coordinate export.
- **Google Maps** — Direct link to Google Maps with route preview.

### Technical Architecture
- **Single-File HTML** — Entire application in one file (5826 lines) with embedded CSS and JavaScript.
- **MapLibre GL JS v4.7** — Map rendering with GeoJSON sources and layers.
- **BRouter API** — Bicycle-optimized routing with cache-busting timestamps.
- **Nominatim (OSM)** — Geocoding via JSONP with throttled requests.
- **Overpass API** — POI queries (charging, camping, tourist).
- **Web Speech API** — Browser-native voice synthesis (no API keys).
- **tmi.js v1.9.0-pre.1** — Twitch chat via WebSocket CDN (v1.8.5 has no browser bundle).
- **Tailwind CSS + Custom CSS** — Styling with dark mode support.
- **Service Worker** — Offline caching (cache-first for static assets, network-first for dynamic content).
- **PWA** — Installable on Android, iOS, and desktop.
- **100% Client-Side** — No backend, no API keys, no data collection.
- **Race Condition Protection** — `routeCalcVersion` counter prevents stale API responses from overwriting newer results.
- **Performance** — Sliding window optimization for `distToRoute()` on long routes (±500 point search window).

### Bug Fixes (from prior development, included in v1.0)
- Stale route bug fixed with version counter for race condition prevention
- Ghost routes cleared by resetting all GeoJSON sources before population
- Browser HTTP cache bypassed with cache-busting timestamps on API URLs
- Service worker cache versioning to prevent stale code after deployments
- GPS `watchPosition` leak fixed — old watches cleared before starting new ones
- Nominatim rate limit respected via `throttledNominatim()`
- Duplicate castle POIs removed from Overpass query
- XSS via apostrophes in POI names fixed with `data-name` attributes
- Dark mode and language preferences now persist via `localStorage`
- `distToRoute()` performance optimized with sliding window on long routes
- Alternative routes now visible at 0.4 opacity (previously invisible)
- Toast notifications limited to 3 visible (previously unlimited stack)
- Dead code (`VoiceNav.lastBracket`) removed
- View controls no longer stuck hidden after clearing routes
- JSONP callback leak fixed with unified `cleanup()` function
- Alternative routes panel now shows (deduplication removes identical routes from BRouter)
- Route colors reassigned correctly after deduplication
- tmi.js CDN URL fixed to `@1.9.0-pre.1` (v1.8.5 had no browser bundle)
- `typeof tmi` safety guard added before Twitch connection attempt

---

## File Structure

```
CargoNavi/
├── navigation_v4.html      # Main application (v1.1)
├── navigation_v3.html      # Legacy version (backup)
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker (offline cache)
├── icon-192.png            # App icon (192x192)
├── icon-512-final.png      # App icon (512x512)
├── FRANKY.png              # Vehicle marker — Cargo Bike
├── mtb_topdown.png         # Vehicle marker — Mountain Bike
├── racingbike_topdown.png  # Vehicle marker — Racing Bike
├── delorean_topdown.png    # Vehicle marker — DeLorean
├── Readme.md               # Project readme
└── CHANGELOG.md            # This file
```

# Changelog — CargoNavi Navigation System

All notable changes to CargoNavi will be documented in this file.

---

## [v1.4] — Complete UI Redesign & Theme System — 2026-04-06

### Added
- **CSS Custom Properties Theme System** — All UI colors now use CSS variables (`--accent`, `--surface`, `--text`, `--border`, etc.) instead of hardcoded hex values. Enables instant theme switching without page reload. Dark mode also uses CSS variables for seamless toggling.
- **5 Color Themes** — Brand-new theme selector in the sidebar header with 5 color options: **Twitch Purple** (default, `#9146ff`), **Cargo Green** (`#10b981`), **Electric Blue** (`#3b82f6`), **Sunset Orange** (`#f97316`), **Hot Pink** (`#ec4899`). Each theme changes buttons, accents, active states, focus rings, tabs, hover effects, gradients, and glows. Theme selection persists in `localStorage`.
- **Community Waypoint Markers on Map** — Approved Twitch waypoints now appear as colored markers on the map. Start = green 📍 with "S" badge, Via = blue 📍 with number badge, Finish = amber 🏁 marker. Each marker has hover scale effect (1.15×), click popup with address + username + role, and order number badge.

### Changed
- **Complete UI Modernization** — Entire CSS redesigned with modern glassmorphism aesthetics: `backdrop-filter: blur(12px)`, semi-transparent overlay backgrounds, accent glow shadows, smooth hover lift animations. Buttons are now 42px with rounded corners and gradient active states. Sidebar widened to 350px with subtle box-shadow. All overlays use consistent glassmorphism styling.
- **Map Overlay Positions Fixed** — All map overlays repositioned to prevent overlaps: nav instructions (top-center, z-index 15), alt panel (bottom-center, z-index 15), map controls (top-right, z-index 12), view controls (top-right below map controls, z-index 12), speed display (bottom-left, z-index 12), voice controls (bottom-right, z-index 12). View controls moved from hardcoded `right:230px` to `right:70px`.
- **Nav Chat Overlay Removed** — The navigation chat overlay (last 3 Twitch messages on map) was removed per user request. Twitch chat remains fully accessible in the sidebar.
- **`!charger` Overpass Query Fix** — Changed from `out tags;` to `out;` to ensure coordinates are returned on all Overpass API servers.
- **Service Worker** — Cache version bumped to `cargonavi-v15`.

---

## [v1.3] — Nav Chat Overlay, Community Markers, Charger Fix — 2026-04-06

### Added
- **Navigation Chat Overlay** — During navigation, the last 3 Twitch chat messages appear as a semi-transparent overlay on the map (bottom-left, above the speed display). Glass-morphism design with `backdrop-filter: blur(12px)`, 55% opacity dark background. Username colors are preserved from Twitch, text has double text-shadow for readability on any map surface (satellite, street, dark). System messages shown in muted style. Overlay only visible when both navigation is active AND Twitch is connected. Automatically appears/disappears on nav start/stop and Twitch connect/disconnect. Non-interactive (`pointer-events: none`) so it never blocks map interaction. Single-line ellipsis prevents overflow.
- **Community Waypoint Markers on Map** — Approved Twitch waypoints now appear as colored markers on the map. Start = green 📍 with "S" badge, Via = blue 📍 with number badge, Finish = amber 🏁 marker. Each marker has: hover scale effect (1.15×), click popup showing address + username + role, and an order number badge. Markers auto-update when waypoints are approved/removed/ reordered, and are cleanly removed when the route is cleared.

### Fixed
- **`!charger` Overpass Query Missing Coordinates** — Overpass QL `out tags;` only returns node tags without `lat`/`lon`. All 23/109 found chargers were skipped because coordinates were undefined. Changed to `out;` (plain default output) which always includes `type`, `id`, `lat`, `lon`, and `tags` for nodes. Works consistently across all 3 Overpass API servers (`overpass-api.de`, `overpass.kumi.systems`, `maps.mail.ru`). Added v2 debug logging with element key inspection and skip counter.

### Changed
- **Service Worker** — Cache version bumped from `cargonavi-v9` to `cargonavi-v14`.
- **`addChatMessage()`** — Now also calls `updateNavChatOverlay()` to keep the navigation overlay in sync.
- **`startNavigation()` / `startDemoNavigation()` / `stopNavigation()`** — Now call `TwitchManager.updateNavChatVisibility()` to show/hide the chat overlay.
- **`onConnected()` / `onDisconnected()` / `disconnect()`** — Now call `updateNavChatVisibility()` to show/hide overlay based on Twitch connection state.

---

## [v1.2.1] — Bugfix Release — 2026-04-05

### Fixed
- **tourist-attractions-labels Glyphs Error (console spam)** — The symbol layer used `text-field: '📸'` emoji, but the map's glyph source (`demotiles.maplibre.org`) only supports basic Latin characters. This caused a validation error on **every single render frame** (~60× per second), flooding the console with red errors and degrading performance. Removed the broken symbol label layer. Purple circles already serve as clear tourist attraction indicators, and popups show details on click.
- **Overpass API 504 Gateway Timeout for `!charger`** — The `!charger` command queried nodes, ways, AND relations with a 15-second timeout — far too heavy for Overpass, which frequently returned 504. Fixed with: (1) nodes-only query (99% of charging stations are nodes), (2) `AbortController` with 10-second per-request timeout, (3) stepped radius search (3km first, 5km fallback), (4) all 3 Overpass endpoints tried per radius. Also added the 2 new Overpass endpoints to the Service Worker skip-list so they're never cached.
- **Profile Fallback Skipped Primary Profile** — `triedProfiles` was pre-filled with `[state.profile]` before the loop, so when `attempt === 0` picked `state.profile`, the `includes()` check skipped it immediately. The selected routing profile was never actually tried — it went straight to fallbacks. Fixed by initializing `triedProfiles` as empty array `[]`.

### Changed
- **Service Worker** — Cache version bumped from `cargonavi-v8` to `cargonavi-v9`. Added `overpass.kumi.systems` and `maps.mail.ru` to the network-only skip-list.

---

## [v1.2] — Auto-Approve, View Fixes, !charger & Route Reliability — 2026-04-05

### Added
- **Auto-Approve (ON by default)** — New setting in Twitch Settings panel. When enabled, every `!waypoint` submission from chat is automatically approved and added to the community route. No manual approve needed while driving. Toggle in ⚙️ Settings → "Auto-Freigabe" / "Auto-Approve". Respects all limits (cooldown, per-user, max total).
- **Estimated Distance & Time** — `renderRouteList()` now calculates and displays estimated total distance and travel time immediately when waypoints are approved — no need to wait for BRouter. Uses haversine chain calculation (GPS → Via 1 → Via 2 → ... → Finish) with profile-based average speed. Displayed with `~` prefix (e.g., `~4h 23m`) to indicate it's an estimate. BRouter overwrites with precise values on successful calculation.
- **BRouter Profile Fallback** — `calculateCommunityRoute()` now tries multiple routing profiles automatically when BRouter returns HTTP 500. Chain: selected profile → `trekking` → `car-fast` → `car-eco`. Each failure logs a warning and tries the next. Chat shows which profile was used (e.g., "Route calculated: 142.3 km, 1h 35m (fallback: trekking)"). If all profiles fail, shows tried profiles in error message.
- **`!charger` Command** — New chat command to find and add the nearest EV charging station. Queries Overpass API for `amenity=charging_station` within 5km radius of current GPS position. Finds the nearest station by haversine distance, adds it as a waypoint with ⚡ icon + station name + distance (e.g., "⚡ Ionity Kassel (2.3km)"). Respects cooldown, auto-approve setting, and total waypoint limit. Error handling for: no GPS, no stations found, Overpass API failure.
- **Follow View 3-Way Toggle** — Follow button now cycles through 3 modes instead of simple ON/OFF: **OFF** → **3D Follow** (pitch 60, camera behind vehicle with heading) → **Top-Down Follow** (pitch 0, bird's eye view) → **OFF**. Each mode shows a toast notification.
- **Drone View Own Animation Loop** — Drone rotation now runs via its own `requestAnimationFrame` loop (`startDroneRotation()` / `stopDroneRotation()`) instead of relying on the navigation animation frame. Works outside of active navigation — toggle drone ON and the map rotates immediately. Uses `easeTo` with 50ms duration for smooth continuous rotation. GPS position updates only re-center the map without interfering with rotation.
- **Cache-Busting Meta Tags** — Added `<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">`, `Pragma: no-cache`, and `Expires: 0` headers to `navigation_v4.html` to prevent browsers from serving stale cached versions.

### Fixed
- **Start Navigation Used Demo Mode** — `TwitchManager.startCommunityNav()` called `startDemoNavigation()` (animated simulation) instead of `startNavigation()` (real GPS navigation). Now correctly calls `startNavigation()` so pressing "Start Navigation" in the Twitch panel starts actual GPS-based navigation.
- **Route Time Shows "1 min" for Hundreds of km** — BRouter sometimes returns `total-time` in seconds instead of milliseconds, or returns absurdly low values. Added sanity check: if `timeMs < 60000`, multiply by 1000 (seconds→ms). If calculated time is less than 30% of expected minimum for the distance, replace with profile-based estimate. Uses the same average speed table as the regular route calculator.
- **Follow Button Didn't Switch Views** — `toggleFollowView()` was a simple boolean toggle (ON with pitch=60, OFF with pitch=0). No way to switch between 3D follow and top-down while driving. Replaced with 3-way cycle state machine using `state.followPitch`.
- **Drone Button No Rotation** — `toggleDroneView()` set `isDroneView = true` but the rotation (`droneRotation += 0.3`) only executed inside `updateNavigation()` and `animateNavigation()` — which only run during active navigation. No rotation happened when toggling drone outside of navigation, and no immediate visual feedback was given when enabling drone view. Fixed with dedicated animation loop and immediate `easeTo` with pitch=70.
- **Browser Cache Serving Old Code** — Service worker cache versions were incremented but browsers with strong cache would still serve stale `navigation_v4.html`. Added no-cache meta tags as belt-and-suspenders approach alongside service worker versioning.

### Changed
- **`calculateCommunityRoute()`** — Major rework: replaced single BRouter call with fallback profile chain. Added time sanity check (seconds→ms conversion, absurd value detection). Added fallback profile indicator in chat/toast messages. Error messages now include which profiles were tried.
- **`renderRouteList()`** — Now calculates and displays estimated distance/time as baseline values. BRouter results overwrite estimates on success.
- **`toggleFollowView()`** — Replaced boolean toggle with 3-way state machine (OFF → 3D → Top-Down → OFF).
- **`toggleDroneView()`** — Added immediate visual transition (pitch=70, zoom=17) and dedicated rotation loop.
- **Camera follow code in GPS/Demo navigation** — Both `updateNavigation()` and `animateNavigation()` now respect `state.followPitch` for follow mode. Drone mode delegates rotation to its own loop and only re-centers the map.
- **GPS-only follow mode** — `onGpsPositionUpdate()` now also respects follow pitch and drone state when centering the map.
- **Service Worker** — Cache version bumped from `cargonavi-v1` to `cargonavi-v9`.

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
- **Commands Not Accepted (Case Sensitivity)** — Command comparison `command === this.settings.command` was case-sensitive. Fixed with `.toLowerCase()` on both sides.
- **ContentFilter False Positive on "Kassel"** — The bad-word filter used substring matching (`includes()`), so "Kassel" matched "ass" and was silently rejected. Rewrote filter to use word-start matching (`startsWith()`).
- **Duplicate Chat Messages** — Removed redundant `addChatMessage()` calls from `handleWaypoint()` and `handleRoute()`.
- **Route Not Cleared on `!clearroute`** — `handleClearRoute()` now also clears route GeoJSON from map source and resets stats display.

### Changed
- **`renderRouteList()`** — Completely rewritten with route order number, role label, color-coded items.
- **`ContentFilter.check()`** — Rewrote from `includes()` to word-boundary-aware matching.
- **`handleClearRoute()`** — Now clears route from map and resets stats.

---

## [v1.0] — Initial Release — 2026-04-05

CargoNavi v1.0 is the first official release of the cargo bike navigation system. It consolidates all prior development (v3.0–v3.5, v4.0) into a single, polished release with a complete feature set: real-time GPS navigation, voice guidance, interactive route planning, Twitch community integration, POI discovery, and a tabbed sidebar UI.

### Navigation & Routing
- **Real-Time GPS Navigation** — "Start Navigation" uses device GPS via `watchPosition()`. Blue pulsing dot with heading, speed (km/h), and accuracy display. Auto-arrival at 30m.
- **Demo Mode** — Separate animated route simulation with vehicle icons (FRANKY, MTB, Racing Bike, DeLorean).
- **Driven Path Tracking** — GPS path recorded as orange line (#f97316). Points recorded only when moving ≥3m.
- **Intelligent Routing** — BRouter API with OSRM fallback. Up to 3 alternative routes with deduplication.
- **Interactive Waypoints** — Click & drag on map, sorted by distance, multi-stop support.
- **Elevation Profile** — Automatic ascent/descent calculation.
- **Vehicle Dimensions** — Width & height inputs to avoid narrow paths and low bridges.
- **Highway Avoidance** — Toggle to skip motorways.
- **Route Deduplication** — Coordinate fingerprint to filter identical BRouter alternatives.

### Voice Navigation
- **Turn-by-Turn** — Web Speech API with triggers at 500m, 300m, 200m, 100m, 50m, and immediate.
- **Route Deviation** — Off-route alert >50m (15s throttle), wrong-way >135° (10s throttle).
- **Volume Controls** — Mute, slider, speech rate (0.8x–1.5x).
- **Bilingual** — German/English voice output.

### Map & UI
- **Tabbed Sidebar** — Route, Navigate, Twitch, POI tabs.
- **Clean Map View** — Search in sidebar, map shows only controls and overlays.
- **Map Styles** — Satellite, Topographic, Street, Dark.
- **Dark Mode** — Light/dark theme with full component support.
- **Fullscreen** — Ctrl+F for map-only view.
- **Responsive** — Smartphone, tablet, desktop optimized.
- **Keyboard Shortcuts** — Ctrl+N, Ctrl+D, Ctrl+F, Esc.

### Vehicle Profiles
- **FRANKY** — Cargo bike with custom marker.
- **Mountain Bike** — Off-road with top-down marker.
- **Racing Bike** — Street with top-down marker.
- **DeLorean** — Easter egg with CSS glow at ≥88 km/h.

### POI & Search
- **Address Search** — Nominatim with throttled requests.
- **EV Charging** — Overpass API with operator, socket types, cost.
- **Camping** — Campsites and RV spots.
- **Tourist Attractions** — Castles, museums, churches, monuments, ruins.
- **POI List** — Sorted nearest POIs with expandable details.
- **Add to Route** — One-click from POI popup.

### Twitch Community Navigation
- **Chat Connection** — tmi.js WebSocket, no backend.
- **Secure Token** — base64 in localStorage, show/hide toggle.
- **Chat Commands** — `!waypoint`, `!route`, `!stops`, `!approve`, `!reject`, `!clearroute`.
- **Content Moderation** — Bad-word filter, cooldown, limits.
- **Address Validation** — Nominatim with graceful fallback.
- **Pending Queue** — Visual list with approve/reject.
- **Community Route** — Auto-sorted near-to-far, VIA/FINISH auto-assignment.
- **GPX Export** — From Twitch tab.

### Technical Architecture
- **Single-File HTML** — Entire app in one file with embedded CSS/JS.
- **MapLibre GL JS v4.7**, **BRouter API**, **Nominatim (OSM)**, **Overpass API**, **Web Speech API**, **tmi.js v1.9.0-pre.1**.
- **Tailwind CSS + Custom CSS** with dark mode.
- **Service Worker** — Offline caching.
- **PWA** — Installable on Android, iOS, desktop.
- **100% Client-Side** — No backend, no API keys, no data collection.

### Bug Fixes (from prior development)
- Race condition prevention with version counter
- Ghost routes cleared, HTTP cache bypassed
- GPS `watchPosition` leak fixed
- Nominatim rate limit respected
- XSS via apostrophes fixed
- Dark mode/language preferences persist
- `distToRoute()` performance optimized
- Alternative routes visible at 0.4 opacity
- Toast notifications limited to 3
- tmi.js CDN fixed to v1.9.0-pre.1

---

## File Structure

```
CargoNavi/
├── navigation_v4.html      # Main application (v1.2)
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

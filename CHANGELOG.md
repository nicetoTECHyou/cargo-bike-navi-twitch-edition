# Changelog — CargoNavi Navigation System

## [v4.0] — Sidebar Tabs & Twitch Integration - 2026-04-05

### Added
- **Tabbed Sidebar Interface** — The sidebar has been completely restructured into 4 tabs for a cleaner, more organized experience:
  - **🚀 Route** — Search inputs (start/destination), vehicle selector, routing profile, vehicle dimensions, options (avoid highways, show elevation)
  - **🧭 Navigate** — Custom speed, simulation speed, voice navigation controls, route info, navigation buttons, export, fullscreen, help
  - **💬 Twitch** — Full Twitch chat integration with connection management, live chat display, pending waypoint queue, community route builder, and collapsible settings
  - **🗺️ POI** — POI layer toggles (charging stations, camping places, tourist attractions) and POI list
  - Tabs have green active indicator, smooth switching, and preserve state on toggle
- **Search Inputs Moved to Sidebar** — Start/destination search inputs are now in the Route tab instead of the map overlay, providing a cleaner map view with only the direction shortcuts and controls on the right side
- **Clean Map View** — The search panel has been completely removed from the map. Only map controls (zoom, layers, locate, GPS, compass, POI shortcuts), navigation overlays (speed display, instructions, voice controls), and the alternative routes panel remain on the map
- **Full Twitch Integration** — Complete community-driven navigation via Twitch chat:
  - **Connection Management**: Connect to any Twitch channel using tmi.js WebSocket client. Channel name, bot name, and OAuth token inputs with secure storage
  - **Secure Token Handling**: OAuth token stored as base64-encoded string in localStorage, never shown in clear text in the UI. Show/hide toggle (eye icon) for manual verification. Auto-loads on page visit
  - **Chat Commands**: `!waypoint <address>`, `!route`, `!stops`, `!clearroute` (mod/streamer), `!approve <nr>` (mod/streamer), `!reject <nr>` (mod/streamer)
  - **Content Moderation**: Bad-word filter (DE/EN with l33t-speak detection), cooldown system per user, per-user submission limits, total waypoint cap, max character limit
  - **Address Validation**: Validates submitted addresses via Nominatim API. Falls back gracefully on API failure
  - **Pending Queue**: Visual list of submitted waypoints with username, address, timestamp, and approve/reject buttons. Bulk actions (approve all, reject all)
  - **Community Route Builder**: Approved waypoints list with distance/time stats. Calculates route via BRouter API through all approved waypoints. Start navigation directly from the Twitch tab
  - **Live Chat Display**: Dark-themed chat panel showing CargoNavi-related messages with timestamps and colored usernames
  - **Bot Responses**: Automated chat messages for transparency (pending notification, approval confirmation, route info). Rejected entries use silent reject principle
  - **Collapsible Settings**: Command prefix, cooldown timer, max per user, max total, bad-word filter toggle, address validation toggle, max characters
  - **Auto-Connect**: Optional auto-connection on page load if credentials are saved
  - **GPX Export**: Export community routes directly from the Twitch tab
- **tmi.js** — Added Twitch Message Interface library via CDN for WebSocket chat connection
- **31 new i18n strings** for Twitch features in both German and English

### Changed
- **`toggleFullUI()`** — Updated to remove references to the now-removed search panel from the map
- **Mobile responsive CSS** — Removed `#search-panel { right:60px !important; }` rule
- **Sidebar layout** — Header (logo, language, dark mode) stays fixed at top; tab bar and content panels below with independent scrolling

### Design Decisions
- **Why tabs?** The sidebar had grown to 10+ sections (vehicle, profile, dimensions, speed, sim speed, options, voice, route info, POI, actions), making it very long to scroll. Tabs group related functionality logically and keep the sidebar focused
- **Why move search to sidebar?** A clean map view is essential during navigation. With search inputs in the sidebar, the map shows only the route, controls, and navigation overlays — no floating input boxes that can overlap the route
- **Why base64 for token?** While client-side storage can never be truly secure, base64 encoding prevents the token from being casually visible in DevTools localStorage view or browser storage inspection. The token is only decoded in memory when connecting
- **Why silent reject?** Giving trolls attention in chat (even negative attention) incentivizes further disruption. Only positive/approved interactions are announced publicly

### Technical Notes
- Tab switching uses CSS class toggling (`.tab-content.active`) — no DOM manipulation needed
- All existing element IDs are preserved — the search input IDs (`start-input`, `end-input`, `search-results-start`, `search-results-end`) are the same
- `TwitchManager` is a singleton object (not a class) to keep the single-file architecture consistent
- Twitch integration is fully optional — if not connected, the app works exactly as before
- `ContentFilter.check()` normalizes text by removing non-alphanumeric characters before comparison, catching l33t-speak variants like `f4ck` and `s h i t`
- Whisper messages (`/w username message`) are used for private feedback (cooldown, limit, invalid address)
- `TwitchManager.calculateCommunityRoute()` reuses the existing `throttledNominatim()` function for address validation

### File Structure
```
├── navigation_v4.html      # Hauptdatei (v4.0 — Tabs + Twitch)
├── navigation_v3.html      # Vorherige Version (Backup)
├── manifest.json
├── sw.js
├── icon-192.png
├── icon-512-final.png
├── FRANKY.png
├── mtb_topdown.png
├── racingbike_topdown.png
└── delorean_topdown.png
```

---

## [v3.5] — GPS Nav Marker & Driven Path Tracking - 2026-04-05

### Added
- **GPS Navigation Dot Marker** — GPS navigation mode now displays a clean blue pulsing dot instead of a rotating vehicle icon:
  - New `.gps-nav-marker` CSS class with radial gradient and pulse animation
  - Marker does not rotate with heading — prevents jarring spinning when GPS signal is weak
  - Heading is still calculated and used for camera follow and voice navigation
  - Marker is hidden until first GPS fix, then shown with a flyTo animation
- **Driven Path Tracking** — The actual GPS-driven path is now recorded and displayed on the map:
  - New `driven-path` GeoJSON source and two layers (line + outline) added to the map
  - Driven path renders in orange (#f97316, 5px width) with a darker orange outline (#ea580c, 9px, 0.25 opacity)
  - Planned route remains visible in its original green color — easy visual comparison between planned vs. driven path
  - GPS points are only recorded when the user moves at least 3 meters (prevents clutter when stationary)
  - `updateDrivenPathLayer()` updates the GeoJSON source on each new GPS point
  - `clearDrivenPathLayer()` clears the driven path when navigation stops
  - `drivenPathCoords` array stores all recorded GPS coordinates
- **Separate Marker Variables** — `navGpsMarker` (GPS mode) is now independent from `vehicleMarker` (Demo mode)

### Fixed
- **Alternative Routes Panel Not Showing** — BRouter API sometimes returns identical routes for different `alternativeidx` values (confirmed: `car-fast` altidx=0 and altidx=2 return the exact same coordinates with the same distance). Added `deduplicateRoutes()` function that creates a coordinate fingerprint from the first and last 5 points of each route and filters out duplicates. This ensures the alternative routes panel only shows genuinely different route options.
- **Route Colors After Dedup** — `showAlternativePanel()` now reassigns `ROUTE_COLORS` to each route based on its new index after deduplication, preventing incorrect color assignments.

### Changed
- **`recalculateRoute()`** — now calls `deduplicateRoutes()` on fetched routes before storing them in `state.routes`.
- **`showAlternativePanel()`** — reassigns route colors after dedup to ensure correct color mapping.
- **`startNavigation()`** — no longer creates a `vehicleMarker` with vehicle icon; instead creates a `navGpsMarker` with the simple GPS dot. Also initializes `drivenPathCoords = []` and clears the driven path layer.
- **`onNavGpsPositionUpdate()`** — moves `navGpsMarker` instead of `vehicleMarker`. Removed vehicle rotation code. Added driven path recording with 3m minimum distance threshold.
- **`stopNavigation()`** — now also removes `navGpsMarker`, clears `drivenPathCoords`, and calls `clearDrivenPathLayer()`.
- **`sw.js`** — cache version bumped from `cargonavi-v4` to `cargonavi-v35`.

### Design Decisions
- **Why no vehicle icon in GPS mode?** GPS signals can be noisy — the heading jumps rapidly between updates, causing the vehicle icon to spin erratically. A simple dot marker provides a much cleaner navigation experience.
- **Why orange for driven path?** Orange contrasts clearly against both the green planned route and the map background (satellite and street styles), while being distinct from the blue GPS marker.
- **3m threshold for recording:** Balances path detail with storage efficiency. At typical cycling speeds (15-25 km/h) with 1s GPS updates, this captures nearly every point without redundancy at stops.
- **Route fingerprint deduplication:** Using first/last 5 coordinates as a fingerprint is fast (O(1) comparison via Set) and catches both exact duplicates and near-identical routes that BRouter returns when it has no genuine alternative.

---

## [v3.4-hotfix] — Bugfix Release (15 Bugs) - 2026-04-05

### Fixed — Critical
- **Stale Route Bug (Race Condition)** — `recalculateRoute()` now uses a version counter to discard stale API responses. Previously, rapidly changing route parameters (profile, waypoints, dimensions) could cause an older, slower API call to overwrite a newer result, making the map briefly display an outdated route. [Bug #1]
- **Ghost Routes from Previous Calculation** — `displayRoutes()` now clears all three MapLibre GeoJSON sources (route-0, route-1, route-2) before populating new ones. Previously, if a calculation returned fewer alternatives than before, stale route geometry could persist and flash on the map during transitions. [Bug #2]
- **Browser HTTP Cache Serving Old Routes** — Added cache-busting timestamps (`_t=`) to all BRouter and OSRM API fetch URLs. Previously, requesting the same route twice could return a cached response with outdated routing data. [Bug #3]

### Fixed — High
- **Service Worker Serving Stale App Code** — Bumped `CACHE_NAME` from `cargonavi-v3` to `cargonavi-v4` and added auto-reload on `controllerchange` event. Previously, returning visitors could be served old JavaScript code after deployments. [Bug #4]
- **GPS watchPosition Leak** — `startNavigation()` now clears any existing GPS watch before starting a new one. Previously, starting navigation while GPS tracking was active leaked the old watch, wasting battery and causing conflicting position updates. [Bug #5]

### Fixed — Medium
- **Nominatim Rate Limit Bypass** — `searchLocation()` now uses `throttledNominatim()` instead of calling `nominatimJSONP()` directly. Previously, rapid typing could flood Nominatim with requests exceeding their 1 req/sec policy, risking IP bans. [Bug #6]
- **Duplicate Castle POIs** — Removed redundant `node["historic"="castle"]` filter from the Overpass API query for tourist attractions, which was already covered by the regex filter. [Bug #7]
- **XSS via Apostrophes in POI Names** — `buildAddToRouteButtons()` now uses `data-name` attributes instead of inline string concatenation in onclick handlers. Previously, POI names containing apostrophes (e.g., "O'Brien's Pub") caused JavaScript syntax errors and broke the "Add as Destination/Via" buttons. [Bug #8]
- **Dark Mode & Language Not Persisted** — `toggleDarkMode()` and `toggleLanguage()` now save preferences to `localStorage`. Preferences are restored on app load. Previously, every page reload reset to light mode and English. [Bug #9]
- **distToRoute() Performance on Long Routes** — Implemented a sliding window optimization that limits the coordinate search to +/-500 points around the last known nearest position. Previously, the full linear scan over 10,000+ coordinates on every GPS update could cause janky frame rates on mobile. [Bug #10]

### Fixed — Low
- **Alternative Routes Invisible** — Non-active alternative routes now render at 0.4 opacity (previously 0, making them completely invisible). Users can now see alternative route options directly on the map. [Bug #11]
- **Toast Notification Overflow** — `showToast()` now limits to 3 visible toasts, removing the oldest when exceeded. Previously, rapid toasts could stack up and cover the entire viewport. [Bug #12]
- **Dead Code: VoiceNav.lastBracket** — Removed the unused `lastBracket` property from `VoiceNav.reset()` and the object declaration. [Bug #13]
- **View Controls Stuck Hidden** — `clearRoute()` now uses `style.removeProperty('display')` instead of `style.display = 'none'`, avoiding CSS specificity conflicts that could keep 3D/compass controls hidden after clearing a route. [Bug #14]
- **JSONP Callback Leak** — `nominatimJSONP()` now uses a unified `cleanup()` function that properly clears the timeout, global callback, and DOM script element in all cases (success, error, timeout). [Bug #15]

### Technical Notes
- Bug #1 fix: Global `routeCalcVersion` counter incremented at the start of each `recalculateRoute()` call; results are discarded if the counter has advanced by the time the API responds.
- Bug #8 fix: `addPOIAsDestination()` and `addPOIAsVia()` now accept a DOM element parameter and read `el.dataset.name` instead of a string parameter.
- Bug #9 fix: Preferences are stored under keys `cargonavi-dark` and `cargonavi-lang` in `localStorage`.
- Bug #10 fix: Search window state stored in `state._lastNearestIdx`, reset on `clearRoute()`.

---

## [v3.4] — Auto-Center & Auto GPS Tracking - 2026-04-05

### Added
- **Auto-Center on Load** — Map automatically centers on user location when the app loads:
  - Uses `getCurrentPosition()` with high accuracy and 8s timeout
  - Smooth flyTo animation (1.5s) to user position at zoom level 14
  - Silent fallback to default center (Berlin) if permission denied
- **Auto GPS-Tracking** — GPS live tracking starts automatically on app load:
  - No button click needed — tracking begins immediately after map load
  - Shows GPS marker, accuracy circle, and heading indicator
  - GPS button remains functional for toggling tracking on/off
  - Guarded: won't activate if GPS navigation is already running

### Technical Notes
- Both features trigger inside `map.on('load')` callback, after POI sources are initialized
- `getCurrentPosition()` handles error silently (empty callback) to avoid toast spam on first load
- `startGpsTracking()` already has built-in guard against duplicate activation

---

## [v3.3] — Real GPS Navigation & Volume Controls - 2026-04-04

### Added
- **Real GPS Navigation Mode** — "Start Navigation" now uses the device's real GPS signal:
  - Vehicle marker follows your actual GPS position in real-time
  - Real speed displayed from GPS (km/h), or calculated from consecutive position fixes
  - Heading from GPS compass or derived from position deltas
  - Vehicle marker hidden until first GPS fix, then map flies to your position
  - Auto-arrival detection when within 30m of destination
  - Off-route and wrong-way voice warnings during GPS navigation
- **Demo Mode** — Separate button for animated route simulation:
  - Isolated from GPS navigation — both modes cannot run simultaneously
  - Demo button shows "Stop Demo" with orange styling when active
  - Start Navigation button shows "Stop Navigation" with red styling when active
  - Inactive button is greyed out during either mode
- **Volume Controls in Sidebar** — Always visible below Voice Navigation toggle:
  - **Mute button** — Tap to mute/unmute, turns red when muted, synced with map quick-mute
  - **Volume slider** — 0–100% with large touch-friendly 22px thumb
  - **Voice speed** — 0.8x, 1x, 1.2x, 1.5x speech rate buttons
  - Dark mode support for all controls
- **Quick Mute Button on Map** — Visible during navigation (bottom-right):
  - Simple tap toggles mute — synced with sidebar mute button
- **8 new i18n strings** for GPS navigation and volume controls (DE/EN)
- **`state.navMode`** property to track active mode ('gps' or 'demo')

### Changed
- **`startNavigation()`** rewritten — now starts real GPS navigation via `watchPosition()`:
  - Creates vehicle marker at last known GPS position or route start
  - Uses dedicated `onNavGpsPositionUpdate()` handler for navigation updates
  - High accuracy GPS (1000ms max age, 15s timeout)
- **`startDemoNavigation()`** extracted — contains the old simulation/animation code
- **`stopNavigation()`** updated to handle both modes:
  - Clears GPS watch for GPS mode, cancels animation frame for demo mode
  - Resets both Start Navigation and Demo Mode buttons
  - Resets DeLorean speed display effects
- **`onNavGpsPositionUpdate()`** — new dedicated GPS handler for navigation mode:
  - Moves vehicle marker to GPS position
  - Calculates heading from GPS or consecutive position fixes
  - Shows real speed from GPS hardware
  - Triggers voice announcements based on nearest route point
  - Detects arrival within 30m of destination
  - Updates accuracy circle
  - Camera follow with bearing and pitch
- **`onGpsPositionUpdate()`** (standalone GPS tracking) — added guard to skip during GPS navigation
- **`startGpsTracking()`** — added guard to prevent starting when GPS navigation is active
- **`distToRoute()`** improved — uses point-to-line-segment projection instead of point-to-point distance:
  - Much more accurate for determining how far the user is from the route
  - Now returns `nearestIdx` for voice instruction lookup
- **Voice Navigation improvements:**
  - `VoiceNav.minInterval` reduced from 3000ms to 1500ms for more responsive announcements
  - `getBracket()` threshold changed from 20m to 15m for "now" announcements
  - Dead '20' bracket removed from `bracketOrder` array
  - `VoiceNav.speak()` now respects `volume` and `muted` properties
  - `utterance.rate` uses configurable `VoiceNav.rate` instead of hardcoded 1.0
- **`toggleMute()`** updated — syncs both sidebar and map mute buttons simultaneously

### Technical Notes
- GPS heading fallback: if device doesn't provide heading, it's calculated from consecutive GPS positions (max 5s delta)
- GPS speed fallback: if device doesn't provide speed, it's calculated from haversine distance between consecutive fixes
- Point-to-line-segment distance uses coordinate projection with clamped parameter [0,1]
- Both navigation modes share: vehicle marker, nav instructions, voice engine, speed display, follow/drone camera
- Volume controls use CSS `-webkit-appearance: none` for consistent cross-browser slider styling
- All controls have `touch-action: manipulation` to prevent double-tap zoom on mobile

### File Structure
```
├── navigation_v3.html
├── manifest.json
├── sw.js
├── icon-192.png
├── icon-512-final.png
├── FRANKY.png
├── mtb_topdown.png
├── racingbike_topdown.png
└── delorean_topdown.png
```

---

## [v3.2] — Voice Navigation + PWA Icons - 2026-04-04

### Added
- **Voice Navigation System** — Full turn-by-turn voice guidance using Web Speech API (no external services needed):
  - Announces upcoming turns at distance thresholds: 500m, 300m, 200m, 100m, 50m, 20m
  - "Turn now" announcements when within 20m of a turn
  - Arrival announcement when reaching destination
  - Automatic language detection (German/English) based on app language setting
  - Voice toggle switch in sidebar (Options section) — enabled by default
  - Smart look-ahead scanning: finds the NEXT turn ahead on the route, not just the current segment angle
- **Off-Route Detection** — Warns when GPS position deviates more than 50m from the planned route:
  - "You have left the route" voice warning (throttled: max once per 15 seconds)
- **Wrong-Way Detection** — Detects when heading is opposite to route direction (>135° difference):
  - "Wrong way! Please turn around" voice warning (throttled: max once per 10 seconds)
  - Only triggers when within 30m of route (to avoid false positives from GPS drift)
- **22 new i18n strings** for voice navigation in both German and English
- **512x512 icon** added to HTML `<link>` tags for PWA manifest
- **Vehicle images** added to Service Worker precache list for full offline support

### Changed
- **`updateNavInstructions()`** rewritten with smarter turn detection:
  - Scans up to 200 points ahead to find the NEXT turn (skips minor bends <20°)
  - Calculates accurate distance to the upcoming turn using haversine formula
  - Shows "now" instruction when within 30m of a turn point
  - Integrates with VoiceNav engine for spoken announcements
- **`startNavigation()`** now initializes and resets voice engine
- **`stopNavigation()`** now cancels any pending voice announcements
- **`onGpsPositionUpdate()`** now calls route deviation check during navigation
- **`sw.js`** — added vehicle images (FRANKY.png, mtb_topdown.png, racingbike_topdown.png, delorean_topdown.png) to precache list

### Technical Notes
- Voice uses Web Speech API (`window.speechSynthesis`) — works in all modern browsers without API keys
- Best voice quality on Chrome (Android/desktop), Safari (iOS), Edge
- Firefox support varies — some platforms may have limited voices
- Voice preloading handled via `speechSynthesis.onvoiceschanged` event
- Minimum 3-second throttle between announcements to prevent speech overlap
- Off-route threshold: 50m | Wrong-way heading threshold: >135° difference
- `manifest.json` restored with `purpose: "any maskable"` for proper PWA icon handling

### File Structure
```
├── navigation_v3.html
├── manifest.json
├── sw.js
├── icon-192.png
├── icon-512-final.png
├── FRANKY.png
├── mtb_topdown.png
├── racingbike_topdown.png
└── delorean_topdown.png
```

---

## [Vehicle Image System] - 2026-04-04

### Changed
- **Vehicle cards** now use file-path referenced images instead of inline data:
  - `FRANKY.png` — Cargo Bike (nose pointing north)
  - `mtb_topdown.png` — Mountain Bike (nose pointing north)
  - `racingbike_topdown.png` — Racing Bike (nose pointing north)
  - `delorean_topdown.png` — DeLorean (nose pointing north)
- **Vehicle map markers** (`getVehicleSVG()`) now use the same file-path images for consistent appearance between cards and map
- All vehicle images are oriented **nose-north** (top-down view) as the default orientation
- DeLorean Back-to-the-Future easter egg (>= 88 km/h speed effect) now uses CSS glow effects only, without swapping marker images

### Removed
- `DELOREAN_FLAME_IMG` — Removed inline base64 PNG data (~212 KB)
- `DELOREAN_NORMAL_IMG` — Removed inline base64 PNG data (~127 KB)
- **Total reduction**: ~340 KB of inline base64 data removed from `navigation_v3.html`
- Image swap logic in speed simulation code that referenced the removed base64 constants

### Notes
- File size reduced from ~515 KB to ~183 KB (65% smaller)
- All vehicle images must be co-located with `navigation_v3.html` in the same directory
- The "van" vehicle still uses an inline SVG marker (no external image uploaded)

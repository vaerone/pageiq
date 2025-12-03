# PageIQ

PageIQ — Modern Page Lifecycle Engine for the web.  
BFCache-safe, strongly typed, and framework-agnostic. Provides a single API for visibility, focus, BFCache, freeze/resume, network and cross-tab events. Includes React and Zustand adapters.

## What it covers (safe-only)
- Visibility (`visibilitychange`) → VISIBLE / HIDDEN
- Focus (`focus` / `blur`) → FOCUSED / BLURRED
- Page navigation (`pageshow` / `pagehide`) → PAGE_HIDE, BF_CACHE_RESTORE
- Chrome freeze (`freeze` / `resume`) → FROZEN / RESUMED (gracefully degrades)
- Online / offline → ONLINE / OFFLINE
- Network connection changes → CONNECTION_CHANGE
- Cross-tab storage → TAB_SYNC

✅ No `beforeunload` / `unload`. BFCache-compatible.

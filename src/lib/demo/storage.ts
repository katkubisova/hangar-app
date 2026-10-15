import type { DemoState } from "@/lib/types/demo-state"

// Bump the version when DemoState changes shape: old saved data is then
// ignored instead of breaking the app.
const STORAGE_KEY = "hangar-app-demo-v2"

// localStorage can be missing or throw (private mode, blocked storage).
// The app must work without it, so every access is wrapped.
export function loadDemoState(): DemoState | null {
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY)
		return raw ? (JSON.parse(raw) as DemoState) : null
	} catch {
		return null
	}
}

export function saveDemoState(state: DemoState) {
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
	} catch {
		// Not saved; the demo still works for this visit.
	}
}

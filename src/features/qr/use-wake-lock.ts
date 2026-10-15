"use client"

import { useEffect } from "react"

// Keeps the screen on while the check-in QR is shown, so it doesn't dim
// at the reader. Browsers without the Wake Lock API just skip it. (Web
// pages can't raise screen brightness; the screen asks the user instead.)
export function useWakeLock(active: boolean) {
	useEffect(() => {
		if (!active || !("wakeLock" in navigator)) {
			return
		}
		let lock: WakeLockSentinel | null = null
		let released = false

		async function request() {
			try {
				lock = await navigator.wakeLock.request("screen")
				if (released) {
					await lock.release()
				}
			} catch {
				// Denied (e.g. low battery): the QR still works.
			}
		}

		// The lock drops when the tab is hidden; take it again on return.
		function onVisibilityChange() {
			if (document.visibilityState === "visible") {
				request()
			}
		}

		request()
		document.addEventListener("visibilitychange", onVisibilityChange)
		return () => {
			released = true
			document.removeEventListener("visibilitychange", onVisibilityChange)
			lock?.release().catch(() => {})
		}
	}, [active])
}

"use client"

import { OverlayRoot } from "@/components/shell/overlay"
import { PushBanner } from "@/components/shell/push-banner"
import { useDemo } from "@/lib/demo/context"

// The app's own viewport: fills the phone (or the phone frame), never
// scrolls itself and contains everything, so nothing needs position: fixed.
// Screens provide their own header and scroll area (see Screen).
export function AppShell({ children }: { children: React.ReactNode }) {
	const { state } = useDemo()

	return (
		<div className="relative flex h-full flex-col overflow-clip bg-background text-foreground">
			{/* Demo data only exists on the client. Until it's read, show the
			    splash colour so the first paint matches the splash screen. */}
			{state ? children : <div className="h-full bg-cod-gray" />}
			<OverlayRoot />
			<PushBanner />
		</div>
	)
}

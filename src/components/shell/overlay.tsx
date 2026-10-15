"use client"

import { createContext, use, useState } from "react"
import { createPortal } from "react-dom"

// Sheets, alerts and push banners must stay inside the phone frame on
// desktop, so they can't be position: fixed or portalled to <body>. The
// AppShell registers an absolutely positioned layer instead, and Overlay
// portals into it.
const OverlayRootContext = createContext<{
	root: HTMLElement | null
	setRoot: (element: HTMLElement | null) => void
} | null>(null)

export function OverlayProvider({ children }: { children: React.ReactNode }) {
	const [root, setRoot] = useState<HTMLElement | null>(null)
	return (
		<OverlayRootContext value={{ root, setRoot }}>
			{children}
		</OverlayRootContext>
	)
}

function useOverlayContext() {
	const context = use(OverlayRootContext)
	if (!context) {
		throw new Error("Overlay must be used inside OverlayProvider")
	}
	return context
}

export function OverlayRoot() {
	const { setRoot } = useOverlayContext()
	return (
		<div
			ref={setRoot}
			className="pointer-events-none absolute inset-0 z-40 [&>*]:pointer-events-auto"
		/>
	)
}

export function Overlay({ children }: { children: React.ReactNode }) {
	const { root } = useOverlayContext()
	return root ? createPortal(children, root) : null
}

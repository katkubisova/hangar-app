"use client"

import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

import { WallProfile } from "@/components/brand/wall-profile"
import { BottomSheet } from "@/components/shell/bottom-sheet"
import { Overlay } from "@/components/shell/overlay"
import { Button } from "@/components/ui/button"
import { RefreshIcon, ToolsIcon } from "@/components/ui/icons"
import { useDemo } from "@/lib/demo/context"

// Simulated screens (store, mail, browser…) must stay reachable, e.g. the
// store when an update is forced.
const SIMULATED_ROUTES = [
	"/store",
	"/compose",
	"/browser",
	"/mail",
	"/navigate",
]

function FullScreenBlock({
	profile,
	icon,
	title,
	text,
	action,
}: {
	profile: "monster" | "stargate"
	icon: React.ReactNode
	title: string
	text: string
	action: React.ReactNode
}) {
	return (
		<Overlay>
			<div
				role="alertdialog"
				aria-modal="true"
				aria-label={title}
				className="dark absolute inset-0 flex flex-col bg-background px-6 pt-safe pb-[calc(var(--safe-bottom)+1.5rem)] text-foreground duration-200 animate-in fade-in-0"
			>
				<div className="flex min-h-0 flex-1 flex-col justify-center">
					<WallProfile
						profile={profile}
						className="w-[70%] text-secondary"
						contentClassName="items-center text-foreground"
					>
						{icon}
					</WallProfile>
					<h1 className="mt-10 text-h1">{title}</h1>
					<p className="mt-3 text-lead text-muted-foreground">{text}</p>
				</div>
				{action}
			</div>
		</Overlay>
	)
}

// App-wide states the presenter switches on from the demo panel, in order
// of priority: maintenance, forced update, then (signed in) the feedback
// prompt or the recommended update.
export function SystemOverlays() {
	const { state, setSystemFlag } = useDemo()
	const pathname = usePathname()
	const router = useRouter()
	const [recommendedDismissed, setRecommendedDismissed] = useState(false)

	if (!state || SIMULATED_ROUTES.some(route => pathname.startsWith(route))) {
		return null
	}
	const { system, isLoggedIn } = state

	if (system.maintenance) {
		return (
			<FullScreenBlock
				profile="monster"
				icon={<ToolsIcon className="size-14" aria-hidden="true" />}
				title="Probíhá údržba"
				text="Aplikaci právě vylepšujeme. Za chvíli bude zase k dispozici."
				action={
					// Simulated retry: maintenance ends when the presenter switches it off.
					<Button size="lg" onClick={() => router.refresh()}>
						Zkusit znovu
					</Button>
				}
			/>
		)
	}

	if (system.forcedUpdate) {
		return (
			<FullScreenBlock
				profile="stargate"
				icon={<RefreshIcon className="size-14" aria-hidden="true" />}
				title="Je potřeba aktualizovat"
				text="Tahle verze aplikace už není podporovaná. Aktualizuj ji a můžeš pokračovat."
				action={
					<Button size="lg" onClick={() => router.push("/store?action=update")}>
						Aktualizovat
					</Button>
				}
			/>
		)
	}

	if (!isLoggedIn) {
		return null
	}

	if (system.feedbackPrompt) {
		return (
			<BottomSheet
				open
				onOpenChange={open => !open && setSystemFlag("feedbackPrompt", false)}
				title="Líbí se ti aplikace?"
			>
				<p className="px-4 text-muted-foreground">
					Dej nám vědět, ať ji můžeme dál zlepšovat.
				</p>
				<div className="grid grid-cols-2 gap-2 px-4 pt-5">
					<Button
						variant="outline"
						size="lg"
						onClick={() => {
							setSystemFlag("feedbackPrompt", false)
							router.push("/feedback")
						}}
					>
						Moc ne
					</Button>
					<Button
						size="lg"
						onClick={() => {
							setSystemFlag("feedbackPrompt", false)
							router.push("/store?action=rate")
						}}
					>
						Ano, líbí
					</Button>
				</div>
			</BottomSheet>
		)
	}

	if (system.recommendedUpdate && !recommendedDismissed) {
		return (
			<BottomSheet
				open
				onOpenChange={open => !open && setRecommendedDismissed(true)}
				title="Nová verze aplikace"
			>
				<p className="px-4 text-muted-foreground">
					Aktualizuj aplikaci a získej opravy a vylepšení. Zabere to chvilku.
				</p>
				<div className="flex flex-col gap-2 px-4 pt-5">
					<Button size="lg" onClick={() => router.push("/store?action=update")}>
						Aktualizovat
					</Button>
					<Button
						size="lg"
						variant="ghost"
						onClick={() => setRecommendedDismissed(true)}
					>
						Teď ne
					</Button>
				</div>
			</BottomSheet>
		)
	}

	return null
}

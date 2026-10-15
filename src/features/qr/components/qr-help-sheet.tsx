"use client"

import { BottomSheet } from "@/components/shell/bottom-sheet"
import { GymContacts } from "@/features/support/gym-contacts"
import type { OpenGym } from "@/lib/types/gym"

interface QrHelpSheetProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	gym: OpenGym
	memberId: string
}

export function QrHelpSheet({
	open,
	onOpenChange,
	gym,
	memberId,
}: QrHelpSheetProps) {
	const tips: React.ReactNode[] = [
		"Zvyš jas displeje na maximum.",
		"Drž telefon v klidu a nech čtečku načíst celý kód.",
		<>
			Pořád nic? Na recepci ti pomůžou, stačí říct své jméno nebo číslo člena{" "}
			<span className="whitespace-nowrap font-medium">{memberId}</span>.
		</>,
	]

	return (
		<BottomSheet open={open} onOpenChange={onOpenChange} title="QR nefunguje?">
			<ol className="flex flex-col gap-3 px-4 pb-5">
				{tips.map((tip, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: static list
					<li key={index} className="flex gap-3">
						<span className="flex size-6 shrink-0 items-center justify-center bg-primary text-sm font-medium text-primary-foreground">
							{index + 1}
						</span>
						<span>{tip}</span>
					</li>
				))}
			</ol>
			<p className="eyebrow px-4 pb-2">{gym.name}</p>
			<GymContacts gym={gym} subject="Nefunguje mi QR kód" />
		</BottomSheet>
	)
}

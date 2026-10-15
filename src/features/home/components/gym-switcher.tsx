"use client"

import { useState } from "react"

import { BottomSheet } from "@/components/shell/bottom-sheet"
import { CheckIcon, ChevronDownIcon } from "@/components/ui/icons"
import { getOpenGym, openGyms } from "@/lib/data/gyms"
import { useDemo, useDemoState } from "@/lib/demo/context"

// Gym selector in the Domů header. Only open gyms can be picked; the
// choice filters home content and products, and is remembered.
export function GymSwitcher() {
	const { selectedGym } = useDemoState()
	const { selectGym } = useDemo()
	const [open, setOpen] = useState(false)
	const gym = getOpenGym(selectedGym)

	return (
		<>
			<button
				type="button"
				onClick={() => setOpen(true)}
				className="flex h-11 items-center gap-1 px-2 text-base font-medium active:opacity-60"
				aria-haspopup="dialog"
			>
				{gym.name}
				<ChevronDownIcon className="size-5" aria-hidden="true" />
			</button>
			<BottomSheet open={open} onOpenChange={setOpen} title="Vyber pobočku">
				<ul className="border-t">
					{openGyms.map(item => (
						<li key={item.slug} className="border-b">
							<button
								type="button"
								onClick={() => {
									selectGym(item.slug)
									setOpen(false)
								}}
								className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left active:bg-muted"
							>
								<span>
									<span className="block text-base font-medium">
										{item.name}
									</span>
									<span className="block text-sm text-muted-foreground">
										{item.address}
									</span>
								</span>
								{item.slug === selectedGym && (
									<CheckIcon
										className="size-6 text-link"
										aria-label="Vybráno"
									/>
								)}
							</button>
						</li>
					))}
				</ul>
			</BottomSheet>
		</>
	)
}

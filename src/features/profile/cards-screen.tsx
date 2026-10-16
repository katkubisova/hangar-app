"use client"

import Link from "next/link"
import { useState } from "react"

import { EmptyState } from "@/components/shell/empty-state"
import { Screen } from "@/components/shell/screen"
import { Button } from "@/components/ui/button"
import { ChevronRightIcon } from "@/components/ui/icons"
import { AddCardSheet } from "@/features/products/components/add-card-sheet"
import { cardLabel } from "@/features/products/product-text"
import { useDemoState } from "@/lib/demo/context"

export function CardsScreen() {
	const { paymentCards } = useDemoState()
	const [addOpen, setAddOpen] = useState(false)

	return (
		<Screen
			title="Platební karty"
			backHref="/profile"
			backLabel="Profil"
			footer={
				<Button size="lg" onClick={() => setAddOpen(true)}>
					Přidat kartu
				</Button>
			}
		>
			{paymentCards.length === 0 ? (
				<EmptyState
					title="Žádná uložená karta"
					text="Ulož si kartu a příští nákup zaplatíš na jedno klepnutí."
				/>
			) : (
				<ul className="border-t pb-6">
					{paymentCards.map(card => (
						<li key={card.id} className="border-b">
							<Link
								href={`/profile/cards/${card.id}`}
								className="flex min-h-16 items-center gap-3 px-4 py-3 active:bg-muted"
							>
								<span className="min-w-0 flex-1">
									<span className="block font-medium">{cardLabel(card)}</span>
									<span className="block text-sm text-muted-foreground">
										Platnost {card.expiry}
									</span>
								</span>
								{card.isDefault && (
									<span className="border border-foreground px-1.5 text-xs leading-5 font-medium">
										Výchozí
									</span>
								)}
								<ChevronRightIcon
									className="size-5 shrink-0 text-muted-foreground"
									aria-hidden="true"
								/>
							</Link>
						</li>
					))}
				</ul>
			)}
			<AddCardSheet open={addOpen} onOpenChange={setAddOpen} />
		</Screen>
	)
}

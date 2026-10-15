"use client"

import { useState } from "react"
import { BottomSheet } from "@/components/shell/bottom-sheet"
import { EmptyState } from "@/components/shell/empty-state"
import { Button } from "@/components/ui/button"
import { GymContacts } from "@/features/support/gym-contacts"
import { getOpenGym } from "@/lib/data/gyms"
import type { GymSlug } from "@/lib/types/gym"

// Shown instead of Domů (and the QR) when the account is blocked. Why an
// account gets blocked is up to Hasam; the copy stays neutral.
export function BlockedAccount({ gymSlug }: { gymSlug: GymSlug }) {
	const [contactsOpen, setContactsOpen] = useState(false)

	return (
		<>
			<EmptyState
				profile="monster"
				title="Účet je zablokovaný"
				text="Teď nemůžeš vstupovat ani nakupovat. Ozvi se nám a společně to vyřešíme."
				action={
					<Button
						size="lg"
						className="w-full"
						onClick={() => setContactsOpen(true)}
					>
						Kontaktovat podporu
					</Button>
				}
			/>
			<BottomSheet
				open={contactsOpen}
				onOpenChange={setContactsOpen}
				title="Kontaktovat podporu"
			>
				<GymContacts gym={getOpenGym(gymSlug)} subject="Zablokovaný účet" />
			</BottomSheet>
		</>
	)
}

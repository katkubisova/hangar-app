"use client"

import { ListHeading, ListRow } from "@/components/shell/list-row"
import { Screen } from "@/components/shell/screen"
import { plural } from "@/lib/czech"
import { useDemoState } from "@/lib/demo/context"
import { withDetails } from "@/lib/demo/owned-products"

export function ProfileScreen() {
	const {
		user,
		ownedProducts,
		entries,
		purchases,
		paymentCards,
		discountCards,
		kids,
	} = useDemoState()
	const now = new Date()
	const activeCount = ownedProducts.filter(
		item => withDetails(item, now).status !== "expired"
	).length

	return (
		<Screen title="Profil">
			{user && (
				<div className="mx-4 mb-8 flex items-center gap-4 border bg-card p-4">
					<span
						aria-hidden="true"
						className="flex size-14 shrink-0 items-center justify-center bg-gradient-pastel-violet text-h3 font-bold"
					>
						{user.firstName[0]}
						{user.lastName[0]}
					</span>
					<span className="min-w-0">
						<span className="block text-h3 font-bold tracking-heading">
							{user.firstName} {user.lastName}
						</span>
						<span className="block truncate text-sm text-muted-foreground">
							{user.email}
						</span>
						<span className="block text-sm text-muted-foreground">
							Číslo člena {user.memberId}
						</span>
					</span>
				</div>
			)}

			<ListHeading>Můj účet</ListHeading>
			<nav className="border-t">
				<ListRow href="/profile/account" label="Osobní údaje" />
				<ListRow
					href="/profile/stats"
					label="Statistiky"
					value={`${entries.length} ${plural(entries.length, ["vstup", "vstupy", "vstupů"])}`}
				/>
				<ListRow
					href="/products/mine"
					label="Moje členství a permanentky"
					value={activeCount ? `${activeCount} aktivní` : undefined}
				/>
				<ListRow
					href="/profile/purchases"
					label="Historie nákupů"
					value={String(purchases.length)}
				/>
				<ListRow
					href="/profile/cards"
					label="Platební karty"
					value={String(paymentCards.length)}
				/>
			</nav>

			<ListHeading>Slevy a souhlasy</ListHeading>
			<nav className="border-t">
				<ListRow
					href="/profile/discounts"
					label="Slevy, dětské účty a souhlasy"
					description={[
						discountCards.length
							? `${discountCards.length} slevové karty`
							: "MultiSport, ISIC",
						kids.length
							? `${kids.length} ${plural(kids.length, ["dítě", "děti", "dětí"])}`
							: null,
					]
						.filter(Boolean)
						.join(" · ")}
				/>
			</nav>

			<ListHeading>Aplikace</ListHeading>
			<nav className="border-t pb-6">
				<ListRow href="/profile/settings" label="Nastavení" />
			</nav>
		</Screen>
	)
}

"use client"

import Link from "next/link"

import { ListHeading, ListRow } from "@/components/shell/list-row"
import { Screen } from "@/components/shell/screen"
import { buttonVariants } from "@/components/ui/button"
import { DISCOUNT_CARD_INFO } from "@/lib/data/discount-card-info"
import { useDemoState } from "@/lib/demo/context"
import type { DiscountCardType } from "@/lib/types/discount-card"
import { cn } from "@/lib/utils"

const CARD_TYPES: DiscountCardType[] = ["isic", "multisport"]

export function DiscountsScreen() {
	const { discountCards, kids } = useDemoState()
	const now = new Date()

	return (
		<Screen title="Slevy a souhlasy" backHref="/profile" backLabel="Profil">
			<ListHeading>Slevové karty</ListHeading>
			<nav className="border-t">
				{CARD_TYPES.map(type => (
					<ListRow
						key={type}
						href={`/profile/discounts/${type}`}
						label={DISCOUNT_CARD_INFO[type].name}
						value={
							discountCards.some(card => card.type === type)
								? "Ověřeno"
								: "Přidat"
						}
					/>
				))}
			</nav>

			{/* Kid accounts depend on Hasam support: kept as one separate
			    block (and their own routes) so they're easy to remove. */}
			<section
				aria-labelledby="kids-title"
				className="mx-4 mt-8 border bg-card"
			>
				<div className="px-4 pt-4 pb-3">
					<h2 id="kids-title" className="text-h3">
						Dětské účty
					</h2>
					<p className="text-sm text-muted-foreground">
						Děti, se kterými chodíš do Hangaru.
					</p>
				</div>
				{kids.length > 0 && (
					<nav className="border-t">
						{kids.map(kid => (
							<ListRow
								key={kid.id}
								href={`/profile/kids/${kid.id}`}
								label={`${kid.firstName} ${kid.lastName}`}
								value={`${now.getFullYear() - kid.birthYear} let`}
							/>
						))}
					</nav>
				)}
				<div className="p-4">
					<Link
						href="/profile/kids/new"
						className={cn(
							buttonVariants({ variant: "outline", size: "lg" }),
							"w-full"
						)}
					>
						Přidat dítě
					</Link>
				</div>
			</section>

			<ListHeading>Souhlasy a dokumenty</ListHeading>
			<nav className="border-t pb-6">
				<ListRow
					href="/browser?doc=visitor-rules"
					label="Návštěvní řád"
					value="Odsouhlaseno"
				/>
				<ListRow
					href="/browser?doc=privacy"
					label="Zpracování osobních údajů"
					value="Odsouhlaseno"
				/>
				<ListRow
					href="/browser?doc=terms"
					label="Obchodní podmínky"
					value="Odsouhlaseno"
				/>
			</nav>
		</Screen>
	)
}

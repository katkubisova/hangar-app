"use client"

import { plural } from "@/lib/czech"
import { getOpenGym } from "@/lib/data/gyms"
import { AUDIENCE_LABEL, TIME_WINDOW_LABEL } from "@/lib/data/products"
import type { OwnedProductWithDetails } from "@/lib/demo/owned-products"
import { formatDate } from "@/lib/utils"

// Membership / pass details under the QR code.
export function ProductDetails({ item }: { item: OwnedProductWithDetails }) {
	const { product } = item
	const rows: [string, string][] = [
		["Typ", product.type === "membership" ? "Členství" : "Permanentka"],
		["Kategorie", AUDIENCE_LABEL[product.audience]],
		["Pobočka", getOpenGym(product.gymSlug).name],
	]

	if (product.type === "membership") {
		rows.push(
			["Délka", product.variant],
			["Platí do", formatDate(item.validUntil)],
			[
				"Obnovení",
				item.autoRenew
					? `Automaticky ${formatDate(item.validUntil)}`
					: "Neobnovuje se",
			]
		)
	} else {
		const left = item.entriesLeft ?? 0
		rows.push(
			["Vstupy", TIME_WINDOW_LABEL[product.timeWindow]],
			[
				"Zbývá",
				`${left} ${plural(left, ["vstup", "vstupy", "vstupů"])} z ${product.entries}`,
			],
			["Platí do", formatDate(item.validUntil)]
		)
	}

	return (
		<section aria-labelledby="product-details-title" className="pt-6">
			<h2 id="product-details-title" className="eyebrow px-4 pb-2">
				{product.type === "membership" ? "Moje členství" : "Moje permanentka"}
			</h2>
			<dl className="border-t">
				{rows.map(([label, value]) => (
					<div
						key={label}
						className="flex min-h-11 items-center justify-between gap-4 border-b px-4 py-2"
					>
						<dt className="text-muted-foreground">{label}</dt>
						<dd className="text-right font-medium">{value}</dd>
					</div>
				))}
			</dl>
		</section>
	)
}

import { getOpenGym } from "@/lib/data/gyms"
import type {
	PriceCategory,
	PriceFootnote,
	PriceLabel,
} from "@/lib/types/price-list"
import type { Product } from "@/lib/types/product"

// What a product includes, read from the verified price lists so the app
// never says more (or less) than the live sites.

const CATEGORY = {
	membership: "Členství",
	package: "Permanentky (10 / 20 vstupů)",
} as const

function labelText(label: PriceLabel) {
	return typeof label === "string"
		? label
		: label.map(part => part.text).join("")
}

function labelMarker(label: PriceLabel) {
	return typeof label === "string"
		? undefined
		: label.find(part => part.marker)?.marker
}

function findCategory(product: Product): PriceCategory | undefined {
	return getOpenGym(product.gymSlug).prices.find(
		item => item.category === CATEGORY[product.type]
	)
}

export interface ProductBenefit {
	label: string
	value: string
	marker?: string
}

// Membership only: the "what's included" row for this length.
export function getMembershipBenefits(product: Product): ProductBenefit[] {
	const table =
		product.type === "membership" ? findCategory(product)?.tables[1] : undefined
	const row = table?.rows.find(
		item => labelText(item.label) === product.variant
	)
	if (!table || !row) {
		return []
	}
	return row.cells.flatMap((cell, index) => {
		const column = table.columns[index + 1]
		if (cell === null || !column) {
			return []
		}
		return {
			label: labelText(column),
			value: String(cell),
			marker: labelMarker(column),
		}
	})
}

// Notes for the detail screen. Payment notes (FKSP, Benefit Plus…) are
// about paying at reception, so the app leaves them out.
export function getProductNotes(product: Product): string[] {
	return (findCategory(product)?.notes ?? []).filter(
		note => !note.startsWith("Platba")
	)
}

export function getProductFootnotes(product: Product): PriceFootnote[] {
	return findCategory(product)?.footnotes ?? []
}

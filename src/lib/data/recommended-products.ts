import { getProduct } from "@/lib/data/products"
import type { GymSlug } from "@/lib/types/gym"
import type { OwnedProduct } from "@/lib/types/owned-product"

// Products suggested on Domů for the selected gym. There's no rule from
// the client, so this is a curated pick (assumption): the best-value
// membership, a 10-entry pass and the 1-month trial, adult prices.
// Whatever the user already has active is left out.
const RECOMMENDED_VARIANTS = [
	"membership-adult-12m",
	"package-adult-all-day-10",
	"membership-adult-1m",
]

export function getRecommendedProducts(
	gymSlug: GymSlug,
	activeOwned: OwnedProduct[]
) {
	const activeIds = new Set(activeOwned.map(item => item.productId))
	return RECOMMENDED_VARIANTS.map(variant =>
		getProduct(`${gymSlug}-${variant}`)
	).filter(product => !activeIds.has(product.id))
}

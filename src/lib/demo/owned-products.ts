import { getProduct } from "@/lib/data/products"
import type {
	OwnedProduct,
	OwnedProductStatus,
} from "@/lib/types/owned-product"
import type { Product } from "@/lib/types/product"

export interface OwnedProductWithDetails extends OwnedProduct {
	product: Product
	status: OwnedProductStatus
	// Packages only.
	entriesLeft?: number
}

export function getOwnedProductStatus(
	owned: OwnedProduct,
	product: Product,
	now: Date
): OwnedProductStatus {
	if (new Date(owned.validUntil) < now) {
		return "expired"
	}
	if (
		product.type === "package" &&
		(owned.entriesUsed ?? 0) >= product.entries
	) {
		return "expired"
	}
	if (new Date(owned.validFrom) > now) {
		return "upcoming"
	}
	return "active"
}

export function withDetails(
	owned: OwnedProduct,
	now: Date
): OwnedProductWithDetails {
	const product = getProduct(owned.productId)
	return {
		...owned,
		product,
		status: getOwnedProductStatus(owned, product, now),
		entriesLeft:
			product.type === "package"
				? product.entries - (owned.entriesUsed ?? 0)
				: undefined,
	}
}

// The product shown on Domů and Vstup: an active membership first, then an
// active package; otherwise the most recently expired one, if any.
export function getPrimaryProduct(owned: OwnedProduct[], now: Date) {
	const items = owned
		.map(item => withDetails(item, now))
		.sort((a, b) => b.validUntil.localeCompare(a.validUntil))
	const active = items.filter(item => item.status === "active")
	return (
		active.find(item => item.product.type === "membership") ??
		active[0] ??
		items[0] ??
		null
	)
}

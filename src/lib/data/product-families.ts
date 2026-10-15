import { products } from "@/lib/data/products"
import type { GymSlug } from "@/lib/types/gym"
import type { Product } from "@/lib/types/product"
import type { ProductFamily } from "@/lib/types/product-family"

function familyId(product: Product) {
	return product.type === "membership"
		? `${product.gymSlug}-membership-${product.audience}`
		: `${product.gymSlug}-package-${product.audience}-${product.timeWindow}`
}

// The variant shown first: the 12-month membership (best value) and the
// 10-entry pass.
function isDefaultVariant(product: Product) {
	return product.type === "membership"
		? product.durationMonths === 12
		: product.entries === 10
}

function buildFamilies(): ProductFamily[] {
	const families = new Map<string, ProductFamily>()
	for (const product of products) {
		const id = familyId(product)
		const family = families.get(id) ?? {
			id,
			gymSlug: product.gymSlug,
			type: product.type,
			audience: product.audience,
			timeWindow: product.type === "package" ? product.timeWindow : undefined,
			name: product.name,
			productIds: [],
			defaultProductId: product.id,
		}
		family.productIds.push(product.id)
		if (isDefaultVariant(product)) {
			family.defaultProductId = product.id
		}
		families.set(id, family)
	}
	return [...families.values()]
}

export const productFamilies = buildFamilies()

export function getFamiliesForGym(gymSlug: GymSlug) {
	return productFamilies.filter(family => family.gymSlug === gymSlug)
}

export function getProductFamily(id: string) {
	return productFamilies.find(family => family.id === id) ?? null
}

export function getFamilyOfProduct(productId: string) {
	return (
		productFamilies.find(family => family.productIds.includes(productId)) ??
		null
	)
}

// Link to a product's detail screen with that variant preselected.
export function productHref(productId: string) {
	const family = getFamilyOfProduct(productId)
	return family ? `/products/${family.id}?variant=${productId}` : "/products"
}

import type { GymSlug } from "@/lib/types/gym"
import type {
	PackageTimeWindow,
	ProductAudience,
	ProductType,
} from "@/lib/types/product"

// One card in the Koupit list: a product type for one audience at one gym
// (e.g. "Členství Dospělý" in Brno). The detail screen picks the variant
// (length for memberships, number of entries for passes).
export interface ProductFamily {
	id: string
	gymSlug: GymSlug
	type: ProductType
	audience: ProductAudience
	timeWindow?: PackageTimeWindow
	name: string
	productIds: string[]
	defaultProductId: string
}

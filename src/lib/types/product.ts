import type { GymSlug } from "@/lib/types/gym"

// The app's two product types:
// - membership ("Členství"): recurring, can be cancelled
// - package ("Balíček"): a multi-entry pass, one-off payment
export type ProductType = "membership" | "package"

// Who the price is for, as in the price list rows.
export type ProductAudience = "adult" | "student" | "parent" | "reduced"

// Passes are sold for mornings only or for the whole day.
export type PackageTimeWindow = "morning" | "all-day"

interface ProductBase {
	id: string
	gymSlug: GymSlug
	audience: ProductAudience
	name: string
	// Short line under the name, e.g. "12 měsíců" or "10 vstupů".
	variant: string
	// CZK, straight from price-lists.ts.
	price: number
}

export interface MembershipProduct extends ProductBase {
	type: "membership"
	durationMonths: 1 | 3 | 6 | 12
}

export interface PackageProduct extends ProductBase {
	type: "package"
	entries: 10 | 20
	timeWindow: PackageTimeWindow
	validityMonths: 12
}

export type Product = MembershipProduct | PackageProduct

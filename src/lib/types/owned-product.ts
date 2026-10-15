// A product the user bought. Dates are ISO strings so the demo state can
// be stored as JSON.
export interface OwnedProduct {
	id: string
	productId: string
	purchasedAt: string
	validFrom: string
	validUntil: string
	// Memberships only: renews at the end of the period until cancelled.
	autoRenew?: boolean
	// Packages only.
	entriesUsed?: number
}

export type OwnedProductStatus = "active" | "expired"

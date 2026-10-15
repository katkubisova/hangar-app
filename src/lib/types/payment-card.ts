export type PaymentCardBrand = "visa" | "mastercard"

export interface PaymentCard {
	id: string
	brand: PaymentCardBrand
	last4: string
	// "MM/RR"
	expiry: string
	isDefault: boolean
}

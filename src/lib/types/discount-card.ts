// A MultiSport or ISIC card added under Profil → Slevy. Validation is
// simulated: any well-formed number passes.
export type DiscountCardType = "isic" | "multisport"

export interface DiscountCard {
	type: DiscountCardType
	cardNumber: string
	validatedAt: string
}

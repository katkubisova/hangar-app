import type { DiscountCardType } from "@/lib/types/discount-card"

// Copy for the two discount cards. What each one does follows the price
// lists (MultiSport: single entries at reception, 110 Kč supplement over
// 1 hour) and the step 1 decision (ISIC unlocks student prices).
export const DISCOUNT_CARD_INFO: Record<
	DiscountCardType,
	{
		name: string
		benefit: string
		placeholder: string
		inputMode: "text" | "numeric"
	}
> = {
	isic: {
		name: "ISIC",
		benefit:
			"Odemkne studentské ceny členství a permanentek. Platí pro studenty SŠ a VŠ ve věku 13–26 let.",
		placeholder: "S 420 123 456 789 X",
		inputMode: "text",
	},
	multisport: {
		name: "MultiSport",
		benefit:
			"Kartu MultiSport (Stříbrná, Dítě, FKSP) přijímáme na jednorázové vstupy na recepci. Při návštěvě delší než 1 hodina doplatek 110 Kč. Na členství a permanentky se nevztahuje.",
		placeholder: "12345678",
		inputMode: "numeric",
	},
}

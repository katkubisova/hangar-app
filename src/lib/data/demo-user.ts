import type { KidAccount } from "@/lib/types/kid-account"
import type { PaymentCard } from "@/lib/types/payment-card"
import type { UserProfile } from "@/lib/types/user-profile"

// Fake demo user. Not a real person; any resemblance is accidental.
export const demoUser: UserProfile = {
	firstName: "Tereza",
	firstNameVocative: "Terezo",
	lastName: "Svobodová",
	email: "tereza.svobodova@example.cz",
	phone: "+420 777 123 456",
	memberId: "HNG-204817",
}

export const demoPaymentCards: PaymentCard[] = [
	{
		id: "card-visa",
		brand: "visa",
		last4: "4821",
		expiry: "08/28",
		isDefault: true,
	},
	{
		id: "card-mastercard",
		brand: "mastercard",
		last4: "1093",
		expiry: "03/27",
		isDefault: false,
	},
]

export const demoKids: KidAccount[] = [
	{
		id: "kid-krystof",
		firstName: "Kryštof",
		lastName: "Svoboda",
		birthYear: 2017,
	},
]

import { getVocative } from "@/lib/demo/sign-up"
import type { DemoState } from "@/lib/types/demo-state"
import type { DiscountCardType } from "@/lib/types/discount-card"
import type { KidAccount } from "@/lib/types/kid-account"
import type { UserProfile } from "@/lib/types/user-profile"

// Profile edits on the demo state. Pure, so they're easy to test.

export type ProfileEdit = Pick<
	UserProfile,
	"firstName" | "lastName" | "email" | "phone" | "birthDate"
>

export function updateProfile(state: DemoState, edit: ProfileEdit): DemoState {
	if (!state.user) {
		return state
	}
	return {
		...state,
		user: {
			...state.user,
			...edit,
			firstName: edit.firstName.trim(),
			lastName: edit.lastName.trim(),
			firstNameVocative:
				edit.firstName.trim() === state.user.firstName
					? state.user.firstNameVocative
					: getVocative(edit.firstName),
		},
	}
}

export function setDefaultCard(state: DemoState, cardId: string): DemoState {
	return {
		...state,
		paymentCards: state.paymentCards.map(card => ({
			...card,
			isDefault: card.id === cardId,
		})),
	}
}

export function updateCardExpiry(
	state: DemoState,
	cardId: string,
	expiry: string
): DemoState {
	return {
		...state,
		paymentCards: state.paymentCards.map(card =>
			card.id === cardId ? { ...card, expiry } : card
		),
	}
}

// Removing the default card makes the next one the default.
export function removeCard(state: DemoState, cardId: string): DemoState {
	const remaining = state.paymentCards.filter(card => card.id !== cardId)
	const hasDefault = remaining.some(card => card.isDefault)
	return {
		...state,
		paymentCards: remaining.map((card, index) => ({
			...card,
			isDefault: hasDefault ? card.isDefault : index === 0,
		})),
	}
}

export function addDiscountCard(
	state: DemoState,
	type: DiscountCardType,
	cardNumber: string,
	now = new Date()
): DemoState {
	return {
		...state,
		discountCards: [
			...state.discountCards.filter(card => card.type !== type),
			{ type, cardNumber: cardNumber.trim(), validatedAt: now.toISOString() },
		],
	}
}

export function removeDiscountCard(
	state: DemoState,
	type: DiscountCardType
): DemoState {
	return {
		...state,
		discountCards: state.discountCards.filter(card => card.type !== type),
	}
}

export function saveKid(state: DemoState, kid: KidAccount): DemoState {
	const exists = state.kids.some(item => item.id === kid.id)
	return {
		...state,
		kids: exists
			? state.kids.map(item => (item.id === kid.id ? kid : item))
			: [...state.kids, kid],
	}
}

export function removeKid(state: DemoState, kidId: string): DemoState {
	return { ...state, kids: state.kids.filter(item => item.id !== kidId) }
}

import { getProduct } from "@/lib/data/products"
import { withDetails } from "@/lib/demo/owned-products"
import type { DemoState } from "@/lib/types/demo-state"
import type { OwnedProduct } from "@/lib/types/owned-product"
import type { PaymentCard, PaymentCardBrand } from "@/lib/types/payment-card"

export function addMonths(iso: string, months: number) {
	const date = new Date(iso)
	date.setMonth(date.getMonth() + months)
	return date.toISOString()
}

// Buying a product (payment succeeded). Assumptions, no rule from the
// client yet:
// - A new membership at a gym where one is already running starts when
//   the current one ends, and the current one stops renewing.
// - A pass is valid 12 months from purchase (as on the price list).
export function purchaseProduct(
	state: DemoState,
	productId: string,
	paymentCardId: string,
	now = new Date()
): { state: DemoState; ownedId: string } {
	const product = getProduct(productId)
	const nowIso = now.toISOString()
	const ownedId = `owned-${now.getTime()}`
	let ownedProducts = state.ownedProducts
	let owned: OwnedProduct

	if (product.type === "membership") {
		const running = ownedProducts
			.map(item => withDetails(item, now))
			.find(
				item =>
					item.status === "active" &&
					item.product.type === "membership" &&
					item.product.gymSlug === product.gymSlug
			)
		const validFrom = running ? running.validUntil : nowIso
		owned = {
			id: ownedId,
			productId,
			purchasedAt: nowIso,
			validFrom,
			validUntil: addMonths(validFrom, product.durationMonths),
			autoRenew: true,
		}
		if (running) {
			ownedProducts = ownedProducts.map(item =>
				item.id === running.id ? { ...item, autoRenew: false } : item
			)
		}
	} else {
		owned = {
			id: ownedId,
			productId,
			purchasedAt: nowIso,
			validFrom: nowIso,
			validUntil: addMonths(nowIso, product.validityMonths),
			entriesUsed: 0,
		}
	}

	return {
		ownedId,
		state: {
			...state,
			ownedProducts: [owned, ...ownedProducts],
			purchases: [
				{
					id: `purchase-${ownedId}`,
					productId,
					date: nowIso,
					amount: product.price,
					paymentCardId,
				},
				...state.purchases,
			],
			notifications: [
				{
					id: `notification-${ownedId}`,
					type: "purchase-confirmed",
					title: "Platba proběhla",
					body: `${product.name} · ${product.variant} je ve tvém účtu.`,
					href: `/products/mine/${ownedId}`,
					createdAt: nowIso,
					read: false,
				},
				...state.notifications,
			],
		},
	}
}

// Stops the recurring payment; the membership stays valid until its end.
export function cancelRenewal(state: DemoState, ownedId: string): DemoState {
	return {
		...state,
		ownedProducts: state.ownedProducts.map(item =>
			item.id === ownedId ? { ...item, autoRenew: false } : item
		),
	}
}

export interface NewCardInput {
	number: string
	expiry: string
	makeDefault: boolean
}

// Brand from the first digit, as card forms show it while you type.
export function detectCardBrand(number: string): PaymentCardBrand {
	return number.trim().startsWith("5") ? "mastercard" : "visa"
}

export function addPaymentCard(
	state: DemoState,
	input: NewCardInput,
	now = new Date()
): { state: DemoState; cardId: string } {
	const digits = input.number.replace(/\D/g, "")
	const card: PaymentCard = {
		id: `card-${now.getTime()}`,
		brand: detectCardBrand(digits),
		last4: digits.slice(-4),
		expiry: input.expiry,
		isDefault: input.makeDefault || state.paymentCards.length === 0,
	}
	const others = card.isDefault
		? state.paymentCards.map(item => ({ ...item, isDefault: false }))
		: state.paymentCards
	return {
		cardId: card.id,
		state: { ...state, paymentCards: [...others, card] },
	}
}

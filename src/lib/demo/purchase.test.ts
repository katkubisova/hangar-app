import {
	addPaymentCard,
	cancelRenewal,
	detectCardBrand,
	purchaseProduct,
} from "@/lib/demo/purchase"
import { createScenarioState } from "@/lib/demo/scenarios"

const NOW = new Date("2026-10-15T12:00:00")

describe("purchaseProduct", () => {
	it("adds a membership, a purchase and a notification", () => {
		const before = createScenarioState("no-membership", NOW)
		const { state, ownedId } = purchaseProduct(
			before,
			"brno-membership-adult-3m",
			"card-visa",
			NOW
		)
		const owned = state.ownedProducts.find(item => item.id === ownedId)
		expect(owned?.autoRenew).toBe(true)
		expect(new Date(owned?.validUntil ?? "").getMonth()).toBe(0)
		expect(state.purchases[0].amount).toBe(5510)
		expect(state.notifications[0].type).toBe("purchase-confirmed")
	})

	it("starts a second membership after the running one and stops its renewal", () => {
		const before = createScenarioState("active-membership", NOW)
		const running = before.ownedProducts.find(
			item => item.id === "owned-brno-12m"
		)
		const { state, ownedId } = purchaseProduct(
			before,
			"brno-membership-adult-1m",
			"card-visa",
			NOW
		)
		const added = state.ownedProducts.find(item => item.id === ownedId)
		expect(added?.validFrom).toBe(running?.validUntil)
		expect(
			state.ownedProducts.find(item => item.id === "owned-brno-12m")?.autoRenew
		).toBe(false)
	})

	it("gives a pass 12 months and no used entries", () => {
		const { state, ownedId } = purchaseProduct(
			createScenarioState("no-membership", NOW),
			"ostrava-package-adult-morning-20",
			"card-visa",
			NOW
		)
		const owned = state.ownedProducts.find(item => item.id === ownedId)
		expect(owned?.entriesUsed).toBe(0)
		expect(new Date(owned?.validUntil ?? "").getFullYear()).toBe(2027)
	})
})

describe("cancelRenewal", () => {
	it("stops renewal but keeps the membership", () => {
		const state = cancelRenewal(
			createScenarioState("active-membership", NOW),
			"owned-brno-12m"
		)
		const owned = state.ownedProducts.find(item => item.id === "owned-brno-12m")
		expect(owned?.autoRenew).toBe(false)
	})
})

describe("addPaymentCard", () => {
	it("detects the brand and makes the first card the default", () => {
		const { state, cardId } = addPaymentCard(
			createScenarioState("new-user", NOW),
			{ number: "5555 4444 3333 1111", expiry: "09/29", makeDefault: false },
			NOW
		)
		const card = state.paymentCards.find(item => item.id === cardId)
		expect(card).toMatchObject({
			brand: "mastercard",
			last4: "1111",
			isDefault: true,
		})
		expect(detectCardBrand("4111")).toBe("visa")
	})
})

describe("upcoming membership", () => {
	it("doesn't replace the running one on the QR", async () => {
		const { getPrimaryProduct } = await import("@/lib/demo/owned-products")
		const { state, ownedId } = purchaseProduct(
			createScenarioState("active-membership", NOW),
			"brno-membership-adult-12m",
			"card-visa",
			NOW
		)
		const primary = getPrimaryProduct(state.ownedProducts, NOW)
		expect(primary?.id).toBe("owned-brno-12m")
		expect(primary?.id).not.toBe(ownedId)
	})
})

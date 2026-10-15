import { getPrimaryProduct } from "@/lib/demo/owned-products"
import { createScenarioState } from "@/lib/demo/scenarios"

const TODAY = new Date("2026-10-15T12:00:00")

describe("demo scenarios", () => {
	it("new user is logged out with no data", () => {
		const state = createScenarioState("new-user", TODAY)
		expect(state.isLoggedIn).toBe(false)
		expect(state.user).toBeNull()
		expect(state.ownedProducts).toHaveLength(0)
	})

	it("active membership has an active membership, an expired package and a kid", () => {
		const state = createScenarioState("active-membership", TODAY)
		const primary = getPrimaryProduct(state.ownedProducts, TODAY)
		expect(primary?.status).toBe("active")
		expect(primary?.product.type).toBe("membership")
		expect(state.paymentCards).toHaveLength(2)
		expect(state.kids).toHaveLength(1)
		const expiredPackages = state.ownedProducts.filter(
			item =>
				item.productId.includes("package") &&
				item.validUntil < TODAY.toISOString()
		)
		expect(expiredPackages).toHaveLength(1)
	})

	it("no membership has nothing to show on the QR screen", () => {
		const state = createScenarioState("no-membership", TODAY)
		expect(state.isLoggedIn).toBe(true)
		expect(getPrimaryProduct(state.ownedProducts, TODAY)).toBeNull()
	})

	it("expired membership shows the expired one", () => {
		const state = createScenarioState("expired-membership", TODAY)
		expect(getPrimaryProduct(state.ownedProducts, TODAY)?.status).toBe(
			"expired"
		)
	})

	it("starts with every system state off", () => {
		const state = createScenarioState("active-membership", TODAY)
		expect(Object.values(state.system).every(value => !value)).toBe(true)
	})
})

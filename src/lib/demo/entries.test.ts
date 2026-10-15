import { getRecommendedProducts } from "@/lib/data/recommended-products"
import { countEntriesInMonth } from "@/lib/demo/entries"
import { createScenarioState } from "@/lib/demo/scenarios"

const NOW = new Date("2026-10-15T20:00:00")

describe("countEntriesInMonth", () => {
	it("counts only this month's entries up to now", () => {
		const entries = [
			{ id: "a", date: "2026-10-01T18:00:00", gymSlug: "brno" as const },
			{ id: "b", date: "2026-10-14T18:00:00", gymSlug: "ostrava" as const },
			{ id: "c", date: "2026-09-30T18:00:00", gymSlug: "brno" as const },
			{ id: "d", date: "2026-10-20T18:00:00", gymSlug: "brno" as const },
		]
		expect(countEntriesInMonth(entries, NOW)).toBe(2)
	})

	it("gives the active demo user some entries this month", () => {
		const state = createScenarioState("active-membership", NOW)
		expect(countEntriesInMonth(state.entries, NOW)).toBeGreaterThan(0)
	})
})

describe("getRecommendedProducts", () => {
	it("suggests three products for the gym", () => {
		const products = getRecommendedProducts("ostrava", [])
		expect(products).toHaveLength(3)
		expect(products.every(product => product.gymSlug === "ostrava")).toBe(true)
	})

	it("leaves out what the user already has", () => {
		const state = createScenarioState("active-membership", NOW)
		const ids = getRecommendedProducts("brno", state.ownedProducts).map(
			product => product.id
		)
		expect(ids).not.toContain("brno-membership-adult-12m")
	})
})

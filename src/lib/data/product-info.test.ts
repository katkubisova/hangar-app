import { getMembershipBenefits, getProductNotes } from "@/lib/data/product-info"
import { getProduct } from "@/lib/data/products"

describe("product info", () => {
	it("reads the 12-month membership benefits from the price list", () => {
		const benefits = getMembershipBenefits(
			getProduct("brno-membership-adult-12m")
		)
		expect(benefits.map(item => `${item.label}: ${item.value}`)).toEqual([
			"Sleva na vstup: 30 %",
			"Sleva na baru: 15 %",
			"Členské lekce: 4",
			"Přerušení: 1 měsíc",
		])
	})

	it("skips benefits the 1-month membership doesn't have", () => {
		expect(
			getMembershipBenefits(getProduct("ostrava-membership-student-1m"))
		).toHaveLength(1)
	})

	it("leaves payment notes out", () => {
		const notes = getProductNotes(getProduct("brno-package-adult-all-day-10"))
		expect(notes).toEqual(["Platnost 1 rok, vstupy jsou přenosné."])
	})
})

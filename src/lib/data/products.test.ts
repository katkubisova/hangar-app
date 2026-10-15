import { brnoPrices, ostravaPrices } from "@/lib/data/price-lists"
import { products } from "@/lib/data/products"

describe("products", () => {
	it("has 12 memberships and 10 packages per gym", () => {
		for (const gym of ["brno", "ostrava"]) {
			const own = products.filter(item => item.gymSlug === gym)
			expect(own.filter(item => item.type === "membership")).toHaveLength(12)
			expect(own.filter(item => item.type === "package")).toHaveLength(10)
		}
	})

	it("uses exactly the prices from the price lists", () => {
		const tablePrices = [brnoPrices, ostravaPrices].flatMap(prices =>
			prices
				.filter(item =>
					["Členství", "Permanentky (10 / 20 vstupů)"].includes(item.category)
				)
				.flatMap(item => item.tables[0].rows.flatMap(row => row.cells))
				.filter(cell => typeof cell === "number")
		)
		expect(products.map(item => item.price).sort()).toEqual(tablePrices.sort())
	})

	it("has unique ids", () => {
		const ids = products.map(item => item.id)
		expect(new Set(ids).size).toBe(ids.length)
	})
})

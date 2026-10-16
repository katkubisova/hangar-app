import { createScenarioState } from "@/lib/demo/scenarios"
import { entriesByGym, entriesByMonth } from "@/lib/demo/stats"

const NOW = new Date("2026-10-15T20:00:00")
const { entries } = createScenarioState("active-membership", NOW)

describe("stats", () => {
	it("gives six months ending with this one", () => {
		const months = entriesByMonth(entries, NOW)
		expect(months.map(month => month.label)).toEqual([
			"kvě",
			"čvn",
			"čvc",
			"srp",
			"zář",
			"říj",
		])
		expect(months.every(month => month.count >= 0)).toBe(true)
	})

	it("counts every entry once across gyms", () => {
		const total = entriesByGym(entries, NOW).reduce(
			(sum, item) => sum + item.count,
			0
		)
		expect(total).toBe(entries.length)
	})
})

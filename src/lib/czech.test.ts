import { inMonth, plural } from "@/lib/czech"

const ENTRY: [string, string, string] = ["vstup", "vstupy", "vstupů"]

describe("plural", () => {
	it("picks the Czech form for the count", () => {
		expect(plural(0, ENTRY)).toBe("vstupů")
		expect(plural(1, ENTRY)).toBe("vstup")
		expect(plural(3, ENTRY)).toBe("vstupy")
		expect(plural(5, ENTRY)).toBe("vstupů")
		expect(plural(12, ENTRY)).toBe("vstupů")
	})
})

describe("inMonth", () => {
	it("uses the locative", () => {
		expect(inMonth(new Date("2026-10-15T12:00:00"))).toBe("v říjnu")
		expect(inMonth(new Date("2026-07-01T12:00:00"))).toBe("v červenci")
	})
})

import { inMonth, plural, timeAgo } from "@/lib/czech"

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

describe("timeAgo", () => {
	const now = new Date("2026-10-15T12:00:00")
	const ago = (ms: number) => new Date(now.getTime() - ms).toISOString()
	it("reads naturally in Czech", () => {
		expect(timeAgo(ago(20_000), now)).toBe("právě teď")
		expect(timeAgo(ago(5 * 60_000), now)).toBe("před 5 minutami")
		expect(timeAgo(ago(60 * 60_000), now)).toBe("před hodinou")
		expect(timeAgo(ago(26 * 3600_000), now)).toBe("včera")
		expect(timeAgo(ago(3 * 86400_000), now)).toBe("před 3 dny")
		expect(timeAgo(ago(20 * 86400_000), now)).toBe("25. 9. 2026")
	})
})

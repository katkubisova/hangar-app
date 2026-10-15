import { createSignedUpState, getVocative } from "@/lib/demo/sign-up"

describe("getVocative", () => {
	it("turns -a into -o", () => {
		expect(getVocative("Tereza")).toBe("Terezo")
		expect(getVocative(" Honza ")).toBe("Honzo")
	})

	it("leaves other names as typed", () => {
		expect(getVocative("Petr")).toBe("Petr")
		expect(getVocative("Lucie")).toBe("Lucie")
	})
})

describe("createSignedUpState", () => {
	it("logs in a new user with no products at the chosen gym", () => {
		const state = createSignedUpState({
			email: "jana@example.cz",
			firstName: "Jana",
			lastName: "Nová",
			phone: "+420 600 000 000",
			birthDate: "2000-01-01",
			homeGym: "ostrava",
		})
		expect(state.isLoggedIn).toBe(true)
		expect(state.user?.firstNameVocative).toBe("Jano")
		expect(state.selectedGym).toBe("ostrava")
		expect(state.ownedProducts).toHaveLength(0)
		expect(state.notifications).toHaveLength(1)
	})
})

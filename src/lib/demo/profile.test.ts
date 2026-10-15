import {
	addDiscountCard,
	removeCard,
	saveKid,
	updateProfile,
} from "@/lib/demo/profile"
import { createScenarioState } from "@/lib/demo/scenarios"

const NOW = new Date("2026-10-15T12:00:00")
const state = createScenarioState("active-membership", NOW)

describe("profile edits", () => {
	it("updates the vocative only when the first name changes", () => {
		const user = state.user
		if (!user) throw new Error("no user")
		const same = updateProfile(state, { ...user, phone: "+420 1" })
		expect(same.user?.firstNameVocative).toBe("Terezo")
		const renamed = updateProfile(state, { ...user, firstName: "Klára" })
		expect(renamed.user?.firstNameVocative).toBe("Kláro")
	})

	it("hands the default to another card when the default is removed", () => {
		const next = removeCard(state, "card-visa")
		expect(next.paymentCards).toHaveLength(1)
		expect(next.paymentCards[0].isDefault).toBe(true)
	})

	it("keeps one card per discount type", () => {
		const once = addDiscountCard(state, "isic", "S420123456789A", NOW)
		const twice = addDiscountCard(once, "isic", "S420999999999B", NOW)
		expect(twice.discountCards).toHaveLength(1)
		expect(twice.discountCards[0].cardNumber).toBe("S420999999999B")
	})

	it("adds and edits kids", () => {
		const added = saveKid(state, {
			id: "kid-new",
			firstName: "Ema",
			lastName: "Svobodová",
			birthYear: 2019,
		})
		expect(added.kids).toHaveLength(2)
		const edited = saveKid(added, {
			id: "kid-new",
			firstName: "Emma",
			lastName: "Svobodová",
			birthYear: 2019,
		})
		expect(edited.kids.find(kid => kid.id === "kid-new")?.firstName).toBe(
			"Emma"
		)
	})
})

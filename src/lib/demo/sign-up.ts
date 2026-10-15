import { createScenarioState } from "@/lib/demo/scenarios"
import type { DemoState } from "@/lib/types/demo-state"
import type { SignUpInput } from "@/lib/types/sign-up-input"

// Czech greets in the vocative ("Ahoj, Terezo"). Names ending in -a take
// -o (Tereza → Terezo, Honza → Honzo); anything else stays as typed, which
// reads as casual rather than wrong. Good enough for a demo.
export function getVocative(firstName: string) {
	const name = firstName.trim()
	return name.toLowerCase().endsWith("a") ? `${name.slice(0, -1)}o` : name
}

// A fresh account after sign-up: logged in, nothing bought yet.
export function createSignedUpState(
	input: SignUpInput,
	today = new Date()
): DemoState {
	const empty = createScenarioState("new-user", today)
	return {
		...empty,
		isLoggedIn: true,
		selectedGym: input.homeGym,
		user: {
			firstName: input.firstName.trim(),
			firstNameVocative: getVocative(input.firstName),
			lastName: input.lastName.trim(),
			email: input.email.trim(),
			phone: input.phone.trim(),
			birthDate: input.birthDate,
			memberId: `HNG-${String(today.getTime()).slice(-6)}`,
		},
		notifications: [
			{
				id: "welcome",
				type: "gym-news",
				title: "Vítej v Hangaru",
				body: "Vyber si členství nebo permanentku a vstupuj přes QR kód.",
				href: "/products",
				createdAt: today.toISOString(),
				read: false,
			},
		],
	}
}

import type { GymSlug } from "@/lib/types/gym"

// What the sign-up and profile setup screens collect. The real fields are
// still open with the client; this set is the prototype's assumption.
export interface SignUpInput {
	email: string
	firstName: string
	lastName: string
	phone: string
	birthDate: string
	homeGym: GymSlug
}

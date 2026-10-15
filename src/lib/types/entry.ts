import type { GymSlug } from "@/lib/types/gym"

// One check-in at a gym.
export interface Entry {
	id: string
	date: string
	gymSlug: GymSlug
}

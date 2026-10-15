import type { Photo } from "@/lib/types/photo"
import type { PriceCategory } from "@/lib/types/price-list"

export type GymSlug = "brno" | "ostrava" | "praha" | "plzen" | "olomouc"

// "coming-soon" gyms show on the map list as "Připravujeme" only: no
// detail, no products, not selectable in the gym switcher.
export type GymStatus = "open" | "coming-soon"

// 1 = Monday … 7 = Sunday (ISO weekday).
export type Weekday = 1 | 2 | 3 | 4 | 5 | 6 | 7

export interface OpeningHoursRow {
	label: string
	days: Weekday[]
	opens: string
	closes: string
}

export interface Coordinates {
	lat: number
	lng: number
}

interface GymBase {
	name: string
	slug: GymSlug
	city: string
	coordinates: Coordinates
	displayOrder: number
}

export interface OpenGym extends GymBase {
	status: "open"
	heroImage: Photo
	galleryImages: Photo[]
	shortDescription: string
	address: string
	openingHours: OpeningHoursRow[]
	email: string
	phone: string
	prices: PriceCategory[]
}

export interface ComingSoonGym extends GymBase {
	status: "coming-soon"
}

export type Gym = OpenGym | ComingSoonGym

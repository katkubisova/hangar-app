import { gyms } from "@/lib/data/gyms"
import { getTodayHours } from "@/lib/demo/opening-hours"
import type { Coordinates, Gym } from "@/lib/types/gym"

// Where the phone "is" once location is allowed: the centre of Brno
// (náměstí Svobody). Simulated; the prototype never reads real location.
export const SIMULATED_LOCATION: Coordinates = { lat: 49.19522, lng: 16.60796 }

// Great-circle distance in km.
export function distanceKm(from: Coordinates, to: Coordinates) {
	const toRad = (deg: number) => (deg * Math.PI) / 180
	const dLat = toRad(to.lat - from.lat)
	const dLng = toRad(to.lng - from.lng)
	const a =
		Math.sin(dLat / 2) ** 2 +
		Math.cos(toRad(from.lat)) *
			Math.cos(toRad(to.lat)) *
			Math.sin(dLng / 2) ** 2
	return 6371 * 2 * Math.asin(Math.sqrt(a))
}

export type GymSort = "distance" | "city"

export interface GymListItem {
	gym: Gym
	distanceKm: number | null
	isOpenNow: boolean
}

// Gyms for the map list. Without a location there's no distance, so
// sorting falls back to city. Coming-soon gyms are never "open now".
export function listGyms(options: {
	sort: GymSort
	openNowOnly: boolean
	location: Coordinates | null
	now: Date
}): GymListItem[] {
	const items = gyms.map(gym => ({
		gym,
		distanceKm: options.location
			? distanceKm(options.location, gym.coordinates)
			: null,
		isOpenNow:
			gym.status === "open" &&
			Boolean(getTodayHours(gym, options.now)?.isOpenNow),
	}))
	const filtered = options.openNowOnly
		? items.filter(item => item.isOpenNow)
		: items
	const byDistance = options.sort === "distance" && options.location
	return filtered.sort((a, b) =>
		byDistance
			? (a.distanceKm ?? 0) - (b.distanceKm ?? 0)
			: a.gym.city.localeCompare(b.gym.city, "cs")
	)
}

export function formatDistance(km: number) {
	return km < 10
		? `${km.toFixed(1).replace(".", ",")} km`
		: `${Math.round(km)} km`
}

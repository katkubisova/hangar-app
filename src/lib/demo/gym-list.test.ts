import {
	distanceKm,
	formatDistance,
	listGyms,
	SIMULATED_LOCATION,
} from "@/lib/demo/gym-list"

// A Wednesday at 12:00, when both open gyms are open.
const NOW = new Date("2026-10-14T12:00:00")

describe("gym list", () => {
	it("measures distance", () => {
		const brnoToPraha = distanceKm(
			{ lat: 49.1951, lng: 16.6068 },
			{ lat: 50.0875, lng: 14.4213 }
		)
		// About 186 km as the crow flies.
		expect(brnoToPraha).toBeGreaterThan(180)
		expect(brnoToPraha).toBeLessThan(190)
	})

	it("sorts by distance when location is known", () => {
		const items = listGyms({
			sort: "distance",
			openNowOnly: false,
			location: SIMULATED_LOCATION,
			now: NOW,
		})
		expect(items[0].gym.slug).toBe("brno")
		expect(items).toHaveLength(5)
	})

	it("falls back to city order without location", () => {
		const items = listGyms({
			sort: "distance",
			openNowOnly: false,
			location: null,
			now: NOW,
		})
		expect(items.map(item => item.gym.city)).toEqual([
			"Brno",
			"Olomouc",
			"Ostrava",
			"Plzeň",
			"Praha",
		])
		expect(items[0].distanceKm).toBeNull()
	})

	it("filters to gyms open now", () => {
		const items = listGyms({
			sort: "city",
			openNowOnly: true,
			location: null,
			now: NOW,
		})
		expect(items.map(item => item.gym.slug)).toEqual(["brno", "ostrava"])
		const night = listGyms({
			sort: "city",
			openNowOnly: true,
			location: null,
			now: new Date("2026-10-14T23:30:00"),
		})
		expect(night).toHaveLength(0)
	})

	it("formats distance", () => {
		expect(formatDistance(2.345)).toBe("2,3 km")
		expect(formatDistance(152.6)).toBe("153 km")
	})
})

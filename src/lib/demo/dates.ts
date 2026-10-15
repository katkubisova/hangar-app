const DAY_MS = 24 * 60 * 60 * 1000

// Demo data is dated relative to "today", so the prototype always looks
// current. Times are set to a plausible climbing hour.
export function daysFrom(today: Date, days: number, hour = 18) {
	const date = new Date(today.getTime() + days * DAY_MS)
	date.setHours(hour, 0, 0, 0)
	return date.toISOString()
}

export function startOfDay(date: Date) {
	const copy = new Date(date)
	copy.setHours(0, 0, 0, 0)
	return copy
}

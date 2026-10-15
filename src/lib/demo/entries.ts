import type { Entry } from "@/lib/types/entry"

// Check-ins in the same calendar month as `now`, across all gyms.
export function countEntriesInMonth(entries: Entry[], now: Date) {
	return entries.filter(entry => {
		const date = new Date(entry.date)
		return (
			date.getFullYear() === now.getFullYear() &&
			date.getMonth() === now.getMonth() &&
			date <= now
		)
	}).length
}

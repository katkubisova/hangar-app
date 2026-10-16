import type { Entry } from "@/lib/types/entry"
import type { GymSlug } from "@/lib/types/gym"

const MONTH_SHORT = [
	"led",
	"úno",
	"bře",
	"dub",
	"kvě",
	"čvn",
	"čvc",
	"srp",
	"zář",
	"říj",
	"lis",
	"pro",
]

export interface MonthCount {
	key: string
	label: string
	count: number
}

// Entries per calendar month, oldest first, ending with the current month.
export function entriesByMonth(
	entries: Entry[],
	now: Date,
	months = 6
): MonthCount[] {
	return Array.from({ length: months }, (_, index) => {
		const month = new Date(
			now.getFullYear(),
			now.getMonth() - (months - 1 - index),
			1
		)
		const count = entries.filter(entry => {
			const date = new Date(entry.date)
			return (
				date.getFullYear() === month.getFullYear() &&
				date.getMonth() === month.getMonth() &&
				date <= now
			)
		}).length
		return {
			key: `${month.getFullYear()}-${month.getMonth() + 1}`,
			label: MONTH_SHORT[month.getMonth()],
			count,
		}
	})
}

export function entriesByGym(entries: Entry[], now: Date) {
	const counts = new Map<GymSlug, number>()
	for (const entry of entries) {
		if (new Date(entry.date) <= now) {
			counts.set(entry.gymSlug, (counts.get(entry.gymSlug) ?? 0) + 1)
		}
	}
	return [...counts.entries()]
		.map(([gymSlug, count]) => ({ gymSlug, count }))
		.sort((a, b) => b.count - a.count)
}

import type { OpenGym, Weekday } from "@/lib/types/gym"

function isoWeekday(date: Date) {
	return (date.getDay() === 0 ? 7 : date.getDay()) as Weekday
}

function minutesOf(time: string) {
	const [hours, minutes] = time.split(":").map(Number)
	return hours * 60 + minutes
}

export function getTodayHours(gym: OpenGym, now: Date) {
	const row = gym.openingHours.find(item => item.days.includes(isoWeekday(now)))
	if (!row) {
		return null
	}
	const current = now.getHours() * 60 + now.getMinutes()
	return {
		opens: row.opens,
		closes: row.closes,
		isOpenNow:
			current >= minutesOf(row.opens) && current < minutesOf(row.closes),
	}
}

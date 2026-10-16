// Czech grammar helpers for UI copy.

// Czech plurals have three forms: 1 vstup, 2–4 vstupy, 0 or 5+ vstupů.
export function plural(
	count: number,
	forms: [one: string, few: string, many: string]
) {
	if (count === 1) {
		return forms[0]
	}
	if (count >= 2 && count <= 4) {
		return forms[1]
	}
	return forms[2]
}

// "v říjnu": month names in the locative, January first.
const MONTH_LOCATIVE = [
	"lednu",
	"únoru",
	"březnu",
	"dubnu",
	"květnu",
	"červnu",
	"červenci",
	"srpnu",
	"září",
	"říjnu",
	"listopadu",
	"prosinci",
]

export function inMonth(date: Date) {
	return `v ${MONTH_LOCATIVE[date.getMonth()]}`
}

// "před 5 minutami", "včera", "před 3 dny"; older than a week as a date.
export function timeAgo(iso: string, now: Date) {
	const minutes = Math.floor((now.getTime() - new Date(iso).getTime()) / 60000)
	if (minutes < 1) {
		return "právě teď"
	}
	if (minutes < 60) {
		return minutes === 1 ? "před minutou" : `před ${minutes} minutami`
	}
	const hours = Math.floor(minutes / 60)
	if (hours < 24) {
		return hours === 1 ? "před hodinou" : `před ${hours} hodinami`
	}
	const days = Math.floor(hours / 24)
	if (days === 1) {
		return "včera"
	}
	if (days < 7) {
		return `před ${days} dny`
	}
	const date = new Date(iso)
	return `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`
}

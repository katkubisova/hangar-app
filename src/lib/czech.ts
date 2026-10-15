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

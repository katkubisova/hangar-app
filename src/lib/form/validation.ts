// Inline form validation. Messages are Czech UI copy.
// Returning undefined means the value is fine.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 8

export function validateEmail(value: string) {
	if (!value.trim()) {
		return "Vyplň e-mail."
	}
	if (!EMAIL_PATTERN.test(value.trim())) {
		return "Zadej e-mail ve tvaru jmeno@domena.cz."
	}
}

// Sign-in only checks it's filled: any credentials pass.
export function validatePasswordFilled(value: string) {
	if (!value) {
		return "Vyplň heslo."
	}
}

export function validateNewPassword(value: string) {
	if (!value) {
		return "Vyplň heslo."
	}
	if (value.length < MIN_PASSWORD_LENGTH) {
		return `Heslo musí mít aspoň ${MIN_PASSWORD_LENGTH} znaků.`
	}
}

export function validatePasswordMatch(value: string, password: string) {
	if (!value) {
		return "Zopakuj heslo."
	}
	if (value !== password) {
		return "Hesla se neshodují."
	}
}

export function validateRequired(value: string, message: string) {
	if (!value.trim()) {
		return message
	}
}

export function validatePhone(value: string) {
	if (value.replace(/\D/g, "").length < 9) {
		return "Zadej telefon ve tvaru +420 123 456 789."
	}
}

export function validateBirthDate(value: string, today = new Date()) {
	if (!value) {
		return "Vyplň datum narození."
	}
	if (new Date(value) > today) {
		return "Datum narození nemůže být v budoucnu."
	}
}

// Payment cards (simulated): format checks only, no card network.
export function validateCardNumber(value: string) {
	if (value.replace(/\D/g, "").length !== 16) {
		return "Zadej 16 číslic z přední strany karty."
	}
}

export function validateCardExpiry(value: string, today = new Date()) {
	const match = /^(\d{2})\/(\d{2})$/.exec(value)
	const month = match ? Number(match[1]) : 0
	if (!match || month < 1 || month > 12) {
		return "Zadej platnost ve tvaru MM/RR."
	}
	const lastDay = new Date(2000 + Number(match[2]), month, 0, 23, 59)
	if (lastDay < today) {
		return "Karta už neplatí."
	}
}

export function validateCardCvc(value: string) {
	if (!/^\d{3}$/.test(value)) {
		return "Zadej 3 číslice ze zadní strany karty."
	}
}

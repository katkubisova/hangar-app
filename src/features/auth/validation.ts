// Inline validation for the auth forms. Messages are Czech UI copy.
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

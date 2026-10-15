export interface UserProfile {
	firstName: string
	// Czech greets in the vocative ("Ahoj, Terezo"). Fake data stores it;
	// the real app needs it from the account or a declension rule.
	firstNameVocative: string
	lastName: string
	email: string
	phone: string
	// ISO date (YYYY-MM-DD).
	birthDate: string
	// Encoded in the check-in QR code. Fake, for the prototype only.
	memberId: string
}

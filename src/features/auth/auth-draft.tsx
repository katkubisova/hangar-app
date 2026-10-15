"use client"

import { createContext, use, useState } from "react"

// Carries values between the steps of a flow (sign-up → profile setup,
// forgot password → "check your e-mail"). Lives in the (auth) layout, so
// it survives navigation between those screens but is never saved.
interface AuthDraft {
	email: string
	password: string
}

const AuthDraftContext = createContext<{
	draft: AuthDraft
	setDraft: (draft: AuthDraft) => void
} | null>(null)

export function AuthDraftProvider({ children }: { children: React.ReactNode }) {
	const [draft, setDraft] = useState<AuthDraft>({ email: "", password: "" })
	return (
		<AuthDraftContext value={{ draft, setDraft }}>{children}</AuthDraftContext>
	)
}

export function useAuthDraft() {
	const context = use(AuthDraftContext)
	if (!context) {
		throw new Error("useAuthDraft must be used inside AuthDraftProvider")
	}
	return context
}

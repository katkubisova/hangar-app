import { AuthDraftProvider } from "@/features/auth/auth-draft"

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <AuthDraftProvider>{children}</AuthDraftProvider>
}

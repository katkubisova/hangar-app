import { RequireLogin } from "@/features/auth/require-login"
import { PlaceholderScreen } from "@/features/placeholder/placeholder-screen"

export default function NotificationsPage() {
	return (
		<RequireLogin>
			<PlaceholderScreen title="Notifikace" step={7} backHref="/home" />
		</RequireLogin>
	)
}

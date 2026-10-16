import { RequireLogin } from "@/features/auth/require-login"
import { NotificationsScreen } from "@/features/notifications/notifications-screen"

export default function NotificationsPage() {
	return (
		<RequireLogin>
			<NotificationsScreen />
		</RequireLogin>
	)
}

import { RequireLogin } from "@/features/auth/require-login"
import { FeedbackScreen } from "@/features/system/feedback-screen"

export default function FeedbackPage() {
	return (
		<RequireLogin>
			<FeedbackScreen />
		</RequireLogin>
	)
}

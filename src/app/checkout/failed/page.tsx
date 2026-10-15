import { Suspense } from "react"

import { RequireLogin } from "@/features/auth/require-login"
import { CheckoutFailedScreen } from "@/features/products/checkout-result-screen"

// useSearchParams needs a Suspense boundary on a static page.
export default function Page() {
	return (
		<RequireLogin>
			<Suspense>
				<CheckoutFailedScreen />
			</Suspense>
		</RequireLogin>
	)
}

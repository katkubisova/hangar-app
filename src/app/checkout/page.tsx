import { Suspense } from "react"

import { RequireLogin } from "@/features/auth/require-login"
import { CheckoutScreen } from "@/features/products/checkout-screen"

// useSearchParams needs a Suspense boundary on a static page.
export default function Page() {
	return (
		<RequireLogin>
			<Suspense>
				<CheckoutScreen />
			</Suspense>
		</RequireLogin>
	)
}

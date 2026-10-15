import { Suspense } from "react"

import { NavigateScreen } from "@/features/simulated/navigate-screen"

// useSearchParams needs a Suspense boundary on a static page.
export default function NavigatePage() {
	return (
		<Suspense>
			<NavigateScreen />
		</Suspense>
	)
}

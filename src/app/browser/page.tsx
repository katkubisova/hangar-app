import { Suspense } from "react"

import { BrowserScreen } from "@/features/simulated/browser-screen"

// useSearchParams needs a Suspense boundary on a static page.
export default function Page() {
	return (
		<Suspense>
			<BrowserScreen />
		</Suspense>
	)
}

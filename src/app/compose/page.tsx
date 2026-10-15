import { Suspense } from "react"

import { ComposeScreen } from "@/features/support/compose-screen"

// useSearchParams needs a Suspense boundary on a static page.
export default function ComposePage() {
	return (
		<Suspense>
			<ComposeScreen />
		</Suspense>
	)
}

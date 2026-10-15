import { Suspense } from "react"

import { StoreScreen } from "@/features/simulated/store-screen"

// useSearchParams needs a Suspense boundary on a static page.
export default function Page() {
	return (
		<Suspense>
			<StoreScreen />
		</Suspense>
	)
}

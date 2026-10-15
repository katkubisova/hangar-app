"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { useDemoState } from "@/lib/demo/context"

// Tab screens need a signed-in user. Logged out (e.g. after switching to
// the "Nový uživatel" scenario), send them to Welcome.
export function RequireLogin({ children }: { children: React.ReactNode }) {
	const { isLoggedIn } = useDemoState()
	const router = useRouter()

	useEffect(() => {
		if (!isLoggedIn) {
			router.replace("/welcome")
		}
	}, [isLoggedIn, router])

	return isLoggedIn ? children : null
}

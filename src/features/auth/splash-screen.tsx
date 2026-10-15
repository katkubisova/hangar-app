"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { Logo } from "@/components/brand/logo"
import { useDemoState } from "@/lib/demo/context"

const SPLASH_MS = 1400

export function SplashScreen() {
	const { isLoggedIn } = useDemoState()
	const router = useRouter()

	useEffect(() => {
		const timer = window.setTimeout(
			() => router.replace(isLoggedIn ? "/home" : "/welcome"),
			SPLASH_MS
		)
		return () => window.clearTimeout(timer)
	}, [isLoggedIn, router])

	return (
		<div className="dark flex h-full items-center justify-center bg-background">
			<Logo
				variant="hng"
				height={48}
				safeZone
				className="text-foreground duration-700 animate-in fade-in-0 zoom-in-95"
			/>
		</div>
	)
}

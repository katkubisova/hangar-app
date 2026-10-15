"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { SimulatedTag } from "@/components/shell/simulated-tag"
import { useDemo } from "@/lib/demo/context"

const AUTO_DISMISS_MS = 6000

// Simulated iOS push notification, sent from the demo panel. Slides in
// from the top of the app; tapping it opens the linked screen.
export function PushBanner() {
	const { push, dismissPush, markNotificationRead } = useDemo()
	const router = useRouter()

	useEffect(() => {
		if (!push) {
			return
		}
		const timer = window.setTimeout(dismissPush, AUTO_DISMISS_MS)
		return () => window.clearTimeout(timer)
	}, [push, dismissPush])

	if (!push) {
		return null
	}

	return (
		<div className="pointer-events-none absolute inset-x-2 top-[calc(var(--safe-top)+0.5rem)] z-50 duration-300 animate-in fade-in-0 slide-in-from-top-6">
			<button
				type="button"
				onClick={() => {
					dismissPush()
					markNotificationRead(push.id)
					router.push(push.href)
				}}
				className="pointer-events-auto flex w-full gap-3 rounded-[22px] bg-white/85 p-3 text-left font-system text-black shadow-lg backdrop-blur-xl active:bg-white/70"
			>
				<Image
					src="/icons/icon-192.png"
					alt=""
					width={38}
					height={38}
					className="size-[38px] shrink-0 rounded-[9px]"
				/>
				<span className="min-w-0 flex-1">
					<span className="flex items-center justify-between gap-2 text-[13px] text-black/50">
						<span>HANGAR</span>
						<span className="flex items-center gap-1.5">
							<SimulatedTag />
							teď
						</span>
					</span>
					<span className="block text-[15px] leading-snug font-semibold">
						{push.title}
					</span>
					<span className="block text-[15px] leading-snug">{push.body}</span>
				</span>
			</button>
		</div>
	)
}

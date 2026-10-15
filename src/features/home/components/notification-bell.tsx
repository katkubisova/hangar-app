"use client"

import Link from "next/link"

import { NotificationIcon } from "@/components/ui/icons"
import { useDemoState } from "@/lib/demo/context"

export function NotificationBell() {
	const { notifications } = useDemoState()
	const unread = notifications.filter(item => !item.read).length

	return (
		<Link
			href="/notifications"
			className="relative flex size-11 items-center justify-center active:opacity-60"
			aria-label={unread ? `Notifikace, nepřečtené: ${unread}` : "Notifikace"}
		>
			<NotificationIcon className="size-6" aria-hidden="true" />
			{unread > 0 && (
				<span className="absolute top-1.5 right-1 flex min-w-[18px] items-center justify-center bg-electric-violet px-1 text-[11px] leading-[18px] font-medium text-alabaster">
					{unread}
				</span>
			)}
		</Link>
	)
}

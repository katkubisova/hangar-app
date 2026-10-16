"use client"

import { useRouter } from "next/navigation"

import { EmptyState } from "@/components/shell/empty-state"
import { Screen } from "@/components/shell/screen"
import {
	CardmembershipIcon,
	ErrorCircleIcon,
	NotificationIcon,
	RefreshIcon,
	TimeIcon,
} from "@/components/ui/icons"
import { timeAgo } from "@/lib/czech"
import { useDemo, useDemoState } from "@/lib/demo/context"
import type { AppNotificationType } from "@/lib/types/app-notification"
import { cn } from "@/lib/utils"

const TYPE_ICON: Record<AppNotificationType, typeof NotificationIcon> = {
	"purchase-confirmed": CardmembershipIcon,
	"membership-ending": TimeIcon,
	"payment-failed": ErrorCircleIcon,
	"gym-news": NotificationIcon,
	"recommended-update": RefreshIcon,
}

// In-app notification list. Tapping one marks it read and opens its screen.
export function NotificationsScreen() {
	const { notifications } = useDemoState()
	const { markNotificationRead, markAllNotificationsRead } = useDemo()
	const router = useRouter()
	const now = new Date()
	const unread = notifications.filter(item => !item.read).length
	const sorted = [...notifications].sort((a, b) =>
		b.createdAt.localeCompare(a.createdAt)
	)

	return (
		<Screen
			title="Notifikace"
			backHref="/home"
			backLabel="Domů"
			headerEnd={
				unread > 0 && (
					<button
						type="button"
						onClick={markAllNotificationsRead}
						className="h-11 px-2 text-sm font-medium text-link active:opacity-60"
					>
						Označit vše jako přečtené
					</button>
				)
			}
		>
			{sorted.length === 0 ? (
				<EmptyState
					profile="boomerang"
					title="Žádné notifikace"
					text="Až se něco stane, najdeš to tady."
				/>
			) : (
				<ul className="border-t pb-6">
					{sorted.map(item => {
						const Icon = TYPE_ICON[item.type]
						return (
							<li key={item.id} className="border-b">
								<button
									type="button"
									onClick={() => {
										markNotificationRead(item.id)
										router.push(item.href)
									}}
									className={cn(
										"flex w-full gap-3 px-4 py-3.5 text-left active:bg-muted",
										!item.read && "bg-card"
									)}
								>
									<Icon
										className={cn(
											"mt-0.5 size-6 shrink-0",
											item.type === "payment-failed" && "text-trinidad"
										)}
										aria-hidden="true"
									/>
									<span className="min-w-0 flex-1">
										<span className="flex items-baseline justify-between gap-2">
											<span
												className={cn(item.read ? "font-medium" : "font-bold")}
											>
												{item.title}
											</span>
											<span className="shrink-0 text-xs text-muted-foreground">
												{timeAgo(item.createdAt, now)}
											</span>
										</span>
										<span className="mt-0.5 block text-sm text-muted-foreground">
											{item.body}
										</span>
									</span>
									<span
										aria-hidden="true"
										className={cn(
											"mt-2 size-2 shrink-0",
											item.read ? "bg-transparent" : "bg-electric-violet"
										)}
									/>
									{!item.read && <span className="sr-only">Nepřečteno</span>}
								</button>
							</li>
						)
					})}
				</ul>
			)}
		</Screen>
	)
}

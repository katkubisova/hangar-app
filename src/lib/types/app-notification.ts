export type AppNotificationType =
	| "purchase-confirmed"
	| "membership-ending"
	| "payment-failed"
	| "gym-news"
	| "recommended-update"

export interface AppNotification {
	id: string
	type: AppNotificationType
	title: string
	body: string
	// The screen the notification opens.
	href: string
	createdAt: string
	read: boolean
}

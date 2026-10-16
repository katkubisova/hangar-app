// Which notification types the user wants (Nastavení → Notifikace).
export interface NotificationPrefs {
	purchases: boolean
	membership: boolean
	payments: boolean
	gymNews: boolean
	appUpdates: boolean
}

export type NotificationPrefKey = keyof NotificationPrefs

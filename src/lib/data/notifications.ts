import { daysFrom } from "@/lib/demo/dates"
import type { AppNotification } from "@/lib/types/app-notification"
import type { DemoScenarioId } from "@/lib/types/demo-scenario"

// Demo notifications. Each one deep-links to the screen it's about; some
// of those screens arrive in later build steps. The gym news reflects the
// live sites (new boulders every week in both gyms).

type NotificationTemplate = Omit<AppNotification, "createdAt"> & {
	daysAgo: number
}

const GYM_NEWS: NotificationTemplate[] = [
	{
		id: "news-brno-boulders",
		type: "gym-news",
		title: "Nové bouldery v Brně",
		body: "Stavěči v Hale A postavili 20 nových boulderů. Přijď je zkusit.",
		href: "/map/brno",
		read: false,
		daysAgo: 2,
	},
	{
		id: "news-ostrava-sector",
		type: "gym-news",
		title: "Nový sektor v Ostravě",
		body: "Stavěči obměnili celý sektor. Přijď zkusit nové bouldery.",
		href: "/map/ostrava",
		read: false,
		daysAgo: 9,
	},
	{
		id: "update-available",
		type: "recommended-update",
		title: "Nová verze aplikace",
		body: "Aktualizuj aplikaci a získej opravy a vylepšení.",
		href: "/profile/settings",
		read: true,
		daysAgo: 20,
	},
]

const ACTIVE_MEMBERSHIP: NotificationTemplate[] = [
	{
		id: "purchase-12m",
		type: "purchase-confirmed",
		title: "Platba proběhla",
		body: "Členství Dospělý na 12 měsíců v Hangaru Brno je aktivní.",
		href: "/products/mine",
		read: true,
		daysAgo: 154,
	},
	{
		id: "payment-failed",
		type: "payment-failed",
		title: "Platba se nezdařila",
		body: "Platbu kartou se nepodařilo dokončit. Zkontroluj kartu a zkus to znovu.",
		href: "/profile/cards",
		read: true,
		daysAgo: 155,
	},
	{
		id: "membership-ending-1m",
		type: "membership-ending",
		title: "Členství brzy končí",
		body: "Tvoje členství Dospělý na 1 měsíc končí za 3 dny.",
		href: "/products/mine",
		read: true,
		daysAgo: 158,
	},
]

const EXPIRED_MEMBERSHIP: NotificationTemplate[] = [
	{
		id: "membership-ended",
		type: "membership-ending",
		title: "Členství skončilo",
		body: "Tvoje členství v Hangaru Brno skončilo. Obnov si ho v aplikaci.",
		href: "/products",
		read: false,
		daysAgo: 12,
	},
	{
		id: "membership-ending-3m",
		type: "membership-ending",
		title: "Členství brzy končí",
		body: "Tvoje členství Dospělý na 3 měsíce končí za 7 dní.",
		href: "/products/mine",
		read: true,
		daysAgo: 19,
	},
]

const BY_SCENARIO: Record<DemoScenarioId, NotificationTemplate[]> = {
	"new-user": [],
	"active-membership": [...GYM_NEWS, ...ACTIVE_MEMBERSHIP],
	"no-membership": GYM_NEWS,
	"expired-membership": [...EXPIRED_MEMBERSHIP, ...GYM_NEWS],
}

export function buildNotifications(
	scenario: DemoScenarioId,
	today: Date
): AppNotification[] {
	return BY_SCENARIO[scenario]
		.map(({ daysAgo, ...notification }) => ({
			...notification,
			createdAt: daysFrom(today, -daysAgo, 10),
		}))
		.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

// The notification the demo panel sends as a simulated push.
export const DEMO_PUSH: Omit<AppNotification, "createdAt" | "read"> = {
	id: "push-demo",
	type: "gym-news",
	title: "Nové bouldery v Brně",
	body: "Stavěči v Hale A postavili 20 nových boulderů. Přijď je zkusit.",
	href: "/map/brno",
}

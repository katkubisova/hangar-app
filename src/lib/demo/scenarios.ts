import { demoKids, demoPaymentCards, demoUser } from "@/lib/data/demo-user"
import { buildNotifications } from "@/lib/data/notifications"
import { getProduct } from "@/lib/data/products"
import { daysFrom } from "@/lib/demo/dates"
import type { DemoScenarioId } from "@/lib/types/demo-scenario"
import type { DemoState } from "@/lib/types/demo-state"
import type { Entry } from "@/lib/types/entry"
import type { GymSlug } from "@/lib/types/gym"
import type { OwnedProduct } from "@/lib/types/owned-product"
import type { Purchase } from "@/lib/types/purchase"
import type { SystemFlags } from "@/lib/types/system-flags"

export const DEFAULT_SCENARIO: DemoScenarioId = "new-user"

export const SCENARIO_LABEL: Record<DemoScenarioId, string> = {
	"new-user": "Nový uživatel",
	"active-membership": "Aktivní členství",
	"no-membership": "Bez členství",
	"expired-membership": "Expirované členství",
}

export const SYSTEM_FLAGS_OFF: SystemFlags = {
	maintenance: false,
	forcedUpdate: false,
	recommendedUpdate: false,
	feedbackPrompt: false,
	blockedUser: false,
	paymentErrorNextCheckout: false,
}

// Roughly two visits a week between two points in time (days relative to
// today, negative = past). Deterministic, so every demo looks the same.
function buildEntries(
	today: Date,
	gymSlug: GymSlug,
	fromDay: number,
	toDay: number,
	idPrefix: string
): Entry[] {
	const gaps = [3, 4, 2, 5, 3, 4]
	const entries: Entry[] = []
	let day = fromDay
	let index = 0
	while (day <= toDay) {
		entries.push({
			id: `${idPrefix}-${index}`,
			date: daysFrom(today, day, index % 2 === 0 ? 18 : 17),
			gymSlug,
		})
		day += gaps[index % gaps.length]
		index++
	}
	return entries
}

function owned(
	id: string,
	productId: string,
	today: Date,
	fromDay: number,
	toDay: number,
	extra: Partial<OwnedProduct> = {}
): OwnedProduct {
	return {
		id,
		productId,
		purchasedAt: daysFrom(today, fromDay, 12),
		validFrom: daysFrom(today, fromDay, 0),
		validUntil: daysFrom(today, toDay, 23),
		...extra,
	}
}

function purchaseOf(item: OwnedProduct, paymentCardId: string): Purchase {
	return {
		id: `purchase-${item.id}`,
		productId: item.productId,
		date: item.purchasedAt,
		amount: getProduct(item.productId).price,
		paymentCardId,
	}
}

function loggedOutState(): Omit<DemoState, "scenario" | "notifications"> {
	return {
		isLoggedIn: false,
		user: null,
		selectedGym: "brno",
		ownedProducts: [],
		purchases: [],
		entries: [],
		paymentCards: [],
		kids: [],
		discountCards: [],
		notificationPrefs: {
			purchases: true,
			membership: true,
			payments: true,
			gymNews: true,
			appUpdates: false,
		},
		system: SYSTEM_FLAGS_OFF,
		permissions: { push: "not-asked", location: "not-asked" },
	}
}

function scenarioData(
	scenario: DemoScenarioId,
	today: Date
): Partial<DemoState> {
	switch (scenario) {
		case "new-user":
			return {}

		case "active-membership": {
			// An older Ostrava pass that ran out, a 1-month trial membership in
			// Brno, then the 12-month one that's active now.
			const expiredPackage = owned(
				"owned-ostrava-pass",
				"ostrava-package-adult-all-day-10",
				today,
				-380,
				-15,
				{ entriesUsed: 7 }
			)
			const trialMembership = owned(
				"owned-brno-1m",
				"brno-membership-adult-1m",
				today,
				-185,
				-155,
				{ autoRenew: false }
			)
			const activeMembership = owned(
				"owned-brno-12m",
				"brno-membership-adult-12m",
				today,
				-154,
				211,
				{ autoRenew: true }
			)
			return {
				isLoggedIn: true,
				user: demoUser,
				ownedProducts: [activeMembership, trialMembership, expiredPackage],
				purchases: [
					purchaseOf(activeMembership, "card-visa"),
					purchaseOf(trialMembership, "card-visa"),
					purchaseOf(expiredPackage, "card-mastercard"),
				],
				entries: [
					...buildEntries(today, "brno", -185, -1, "entry-brno"),
					...buildEntries(today, "ostrava", -370, -330, "entry-ostrava").slice(
						0,
						7
					),
				],
				paymentCards: demoPaymentCards,
				kids: demoKids,
			}
		}

		case "no-membership":
			return {
				isLoggedIn: true,
				user: demoUser,
				paymentCards: demoPaymentCards.slice(0, 1),
			}

		case "expired-membership": {
			const expiredMembership = owned(
				"owned-brno-3m",
				"brno-membership-adult-3m",
				today,
				-104,
				-12,
				{ autoRenew: false }
			)
			return {
				isLoggedIn: true,
				user: demoUser,
				ownedProducts: [expiredMembership],
				purchases: [purchaseOf(expiredMembership, "card-visa")],
				entries: buildEntries(today, "brno", -104, -13, "entry-brno"),
				paymentCards: demoPaymentCards,
			}
		}
	}
}

export function createScenarioState(
	scenario: DemoScenarioId,
	today = new Date()
): DemoState {
	return {
		...loggedOutState(),
		...scenarioData(scenario, today),
		scenario,
		notifications: buildNotifications(scenario, today),
	}
}

"use client"

import { Screen } from "@/components/shell/screen"
import { EntriesThisMonth } from "@/features/home/components/entries-this-month"
import { GymSwitcher } from "@/features/home/components/gym-switcher"
import { MembershipCard } from "@/features/home/components/membership-card"
import { NotificationBell } from "@/features/home/components/notification-bell"
import { OpeningHoursToday } from "@/features/home/components/opening-hours-today"
import { RecommendedProducts } from "@/features/home/components/recommended-products"
import { BlockedAccount } from "@/features/support/blocked-account"
import { useDemoState } from "@/lib/demo/context"
import { getPrimaryProduct, withDetails } from "@/lib/demo/owned-products"

export function HomeScreen() {
	const { user, ownedProducts, selectedGym, entries, system } = useDemoState()
	const now = new Date()
	const primary = getPrimaryProduct(ownedProducts, now)
	const activeOwned = ownedProducts.filter(
		item => withDetails(item, now).status === "active"
	)

	return (
		<Screen
			title={user ? `Ahoj, ${user.firstNameVocative}` : "Ahoj"}
			headerStart={<GymSwitcher />}
			headerEnd={<NotificationBell />}
		>
			{system.blockedUser ? (
				<BlockedAccount gymSlug={selectedGym} />
			) : (
				<div className="pb-6">
					<div className="flex flex-col gap-3 px-4">
						<MembershipCard primary={primary} selectedGym={selectedGym} />
						<div className="grid grid-cols-2 gap-3">
							<EntriesThisMonth entries={entries} />
							<OpeningHoursToday gymSlug={selectedGym} />
						</div>
					</div>
					<RecommendedProducts
						gymSlug={selectedGym}
						activeOwned={activeOwned}
					/>
				</div>
			)}
		</Screen>
	)
}

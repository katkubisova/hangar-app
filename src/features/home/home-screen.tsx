"use client"

import { Screen } from "@/components/shell/screen"
import { GymSwitcher } from "@/features/home/components/gym-switcher"
import { MembershipCard } from "@/features/home/components/membership-card"
import { NotificationBell } from "@/features/home/components/notification-bell"
import { OpeningHoursToday } from "@/features/home/components/opening-hours-today"
import { useDemoState } from "@/lib/demo/context"
import { getPrimaryProduct } from "@/lib/demo/owned-products"

export function HomeScreen() {
	const { user, ownedProducts, selectedGym } = useDemoState()
	const primary = getPrimaryProduct(ownedProducts, new Date())

	return (
		<Screen
			title={user ? `Ahoj, ${user.firstNameVocative}` : "Ahoj"}
			headerStart={<GymSwitcher />}
			headerEnd={<NotificationBell />}
		>
			<div className="flex flex-col gap-3 px-4 pb-6">
				<MembershipCard primary={primary} selectedGym={selectedGym} />
				<OpeningHoursToday gymSlug={selectedGym} />
			</div>
		</Screen>
	)
}

"use client"

import { TimeIcon } from "@/components/ui/icons"
import { getOpenGym } from "@/lib/data/gyms"
import { getTodayHours } from "@/lib/demo/opening-hours"
import type { GymSlug } from "@/lib/types/gym"
import { cn } from "@/lib/utils"

export function OpeningHoursToday({ gymSlug }: { gymSlug: GymSlug }) {
	const gym = getOpenGym(gymSlug)
	const today = getTodayHours(gym, new Date())

	return (
		<div className="flex items-start gap-3 border bg-card p-4">
			<TimeIcon className="mt-0.5 size-6 shrink-0" aria-hidden="true" />
			<div className="min-w-0 flex-1">
				<p className="eyebrow">Dnes otevřeno</p>
				<p className="mt-1 text-h3 font-medium tracking-heading">
					{today ? `${today.opens}–${today.closes}` : "Zavřeno"}
				</p>
				<p className="mt-1 text-sm text-muted-foreground">{gym.address}</p>
			</div>
			{today && (
				<span className="flex shrink-0 items-center gap-1.5 text-sm font-medium">
					<span
						aria-hidden="true"
						className={cn("size-2", today.isOpenNow ? "bg-orient" : "bg-input")}
					/>
					{today.isOpenNow ? "Otevřeno" : "Zavřeno"}
				</span>
			)}
		</div>
	)
}

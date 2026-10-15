"use client"

import { getOpenGym } from "@/lib/data/gyms"
import { getTodayHours } from "@/lib/demo/opening-hours"
import type { GymSlug } from "@/lib/types/gym"
import { cn } from "@/lib/utils"

export function OpeningHoursToday({ gymSlug }: { gymSlug: GymSlug }) {
	const today = getTodayHours(getOpenGym(gymSlug), new Date())

	return (
		<div className="flex flex-col border bg-card p-4">
			<p className="eyebrow">Dnes</p>
			<p className="mt-2 text-h3 font-bold tracking-heading">
				{today ? `${today.opens}–${today.closes}` : "Zavřeno"}
			</p>
			{today && (
				<p className="mt-auto flex items-center gap-1.5 pt-2 text-sm">
					<span
						aria-hidden="true"
						className={cn("size-2", today.isOpenNow ? "bg-orient" : "bg-input")}
					/>
					{today.isOpenNow ? "Otevřeno" : "Teď zavřeno"}
				</p>
			)}
		</div>
	)
}

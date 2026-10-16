"use client"

import { Screen } from "@/components/shell/screen"
import { MonthChart } from "@/features/profile/components/month-chart"
import { inMonth, plural } from "@/lib/czech"
import { getOpenGym } from "@/lib/data/gyms"
import { useDemoState } from "@/lib/demo/context"
import { countEntriesInMonth } from "@/lib/demo/entries"
import { entriesByGym, entriesByMonth } from "@/lib/demo/stats"

const ENTRY_FORMS: [string, string, string] = ["vstup", "vstupy", "vstupů"]

// Kept simple on purpose: missions and challenges come in a later phase.
export function StatsScreen() {
	const { entries } = useDemoState()
	const now = new Date()
	const total = entries.filter(entry => new Date(entry.date) <= now).length
	const thisMonth = countEntriesInMonth(entries, now)
	const byGym = entriesByGym(entries, now)

	return (
		<Screen title="Statistiky" backHref="/profile" backLabel="Profil">
			<div className="flex flex-col gap-8 px-4 pb-8">
				<div className="grid grid-cols-2 gap-3">
					<div className="border bg-card p-4">
						<p className="eyebrow">Celkem</p>
						<p className="mt-2 text-h1 font-bold">{total}</p>
						<p className="text-sm text-muted-foreground">
							{plural(total, ENTRY_FORMS)}
						</p>
					</div>
					<div className="border bg-card p-4">
						<p className="eyebrow">Tento měsíc</p>
						<p className="mt-2 text-h1 font-bold">{thisMonth}</p>
						<p className="text-sm text-muted-foreground">
							{plural(thisMonth, ENTRY_FORMS)} {inMonth(now)}
						</p>
					</div>
				</div>

				<section aria-labelledby="by-month-title">
					<h2 id="by-month-title" className="text-h3 pb-4">
						Posledních 6 měsíců
					</h2>
					<MonthChart months={entriesByMonth(entries, now)} />
				</section>

				<section aria-labelledby="by-gym-title">
					<h2 id="by-gym-title" className="text-h3 pb-2">
						Podle poboček
					</h2>
					{byGym.length === 0 ? (
						<p className="text-muted-foreground">Zatím žádné vstupy.</p>
					) : (
						<ul className="border-t">
							{byGym.map(({ gymSlug, count }) => (
								<li key={gymSlug} className="border-b py-3">
									<div className="flex justify-between">
										<span>{getOpenGym(gymSlug).name}</span>
										<span className="font-bold">
											{count} {plural(count, ENTRY_FORMS)}
										</span>
									</div>
									<div className="mt-2 h-1.5 bg-muted" aria-hidden="true">
										<div
											className="h-full bg-foreground"
											style={{ width: `${(count / total) * 100}%` }}
										/>
									</div>
								</li>
							))}
						</ul>
					)}
				</section>
			</div>
		</Screen>
	)
}

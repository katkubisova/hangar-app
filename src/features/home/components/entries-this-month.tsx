"use client"

import { inMonth, plural } from "@/lib/czech"
import { countEntriesInMonth } from "@/lib/demo/entries"
import type { Entry } from "@/lib/types/entry"

// Statistics (by gym, by month) arrive in step 5 under Profil.
export function EntriesThisMonth({ entries }: { entries: Entry[] }) {
	const now = new Date()
	const count = countEntriesInMonth(entries, now)

	return (
		<div className="flex flex-col border bg-card p-4">
			<p className="eyebrow">Tento měsíc</p>
			<p className="mt-2 text-h3 font-bold tracking-heading">
				{count} {plural(count, ["vstup", "vstupy", "vstupů"])}
			</p>
			<p className="mt-auto pt-2 text-sm text-muted-foreground">
				{inMonth(now)}
			</p>
		</div>
	)
}

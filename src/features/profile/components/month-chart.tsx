"use client"

import { useState } from "react"

import type { MonthCount } from "@/lib/demo/stats"
import { cn } from "@/lib/utils"

// Entries per month as columns. One series, so one ink colour and no
// legend; tapping a column shows its value (the current month to start).
// Square ends, per the brand. A hidden table carries the same numbers.
export function MonthChart({ months }: { months: MonthCount[] }) {
	const [selected, setSelected] = useState(months.length - 1)
	const max = Math.max(1, ...months.map(month => month.count))

	return (
		<figure>
			<div className="flex h-40 items-end gap-2 border-b" aria-hidden="true">
				{months.map((month, index) => {
					const isSelected = index === selected
					return (
						<button
							key={month.key}
							type="button"
							tabIndex={-1}
							onClick={() => setSelected(index)}
							className="relative flex h-full flex-1 flex-col items-center justify-end"
						>
							{isSelected && (
								<span className="mb-1 text-sm font-bold">{month.count}</span>
							)}
							<span
								className={cn(
									"w-full max-w-6 transition-colors",
									isSelected ? "bg-electric-violet" : "bg-foreground"
								)}
								style={{
									height: `${Math.max(2, (month.count / max) * 100 - 14)}%`,
								}}
							/>
						</button>
					)
				})}
			</div>
			<div className="mt-2 flex gap-2" aria-hidden="true">
				{months.map((month, index) => (
					<span
						key={month.key}
						className={cn(
							"flex-1 text-center text-xs",
							index === selected
								? "font-bold text-foreground"
								: "text-muted-foreground"
						)}
					>
						{month.label}
					</span>
				))}
			</div>
			<table className="sr-only">
				<caption>Vstupy po měsících</caption>
				<tbody>
					{months.map(month => (
						<tr key={month.key}>
							<th scope="row">{month.label}</th>
							<td>{month.count}</td>
						</tr>
					))}
				</tbody>
			</table>
		</figure>
	)
}

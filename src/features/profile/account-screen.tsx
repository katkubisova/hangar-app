"use client"

import Link from "next/link"

import { Screen } from "@/components/shell/screen"
import { buttonVariants } from "@/components/ui/button"
import { getOpenGym } from "@/lib/data/gyms"
import { useDemoState } from "@/lib/demo/context"
import { cn, formatDate } from "@/lib/utils"

export function AccountScreen() {
	const { user, selectedGym } = useDemoState()

	if (!user) {
		return null
	}

	const rows: [string, string][] = [
		["Jméno", user.firstName],
		["Příjmení", user.lastName],
		["E-mail", user.email],
		["Telefon", user.phone],
		["Datum narození", user.birthDate ? formatDate(user.birthDate) : "–"],
		["Číslo člena", user.memberId],
		["Vybraná pobočka", getOpenGym(selectedGym).name],
	]

	return (
		<Screen
			title="Osobní údaje"
			backHref="/profile"
			backLabel="Profil"
			footer={
				<Link
					href="/profile/account/edit"
					className={cn(buttonVariants({ size: "lg" }))}
				>
					Upravit údaje
				</Link>
			}
		>
			<dl className="border-t">
				{rows.map(([label, value]) => (
					<div
						key={label}
						className="flex min-h-12 items-center justify-between gap-4 border-b px-4 py-2"
					>
						<dt className="text-muted-foreground">{label}</dt>
						<dd className="truncate text-right font-medium">{value}</dd>
					</div>
				))}
			</dl>
			<p className="px-4 pt-3 pb-6 text-sm text-muted-foreground">
				Pobočku změníš na Domů nebo v Produktech.
			</p>
		</Screen>
	)
}

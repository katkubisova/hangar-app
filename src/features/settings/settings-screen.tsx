"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { ListHeading, ListRow } from "@/components/shell/list-row"
import { Screen } from "@/components/shell/screen"
import { SystemAlert } from "@/components/shell/system-alert"
import { Switch } from "@/components/ui/switch"
import { SignOutRow } from "@/features/settings/sign-out-row"
import { getOpenGym } from "@/lib/data/gyms"
import { useDemo, useDemoState } from "@/lib/demo/context"
import type { NotificationPrefKey } from "@/lib/types/notification-prefs"

const PREFS: { key: NotificationPrefKey; label: string }[] = [
	{ key: "purchases", label: "Nákupy a platby" },
	{ key: "membership", label: "Konec členství a permanentky" },
	{ key: "payments", label: "Problémy s platbou" },
	{ key: "gymNews", label: "Novinky z poboček" },
	{ key: "appUpdates", label: "Aktualizace aplikace" },
]

export function SettingsScreen() {
	const { notificationPrefs, permissions, selectedGym } = useDemoState()
	const { setNotificationPref, setPermission } = useDemo()
	const router = useRouter()
	const [systemPrompt, setSystemPrompt] = useState<"none" | "ask" | "denied">(
		"none"
	)
	const gym = getOpenGym(selectedGym)
	const pushOff = permissions.push !== "granted"
	const supportHref = `/compose?${new URLSearchParams({ to: gym.email, subject: "Dotaz z aplikace" })}`

	return (
		<Screen title="Nastavení" backHref="/profile" backLabel="Profil">
			<ListHeading>Notifikace</ListHeading>
			{pushOff && (
				<div className="mx-4 mb-3 flex items-center justify-between gap-3 border-l-4 border-trinidad bg-card p-3">
					<p className="text-sm">Notifikace jsou v telefonu vypnuté.</p>
					<button
						type="button"
						onClick={() =>
							setSystemPrompt(permissions.push === "denied" ? "denied" : "ask")
						}
						className="link shrink-0 text-sm"
					>
						Zapnout
					</button>
				</div>
			)}
			<ul className="border-t">
				{PREFS.map(({ key, label }) => (
					<li
						key={key}
						className="flex min-h-13 items-center justify-between gap-3 border-b px-4 py-2"
					>
						<span className={pushOff ? "text-muted-foreground" : undefined}>
							{label}
						</span>
						<Switch
							aria-label={label}
							checked={notificationPrefs[key]}
							onCheckedChange={value => setNotificationPref(key, value)}
						/>
					</li>
				))}
			</ul>

			<ListHeading>Informace</ListHeading>
			<nav className="border-t">
				<ListRow href="/browser?doc=faq" label="Časté dotazy" />
				<ListRow href="/browser?doc=terms" label="Obchodní podmínky" />
				<ListRow href="/browser?doc=privacy" label="Ochrana osobních údajů" />
			</nav>

			<ListHeading>Podpora</ListHeading>
			<nav className="border-t">
				<ListRow
					href={supportHref}
					label="Kontaktovat podporu"
					description={gym.email}
				/>
				<ListRow href="/store?action=rate" label="Ohodnotit aplikaci" />
			</nav>

			<ListHeading>Účet</ListHeading>
			<nav className="border-t">
				<SignOutRow />
				<ListRow href="/profile/settings/delete-account" label="Smazat účet" />
			</nav>

			<ListHeading>Prezentace</ListHeading>
			<nav className="border-t pb-6">
				<ListRow href="/profile/settings/demo" label="Demo" />
			</nav>

			<SystemAlert
				open={systemPrompt === "ask"}
				title="„HANGAR“ vám chce posílat oznámení"
				message="Oznámení mohou obsahovat upozornění, zvuky a odznaky ikon. Můžete to změnit v Nastavení."
				actions={[
					{
						label: "Nepovolit",
						onPress: () => {
							setPermission("push", "denied")
							setSystemPrompt("none")
						},
					},
					{
						label: "Povolit",
						style: "cancel",
						onPress: () => {
							setPermission("push", "granted")
							setSystemPrompt("none")
						},
					},
				]}
			/>
			<SystemAlert
				open={systemPrompt === "denied"}
				title="Notifikace jsou zakázané"
				message="Zapni je v Nastavení telefonu → HANGAR → Oznámení."
				actions={[
					{ label: "Zrušit", onPress: () => setSystemPrompt("none") },
					{
						label: "Otevřít Nastavení",
						style: "cancel",
						onPress: () => {
							// Simulated: as if the user turned them on in the phone's settings.
							setPermission("push", "granted")
							setSystemPrompt("none")
							router.refresh()
						},
					},
				]}
			/>
		</Screen>
	)
}

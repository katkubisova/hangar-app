import { Screen } from "@/components/shell/screen"
import { ListLink } from "@/features/placeholder/list-link"
import { SignOutRow } from "@/features/settings/sign-out-row"

// Notification preferences, legal pages, FAQ, support and rating arrive
// in step 5. Account actions first, Demo always last.
export default function SettingsPage() {
	return (
		<Screen title="Nastavení" backHref="/profile" backLabel="Profil">
			<h2 className="eyebrow px-4 pb-2">Účet</h2>
			<nav className="border-t">
				<SignOutRow />
				<ListLink href="/profile/settings/delete-account" label="Smazat účet" />
			</nav>
			<h2 className="eyebrow px-4 pt-8 pb-2">Prezentace</h2>
			<nav className="border-t">
				<ListLink href="/profile/settings/demo" label="Demo" />
			</nav>
		</Screen>
	)
}

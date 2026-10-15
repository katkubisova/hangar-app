import { ListLink } from "@/features/placeholder/list-link"
import { PlaceholderScreen } from "@/features/placeholder/placeholder-screen"

export default function SettingsPage() {
	return (
		<PlaceholderScreen title="Nastavení" step={5} backHref="/profile">
			{/* Demo stays the last item once the real settings arrive. */}
			<nav className="border-t">
				<ListLink href="/profile/settings/demo" label="Demo" />
			</nav>
		</PlaceholderScreen>
	)
}

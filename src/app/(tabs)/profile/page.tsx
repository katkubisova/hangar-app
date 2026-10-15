import { ListLink } from "@/features/placeholder/list-link"
import { PlaceholderScreen } from "@/features/placeholder/placeholder-screen"

export default function ProfilePage() {
	return (
		<PlaceholderScreen title="Profil" step={5}>
			<nav className="border-t">
				<ListLink href="/profile/settings" label="Nastavení" />
			</nav>
		</PlaceholderScreen>
	)
}

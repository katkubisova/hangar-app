import { DemoPanel } from "@/components/demo/demo-panel"
import { Screen } from "@/components/shell/screen"

export default function DemoPage() {
	return (
		<Screen title="Demo" backHref="/profile/settings" backLabel="Nastavení">
			<p className="px-4 pb-6 text-muted-foreground">
				Ovládání prezentace. Není součástí navrhované aplikace.
			</p>
			<DemoPanel variant="in-app" />
		</Screen>
	)
}

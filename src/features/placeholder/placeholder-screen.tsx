import { EmptyState } from "@/components/shell/empty-state"
import { Screen } from "@/components/shell/screen"

interface PlaceholderScreenProps {
	title: string
	step: number
	backHref?: string
	children?: React.ReactNode
}

// A titled, empty screen for a part of the app built in a later step.
export function PlaceholderScreen({
	title,
	step,
	backHref,
	children,
}: PlaceholderScreenProps) {
	return (
		<Screen title={title} backHref={backHref}>
			{children}
			<EmptyState
				title="Připravujeme"
				text={`Tuto obrazovku doplníme v kroku ${step}.`}
			/>
		</Screen>
	)
}

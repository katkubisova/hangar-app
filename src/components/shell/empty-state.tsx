import {
	WallProfile,
	type WallProfileName,
} from "@/components/brand/wall-profile"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
	title: string
	text?: string
	profile?: WallProfileName
	action?: React.ReactNode
	className?: string
}

// Empty and "nothing here yet" states, decorated with a brand wall profile.
export function EmptyState({
	title,
	text,
	profile = "boomerang",
	action,
	className,
}: EmptyStateProps) {
	return (
		<div
			className={cn(
				"flex flex-col items-center px-8 py-10 text-center",
				className
			)}
		>
			<WallProfile profile={profile} className="w-40 text-muted" />
			<h2 className="mt-6 text-h3">{title}</h2>
			{text && <p className="mt-2 text-muted-foreground">{text}</p>}
			{action && <div className="mt-6 w-full">{action}</div>}
		</div>
	)
}

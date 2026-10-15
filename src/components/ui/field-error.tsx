import { ErrorCircleIcon } from "@/components/ui/icons"

import { cn } from "@/lib/utils"

// Form validation message. Trinidad is too light for small text on
// Alabaster (3.1:1), so the text stays Cod Gray and the colour goes on
// the icon only.
export function FieldError({
	id,
	children,
	className,
}: {
	id?: string
	children: React.ReactNode
	className?: string
}) {
	return (
		<p
			id={id}
			className={cn(
				"flex items-start gap-1.5 text-sm text-foreground",
				className
			)}
		>
			<ErrorCircleIcon
				aria-hidden="true"
				className="mt-0.5 size-4 shrink-0 text-trinidad"
			/>
			<span>{children}</span>
		</p>
	)
}

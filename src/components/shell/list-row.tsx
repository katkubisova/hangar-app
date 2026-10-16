import Link from "next/link"

import { ChevronRightIcon } from "@/components/ui/icons"

interface ListRowProps {
	href: string
	label: string
	// Secondary line under the label.
	description?: string
	// Short value on the right (e.g. "Ověřeno").
	value?: string
}

// One row of a settings-style list, tapping through to a screen.
export function ListRow({ href, label, description, value }: ListRowProps) {
	return (
		<Link
			href={href}
			className="flex min-h-13 items-center gap-3 border-b px-4 py-2.5 active:bg-muted"
		>
			<span className="min-w-0 flex-1">
				<span className="block text-base">{label}</span>
				{description && (
					<span className="block text-sm text-muted-foreground">
						{description}
					</span>
				)}
			</span>
			{value && (
				<span className="shrink-0 text-sm text-muted-foreground">{value}</span>
			)}
			<ChevronRightIcon
				className="size-5 shrink-0 text-muted-foreground"
				aria-hidden="true"
			/>
		</Link>
	)
}

// Small capital heading above a group of rows.
export function ListHeading({ children }: { children: React.ReactNode }) {
	return <h2 className="eyebrow px-4 pt-8 pb-2 first:pt-0">{children}</h2>
}

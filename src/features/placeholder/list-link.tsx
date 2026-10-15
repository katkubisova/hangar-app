import Link from "next/link"

import { ChevronRightIcon } from "@/components/ui/icons"

// One row of a settings-style list.
export function ListLink({ href, label }: { href: string; label: string }) {
	return (
		<Link
			href={href}
			className="flex h-13 items-center justify-between border-b px-4 text-base active:bg-muted"
		>
			{label}
			<ChevronRightIcon
				className="size-5 text-muted-foreground"
				aria-hidden="true"
			/>
		</Link>
	)
}

"use client"

import Link from "next/link"

import { ChevronLeftIcon } from "@/components/ui/icons"
import { cn } from "@/lib/utils"

interface ScreenProps {
	// Large capital title at the top of the content.
	title?: string
	// Back link in the header.
	backHref?: string
	backLabel?: string
	// Replaces the header's left side (e.g. the gym switcher on Domů).
	headerStart?: React.ReactNode
	headerEnd?: React.ReactNode
	// Pinned below the scroll area, e.g. a form's main button.
	footer?: React.ReactNode
	// Black surface (Vstup, Welcome).
	dark?: boolean
	children: React.ReactNode
	contentClassName?: string
}

// One app screen: a header that respects the safe area, then its own
// scroll area. The tab bar (when there is one) sits below it.
export function Screen({
	title,
	backHref,
	backLabel = "Zpět",
	headerStart,
	headerEnd,
	footer,
	dark = false,
	children,
	contentClassName,
}: ScreenProps) {
	const hasHeaderBar = backHref || headerStart || headerEnd

	return (
		<div
			className={cn(
				"flex min-h-0 flex-1 flex-col bg-background text-foreground duration-200 animate-in fade-in-0",
				dark && "dark"
			)}
		>
			<header className="shrink-0 pt-safe">
				{hasHeaderBar && (
					<div className="flex h-12 items-center justify-between gap-2 px-2">
						<div className="flex min-w-0 items-center">
							{backHref ? (
								<Link
									href={backHref}
									className="flex h-11 items-center gap-0.5 pr-3 text-base font-medium active:opacity-60"
								>
									<ChevronLeftIcon className="size-7" aria-hidden="true" />
									{backLabel}
								</Link>
							) : (
								headerStart
							)}
						</div>
						<div className="flex items-center">{headerEnd}</div>
					</div>
				)}
			</header>
			<main
				className={cn(
					"min-h-0 flex-1 overflow-y-auto overscroll-contain scrollbar-none",
					contentClassName
				)}
			>
				{title && (
					<h1
						className={cn("px-4 pb-5 text-h1", hasHeaderBar ? "pt-1" : "pt-4")}
					>
						{title}
					</h1>
				)}
				{children}
			</main>
			{footer && (
				// Above a tab bar the bar takes the safe area; see TabsLayout.
				<div className="flex shrink-0 flex-col gap-2 border-t bg-background px-4 pt-3 pb-[calc(var(--footer-safe,var(--safe-bottom))+0.75rem)]">
					{footer}
				</div>
			)}
		</div>
	)
}

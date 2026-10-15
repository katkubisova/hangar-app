"use client"

import { useEffect, useId, useRef } from "react"

import { Overlay } from "@/components/shell/overlay"
import { cn } from "@/lib/utils"

interface BottomSheetProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	title: string
	children: React.ReactNode
	className?: string
}

// Native-style bottom sheet. Square corners like the rest of the brand UI;
// the grab handle tells it apart from a page.
export function BottomSheet({
	open,
	onOpenChange,
	title,
	children,
	className,
}: BottomSheetProps) {
	const titleId = useId()
	const panelRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!open) {
			return
		}
		panelRef.current?.focus()
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onOpenChange(false)
			}
		}
		window.addEventListener("keydown", onKeyDown)
		return () => window.removeEventListener("keydown", onKeyDown)
	}, [open, onOpenChange])

	if (!open) {
		return null
	}

	return (
		<Overlay>
			<div className="absolute inset-0 flex flex-col justify-end">
				<button
					type="button"
					aria-label="Zavřít"
					className="absolute inset-0 bg-cod-gray/40 duration-200 animate-in fade-in-0"
					onClick={() => onOpenChange(false)}
				/>
				<div
					ref={panelRef}
					role="dialog"
					aria-modal="true"
					aria-labelledby={titleId}
					tabIndex={-1}
					className={cn(
						"relative max-h-[85%] overflow-y-auto overscroll-contain bg-background pb-safe outline-none duration-300 animate-in slide-in-from-bottom",
						className
					)}
				>
					<div className="flex justify-center pt-2">
						<span aria-hidden="true" className="h-1 w-9 bg-input" />
					</div>
					<h2 id={titleId} className="px-4 pt-3 pb-2 text-h3">
						{title}
					</h2>
					<div className="pb-4">{children}</div>
				</div>
			</div>
		</Overlay>
	)
}

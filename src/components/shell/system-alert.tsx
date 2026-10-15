"use client"

import { useId } from "react"

import { Overlay } from "@/components/shell/overlay"
import { SimulatedTag } from "@/components/shell/simulated-tag"
import { cn } from "@/lib/utils"

export interface SystemAlertAction {
	label: string
	style?: "default" | "cancel" | "destructive"
	onPress: () => void
}

interface SystemAlertProps {
	open: boolean
	title: string
	message?: string
	actions: SystemAlertAction[]
}

// Simulated iOS system alert (permission pop-ups, confirmations). It
// copies the phone's own look on purpose: rounded corners, system font
// and system blue, so it reads as the operating system, not Hangar UI.
export function SystemAlert({
	open,
	title,
	message,
	actions,
}: SystemAlertProps) {
	const titleId = useId()

	if (!open) {
		return null
	}

	return (
		<Overlay>
			<div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-cod-gray/40 font-system duration-150 animate-in fade-in-0">
				<div
					role="alertdialog"
					aria-modal="true"
					aria-labelledby={titleId}
					className="w-[270px] overflow-hidden rounded-[14px] bg-[#f2f2f2]/95 text-center text-black backdrop-blur-xl duration-200 animate-in zoom-in-110"
				>
					<div className="px-4 pt-5 pb-4">
						<p id={titleId} className="text-[17px] leading-snug font-semibold">
							{title}
						</p>
						{message && (
							<p className="mt-1 text-[13px] leading-snug">{message}</p>
						)}
					</div>
					<div
						className={cn(
							"grid border-t border-black/15",
							actions.length === 2 ? "grid-cols-2" : "grid-cols-1"
						)}
					>
						{actions.map((action, index) => (
							<button
								key={action.label}
								type="button"
								onClick={action.onPress}
								className={cn(
									"h-11 text-[17px] text-[#007aff] active:bg-black/10",
									index > 0 &&
										(actions.length === 2
											? "border-l border-black/15"
											: "border-t border-black/15"),
									action.style === "cancel" && "font-semibold",
									action.style === "destructive" && "text-[#ff3b30]"
								)}
							>
								{action.label}
							</button>
						))}
					</div>
				</div>
				<SimulatedTag className="text-alabaster" />
			</div>
		</Overlay>
	)
}

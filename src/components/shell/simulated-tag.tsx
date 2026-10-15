import { cn } from "@/lib/utils"

// Marks simulated native UI (system alerts, push, store, mail) so the
// client doesn't read it as something we're building.
export function SimulatedTag({ className }: { className?: string }) {
	return (
		<span
			className={cn(
				"inline-block border border-current px-1 font-sans text-[10px] leading-4 font-medium tracking-eyebrow uppercase opacity-60",
				className
			)}
		>
			Simulace
		</span>
	)
}

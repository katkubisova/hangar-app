import { LoadingIcon } from "@/components/ui/icons"
import { cn } from "@/lib/utils"

function Spinner({ className }: { className?: string }) {
	return (
		<LoadingIcon
			role="status"
			aria-label="Načítání"
			className={cn("size-4 animate-spin", className)}
		/>
	)
}

export { Spinner }

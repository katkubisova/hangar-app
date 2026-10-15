import { Input as InputPrimitive } from "@base-ui/react/input"
import type * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
	return (
		<InputPrimitive
			type={type}
			data-slot="input"
			className={cn(
				"h-11 py-2 file:mr-3 file:inline-flex file:h-7 file:border-0 file:bg-secondary file:px-3 file:text-sm file:font-medium file:text-foreground w-full min-w-0 border border-input bg-card px-3 text-base text-foreground transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid placeholder:text-muted-foreground hover:border-foreground/40 focus-visible:border-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
				className
			)}
			{...props}
		/>
	)
}

export { Input }

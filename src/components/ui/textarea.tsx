import type * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				"flex field-sizing-content min-h-28 py-3 w-full min-w-0 border border-input bg-card px-3 text-base text-foreground transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid placeholder:text-muted-foreground hover:border-foreground/40 focus-visible:border-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
				className
			)}
			{...props}
		/>
	)
}

export { Textarea }

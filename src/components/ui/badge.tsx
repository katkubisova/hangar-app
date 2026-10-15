import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
	"group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border border-transparent px-2 text-[0.6875rem] font-medium tracking-eyebrow whitespace-nowrap uppercase [&>svg]:pointer-events-none [&>svg]:size-3!",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground",
				secondary: "bg-secondary text-secondary-foreground",
				signal: "bg-electric-violet text-alabaster",
				destructive: "border-destructive text-foreground",
				outline: "border-foreground text-foreground",
				ghost: "text-muted-foreground",
				link: "text-link",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
)

function Badge({
	className,
	variant = "default",
	render,
	...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
	return useRender({
		defaultTagName: "span",
		props: mergeProps<"span">(
			{
				className: cn(badgeVariants({ variant }), className),
			},
			props
		),
		render,
		state: {
			slot: "badge",
			variant,
		},
	})
}

export { Badge, badgeVariants }

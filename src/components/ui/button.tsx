"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
	"group/button inline-flex shrink-0 items-center justify-center gap-2 border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid select-none disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground hover:bg-electric-violet hover:text-alabaster active:bg-electric-violet active:text-alabaster aria-expanded:bg-electric-violet dark:hover:bg-violet-light dark:hover:text-cod-gray dark:active:bg-violet-light dark:active:text-cod-gray",
				outline:
					"border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background active:bg-foreground active:text-background aria-expanded:bg-foreground aria-expanded:text-background",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-border active:bg-border aria-expanded:bg-border",
				ghost:
					"text-foreground hover:bg-muted active:bg-muted aria-expanded:bg-muted",
				destructive:
					"border-destructive bg-transparent text-foreground hover:bg-destructive hover:text-cod-gray active:bg-destructive active:text-cod-gray",
				link: "h-auto px-0 text-link hover:text-foreground active:text-foreground",
			},
			size: {
				default: "h-10 px-4 text-sm",
				xs: "h-7 gap-1 px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
				sm: "h-8 gap-1.5 px-3 text-sm [&_svg:not([class*='size-'])]:size-3.5",
				lg: "h-13 px-6 text-base [&_svg:not([class*='size-'])]:size-5",
				icon: "size-10",
				"icon-xs": "size-7 [&_svg:not([class*='size-'])]:size-3",
				"icon-sm": "size-8",
				"icon-lg": "size-12 [&_svg:not([class*='size-'])]:size-5",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
)

function Button({
	className,
	variant = "default",
	size = "default",
	...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
	return (
		<ButtonPrimitive
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	)
}

export { Button, buttonVariants }

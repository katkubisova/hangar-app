"use client"

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { ChevronDownIcon } from "@/components/ui/icons"
import { cn } from "@/lib/utils"

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
	return (
		<AccordionPrimitive.Root
			data-slot="accordion"
			className={cn("flex w-full flex-col", className)}
			{...props}
		/>
	)
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
	return (
		<AccordionPrimitive.Item
			data-slot="accordion-item"
			className={cn("border-b border-border first:border-t", className)}
			{...props}
		/>
	)
}

function AccordionTrigger({
	className,
	children,
	...props
}: AccordionPrimitive.Trigger.Props) {
	return (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				className={cn(
					"group/accordion-trigger relative flex flex-1 items-center justify-between gap-4 py-4 text-left text-base font-medium transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid hover:text-link aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-5",
					className
				)}
				{...props}
			>
				{children}
				<ChevronDownIcon
					aria-hidden="true"
					data-slot="accordion-trigger-icon"
					className="pointer-events-none shrink-0 transition-transform group-aria-expanded/accordion-trigger:rotate-180"
				/>
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	)
}

function AccordionContent({
	className,
	children,
	...props
}: AccordionPrimitive.Panel.Props) {
	return (
		<AccordionPrimitive.Panel
			data-slot="accordion-content"
			className="overflow-hidden text-base data-open:animate-accordion-down data-closed:animate-accordion-up"
			{...props}
		>
			<div
				className={cn(
					"h-(--accordion-panel-height) pt-0 pb-5 text-muted-foreground data-ending-style:h-0 data-starting-style:h-0 [&_a]:font-medium [&_a]:text-link [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
					className
				)}
			>
				{children}
			</div>
		</AccordionPrimitive.Panel>
	)
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }

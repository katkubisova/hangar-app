"use client"

import { useId } from "react"

import { cn } from "@/lib/utils"

interface SegmentedControlProps<T extends string> {
	label: string
	options: { value: T; label: string }[]
	value: T
	onChange: (value: T) => void
	className?: string
}

// Native-style segmented control: square, the selected segment in black.
// Built on real radio inputs, so keyboard and screen readers work as-is.
export function SegmentedControl<T extends string>({
	label,
	options,
	value,
	onChange,
	className,
}: SegmentedControlProps<T>) {
	const name = useId()

	return (
		<fieldset
			className={cn(
				"grid auto-cols-fr grid-flow-col border border-foreground",
				className
			)}
		>
			<legend className="sr-only">{label}</legend>
			{options.map(option => (
				<label key={option.value} className="relative">
					<input
						type="radio"
						name={name}
						value={option.value}
						checked={option.value === value}
						onChange={() => onChange(option.value)}
						className="peer sr-only"
					/>
					<span className="flex h-10 cursor-pointer items-center justify-center text-base font-medium transition-colors peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring active:bg-muted peer-checked:active:bg-primary">
						{option.label}
					</span>
				</label>
			))}
		</fieldset>
	)
}

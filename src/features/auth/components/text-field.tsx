"use client"

import { useId, useState } from "react"

import { FieldError } from "@/components/ui/field-error"
import { BrowseIcon, BrowseOffIcon } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface TextFieldProps
	extends Omit<React.ComponentProps<"input">, "onChange" | "value"> {
	label: string
	value: string
	onValueChange: (value: string) => void
	error?: string
	hint?: string
}

// Labelled input with an inline error underneath. type="password" gets a
// show/hide toggle, as in native apps.
export function TextField({
	label,
	value,
	onValueChange,
	error,
	hint,
	type = "text",
	className,
	...props
}: TextFieldProps) {
	const id = useId()
	const [showPassword, setShowPassword] = useState(false)
	const isPassword = type === "password"
	const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined

	return (
		<div className={cn("flex flex-col gap-1.5", className)}>
			<label htmlFor={id} className="text-sm font-medium">
				{label}
			</label>
			<div className="relative">
				<Input
					id={id}
					type={isPassword && showPassword ? "text" : type}
					value={value}
					onChange={event => onValueChange(event.target.value)}
					aria-invalid={error ? true : undefined}
					aria-describedby={describedBy}
					className={cn(
						"h-12",
						isPassword && "pr-12",
						type === "date" &&
							"appearance-none [&::-webkit-date-and-time-value]:text-left"
					)}
					{...props}
				/>
				{isPassword && (
					<button
						type="button"
						onClick={() => setShowPassword(current => !current)}
						aria-label={showPassword ? "Skrýt heslo" : "Zobrazit heslo"}
						className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-muted-foreground active:text-foreground"
					>
						{showPassword ? (
							<BrowseOffIcon className="size-5" aria-hidden="true" />
						) : (
							<BrowseIcon className="size-5" aria-hidden="true" />
						)}
					</button>
				)}
			</div>
			{error ? (
				<FieldError id={`${id}-error`}>{error}</FieldError>
			) : (
				hint && (
					<p id={`${id}-hint`} className="text-sm text-muted-foreground">
						{hint}
					</p>
				)
			)}
		</div>
	)
}

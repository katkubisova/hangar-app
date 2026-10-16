"use client"

import { useId } from "react"

import { TextField } from "@/components/form/text-field"
import { BottomSheet } from "@/components/shell/bottom-sheet"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useForm } from "@/hooks/use-form"
import { useDemo } from "@/lib/demo/context"
import {
	validateCardCvc,
	validateCardExpiry,
	validateCardNumber,
} from "@/lib/form/validation"

interface AddCardSheetProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	onAdded?: (cardId: string) => void
}

// "1234567812345678" → "1234 5678 1234 5678", as card fields show it.
function formatCardNumber(value: string) {
	return value
		.replace(/\D/g, "")
		.slice(0, 16)
		.replace(/(\d{4})(?=\d)/g, "$1 ")
}

function formatExpiry(value: string) {
	const digits = value.replace(/\D/g, "").slice(0, 4)
	return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
}

// Simulated card form. Nothing leaves the browser: only the brand and the
// last 4 digits are kept in the demo data.
export function AddCardSheet({
	open,
	onOpenChange,
	onAdded,
}: AddCardSheetProps) {
	const { addPaymentCard } = useDemo()
	const formId = useId()
	const defaultId = useId()
	const form = useForm(
		{ number: "", expiry: "", cvc: "", makeDefault: false as boolean },
		values => ({
			number: validateCardNumber(values.number),
			expiry: validateCardExpiry(values.expiry),
			cvc: validateCardCvc(values.cvc),
		})
	)

	return (
		<BottomSheet open={open} onOpenChange={onOpenChange} title="Přidat kartu">
			<form
				id={formId}
				noValidate
				onSubmit={form.handleSubmit(values => {
					const cardId = addPaymentCard(values)
					onOpenChange(false)
					onAdded?.(cardId)
				})}
				className="flex flex-col gap-4 px-4"
			>
				<TextField
					label="Číslo karty"
					inputMode="numeric"
					autoComplete="cc-number"
					placeholder="1234 5678 9012 3456"
					value={form.values.number}
					onValueChange={value =>
						form.setValue("number", formatCardNumber(value))
					}
					onBlur={() => form.blur("number")}
					error={form.visibleError("number")}
				/>
				<div className="grid grid-cols-2 gap-3">
					<TextField
						label="Platnost"
						inputMode="numeric"
						autoComplete="cc-exp"
						placeholder="MM/RR"
						value={form.values.expiry}
						onValueChange={value =>
							form.setValue("expiry", formatExpiry(value))
						}
						onBlur={() => form.blur("expiry")}
						error={form.visibleError("expiry")}
					/>
					<TextField
						label="CVC"
						inputMode="numeric"
						autoComplete="cc-csc"
						placeholder="123"
						value={form.values.cvc}
						onValueChange={value =>
							form.setValue("cvc", value.replace(/\D/g, "").slice(0, 3))
						}
						onBlur={() => form.blur("cvc")}
						error={form.visibleError("cvc")}
					/>
				</div>
				<div className="flex items-center gap-3">
					<Checkbox
						id={defaultId}
						checked={form.values.makeDefault}
						onCheckedChange={checked => form.setValue("makeDefault", checked)}
					/>
					<label htmlFor={defaultId}>Nastavit jako výchozí kartu</label>
				</div>
				<Button type="submit" size="lg" className="mt-1">
					Uložit kartu
				</Button>
				<p className="text-center text-xs text-muted-foreground">
					Prototyp: číslo karty se nikam neodesílá.
				</p>
			</form>
		</BottomSheet>
	)
}

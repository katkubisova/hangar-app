"use client"

import Link from "next/link"
import { useState } from "react"

import { TextField } from "@/components/form/text-field"
import { Screen } from "@/components/shell/screen"
import { SimulatedTag } from "@/components/shell/simulated-tag"
import { Button, buttonVariants } from "@/components/ui/button"
import { CheckIcon } from "@/components/ui/icons"
import { Spinner } from "@/components/ui/spinner"
import { DISCOUNT_CARD_INFO } from "@/lib/data/discount-card-info"
import { useDemo, useDemoState } from "@/lib/demo/context"
import {
	validateIsicNumber,
	validateMultisportNumber,
} from "@/lib/form/validation"
import type { DiscountCardType } from "@/lib/types/discount-card"
import { cn, formatDate } from "@/lib/utils"

const VALIDATING_MS = 1200

// Add and validate a MultiSport or ISIC card. Validation is simulated:
// any well-formed number passes after a short wait.
export function DiscountCardScreen({ type }: { type: DiscountCardType }) {
	const { discountCards } = useDemoState()
	const { addDiscountCard, removeDiscountCard } = useDemo()
	const info = DISCOUNT_CARD_INFO[type]
	const card = discountCards.find(item => item.type === type)
	const [number, setNumber] = useState("")
	const [touched, setTouched] = useState(false)
	const [validating, setValidating] = useState(false)
	const error = touched
		? (type === "isic" ? validateIsicNumber : validateMultisportNumber)(number)
		: undefined

	function validate(event: React.FormEvent) {
		event.preventDefault()
		setTouched(true)
		const invalid = (
			type === "isic" ? validateIsicNumber : validateMultisportNumber
		)(number)
		if (invalid) {
			return
		}
		setValidating(true)
		window.setTimeout(() => {
			addDiscountCard(type, number)
			setValidating(false)
		}, VALIDATING_MS)
	}

	return (
		<Screen title={info.name} backHref="/profile/discounts" backLabel="Slevy">
			<div className="flex flex-col gap-6 px-4 pb-6">
				<p>{info.benefit}</p>
				{card ? (
					<>
						<div className="border bg-card p-4">
							<p className="flex items-center gap-2 font-medium">
								<CheckIcon className="size-5 text-orient" aria-hidden="true" />
								Karta je ověřená
							</p>
							<p className="mt-2 text-sm text-muted-foreground">
								Číslo {card.cardNumber} · ověřeno {formatDate(card.validatedAt)}
							</p>
						</div>
						{type === "isic" && (
							<Link
								href="/products"
								className={cn(buttonVariants({ size: "lg" }))}
							>
								Na studentské ceny
							</Link>
						)}
						<Button
							variant="destructive"
							size="lg"
							onClick={() => removeDiscountCard(type)}
						>
							Odebrat kartu
						</Button>
					</>
				) : (
					<form noValidate onSubmit={validate} className="flex flex-col gap-4">
						<TextField
							label={`Číslo karty ${info.name}`}
							inputMode={info.inputMode}
							autoCapitalize="characters"
							placeholder={info.placeholder}
							value={number}
							onValueChange={setNumber}
							onBlur={() => setTouched(true)}
							error={error}
						/>
						<Button type="submit" size="lg" disabled={validating}>
							{validating ? (
								<>
									<Spinner />
									Ověřujeme…
								</>
							) : (
								"Ověřit kartu"
							)}
						</Button>
						<p className="flex items-center gap-2 text-xs text-muted-foreground">
							<SimulatedTag />
							Ověření probíhá jen naoko.
						</p>
					</form>
				)}
			</div>
		</Screen>
	)
}

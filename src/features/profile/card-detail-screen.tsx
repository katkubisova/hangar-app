"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { TextField } from "@/components/form/text-field"
import { Screen } from "@/components/shell/screen"
import { SystemAlert } from "@/components/shell/system-alert"
import { Button } from "@/components/ui/button"
import { cardLabel } from "@/features/products/product-text"
import { useDemo, useDemoState } from "@/lib/demo/context"
import { validateCardExpiry } from "@/lib/form/validation"

// View and edit a saved card: default, expiry (e.g. after the bank sends
// a renewed card with the same number) and removal.
export function CardDetailScreen({ cardId }: { cardId: string }) {
	const { paymentCards } = useDemoState()
	const { setDefaultCard, updateCardExpiry, removeCard } = useDemo()
	const router = useRouter()
	const card = paymentCards.find(item => item.id === cardId)
	const [expiry, setExpiry] = useState(card?.expiry ?? "")
	const [expiryTouched, setExpiryTouched] = useState(false)
	const [confirmRemove, setConfirmRemove] = useState(false)

	if (!card) {
		return (
			<Screen title="Karta" backHref="/profile/cards" backLabel="Karty">
				<p className="px-4 text-muted-foreground">
					Tahle karta už není uložená.
				</p>
			</Screen>
		)
	}

	const expiryError = expiryTouched ? validateCardExpiry(expiry) : undefined

	return (
		<Screen
			title={cardLabel(card)}
			backHref="/profile/cards"
			backLabel="Karty"
			footer={
				<Button
					variant="destructive"
					size="lg"
					onClick={() => setConfirmRemove(true)}
				>
					Odebrat kartu
				</Button>
			}
		>
			<div className="flex flex-col gap-6 px-4 pb-6">
				{card.isDefault ? (
					<p className="border-l-4 border-electric-violet bg-card p-3 text-sm">
						Tohle je tvoje výchozí karta. Předvybereme ji při každé platbě.
					</p>
				) : (
					<Button
						variant="outline"
						size="lg"
						onClick={() => setDefaultCard(card.id)}
					>
						Nastavit jako výchozí
					</Button>
				)}
				<form
					noValidate
					onSubmit={event => {
						event.preventDefault()
						setExpiryTouched(true)
						if (!validateCardExpiry(expiry)) {
							updateCardExpiry(card.id, expiry)
						}
					}}
					className="flex flex-col gap-3"
				>
					<TextField
						label="Platnost"
						inputMode="numeric"
						placeholder="MM/RR"
						value={expiry}
						onValueChange={value => {
							const digits = value.replace(/\D/g, "").slice(0, 4)
							setExpiry(
								digits.length > 2
									? `${digits.slice(0, 2)}/${digits.slice(2)}`
									: digits
							)
						}}
						onBlur={() => setExpiryTouched(true)}
						error={expiryError}
						hint={expiry === card.expiry ? undefined : "Neuloženo"}
					/>
					<Button
						type="submit"
						variant="secondary"
						size="lg"
						disabled={expiry === card.expiry}
					>
						Uložit platnost
					</Button>
				</form>
			</div>

			<SystemAlert
				open={confirmRemove}
				title="Odebrat kartu?"
				message={`${cardLabel(card)} už nebude k dispozici pro platby.`}
				actions={[
					{
						label: "Zrušit",
						style: "cancel",
						onPress: () => setConfirmRemove(false),
					},
					{
						label: "Odebrat",
						style: "destructive",
						onPress: () => {
							removeCard(card.id)
							router.replace("/profile/cards")
						},
					},
				]}
			/>
		</Screen>
	)
}

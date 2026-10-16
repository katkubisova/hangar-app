"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

import { Screen } from "@/components/shell/screen"
import { Button } from "@/components/ui/button"
import { CheckIcon } from "@/components/ui/icons"
import { Spinner } from "@/components/ui/spinner"
import { AddCardSheet } from "@/features/products/components/add-card-sheet"
import { cardLabel } from "@/features/products/product-text"
import { getOpenGym } from "@/lib/data/gyms"
import { productHref } from "@/lib/data/product-families"
import { products } from "@/lib/data/products"
import { useDemo, useDemoState } from "@/lib/demo/context"
import { withDetails } from "@/lib/demo/owned-products"
import { cn, formatDate, formatPrice } from "@/lib/utils"

const PROCESSING_MS = 1500

// Payment: order summary, saved card or a new one, pay. Apple Pay and
// Google Pay stay hidden until the client confirms them.
export function CheckoutScreen() {
	const params = useSearchParams()
	const productId = params.get("product") ?? ""
	const product = products.find(item => item.id === productId)
	const state = useDemoState()
	const { purchase } = useDemo()
	const router = useRouter()
	const defaultCard =
		state.paymentCards.find(card => card.isDefault) ?? state.paymentCards[0]
	const [cardId, setCardId] = useState(defaultCard?.id ?? "")
	const [addCardOpen, setAddCardOpen] = useState(false)
	const [processing, setProcessing] = useState(false)

	if (!product) {
		return (
			<Screen title="Platba" backHref="/products">
				<p className="px-4 text-muted-foreground">Produkt jsme nenašli.</p>
			</Screen>
		)
	}

	const now = new Date()
	const running =
		product.type === "membership"
			? state.ownedProducts
					.map(item => withDetails(item, now))
					.find(
						item =>
							item.status === "active" &&
							item.product.type === "membership" &&
							item.product.gymSlug === product.gymSlug
					)
			: undefined
	const hasIsic = state.discountCards.some(card => card.type === "isic")

	function pay() {
		setProcessing(true)
		window.setTimeout(() => {
			const result = purchase(productId, cardId)
			router.replace(
				result.ok
					? `/checkout/done?owned=${result.ownedId}`
					: `/checkout/failed?product=${productId}`
			)
		}, PROCESSING_MS)
	}

	return (
		<Screen
			title="Platba"
			backHref={productHref(productId)}
			footer={
				<>
					<Button size="lg" onClick={pay} disabled={!cardId || processing}>
						{processing ? (
							<>
								<Spinner />
								Ověřujeme platbu…
							</>
						) : (
							`Zaplatit ${formatPrice(product.price)}`
						)}
					</Button>
					<p className="py-1 text-center text-xs text-muted-foreground">
						Zaplacením souhlasíš s obchodními podmínkami.
						{product.type === "membership" &&
							" Členství se automaticky obnovuje."}
					</p>
				</>
			}
		>
			<div className="flex flex-col gap-8 px-4 pb-6">
				<section aria-label="Shrnutí objednávky" className="border bg-card p-4">
					<p className="eyebrow">{getOpenGym(product.gymSlug).name}</p>
					<p className="mt-1 text-h3 font-bold tracking-heading">
						{product.name}
					</p>
					<p className="text-muted-foreground">{product.variant}</p>
					<p className="mt-3 text-sm">
						{product.type === "membership"
							? running
								? `Začne platit ${formatDate(running.validUntil)}, až skončí tvoje současné členství. To se pak už neobnoví.`
								: "Platí od dnes, pak se automaticky obnoví."
							: "Platí 1 rok od zaplacení."}
					</p>
					{product.audience === "student" && hasIsic && (
						<p className="mt-3 flex items-center gap-2 text-sm font-medium">
							<CheckIcon className="size-4 text-orient" aria-hidden="true" />
							Studentská cena, ISIC ověřen
						</p>
					)}
					<div className="mt-4 flex items-baseline justify-between border-t pt-3">
						<span>Celkem</span>
						<span className="text-h3 font-bold">
							{formatPrice(product.price)}
						</span>
					</div>
				</section>

				<fieldset>
					<legend className="eyebrow pb-2">Platební karta</legend>
					<div className="flex flex-col gap-2">
						{state.paymentCards.map(card => {
							const selected = card.id === cardId
							return (
								<label
									key={card.id}
									className={cn(
										"flex min-h-14 cursor-pointer items-center justify-between gap-3 border bg-card px-4 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring",
										selected
											? "border-foreground outline outline-foreground"
											: "active:bg-muted"
									)}
								>
									<input
										type="radio"
										name="card"
										value={card.id}
										checked={selected}
										onChange={() => setCardId(card.id)}
										className="sr-only"
									/>
									<span>
										<span className="block font-medium">{cardLabel(card)}</span>
										<span className="block text-sm text-muted-foreground">
											Platnost {card.expiry}
											{card.isDefault && " · výchozí"}
										</span>
									</span>
									{selected && (
										<CheckIcon className="size-5" aria-hidden="true" />
									)}
								</label>
							)
						})}
						<Button
							variant="outline"
							size="lg"
							onClick={() => setAddCardOpen(true)}
						>
							Přidat novou kartu
						</Button>
					</div>
				</fieldset>
			</div>

			<AddCardSheet
				open={addCardOpen}
				onOpenChange={setAddCardOpen}
				onAdded={setCardId}
			/>
		</Screen>
	)
}

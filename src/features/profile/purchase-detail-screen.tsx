"use client"

import Link from "next/link"

import { Screen } from "@/components/shell/screen"
import { buttonVariants } from "@/components/ui/button"
import { cardLabel } from "@/features/products/product-text"
import { getOpenGym } from "@/lib/data/gyms"
import { productHref } from "@/lib/data/product-families"
import { getProduct } from "@/lib/data/products"
import { useDemoState } from "@/lib/demo/context"
import { cn, formatDate, formatPrice } from "@/lib/utils"

// A stable, made-up receipt number derived from the purchase id.
function receiptNumber(id: string) {
	let hash = 7
	for (const char of id) {
		hash = (hash * 31 + char.charCodeAt(0)) % 100_000_000
	}
	return `2026${String(hash).padStart(8, "0")}`
}

export function PurchaseDetailScreen({ purchaseId }: { purchaseId: string }) {
	const { purchases, paymentCards } = useDemoState()
	const purchase = purchases.find(item => item.id === purchaseId)

	if (!purchase) {
		return (
			<Screen title="Nákup" backHref="/profile/purchases" backLabel="Historie">
				<p className="px-4 text-muted-foreground">Tenhle nákup jsme nenašli.</p>
			</Screen>
		)
	}

	const product = getProduct(purchase.productId)
	const card = paymentCards.find(item => item.id === purchase.paymentCardId)
	const rows: [string, string][] = [
		["Produkt", `${product.name} · ${product.variant}`],
		["Pobočka", getOpenGym(product.gymSlug).name],
		["Datum", formatDate(purchase.date)],
		["Zaplaceno", formatPrice(purchase.amount)],
		// A card removed since then is shown generically.
		["Platební karta", card ? cardLabel(card) : "Odebraná karta"],
		["Číslo dokladu", receiptNumber(purchase.id)],
	]

	return (
		<Screen
			title="Nákup"
			backHref="/profile/purchases"
			backLabel="Historie"
			footer={
				<Link
					href={productHref(product.id)}
					className={cn(buttonVariants({ size: "lg" }))}
				>
					Koupit znovu
				</Link>
			}
		>
			<dl className="border-t">
				{rows.map(([label, value]) => (
					<div
						key={label}
						className="flex min-h-12 items-center justify-between gap-4 border-b px-4 py-2"
					>
						<dt className="shrink-0 text-muted-foreground">{label}</dt>
						<dd className="text-right font-medium">{value}</dd>
					</div>
				))}
			</dl>
			<p className="px-4 pt-3 pb-6 text-sm text-muted-foreground">
				Doklad jsme ti poslali e-mailem při nákupu.
			</p>
		</Screen>
	)
}

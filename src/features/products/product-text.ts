import { plural } from "@/lib/czech"
import type { OwnedProductWithDetails } from "@/lib/demo/owned-products"
import type { PaymentCard } from "@/lib/types/payment-card"
import { formatDate } from "@/lib/utils"

// One-line status of an owned product, for lists and detail headers.
export function ownedStatusText(item: OwnedProductWithDetails) {
	if (item.status === "upcoming") {
		return `Začíná ${formatDate(item.validFrom)}`
	}
	if (item.status === "expired") {
		return item.product.type === "package" && (item.entriesLeft ?? 0) === 0
			? "Vyčerpáno"
			: `Vypršelo ${formatDate(item.validUntil)}`
	}
	if (item.product.type === "package") {
		const left = item.entriesLeft ?? 0
		return `Zbývá ${left} ${plural(left, ["vstup", "vstupy", "vstupů"])} · do ${formatDate(item.validUntil)}`
	}
	return `Platí do ${formatDate(item.validUntil)}`
}

const BRAND_LABEL: Record<PaymentCard["brand"], string> = {
	visa: "Visa",
	mastercard: "Mastercard",
}

export function cardLabel(card: PaymentCard) {
	return `${BRAND_LABEL[card.brand]} •••• ${card.last4}`
}

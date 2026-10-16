import { notFound } from "next/navigation"

import { DiscountCardScreen } from "@/features/discounts/discount-card-screen"
import type { DiscountCardType } from "@/lib/types/discount-card"

const TYPES: DiscountCardType[] = ["isic", "multisport"]

export default async function DiscountCardPage({
	params,
}: {
	params: Promise<{ cardType: string }>
}) {
	const { cardType } = await params
	const type = TYPES.find(item => item === cardType)
	if (!type) {
		notFound()
	}
	return <DiscountCardScreen type={type} />
}

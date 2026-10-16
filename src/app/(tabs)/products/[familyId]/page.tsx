import { notFound } from "next/navigation"

import { ProductDetailScreen } from "@/features/products/product-detail-screen"
import { getProductFamily } from "@/lib/data/product-families"

export default async function ProductDetailPage({
	params,
	searchParams,
}: {
	params: Promise<{ familyId: string }>
	searchParams: Promise<{ variant?: string }>
}) {
	const { familyId } = await params
	const { variant } = await searchParams
	const family = getProductFamily(familyId)
	if (!family) {
		notFound()
	}
	return <ProductDetailScreen family={family} initialProductId={variant} />
}

"use client"

import { useRouter } from "next/navigation"

import { SegmentedControl } from "@/components/shell/segmented-control"

type ProductsTab = "buy" | "mine"

const TAB_HREF: Record<ProductsTab, string> = {
	buy: "/products",
	mine: "/products/mine",
}

// Koupit / Moje produkty. Two routes, so notifications can deep-link to
// Moje produkty.
export function ProductsTabs({ current }: { current: ProductsTab }) {
	const router = useRouter()

	return (
		<SegmentedControl
			label="Produkty"
			className="mx-4"
			options={[
				{ value: "buy", label: "Koupit" },
				{ value: "mine", label: "Moje produkty" },
			]}
			value={current}
			onChange={value => router.replace(TAB_HREF[value])}
		/>
	)
}

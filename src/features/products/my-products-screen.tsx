"use client"

import Link from "next/link"
import { useState } from "react"

import { EmptyState } from "@/components/shell/empty-state"
import { Screen } from "@/components/shell/screen"
import { SegmentedControl } from "@/components/shell/segmented-control"
import { buttonVariants } from "@/components/ui/button"
import { ChevronRightIcon } from "@/components/ui/icons"
import { ProductsTabs } from "@/features/products/components/products-tabs"
import { ownedStatusText } from "@/features/products/product-text"
import { getOpenGym } from "@/lib/data/gyms"
import { useDemoState } from "@/lib/demo/context"
import { withDetails } from "@/lib/demo/owned-products"
import { cn } from "@/lib/utils"

type Filter = "active" | "expired"

export function MyProductsScreen() {
	const { ownedProducts } = useDemoState()
	const [filter, setFilter] = useState<Filter>("active")
	const now = new Date()
	const items = ownedProducts
		.map(item => withDetails(item, now))
		.filter(item =>
			filter === "active"
				? item.status !== "expired"
				: item.status === "expired"
		)
		.sort((a, b) => b.validUntil.localeCompare(a.validUntil))

	return (
		<Screen title="Produkty">
			<ProductsTabs current="mine" />
			<SegmentedControl
				label="Stav produktů"
				className="mx-4 mt-4 border-input [&_label_span]:h-9 [&_label_span]:text-sm"
				options={[
					{ value: "active", label: "Aktivní" },
					{ value: "expired", label: "Expirované" },
				]}
				value={filter}
				onChange={setFilter}
			/>
			{items.length === 0 ? (
				<EmptyState
					profile="beast"
					title={
						filter === "active" ? "Nic aktivního" : "Žádné expirované produkty"
					}
					text={
						filter === "active"
							? "Kup si členství nebo permanentku a vstupuj přes QR kód."
							: undefined
					}
					action={
						filter === "active" && (
							<Link
								href="/products"
								className={cn(buttonVariants({ size: "lg" }), "w-full")}
							>
								Vybrat produkt
							</Link>
						)
					}
				/>
			) : (
				<ul className="mt-4 border-t">
					{items.map(item => (
						<li key={item.id} className="border-b">
							<Link
								href={`/products/mine/${item.id}`}
								className="flex min-h-16 items-center gap-3 px-4 py-3 active:bg-muted"
							>
								<span className="min-w-0 flex-1">
									<span className="block font-medium">{item.product.name}</span>
									<span className="block text-sm text-muted-foreground">
										{item.product.variant} ·{" "}
										{getOpenGym(item.product.gymSlug).city}
									</span>
									<span className="mt-1 flex items-center gap-1.5 text-sm">
										<span
											aria-hidden="true"
											className={cn(
												"size-2",
												item.status === "active" && "bg-orient",
												item.status === "upcoming" && "bg-electric-violet",
												item.status === "expired" && "bg-input"
											)}
										/>
										{ownedStatusText(item)}
									</span>
								</span>
								<ChevronRightIcon
									className="size-5 shrink-0 text-muted-foreground"
									aria-hidden="true"
								/>
							</Link>
						</li>
					))}
				</ul>
			)}
		</Screen>
	)
}

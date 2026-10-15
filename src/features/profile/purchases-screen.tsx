"use client"

import Link from "next/link"

import { EmptyState } from "@/components/shell/empty-state"
import { Screen } from "@/components/shell/screen"
import { ChevronRightIcon } from "@/components/ui/icons"
import { getProduct } from "@/lib/data/products"
import { useDemoState } from "@/lib/demo/context"
import { formatDate, formatPrice } from "@/lib/utils"

export function PurchasesScreen() {
	const { purchases } = useDemoState()
	const sorted = [...purchases].sort((a, b) => b.date.localeCompare(a.date))

	return (
		<Screen title="Historie nákupů" backHref="/profile" backLabel="Profil">
			{sorted.length === 0 ? (
				<EmptyState
					title="Zatím žádné nákupy"
					text="Tady uvidíš všechno, co si v aplikaci koupíš."
				/>
			) : (
				<ul className="border-t pb-6">
					{sorted.map(purchase => {
						const product = getProduct(purchase.productId)
						return (
							<li key={purchase.id} className="border-b">
								<Link
									href={`/profile/purchases/${purchase.id}`}
									className="flex min-h-16 items-center gap-3 px-4 py-3 active:bg-muted"
								>
									<span className="min-w-0 flex-1">
										<span className="block font-medium">{product.name}</span>
										<span className="block text-sm text-muted-foreground">
											{product.variant} · {formatDate(purchase.date)}
										</span>
									</span>
									<span className="shrink-0 font-bold">
										{formatPrice(purchase.amount)}
									</span>
									<ChevronRightIcon
										className="size-5 shrink-0 text-muted-foreground"
										aria-hidden="true"
									/>
								</Link>
							</li>
						)
					})}
				</ul>
			)}
		</Screen>
	)
}

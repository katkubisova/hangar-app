"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { BottomSheet } from "@/components/shell/bottom-sheet"
import { Screen } from "@/components/shell/screen"
import { Button, buttonVariants } from "@/components/ui/button"
import { ProductDetails } from "@/features/products/components/product-details"
import { ownedStatusText } from "@/features/products/product-text"
import { productHref } from "@/lib/data/product-families"
import { useDemo, useDemoState } from "@/lib/demo/context"
import { withDetails } from "@/lib/demo/owned-products"
import { cn, formatDate, formatPrice } from "@/lib/utils"

export function OwnedProductScreen({ ownedId }: { ownedId: string }) {
	const { ownedProducts, purchases } = useDemoState()
	const { cancelRenewal } = useDemo()
	const router = useRouter()
	const [confirmCancel, setConfirmCancel] = useState(false)
	const owned = ownedProducts.find(item => item.id === ownedId)

	if (!owned) {
		return (
			<Screen
				title="Produkt"
				backHref="/products/mine"
				backLabel="Moje produkty"
			>
				<p className="px-4 text-muted-foreground">
					Tenhle produkt v účtu není.
				</p>
			</Screen>
		)
	}

	const item = withDetails(owned, new Date())
	const purchase = purchases.find(
		entry =>
			entry.date === owned.purchasedAt && entry.productId === owned.productId
	)
	const canCancel =
		item.product.type === "membership" &&
		item.status !== "expired" &&
		item.autoRenew

	return (
		<Screen
			title={item.product.name}
			backHref="/products/mine"
			backLabel="Moje produkty"
			footer={
				<>
					{canCancel && (
						<Button
							variant="destructive"
							size="lg"
							onClick={() => setConfirmCancel(true)}
						>
							Zrušit opakovanou platbu
						</Button>
					)}
					<Link
						href={productHref(item.productId)}
						className={cn(
							buttonVariants({
								variant: canCancel ? "ghost" : "default",
								size: "lg",
							})
						)}
					>
						Koupit znovu
					</Link>
				</>
			}
		>
			<p className="px-4 text-lead">{item.product.variant}</p>
			<p className="px-4 pt-1 text-muted-foreground">{ownedStatusText(item)}</p>
			<ProductDetails item={item} />
			{purchase && (
				<p className="px-4 pt-4 pb-6 text-sm text-muted-foreground">
					Zakoupeno {formatDate(purchase.date)} za{" "}
					{formatPrice(purchase.amount)}.
				</p>
			)}

			<BottomSheet
				open={confirmCancel}
				onOpenChange={setConfirmCancel}
				title="Zrušit opakovanou platbu?"
			>
				<p className="px-4 text-muted-foreground">
					Členství ti zůstane až do {formatDate(item.validUntil)}. Potom se už
					neobnoví a nic dalšího nezaplatíš.
				</p>
				<div className="flex flex-col gap-2 px-4 pt-5">
					<Button
						variant="destructive"
						size="lg"
						onClick={() => {
							cancelRenewal(item.id)
							router.replace(`/products/mine/${item.id}/cancelled`)
						}}
					>
						Zrušit opakovanou platbu
					</Button>
					<Button
						size="lg"
						variant="ghost"
						onClick={() => setConfirmCancel(false)}
					>
						Ponechat
					</Button>
				</div>
			</BottomSheet>
		</Screen>
	)
}

"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { WallProfile } from "@/components/brand/wall-profile"
import { Screen } from "@/components/shell/screen"
import { buttonVariants } from "@/components/ui/button"
import { CheckIcon, ErrorCircleIcon } from "@/components/ui/icons"
import { productHref } from "@/lib/data/product-families"
import { useDemoState } from "@/lib/demo/context"
import { withDetails } from "@/lib/demo/owned-products"
import { cn, formatDate } from "@/lib/utils"

export function CheckoutDoneScreen() {
	const ownedId = useSearchParams().get("owned")
	const { ownedProducts } = useDemoState()
	const owned = ownedProducts.find(item => item.id === ownedId)
	const item = owned ? withDetails(owned, new Date()) : null

	return (
		<Screen
			footer={
				<>
					{item?.status === "active" && (
						<Link href="/qr" className={cn(buttonVariants({ size: "lg" }))}>
							Ukázat vstupní QR
						</Link>
					)}
					<Link
						href={item ? `/products/mine/${item.id}` : "/products/mine"}
						className={cn(
							buttonVariants({
								variant: item?.status === "active" ? "ghost" : "default",
								size: "lg",
							})
						)}
					>
						Moje produkty
					</Link>
				</>
			}
		>
			<div className="flex flex-col px-6 pt-12 pb-6">
				<WallProfile
					profile="nose"
					className="w-[60%]"
					contentClassName="items-center"
				>
					<CheckIcon className="size-14" aria-hidden="true" />
				</WallProfile>
				<h1 className="mt-10 text-h1">Zaplaceno</h1>
				{item && (
					<p className="mt-3 text-lead text-muted-foreground">
						{item.product.name} · {item.product.variant} je ve tvém účtu.{" "}
						{item.status === "upcoming"
							? `Začne platit ${formatDate(item.validFrom)}.`
							: `Platí do ${formatDate(item.validUntil)}.`}
					</p>
				)}
				<p className="mt-3 text-sm text-muted-foreground">
					Potvrzení jsme ti poslali e-mailem.
				</p>
			</div>
		</Screen>
	)
}

export function CheckoutFailedScreen() {
	const productId = useSearchParams().get("product") ?? ""

	return (
		<Screen
			footer={
				<>
					<Link
						href={`/checkout?product=${productId}`}
						className={cn(buttonVariants({ size: "lg" }))}
					>
						Zkusit znovu
					</Link>
					<Link
						href={productHref(productId)}
						className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
					>
						Zrušit
					</Link>
				</>
			}
		>
			<div className="flex flex-col px-6 pt-12 pb-6">
				<WallProfile
					profile="beast"
					className="w-[66%]"
					contentClassName="items-center"
				>
					<ErrorCircleIcon
						className="size-14 text-trinidad"
						aria-hidden="true"
					/>
				</WallProfile>
				<h1 className="mt-10 text-h1">Platba neprošla</h1>
				<p className="mt-3 text-lead text-muted-foreground">
					Banka platbu zamítla a nic ti nestrhla. Zkus to znovu, případně s
					jinou kartou.
				</p>
			</div>
		</Screen>
	)
}

"use client"

import Link from "next/link"
import { QRCodeSVG } from "qrcode.react"

import { EmptyState } from "@/components/shell/empty-state"
import { Screen } from "@/components/shell/screen"
import { buttonVariants } from "@/components/ui/button"
import { getOpenGym } from "@/lib/data/gyms"
import { useDemoState } from "@/lib/demo/context"
import { getPrimaryProduct } from "@/lib/demo/owned-products"
import { cn, formatDate } from "@/lib/utils"

// Check-in QR. Black screen with a white card, like the printed pass. The
// code itself stays pure black on white, with no accent colour, so every
// scanner reads it. The card is white inside a dark screen, so its greys
// are the light-theme values written out (dark tokens would apply here).
export function QrScreen() {
	const { user, ownedProducts } = useDemoState()
	const primary = getPrimaryProduct(ownedProducts, new Date())
	const valid = primary?.status === "active" ? primary : null

	return (
		<Screen title="Vstup" dark>
			{valid && user ? (
				<div className="px-4 pb-6">
					<div className="bg-white p-6 text-cod-gray">
						<div className="flex justify-center">
							<QRCodeSVG
								value={user.memberId}
								size={232}
								level="M"
								bgColor="#ffffff"
								fgColor="#0d0d0d"
								marginSize={0}
								title="Vstupní QR kód"
								className="h-auto w-full max-w-[232px]"
							/>
						</div>
						<p className="mt-6 text-h3 font-medium tracking-heading">
							{user.firstName} {user.lastName}
						</p>
						<p className="mt-1 text-sm text-[#5c5c5c]">{user.memberId}</p>
						<div className="mt-4 border-t border-[#e2e2e2] pt-4">
							<p className="font-medium">
								{valid.product.name} · {valid.product.variant}
							</p>
							<p className="mt-1 text-sm text-[#5c5c5c]">
								{getOpenGym(valid.product.gymSlug).name} · platí do{" "}
								{formatDate(valid.validUntil)}
							</p>
						</div>
					</div>
					<p className="mt-4 text-center text-sm text-muted-foreground">
						Ukaž tento kód při vstupu. Pomůže zvýšit jas displeje.
					</p>
				</div>
			) : (
				<EmptyState
					profile="stargate"
					title="Nemáš platné členství ani permanentku"
					text="Bez platného produktu se QR kód pro vstup nezobrazí."
					action={
						<Link
							href="/products"
							className={cn(buttonVariants({ size: "lg" }), "w-full")}
						>
							Vybrat produkt
						</Link>
					}
				/>
			)}
		</Screen>
	)
}

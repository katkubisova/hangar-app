"use client"

import Link from "next/link"
import { QRCodeSVG } from "qrcode.react"
import { useState } from "react"

import { EmptyState } from "@/components/shell/empty-state"
import { Screen } from "@/components/shell/screen"
import { buttonVariants } from "@/components/ui/button"
import { HelpCircleIcon, SunnyIcon } from "@/components/ui/icons"
import { ProductDetails } from "@/features/products/components/product-details"
import { QrHelpSheet } from "@/features/qr/components/qr-help-sheet"
import { useWakeLock } from "@/features/qr/use-wake-lock"
import { BlockedAccount } from "@/features/support/blocked-account"
import { getOpenGym } from "@/lib/data/gyms"
import { useDemoState } from "@/lib/demo/context"
import { getPrimaryProduct } from "@/lib/demo/owned-products"
import { cn, formatDate } from "@/lib/utils"

// Check-in QR. Black screen with a white card, like the printed pass. The
// code itself stays pure black on white, with no accent colour, so every
// scanner reads it. The card is white inside a dark screen, so its greys
// are the light-theme values written out (dark tokens would apply here).
export function QrScreen() {
	const { user, ownedProducts, selectedGym, system } = useDemoState()
	const [helpOpen, setHelpOpen] = useState(false)
	const primary = getPrimaryProduct(ownedProducts, new Date())
	const valid =
		!system.blockedUser && primary?.status === "active" ? primary : null

	useWakeLock(Boolean(valid))

	if (system.blockedUser) {
		// Assumption: a blocked account can't check in either, so no QR.
		return (
			<Screen title="Vstup" dark>
				<BlockedAccount gymSlug={selectedGym} />
			</Screen>
		)
	}

	if (!valid || !user) {
		return (
			<Screen title="Vstup" dark>
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
			</Screen>
		)
	}

	const gym = getOpenGym(valid.product.gymSlug)

	return (
		<Screen
			title="Vstup"
			dark
			headerEnd={
				<button
					type="button"
					onClick={() => setHelpOpen(true)}
					className="flex h-11 items-center gap-1.5 px-2 text-base font-medium active:opacity-60"
				>
					<HelpCircleIcon className="size-5" aria-hidden="true" />
					QR nefunguje?
				</button>
			}
		>
			<div className="px-4">
				<div className="bg-white p-6 text-cod-gray">
					<div className="flex justify-center">
						<QRCodeSVG
							value={user.memberId}
							size={248}
							level="M"
							bgColor="#ffffff"
							fgColor="#0d0d0d"
							marginSize={0}
							title="Vstupní QR kód"
							className="h-auto w-full max-w-[248px]"
						/>
					</div>
					<p className="mt-6 text-h3 font-bold tracking-heading">
						{user.firstName} {user.lastName}
					</p>
					<p className="mt-1 text-sm text-[#5c5c5c]">{user.memberId}</p>
					<div className="mt-4 border-t border-[#e2e2e2] pt-4">
						<p className="font-medium">
							{valid.product.name} · {valid.product.variant}
						</p>
						<p className="mt-1 text-sm text-[#5c5c5c]">
							{gym.name} · platí do {formatDate(valid.validUntil)}
						</p>
					</div>
				</div>
				<p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
					<SunnyIcon className="size-4 shrink-0" aria-hidden="true" />
					Ukaž kód při vstupu. Pomůže zvýšit jas displeje.
				</p>
			</div>

			<ProductDetails item={valid} />
			<div className="h-6" />

			<QrHelpSheet
				open={helpOpen}
				onOpenChange={setHelpOpen}
				gym={gym}
				memberId={user.memberId}
			/>
		</Screen>
	)
}

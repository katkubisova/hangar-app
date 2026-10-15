"use client"

import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { QrcodeIcon } from "@/components/ui/icons"
import { getOpenGym } from "@/lib/data/gyms"
import type { OwnedProductWithDetails } from "@/lib/demo/owned-products"
import type { GymSlug } from "@/lib/types/gym"
import { cn, formatDate } from "@/lib/utils"

interface MembershipCardProps {
	primary: OwnedProductWithDetails | null
	selectedGym: GymSlug
}

// Status of the user's membership or pass, styled after the brand's
// printed "permanentka": black card, capital name, the variant in violet.
export function MembershipCard({ primary, selectedGym }: MembershipCardProps) {
	if (!primary) {
		return (
			<div className="border bg-card p-5">
				<p className="eyebrow">Moje členství</p>
				<h2 className="mt-2 text-h2">Zatím nic aktivního</h2>
				<p className="mt-2 text-muted-foreground">
					Vyber si členství nebo permanentku a vstupuj přes QR kód.
				</p>
				<Link
					href="/products"
					className={cn(buttonVariants({ size: "lg" }), "mt-5 w-full")}
				>
					Vybrat produkt
				</Link>
			</div>
		)
	}

	const { product, status } = primary
	const gym = getOpenGym(product.gymSlug)
	const isActive = status === "active"

	return (
		<div className="dark bg-background p-5 text-foreground">
			<p className="eyebrow">{gym.name}</p>
			<h2 className="mt-2 text-h2">{product.name}</h2>
			<p className="mt-1 text-h3 font-medium tracking-heading text-link uppercase">
				{product.type === "package"
					? `Zbývá ${primary.entriesLeft} z ${product.entries} vstupů`
					: product.variant}
			</p>

			<div className="mt-5 flex items-center gap-2 text-sm">
				<span
					aria-hidden="true"
					// Orient's lighter tint: Orient itself is too dark on black.
					className={cn("size-2.5", isActive ? "bg-blue" : "bg-trinidad")}
				/>
				{isActive
					? `Aktivní · platí do ${formatDate(primary.validUntil)}`
					: `Vypršelo ${formatDate(primary.validUntil)}`}
			</div>
			{isActive && product.gymSlug !== selectedGym && (
				<p className="mt-1 text-sm text-muted-foreground">
					Platí jen v pobočce {gym.name}.
				</p>
			)}

			<Link
				href={isActive ? "/qr" : "/products"}
				className={cn(buttonVariants({ size: "lg" }), "mt-5 w-full")}
			>
				{isActive ? (
					<>
						<QrcodeIcon aria-hidden="true" />
						Ukázat vstupní QR
					</>
				) : product.type === "membership" ? (
					"Obnovit členství"
				) : (
					"Koupit novou permanentku"
				)}
			</Link>
		</div>
	)
}

"use client"

import Link from "next/link"

import { Screen } from "@/components/shell/screen"
import { ChevronRightIcon } from "@/components/ui/icons"
import { GymSwitcher } from "@/features/home/components/gym-switcher"
import { ProductsTabs } from "@/features/products/components/products-tabs"
import { BlockedAccount } from "@/features/support/blocked-account"
import { getFamiliesForGym } from "@/lib/data/product-families"
import { AUDIENCE_LABEL, getProduct } from "@/lib/data/products"
import { useDemoState } from "@/lib/demo/context"
import type { ProductFamily } from "@/lib/types/product-family"
import { formatPrice } from "@/lib/utils"

function familySubtitle(family: ProductFamily) {
	return family.type === "membership"
		? "1, 3, 6 nebo 12 měsíců · obnovuje se"
		: `${AUDIENCE_LABEL[family.audience]} · 10 nebo 20 vstupů`
}

function lowestPrice(family: ProductFamily) {
	return Math.min(...family.productIds.map(id => getProduct(id).price))
}

function FamilyList({ families }: { families: ProductFamily[] }) {
	return (
		<ul className="border-t">
			{families.map(family => (
				<li key={family.id} className="border-b">
					<Link
						href={`/products/${family.id}`}
						className="flex min-h-16 items-center gap-3 px-4 py-3 active:bg-muted"
					>
						<span className="min-w-0 flex-1">
							<span className="flex items-center gap-2 font-medium">
								{family.name}
								{family.audience === "student" && (
									<span className="border border-foreground px-1 text-[11px] leading-4 font-medium">
										ISIC
									</span>
								)}
							</span>
							<span className="block text-sm text-muted-foreground">
								{familySubtitle(family)}
							</span>
						</span>
						<span className="shrink-0 text-right text-sm">
							<span className="block text-muted-foreground">od</span>
							<span className="font-bold">
								{formatPrice(lowestPrice(family))}
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
	)
}

// Koupit: memberships (recurring) and passes (one-off) for the selected
// gym. Prices differ per gym, so the gym switcher sits right here too.
export function BuyScreen() {
	const { selectedGym, system } = useDemoState()
	const families = getFamiliesForGym(selectedGym)

	return (
		<Screen title="Produkty">
			<ProductsTabs current="buy" />
			{system.blockedUser ? (
				<BlockedAccount gymSlug={selectedGym} />
			) : (
				<div className="pb-6">
					<div className="flex items-center justify-between px-2 pt-4">
						<span className="px-2 text-sm text-muted-foreground">
							Ceny pro pobočku
						</span>
						<GymSwitcher />
					</div>
					<section aria-labelledby="memberships-title" className="pt-2">
						<div className="px-4 pb-3">
							<h2 id="memberships-title" className="text-h3">
								Členství
							</h2>
							<p className="text-sm text-muted-foreground">
								Neomezené vstupy. Platba se obnovuje, zrušit ji můžeš kdykoli.
							</p>
						</div>
						<FamilyList
							families={families.filter(item => item.type === "membership")}
						/>
					</section>
					<section aria-labelledby="packages-title" className="pt-8">
						<div className="px-4 pb-3">
							<h2 id="packages-title" className="text-h3">
								Permanentky
							</h2>
							<p className="text-sm text-muted-foreground">
								Jednorázová platba, platnost 1 rok, vstupy jsou přenosné.
							</p>
						</div>
						<FamilyList
							families={families.filter(item => item.type === "package")}
						/>
					</section>
				</div>
			)}
		</Screen>
	)
}

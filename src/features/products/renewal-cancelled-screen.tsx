"use client"

import Link from "next/link"

import { WallProfile } from "@/components/brand/wall-profile"
import { Screen } from "@/components/shell/screen"
import { buttonVariants } from "@/components/ui/button"
import { CheckIcon } from "@/components/ui/icons"
import { useDemoState } from "@/lib/demo/context"
import { cn, formatDate } from "@/lib/utils"

export function RenewalCancelledScreen({ ownedId }: { ownedId: string }) {
	const { ownedProducts } = useDemoState()
	const owned = ownedProducts.find(item => item.id === ownedId)

	return (
		<Screen
			footer={
				<Link
					href="/products/mine"
					className={cn(buttonVariants({ size: "lg" }))}
				>
					Zpět na Moje produkty
				</Link>
			}
		>
			<div className="flex flex-col px-6 pt-12 pb-6">
				<WallProfile
					profile="stargate"
					className="w-[58%]"
					contentClassName="items-center"
				>
					<CheckIcon className="size-14" aria-hidden="true" />
				</WallProfile>
				<h1 className="mt-10 text-h1">Opakovaná platba je zrušená</h1>
				{owned && (
					<p className="mt-3 text-lead text-muted-foreground">
						Členství platí do {formatDate(owned.validUntil)}. Pak skončí a už ti
						nic nestrhneme. Kdykoli si ho můžeš koupit znovu.
					</p>
				)}
			</div>
		</Screen>
	)
}

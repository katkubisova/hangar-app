"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { BrandImage } from "@/components/brand/brand-image"
import { BottomSheet } from "@/components/shell/bottom-sheet"
import { Screen } from "@/components/shell/screen"
import { Button, buttonVariants } from "@/components/ui/button"
import { productPhoto } from "@/features/products/product-photo"
import { getOpenGym } from "@/lib/data/gyms"
import {
	getMembershipBenefits,
	getProductFootnotes,
	getProductNotes,
} from "@/lib/data/product-info"
import { AUDIENCE_LABEL, getProduct } from "@/lib/data/products"
import { useDemoState } from "@/lib/demo/context"
import type { ProductFamily } from "@/lib/types/product-family"
import { cn, formatPrice } from "@/lib/utils"

// Who can buy reduced prices. Student: ISIC check in the app (assumption
// agreed in step 1). Child / senior / ZTP: from the price list footnotes;
// checking it at reception is an assumption.
const ELIGIBILITY: Partial<Record<ProductFamily["audience"], string>> = {
	student: "Studentská cena platí pro věk 13–26 let s ověřeným průkazem ISIC.",
	reduced:
		"Pro děti do 12 let, seniory nad 65 let a držitele průkazu ZTP. Nárok ověří recepce při prvním vstupu.",
}

interface ProductDetailScreenProps {
	family: ProductFamily
	initialProductId?: string
}

export function ProductDetailScreen({
	family,
	initialProductId,
}: ProductDetailScreenProps) {
	const { discountCards, system } = useDemoState()
	const router = useRouter()
	const [productId, setProductId] = useState(
		initialProductId && family.productIds.includes(initialProductId)
			? initialProductId
			: family.defaultProductId
	)
	const [isicSheet, setIsicSheet] = useState(false)

	const product = getProduct(productId)
	const gym = getOpenGym(family.gymSlug)
	const photo = productPhoto(product)
	const benefits = getMembershipBenefits(product)
	const notes = getProductNotes(product)
	const footnotes = getProductFootnotes(product).filter(note =>
		benefits.some(benefit => benefit.marker === note.marker)
	)
	const needsIsic =
		family.audience === "student" &&
		!discountCards.some(card => card.type === "isic")

	function buy() {
		if (needsIsic) {
			setIsicSheet(true)
			return
		}
		router.push(`/checkout?product=${productId}`)
	}

	return (
		<Screen
			backHref="/products"
			backLabel="Produkty"
			footer={
				system.blockedUser ? (
					<Button size="lg" disabled>
						Účet je zablokovaný
					</Button>
				) : (
					<Button size="lg" onClick={buy}>
						Koupit za {formatPrice(product.price)}
					</Button>
				)
			}
		>
			<BrandImage
				src={photo.src}
				alt={photo.alt}
				aspectRatio="aspect-[16/9]"
				sizes="430px"
			/>
			<div className="px-4 pt-5 pb-6">
				<p className="eyebrow">{gym.name}</p>
				<h1 className="mt-1 text-h1">{family.name}</h1>
				{family.type === "package" && (
					<p className="mt-1 text-lead">{AUDIENCE_LABEL[family.audience]}</p>
				)}
				{family.timeWindow === "morning" && (
					<p className="mt-2 text-muted-foreground">
						Dopoledne = vstup ve všední dny do 15:00.
					</p>
				)}

				<fieldset className="mt-6">
					<legend className="eyebrow pb-2">
						{family.type === "membership" ? "Délka členství" : "Počet vstupů"}
					</legend>
					<div className="flex flex-col gap-2">
						{family.productIds.map(id => {
							const option = getProduct(id)
							const selected = id === productId
							return (
								<label
									key={id}
									className={cn(
										"flex min-h-14 cursor-pointer items-center justify-between gap-3 border bg-card px-4 transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring",
										selected
											? "border-foreground outline outline-foreground"
											: "active:bg-muted"
									)}
								>
									<input
										type="radio"
										name="variant"
										value={id}
										checked={selected}
										onChange={() => setProductId(id)}
										className="sr-only"
									/>
									<span className="font-medium">
										{option.type === "membership"
											? option.variant
											: `${option.entries} vstupů`}
									</span>
									<span className="font-bold">{formatPrice(option.price)}</span>
								</label>
							)
						})}
					</div>
				</fieldset>

				{ELIGIBILITY[family.audience] && (
					<p className="mt-4 border-l-4 border-electric-violet bg-card p-3 text-sm">
						{ELIGIBILITY[family.audience]}
					</p>
				)}

				{product.type === "membership" && (
					<section className="mt-8">
						<h2 className="text-h3">Co dostaneš</h2>
						<ul className="mt-3 border-t">
							{benefits.map(benefit => (
								<li
									key={benefit.label}
									className="flex justify-between gap-4 border-b py-2.5"
								>
									<span className="text-muted-foreground">
										{benefit.label}
										{benefit.marker && <sup>{benefit.marker}</sup>}
									</span>
									<span className="font-medium">{benefit.value}</span>
								</li>
							))}
						</ul>
						<p className="mt-4 text-sm">
							Členství platí {product.variant} a pak se automaticky obnoví.
							Opakovanou platbu zrušíš kdykoli v Moje produkty.
						</p>
					</section>
				)}

				{notes.length > 0 && (
					<ul className="mt-6 flex flex-col gap-2 text-sm">
						{notes.map(note => (
							<li key={note} className="flex gap-2">
								<span
									aria-hidden="true"
									className="mt-2 size-1.5 shrink-0 bg-foreground"
								/>
								{note}
							</li>
						))}
						<li className="flex gap-2">
							<span
								aria-hidden="true"
								className="mt-2 size-1.5 shrink-0 bg-foreground"
							/>
							MultiSport se na členství a permanentky nevztahuje.
						</li>
					</ul>
				)}

				{footnotes.length > 0 && (
					<div className="mt-6 flex flex-col gap-1.5 text-xs text-muted-foreground">
						{footnotes.map(note => (
							<p key={note.marker}>
								<sup>{note.marker}</sup> {note.text}
							</p>
						))}
					</div>
				)}
			</div>

			<BottomSheet
				open={isicSheet}
				onOpenChange={setIsicSheet}
				title="Nejdřív ověř ISIC"
			>
				<p className="px-4 text-muted-foreground">
					Studentské ceny jsou pro držitele platného průkazu ISIC. Přidej ho v
					profilu a pak se sem vrať.
				</p>
				<div className="flex flex-col gap-2 px-4 pt-5">
					<Link
						href="/profile/discounts"
						className={cn(buttonVariants({ size: "lg" }))}
					>
						Přidat ISIC
					</Link>
					<Button size="lg" variant="ghost" onClick={() => setIsicSheet(false)}>
						Zrušit
					</Button>
				</div>
			</BottomSheet>
		</Screen>
	)
}

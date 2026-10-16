"use client"

import Link from "next/link"

import { BrandImage } from "@/components/brand/brand-image"
import { productPhoto } from "@/features/products/product-photo"
import { productHref } from "@/lib/data/product-families"
import { getRecommendedProducts } from "@/lib/data/recommended-products"
import type { GymSlug } from "@/lib/types/gym"
import type { OwnedProduct } from "@/lib/types/owned-product"
import { formatPrice } from "@/lib/utils"

interface RecommendedProductsProps {
	gymSlug: GymSlug
	activeOwned: OwnedProduct[]
}

// Swipeable row of suggested products for the selected gym. Each card
// opens its product detail.
export function RecommendedProducts({
	gymSlug,
	activeOwned,
}: RecommendedProductsProps) {
	const products = getRecommendedProducts(gymSlug, activeOwned)

	if (products.length === 0) {
		return null
	}

	return (
		<section aria-labelledby="recommended-title" className="pt-5">
			<div className="flex items-baseline justify-between px-4 pb-3">
				<h2 id="recommended-title" className="text-h3">
					Doporučujeme
				</h2>
				<Link href="/products" className="link py-1 text-sm">
					Všechny produkty
				</Link>
			</div>
			<ul className="flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto overscroll-x-contain px-4 pb-1 scrollbar-none">
				{products.map(product => {
					const photo = productPhoto(product)
					return (
						<li key={product.id} className="w-[220px] shrink-0 snap-start">
							<Link
								href={productHref(product.id)}
								className="block border bg-card active:opacity-80"
							>
								<BrandImage
									src={photo.src}
									alt=""
									aspectRatio="aspect-[4/3]"
									sizes="220px"
								/>
								<div className="p-3">
									<p className="font-medium">{product.name}</p>
									<p className="text-sm text-muted-foreground">
										{product.variant}
									</p>
									<p className="mt-2 font-bold">{formatPrice(product.price)}</p>
								</div>
							</Link>
						</li>
					)
				})}
			</ul>
		</section>
	)
}

"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { BrandImage } from "@/components/brand/brand-image"
import { BottomSheet } from "@/components/shell/bottom-sheet"
import { Screen } from "@/components/shell/screen"
import { Button } from "@/components/ui/button"
import { LocationIcon } from "@/components/ui/icons"
import { GymContacts } from "@/features/support/gym-contacts"
import { getOpenGym } from "@/lib/data/gyms"
import { useDemo } from "@/lib/demo/context"
import { getTodayHours } from "@/lib/demo/opening-hours"
import type { GymSlug } from "@/lib/types/gym"
import { cn } from "@/lib/utils"

// Navigation apps offered in the (simulated) "open in" sheet.
const MAP_APPS = ["Mapy", "Google Maps", "Mapy.com"]

export function GymDetailScreen({ slug }: { slug: GymSlug }) {
	const gym = getOpenGym(slug)
	const { selectGym } = useDemo()
	const router = useRouter()
	const [navigateOpen, setNavigateOpen] = useState(false)
	const now = new Date()
	const today = getTodayHours(gym, now)
	const isoToday = now.getDay() === 0 ? 7 : now.getDay()
	const photos = [gym.heroImage, ...gym.galleryImages]

	return (
		<Screen
			backHref="/map"
			backLabel="Mapa"
			footer={
				<Button
					size="lg"
					onClick={() => {
						selectGym(slug)
						router.push("/products")
					}}
				>
					Produkty v této pobočce
				</Button>
			}
		>
			<ul className="flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain scrollbar-none">
				{photos.map(photo => (
					<li
						key={photo.src}
						className="w-[85%] shrink-0 snap-center first:pl-4 last:pr-4"
					>
						<BrandImage
							src={photo.src}
							alt={photo.alt}
							aspectRatio="aspect-[4/3]"
							sizes="360px"
						/>
					</li>
				))}
			</ul>

			<div className="px-4 pt-5 pb-6">
				<h1 className="text-h1">{gym.name}</h1>
				<p className="mt-2 flex items-center gap-1.5 text-sm">
					<span
						aria-hidden="true"
						className={cn(
							"size-2",
							today?.isOpenNow ? "bg-orient" : "bg-input"
						)}
					/>
					{today?.isOpenNow ? `Otevřeno do ${today.closes}` : "Teď zavřeno"}
				</p>
				<p className="mt-4">{gym.shortDescription}</p>

				<section aria-labelledby="address-title" className="mt-8">
					<h2 id="address-title" className="text-h3">
						Adresa
					</h2>
					<p className="mt-2">{gym.address}</p>
					<Button
						variant="outline"
						size="lg"
						className="mt-3 w-full"
						onClick={() => setNavigateOpen(true)}
					>
						<LocationIcon aria-hidden="true" />
						Navigovat
					</Button>
				</section>

				<section aria-labelledby="hours-title" className="mt-8">
					<h2 id="hours-title" className="text-h3">
						Otevírací doba
					</h2>
					<dl className="mt-2 border-t">
						{gym.openingHours.map(row => {
							const isToday = row.days.includes(
								isoToday as (typeof row.days)[number]
							)
							return (
								<div
									key={row.label}
									className={cn(
										"flex justify-between gap-4 border-b py-2.5",
										isToday && "font-bold"
									)}
								>
									<dt>
										{row.label}
										{isToday && <span className="sr-only"> (dnes)</span>}
									</dt>
									<dd>
										{row.opens}–{row.closes}
									</dd>
								</div>
							)
						})}
					</dl>
				</section>
			</div>

			<section aria-labelledby="contact-title" className="pb-6">
				<h2 id="contact-title" className="px-4 pb-2 text-h3">
					Kontakt
				</h2>
				<GymContacts gym={gym} subject="Dotaz z aplikace" />
			</section>

			<BottomSheet
				open={navigateOpen}
				onOpenChange={setNavigateOpen}
				title="Navigovat pomocí"
			>
				<ul className="border-t">
					{MAP_APPS.map(app => (
						<li key={app} className="border-b">
							<button
								type="button"
								onClick={() =>
									router.push(
										`/navigate?${new URLSearchParams({ gym: slug, app })}`
									)
								}
								className="flex h-13 w-full items-center px-4 text-left text-base active:bg-muted"
							>
								{app}
							</button>
						</li>
					))}
				</ul>
			</BottomSheet>
		</Screen>
	)
}

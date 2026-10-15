"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import { BottomSheet } from "@/components/shell/bottom-sheet"
import { Screen } from "@/components/shell/screen"
import { SegmentedControl } from "@/components/shell/segmented-control"
import { SystemAlert } from "@/components/shell/system-alert"
import { Button } from "@/components/ui/button"
import { ChevronRightIcon, LocationIcon } from "@/components/ui/icons"
import { Switch } from "@/components/ui/switch"
import { LazyGymMap } from "@/features/map/components/lazy-gym-map"
import { gyms } from "@/lib/data/gyms"
import { useDemo, useDemoState } from "@/lib/demo/context"
import {
	formatDistance,
	type GymListItem,
	type GymSort,
	listGyms,
	SIMULATED_LOCATION,
} from "@/lib/demo/gym-list"
import type { GymSlug } from "@/lib/types/gym"
import { cn } from "@/lib/utils"

type View = "map" | "list"

function GymStatus({ item }: { item: GymListItem }) {
	if (item.gym.status !== "open") {
		return <span className="text-sm text-muted-foreground">Připravujeme</span>
	}
	return (
		<span className="flex items-center gap-1.5 text-sm">
			<span
				aria-hidden="true"
				className={cn("size-2", item.isOpenNow ? "bg-orient" : "bg-input")}
			/>
			{item.isOpenNow ? "Otevřeno" : "Zavřeno"}
			{item.distanceKm !== null && (
				<span className="text-muted-foreground">
					{" "}
					· {formatDistance(item.distanceKm)}
				</span>
			)}
		</span>
	)
}

function GymRow({ item }: { item: GymListItem }) {
	const content = (
		<>
			<span className="min-w-0 flex-1">
				<span className="block font-medium">{item.gym.name}</span>
				<GymStatus item={item} />
			</span>
			{item.gym.status === "open" && (
				<ChevronRightIcon
					className="size-5 shrink-0 text-muted-foreground"
					aria-hidden="true"
				/>
			)}
		</>
	)
	// Coming-soon gyms are listed but have no detail.
	return item.gym.status === "open" ? (
		<Link
			href={`/map/${item.gym.slug}`}
			className="flex min-h-16 items-center gap-3 px-4 py-3 active:bg-muted"
		>
			{content}
		</Link>
	) : (
		<div className="flex min-h-16 items-center gap-3 px-4 py-3 opacity-70">
			{content}
		</div>
	)
}

export function MapScreen() {
	const { permissions } = useDemoState()
	const { setPermission } = useDemo()
	const [view, setView] = useState<View>("map")
	const [sort, setSort] = useState<GymSort>("distance")
	const [openNowOnly, setOpenNowOnly] = useState(false)
	const [selected, setSelected] = useState<GymSlug | null>(null)
	const [prePrompt, setPrePrompt] = useState(false)
	const [systemPrompt, setSystemPrompt] = useState<"none" | "ask" | "settings">(
		"none"
	)

	const location =
		permissions.location === "granted" ? SIMULATED_LOCATION : null
	const items = listGyms({ sort, openNowOnly, location, now: new Date() })
	const selectedItem = items.find(item => item.gym.slug === selected) ?? null

	// First time on Mapa: explain before the (simulated) system prompt.
	useEffect(() => {
		if (permissions.location === "not-asked") {
			setPrePrompt(true)
		}
	}, [permissions.location])

	function answer(value: "granted" | "denied") {
		setPermission("location", value)
		setSystemPrompt("none")
	}

	return (
		<Screen title="Mapa" contentClassName="flex flex-col">
			<SegmentedControl
				label="Zobrazení"
				className="mx-4 shrink-0"
				options={[
					{ value: "map", label: "Mapa" },
					{ value: "list", label: "Seznam" },
				]}
				value={view}
				onChange={setView}
			/>

			{view === "map" ? (
				<div className="relative mt-4 min-h-[320px] flex-1">
					<LazyGymMap
						gyms={gyms}
						userLocation={location}
						selectedSlug={selected}
						onSelect={setSelected}
					/>
					{selectedItem && (
						<div className="absolute inset-x-3 bottom-3 z-[1000] border bg-background p-4 shadow-lg">
							<div className="flex items-start justify-between gap-3">
								<div className="min-w-0">
									<p className="font-bold">{selectedItem.gym.name}</p>
									<GymStatus item={selectedItem} />
								</div>
								<button
									type="button"
									onClick={() => setSelected(null)}
									className="text-sm text-muted-foreground"
									aria-label="Zavřít"
								>
									✕
								</button>
							</div>
							{selectedItem.gym.status === "open" && (
								<Link
									href={`/map/${selectedItem.gym.slug}`}
									className="link mt-3 inline-block"
								>
									Detail pobočky
								</Link>
							)}
						</div>
					)}
				</div>
			) : (
				<div className="pb-6">
					<div className="flex flex-col gap-3 px-4 pt-4">
						{location ? (
							<SegmentedControl
								label="Řazení"
								className="border-input [&_label_span]:h-9 [&_label_span]:text-sm"
								options={[
									{ value: "distance", label: "Nejblíž" },
									{ value: "city", label: "Podle města" },
								]}
								value={sort}
								onChange={setSort}
							/>
						) : (
							<button
								type="button"
								onClick={() =>
									setSystemPrompt(
										permissions.location === "denied" ? "settings" : "ask"
									)
								}
								className="flex items-center gap-2 border-l-4 border-electric-violet bg-card p-3 text-left text-sm"
							>
								<LocationIcon className="size-5 shrink-0" aria-hidden="true" />
								Zapni polohu a seřadíme pobočky podle vzdálenosti.
							</button>
						)}
						<div className="flex items-center justify-between">
							<span>Jen otevřené teď</span>
							<Switch
								aria-label="Jen otevřené teď"
								checked={openNowOnly}
								onCheckedChange={setOpenNowOnly}
							/>
						</div>
					</div>
					{items.length === 0 ? (
						<p className="px-4 pt-6 text-muted-foreground">
							Teď nemá otevřeno žádná pobočka.
						</p>
					) : (
						<ul className="mt-4 border-t">
							{items.map(item => (
								<li key={item.gym.slug} className="border-b">
									<GymRow item={item} />
								</li>
							))}
						</ul>
					)}
				</div>
			)}

			<BottomSheet
				open={prePrompt}
				onOpenChange={setPrePrompt}
				title="Najdeme nejbližší Hangar"
			>
				<p className="px-4 text-muted-foreground">
					S polohou ti ukážeme, jak daleko to máš, a seřadíme pobočky od
					nejbližší. Mapa funguje i bez ní.
				</p>
				<div className="flex flex-col gap-2 px-4 pt-5">
					<Button
						size="lg"
						onClick={() => {
							setPrePrompt(false)
							setSystemPrompt("ask")
						}}
					>
						Povolit polohu
					</Button>
					<Button
						size="lg"
						variant="ghost"
						onClick={() => {
							// Saved, so Mapa doesn't ask on every visit.
							setPermission("location", "denied")
							setPrePrompt(false)
						}}
					>
						Teď ne
					</Button>
				</div>
			</BottomSheet>

			<SystemAlert
				open={systemPrompt === "ask"}
				title="Povolit aplikaci „HANGAR“ používat vaši polohu?"
				message="Poloha slouží k zobrazení nejbližších poboček."
				actions={[
					{ label: "Povolit jednou", onPress: () => answer("granted") },
					{
						label: "Povolit při používání aplikace",
						onPress: () => answer("granted"),
					},
					{ label: "Nepovolit", onPress: () => answer("denied") },
				]}
			/>
			<SystemAlert
				open={systemPrompt === "settings"}
				title="Poloha je vypnutá"
				message="Zapni ji v Nastavení telefonu → HANGAR → Poloha."
				actions={[
					{ label: "Zrušit", onPress: () => setSystemPrompt("none") },
					// Simulated: as if the user switched it on in the phone's settings.
					{
						label: "Otevřít Nastavení",
						style: "cancel",
						onPress: () => answer("granted"),
					},
				]}
			/>
		</Screen>
	)
}

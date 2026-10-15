"use client"

import { useRouter, useSearchParams } from "next/navigation"

import { SimulatedTag } from "@/components/shell/simulated-tag"
import { LazyGymMap } from "@/features/map/components/lazy-gym-map"
import { openGyms } from "@/lib/data/gyms"
import {
	distanceKm,
	formatDistance,
	SIMULATED_LOCATION,
} from "@/lib/demo/gym-list"

// Simulated maps app after "Navigovat". Generic phone UI, nothing is
// actually routed.
export function NavigateScreen() {
	const router = useRouter()
	const params = useSearchParams()
	const gym =
		openGyms.find(item => item.slug === params.get("gym")) ?? openGyms[0]
	const app = params.get("app") ?? "Mapy"

	return (
		<div className="flex h-full flex-col bg-white pt-safe font-system text-black duration-300 animate-in slide-in-from-bottom">
			<div className="flex h-12 shrink-0 items-center justify-between px-4">
				<button
					type="button"
					onClick={() => router.back()}
					className="h-11 text-[17px] text-[#007aff] active:opacity-60"
				>
					Zpět do aplikace HANGAR
				</button>
				<SimulatedTag />
			</div>
			<div className="relative min-h-0 flex-1">
				<LazyGymMap gyms={[gym]} zoom={13} />
			</div>
			<div className="shrink-0 px-4 pt-4 pb-[calc(var(--safe-bottom)+1rem)]">
				<p className="text-[13px] text-black/50">{app}</p>
				<p className="text-[22px] font-bold">{gym.name}</p>
				<p className="text-[15px] text-black/60">{gym.address}</p>
				<p className="mt-1 text-[15px] text-black/60">
					{formatDistance(distanceKm(SIMULATED_LOCATION, gym.coordinates))}{" "}
					vzdušnou čarou
				</p>
				<button
					type="button"
					className="mt-4 h-12 w-full rounded-xl bg-[#007aff] text-[17px] font-semibold text-white"
				>
					Trasa
				</button>
			</div>
		</div>
	)
}

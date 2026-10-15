"use client"

import dynamic from "next/dynamic"

// Leaflet touches window on import, so the map only loads in the browser.
export const LazyGymMap = dynamic(
	() => import("@/features/map/components/gym-map").then(mod => mod.GymMap),
	{
		ssr: false,
		loading: () => <div className="h-full w-full animate-pulse bg-muted" />,
	}
)

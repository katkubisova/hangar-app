"use client"

import "leaflet/dist/leaflet.css"

import L from "leaflet"
import { useEffect } from "react"
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet"

import type { Coordinates, Gym, GymSlug } from "@/lib/types/gym"

// Square brand markers (no rounded pins): black for open gyms, outlined
// grey for "Připravujeme", violet for the selected gym. Tailwind sees
// these class names here, so they're generated.
function gymIcon(gym: Gym, selected: boolean) {
	const tone =
		gym.status !== "open"
			? "border-2 border-cod-gray/40 bg-alabaster text-cod-gray/50"
			: selected
				? "bg-electric-violet text-alabaster"
				: "bg-cod-gray text-alabaster"
	return L.divIcon({
		className: "",
		html: `<span class="flex h-7 w-max -translate-x-1/2 items-center px-2 text-xs font-bold whitespace-nowrap uppercase shadow-md ${tone}">${gym.city}</span>`,
		iconSize: [0, 28],
		iconAnchor: [0, 14],
	})
}

const USER_ICON = L.divIcon({
	className: "",
	html: '<span class="block size-4 border-2 border-alabaster bg-electric-violet shadow-md"></span>',
	iconSize: [16, 16],
	iconAnchor: [8, 8],
})

// Fits the view to all markers, or centres on one gym.
// Re-fits only when the set of points changes, not on every render (e.g.
// tapping a marker keeps the view where it is).
function FitView({ points, zoom }: { points: Coordinates[]; zoom?: number }) {
	const map = useMap()
	const key = points.map(point => `${point.lat},${point.lng}`).join("|")
	// biome-ignore lint/correctness/useExhaustiveDependencies: keyed by the coordinates
	useEffect(() => {
		// The container may still be settling into its flex layout when the
		// map mounts; measure it first so the fit uses the real size.
		const timer = window.setTimeout(() => {
			map.invalidateSize()
			if (points.length === 1) {
				map.setView([points[0].lat, points[0].lng], zoom ?? 14, {
					animate: false,
				})
			} else {
				map.fitBounds(
					L.latLngBounds(points.map(point => [point.lat, point.lng])),
					{
						padding: [40, 40],
						animate: false,
					}
				)
			}
		}, 0)
		return () => window.clearTimeout(timer)
	}, [map, key, zoom])
	return null
}

interface GymMapProps {
	gyms: Gym[]
	userLocation?: Coordinates | null
	selectedSlug?: GymSlug | null
	onSelect?: (slug: GymSlug) => void
	zoom?: number
	interactive?: boolean
}

export function GymMap({
	gyms,
	userLocation,
	selectedSlug,
	onSelect,
	zoom,
	interactive = true,
}: GymMapProps) {
	const points = gyms.map(gym => gym.coordinates)

	return (
		<MapContainer
			center={[49.8, 15.5]}
			zoom={7}
			zoomControl={false}
			// Tiles show straight away instead of fading in (the fade relies
			// on animation frames, which background tabs don't run).
			fadeAnimation={false}
			// Finer zoom steps, so the fit around all gyms is tighter.
			zoomSnap={0.25}
			dragging={interactive}
			scrollWheelZoom={interactive}
			touchZoom={interactive}
			doubleClickZoom={interactive}
			className="isolate h-full w-full bg-muted"
		>
			<TileLayer
				url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			/>
			<FitView points={points} zoom={zoom} />
			{gyms.map(gym => (
				<Marker
					key={gym.slug}
					position={[gym.coordinates.lat, gym.coordinates.lng]}
					icon={gymIcon(gym, gym.slug === selectedSlug)}
					eventHandlers={
						onSelect ? { click: () => onSelect(gym.slug) } : undefined
					}
					title={gym.name}
				/>
			))}
			{userLocation && (
				<Marker
					position={[userLocation.lat, userLocation.lng]}
					icon={USER_ICON}
					title="Tvoje poloha"
				/>
			)}
		</MapContainer>
	)
}

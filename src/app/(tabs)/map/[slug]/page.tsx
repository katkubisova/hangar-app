import { notFound } from "next/navigation"

import { GymDetailScreen } from "@/features/map/gym-detail-screen"
import { openGyms } from "@/lib/data/gyms"

// Only open gyms have a detail; "Připravujeme" ones 404.
export default async function GymDetailPage({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const gym = openGyms.find(item => item.slug === slug)
	if (!gym) {
		notFound()
	}
	return <GymDetailScreen slug={gym.slug} />
}

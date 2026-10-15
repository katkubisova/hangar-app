import { getOpenGym } from "@/lib/data/gyms"
import type { Photo } from "@/lib/types/photo"
import type { Product } from "@/lib/types/product"

// Stand-in imagery: the gym's hero photo for memberships, a training
// photo for passes.
export function productPhoto(
	product: Pick<Product, "type" | "gymSlug">
): Photo {
	const gym = getOpenGym(product.gymSlug)
	return product.type === "membership"
		? gym.heroImage
		: (gym.galleryImages[0] ?? gym.heroImage)
}

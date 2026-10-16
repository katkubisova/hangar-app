import { OwnedProductScreen } from "@/features/products/owned-product-screen"

export default async function OwnedProductPage({
	params,
}: {
	params: Promise<{ ownedId: string }>
}) {
	const { ownedId } = await params
	return <OwnedProductScreen ownedId={ownedId} />
}

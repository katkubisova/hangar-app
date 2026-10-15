import { RenewalCancelledScreen } from "@/features/products/renewal-cancelled-screen"

export default async function RenewalCancelledPage({
	params,
}: {
	params: Promise<{ ownedId: string }>
}) {
	const { ownedId } = await params
	return <RenewalCancelledScreen ownedId={ownedId} />
}

import { PurchaseDetailScreen } from "@/features/profile/purchase-detail-screen"

export default async function PurchaseDetailPage({
	params,
}: {
	params: Promise<{ purchaseId: string }>
}) {
	const { purchaseId } = await params
	return <PurchaseDetailScreen purchaseId={purchaseId} />
}

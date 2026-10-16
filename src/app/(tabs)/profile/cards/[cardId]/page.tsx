import { CardDetailScreen } from "@/features/profile/card-detail-screen"

export default async function CardDetailPage({
	params,
}: {
	params: Promise<{ cardId: string }>
}) {
	const { cardId } = await params
	return <CardDetailScreen cardId={cardId} />
}

import { KidScreen } from "@/features/discounts/kid-screen"

// /profile/kids/new adds a kid; any other id views and edits one.
export default async function KidPage({
	params,
}: {
	params: Promise<{ kidId: string }>
}) {
	const { kidId } = await params
	return <KidScreen kidId={kidId} />
}

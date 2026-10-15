"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Screen } from "@/components/shell/screen"
import { SystemAlert } from "@/components/shell/system-alert"
import { Button } from "@/components/ui/button"
import { AUDIENCE_LABEL } from "@/lib/data/products"
import { useDemo, useDemoState } from "@/lib/demo/context"
import { withDetails } from "@/lib/demo/owned-products"

const YOU_LOSE = [
	"historii vstupů a nákupů",
	"uložené platební karty",
	"dětské účty a slevy (MultiSport, ISIC)",
]

// Delete account with a double confirmation: this screen spells out the
// consequences, then a final system alert. Assumption (agreed in step 1):
// deleting the account does not cancel a running membership.
export function DeleteAccountScreen() {
	const { ownedProducts } = useDemoState()
	const { deleteAccount } = useDemo()
	const router = useRouter()
	const [confirm, setConfirm] = useState(false)

	const now = new Date()
	const renewingMembership = ownedProducts
		.map(item => withDetails(item, now))
		.find(
			item =>
				item.status === "active" &&
				item.product.type === "membership" &&
				item.autoRenew
		)

	return (
		<Screen
			title="Smazat účet"
			backHref="/profile/settings"
			backLabel="Nastavení"
			footer={
				<Button
					variant="destructive"
					size="lg"
					onClick={() => setConfirm(true)}
				>
					Smazat účet
				</Button>
			}
		>
			<div className="flex flex-col gap-5 px-4 pb-6">
				<div>
					<p>Smazáním účtu natrvalo přijdeš o:</p>
					<ul className="mt-2 flex flex-col gap-1.5">
						{YOU_LOSE.map(item => (
							<li key={item} className="flex gap-2">
								<span
									aria-hidden="true"
									className="mt-2.5 size-1.5 shrink-0 bg-foreground"
								/>
								{item}
							</li>
						))}
					</ul>
				</div>

				{renewingMembership && (
					<div className="border-l-4 border-trinidad bg-card p-4">
						<p className="font-medium">
							Máš aktivní členství{" "}
							{AUDIENCE_LABEL[renewingMembership.product.audience]} na{" "}
							{renewingMembership.product.variant}.
						</p>
						<p className="mt-1 text-muted-foreground">
							Smazáním účtu ho nezrušíš, platba se dál obnovuje. Nejdřív zruš
							opakovanou platbu.
						</p>
						{/* Moje produkty (with cancelling) arrives in step 4. */}
						<Link href="/products" className="link mt-3 inline-block">
							Zrušit členství
						</Link>
					</div>
				)}
			</div>

			<SystemAlert
				open={confirm}
				title="Smazat účet natrvalo?"
				message="Tuto akci nejde vrátit zpět."
				actions={[
					{
						label: "Zrušit",
						style: "cancel",
						onPress: () => setConfirm(false),
					},
					{
						label: "Smazat",
						style: "destructive",
						onPress: () => {
							setConfirm(false)
							deleteAccount()
							router.replace("/welcome")
						},
					},
				]}
			/>
		</Screen>
	)
}

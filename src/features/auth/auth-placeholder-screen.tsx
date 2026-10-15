"use client"

import { useRouter } from "next/navigation"
import { EmptyState } from "@/components/shell/empty-state"
import { Screen } from "@/components/shell/screen"
import { Button } from "@/components/ui/button"
import { useDemo } from "@/lib/demo/context"

// Stand-in for sign-in and sign-up until step 2 (Auth and onboarding).
export function AuthPlaceholderScreen({ title }: { title: string }) {
	const { loadScenario } = useDemo()
	const router = useRouter()

	return (
		<Screen title={title} backHref="/welcome">
			<EmptyState
				profile="nose"
				title="Přijde v kroku 2"
				text="Formulář a ověření doplníme v dalším kroku. Zatím můžeš pokračovat jako demo uživatelka."
				action={
					<Button
						size="lg"
						className="w-full"
						onClick={() => {
							loadScenario("active-membership")
							router.push("/home")
						}}
					>
						Pokračovat jako Tereza
					</Button>
				}
			/>
		</Screen>
	)
}

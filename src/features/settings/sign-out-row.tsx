"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { BottomSheet } from "@/components/shell/bottom-sheet"
import { SystemAlert } from "@/components/shell/system-alert"
import { Button } from "@/components/ui/button"
import { useDemo } from "@/lib/demo/context"

// Sign out with a double confirmation (CLAUDE.md): an in-app sheet that
// explains what happens, then the final system alert.
export function SignOutRow() {
	const { signOut } = useDemo()
	const router = useRouter()
	const [step, setStep] = useState<"idle" | "sheet" | "alert">("idle")

	return (
		<>
			<button
				type="button"
				onClick={() => setStep("sheet")}
				className="flex h-13 w-full items-center border-b px-4 text-left text-base active:bg-muted"
			>
				Odhlásit se
			</button>

			<BottomSheet
				open={step === "sheet"}
				onOpenChange={open => setStep(open ? "sheet" : "idle")}
				title="Odhlásit se?"
			>
				<p className="px-4 text-muted-foreground">
					Pro vstup přes QR kód se pak budeš muset znovu přihlásit. Tvoje
					členství a nákupy zůstanou v účtu.
				</p>
				<div className="flex flex-col gap-2 px-4 pt-5">
					<Button size="lg" onClick={() => setStep("alert")}>
						Odhlásit se
					</Button>
					<Button size="lg" variant="ghost" onClick={() => setStep("idle")}>
						Zrušit
					</Button>
				</div>
			</BottomSheet>

			<SystemAlert
				open={step === "alert"}
				title="Opravdu se chceš odhlásit?"
				actions={[
					{ label: "Zrušit", style: "cancel", onPress: () => setStep("idle") },
					{
						label: "Odhlásit",
						style: "destructive",
						onPress: () => {
							setStep("idle")
							signOut()
							router.replace("/welcome")
						},
					},
				]}
			/>
		</>
	)
}

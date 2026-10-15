"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { SystemAlert } from "@/components/shell/system-alert"
import { Button } from "@/components/ui/button"
import { CheckIcon } from "@/components/ui/icons"
import { Switch } from "@/components/ui/switch"
import { useDemo } from "@/lib/demo/context"
import { SCENARIO_LABEL } from "@/lib/demo/scenarios"
import type { DemoScenarioId } from "@/lib/types/demo-scenario"
import type { SystemFlag } from "@/lib/types/system-flags"
import { cn } from "@/lib/utils"

const SCENARIOS = Object.keys(SCENARIO_LABEL) as DemoScenarioId[]

// Which build step makes each switch do something. Until then it's stored
// but has no visible effect, and the panel says so.
const SYSTEM_FLAGS: { flag: SystemFlag; label: string; step?: number }[] = [
	{ flag: "maintenance", label: "Údržba", step: 7 },
	{ flag: "forcedUpdate", label: "Vynucená aktualizace", step: 7 },
	{ flag: "recommendedUpdate", label: "Doporučená aktualizace", step: 7 },
	{ flag: "feedbackPrompt", label: "Žádost o hodnocení", step: 7 },
	{ flag: "blockedUser", label: "Blokovaný uživatel" },
	{
		flag: "paymentErrorNextCheckout",
		label: "Chyba platby při dalším nákupu",
		step: 4,
	},
]

interface DemoPanelProps {
	// Desktop: beside the phone frame, on black. In-app: Profil → Nastavení → Demo.
	variant: "desktop" | "in-app"
}

// The presenter's remote control. Not part of the app being designed.
export function DemoPanel({ variant }: DemoPanelProps) {
	const { state, loadScenario, resetDemo, setSystemFlag, sendPush } = useDemo()
	const router = useRouter()
	const [confirmReset, setConfirmReset] = useState(false)

	if (!state) {
		return null
	}

	function goToScenario(scenario: DemoScenarioId) {
		loadScenario(scenario)
		router.push(scenario === "new-user" ? "/welcome" : "/home")
	}

	return (
		<section
			aria-label="Demo panel"
			className={cn(
				"flex flex-col gap-6",
				variant === "desktop" &&
					"dark w-80 max-h-[min(844px,calc(100dvh-2.5rem))] overflow-y-auto bg-background p-5 scrollbar-none",
				variant === "in-app" && "px-4 pb-8"
			)}
		>
			{variant === "desktop" && (
				<div>
					<p className="eyebrow">Pro prezentaci</p>
					<h2 className="mt-1 text-h3">Demo panel</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						Není součástí aplikace. Na telefonu: Profil → Nastavení → Demo.
					</p>
				</div>
			)}

			<div>
				<h3 className="eyebrow mb-2">Scénář</h3>
				<ul className="flex flex-col border-t">
					{SCENARIOS.map(scenario => (
						<li key={scenario} className="border-b">
							<button
								type="button"
								onClick={() => goToScenario(scenario)}
								className="flex h-11 w-full items-center justify-between text-left text-base active:opacity-60"
							>
								{SCENARIO_LABEL[scenario]}
								{state.scenario === scenario && (
									<CheckIcon
										className="size-5 text-link"
										aria-label="Vybráno"
									/>
								)}
							</button>
						</li>
					))}
				</ul>
			</div>

			<div>
				<h3 className="eyebrow mb-2">Stavy systému</h3>
				<ul className="flex flex-col border-t">
					{SYSTEM_FLAGS.map(({ flag, label, step }) => (
						<li key={flag} className="border-b">
							<div className="flex min-h-11 items-center justify-between gap-3 py-2">
								<span>
									<span className="block text-base">{label}</span>
									{step && (
										<span className="block text-xs text-muted-foreground">
											Zatím bez efektu (krok {step})
										</span>
									)}
								</span>
								<Switch
									aria-label={label}
									checked={state.system[flag]}
									onCheckedChange={value => setSystemFlag(flag, value)}
								/>
							</div>
						</li>
					))}
				</ul>
			</div>

			<div className="flex flex-col gap-2">
				<h3 className="eyebrow">Akce</h3>
				<Button variant="outline" size="lg" onClick={sendPush}>
					Poslat push notifikaci
				</Button>
				<Button
					variant="destructive"
					size="lg"
					onClick={() => setConfirmReset(true)}
				>
					Resetovat demo data
				</Button>
			</div>

			<SystemAlert
				open={confirmReset}
				title="Resetovat demo data?"
				message="Všechny nákupy a změny se smažou a aplikace začne jako u nového uživatele."
				actions={[
					{
						label: "Zrušit",
						style: "cancel",
						onPress: () => setConfirmReset(false),
					},
					{
						label: "Resetovat",
						style: "destructive",
						onPress: () => {
							setConfirmReset(false)
							resetDemo()
							router.push("/")
						},
					},
				]}
			/>
		</section>
	)
}

"use client"

import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

import { SimulatedTag } from "@/components/shell/simulated-tag"
import { useDemo } from "@/lib/demo/context"
import { cn } from "@/lib/utils"

const UPDATE_MS = 1800

// Simulated app store page. ?action=rate shows the star rating (rate the
// app, feedback prompt); ?action=update installs an update (forced and
// recommended update), which clears those demo flags. Generic store look,
// no store branding.
export function StoreScreen() {
	const router = useRouter()
	const action =
		useSearchParams().get("action") === "update" ? "update" : "rate"
	const { setSystemFlag } = useDemo()
	const [stars, setStars] = useState(0)
	const [updating, setUpdating] = useState<"idle" | "busy" | "done">("idle")

	function update() {
		setUpdating("busy")
		window.setTimeout(() => {
			setSystemFlag("forcedUpdate", false)
			setSystemFlag("recommendedUpdate", false)
			setUpdating("done")
		}, UPDATE_MS)
	}

	return (
		<div className="flex h-full flex-col bg-white pt-safe font-system text-black duration-300 animate-in slide-in-from-bottom">
			<div className="flex h-12 shrink-0 items-center justify-between px-4">
				<button
					type="button"
					onClick={() =>
						updating === "done" ? router.replace("/") : router.back()
					}
					className="h-11 text-[17px] text-[#007aff] active:opacity-60"
				>
					{updating === "done" ? "Otevřít aplikaci" : "Zavřít"}
				</button>
				<SimulatedTag />
			</div>
			<div className="px-5 pt-4">
				<div className="flex items-center gap-4">
					<Image
						src="/icons/icon-192.png"
						alt=""
						width={96}
						height={96}
						className="size-24 rounded-[22px]"
					/>
					<div className="min-w-0 flex-1">
						<p className="text-[22px] leading-tight font-bold">HANGAR</p>
						<p className="text-[15px] text-black/50">
							Climbing playground by Adam Ondra
						</p>
						{action === "update" && (
							<button
								type="button"
								onClick={update}
								disabled={updating !== "idle"}
								className="mt-2 h-8 rounded-full bg-[#007aff] px-5 text-[15px] font-semibold text-white disabled:opacity-60"
							>
								{updating === "idle" && "Aktualizovat"}
								{updating === "busy" && "Aktualizuji…"}
								{updating === "done" && "Hotovo"}
							</button>
						)}
					</div>
				</div>

				{action === "update" ? (
					<div className="mt-8 border-t border-black/10 pt-4">
						<p className="text-[20px] font-bold">Co je nového</p>
						<p className="mt-2 text-[15px] text-black/70">
							Opravy chyb a vylepšení výkonu.
						</p>
					</div>
				) : (
					<div className="mt-8 border-t border-black/10 pt-6 text-center">
						<p className="text-[20px] font-bold">
							{stars ? "Děkujeme za hodnocení!" : "Klepnutím ohodnoť"}
						</p>
						<div
							className="mt-4 flex justify-center gap-2"
							role="radiogroup"
							aria-label="Hodnocení"
						>
							{[1, 2, 3, 4, 5].map(value => (
								// biome-ignore lint/a11y/useSemanticElements: star rating mock
								<button
									key={value}
									type="button"
									role="radio"
									aria-checked={stars === value}
									aria-label={`${value} z 5`}
									onClick={() => setStars(value)}
									className={cn(
										"text-[40px] leading-none",
										value <= stars ? "text-[#007aff]" : "text-black/20"
									)}
								>
									★
								</button>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

import { SimulatedTag } from "@/components/shell/simulated-tag"
import { SystemAlert } from "@/components/shell/system-alert"

// Simulated mail app compose sheet, opened by "Napsat e-mail" links.
// Nothing is sent. Generic phone UI on purpose (system font, system blue).
export function ComposeScreen() {
	const router = useRouter()
	const params = useSearchParams()
	const to = params.get("to") ?? ""
	const [subject, setSubject] = useState(params.get("subject") ?? "")
	const [body, setBody] = useState("")
	const [sent, setSent] = useState(false)

	return (
		<div className="flex h-full flex-col bg-white pt-safe font-system text-black duration-300 animate-in slide-in-from-bottom">
			<div className="flex h-12 shrink-0 items-center justify-between px-4">
				<button
					type="button"
					onClick={() => router.back()}
					className="h-11 text-[17px] text-[#007aff] active:opacity-60"
				>
					Zrušit
				</button>
				<SimulatedTag />
				<button
					type="button"
					onClick={() => setSent(true)}
					className="h-11 text-[17px] font-semibold text-[#007aff] active:opacity-60"
				>
					Odeslat
				</button>
			</div>
			<p className="px-4 pb-3 text-[28px] leading-tight font-bold">
				{subject || "Nová zpráva"}
			</p>
			<div className="flex h-11 items-center gap-2 border-t border-black/10 px-4 text-[15px]">
				<span className="text-black/50">Komu:</span>
				<span className="truncate">{to}</span>
			</div>
			<label className="flex h-11 items-center gap-2 border-t border-black/10 px-4 text-[15px]">
				<span className="text-black/50">Předmět:</span>
				<input
					value={subject}
					onChange={event => setSubject(event.target.value)}
					className="min-w-0 flex-1 bg-transparent text-base outline-none"
				/>
			</label>
			<textarea
				value={body}
				onChange={event => setBody(event.target.value)}
				aria-label="Text zprávy"
				placeholder="Napiš zprávu…"
				className="min-h-0 flex-1 resize-none border-t border-black/10 bg-transparent px-4 py-3 text-base outline-none"
			/>

			<SystemAlert
				open={sent}
				title="E-mail odeslán"
				message="Recepce ti odpoví na e-mail z tvého účtu."
				actions={[
					{ label: "OK", style: "cancel", onPress: () => router.back() },
				]}
			/>
		</div>
	)
}

"use client"

import { useRouter, useSearchParams } from "next/navigation"

import { Logo } from "@/components/brand/logo"
import { SimulatedTag } from "@/components/shell/simulated-tag"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { faqItems } from "@/lib/data/faq-items"
import { getOpenGym } from "@/lib/data/gyms"
import { useDemoState } from "@/lib/demo/context"

const DOCUMENTS = {
	faq: "Časté dotazy",
	terms: "Obchodní podmínky",
	privacy: "Ochrana osobních údajů",
	"visitor-rules": "Návštěvní řád",
} as const

type DocumentKey = keyof typeof DOCUMENTS

// Simulated in-app browser for web pages the app links to. The FAQ is the
// real one (from the live sites); the legal documents aren't in our data,
// so their pages say where the real text will come from.
export function BrowserScreen() {
	const router = useRouter()
	const params = useSearchParams()
	const { selectedGym } = useDemoState()
	const requested = params.get("doc")
	const doc: DocumentKey =
		requested && requested in DOCUMENTS ? (requested as DocumentKey) : "faq"
	const host = new URL(`https://${getOpenGym(selectedGym).email.split("@")[1]}`)
		.host

	return (
		<div className="flex h-full flex-col bg-white pt-safe text-black duration-300 animate-in slide-in-from-bottom">
			<div className="flex h-12 shrink-0 items-center gap-3 border-b border-black/10 px-3 font-system">
				<button
					type="button"
					onClick={() => router.back()}
					className="h-11 text-[17px] font-semibold text-[#007aff] active:opacity-60"
				>
					Hotovo
				</button>
				<span className="min-w-0 flex-1 truncate rounded-lg bg-black/5 px-3 py-1.5 text-center text-[15px]">
					{host}
				</span>
				<SimulatedTag />
			</div>
			<div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-alabaster font-sans text-cod-gray">
				<div className="px-5 pt-6 pb-10">
					<Logo variant="secondary" height={22} />
					<h1 className="mt-8 text-h1">{DOCUMENTS[doc]}</h1>
					{doc === "faq" ? (
						<Accordion className="mt-6">
							{faqItems.map(item => (
								<AccordionItem key={item.question} value={item.question}>
									<AccordionTrigger className="text-left text-base">
										{item.question}
									</AccordionTrigger>
									<AccordionContent>{item.answer}</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					) : (
						<p className="mt-4 text-muted-foreground">
							Tady se otevře dokument „{DOCUMENTS[doc]}“ na webu Hangaru. Jeho
							text dodá Hangar.
						</p>
					)}
				</div>
			</div>
		</div>
	)
}

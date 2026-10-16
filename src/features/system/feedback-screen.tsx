"use client"

import Link from "next/link"
import { useId, useState } from "react"

import { WallProfile } from "@/components/brand/wall-profile"
import { Screen } from "@/components/shell/screen"
import { Button, buttonVariants } from "@/components/ui/button"
import { CheckIcon } from "@/components/ui/icons"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// Negative answer to "Líbí se ti aplikace?": a short feedback form.
// Nothing is sent (prototype).
export function FeedbackScreen() {
	const textId = useId()
	const [text, setText] = useState("")
	const [sent, setSent] = useState(false)

	if (sent) {
		return (
			<Screen
				footer={
					<Link href="/home" className={cn(buttonVariants({ size: "lg" }))}>
						Zpět na Domů
					</Link>
				}
			>
				<div className="flex flex-col px-6 pt-12 pb-6">
					<WallProfile
						profile="nose"
						className="w-[60%]"
						contentClassName="items-center"
					>
						<CheckIcon className="size-14" aria-hidden="true" />
					</WallProfile>
					<h1 className="mt-10 text-h1">Díky za zpětnou vazbu</h1>
					<p className="mt-3 text-lead text-muted-foreground">
						Přečteme si ji a podle ní budeme aplikaci zlepšovat.
					</p>
				</div>
			</Screen>
		)
	}

	return (
		<Screen
			title="Co zlepšit?"
			backHref="/home"
			backLabel="Domů"
			footer={
				<Button size="lg" disabled={!text.trim()} onClick={() => setSent(true)}>
					Odeslat
				</Button>
			}
		>
			<div className="flex flex-col gap-2 px-4 pb-6">
				<label htmlFor={textId} className="text-sm font-medium">
					Co ti v aplikaci chybí nebo nefunguje?
				</label>
				<Textarea
					id={textId}
					value={text}
					onChange={event => setText(event.target.value)}
					placeholder="Napiš nám pár slov…"
					className="min-h-40"
				/>
			</div>
		</Screen>
	)
}
